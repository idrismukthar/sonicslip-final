import { CyberPunk } from "./CyberPunk";
import { NeoSynth } from "./NeoSynth";
import { GlassVue } from "./GlassVue";
import { MonoRaw } from "./MonoRaw";
import { ForestEcho } from "./ForestEcho";

export function TicketRenderer({ theme, data, profile, type, rangeLabel, orientation }: any) {
  // Common header to show Category and Timeframe on every ticket
  const TicketHeader = () => (
    <div className="w-full mb-4 px-2 flex justify-between items-end border-b border-white/10 pb-2">
      <div className="flex flex-col">
        <span className="text-[8px] font-black opacity-40 tracking-[0.3em] uppercase">Itinerary</span>
        <span className="text-xs font-black italic text-[#00FFF0] uppercase">{type}</span>
      </div>
      <div className="flex flex-col text-right">
        <span className="text-[8px] font-black opacity-40 tracking-[0.3em] uppercase">Validity</span>
        <span className="text-[10px] font-bold whitespace-nowrap">{rangeLabel}</span>
      </div>
    </div>
  );

  const props = { data, profile, type, rangeLabel, orientation };

  const renderTheme = () => {
    switch (theme) {
      case 'NEO_SYNTH': return <NeoSynth {...props} />;
      case 'GLASS_VUE': return <GlassVue {...props} />;
      case 'MONO_RAW': return <MonoRaw {...props} />;
      case 'FOREST_ECHO': return <ForestEcho {...props} />;
      case 'CYBER_PUNK':
      default: return <CyberPunk {...props} />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      <TicketHeader />
      {renderTheme()}
    </div>
  );
}