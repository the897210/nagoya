import React from 'react';
import { X, Clock, Navigation, CheckCircle2, Train, Car } from 'lucide-react';
import { Spot } from '../types';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
  onUpdateSpot: (spotId: string, updates: Partial<Spot>) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({ spot, onClose, onUpdateSpot }) => {
  if (!spot) return null;

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md">
      <div className="bg-white w-full max-w-md rounded-t-[40px] sm:rounded-[40px] max-h-[95vh] overflow-y-auto relative p-8">
        <button 
          onClick={onClose} 
          className="absolute right-6 top-6 bg-slate-100 p-2 rounded-full text-slate-400 hover:bg-slate-200 transition-colors"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-3xl font-black text-slate-900 mt-2 mb-4">{spot.name}</h2>
        
        <div className="space-y-6">
          {/* Time Editor */}
          <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-3xl border border-slate-100">
            <Clock size={20} className="text-indigo-600" />
            <div className="flex-1">
              <p className="text-[10px] text-slate-400 font-bold uppercase">預計抵達時間</p>
              <input 
                type="time" 
                value={spot.time}
                onChange={(e) => onUpdateSpot(spot.id, { time: e.target.value })}
                className="w-full bg-transparent border-none text-lg font-black focus:ring-0 p-0 text-slate-800 outline-none"
              />
            </div>
          </div>

          {/* Transport Selection */}
          <section>
            <h4 className="font-bold text-slate-800 text-sm mb-3">選擇交通方式 (自動計算花費)</h4>
            <div className="space-y-2">
              {spot.transports.map((t, idx) => (
                <button 
                  key={idx}
                  onClick={() => onUpdateSpot(spot.id, { selectedTransportIdx: idx })}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    spot.selectedTransportIdx === idx 
                    ? 'border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-100' 
                    : 'border-slate-100 bg-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${spot.selectedTransportIdx === idx ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {t.type === '地鐵' ? <Train size={16} /> : <Car size={16} />}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{t.type}: {t.detail}</p>
                        <p className="text-[11px] text-slate-400">{t.cost}</p>
                      </div>
                    </div>
                    {spot.selectedTransportIdx === idx && <CheckCircle2 size={18} className="text-indigo-600" />}
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50 p-4 rounded-3xl border border-amber-100">
              <p className="text-[10px] text-amber-600 font-bold mb-1 uppercase tracking-tighter">MapCode</p>
              <p className="text-sm font-black text-amber-900 font-mono tracking-tighter">{spot.map_code || "N/A"}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100">
              <p className="text-[10px] text-blue-600 font-bold mb-1 uppercase tracking-tighter">Phone</p>
              <p className="text-sm font-black text-blue-900 font-mono">{spot.phone || "N/A"}</p>
            </div>
          </div>

          {/* Description */}
          <section>
            <h4 className="font-bold text-slate-800 text-sm mb-2">景點筆記</h4>
            <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200">
              {spot.long_desc}
            </p>
          </section>

          {/* Navigation Button */}
          <button 
            onClick={() => openLink(`https://www.google.com/maps/dir/?api=1&destination=${spot.lat},${spot.lng}`)}
            className="w-full bg-slate-900 text-white py-4 rounded-3xl font-bold flex items-center justify-center shadow-xl shadow-slate-200 hover:bg-slate-800 transition-colors"
          >
            <Navigation size={18} className="mr-2" /> 啟動 Google Maps 導航
          </button>
        </div>
      </div>
    </div>
  );
};