
import React from 'react';

interface FooterProps {
  onNav: (id: string) => void;
  onOpenSupport: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNav, onOpenSupport }) => {
  const menuItems = [
    { label: 'Início', id: 'início' },
    { label: 'Equipe', id: 'equipe' },
    { label: 'Projetos', id: 'projetos' },
    { label: 'Ferramentas', id: 'ferramentas' }
  ];

  return (
    <footer className="bg-[#00194C] text-white py-16 md:py-24 border-t border-white/10 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute right-0 bottom-0 w-1/4 h-1/2 bg-[#F11E26]/5 rounded-tl-[10rem] -z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
          <div className="col-span-1 sm:col-span-2">
            <img 
              src="https://acandido.com.br/wp-content/uploads/2021/12/logo-white-1024x219.png" 
              alt="Grupo A.Cândido" 
              className="h-12 md:h-16 w-auto object-contain mb-6 md:mb-8 brightness-100"
            />
            <p className="text-white/40 text-base md:text-lg leading-relaxed max-w-md font-medium">
              Evoluindo a governança do Grupo A.Cândido através da qualidade corporativa, inovação digital e visão estratégica transversal.
            </p>
          </div>
          
          <div>
            <h4 className="font-black mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F11E26]">Mapa do Site</h4>
            <ul className="space-y-4 md:space-y-6">
              {menuItems.map(item => (
                <li key={item.id}>
                  <button 
                    onClick={() => onNav(item.id)}
                    className="text-white/50 hover:text-[#F11E26] font-bold text-xs md:text-sm uppercase tracking-widest transition-all text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-black mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#F11E26]">Canal Direto</h4>
            <button 
              onClick={onOpenSupport}
              className="w-full py-4 md:py-5 bg-[#F11E26] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] md:text-xs hover:bg-white hover:text-[#00194C] transition-all shadow-2xl shadow-red-500/30 mb-8 active:scale-95"
            >
              Solicitar Apoio
            </button>
            <div className="space-y-4 text-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#F11E26] mt-1 flex-shrink-0"></div>
                <p className="leading-relaxed break-all">Qualidadejp@acandidotransportes.com.br</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white mt-1 flex-shrink-0"></div>
                <p className="leading-relaxed">R. Diógenes Chianca, S/N - Água Fria, João Pessoa - PB, 58000-000</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-6 text-[9px] md:text-[10px] text-white/20 font-black uppercase tracking-[0.3em] text-center md:text-left">
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <p>© {new Date().getFullYear()} Grupo A.Cândido.</p>
            <p className="text-white/40">Desenvolvido Por João Paulo .Z</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <span className="text-[#F11E26] border-b border-[#F11E26]/20 pb-1">Padronização</span>
            <span className="pb-1 border-b border-white/10">Inovação</span>
            <span className="text-[#F11E26] border-b border-[#F11E26]/20 pb-1">Excelência</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
