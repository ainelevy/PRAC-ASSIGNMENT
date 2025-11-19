import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });

const schema: Schema = {
  type: Type.OBJECT,
  properties: {
    isPlant: {
      type: Type.BOOLEAN,
      description: "Whether the image contains a plant, leaf, or crop.",
    },
    diseaseName: {
      type: Type.STRING,
      description: "The name of the identified disease, or 'None' if healthy.",
    },
    healthStatus: {
      type: Type.STRING,
      enum: ["Healthy", "Diseased", "Unknown"],
      description: "General health status of the plant.",
    },
    confidence: {
      type: Type.NUMBER,
      description: "Confidence score between 0 and 1.",
    },
    description: {
      type: Type.STRING,
      description: "A brief explanation of the finding.",
    },
    symptoms: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of visible symptoms identified.",
    },
    treatments: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Recommended treatments or cures.",
    },
    preventativeMeasures: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Steps to prevent future occurrences.",
    },
  },
  required: ["isPlant", "healthStatus", "diseaseName", "description", "symptoms", "treatments", "preventativeMeasures"],
};

export const analyzeCropImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    // Strip the data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const base64Data = base64Image.split(',')[1] || base64Image;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg", // Assuming JPEG/PNG, API is generally flexible with standard image types
              data: base64Data,
            },
          },
          {
            text: "Analyze this image. Determine if it is a plant crop. If it is, identify any diseases, pests, or nutritional deficiencies. Provide a detailed diagnosis, symptoms seen, recommended treatments, and prevention tips. If the plant is healthy, state that. If the image is not a plant, set isPlant to false.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.4, // Lower temperature for more factual/consistent results
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from AI model.");
    }

    const result = JSON.parse(text) as AnalysisResult;
    return result;

  } catch (error) {
    console.error("Error analyzing crop image:", error);
    throw new Error("Failed to analyze the image. Please try again.");
  }
};