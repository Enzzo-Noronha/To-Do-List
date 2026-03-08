const adicionarTarefa1 = document.getElementById("adicionarTarefa1");
const adicionarTarefa2 = document.getElementById("adicionarTarefa2");
const fecharTarefa = document.getElementById("fecharTarefa");

adicionarTarefa1.addEventListener("click", (e) => {
  e.preventDefault();

  const visivel = adicionarTarefa2.style.display === "block";
  adicionarTarefa2.style.display = visivel ? "none" : "block";
});

fecharTarefa.addEventListener("click", (e) => {
  adicionarTarefa2.style.display = "none";
});

const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const input = document.getElementById("tarefa");
    const tarefa = input.value.trim();
    const lista = document.getElementById("listaTarefas");

    if (!tarefa) return;

    const novaTarefa = {
      titulo: tarefa,
      concluida: false,
    };

    try {
      const response = await fetch("http://localhost:3000/tarefas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novaTarefa),
      });

      if (!response.ok) throw new Error("Error no servidor");
      const tarefaSalva = await response.json();

      aparecerTarefa(tarefaSalva.titulo, tarefaSalva.id);

      form.reset();
      adicionarTarefa2.style.display = "none";
    } catch (error) {
      console.log("Falha ao salvar: ", error);
      alert("Erro ao salvar tarefa. Verifique se o servidor está ligado");
    }
  });
}

function limpar() {
  form.reset();
}

function aparecerTarefa(texto, id) {
  const lista = document.getElementById("listaTarefas");
  const li = document.createElement("li");
  if (!lista) return;

  li.innerHTML = `<div class="card" data-id="${id}">
      <div class="subCard1">${texto}</div>
      <div class="subCard2">
        <input type="radio" name="status-${id}" onchange="concluirEDeletar(${id}, this)"/> <label for="radio-${id}">Concluído</label>

      </div>
    </div>`;
  lista.appendChild(li);
}

async function concluirEDeletar(id, elementoRadio) {
  try {
    const response = await fetch(`http://localhost:3000/tarefas/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setTimeout(() => {
        const li = elementoRadio.closest("li");
        li.remove();
        console.log(`Tarefa ${id} removida`);
      }, 300);
    } else {
      alert("Erro ao remover tarefa no servidor");
    }
  } catch (error) {
    console.log("Falha na conexão:", error);
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/tarefas");
    const tarefasSalvas = await response.json();

    tarefasSalvas.forEach((t) => {
      aparecerTarefa(t.titulo, t.id);
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
});
