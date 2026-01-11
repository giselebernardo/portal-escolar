# 🎓 Portal Escolar - Sistema de Gestão Acadêmica

> Projeto desenvolvido como parte da **Atividade Extensionista II** do curso de Análise e Desenvolvimento de Sistemas.

![Badge Concluído](http://img.shields.io/static/v1?label=STATUS&message=CONCLUÍDO&color=GREEN&style=for-the-badge)
![Badge ODS](http://img.shields.io/static/v1?label=ODS&message=4%20EDUCAÇÃO%20DE%20QUALIDADE&color=red&style=for-the-badge)

## 💻 Sobre o Projeto

O **Portal Escolar** é uma aplicação web desenvolvida para otimizar a gestão acadêmica de escolas de ensino fundamental. O sistema resolve o problema da descentralização de informações, permitindo que professores lancem notas e frequências de forma digital, enquanto alunos podem consultar seus boletins em tempo real.

O projeto está alinhado ao **ODS 4 (Educação de Qualidade)** da ONU, promovendo a modernização de processos educacionais e facilitando o acompanhamento do desempenho escolar.

---

## ⚙️ Funcionalidades

### 👨‍🏫 Painel do Professor (Gestão)
- **Autenticação Segura:** Acesso restrito via senha administrativa.
- **Cadastro de Alunos:** Criação de usuários com validação de duplicidade (Aluno + Matéria).
- **Lançamento de Notas:** Suporte a 4 bimestres com cálculo automático de média.
- **Regras de Negócio Automáticas:**
  - ✅ **Aprovado:** Média ≥ 7.0
  - ⚠️ **Recuperação:** 5.0 ≤ Média < 7.0
  - ❌ **Reprovado por Nota:** Média < 5.0
  - 📉 **Reprovado por Falta:** Frequência < 75%
- **Dashboard Gerencial:** Estatísticas em tempo real (Total de Alunos, Aprovados e Reprovados).
- **Exportação de Dados:** Geração de relatórios completos em formato Excel (.csv).
- **Filtro Inteligente:** Pesquisa instantânea de alunos na tabela.

### 🧑‍🎓 Painel do Aluno (Visualização)
- **Acesso Individual:** Login com nome e senha definidos pelo professor.
- **Boletim Online:** Visualização clara das notas, média e situação final.
- **Download de Boletim:** O aluno pode baixar seu próprio histórico em Excel.

---

## 🛠️ Tecnologias Utilizadas

O projeto foi desenvolvido focado em **Performance** e **Simplicidade**, sem dependência de bibliotecas pesadas.

- **HTML5 Semântico:** Estrutura acessível e organizada.
- **CSS3 Moderno:**
  - Layout Responsivo (Mobile First).
  - Flexbox e CSS Grid para diagramação.
  - Design System "Clean UI" focado na experiência do usuário (UX).
- **JavaScript (ES6+):**
  - Manipulação avançada do DOM.
  - Lógica de validação de formulários (Anti-Erro).
  - **LocalStorage:** Persistência de dados no navegador (banco de dados client-side).

---

## 🚀 Como Executar o Projeto

### Versão Online
Acesse o projeto rodando diretamente no navegador através do GitHub Pages:
🔗 **[Clique aqui para acessar o Portal Escolar](https://giselebernardo.github.io/portal-escolar/)**

### Versão Local
1. Clone este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox).
3. Utilize a senha mestra `admin123` para acessar o painel do professor.
4. Para testes rápidos, utilize o botão **"🎲 Dados de Teste"** no painel do professor.

---

## 📝 Autora

Desenvolvido com 💜 por **Gisele Bernardo da Silva**

---
