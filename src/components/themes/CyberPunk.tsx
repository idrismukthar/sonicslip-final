import React from 'react';
import { Plane } from "lucide-react";

export function CyberPunk({ data, profile, type, orientation, rangeLabel }: any) {
    const purchaseDate = new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'short', year: 'numeric' 
    }).toUpperCase();
    
    const getMetric = (item: any) => {
        if (!item) return "---";
        if (type === 'tracks') {
            const min = Math.floor((item.duration_ms || 0) / 60000);
            const sec = (((item.duration_ms || 0) % 60000) / 1000).toFixed(0);
            return `${min}:${sec.padStart(2, '0')}`;
        }
        if (type === 'artists') return item?.followers?.total ? item.followers.total.toLocaleString() : "0";
        if (type === 'albums') return `${item?.total_tracks || 0} TRKS`;
        return "---";
    };

    return (
        <div id="boarding-pass" 
            className={`${orientation === 'landscape' ? 'w-[680px] h-[360px] flex' : 'w-[360px] h-[640px] flex flex-col'} bg-[#151515] rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] overflow-hidden font-mono border border-white/10 relative transition-all duration-500`}
        >
            {/* MAIN SECTION */}
            <div className={`p-8 ${orientation === 'landscape' ? 'flex-1 border-r border-dashed border-white/10' : 'h-[65%] border-b border-dashed border-white/10'} flex flex-col justify-between`}>
                
                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="leading-tight">
                        <h2 className="text-[#00FFF0] text-2xl font-black italic tracking-tighter uppercase">Sonic Slip</h2>
                        <p className="text-[8px] font-bold text-white/20 tracking-[0.3em]">AIRLINES BOARDING PASS</p>
                    </div>
                    <div className="p-3 bg-[#00FFF0]/10 rounded-full">
                       <Plane className="text-[#00FFF0] rotate-45" size={20} />
                    </div>
                </div>

                {/* Passenger Info */}
                <div className="grid grid-cols-2 gap-6">
                    <div>
                        <p className="text-[8px] text-white/30 uppercase font-black mb-1">Passenger Name</p>
                        <p className="font-bold text-white text-xl uppercase truncate leading-none family-sans" style={{ fontFamily: 'sans-serif' }}>
                            {profile?.display_name || 'GUEST'}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-[8px] text-white/30 uppercase font-black mb-1">Seat</p>
                        <p className="text-3xl font-black text-[#00FFF0] leading-none">12A</p>
                    </div>
                </div>

                {/* Itinerary Section - UPDATED TO SHOW BOTH TYPE AND RANGE */}
                <div className="space-y-2">
                   <div className="flex items-center justify-between mb-1">
                        <p className="text-[8px] text-[#00FFF0] font-black tracking-[0.2em] uppercase">
                            ITINERARY // {type}
                        </p>
                        <p className="text-[8px] text-white/40 font-black tracking-[0.1em] uppercase">
                            {rangeLabel}
                        </p>
                   </div>
                   <div className="h-[1px] w-full bg-white/10 mb-3"></div>
                   
                   {data?.slice(0, 5).map((item: any, i: number) => (
                       <div key={item?.id || i} className="flex justify-between items-center py-0.5">
                           <div className="flex items-center gap-4 overflow-hidden">
                               <span className="text-[10px] font-black text-white/10 italic">0{i+1}</span>
                               <span className="text-[11px] font-bold text-white uppercase truncate max-w-[180px]">{item?.name || 'Unknown'}</span>
                           </div>
                           <span className="text-[10px] font-black text-[#00FFF0] tracking-tighter tabular-nums">{getMetric(item)}</span>
                       </div>
                   ))}
                </div>
            </div>

            {/* STUB SECTION */}
            <div className={`${orientation === 'landscape' ? 'w-[220px]' : 'flex-1'} bg-white/[0.03] p-8 flex flex-col justify-between`}>
                <div className="space-y-6">
                    {/* Visualizer */}
                    <div className="w-full h-12 bg-black/40 rounded-xl overflow-hidden flex items-end justify-around p-2 border border-white/5 shadow-inner">
                        {[...Array(orientation === 'landscape' ? 20 : 30)].map((_, i) => (
                            <div key={i} className="bg-[#00FFF0] opacity-40 w-[2px] rounded-full" 
                                style={{ height: `${20 + Math.random() * 80}%` }} 
                            />
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 text-[9px] font-black uppercase tracking-widest text-white/20 italic">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span>Date</span>
                            <span className="text-white/60 not-italic tracking-normal">{purchaseDate}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                            <span>Terminal</span>
                            <span className="text-white/60 not-italic tracking-normal">GATE-25</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Class</span>
                            <span className="text-[#00FFF0] not-italic tracking-normal">FIRST CLASS</span>
                        </div>
                    </div>
                </div>

                {/* Footer Credits */}
                <div className="mt-4 text-center space-y-2">
                    <p className="text-[8px] font-black text-white/10 tracking-[0.2em] uppercase leading-relaxed">
                        Made with ❤️ by <span className="text-white/40 italic tracking-normal capitalize text-[10px]">mhooky</span> <br />
                        <span className="lowercase opacity-50">sonicslip.vercel.app</span>
                    </p>
                    <div className="pt-2 border-t border-white/5 text-[7px] text-[#00FFF0]/40 font-black tracking-[0.5em] uppercase italic">Bon Voyage ✈️</div>
                </div>
            </div>
        </div>
    );
}