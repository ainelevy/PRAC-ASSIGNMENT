import React, { useCallback, useState } from 'react';
import { UploadCloud, Image as ImageIcon, X, ScanLine } from 'lucide-react';
import { ImageState } from '../types';

interface ImageUploaderProps {
  onImageSelected: (imageState: ImageState) => void;
  onClear: () => void;
  currentImage: ImageState | null;
  disabled?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, onClear, currentImage, disabled }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      onImageSelected({
        file,
        previewUrl: URL.createObjectURL(file),
        base64: reader.result as string,
      });
    };
    reader.readAsDataURL(file);
  }, [onImageSelected]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile, disabled]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }, [handleFile]);

  if (currentImage) {
    return (
      <div className="relative group w-full max-w-md mx-auto animate-fade-in">
        <div className="overflow-hidden rounded-3xl border border-white/50 bg-white shadow-2xl shadow-slate-200/50 transition-all hover:shadow-slate-300/50">
          <div className="relative aspect-[4/3]">
            <img 
              src={currentImage.previewUrl || ''} 
              alt="Preview" 
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        
        {!disabled && (
          <button
            onClick={onClear}
            className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full border border-slate-100 bg-white shadow-lg text-slate-400 hover:bg-red-50 hover:text-red-500 hover:scale-110 transition-all duration-200"
            title="Remove image"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative flex w-full max-w-2xl flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-500 ease-out
        ${isDragging 
          ? 'border-agri-500 bg-agri-50/50 scale-[1.01] shadow-xl shadow-agri-100/50' 
          : 'border-slate-200 bg-white/50 hover:border-agri-300 hover:bg-white/80 hover:shadow-lg hover:shadow-slate-100'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDragOver={(e) => { e.preventDefault(); !disabled && setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={handleChange}
        accept="image/*"
        disabled={disabled}
      />
      
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03]" 
        style={{ 
          backgroundImage: 'radial-gradient(#16a34a 1px, transparent 1px)', 
          backgroundSize: '20px 20px' 
        }} 
      />
      
      <div className="flex flex-col items-center justify-center py-16 text-center px-4 transition-transform duration-300 group-hover:scale-105">
        <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-2xl shadow-sm transition-colors duration-300 
          ${isDragging ? 'bg-agri-100 text-agri-600' : 'bg-white text-slate-400 border border-slate-100'}`}>
          {isDragging ? <ScanLine size={40} className="animate-pulse" /> : <UploadCloud size={40} />}
        </div>
        <h3 className="mb-2 text-xl font-bold text-slate-900">
          {isDragging ? 'Drop to Analyze' : 'Upload Plant Photo'}
        </h3>
        <p className="max-w-xs text-sm text-slate-500">
          Drag and drop or click to browse
          <br />
          <span className="text-xs opacity-70 mt-1 block">Supports JPG, PNG, WebP</span>
        </p>
      </div>
    </div>
  );
};