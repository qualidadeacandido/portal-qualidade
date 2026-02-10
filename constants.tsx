
import { Project, ProjectStatus, TeamMember, Service } from './types';

export interface CompanyInfo {
  name: string;
  short: string;
  color: string;
}

export const COMPANIES_DATA: CompanyInfo[] = [
  { name: "001 - Santa Maria Transportes - NAT", short: "001", color: "bg-blue-600" },
  { name: "002 - Auto Onibus Santa Maria - NAT", short: "002", color: "bg-red-600" },
  { name: "003 - Transnacional - JP", short: "003", color: "bg-green-600" },
  { name: "004 - Reunidas - JP", short: "004", color: "bg-orange-600" },
  { name: "005 - Transnacional - CG", short: "005", color: "bg-cyan-600" },
  { name: "006 - Santa Maria - JP", short: "006", color: "bg-yellow-600" },
  { name: "008 - Reunidas Transportes - NAT", short: "008", color: "bg-indigo-600" },
  { name: "009 - Transporte Rodoviario - PB", short: "009", color: "bg-purple-600" },
  { name: "010 - Transnacional Fretamento - PE", short: "010", color: "bg-slate-800" },
  { name: "011 - Unidas Comercio - Bayeux", short: "011", color: "bg-teal-600" },
  { name: "012 - A Candido Cia Ltda", short: "012", color: "bg-rose-600" },
  { name: "013 - Expresso Aracaju", short: "013", color: "bg-emerald-600" },
  { name: "015 - Transnacional Fretamento - PB", short: "015", color: "bg-amber-600" },
  { name: "016 - Transnacional Fretamento - RN", short: "016", color: "bg-violet-600" },
  { name: "017 - Transnacional Fretamento - AL", short: "017", color: "bg-fuchsia-600" },
  { name: "018 - Transnacional Fretamento - SE", short: "018", color: "bg-sky-600" },
  { name: "019 - Transnacional Fretamento - GO", short: "019", color: "bg-lime-600" },
  { name: "020 - Unidas Veiculos e Serviços Ltda", short: "020", color: "bg-zinc-800" },
  { name: "021 - Transnacional Fretamento - CE", short: "021", color: "bg-blue-500" },
  { name: "022 - Transporte Rodoviario - PE", short: "022", color: "bg-red-500" },
  { name: "027 - Transporte Rodoviario - CE", short: "027", color: "bg-green-500" },
  { name: "900 - Parnamirim Field", short: "900", color: "bg-orange-500" },
  { name: "901 - Seturn", short: "901", color: "bg-cyan-500" }
];

export const COMPANIES = COMPANIES_DATA.map(c => c.name);

export const PRIORITIES = ["Baixa", "Média", "Alta", "Crítico"];

