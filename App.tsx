import React, { useState } from 'react';
import { Car, Calendar, Globe, Plus, Star } from 'lucide-react';
import { INITIAL_TRIP_DATA } from './constants';
import { TripData, Spot, NewSpotState } from './types';
import { SpotDetailModal } from './components/SpotDetailModal';
import { AddSpotModal } from './components/AddSpotModal';
import { TransportView } from './components/TransportView';

export default function App() {
  const [activeView, setActiveView] = useState<'itinerary' | 'transport'>('itinerary');
  const [activeDay, setActiveDay] = useState(1);
  const [tripData, setTripData] = useState<TripData>(INITIAL_TRIP_DATA);
  const [selectedSpotId, setSelectedSpotId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSpot, setNewSpot] = useState<NewSpotState>({ name: '', time: '09:00', address: '', desc: '', type: 'hotel' });

  // Get current selected spot
  const selectedSpot = tripData.itinerary
    .flatMap(d => d.spots)
    .find(s => s.id === selectedSpotId) || null;

  // Update spot data
  const updateSpot = (spotId: string, updates: Partial<Spot>) => {
    const newItinerary = tripData.itinerary.map(day => ({
      ...day,
      spots: day.spots.map(spot => 
        spot.id === spotId ? { ...spot, ...updates } : spot
      ).sort((a, b) => a.time.localeCompare(b.time))
    }));
    setTripData({ ...tripData, itinerary: newItinerary });
  };

  const handleAddSpot = (e: React.FormEvent) => {
    e.preventDefault();
    const spotToAdd: Spot = {
      ...newSpot,
      id: `custom-${Date.now()}`,
      long_desc: newSpot.desc || "這是您的私人行程地點。",
      transports: [{ type: "自訂", detail: "自行規劃路徑", cost: "--", is_best: true }],
      selectedTransportIdx: 0,
      map_code: "請參考地圖",
      phone: "",
      seat_info: "私人行程",
      lat: 35.1709, 
      lng: 136.8815
    };

    const newItinerary = [...tripData.itinerary];
    const dayIdx = newItinerary.findIndex(d => d.day === activeDay);
    
    if (dayIdx > -1) {
      newItinerary[dayIdx].spots = [...newItinerary[dayIdx].spots, spotToAdd].sort((a, b) => a.time.localeCompare(b.time));
    } else {
      newItinerary.push({ day: activeDay, date: `第 ${activeDay} 天`, spots: [spotToAdd] });
    }

    setTripData({ ...tripData, itinerary: newItinerary });
    setIsAddModalOpen(false);
    setNewSpot({ name: '', time: '09:00', address: '', desc: '', type: 'hotel' });
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 max-w-md mx-auto shadow-2xl overflow-hidden font-sans border-x relative text-slate-900">
      {/* Top Header */}
      <div className={`${tripData.theme_color} text-white p-6 pt-10 shadow-lg relative overflow-hidden shrink-0`}>
        <div className="relative z-10">
          <h1 className="text-2xl font-black tracking-tight">{activeView === 'itinerary' ? tripData.title : '工具與導航'}</h1>
          <p className="text-xs text-indigo-200 mt-1 opacity-80">
            {activeView === 'itinerary' ? `正在規劃 Day ${activeDay}` : '自駕與官網預約連結'}
          </p>
        </div>
        <Car className="absolute -right-4 -bottom-4 text-white opacity-10 w-32 h-32" />
      </div>

      {activeView === 'itinerary' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
          {/* Day Selector */}
          <div className="flex bg-white border-b overflow-x-auto mb-2 py-2 space-x-2 no-scrollbar rounded-2xl p-1">
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <button
                key={d}
                onClick={() => setActiveDay(d)}
                className={`flex-shrink-0 w-12 h-12 rounded-2xl flex flex-col items-center justify-center transition-all ${
                  activeDay === d ? 'bg-indigo-600 text-white shadow-lg scale-105' : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span className="text-[10px] font-bold">D{d}</span>
                <span className="text-lg font-black leading-none">{d}</span>
              </button>
            ))}
          </div>

          {/* Add Button */}
          <button 
            onClick={() => setIsAddModalOpen(true)} 
            className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-colors"
          >
            <Plus size={18} className="mr-2" /> 新增下榻飯店或餐廳
          </button>

          {/* Itinerary Cards */}
          {tripData.itinerary.find(d => d.day === activeDay)?.spots.map((spot) => (
            <div 
              key={spot.id} 
              onClick={() => setSelectedSpotId(spot.id)} 
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 active:scale-95 transition-all cursor-pointer hover:shadow-md"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-xl font-black text-xs">{spot.time}</div>
                <div className="flex space-x-1">
                  {spot.map_code && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter">MapCode</span>}
                </div>
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-1">{spot.name}</h3>
              <div className="flex items-center text-xs text-indigo-600 font-bold mb-3">
                <Star size={12} className="mr-1 fill-current" />
                {spot.transports[spot.selectedTransportIdx]?.type} · {spot.transports[spot.selectedTransportIdx]?.cost}
              </div>
              <p className="text-sm text-slate-500 bg-slate-50 p-3 rounded-2xl italic line-clamp-1">"{spot.desc}"</p>
            </div>
          ))}
          
          {/* Empty State if no spots */}
          {!tripData.itinerary.find(d => d.day === activeDay)?.spots.length && (
            <div className="text-center py-10 text-slate-400">
              <p>這一天還沒有安排行程</p>
            </div>
          )}
        </div>
      )}

      {activeView === 'transport' && <TransportView />}

      {/* Spot Detail Modal */}
      <SpotDetailModal 
        spot={selectedSpot} 
        onClose={() => setSelectedSpotId(null)} 
        onUpdateSpot={updateSpot} 
      />

      {/* Add Spot Modal */}
      <AddSpotModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdd={handleAddSpot} 
        newSpot={newSpot} 
        setNewSpot={setNewSpot} 
      />

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 w-full max-w-md bg-white/95 backdrop-blur-sm border-t border-slate-100 p-4 flex justify-around items-center z-[150] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button 
          onClick={() => setActiveView('itinerary')} 
          className={`flex flex-col items-center transition-all ${activeView === 'itinerary' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <Calendar size={24} strokeWidth={activeView === 'itinerary' ? 3 : 2} />
          <span className="text-[10px] mt-1 font-bold">行程規劃</span>
        </button>
        <button 
          onClick={() => setActiveView('transport')} 
          className={`flex flex-col items-center transition-all ${activeView === 'transport' ? 'text-indigo-600 scale-110' : 'text-slate-300 hover:text-slate-400'}`}
        >
          <Globe size={24} strokeWidth={activeView === 'transport' ? 3 : 2} />
          <span className="text-[10px] mt-1 font-bold">導航與預約</span>
        </button>
      </div>
    </div>
  );
}