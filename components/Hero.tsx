
import React from 'react';

interface HeroProps {
  onOpenSupport: () => void;
  onNav: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenSupport, onNav }) => {
  return (
    <section id="início" className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg pt-20">
      {/* Camada de malha tecnológica sutil */}
      <div className="absolute inset-0 tech-grid opacity-40"></div>
      
      {/* Elementos visuais de fundo para profundidade */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F11E26]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-blue-500/5 blur-[150px] rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="hero-text-reveal">
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter uppercase">
            Qualidade que <br />
            <span className="text-[#F11E26] pulse-strong">padroniza.</span> <br />
            Inovação que <br />
            <span className="text-[#F11E26] pulse-strong">acelera.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-14 font-medium leading-relaxed">
            Otimizando a governança e impulsionando a eficiência em todas as unidades do <span className="text-white font-bold">Grupo A.Cândido</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={onOpenSupport}
              className="w-full sm:w-auto px-12 py-5 bg-[#F11E26] text-white rounded-2xl font-black text-xl hover:bg-white hover:text-[#00194C] transition-all duration-300 cta-pulse uppercase tracking-widest active:scale-95 shadow-[0_20px_40px_rgba(241,30,38,0.2)]"
            >
              Solicitar Apoio
            </button>
            
            <button 
              onClick={() => onNav('projetos')}
              className="w-full sm:w-auto px-12 py-5 border-2 border-white/10 text-white rounded-2xl font-black text-xl hover:bg-white/10 hover:border-white transition-all duration-300 uppercase tracking-widest backdrop-blur-sm"
            >
              Ver Projetos
            </button>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer opacity-30 hover:opacity-100 transition-opacity flex flex-col items-center group"
        onClick={() => onNav('o-que-fazemos')}
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white mb-3">Scroll</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
