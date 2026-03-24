-- ============================================================
-- Setup do Supabase para o Portfólio
-- ============================================================
-- Execute este script no SQL Editor do seu projeto Supabase:
-- https://supabase.com/dashboard → SQL Editor → New Query
-- Clique em "Run" para executar.
-- ============================================================

-- 1. Criar tabela de dados do portfólio
CREATE TABLE IF NOT EXISTS portfolio_data (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Habilitar Row Level Security (RLS)
ALTER TABLE portfolio_data ENABLE ROW LEVEL SECURITY;

-- 3. Visitantes podem LER (portfólio público)
CREATE POLICY "Leitura publica" ON portfolio_data
  FOR SELECT TO anon USING (true);

-- 4. Apenas usuários autenticados (CMS) podem ESCREVER
CREATE POLICY "Escrita autenticada" ON portfolio_data
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 5. Inserir dados iniciais vazios
INSERT INTO portfolio_data (key, value) VALUES
  ('cases',   '[]'::jsonb),
  ('about',   '{}'::jsonb),
  ('contact', '{}'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- PRÓXIMO PASSO: Criar seu usuário de login para o CMS
-- ============================================================
-- Vá em: Authentication → Users → Add user
-- Preencha email e senha → Create user
-- Use esses dados para fazer login no CMS
-- ============================================================
