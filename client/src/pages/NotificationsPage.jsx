import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Bell, AlertTriangle, Utensils, Check } from 'lucide-react';
import api from '../lib/api';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      if (res.success && res.data.notifications) {
        setNotifications(res.data.notifications);
      }
    } catch (err) {}
  };

  const handleMarkRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {}
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-[#172019] dark:text-white flex items-center gap-3">
          <Bell className="w-8 h-8 text-[#2F7D4A]" /> Notifications
        </h1>
        <p className="text-sm text-stone-500">Expiry warnings, AI recipe alerts, and kitchen updates.</p>
      </div>

      <div className="space-y-3">
        {notifications.map((n) => (
          <Card
            key={n._id}
            hoverEffect={false}
            className={`p-4 flex items-start justify-between gap-4 ${
              !n.isRead ? 'bg-[#E1EFE5]/30 dark:bg-[#1B4A2C]/20 border-l-4 border-l-[#2F7D4A]' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 shrink-0 mt-0.5">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base text-[#172019] dark:text-white">{n.title}</h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mt-0.5 leading-relaxed">{n.message}</p>
              </div>
            </div>

            {!n.isRead && (
              <button
                onClick={() => handleMarkRead(n._id)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-[#2F7D4A] hover:bg-white dark:hover:bg-stone-800 shrink-0"
                title="Mark as read"
              >
                <Check className="w-4 h-4" />
              </button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
