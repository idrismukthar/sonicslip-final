import React from 'react';
import { Plane } from "lucide-react";

export function NeoSynth({ data, profile, type, orientation, rangeLabel }: any) {
    const purchaseDate = new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();

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
                @keyframes glitch {
                    0% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #FF00E5, -2px 0 #05D9E8, 2px 0 #D65BCA; }
                    15% { text-shadow: -2px -2px 0px #FF00E5, 2px 2px 0px #05D9E8, 0 0 8px #FF00E5; }
                    50% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #FF00E5, -2px 0 #05D9E8, 2px 0 #D65BCA; }
                    100% { text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #FF00E5, -2px 0 #05D9E8, 2px 0 #D65BCA; }
                }
                .glitch-text { animation: glitch 4s infinite; }
                @keyframes scanlines { 0% { transform: translateY(0); } 100% { transform: translateY(10px); } }
                .scanlines { animation: scanlines 8s linear infinite; }
                @keyframes gridMove { 0% { transform: perspective(500px) rotateX(70deg) translateZ(0); } 100% { transform: perspective(500px) rotateX(70deg) translateZ(100px); } }
                .grid-floor { animation: gridMove 6s linear infinite; }
            `}</style>

            <div className={`${orientation === 'landscape' ? 'w-[680px] h-[360px] flex' : 'w-[360px] h-[640px] flex flex-col'} bg-[#1A0B2E] rounded-[3rem] shadow-[0_50px_100px_rgba(255,0,229,0.3)] overflow-hidden font-mono border-2 border-[#FF00E5]/40 relative`}>
                
                {/* CRT OVERLAYS */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] scanlines z-20" />
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.5)_100%)] z-10" />
                
                {/* LEFT / TOP SECTION */}
                <div className={`p-8 ${orientation === 'landscape' ? 'flex-1 border-r-2 border-dashed border-[#FF00E5]/30' : 'h-[62%] border-b-2 border-dashed border-[#FF00E5]/30'} relative z-5 flex flex-col justify-between`}>
                    <div className="flex justify-between items-start">
                        <div className="leading-tight">
                            <h2 className="text-[#FF00E5] text-2xl font-black italic tracking-tighter uppercase glitch-text" style={{textShadow: '0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #FF00E5'}}>Sonic Slip</h2>
                            <p className="text-[8px] font-bold text-[#05D9E8]/60 tracking-[0.3em]">NEO-SYNTH EDITION</p>
                        </div>
                        <div className="p-2.5 bg-[#FF00E5]/15 rounded-full border border-[#FF00E5]/40">
                            <Plane className="text-[#FF00E5]" size={20} />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[8px] text-[#05D9E8]/50 uppercase font-black mb-1 tracking-widest">Passenger</p>
                            <p className="font-bold text-white text-lg uppercase truncate leading-none" style={{ fontFamily: 'sans-serif' }}>
                                {profile?.display_name || 'GUEST'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-[8px] text-[#05D9E8]/50 uppercase font-black mb-1 tracking-widest">Seat</p>
                            <p className="text-3xl font-black text-[#FF00E5] leading-none" style={{textShadow: '0 0 15px #FF00E5'}}>12A</p>
                        </div>
                    </div>

                    {/* MANIFEST - Updated with rangeLabel */}
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2 mb-1">
                            <p className="text-[7px] text-[#05D9E8] font-black tracking-[0.3em] uppercase">{type}</p>
                            <div className="h-[1px] flex-1 bg-gradient-to-r from-[#05D9E8]/40 via-[#FF00E5]/40 to-transparent"></div>
                            <p className="text-[7px] text-[#FF00E5] font-black tracking-[0.2em] uppercase">{rangeLabel}</p>
                        </div>
                        {data?.slice(0, 5).map((item: any, i: number) => (
                            <div key={item?.id || i} className="flex justify-between items-center border-b border-[#FF00E5]/10 pb-1">
                                <div className="flex items-center gap-3">
                                    <span className="text-[8px] font-black text-[#FF00E5]/40 italic">0{i+1}</span>
                                    <span className="text-[11px] font-bold text-[#05D9E8] uppercase truncate max-w-[170px]">{item?.name}</span>
                                </div>
                                <span className="text-[10px] font-black text-[#FF00E5] tabular-nums">{getMetric(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT / BOTTOM STUB */}
                <div className={`${orientation === 'landscape' ? 'w-[220px]' : 'flex-1'} bg-gradient-to-b from-[#2D1254]/80 to-[#1A0B2E] p-8 flex flex-col justify-between relative z-5`}>
                    <div className="space-y-4">
                        <div className="w-full bg-black/60 rounded border-2 border-[#FF00E5]/30 overflow-hidden">
                            <div className="h-10 flex items-end justify-around p-2 border-b border-[#FF00E5]/20">
                                {[...Array(15)].map((_, i) => (
                                    <div key={i} className="bg-[#FF00E5] w-[1.5px] rounded-full" 
                                         style={{height: `${20 + Math.random() * 80}%`, boxShadow: '0 0 8px #FF00E5'}} />
                                ))}
                            </div>
                            <div className="h-8 relative overflow-hidden" style={{ backgroundSize: '40px 40px', backgroundImage: 'linear-gradient(rgba(5, 217, 232, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(5, 217, 232, 0.1) 1px, transparent 1px)' }}>
                                <div className="grid-floor absolute inset-0" />
                            </div>
                        </div>

                        <div className="space-y-2 text-[8px] font-black uppercase tracking-widest text-[#05D9E8]/50">
                            <div className="flex justify-between border-b border-[#FF00E5]/15 pb-1">
                                <span>Date</span>
                                <span className="text-white/70 tracking-normal">{purchaseDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Term</span>
                                <span className="text-[#FF00E5] font-black tracking-normal uppercase">{rangeLabel?.split(' ')[0]}</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-center pt-4 border-t border-[#FF00E5]/20">
                        <p className="text-[8px] font-black text-[#05D9E8]/40 tracking-[0.2em] uppercase leading-relaxed">
                            Made with ❤️ by <span className="text-white/40 italic tracking-normal capitalize text-[9px]">mhooky</span> <br />
                            <span className="lowercase opacity-50">sonicslip.vercel.app</span>
                        </p>
                        <div className="mt-2 text-[7px] text-[#FF00E5]/40 font-black tracking-[0.5em] uppercase">Bon Voyage</div>
                    </div>
                </div>
            </div>
        </>
    );
}