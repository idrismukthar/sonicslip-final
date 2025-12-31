import React from 'react';
import { Plane } from "lucide-react";

export function MonoRaw({ data, profile, type, orientation }: any) {
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
                @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
                
                .mono-raw-container {
                    font-family: 'Space Mono', monospace;
                }
                .grain-overlay {
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
                    opacity: 0.03;
                    pointer-events: none;
                }
                .cutout-perforate {
                    width: 24px;
                    height: 24px;
                    background: #000;
                    border-radius: 50%;
                    position: absolute;
                    z-index: 20;
                }
            `}</style>

            <div className={`mono-raw-container ${orientation === 'landscape' ? 'w-[700px] h-[400px] flex' : 'w-[380px] flex flex-col'} bg-white text-black relative overflow-hidden border-[6px] border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]`}>
                <div className="absolute inset-0 grain-overlay" />

                {/* MAIN CONTENT SECTION */}
                <div className={`relative flex-[1.5] border-black ${orientation === 'landscape' ? 'border-r-[6px] p-8' : 'border-b-[6px] p-6'} flex flex-col justify-between`}>
                    
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h1 className="text-4xl font-bold leading-none tracking-tighter italic">SONIC_SLIP</h1>
                            <p className="text-[10px] mt-2 font-bold bg-black text-white inline-block px-2 py-0.5 tracking-widest">MONO_RAW_EDITION</p>
                        </div>
                        <div className="border-4 border-black p-2">
                            <Plane size={32} strokeWidth={3} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="border-2 border-black p-3">
                            <span className="text-[9px] font-bold block mb-1">PASSENGER_ID:</span>
                            <span className="text-xl font-bold uppercase truncate block">{profile?.display_name || 'NULL_USER'}</span>
                        </div>
                        <div className="border-2 border-black p-3 bg-black text-white">
                            <span className="text-[9px] font-bold block mb-1">SECTION:</span>
                            <span className="text-3xl font-bold leading-none block text-center">12A</span>
                        </div>
                    </div>

                    {/* DATA LIST - Optimized for 5 items */}
                    <div className="space-y-0.5">
                        <div className="flex justify-between text-[10px] font-bold border-b-2 border-black pb-1 mb-2">
                            <span>INDEX/ITEM_NAME</span>
                            <span>METRIC</span>
                        </div>
                        {data?.slice(0, 5).map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-center py-1 border-b border-black/10">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-bold opacity-50">0{i+1}</span>
                                    <span className="text-[12px] font-bold uppercase truncate max-w-[200px]">{item?.name}</span>
                                </div>
                                <span className="text-[12px] font-bold tabular-nums">{getMetric(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STUB SECTION */}
                <div className="relative flex-1 p-8 flex flex-col justify-between bg-zinc-50">
                    {/* PERFORATION HOLES */}
                    <div className={`cutout-perforate ${orientation === 'landscape' ? '-left-[15px] top-1/2 -translate-y-1/2' : 'left-1/2 -top-[15px] -translate-x-1/2'}`} />
                    
                    <div className="space-y-6">
                        <div className="border-2 border-black p-2 bg-white">
                            <div className="h-14 w-full flex gap-1 items-center justify-center overflow-hidden">
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className="bg-black w-[2px]" style={{ height: `${20 + Math.random() * 80}%` }} />
                                ))}
                            </div>
                            <p className="text-[8px] font-bold text-center mt-1 tracking-[0.5em]">SN-9920-XC</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between border-b border-black text-[10px] font-bold py-1">
                                <span>ISSUE_DATE</span>
                                <span className="text-black">{purchaseDate}</span>
                            </div>
                            <div className="flex justify-between border-b border-black text-[10px] font-bold py-1">
                                <span>GATE_ENTRY</span>
                                <span>L-04</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold py-1">
                                <span>STATUS</span>
                                <span className="animate-pulse text-red-600">CONFIRMED</span>
                            </div>
                        </div>
                    </div>

                    {/* BRANDING & CREDITS */}
                    <div className="pt-4 mt-4 border-t-4 border-black border-dotted">
                        <p className="text-[10px] font-bold leading-tight uppercase">
                            Made with ❤️ by mhooky <br/>
                            <span className="text-[12px] block mt-1 underline tracking-tight">sonicslip.vercel.app</span>
                        </p>
                        <p className="text-[7px] mt-2 opacity-50 font-bold">NO REFUNDS ON VIBES // 2025</p>
                    </div>
                </div>
            </div>
        </>
    );
}