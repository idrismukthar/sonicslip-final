import React from 'react';
import { Plane } from "lucide-react";

export function GlassVue({ data, profile, type, orientation, rangeLabel }: any) {
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
        <>
            <style>{`
                @keyframes shimmer {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                }
                .glass-shimmer {
                    animation: shimmer 3s ease-in-out infinite;
                }
                .perforation-line {
                    background: ${orientation === 'landscape' 
                        ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent)'
                        : 'linear-gradient(to right, transparent, rgba(255,255,255,0.1) 30%, rgba(255,255,255,0.1) 70%, transparent)'};
                }
            `}</style>

            <div className={`${orientation === 'landscape' ? 'w-[680px] h-[360px]' : 'w-[360px] h-[640px]'} relative rounded-[2.5rem] overflow-hidden`}
                style={{
                    background: 'linear-gradient(135deg, #0F172A 0%, #000000 100%)',
                }}
            >
                {/* AMBIENT GLOW */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 blur-3xl" />

                {/* GLASS PANEL */}
                <div className={`flex ${orientation === 'landscape' ? 'flex-row' : 'flex-col'} w-full h-full relative`}
                    style={{
                        backdropFilter: 'blur(30px) saturate(180%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                    }}
                >
                    {/* LEFT / TOP SECTION */}
                    <div className={`p-8 ${orientation === 'landscape' ? 'flex-1' : 'h-[65%]'} flex flex-col justify-between`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-white text-xl font-extralight tracking-[0.5em] uppercase">
                                    SONIC SLIP
                                </h2>
                                <p className="text-[7px] font-black text-[#BEE3F8] tracking-widest uppercase mt-1">GLASS VUE EDITION</p>
                            </div>
                            <div className="p-2.5 rounded-full bg-white/5 border border-white/10 shadow-inner">
                                <Plane className="text-[#BEE3F8]" size={18} />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">Passenger</p>
                                <p className="font-bold text-white text-lg uppercase truncate leading-none">{profile?.display_name || 'GUEST'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[7px] font-black text-white/30 uppercase tracking-widest mb-1">Seat</p>
                                <p className="text-2xl font-extralight text-[#BEE3F8] leading-none">12A</p>
                            </div>
                        </div>

                        <div className="h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                        {/* MANIFEST LIST - UPDATED WITH RANGE LABEL */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center mb-1">
                                <p className="text-[7px] font-black text-white/20 tracking-[0.4em] uppercase">MANIFEST // {type}</p>
                                <p className="text-[7px] font-bold text-[#BEE3F8]/40 tracking-widest uppercase">{rangeLabel}</p>
                            </div>
                            
                            {data?.slice(0, 5).map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center py-0.5">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[8px] font-black text-white/20">0{i+1}</span>
                                        <span className="text-[11px] font-bold text-white/90 uppercase truncate max-w-[150px]">{item?.name}</span>
                                    </div>
                                    <span className="text-[10px] font-medium text-[#BEE3F8]/80 tabular-nums">{getMetric(item)}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PERFORATION DIVIDER */}
                    <div className={`${orientation === 'landscape' ? 'w-[1px] h-full' : 'h-[1px] w-full'} perforation-line`} />

                    {/* RIGHT / BOTTOM STUB */}
                    <div className={`${orientation === 'landscape' ? 'w-[220px]' : 'flex-1'} p-8 flex flex-col justify-between bg-white/[0.02]`}>
                        <div className={`${orientation === 'landscape' ? 'space-y-6' : 'flex justify-between items-center gap-4'}`}>
                            {/* VISUALIZER */}
                            <div className={`${orientation === 'landscape' ? 'w-full h-14' : 'w-24 h-14'} rounded-xl flex items-end justify-around p-2 bg-black/20 border border-white/5 shadow-inner`}>
                                {[...Array(orientation === 'landscape' ? 16 : 8)].map((_, i) => (
                                    <div key={i} className="bg-gradient-to-t from-[#63B3ED] to-[#BEE3F8] w-[2px] rounded-full glass-shimmer"
                                        style={{height: `${30 + Math.random() * 70}%`}} />
                                ))}
                            </div>

                            <div className={`${orientation === 'landscape' ? 'space-y-3' : 'flex-1 grid grid-cols-2 gap-2 text-right'}`}>
                                <div className="border-b border-white/5 pb-1">
                                    <p className="text-[6px] text-white/30 uppercase">Date</p>
                                    <p className="text-[9px] text-white/80">{purchaseDate}</p>
                                </div>
                                <div className="border-b border-white/5 pb-1">
                                    <p className="text-[6px] text-white/30 uppercase">Gate</p>
                                    <p className="text-[9px] text-white/80">GATE 25</p>
                                </div>
                            </div>
                        </div>

                        {/* BRANDING FOOTER */}
                        <div className={`text-center pt-4 border-t border-white/5 ${orientation === 'portrait' ? 'flex justify-between items-end border-none pt-0' : ''}`}>
                            <div className={orientation === 'portrait' ? 'text-left' : ''}>
                                <p className="text-[7px] font-black text-white/20 tracking-[0.2em] uppercase leading-relaxed">
                                    Made with ❤️ by <span className="text-white/60 italic tracking-normal capitalize text-[9px]">mhooky</span> <br />
                                    <span className="lowercase opacity-40">sonicslip.vercel.app</span>
                                </p>
                            </div>
                            <div className="mt-3 text-[7px] text-[#BEE3F8]/30 font-black tracking-[0.5em] uppercase italic">Bon Voyage ✈️</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}