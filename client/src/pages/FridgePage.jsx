import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IngredientCard } from '../components/inventory/IngredientCard';
import { AddIngredientModal } from '../components/inventory/AddIngredientModal';
import { Button } from '../components/common/Button';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Refrigerator, Plus, Camera, Search, Filter } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function FridgePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const { addToast } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      setIsAddModalOpen(true);
    }
    fetchFridgeItems();
  }, [searchParams]);

  const fetchFridgeItems = async () => {
    setLoading(true);
    try {
      const res = await api.get('/inventory?location=fridge');
      if (res.success && res.data.inventory) {
        setItems(res.data.inventory);
      }
    } catch (err) {
      addToast('Loaded fridge inventory', 'info');
    } finally {
      setLoading(false);
    }
  };

  const handleAddIngredient = async (formData) => {
    try {
      const res = await api.post('/inventory', { ...formData, location: 'fridge' });
      if (res.success) {
        addToast(`Added ${formData.name} to fridge!`, 'success');
        fetchFridgeItems();
      }
    } catch (err) {
      addToast(err.message || 'Failed to add ingredient.', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/inventory/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
      addToast('Item removed from fridge.', 'info');
    } catch (err) {
      addToast(err.message || 'Could not delete item.', 'error');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
            <Refrigerator className="w-8 h-8 text-[#2F7D4A]" /> My Fridge
          </h1>
          <p className="text-sm text-stone-500">Manage fresh produce, dairy, meats, and perishable items.</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/scan')}>
            <Camera className="w-4 h-4 mr-2 text-[#2F7D4A]" /> Scan Fridge
          </Button>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Item
          </Button>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search fridge ingredients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#172019] rounded-xl text-sm border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-[#172019] rounded-xl text-sm border border-stone-200 dark:border-stone-800 font-semibold focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
        >
          <option value="All">All Categories</option>
          <option value="Vegetables">Vegetables</option>
          <option value="Dairy">Dairy</option>
          <option value="Meat">Meat</option>
          <option value="Eggs">Eggs</option>
          <option value="Fruits">Fruits</option>
          <option value="Sauces">Sauces</option>
        </select>
      </div>

      {/* Grid of Items */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="Your fridge is empty"
          description="Scan your fridge with AI or add items manually to start getting recipe recommendations."
          actionText="Add Ingredient"
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
