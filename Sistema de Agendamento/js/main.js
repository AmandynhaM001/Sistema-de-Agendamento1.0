document.addEventListener("DOMContentLoaded", () => {
  // 1. DOM Caching: Armazena referências aos elementos principais
  const scheduleForm = document.getElementById("schedule-form");
  // ATENÇÃO: Corrigi 'hora' para 'time' para coincidir com seu HTML
  const nameInput = document.getElementById("name");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  const agendamentosDiv = document.getElementById("listaAgendamento");

  // 2. Função de Agendamento
  function agendar(event) {
    event.preventDefault(); // Previne o recarregamento da página!

    // 3. Captura dos valores
    const nome = nameInput.value.trim(); // Usa trim() para remover espaços extras
    const data = dateInput.value;
    const hora = timeInput.value;

    // 4. Validação (Embora o 'required' ajude, é bom ter JS também)
    if (!nome || !data || !hora) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    // 5. Formatação da Data
    const dataObjeto = new Date(data + "T00:00:00");
    const dataFormatada = dataObjeto.toLocaleDateString("pt-BR", {
      timeZone: "UTC",
    });

    // 6. Criação e Inserção do Elemento
    const novoItem = document.createElement("p");

    // Adiciona uma classe para estilização e usa template string
    novoItem.classList.add("agendamento-item");
    novoItem.innerHTML = `
            📅 <strong>${nome}</strong> agendou para 
            <strong>${dataFormatada}</strong> às 
            <strong>${hora}</strong>.
        `;

    // Insere o novo item no topo da lista (para ver o mais recente primeiro)
    agendamentosDiv.prepend(novoItem);

    // 7. Limpa o formulário
    scheduleForm.reset();

    // Rola a página para exibir o resultado
    agendamentosDiv.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  // 8. Event Listener
  if (scheduleForm) {
    scheduleForm.addEventListener("submit", agendar);
  }
});
