import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IngredientCard } from '../components/inventory/IngredientCard';
import { AddIngredientModal } from '../components/inventory/AddIngredientModal';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { LayoutGrid, Plus, Camera, Search, Trash2 } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllInventory();
  }, []);

  const fetchAllInventory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inventory');
      if (res.success && res.data.inventory) {
        setItems(res.data.inventory);
      }
    } catch (err) {} finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = async (formData) => {
    try {
      const res = await api.post('/inventory', formData);
      if (res.success) {
        addToast(`Added ${formData.name}!`, 'success');
        fetchAllInventory();
      }
    } catch (err) {
      addToast(err.message || 'Failed to add ingredient.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      addToast('Item removed.', 'info');
    } catch (err) {}
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
            <LayoutGrid className="w-8 h-8 text-[#2F7D4A]" /> Complete Kitchen Inventory
          </h1>
          <p className="text-sm text-stone-500">Overview of all items across your fridge, pantry, and freezer.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/scan')}>
            <Camera className="w-4 h-4 mr-2 text-[#2F7D4A]" /> AI Vision Scan
          </Button>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
        <input
          type="text"
          placeholder="Search all kitchen ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#172019] rounded-xl text-sm border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="No ingredients found"
          description="Scan your kitchen or manually add ingredients."
          actionText="Add Item"
          onAction={() => setIsAddModalOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredItems.map((item) => (
            <IngredientCard
              key={item._id}
              item={item}
              onDelete={handleDelete}
              onUseInRecipe={(i) => navigate(`/recipes?search=${i.name}`)}
            />
          ))}
        </div>
      )}

      <AddIngredientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddIngredient}
        defaultLocation="fridge"
      />
    </div>
  );
}
