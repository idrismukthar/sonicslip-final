"use client";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import { getTopData, getUserProfile } from "@/lib/spotify";
import { RefreshCw, Share2, Download, X, Settings2, Smartphone, Layout, CheckCircle2, Coffee } from "lucide-react";
import Link from "next/link";
import { TicketRenderer } from "@/components/themes/themeEngine";

export default function Studio() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);
  
  const [type, setType] = useState<string>('tracks');
  const [range, setRange] = useState('short_term');
  const [theme, setTheme] = useState('CYBER_PUNK');
  
  const rangeLabel = range === 'short_term' ? 'LAST 7 DAYS' : 'LAST 31 DAYS';

  useEffect(() => {
    if (session?.accessToken) { fetchInitialData(); }
  }, [session, type, range]);

  const fetchInitialData = async () => {
    setLoading(true);
    setError(null);
    try {
      const topData = await getTopData(session!.accessToken as string, type, range);
      const userProfile = await getUserProfile(session!.accessToken as string);
      
      const items = type === 'albums' ? topData.items.map((i: any) => i.album) : 
                    type === 'shows' ? topData.items.map((i: any) => i.show) : 
                    topData.items;
      
      setData(items);
      setProfile(userProfile);
    } catch (err: any) { 
      setError(err.message || "Session Expired");
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    
    setDownloading(true);
    try {
      // Give the browser time to clear any hover states or animations
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = ticketRef.current;
      const canvas = await html2canvas(element, {
        useCORS: true,           
        allowTaint: false,       
        backgroundColor: null,   
        scale: 3,                // Higher quality for print/sharing
        logging: false,          
        imageTimeout: 20000,     
        // Explicitly capture the full dimensions of the element
        width: element.scrollWidth,
        height: element.scrollHeight,
        onclone: (clonedDoc) => {
          // Force the cloned element to be visible and properly sized
          const clonedElement = clonedDoc.body.querySelector('[data-ticket-wrapper]');
          if (clonedElement) {
            (clonedElement as HTMLElement).style.transform = 'none';
          }
        }
      });
      
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `sonicslip-${type}-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Download Error:', err);
      alert("I'm very sorry, the image generation is not working for now. Please try a screenshot while we correct this issue!");
    } finally {
      setDownloading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try { 
        await navigator.share({ 
          title: 'SonicSlip', 
          text: `Check out my top ${type} on SonicSlip!`, 
          url: window.location.href 
        }); 
      } catch (err) {}
    } else { 
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!"); 
    }
  };

  if (!session) return <div className="p-10 text-white font-mono text-center h-screen flex items-center justify-center bg-black">AUTHENTICATING...</div>;

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans flex flex-col md:flex-row overflow-hidden">
      
      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-5 bg-[#111] border-b border-white/5 z-30">
        <h1 className="text-xl font-black italic text-[#00FFF0]">SONICSLIP</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="flex items-center gap-2 bg-[#00FFF0] text-black px-4 py-2 rounded-full font-black text-[10px]">
          {sidebarOpen ? <X size={16}/> : <><Settings2 size={14}/> EDIT</>}
        </button>
      </div>

      {/* SIDEBAR */}
      <aside className={`
        fixed inset-0 z-40 bg-[#0F0F0F] p-8 flex flex-col gap-6 transition-transform duration-500
        md:relative md:translate-x-0 md:w-[380px] md:bg-[#111] md:border-r md:border-white/10
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="hidden md:block">
          <h1 className="text-3xl font-black italic text-[#00FFF0]">SONICSLIP</h1>
          <p className="text-[10px] uppercase opacity-30 tracking-[0.4em] mt-1">Studio v1.2</p>
        </div>

        <div className="flex flex-col gap-5 mt-8 md:mt-4 overflow-y-auto pb-20 scrollbar-hide">
          <section>
            <label className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 block">Orientation</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setOrientation('portrait')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-[10px] font-bold transition-all ${orientation === 'portrait' ? 'bg-white text-black border-white' : 'border-white/10 opacity-50'}`}><Smartphone size={14}/> PORTRAIT</button>
              <button onClick={() => setOrientation('landscape')} className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-[10px] font-bold transition-all ${orientation === 'landscape' ? 'bg-white text-black border-white' : 'border-white/10 opacity-50'}`}><Layout size={14}/> LANDSCAPE</button>
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 block">Category</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-xs font-bold outline-none cursor-pointer appearance-none">
              <option value="tracks">TOP TRACKS</option>
              <option value="artists">TOP ARTISTS</option>
              <option value="albums">TOP ALBUMS</option>
              <option value="shows">PODCASTS</option>
            </select>
          </section>

          <section>
            <label className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 block">Time Range</label>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setRange('short_term')} className={`p-3 text-[10px] font-bold rounded-xl border transition-all ${range === 'short_term' ? 'bg-[#00FFF0] text-black border-[#00FFF0]' : 'border-white/10'}`}>WEEKLY</button>
              <button onClick={() => setRange('medium_term')} className={`p-3 text-[10px] font-bold rounded-xl border transition-all ${range === 'medium_term' ? 'bg-[#00FFF0] text-black border-[#00FFF0]' : 'border-white/10'}`}>MONTHLY</button>
            </div>
          </section>

          <section>
            <label className="text-[10px] font-black opacity-40 uppercase tracking-widest mb-2 block">Style Theme</label>
            <div className="grid grid-cols-2 gap-2">
              {['CYBER_PUNK', 'NEO_SYNTH', 'GLASS_VUE', 'MONO_RAW' , 'FOREST_ECHO'].map((t) => (
                <button key={t} onClick={() => setTheme(t)} className={`py-3 rounded-xl border text-[9px] font-black transition-all ${theme === t ? 'border-[#00FFF0] text-[#00FFF0] bg-[#00FFF0]/5' : 'border-white/5 opacity-40'}`}>{t.replace('_', ' ')}</button>
              ))}
            </div>
          </section>

          <Link 
            href="https://buymeacoffee.com/idrismukthar?new=1" 
            target="_blank"
            className="flex items-center justify-center gap-2 p-4 bg-[#FFDD00] text-black rounded-xl text-[10px] font-black uppercase tracking-wider hover:brightness-110 transition-all mt-2"
          >
            <Coffee size={14}/> Support Dev
          </Link>
        </div>

        <div className="hidden md:flex mt-auto flex-col gap-3">
          <button onClick={handleDownload} disabled={downloading} className="w-full py-4 bg-[#00FFF0] text-black font-black rounded-2xl flex items-center justify-center gap-2 text-xs tracking-widest hover:brightness-110 transition-all disabled:opacity-50">
            <Download size={18}/> {downloading ? 'WORKING...' : 'DOWNLOAD PNG'}
          </button>
          <button onClick={handleShare} className="w-full py-4 bg-white/5 border border-white/10 font-bold rounded-2xl flex items-center justify-center gap-2 text-xs tracking-widest hover:bg-white/10 transition-all">
            <Share2 size={18}/> SHARE
          </button>
        </div>
      </aside>

      {/* MAIN VIEW */}
      <main className="flex-1 flex flex-col bg-[#050505] overflow-y-auto relative scrollbar-hide">
        <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
            {loading ? (
            <div className="flex flex-col items-center gap-4">
                <RefreshCw className="animate-spin text-[#00FFF0]" size={40} />
                <p className="text-[10px] font-mono tracking-[0.5em] text-[#00FFF0]">FETCHING DATA...</p>
            </div>
            ) : error ? (
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-red-400 font-mono text-[10px] mb-2">{error}</p>
                <button onClick={() => signOut()} className="bg-white text-black px-6 py-2 rounded-full font-black text-[10px]">RE-LOGIN</button>
            </div>
            ) : (
            <div className="flex flex-col items-center gap-8 w-full max-w-4xl mx-auto">
                <div 
                  data-ticket-wrapper
                  className={`transition-all duration-700 ${orientation === 'landscape' ? 'rotate-0' : 'scale-[0.85] sm:scale-95 md:scale-100'}`} 
                  ref={ticketRef}
                >
                  <TicketRenderer theme={theme} data={data} profile={profile} type={type} rangeLabel={rangeLabel} orientation={orientation} />
                </div>

                {/* MOBILE BUTTONS */}
                <div className="flex md:hidden flex-col gap-3 w-full max-w-[360px] pb-4">
                  <button onClick={handleDownload} disabled={downloading} className="w-full py-5 bg-[#00FFF0] text-black font-black rounded-[2rem] flex items-center justify-center gap-3 active:scale-[0.95] disabled:opacity-50">
                    <Download size={20} /> {downloading ? 'PROCESSING...' : 'DOWNLOAD PNG'}
                  </button>
                </div>
            </div>
            )}
        </div>
        {/* FOOTER AREA - ADS & LINKS */}
        <footer className="w-full mt-auto py-10 px-6 border-t border-white/5 bg-black/40 flex flex-col items-center gap-8">
          
          {/* ADSENSE UNIT */}
          <div className="w-full max-w-[728px] min-h-[90px] bg-white/5 rounded-lg flex items-center justify-center overflow-hidden">
            <ins className="adsbygoogle"
                 style={{ display: 'block', width: '100%' }}
                 data-ad-client="ca-pub-8655334992053664"
                 data-ad-slot="1582934500"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <Script id="adsense-init" strategy="afterInteractive">
               {`(adsbygoogle = window.adsbygoogle || []).push({});`}
            </Script>
          </div>

          {/* BOTTOM BAR */}
          <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] font-bold tracking-[0.3em] opacity-40 uppercase">
            <div className="flex flex-col items-center md:items-start gap-1 text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} SONICSLIP</p>
              <p className="text-[8px] opacity-60 mt-1">Made with ❤️ by mhooky • Bon voyage ✈️</p>
            </div>
            
            <Link 
              href="https://buymeacoffee.com/idrismukthar?new=1" 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-[#FFDD00] hover:text-black hover:opacity-100 transition-all text-[#FFDD00]"
            >
              <Coffee size={12}/> Buy me a coffee
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}