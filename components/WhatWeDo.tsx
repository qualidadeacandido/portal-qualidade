
import React from 'react';
import { SERVICES } from '../constants';

const WhatWeDo: React.FC = () => {
  return (
    <section id="o-que-fazemos" className="py-20 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#00194C] mb-4 uppercase tracking-tight leading-none">Frentes de Atuação</h2>
            <p className="text-base md:text-lg text-[#00194C]/80 leading-relaxed font-medium">
              Atuamos de forma <strong>corporativa e transversal</strong> em todas as empresas do Grupo A.Cândido. Focamos em organização e eficiência — não atuamos em ambientes fabris.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 text-[#F11E26] font-extrabold uppercase tracking-wider text-sm">
              <span className="w-8 h-[3px] bg-[#F11E26]"></span>
              <span>Visão Sistêmica</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, idx) => (
            <div 
              key={idx} 
              className="group p-6 md:p-8 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:border-[#F11E26]/20 transition-all duration-300"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-xl shadow-sm flex items-center justify-center mb-5 md:mb-6 group-hover:bg-[#F11E26] transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-[#00194C] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-[#00194C] mb-3 group-hover:text-[#F11E26] transition-colors">{service.title}</h3>
              <p className="text-[#00194C]/70 leading-relaxed text-sm font-medium">
                {service.description}
              </p>
            </div>
          ))}
          
          <div className="p-6 md:p-8 rounded-2xl border-2 border-dashed border-[#00194C]/10 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-[#00194C]/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-[10px] md:text-xs font-bold text-[#00194C]/40 uppercase tracking-widest">Apoio Transversal</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
