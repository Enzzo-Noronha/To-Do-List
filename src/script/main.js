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
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const input = document.getElementById("tarefa");
    const tarefa = input.value.trim();
    const lista = document.getElementById("listaTarefas");

    if (!tarefa) return;

    const li = document.createElement("li");
    li.innerHTML = `${tarefa}`;
    lista.appendChild(li);

    form.reset();
    adicionarTarefa2.style.display = "none";
  });
}

function limpar() {
  form.reset();
}
