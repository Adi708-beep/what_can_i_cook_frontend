import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Camera, Calendar, ArrowRight } from 'lucide-react';
import { formatDate } from '../lib/utils';
import api from '../lib/api';

export function ScanHistoryPage() {
  const [scans, setScans] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await api.get('/scans/history');
      if (res.success && res.data.scans) {
        setScans(res.data.scans);
      }
    } catch (err) {}
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white">AI Scan History</h1>
        <p className="text-sm text-stone-500">View past kitchen scans and detected ingredient logs.</p>
      </div>

      <div className="space-y-4">
        {scans.length === 0 ? (
          <Card className="p-8 text-center text-stone-400">No past scan records found.</Card>
        ) : (
          scans.map((scan) => (
            <Card key={scan._id} className="flex flex-col sm:flex-row items-center gap-4 p-4">
              <img
                src={scan.imageUrl || 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&q=80&w=200'}
                alt="Kitchen Scan"
                className="w-full sm:w-28 h-24 object-cover rounded-xl shrink-0"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="brand" className="capitalize">{scan.scanType || 'fridge'} scan</Badge>
                  <span className="text-xs text-stone-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(scan.createdAt || new Date())}
                  </span>
                </div>
                <h4 className="font-bold text-[#172019] dark:text-white">
                  Identified {scan.detectedIngredients?.length || 5} ingredients
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1">
                  {scan.detectedIngredients?.map((i) => i.name).join(', ')}
                </p>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
