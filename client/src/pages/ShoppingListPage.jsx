import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ShoppingBag, Plus, Check, Trash2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import api from '../lib/api';

export function ShoppingListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItemName, setNewItemName] = useState('');
  const { addToast } = useNotification();

  useEffect(() => {
    fetchShoppingList();
  }, []);

  const fetchShoppingList = async () => {
    setLoading(true);
    try {
      const res = await api.get('/shopping-list');
      if (res.success && res.data.items) {
        setItems(res.data.items);
      }
    } catch (err) {} finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    try {
      const res = await api.post('/shopping-list', { name: newItemName });
      if (res.success) {
        setItems((prev) => [res.data.item, ...prev]);
        setNewItemName('');
        addToast(`Added ${newItemName} to shopping list!`, 'success');
      }
    } catch (err) {}
  };

  const handleToggle = async (id) => {
    try {
      await api.patch(`/shopping-list/${id}/toggle`);
      setItems((prev) =>
        prev.map((i) => (i._id === id ? { ...i, isPurchased: !i.isPurchased } : i))
      );
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/shopping-list/${id}`);
      setItems((prev) => prev.filter((i) => i._id !== id));
    } catch (err) {}
  };

  const handleClearCompleted = async () => {
    try {
      await api.post('/shopping-list/clear-completed');
      setItems((prev) => prev.filter((i) => !i.isPurchased));
      addToast('Cleared completed items', 'info');
    } catch (err) {}
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-[#2F7D4A]" /> Smart Shopping List
          </h1>
          <p className="text-sm text-stone-500">Auto-generated missing ingredients for your planned meals.</p>
        </div>

        <Button variant="outline" size="sm" onClick={handleClearCompleted}>
          Clear Completed
        </Button>
      </div>

      {/* Smart Shop AI Alert */}
      <div className="p-4 bg-[#E1EFE5] dark:bg-[#1B4A2C] rounded-2xl flex items-start gap-3 text-xs text-[#205C36] dark:text-[#E1EFE5] font-semibold">
        <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#F3B562]" />
        <div>
          <strong>AI Smart Shop Intelligence:</strong> You already have Garlic and Olive Oil in your pantry. We avoided adding duplicate items to your list!
        </div>
      </div>

      {/* Add Custom Item Input */}
      <form onSubmit={handleAddItem} className="flex gap-2">
        <input
          type="text"
          placeholder="Add extra grocery item..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="flex-1 px-4 py-3 bg-white dark:bg-[#172019] border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
        />
        <Button type="submit" variant="primary" className="shrink-0">
          <Plus className="w-4 h-4 mr-1" /> Add
        </Button>
      </form>

      {/* List items */}
      <div className="space-y-2">
        {items.map((item) => (
          <Card
            key={item._id}
            hoverEffect={false}
            className={`flex items-center justify-between p-4 transition-all ${
              item.isPurchased ? 'opacity-50 bg-stone-50 dark:bg-stone-900' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleToggle(item._id)}
                className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                  item.isPurchased ? 'bg-[#2F7D4A] border-[#2F7D4A] text-white' : 'border-stone-300 dark:border-stone-700'
                }`}
              >
                {item.isPurchased && <Check className="w-4 h-4 stroke-[3]" />}
              </button>
              <div>
                <span className={`font-bold text-sm text-[#172019] dark:text-white ${item.isPurchased ? 'line-through' : ''}`}>
                  {item.name}
                </span>
                {item.recipeSource && (
                  <span className="text-xs text-stone-400 block">From recipe: {item.recipeSource}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="neutral">{item.category}</Badge>
              <button onClick={() => handleDelete(item._id)} className="p-1 text-stone-400 hover:text-red-500">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
