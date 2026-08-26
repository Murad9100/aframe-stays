import {
  Bath,
  Bell,
  Car,
  Coffee,
  CookingPot,
  Droplets,
  Flame,
  Mountain,
  PawPrint,
  Snowflake,
  Sparkles,
  Trees,
  Tv,
  UtensilsCrossed,
  WashingMachine,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export interface FeaturePreset {
  label: string;
  icon: LucideIcon;
}

export const FEATURE_PRESETS: FeaturePreset[] = [
  { label: "Wi-Fi", icon: Wifi },
  { label: "Kamin", icon: Flame },
  { label: "Hovuz", icon: Waves },
  { label: "Cakuzi", icon: Bath },
  { label: "Kondisioner", icon: Snowflake },
  { label: "İsti Su", icon: Droplets },
  { label: "Parkinq", icon: Car },
  { label: "Dağ Mənzərəsi", icon: Mountain },
  { label: "Meşə Mənzərəsi", icon: Trees },
  { label: "Barbekü Zonası", icon: UtensilsCrossed },
  { label: "Tam Mətbəx", icon: CookingPot },
  { label: "Smart TV", icon: Tv },
  { label: "Paltaryuyan", icon: WashingMachine },
  { label: "Heyvanlara İcazə", icon: PawPrint },
  { label: "Səhər Yeməyi", icon: Coffee },
  { label: "Qapıçı Xidməti", icon: Bell },
];

const KEYWORD_MAP: Array<[string[], LucideIcon]> = [
  [["wi-fi", "wifi", "internet"], Wifi],
  [["kamin", "şömine", "somine"], Flame],
  [["hovuz", "basseyin"], Waves],
  [["cakuzi", "jakuzi", "hamam"], Bath],
  [["kondisioner", "klima"], Snowflake],
  [["isti su", "su"], Droplets],
  [["parkinq", "parking", "avtomobil", "maşın dayanacağı"], Car],
  [["dağ", "dag"], Mountain],
  [["meşə", "mese", "çəmən"], Trees],
  [["barbek", "bbq", "manqal"], UtensilsCrossed],
  [["mətbəx", "metbex"], CookingPot],
  [["tv", "televiz"], Tv],
  [["paltaryuyan", "çamaşır", "camasir"], WashingMachine],
  [["heyvan", "pişik", "it"], PawPrint],
  [["səhər", "seher", "qəhvə", "qehve"], Coffee],
  [["qapıçı", "qapici"], Bell],
];

export function resolveFeatureIcon(label: string): LucideIcon {
  const normalized = label.toLowerCase();
  for (const [keywords, icon] of KEYWORD_MAP) {
    if (keywords.some((k) => normalized.includes(k))) return icon;
  }
  return Sparkles;
}
