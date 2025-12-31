"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Plane } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const [displayText, setDisplayText] = useState("");
  
  const fullText = session 
    ? `WELCOME BACK, ${session.user?.name?.toUpperCase()}... READY FOR TAKEOFF?` 
    : "NOW BOARDING: YOUR SONIC JOURNEY STARTS NOW, Bon Voyage ✈️✈️...";

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [session, fullText]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#2D5A27] text-[#F8F9FA] p-6 font-sans">
      
      {/* Upper Terminal Display */}
      <div className="w-full max-w-md mt-12 bg-black/20 p-4 rounded-lg border border-[#F9D949]/30 border-dashed">
        <p className="text-[#F9D949] font-mono text-[10px] tracking-[0.3em] uppercase mb-2">
          {session ? "Passenger Manifest" : "Terminal Information"}
        </p>
        <h2 className="text-xl font-mono min-h-[1.5em] tracking-tight uppercase">
          {displayText}
          <span className="animate-pulse">_</span>
        </h2>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-7xl font-black tracking-tighter mb-2 italic">
          SONIC<span className="text-[#F9D949]">SLIP</span>
        </h1>
        
        {session ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-sm font-mono opacity-70 uppercase tracking-widest">
              Identity Verified: {session.user?.email}
            </p>
            <button 
              onClick={() => window.location.href = '/studio'} 
              className="mt-2 bg-[#F8F9FA] text-[#2D5A27] px-8 py-3 rounded-full font-bold uppercase text-sm hover:bg-[#F9D949] hover:scale-105 transition-all shadow-xl"
            >
              Enter Design Studio →
            </button>
          </div>
        ) : (
          <p className="text-lg opacity-80 max-w-[280px] leading-tight font-medium">
            Turn your listening history into a boarding pass.
          </p>
        )}
      </div>

      {/* Bottom Action Section */}
      <div className="w-full max-w-md mb-12 flex flex-col items-center gap-6">
        {!session ? (
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-[#F9D949] rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            
            <button
              onClick={() => signIn("spotify", { callbackUrl: "https://127.0.0.1:3000" })}
              className="relative bg-[#F9D949] text-black font-bold py-4 px-10 rounded-full text-xl shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 border-2 border-black/5"
            >
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-[9px] uppercase tracking-[0.2em] font-mono opacity-60 mb-1">Check-in Open</span>
                <span>Connect Spotify</span>
              </div>
              
              {/* Spotify Icon */}
              <div className="h-10 w-10 bg-black rounded-full flex items-center justify-center text-[#F9D949] group-hover:rotate-[360deg] transition-transform duration-700 shadow-lg p-2">
                <svg role="img" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
            </button>
          </div>
        ) : (
          <button 
            onClick={() => signOut()} 
            className="text-[10px] opacity-40 hover:opacity-100 underline uppercase tracking-[0.3em] font-mono transition-opacity"
          >
            Sign out of terminal
          </button>
        )}
        
        {/* Airplane Footer */}
        <div className="flex items-center gap-2 opacity-30 mt-4">
          <Plane size={14} className="rotate-45" />
          <p className="text-[10px] font-mono uppercase tracking-[0.2em]">
            Gate 24B • {session ? "Boarding Now" : "Waiting for auth"}
          </p>
        </div>
      </div>
    </main>
  );
}