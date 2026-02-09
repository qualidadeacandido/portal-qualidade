
import React, { useEffect } from 'react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Previne scroll do body
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4">
      <div 
        className="absolute inset-0 bg-[#00194C]/90 backdrop-blur-lg animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      <div className="relative bg-white w-full h-full sm:h-auto sm:max-w-5xl sm:max-h-[85vh] sm:rounded-[2.5rem] shadow-2xl overflow-y-auto custom-scroll animate-in zoom-in slide-in-from-bottom-10 duration-500">
        <button 
          onClick={onClose}
          className="fixed sm:absolute top-6 right-6 w-10 h-10 md:w-12 md:h-12 bg-white sm:bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#F11E26] hover:text-white transition-all z-[160] shadow-lg border border-slate-200 sm:border-transparent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-[#00194C] hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col lg:grid lg:grid-cols-12 min-h-full">
          {/* Lado Esquerdo - Info Principal */}
          <div className="lg:col-span-4 bg-[#00194C] p-8 pt-20 lg:pt-16 lg:p-12 text-white flex flex-col justify-start">
            <div className="space-y-6 md:space-y-8">
              <div>
                <span className="inline-block px-4 py-1 bg-[#F11E26] text-white text-[10px] font-black uppercase tracking-widest rounded-md mb-4">
                  {project.tag}
                </span>
                <h2 className="text-3xl md:text-5xl font-black leading-tight uppercase tracking-tighter">
                  {project.title}
                </h2>
              </div>
              
              <p className="text-white/60 font-medium leading-relaxed text-sm md:text-lg border-l-2 border-[#F11E26]/30 pl-6">
                {project.description}
              </p>
              
              {project.sectors && (
                <div className="pt-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F11E26] mb-4">Setores Impactados</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.sectors.map(s => (
                      <span key={s} className="px-4 py-2 bg-white/5 rounded-xl text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/10 whitespace-nowrap">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lado Direito - Cenários e Impacto */}
          <div className="lg:col-span-8 p-8 lg:p-12 bg-slate-50 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border-t-4 border-slate-200 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Cenário Anterior</h4>
                </div>
                <p className="text-[#00194C] font-semibold leading-relaxed text-base">
                  {project.before}
                </p>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border-t-4 border-[#F11E26] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#F11E26]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h4 className="text-[10px] font-black text-[#F11E26] uppercase tracking-widest">Cenário Atual</h4>
                </div>
                <p className="text-[#00194C] font-semibold leading-relaxed text-base">
                  {project.after}
                </p>
              </div>
            </div>

            <div className="bg-[#00194C] p-8 md:p-10 rounded-[2.5rem] text-white shadow-2xl shadow-[#00194C]/20 border-r-4 border-[#F11E26] relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-grow bg-white/10"></div>
                  <h4 className="text-[10px] font-black text-[#F11E26] uppercase tracking-[0.4em] whitespace-nowrap">Impacto Final Alcançado</h4>
                  <div className="h-px flex-grow bg-white/10"></div>
                </div>
                
                <p className="text-xl md:text-3xl font-black leading-tight tracking-tighter text-center uppercase">
                  {project.result}
                </p>
              </div>
            </div>
            
            {/* Mensagem de Sustentabilidade do Projeto */}
            <div className="mt-auto pt-6 text-center">
              <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.3em]">
                Padronização & Governança Corporativa
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
