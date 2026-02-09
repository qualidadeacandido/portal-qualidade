
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { COMPANIES_DATA, PRIORITIES } from '../constants';

interface FormData {
  solicitante: string;
  email_solicitante: string;
  cargo_solicitante: string;
  empresa: string;
  setor: string;
  nome_tarefa: string;
  aplicacao_solicitacao: string;
  prioridade: string;
}

const initialData: FormData = {
  solicitante: '',
  email_solicitante: '',
  cargo_solicitante: '',
  empresa: '',
  setor: '',
  nome_tarefa: '',
  aplicacao_solicitacao: '',
  prioridade: '',
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  
  // Custom Select State
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [search, setSearch] = useState('');
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCompanies = COMPANIES_DATA.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const validate = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.solicitante.trim()) newErrors.solicitante = 'Obrigatório.';
    if (!formData.email_solicitante.trim()) {
      newErrors.email_solicitante = 'Obrigatório.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_solicitante)) {
      newErrors.email_solicitante = 'E-mail inválido.';
    }
    if (!formData.empresa) newErrors.empresa = 'Obrigatório.';
    if (!formData.setor.trim()) newErrors.setor = 'Obrigatório.';
    if (!formData.nome_tarefa.trim()) newErrors.nome_tarefa = 'Obrigatório.';
    if (!formData.aplicacao_solicitacao.trim()) newErrors.aplicacao_solicitacao = 'Obrigatório.';
    if (!formData.prioridade) newErrors.prioridade = 'Obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const progress = useMemo(() => {
    const requiredFields: (keyof FormData)[] = ['solicitante', 'email_solicitante', 'empresa', 'setor', 'nome_tarefa', 'aplicacao_solicitacao', 'prioridade'];
    const filled = requiredFields.filter(f => !!formData[f].trim()).length;
    return (filled / requiredFields.length) * 100;
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const selectCompany = (name: string) => {
    setFormData(prev => ({ ...prev, empresa: name }));
    setIsSelectOpen(false);
    setSearch('');
    if (errors.empresa) {
      setErrors(prev => ({ ...prev, empresa: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    
    fetch('/api/submit-demand', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    }).then(res => {
      if (res.ok) setStatus('success');
      else setStatus('idle');
    }).catch(() => setStatus('idle'));
  };

  if (status === 'success') {
    return (
      <section id="solicitar-apoio" className="py-24 bg-white scroll-mt-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-slate-50 border-2 border-[#00194C]/10 p-12 rounded-3xl text-center shadow-2xl animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-extrabold text-[#00194C] mb-4 uppercase tracking-tight">Sucesso!</h2>
            <p className="text-lg text-[#00194C]/70 mb-10 font-medium">Chamado aberto com sucesso.</p>
            <button onClick={() => setStatus('idle')} className="px-12 py-4 bg-[#00194C] text-white rounded-xl font-black uppercase tracking-widest text-sm">Nova Solicitação</button>
          </div>
        </div>
      </section>
    );
  }

  const inputClass = (field: keyof FormData) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all outline-none font-medium text-[#00194C]
    ${errors[field] ? 'border-red-500 bg-red-50' : 'border-slate-200 focus:border-[#00194C] focus:ring-4 focus:ring-[#00194C]/5'}
  `;

  const labelClass = "block text-xs font-black text-[#00194C] uppercase tracking-widest mb-2 flex justify-between";

  const getPriorityClasses = (priority: string) => {
    const isSelected = formData.prioridade === priority;
    if (!isSelected) return 'border-slate-100 text-[#00194C]/50 hover:border-[#F11E26]/30';

    switch(priority) {
      case 'Baixa': return 'bg-sky-400 text-white border-sky-400';
      case 'Média': return 'bg-orange-500 text-white border-orange-500';
      case 'Alta': return 'bg-yellow-400 text-slate-900 border-yellow-400';
      case 'Crítico': return 'bg-red-800 text-white border-red-800';
      default: return 'bg-[#00194C] text-white border-[#00194C]';
    }
  };

  return (
    <section id="solicitar-apoio" className="py-24 bg-white scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="sticky top-32">
              <h2 className="text-5xl font-extrabold text-[#00194C] mb-6 uppercase tracking-tighter leading-none">
                Abrir <br/><span className="text-[#F11E26]">Chamado</span>
              </h2>
              <p className="text-lg text-[#00194C]/80 mb-10 font-medium leading-relaxed">
                Utilize este canal para formalizar demandas para a Qualidade Corporativa.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-white p-1 md:p-2 rounded-[2rem] border-2 border-slate-100 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 h-1.5 bg-[#F11E26] transition-all duration-500 ease-out z-20" style={{ width: `${progress}%` }}></div>
              <div className="p-8 md:p-12">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}><span>Solicitante</span></label>
                      <input name="solicitante" value={formData.solicitante} onChange={handleChange} className={inputClass('solicitante')} placeholder="Seu nome" />
                    </div>
                    <div>
                      <label className={labelClass}><span>E-mail do Solicitante</span></label>
                      <input name="email_solicitante" value={formData.email_solicitante} onChange={handleChange} className={inputClass('email_solicitante')} placeholder="E-mail corporativo" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className={labelClass}><span>Cargo</span></label>
                      <input name="cargo_solicitante" value={formData.cargo_solicitante} onChange={handleChange} className={inputClass('cargo_solicitante')} placeholder="Seu cargo" />
                    </div>
                    
                    <div className="relative" ref={selectRef}>
                      <label className={labelClass}><span>Empresa</span></label>
                      <div 
                        onClick={() => setIsSelectOpen(!isSelectOpen)}
                        className={`
                          flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl border-2 transition-all bg-white
                          ${errors.empresa ? 'border-red-500 bg-red-50' : isSelectOpen ? 'border-[#00194C]' : 'border-slate-200'}
                        `}
                      >
                        <span className={`text-sm font-medium ${formData.empresa ? 'text-[#00194C]' : 'text-slate-400'}`}>
                          {formData.empresa || 'Selecione...'}
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {isSelectOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                          <div className="p-2 border-b border-slate-50">
                            <input 
                              autoFocus
                              placeholder="Buscar unidade..."
                              className="w-full px-3 py-2 text-sm outline-none bg-slate-50 rounded-lg font-medium"
                              value={search}
                              onChange={(e) => setSearch(e.target.value)}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          <div className="max-h-64 overflow-y-auto custom-scroll">
                            {filteredCompanies.map(c => (
                              <div 
                                key={c.name}
                                onClick={() => selectCompany(c.name)}
                                className="px-4 py-3 hover:bg-[#F11E26]/5 cursor-pointer transition-colors"
                              >
                                <span className="text-sm font-bold text-[#00194C]">{c.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className={labelClass}><span>Setor</span></label>
                      <input name="setor" value={formData.setor} onChange={handleChange} className={inputClass('setor')} placeholder="Sua área" />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}><span>Nome da Tarefa</span></label>
                    <input name="nome_tarefa" value={formData.nome_tarefa} onChange={handleChange} className={inputClass('nome_tarefa')} placeholder="Do que se trata o chamado?" />
                  </div>

                  <div>
                    <label className={labelClass}><span>Aplicação da Solicitação</span></label>
                    <textarea name="aplicacao_solicitacao" value={formData.aplicacao_solicitacao} onChange={handleChange} rows={4} className={inputClass('aplicacao_solicitacao') + " resize-none"} placeholder="Detalhes da demanda..."></textarea>
                  </div>

                  <div>
                    <label className={labelClass}><span>Prioridade</span></label>
                    <div className="flex flex-wrap gap-3">
                      {PRIORITIES.map(p => (
                        <label key={p} className={`flex-1 min-w-[100px] cursor-pointer text-center py-3 rounded-xl border-2 font-bold text-sm transition-all ${getPriorityClasses(p)}`}>
                          <input type="radio" name="prioridade" value={p} checked={formData.prioridade === p} onChange={handleChange} className="hidden" />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="w-full py-5 rounded-2xl bg-[#F11E26] text-white font-black text-lg transition-all shadow-xl shadow-red-500/20 uppercase tracking-[0.2em]">
                    {status === 'loading' ? 'Enviando...' : 'Confirmar Solicitação'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
