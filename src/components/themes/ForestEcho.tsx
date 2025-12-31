import React from 'react';
import { Leaf, Trees } from "lucide-react";

export function ForestEcho({ data, profile, type, orientation }: any) {
    const purchaseDate = new Date().toLocaleDateString('en-US', { 
        day: '2-digit', month: 'long', year: 'numeric' 
    });
    
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
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,600;1,9..144,300&family=Inter:wght@400;700&display=swap');
                
                .forest-container {
                    font-family: 'Inter', sans-serif;
                    background-color: #FDFCF5;
                    background-image: url("https://www.transparenttextures.com/patterns/paper-fibers.png");
                }
                .serif-text { font-family: 'Fraunces', serif; }
                
                .stamp-seal {
                    border: 2px solid #4A5D4E;
                    color: #4A5D4E;
                    border-radius: 50%;
                    transform: rotate(-12deg);
                    opacity: 0.7;
                }
            `}</style>

            <div className={`forest-container ${orientation === 'landscape' ? 'w-[680px] h-[380px] flex' : 'w-[360px] flex flex-col'} relative overflow-hidden rounded-xl shadow-2xl border border-[#E5E2D0]`}>
                
                {/* WATERMARK */}
                <div className="absolute top-10 right-10 opacity-[0.04] pointer-events-none">
                    <Trees size={orientation === 'landscape' ? 320 : 280} strokeWidth={1} />
                </div>

                {/* LEFT SECTION (SAMPLES) */}
                <div className={`flex-[1.6] ${orientation === 'landscape' ? 'p-8 pr-6 border-r' : 'p-8 border-b'} border-[#E5E2D0] relative flex flex-col justify-between`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <h2 className="serif-text text-2xl font-semibold text-[#1A2F23] italic tracking-tight leading-none">Forest Echo</h2>
                            <p className="text-[7px] font-bold tracking-[0.4em] text-[#4A5D4E]/70 uppercase">Botanical Audio Manifest • 2025</p>
                        </div>
                        <Leaf className="text-[#4A5D4E]/60" size={22} strokeWidth={1.5} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
                            <span className="text-[8px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-1">Subject</span>
                            <p className="serif-text text-xl text-[#1A2F23] font-medium truncate">{profile?.display_name || 'Forest Guest'}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[8px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-1">Habitat</span>
                            <p className="serif-text text-3xl text-[#D4A373] font-bold leading-none">24B</p>
                        </div>
                    </div>

                    {/* LIST AREA - Tightened slightly to ensure 5th item fits */}
                    <div className="space-y-1.5">
                        <div className="h-[1px] bg-[#E5E2D0] w-full mb-2 flex justify-center items-center">
                            <span className="bg-[#FDFCF5] px-3 text-[7px] font-black text-[#4A5D4E]/40 tracking-[0.3em] uppercase">Collected Samples</span>
                        </div>
                        {data?.slice(0, 5).map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-end leading-tight">
                                <div className="flex items-baseline gap-2">
                                    <span className="serif-text italic text-[10px] text-[#4A5D4E]/40">{i+1}.</span>
                                    <span className="serif-text text-[12px] text-[#1A2F23] font-semibold truncate max-w-[180px]">{item?.name}</span>
                                </div>
                                <div className="flex-1 border-b border-dotted border-[#E5E2D0]/60 mx-2 mb-1" />
                                <span className="text-[10px] font-bold text-[#4A5D4E] tabular-nums">{getMetric(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SECTION (STUB) */}
                <div className={`flex-1 p-8 ${orientation === 'landscape' ? 'flex flex-col justify-between' : 'space-y-10'} bg-[#F9F8F0]/50 relative`}>
                    
                    <div className="space-y-6 relative z-10">
                        {/* STAMP */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 stamp-seal flex items-center justify-center flex-col border-dashed bg-white/30 backdrop-blur-[2px]">
                            <span className="text-[6px] font-black text-center leading-tight uppercase text-[#4A5D4E]">Certified<br/>Organic<br/>Sonic</span>
                        </div>

                        <div className="pt-2">
                            <span className="text-[8px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-4">Observation Data</span>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#E5E2D0] pb-1">
                                    <span className="text-[9px] font-bold text-[#4A5D4E]/70 uppercase">Date</span>
                                    <span className="serif-text text-[11px] italic font-semibold text-[#1A2F23]">{purchaseDate}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#E5E2D0] pb-1">
                                    <span className="text-[9px] font-bold text-[#4A5D4E]/70 uppercase">Origin</span>
                                    <span className="serif-text text-[11px] italic font-semibold text-[#1A2F23]">Deep Wilds</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BARCODE & CREDITS */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center gap-[2px] opacity-40 h-6 items-end">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="w-[1.5px] bg-[#1A2F23]" style={{ height: `${Math.random() * 100}%` }} />
                            ))}
                        </div>
                        <div className="space-y-1">
                            <p className="text-[7px] text-[#4A5D4E]/80 leading-relaxed uppercase tracking-[0.1em] font-bold">
                                Made with ❤️ by mhooky
                            </p>
                            <p className="text-[8px] text-[#1A2F23] serif-text italic font-bold tracking-tight">
                                sonicslip.vercel.app
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}