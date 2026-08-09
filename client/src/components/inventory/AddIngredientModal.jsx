import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

const CATEGORIES = [
  'Vegetables', 'Fruits', 'Dairy', 'Meat', 'Seafood', 
  'Eggs', 'Grains', 'Pasta', 'Spices', 'Sauces', 
  'Frozen', 'Snacks', 'Baking', 'Other'
];

export function AddIngredientModal({ isOpen, onClose, onAdd, defaultLocation = 'fridge' }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Vegetables',
    quantity: 1,
    unit: 'pcs',
    location: defaultLocation,
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onAdd(formData);
    setFormData({
      name: '',
      category: 'Vegetables',
      quantity: 1,
      unit: 'pcs',
      location: defaultLocation,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: '',
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Kitchen Ingredient">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
            Ingredient Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Tomatoes, Spinach, Olive Oil"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
              Storage Location
            </label>
            <select
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
            >
              <option value="fridge">Fridge</option>
              <option value="pantry">Pantry</option>
              <option value="freezer">Freezer</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
              Quantity
            </label>
            <input
              type="number"
              min="0.1"
              step="any"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: parseFloat(e.target.value) || 1 })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
              Unit
            </label>
            <input
              type="text"
              placeholder="e.g. pcs, g, kg, carton, box"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-stone-600 dark:text-stone-300 mb-1">
            Estimated Expiry Date
          </label>
          <input
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900 text-[#172019] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2F7D4A]"
          />
        </div>

        <div className="pt-3 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save Ingredient
          </Button>
        </div>
      </form>
    </Modal>
  );
}
