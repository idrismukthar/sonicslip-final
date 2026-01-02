import { CyberPunk } from "./CyberPunk";
import { NeoSynth } from "./NeoSynth";
import { GlassVue } from "./GlassVue";
import { MonoRaw } from "./MonoRaw";
import { ForestEcho } from "./ForestEcho";

export function TicketRenderer({ theme, ...props }: any) {
  switch (theme) {
    case 'NEO_SYNTH':
      return <NeoSynth {...props} />;
    case 'GLASS_VUE':
      return <GlassVue {...props} />;
    case 'MONO_RAW':
      return <MonoRaw {...props} />;
    case 'FOREST_ECHO':
      return <ForestEcho {...props} />;
    case 'CYBER_PUNK':
    default:
      return <CyberPunk {...props} />;

      /*case '30_BillionBoys' :
      return <30BillionBoys {...props} />; */
      
  }
}