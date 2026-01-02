import React from 'react';
import { Leaf, Trees } from "lucide-react";

export function ForestEcho({ data, profile, type, orientation, rangeLabel }: any) {
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
                    background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4N3d3dtbW17e3t1dXWBgYGHh4eAgIA4ODg6Ojo8PDw0NDSAgIBwcHB0dHRycnJ9fX1xcXF8fHxwXHBwXHBwXHBwXHBwXHBwXHBwXHBwXHB6Y66yAAAADXRSTlMAmZlmZpmZmZlmZpmZmS39mscAAAAJcEhZcwAACxMAAAsTAQCanBgAAABPSURBVEjH7dKxDgAgCAPRu/j/R8uSxcXERm6YpG8S7C7mKqID7FmD9lxDe66hPdfQnmtov9fQfquh/VZD+62G9lsN7bca2m81tN9qaL/V0H77A0x5A9Xm89vFAAAAAElFTkSuQmCC");
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

            <div className={`forest-container ${orientation === 'landscape' ? 'w-[680px] h-[380px] flex' : 'w-[360px] flex flex-col'} relative overflow-hidden rounded-[3rem] shadow-2xl border border-[#E5E2D0]`}>
                
                {/* WATERMARK */}
                <div className="absolute top-10 right-10 opacity-[0.04] pointer-events-none">
                    <Trees size={orientation === 'landscape' ? 320 : 280} strokeWidth={1} />
                </div>

                {/* LEFT SECTION */}
                <div className={`flex-[1.6] ${orientation === 'landscape' ? 'p-10 pr-6 border-r' : 'p-10 border-b'} border-[#E5E2D0] relative flex flex-col justify-between`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className="space-y-1">
                            <h2 className="serif-text text-3xl font-semibold text-[#1A2F23] italic tracking-tight leading-none">Forest Echo</h2>
                            <p className="text-[8px] font-bold tracking-[0.4em] text-[#4A5D4E]/70 uppercase">Botanical Audio Manifest • 2026</p>
                        </div>
                        <Leaf className="text-[#4A5D4E]/60" size={24} strokeWidth={1.5} />
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-4">
                        <div>
                            <span className="text-[9px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-1">Subject</span>
                            <p className="serif-text text-xl text-[#1A2F23] font-medium truncate">{profile?.display_name || 'Forest Guest'}</p>
                        </div>
                        <div className="text-right">
                            <span className="text-[9px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-1">Habitat</span>
                            <p className="serif-text text-3xl text-[#D4A373] font-bold leading-none">26A</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* UPDATED HEADER: Now shows Type and RangeLabel */}
                        <div className="flex justify-between items-center px-1 mb-1">
                            <span className="text-[8px] font-black text-[#4A5D4E]/60 tracking-[0.2em] uppercase">SAMPLES // {type}</span>
                            <span className="text-[8px] font-bold text-[#D4A373] uppercase">{rangeLabel}</span>
                        </div>
                        <div className="h-[1px] bg-[#E5E2D0] w-full mb-3" />
                        
                        {data?.slice(0, 5).map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-end leading-tight py-0.5">
                                <div className="flex items-baseline gap-2 overflow-hidden">
                                    <span className="serif-text italic text-[11px] text-[#4A5D4E]/40">{i+1}.</span>
                                    <span className="serif-text text-[13px] text-[#1A2F23] font-semibold truncate max-w-[160px] md:max-w-[220px]">{item?.name}</span>
                                </div>
                                <div className="flex-1 border-b border-dotted border-[#E5E2D0]/60 mx-2 mb-1" />
                                <span className="text-[11px] font-bold text-[#4A5D4E] tabular-nums">{getMetric(item)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SECTION (STUB) */}
                <div className={`flex-1 p-10 ${orientation === 'landscape' ? 'flex flex-col justify-between' : 'space-y-10'} bg-[#F9F8F0]/50 relative`}>
                    
                    <div className="space-y-6 relative z-10">
                        {/* STAMP */}
                        <div className="absolute -top-6 -right-6 w-20 h-20 stamp-seal flex items-center justify-center flex-col border-dashed bg-white/30 backdrop-blur-[2px]">
                            <span className="text-[7px] font-black text-center leading-tight uppercase text-[#4A5D4E]">Certified<br/>Organic<br/>Sonic</span>
                        </div>

                        <div className="pt-2">
                            <span className="text-[9px] font-bold text-[#4A5D4E]/50 uppercase tracking-widest block mb-4">Observation Data</span>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center border-b border-[#E5E2D0] pb-1">
                                    <span className="text-[10px] font-bold text-[#4A5D4E]/70 uppercase">Date</span>
                                    <span className="serif-text text-[12px] italic font-semibold text-[#1A2F23]">{purchaseDate}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-[#E5E2D0] pb-1">
                                    <span className="text-[10px] font-bold text-[#4A5D4E]/70 uppercase">Origin</span>
                                    <span className="serif-text text-[12px] italic font-semibold text-[#1A2F23]">Deep Wilds</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center space-y-3">
                        <div className="flex justify-center gap-[2.5px] opacity-40 h-8 items-end">
                            {[...Array(24)].map((_, i) => (
                                <div key={i} className="w-[2px] bg-[#1A2F23]" style={{ height: `${20 + Math.random() * 80}%` }} />
                            ))}
                        </div>
                        <div className="space-y-1">
                            <p className="text-[8px] text-[#4A5D4E]/80 leading-relaxed uppercase tracking-[0.1em] font-bold">
                                Made with ❤️ by mhooky
                            </p>
                            <p className="text-[10px] text-[#1A2F23] serif-text italic font-bold tracking-tight">
                                sonicslip.vercel.app
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}