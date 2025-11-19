import React, { useState } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { AnalysisResults } from './components/AnalysisResults';
import { analyzeCropImage } from './services/geminiService';
import { AppState, ImageState, AnalysisResult } from './types';
import { Loader2, Sparkles, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [imageState, setImageState] = useState<ImageState | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (newImageState: ImageState) => {
    setImageState(newImageState);
    setAppState(AppState.IDLE);
    setResult(null);
    setError(null);
  };

  const handleClearImage = () => {
    setImageState(null);
    setAppState(AppState.IDLE);
    setResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!imageState?.base64) return;

    setAppState(AppState.ANALYZING);
    setError(null);

    try {
      const data = await analyzeCropImage(imageState.base64);
      setResult(data);
      setAppState(AppState.SUCCESS);
    } catch (err: any) {
      setAppState(AppState.ERROR);
      setError(err.message || "An unknown error occurred.");
    }
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-agri-100 selection:text-agri-900">
      {/* Modern Background Mesh */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-slate-50">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#dcfce7,transparent)]"></div>
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-agri-100/50 blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-20%] h-[600px] w-[600px] rounded-full bg-blue-50/50 blur-[120px]"></div>
      </div>

      <Header />

      <main className="container mx-auto px-4 pt-32 pb-20 max-w-6xl">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-16 animate-fade-in">
          <div className="mb-6 inline-flex items-center rounded-full border border-agri-200 bg-white/60 px-3 py-1 text-sm font-medium text-agri-800 shadow-sm backdrop-blur-sm">
            <Sparkles size={14} className="mr-2 text-agri-500" />
            Powered by Gemini 2.5 Flash
          </div>
          
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6">
            Healthy Crops, <span className="text-transparent bg-clip-text bg-gradient-to-r from-agri-600 to-teal-500">Better Harvests.</span>
          </h1>
          
          <p className="max-w-2xl text-lg text-slate-600 leading-relaxed">
            Instantly diagnose crop diseases with our advanced AI. Upload a photo to get treatment plans, prevention tips, and health scores in seconds.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-col items-center gap-10">
          
          {/* Upload Section */}
          <div className="w-full flex flex-col items-center gap-8">
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              currentImage={imageState}
              onClear={handleClearImage}
              disabled={appState === AppState.ANALYZING}
            />

            {/* Analyze Button */}
            {imageState && appState === AppState.IDLE && (
              <button
                onClick={handleAnalyze}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-slate-900 px-10 py-4 text-lg font-semibold text-white shadow-xl shadow-slate-900/20 transition-all hover:scale-105 hover:bg-slate-800 active:scale-95"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-[100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                <span>Analyze Diagnosis</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            )}

            {/* Loading State */}
            {appState === AppState.ANALYZING && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="relative">
                  <div className="absolute inset-0 animate-ping rounded-full bg-agri-400 opacity-20"></div>
                  <div className="relative rounded-full bg-white p-4 shadow-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-agri-600" />
                  </div>
                </div>
                <p className="mt-6 text-lg font-medium text-slate-700 animate-pulse">
                  Analyzing plant health...
                </p>
                <p className="text-sm text-slate-500 mt-1">Checking symptoms and identifying pests</p>
              </div>
            )}

             {/* Error State */}
             {appState === AppState.ERROR && error && (
              <div className="w-full max-w-md rounded-2xl bg-red-50 border border-red-100 p-6 text-center shadow-sm">
                <p className="text-red-800 font-medium mb-2">{error}</p>
                <button 
                  onClick={() => setAppState(AppState.IDLE)}
                  className="text-sm font-bold text-red-600 hover:text-red-700 underline underline-offset-2"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>

          {/* Results Section */}
          {appState === AppState.SUCCESS && result && (
            <div className="w-full mt-8">
               <AnalysisResults result={result} />
            </div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center text-slate-400 text-sm">
        <div className="h-px w-full max-w-6xl mx-auto bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-8"></div>
        <p>© {new Date().getFullYear()} AgriScan AI. Built for the future of farming.</p>
      </footer>
    </div>
  );
};

export default App;