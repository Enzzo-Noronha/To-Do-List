const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");

const app = express();
app.use(cors());
app.use(express.json());

let db;

// Inicializa o Banco de Dados SQLite
(async () => {
  db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  // Cria a tabela de tarefas caso ela não exista
  await db.exec(`
        CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            concluida BOOLEAN DEFAULT 0
        )
    `);
  console.log("Banco SQLite pronto!");
})();

// Rota POST para salvar a tarefa
app.post("/tarefas", async (req, res) => {
  const { titulo, concluida } = req.body;

  try {
    const result = await db.run(
      "INSERT INTO tarefas (titulo, concluida) VALUES (?, ?)",
      [titulo, concluida ? 1 : 0],
    );

    // Retorna a tarefa com o ID gerado pelo SQLite
    res.status(201).json({
      id: result.lastID,
      titulo,
      concluida,
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar no banco" });
  }
});

// BÔNUS: Rota GET para listar as tarefas ao carregar a página
app.get("/tarefas", async (req, res) => {
  const lista = await db.all("SELECT * FROM tarefas");
  res.json(lista);
});

app.delete("/tarefas/:id", async (req, res) => {
  const { id } = req.params; // Captura o ID da URL

  try {
    // Executa o comando no SQLite
    const result = await db.run("DELETE FROM tarefas WHERE id = ?", [id]);

    if (result.changes > 0) {
      res.status(200).json({ message: "Removido com sucesso" });
    } else {
      // Se não deletou nada (ID não existe), avisa o frontend
      res.status(404).json({ error: "Tarefa não encontrada no banco" });
    }
  } catch (error) {
    console.error("Erro no SQLite:", error);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

app.listen(3000, () =>
  console.log("Servidor rodando em http://localhost:3000"),
);
