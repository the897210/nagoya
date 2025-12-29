import React from 'react';
import { ExternalLink, Car, Train, Bus, Ticket } from 'lucide-react';
import { TRANSPORT_LINKS } from '../constants';

const ICON_MAP = {
  Train: Train,
  Bus: Bus,
  Ticket: Ticket,
  Car: Car
};

export const TransportView: React.FC = () => {
  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-black text-slate-800 mb-4">預約連結與導航</h3>
        <div className="space-y-3">
          {TRANSPORT_LINKS.map((link, idx) => {
            const Icon = ICON_MAP[link.iconName];
            return (
              <button 
                key={idx} 
                onClick={() => openLink(link.url)} 
                className="w-full flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 transition-colors border border-transparent hover:border-indigo-100"
              >
                <Icon size={20} className={`${link.color} mr-4`} />
                <span className="flex-1 text-left font-bold text-slate-700 text-sm">{link.name}</span>
                <ExternalLink size={14} className="text-slate-300" />
              </button>
            );
          })}
        </div>
      </div>
      <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
        <h4 className="font-bold text-indigo-800 mb-2 flex items-center"><Car size={18} className="mr-2" /> 自駕提示</h4>
        <p className="text-xs text-indigo-600 leading-relaxed">
          日本導航建議優先使用 **MapCode**，精準度高且不需擔心語音輸入。市區停車建議找「Times」或「三井」等連鎖停車場。
        </p>
      </div>
    </div>
  );
};