import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ExpiryBadge } from '../components/inventory/ExpiryBadge';
import { ArrowLeft, Trash2, Edit3, Utensils } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function InventoryDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      const res = await api.get('/inventory');
      if (res.success && res.data.inventory) {
        const found = res.data.inventory.find(i => i._id === id);
        setItem(found || res.data.inventory[0]);
      }
    } catch (err) {}
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/inventory/${id}`);
      addToast('Ingredient deleted.', 'info');
      navigate('/fridge');
    } catch (err) {}
  };

  if (!item) return <div className="p-8 text-center">Loading ingredient detail...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Kitchen
      </Button>

      <Card className="p-6 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white capitalize">{item.name}</h1>
            <p className="text-sm text-stone-500 capitalize">Category: {item.category} • Location: {item.location}</p>
          </div>
          <ExpiryBadge freshness={item.freshness} />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm p-4 bg-stone-50 dark:bg-stone-800 rounded-2xl">
          <div>
            <span className="text-stone-400 block font-bold">Quantity:</span>
            <span className="font-bold text-[#172019] dark:text-white">{item.quantity} {item.unit}</span>
          </div>
          <div>
            <span className="text-stone-400 block font-bold">Expiry Date:</span>
            <span className="font-bold text-[#172019] dark:text-white">{item.expiryDate ? new Date(item.expiryDate).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <div className="flex justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
          <Button variant="danger" size="sm" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-1.5" /> Delete
          </Button>
          <Button variant="primary" size="sm" onClick={() => navigate(`/recipes?search=${item.name}`)}>
            <Utensils className="w-4 h-4 mr-1.5" /> Find Recipes Using This
          </Button>
        </div>
      </Card>
    </div>
  );
}
