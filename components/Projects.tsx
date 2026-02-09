
import React from 'react';
import { PROJECTS } from '../constants';
import { Project, ProjectStatus } from '../types';

interface ProjectsProps {
  onOpenDetails: (project: Project) => void;
  isHighlighted: boolean;
}

const ProjectCard: React.FC<{ project: Project; onOpen: () => void }> = ({ project, onOpen }) => {
  const isCompleted = project.status === ProjectStatus.COMPLETED;

  return (
    <div className={`group bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm transition-all duration-500 flex flex-col h-full ${
      isCompleted ? 'hover:shadow-2xl hover:-translate-y-2 cursor-pointer' : 'opacity-80'
    }`}>
      <div className="p-6 md:p-8 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <span className={`px-3 py-1 md:px-4 md:py-1 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${
            isCompleted ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
          }`}>
            {project.status}
          </span>
          <span className="text-[9px] md:text-[10px] font-black text-[#00194C]/30 uppercase tracking-widest">{project.tag}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-black text-[#00194C] mb-3 md:mb-4 leading-tight uppercase tracking-tighter">{project.title}</h3>
        <p className="text-slate-500 mb-6 md:mb-8 font-medium text-sm md:text-base line-clamp-3">{project.description}</p>
        
        {isCompleted ? (
          <button 
            onClick={onOpen}
            className="mt-auto w-full py-4 bg-slate-50 group-hover:bg-[#00194C] text-[#00194C] group-hover:text-white rounded-xl font-black uppercase tracking-widest text-[10px] md:text-xs transition-all flex items-center justify-center gap-2"
          >
            Ver Detalhes do Impacto
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <div className="mt-auto pt-4 border-t border-slate-50 flex items-center gap-3">
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-[#F11E26] animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1 h-1 rounded-full bg-[#F11E26] animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1 h-1 rounded-full bg-[#F11E26] animate-bounce"></span>
            </div>
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Processo em Estruturação</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ onOpenDetails, isHighlighted }) => {
  const completed = PROJECTS.filter(p => p.status === ProjectStatus.COMPLETED);
  const ongoing = PROJECTS.filter(p => p.status === ProjectStatus.ONGOING);

  return (
    <section id="projetos" className={`py-20 md:py-24 bg-slate-50 transition-all duration-700 ${isHighlighted ? 'highlight-pulse' : ''}`}>
      <div className="container mx-auto px-6">
        <div className="mb-12 md:mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-[#00194C] mb-4 md:mb-6 uppercase tracking-tighter leading-none">Projetos de Impacto</h2>
          <p className="text-lg md:text-xl text-slate-500 font-medium">
            Entregas reais que transformaram a operação do Grupo A.Cândido através da qualidade.
          </p>
        </div>

        <div className="mb-16 md:mb-20">
          <h3 className="text-[10px] md:text-xs font-black text-[#00194C] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-12 flex items-center">
            <span className="w-10 md:w-16 h-1 md:h-1.5 bg-[#F11E26] mr-4 md:mr-6"></span>
            Cases de Sucesso (Finalizados)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {completed.map(project => (
              <ProjectCard key={project.id} project={project} onOpen={() => onOpenDetails(project)} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] md:text-xs font-black text-[#F11E26] uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-12 flex items-center">
            <span className="w-10 md:w-16 h-1 md:h-1.5 bg-[#00194C] mr-4 md:mr-6"></span>
            Direcionadores (Em Andamento)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
            {ongoing.map(project => (
              <ProjectCard key={project.id} project={project} onOpen={() => onOpenDetails(project)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
