import React from 'react';
import { AnalysisResult } from '../types';
import { CheckCircle2, AlertTriangle, ShieldCheck, Sprout, ThermometerSun, Activity, Stethoscope, Leaf } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResult;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result }) => {
  const isHealthy = result.healthStatus === 'Healthy';
  
  // Color Logic
  const theme = isHealthy ? 'emerald' : 'rose';
  const bgGradient = isHealthy 
    ? 'from-emerald-500/10 to-teal-500/5' 
    : 'from-rose-500/10 to-orange-500/5';
    
  const borderColor = isHealthy ? 'border-emerald-200' : 'border-rose-200';
  const iconColor = isHealthy ? 'text-emerald-600' : 'text-rose-600';
  const accentBg = isHealthy ? 'bg-emerald-100' : 'bg-rose-100';
  const progressColor = isHealthy ? 'bg-emerald-500' : 'bg-rose-500';

  if (!result.isPlant) {
    return (
      <div className="mx-auto max-w-xl rounded-3xl border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-500/5">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-500 animate-pulse-slow">
          <Leaf size={40} className="opacity-50" />
        </div>
        <h3 className="mb-3 text-2xl font-bold text-slate-900">No Plant Detected</h3>
        <p className="text-slate-500 leading-relaxed">
          It looks like the image you uploaded isn't a plant. Please try uploading a clear photo of a crop, leaf, or stem for accurate diagnosis.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-slide-up">
      
      {/* Main Dashboard Card */}
      <div className={`relative overflow-hidden rounded-3xl border ${borderColor} bg-white p-1 shadow-2xl shadow-slate-200/50`}>
        {/* Gradient Background Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-50`} />
        
        <div className="relative grid gap-8 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
          
          {/* Left Column: Diagnosis */}
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold tracking-wide uppercase ${accentBg} ${iconColor}`}>
                {isHealthy ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                {result.healthStatus}
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                {result.diseaseName}
              </h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                {result.description}
              </p>
            </div>
          </div>

          {/* Right Column: Stats */}
          <div className="flex flex-col justify-center rounded-2xl bg-white/60 p-6 backdrop-blur-md border border-white/50">
            <div className="mb-2 flex items-end justify-between">
              <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">AI Confidence</span>
              <span className={`text-3xl font-bold ${iconColor}`}>{Math.round(result.confidence * 100)}%</span>
            </div>
            
            {/* Progress Bar */}
            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
              <div 
                className={`h-full rounded-full ${progressColor} transition-all duration-1000 ease-out`}
                style={{ width: `${result.confidence * 100}%` }}
              />
            </div>
            
            <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
              <Sprout size={16} />
              <span>Analyzed via Gemini 2.5 Flash</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid for Details */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Symptoms Card */}
        <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <Activity size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Symptoms</h3>
          </div>
          <ul className="space-y-3">
            {result.symptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                <span className="text-sm font-medium leading-relaxed">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Treatments Card */}
        <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 group-hover:scale-110 transition-transform">
              <Stethoscope size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Treatments</h3>
          </div>
          {isHealthy ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-slate-400 pb-8">
              <CheckCircle2 size={48} className="mb-2 opacity-20" />
              <p className="text-sm">No treatment needed for a healthy plant!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {result.treatments.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                  <span className="text-sm font-medium leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Prevention Card */}
        <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/40 hover:shadow-xl transition-all duration-300">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 group-hover:scale-110 transition-transform">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Prevention</h3>
          </div>
          <ul className="space-y-3">
            {result.preventativeMeasures.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600">
                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                <span className="text-sm font-medium leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};