
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenSupport: () => void;
  onNav: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenSupport, onNav }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'O que fazemos', id: 'o-que-fazemos' },
    { label: 'Projetos', id: 'projetos' },
    { label: 'Equipe', id: 'equipe' },
    { label: 'Ferramentas', id: 'ferramentas' }
  ];

  const handleMobileNav = (id: string) => {
    onNav(id);
    setIsMenuOpen(false);
  };

  // Previne scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'bg-white shadow-xl py-3' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 md:space-x-4 cursor-pointer relative z-[120]" onClick={() => handleMobileNav('início')}>
            <img 
              src="https://acandido.com.br/wp-content/uploads/2021/12/logo-white-1024x219.png" 
              alt="Grupo A.Cândido" 
              className={`h-7 md:h-12 w-auto transition-all duration-300 object-contain ${
                isScrolled || isMenuOpen ? 'brightness-0' : 'brightness-100'
              }`}
            />
            <div className="hidden sm:flex flex-col border-l border-white/20 pl-4 h-8 justify-center">
              <span className={`font-black tracking-tight leading-none text-[10px] md:text-xs ${isScrolled || isMenuOpen ? 'text-[#00194C]' : 'text-white'}`}>
                QUALIDADE
              </span>
              <span className={`text-[7px] md:text-[8px] font-bold tracking-[0.2em] text-[#F11E26]`}>
                CORPORATIVA
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => onNav(item.id)}
                className={`text-sm font-black uppercase tracking-widest transition-all hover:text-[#F11E26] ${
                  isScrolled ? 'text-[#00194C]' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={onOpenSupport}
              className="bg-[#F11E26] text-white px-8 py-3 rounded-xl text-sm font-black hover:bg-[#00194C] transition-all uppercase tracking-[0.15em] active:scale-95 cta-pulse"
            >
              Solicitar Apoio
            </button>
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden relative z-[120] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-1 rounded-full transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-[#00194C]' : 'bg-white'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-1 rounded-full transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-[#00194C]' : 'bg-white'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-1 rounded-full transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-[#00194C]' : 'bg-white'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Overlay */}
      <div className={`
        fixed inset-0 bg-white z-[100] transition-all duration-500 lg:hidden
        ${isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'}
      `}>
        <div className="h-full w-full flex flex-col items-center justify-center p-8 space-y-8">
          <div className="flex flex-col items-center w-full max-w-xs space-y-6">
            {menuItems.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleMobileNav(item.id)}
                className="text-2xl font-black text-[#00194C] uppercase tracking-[0.1em] hover:text-[#F11E26] transition-colors py-2 border-b-2 border-transparent hover:border-[#F11E26]"
              >
                {item.label}
              </button>
            ))}
            <div className="w-full pt-4">
              <button 
                onClick={() => { onOpenSupport(); setIsMenuOpen(false); }}
                className="w-full bg-[#F11E26] text-white py-5 rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl shadow-red-500/20 active:scale-95 cta-pulse"
              >
                Solicitar Apoio
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 text-center w-full">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">
              Grupo A.Cândido &copy; {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