export const SERVICES: Service[] = [
  {
    title: "Padronização de Processos Corporativos",
    description: "Criação de normas e fluxos uniformes para garantir a excelência em todas as unidades administrativas.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
  },
  {
    title: "Estruturação de Áreas e Fluxos",
    description: "Desenho organizacional focado na eliminação de gargalos e clareza de responsabilidades.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
  },
  {
    title: "Automação Administrativa",
    description: "Uso de tecnologia para converter tarefas manuais em fluxos automáticos de alta performance.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z"
  },
  {
    title: "Governança de Documentos (GED)",
    description: "Organização estruturada de informações corporativas, garantindo acesso rápido e seguro.",
    icon: "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
  },
  {
    title: "Metodologias de Qualidade",
    description: "Aplicação de PDCA, 5S e Lean Office para sustentar a cultura de melhoria contínua.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
  },
  {
    title: "Dados para Tomada de Decisão",
    description: "Transformação de dados brutos em indicadores estratégicos via BI e analytics.",
    icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Criação do Setor de Arquivo",
    tag: "Case de Sucesso",
    description: "Estruturação completa da gestão documental corporativa com digitalização.",
    status: ProjectStatus.COMPLETED,
    sectors: ["Corporativo", "Jurídico", "Financeiro"],
    before: "Documentação dispersa, riscos de extravio e tempo médio de busca de 4h por item.",
    after: "Centralização em ambiente controlado e indexação digital instantânea.",
    result: "Redução de 95% no tempo de recuperação e 0% de extravios no último ano."
  },
  {
    id: "2",
    title: "Venda de Equipamentos",
    tag: "Case de Sucesso",
    description: "Digitalização total do fluxo de desmobilização e venda de ativos.",
    status: ProjectStatus.COMPLETED,
    sectors: ["Manutenção", "Contabilidade", "Suprimentos"],
    before: "Fluxo manual via papel e e-mails, sem rastreabilidade de aprovações.",
    after: "Workflow automático no SharePoint com aprovações em tempo real via celular.",
    result: "Ciclo de venda reduzido de 15 para 4 dias úteis."
  },
  {
    id: "3",
    title: "Automação de Admissão e Desligamento",
    tag: "Case de Sucesso",
    description: "Processamento de alta escala de documentos de RH via formulários inteligentes.",
    status: ProjectStatus.COMPLETED,
    sectors: ["RH", "TI", "Operacional"],
    before: "Gargalos em contratações de fim de ano, erros manuais constantes em cadastros.",
    after: "Integração automática de dados entre Forms e Sistema de Folha.",
    result: "Capacidade de 500+ admissões/mês com precisão de 99.8%."
  },
  {
    id: "4",
    title: "Certificação SASSMAQ",
    tag: "Em andamento | Previsão: 2026",
    description: "Foco em Segurança, Saúde, Meio Ambiente e Qualidade no transporte.",
    status: ProjectStatus.ONGOING,
    focus: "Excelência Logística e Segurança"
  },
  {
    id: "5",
    title: "Certificação Abracinov",
    tag: "Em andamento | Previsão: 2026",
    description: "Consolidação da cultura de inovação estruturada dentro do grupo.",
    status: ProjectStatus.ONGOING,
    focus: "Inovação Estratégica"
  }
];

export const TEAM: TeamMember[] = [
  {
    name: "Adilson Soares",
    role: "Coordenador Corporativo",
    level: 1,
    image: "/team/adilson.jpg",
    category: "Liderança Estratégica",
    email: "Qualidadejp@acandidotransportes.com.br"
  },
  {
    name: "Elinaldo Junior",
    role: "Analista Corporativo",
    level: 2,
    image: "/team/elinaldo.jpeg",
    category: "Análise Corporativa",
    email: "qualidade02jp@acandidotransportes.com.br"
  },
  {
    name: "Caio Victor",
    role: "Supervisor Fretamento",
    level: 3,
    image: "/team/caio.png",
    category: "Supervisão Operacional",
    email: "manutencaojp@transnacionalfretamento.com.br"
  },
  {
    name: "Renato Martis",
    role: "Analista Fretamento",
    level: 3,
    image: "/team/renato.png",
    category: "Análise Operacional",
    email: "qualidadejp@transnacionalfretamento.com.br"
  }
];

export const TOOLS_CATEGORIES = [
  {
    name: "Produtividade & BI",
    items: [
      { name: "Power BI", desc: "Analytics & Dashboards", icon: "📊" },
      { name: "Excel", desc: "Gestão Avançada de Dados", icon: "📑" },
      { name: "PowerPoint", desc: "Apresentações Estratégicas", icon: "💎" }
    ]
  },
  {
    name: "Colaboração & Cloud",
    items: [
      { name: "SharePoint", desc: "Intranets & Gestão GED", icon: "🌐" },
      { name: "OneDrive", desc: "Armazenamento Seguro", icon: "☁️" },
      { name: "Stream", desc: "Comunicação em Vídeo", icon: "🎥" }
    ]
  },
  {
    name: "Automação & Processos",
    items: [
      { name: "Power Automate", desc: "Web & Desktop flows", icon: "⚙️" },
      { name: "Power Apps", desc: "Aplicações Internas", icon: "📱" },
      { name: "Visio", desc: "Mapeamento de Processos", icon: "📐" }
    ]
  }
];
