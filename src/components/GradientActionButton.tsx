import { ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface GradientActionButtonProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export function GradientActionButton({ 
  icon, 
  title, 
  subtitle, 
  onClick 
}: GradientActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="group w-full h-[128px] rounded-2xl p-6 text-left
        bg-gradient-to-br from-blue-deep via-blue-mid to-blue-ink
        border border-white/[0.06]
        shadow-[0_12px_28px_rgba(15,31,77,0.35)]
        relative overflow-hidden
        transition-all duration-200 ease-out
        focus:outline-none
        focus:ring-[3px] focus:ring-[rgba(32,108,255,0.45)]
        focus:ring-offset-[3px] focus:ring-offset-[rgba(0,224,255,0.25)]
        hover:shadow-[0_16px_32px_rgba(32,108,255,0.35),0_6px_18px_rgba(0,224,255,0.20)]
        hover:bg-gradient-to-br hover:from-[#102766] hover:via-[#13389A] hover:to-[#1A3AFF]
        active:translate-y-[1px] active:shadow-[0_6px_14px_rgba(15,31,77,0.35)]
        active:bg-gradient-to-br active:from-[#08112B] active:via-[#0C1A40] active:to-[#0F265F]"
    >
      {/* Inner highlight */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.06] to-transparent h-px" />
      
      <div className="flex items-center gap-4">
        {/* Icon chip */}
        <div className="
          size-12 rounded-full border border-white/10 
          bg-white/[0.08] backdrop-blur-[6px]
          shadow-[0_8px_16px_rgba(32,108,255,0.25)]
          flex items-center justify-center
          text-[#BFD3FF] group-hover:text-white transition-colors duration-200
        ">
          {icon}
        </div>
        
        {/* Content */}
        <div className="flex-1">
          <div className="text-white text-[19px] font-semibold leading-tight mb-1">
            {title}
          </div>
          <div className="text-white/75 text-[14.5px] leading-5">
            {subtitle}
          </div>
        </div>
        
        {/* Arrow */}
        <ArrowRight className="w-7 h-7 text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
      
      {/* Hover glow effect */}
      <div className="
        pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-20
        bg-[radial-gradient(120px_60px_at_20%_20%,#00E0FF,transparent_40%)]
        transition-opacity duration-300
      " />
    </button>
  );
}