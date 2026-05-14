
import React, { useState } from 'react';
import { MOCK_LABS } from '../constants';
import { FlaskConical, Clock, Users, ChevronRight, Info, CheckCircle2 } from 'lucide-react';

const Labs: React.FC = () => {
  const [selectedLab, setSelectedLab] = useState(MOCK_LABS[0]);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left: Lab List */}
        <div className="md:w-1/3 space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Practical Labs</h2>
            <p className="text-slate-500">Your scheduled practical sessions</p>
          </div>
          
          {MOCK_LABS.map((lab) => (
            <button
              key={lab.id}
              onClick={() => setSelectedLab(lab)}
              className={`w-full text-left p-5 rounded-2xl border transition-all relative overflow-hidden ${
                selectedLab.id === lab.id 
                  ? 'bg-white border-indigo-600 shadow-lg shadow-indigo-100' 
                  : 'bg-white border-slate-100 hover:border-indigo-200 opacity-70 hover:opacity-100'
              }`}
            >
              {selectedLab.id === lab.id && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-indigo-600"></div>
              )}
              <div className="flex justify-between items-start mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                   selectedLab.id === lab.id ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500'
                }`}>Batch {lab.batch}</span>
              </div>
              <h4 className="font-bold text-slate-800">{lab.name}</h4>
              <p className="text-xs text-slate-500 mt-1">{lab.subject}</p>
            </button>
          ))}
        </div>

        {/* Right: Lab Details (The Premium Look) */}
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200 border border-slate-50 min-h-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-10 border-b border-slate-100">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-indigo-200 transform rotate-3">
                  <FlaskConical size={40} />
                </div>
                <div>
                  <h3 className="text-3xl font-extrabold text-indigo-950">{selectedLab.name}</h3>
                  <p className="text-indigo-600 font-semibold">{selectedLab.subject}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-indigo-50 px-4 py-2 rounded-2xl flex items-center gap-2 border border-indigo-100">
                  <Clock size={16} className="text-indigo-600" />
                  <span className="text-sm font-bold text-indigo-900">{selectedLab.time}</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-800 flex items-center gap-2 mb-4">
                    <Info size={18} className="text-indigo-600" />
                    Practical Instructions
                  </h4>
                  <ul className="space-y-4">
                    {selectedLab.instructions.map((inst, i) => (
                      <li key={i} className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed">
                        <CheckCircle2 size={18} className="text-teal-500 shrink-0" />
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-teal-500 rounded-3xl p-6 text-white shadow-lg shadow-teal-100">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <Users size={20} />
                    Faculty In-Charge
                  </h4>
                  <p className="font-bold text-lg">{selectedLab.faculty}</p>
                  <p className="text-teal-100 text-sm">Department of AI & Data Science</p>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-slate-800 mb-4">Equipment & Resources</h4>
                <div className="grid grid-cols-2 gap-4">
                  {['Workstation Pro', 'Python IDE', 'GPU Clusters', 'Datasets'].map((item, i) => (
                    <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex flex-col items-center text-center hover:shadow-md transition-shadow group">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors mb-2">
                         <Info size={18} />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white">
                   <h5 className="font-bold mb-2">Lab Status</h5>
                   <div className="flex items-center gap-2 text-teal-400 font-bold mb-4">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                      Currently Active
                   </div>
                   <button className="w-full py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-700 transition-colors">Mark Attendance</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
