
import React, { useState, useRef, useEffect } from 'react';
import { COMPANIES_DATA, PRIORITIES } from '../constants';

interface SupportModalProps {
  onClose: () => void;
}

const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Custom Select State
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<string>('');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    // Add manually selected company
    data.empresa = selectedCompany;

    setErrors({});
    const newErrors: Record<string, string> = {};
    if (!data.solicitante) newErrors.solicitante = "Obrigatório";
    if (!data.email_solicitante) newErrors.email_solicitante = "Obrigatório";
    if (!data.setor) newErrors.setor = "Obrigatório";
    if (!selectedCompany) newErrors.empresa = "Obrigatório";
    if (!data.nome_tarefa) newErrors.nome_tarefa = "Obrigatório";
    if (!data.aplicacao_solicitacao) newErrors.aplicacao_solicitacao = "Obrigatório";
    if (!data.prioridade) newErrors.prioridade = "Obrigatório";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch('/api/submit-demand', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const result = await response.json();
        setErrorMessage(result.error || 'Houve um problema ao processar sua solicitação.');
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage('Erro de conexão com o servidor. Tente novamente.');
      setStatus('error');
    }
  };

  const inputClass = (name: string) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all outline-none font-medium text-[#00194C] text-sm
    ${errors[name] ? 'border-red-500 bg-red-50' : 'border-slate-100 focus:border-[#00194C] focus:ring-4 focus:ring-[#00194C]/5 bg-white'}
  `;

  const getPriorityClasses = (priority: string) => {
    switch(priority) {
      case 'Baixa': return 'peer-checked:bg-sky-400 peer-checked:text-white peer-checked:border-sky-400';
      case 'Média': return 'peer-checked:bg-orange-500 peer-checked:text-white peer-checked:border-orange-500';
      case 'Alta': return 'peer-checked:bg-yellow-400 peer-checked:text-slate-900 peer-checked:border-yellow-400';
      case 'Crítico': return 'peer-checked:bg-red-800 peer-checked:text-white peer-checked:border-red-800';
      default: return 'peer-checked:bg-[#00194C] peer-checked:text-white peer-checked:border-[#00194C]';
    }
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-[#00194C]/95 backdrop-blur-xl animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] sm:rounded-[2rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-20 duration-500">
        <button 
          onClick={onClose}
          className="fixed sm:absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-slate-100 rounded-full flex items-center justify-center hover:bg-[#F11E26] hover:text-white transition-all z-[160] shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-[#00194C] hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="overflow-y-auto p-6 pt-16 sm:p-12 custom-scroll">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-20 h-20 bg-green-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-black text-[#00194C] uppercase tracking-tighter mb-4">Enviado!</h2>
              <p className="text-[#00194C]/60 font-medium">Sua demanda foi registrada com sucesso.</p>
              <button onClick={onClose} className="mt-8 px-8 py-3 bg-[#00194C] text-white rounded-xl font-bold uppercase tracking-widest text-xs">Fechar</button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl sm:text-3xl font-black text-[#00194C] uppercase tracking-tighter leading-none mb-2">
                  Novo <span className="text-[#F11E26]">Chamado</span>
                </h2>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-widest">Qualidade Corporativa</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 pb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Solicitante*</label>
                    <input name="solicitante" placeholder="Nome Completo" className={inputClass('solicitante')} required />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">E-mail do Solicitante*</label>
                    <input name="email_solicitante" type="email" placeholder="email@acandido.com.br" className={inputClass('email_solicitante')} required />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Cargo do Solicitante</label>
                    <input name="cargo_solicitante" placeholder="Seu cargo" className={inputClass('cargo_solicitante')} />
                  </div>
                  
                  {/* Custom Company Select */}
                  <div className="space-y-1 relative" ref={selectRef}>
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Empresa (Unidade)*</label>
                    <div 
                      onClick={() => setIsSelectOpen(!isSelectOpen)}
                      className={`
                        flex items-center justify-between cursor-pointer px-4 py-3 rounded-xl border-2 transition-all bg-white
                        ${errors.empresa ? 'border-red-500 bg-red-50' : isSelectOpen ? 'border-[#00194C]' : 'border-slate-100'}
                      `}
                    >
                      <span className={`text-sm font-medium ${selectedCompany ? 'text-[#00194C]' : 'text-slate-400'}`}>
                        {selectedCompany || 'Selecione...'}
                      </span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-slate-400 transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>

                    {isSelectOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-100 z-[170] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                        <div className="p-2 border-b border-slate-50">
                          <input 
                            autoFocus
                            placeholder="Buscar empresa..."
                            className="w-full px-3 py-2 text-sm outline-none bg-slate-50 rounded-lg"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                        <div className="max-h-48 overflow-y-auto custom-scroll">
                          {filteredCompanies.map(c => (
                            <div 
                              key={c.name}
                              onClick={() => {
                                setSelectedCompany(c.name);
                                setIsSelectOpen(false);
                                setSearch('');
                              }}
                              className="px-4 py-3 hover:bg-[#F11E26]/5 cursor-pointer transition-colors"
                            >
                              <span className="text-sm font-bold text-[#00194C]">{c.name}</span>
                            </div>
                          ))}
                          {filteredCompanies.length === 0 && (
                            <div className="p-4 text-center text-xs text-slate-400 font-bold uppercase">Nenhuma unidade encontrada</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Setor*</label>
                    <input name="setor" placeholder="Sua área" className={inputClass('setor')} required />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Nome da Tarefa*</label>
                  <input name="nome_tarefa" placeholder="Título resumido da demanda" className={inputClass('nome_tarefa')} required />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Aplicação da Solicitação*</label>
                  <textarea name="aplicacao_solicitacao" rows={4} placeholder="Descreva detalhadamente o que você espera que essa solicitação resolva..." className={inputClass('aplicacao_solicitacao') + " resize-none"} required></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Prioridade*</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {PRIORITIES.map(p => (
                      <label key={p} className="cursor-pointer">
                        <input type="radio" name="prioridade" value={p} className="hidden peer" required />
                        <div className={`w-full text-center py-2 px-1 rounded-lg border-2 border-slate-50 font-bold text-[#00194C] text-[10px] transition-all ${getPriorityClasses(p)}`}>
                          {p}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold text-center">
                    {errorMessage}
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-[#F11E26] text-white rounded-xl font-black text-sm uppercase tracking-widest shadow-lg shadow-red-500/20 active:scale-[0.98] transition-all"
                >
                  {status === 'loading' ? 'Processando...' : 'Confirmar Chamado'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupportModal;
