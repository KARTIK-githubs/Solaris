import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead, navigateTo } = useApp();
  const [filter, setFilter] = useState<'all' | 'action' | 'unread'>('all');

  const filtered = notifications.filter(n => {
    if (filter === 'action') return n.type === 'action';
    if (filter === 'unread') return !n.read;
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-16 max-w-3xl mx-auto px-4 space-y-4 animate-in fade-in">
      
      {/* Header */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <h1 className="font-headline text-2xl sm:text-3xl font-bold text-[#002620]">
            Notifications Center
          </h1>
          <p className="text-xs sm:text-sm text-[#404846] mt-0.5">
            Real-time regulatory milestones, member consent requests, and cohort updates.
          </p>
        </div>

        <button
          onClick={markAllNotificationsRead}
          className="text-xs text-[#006b57] font-semibold hover:underline"
        >
          Mark all as read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 rounded-xl bg-[#e2f0f9] text-xs font-semibold">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'all' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('action')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'action' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
          }`}
        >
          Actions Required
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`flex-1 py-1.5 rounded-lg transition-colors ${
            filter === 'unread' ? 'bg-white text-[#002620] shadow-sm' : 'text-[#404846]'
          }`}
        >
          Unread ({notifications.filter(n => !n.read).length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-xl border border-[#e2f0f9] text-[#717976] text-xs">
            No notifications in this view.
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationAsRead(item.id);
                if (item.actionUrl) navigateTo(item.actionUrl);
              }}
              className={`bg-white rounded-xl p-4 shadow-sm border transition-all cursor-pointer flex items-start gap-3.5 hover:border-[#006b57]/40 ${
                !item.read ? 'border-[#006b57]/40 bg-[#f4faff]' : 'border-[#e2f0f9]'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                item.type === 'action' 
                  ? 'bg-[#ffdea7] text-[#271900]' 
                  : item.type === 'success' 
                  ? 'bg-[#9af4d8] text-[#00725d]' 
                  : 'bg-[#e2f0f9] text-[#006b57]'
              }`}>
                <span className="material-symbols-outlined text-[18px]">
                  {item.type === 'action' ? 'draw' : item.type === 'success' ? 'check_circle' : 'info'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <h3 className="font-headline text-xs sm:text-sm font-bold text-[#002620] truncate">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[#717976] font-mono shrink-0">{item.timestamp}</span>
                </div>
                <p className="text-xs text-[#404846] mt-1 leading-relaxed">{item.message}</p>
                {item.actionUrl && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-[#006b57]">
                    <span>Open Step</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
