import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScannerUpload } from '../components/scan/ScannerUpload';
import { DetectionResults } from '../components/scan/DetectionResults';
import { DuplicateModal } from '../components/scan/DuplicateModal';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function ScanPage() {
  const [loading, setLoading] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [duplicateInfo, setDuplicateInfo] = useState(null);
  const [pendingConfirmItems, setPendingConfirmItems] = useState([]);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const handleScanStart = async (file, scanType) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (file) formData.append('image', file);
      formData.append('scanType', scanType);

      const res = await api.post('/scans', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.success && res.data) {
        setScanResult(res.data);
        if (res.data.duplicates && res.data.duplicates.length > 0) {
          setDuplicateInfo(res.data.duplicates[0]);
        }
      }
    } catch (err) {
      addToast(err.message || 'Scan failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmIngredients = async (items) => {
    try {
      const location = scanResult?.scanType || 'fridge';
      const res = await api.post('/scans/confirm', {
        ingredients: items,
        location,
      });

      if (res.success) {
        addToast(`Successfully added ${items.length} items to your ${location}!`, 'success');
        navigate(`/${location === 'countertop' ? 'fridge' : location}`);
      }
    } catch (err) {
      addToast(err.message || 'Confirmation failed.', 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white">AI Kitchen Scanner</h1>
        <p className="text-sm text-stone-500">Scan your fridge, freezer, or pantry to let AI extract ingredients automatically.</p>
      </div>

      {!scanResult ? (
        <ScannerUpload onScanStart={handleScanStart} isLoading={loading} />
      ) : (
        <DetectionResults
          detectedItems={scanResult.detectedIngredients}
          onConfirm={handleConfirmIngredients}
          onRetake={() => setScanResult(null)}
        />
      )}

      {/* Duplicate Handle Modal */}
      <DuplicateModal
        isOpen={Boolean(duplicateInfo)}
        onClose={() => setDuplicateInfo(null)}
        duplicateInfo={duplicateInfo}
        onMerge={() => {
          addToast(`Merged quantity with existing ${duplicateInfo?.existingItem?.name}`, 'success');
          setDuplicateInfo(null);
        }}
        onCreateSeparate={() => {
          addToast('Created separate item', 'info');
          setDuplicateInfo(null);
        }}
      />
    </div>
  );
}
