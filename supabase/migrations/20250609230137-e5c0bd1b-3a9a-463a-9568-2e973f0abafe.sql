
-- Habilitar RLS e criar políticas para as tabelas

-- Habilitar RLS nas tabelas
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_responses ENABLE ROW LEVEL SECURITY;

-- Políticas para a tabela projects (acesso público para leitura, sem autenticação para admin)
CREATE POLICY "Allow public read access on projects" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on projects" ON projects
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on projects" ON projects
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on projects" ON projects
    FOR DELETE USING (true);

-- Políticas para a tabela messages (acesso público para inserir mensagens, sem autenticação para admin)
CREATE POLICY "Allow public read access on messages" ON messages
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on messages" ON messages
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on messages" ON messages
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on messages" ON messages
    FOR DELETE USING (true);

-- Políticas para a tabela message_responses (acesso público para admin)
CREATE POLICY "Allow public read access on message_responses" ON message_responses
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert access on message_responses" ON message_responses
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access on message_responses" ON message_responses
    FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access on message_responses" ON message_responses
    FOR DELETE USING (true);
