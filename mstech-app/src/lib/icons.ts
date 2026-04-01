import { 
  Globe, 
  Layers, 
  BarChart3, 
  Package, 
  Building2, 
  Layers3, 
  Smartphone, 
  Cloud,
  Code2,
  Zap,
  Shield,
  Search,
  Layout,
  Cpu,
  Monitor,
  MessageSquare
} from "lucide-react";

export const iconMap: Record<string, any> = {
  globe: Globe,
  layers: Layers,
  barchart: BarChart3,
  package: Package,
  building: Building2,
  layers3: Layers3,
  smartphone: Smartphone,
  cloud: Cloud,
  code: Code2,
  zap: Zap,
  shield: Shield,
  search: Search,
  layout: Layout,
  cpu: Cpu,
  monitor: Monitor,
  message: MessageSquare,
};

export function getIcon(name?: string, fallback = Globe) {
  if (!name) return fallback;
  return iconMap[name.toLowerCase()] || fallback;
}
