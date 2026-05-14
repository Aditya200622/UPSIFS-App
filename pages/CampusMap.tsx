
import React from 'react';
import { Map, MapPin, Building2, Book, FlaskConical, Coffee } from 'lucide-react';

const CampusMap: React.FC = () => {
  const points = [
    { name: 'Admin Block', icon: Building2, x: '20%', y: '30%' },
    { name: 'Central Library', icon: Book, x: '50%', y: '40%' },
    { name: 'IT & AI Lab', icon: FlaskConical, x: '70%', y: '25%' },
    { name: 'Main Canteen', icon: Coffee, x: '45%', y: '70%' },
    { name: 'Boys Hostel', icon: MapPin, x: '80%', y: '80%' },
  ];

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto h-full flex flex-col">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Campus Navigator</h2>
          <p className="text-slate-500">Static map for offline reference.</p>
        </div>
        <div className="hidden md:flex gap-2">
           <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100">Download PDF Map</button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-[3rem] border border-slate-200 relative overflow-hidden shadow-2xl shadow-slate-200 min-h-[500px]">
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-slate-50">
           <svg className="w-full h-full opacity-5" viewBox="0 0 100 100">
             <defs>
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="black" strokeWidth="0.5"/>
               </pattern>
             </defs>
             <rect width="100" height="100" fill="url(#grid)" />
           </svg>
           
           {/* Abstract Campus Shapes */}
           <div className="absolute top-1/4 left-1/4 w-32 h-20 bg-indigo-100 rounded-xl border border-indigo-200 transform rotate-12"></div>
           <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-teal-50 rounded-full border border-teal-100 -translate-x-1/2 -translate-y-1/2"></div>
           <div className="absolute bottom-1/4 right-1/4 w-48 h-24 bg-rose-50 rounded-[2rem] border border-rose-100 transform -rotate-6"></div>
        </div>

        {/* Map Points */}
        {points.map((p, i) => {
          const Icon = p.icon;
          return (
            <div 
              key={i} 
              className="absolute group"
              style={{ left: p.x, top: p.y }}
            >
              <div className="relative flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-125">
                <div className="bg-white p-3 rounded-2xl shadow-xl border border-slate-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Icon size={24} />
                </div>
                <div className="mt-3 bg-slate-900/80 backdrop-blur px-3 py-1.5 rounded-xl text-white text-[10px] font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {p.name}
                </div>
                <div className="w-2 h-2 rounded-full bg-indigo-600 mt-2 animate-ping absolute -bottom-4"></div>
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-10 left-10 p-6 bg-white/90 backdrop-blur rounded-[2rem] border border-slate-200 shadow-xl max-w-xs">
           <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Map size={18} className="text-indigo-600" />
             Campus Legend
           </h4>
           <div className="space-y-3">
             {points.map((p, i) => (
               <div key={i} className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                    <p.icon size={16} />
                 </div>
                 <span className="text-xs font-bold text-slate-600">{p.name}</span>
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default CampusMap;
