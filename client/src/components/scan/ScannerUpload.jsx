import React, { useState, useRef } from 'react';
import { Upload, Camera, Refrigerator, Package, Snowflake, Sparkles } from 'lucide-react';
import { Button } from '../common/Button';

export function ScannerUpload({ onScanStart, isLoading }) {
  const [scanType, setScanType] = useState('fridge');
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const scanModes = [
    { id: 'fridge', label: 'Fridge', icon: Refrigerator },
    { id: 'pantry', label: 'Pantry', icon: Package },
    { id: 'freezer', label: 'Freezer', icon: Snowflake },
    { id: 'countertop', label: 'Countertop', icon: Camera },
  ];

  const handleFileChange = (file) => {
    if (file) {
      onScanStart(file, scanType);
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex items-center justify-center gap-2 p-1.5 bg-stone-200/60 dark:bg-stone-800 rounded-2xl max-w-md mx-auto">
        {scanModes.map((mode) => {
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => setScanType(mode.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                scanType === mode.id
                  ? 'bg-white dark:bg-[#172019] text-[#2F7D4A] dark:text-[#E1EFE5] shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{mode.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upload Box */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFileChange(e.dataTransfer.files[0]);
          }
        }}
        className={`relative border-2 border-dashed rounded-3xl p-10 text-center transition-all flex flex-col items-center justify-center min-h-[320px] ${
          dragActive
            ? 'border-[#2F7D4A] bg-[#E1EFE5]/20 dark:bg-[#1B4A2C]/20'
            : 'border-stone-300 dark:border-stone-700 bg-white dark:bg-[#172019] hover:border-[#2F7D4A]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
        />

        <div className="w-20 h-20 rounded-full bg-[#E1EFE5] dark:bg-[#1B4A2C] text-[#2F7D4A] dark:text-[#E1EFE5] flex items-center justify-center mb-4 shadow-inner">
          <Camera className="w-10 h-10" />
        </div>

        <h3 className="text-xl font-bold text-[#172019] dark:text-white mb-2">
          Scan your {scanType} with AI Vision
        </h3>
        <p className="text-stone-500 dark:text-stone-400 text-sm max-w-sm mb-6">
          Drag & drop a photo or snap a picture of your kitchen ingredients. AI will detect items with confidence scores automatically.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <Button
            onClick={() => fileInputRef.current?.click()}
            isLoading={isLoading}
            variant="primary"
            size="lg"
            className="shadow-glow"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload Photo
          </Button>

          <Button
            onClick={() => onScanStart(null, scanType)} // Uses preset sample scan simulation
            isLoading={isLoading}
            variant="secondary"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2 text-[#F3B562]" />
            Try Demo Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
