
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Tratamento de CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido. Use POST.' });
  }

  try {
    const { 
      solicitante, email_solicitante, cargo_solicitante, empresa, setor,
      nome_tarefa, aplicacao_solicitacao, prioridade, informacoesGerais 
    } = req.body;

    // 2. Validação de Campos Obrigatórios
    if (!solicitante || !email_solicitante || !setor || !nome_tarefa || !aplicacao_solicitacao || !prioridade) {
      return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
    }

    // 3. Validação de E-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email_solicitante)) {
      return res.status(400).json({ error: 'E-mail corporativo inválido.' });
    }

    // 4. Montagem do Payload para Power Automate
    const payload = {
      solicitante_nome: String(solicitante).trim(),
      solicitante_email: String(email_solicitante).trim().toLowerCase(),
      cargo: cargo_solicitante ? String(cargo_solicitante).trim() : "Não informado",
      empresa: empresa ? String(empresa).trim() : "Grupo A.Cândido",
      setor: String(setor).trim(),
      titulo: String(nome_tarefa).trim(),
      descricao: String(aplicacao_solicitacao).trim(),
      prioridade: prioridade,
      data_solicitacao: new Date().toISOString()
    };

    // 5. Envio para Power Automate
    const flowUrl = process.env.POWER_AUTOMATE_URL;
    if (!flowUrl) {
      console.error('Config Error: POWER_AUTOMATE_URL não definida.');
      return res.status(500).json({ error: 'Erro de configuração no servidor de automação.' });
    }

    const response = await fetch(flowUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return res.status(200).json({ message: 'Solicitação registrada com sucesso.' });
    } else {
      const errorDetail = await response.text();
      return res.status(502).json({ 
        error: 'Falha na comunicação com o fluxo de automação.', 
        detail: errorDetail.substring(0, 500) 
      });
    }

  } catch (err: any) {
    console.error('Internal Error:', err);
    return res.status(500).json({ error: 'Erro interno ao processar demanda.' });
  }
}
