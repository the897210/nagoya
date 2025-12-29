import React from 'react';
import { NewSpotState } from '../types';

interface AddSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (e: React.FormEvent) => void;
  newSpot: NewSpotState;
  setNewSpot: React.Dispatch<React.SetStateAction<NewSpotState>>;
}

export const AddSpotModal: React.FC<AddSpotModalProps> = ({ 
  isOpen, 
  onClose, 
  onAdd, 
  newSpot, 
  setNewSpot 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <div className="bg-white w-full max-w-sm rounded-[40px] p-8 animate-in zoom-in duration-200">
        <h2 className="text-2xl font-black mb-6">新增行程點</h2>
        <form onSubmit={onAdd} className="space-y-4">
          <input 
            required 
            value={newSpot.name} 
            onChange={e => setNewSpot({...newSpot, name: e.target.value})} 
            className="w-full bg-slate-100 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            placeholder="名稱 (如: 名古屋希爾頓)" 
          />
          <div className="flex space-x-2">
            <input 
              type="time" 
              required 
              value={newSpot.time} 
              onChange={e => setNewSpot({...newSpot, time: e.target.value})} 
              className="flex-1 bg-slate-100 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none" 
            />
            <select 
              value={newSpot.type} 
              onChange={e => setNewSpot({...newSpot, type: e.target.value})} 
              className="flex-1 bg-slate-100 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
            >
              <option value="hotel">飯店</option>
              <option value="restaurant">餐廳</option>
              <option value="shopping">購物</option>
              <option value="landmark">景點</option>
            </select>
          </div>
          <textarea 
            value={newSpot.desc} 
            onChange={e => setNewSpot({...newSpot, desc: e.target.value})} 
            className="w-full bg-slate-100 border-none rounded-2xl p-4 text-sm h-24 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
            placeholder="備註..." 
          />
          <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-3xl font-bold hover:bg-indigo-700 transition-colors">確認新增</button>
          <button type="button" onClick={onClose} className="w-full text-slate-400 text-sm mt-2 hover:text-slate-600">取消</button>
        </form>
      </div>
    </div>
  );
};