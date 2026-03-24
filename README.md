# 📝 To-Do List Fullstack (Node.js + SQLite)

Um gerenciador de tarefas dinâmico que utiliza uma arquitetura cliente-servidor para persistência de dados em um banco de dados relacional leve.

## 🚀 Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3 (Modern UI) e JavaScript Vanilla (Async/Await & DOM Manipulation).
- **Backend:** Node.js com Framework Express.
- **Banco de Dados:** SQLite3 (Persistência local via arquivo `.db`).
- **Comunicação:** API REST (JSON).

## 🛠️ Funcionalidades

- [x] **Adicionar Tarefas:** Criação de novos itens via formulário com envio `POST`.
- [x] **Listagem Automática:** Ao carregar a página, o sistema busca todas as tarefas do banco via `GET`.
- [x] **Concluir e Remover:** Ao marcar o campo "Concluído", o sistema executa um `DELETE` no banco de dados e remove o item da interface com um efeito suave.
- [x] **Persistência:** Os dados permanecem salvos mesmo após reiniciar o servidor ou atualizar a página.

## 🔧 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/Enzzo-Noronha/To-Do-List](https://github.com/Enzzo-Noronha/To-Do-List)
   ```
