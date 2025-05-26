
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-agendamento");
  const tabela = document.querySelector("#tabela-agendamentos tbody");
  const servicoSelect = document.getElementById("servico");
  const dataInput = document.getElementById("data");
  const horaSelect = document.getElementById("hora");
  const totalSpan = document.getElementById("total-faturamento");

  fetch("servicos.php")
    .then(res => res.json())
    .then(servicos => {
      servicoSelect.innerHTML = '<option value="">Selecione o serviço</option>';
      servicos.forEach(s => {
        const opt = document.createElement("option");
        opt.value = s.id;
        opt.textContent = `${s.nome} - R$ ${s.preco.replace('.', ',')}`;
        servicoSelect.appendChild(opt);
      });
    });

  dataInput.addEventListener("change", () => {
    horaSelect.innerHTML = '<option value="">Selecione o horário</option>';
    const blocos = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
                    "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30",
                    "17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30",
                    "21:00","21:30"];
    blocos.forEach(h => {
      const opt = document.createElement("option");
      opt.value = h;
      opt.textContent = h;
      horaSelect.appendChild(opt);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const dados = new URLSearchParams();
    dados.append("nome", document.getElementById("nome").value);
    dados.append("servico_id", servicoSelect.value);
    dados.append("data", dataInput.value);
    dados.append("hora", horaSelect.value);

    fetch("agendar.php", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: dados
    })
      .then(res => res.json())
      .then(res => {
        if (res.status === "ok") {
          alert("Agendamento realizado com sucesso!");
          carregarAgendamentos();
          form.reset();
          horaSelect.innerHTML = '<option value="">Selecione o horário</option>';
        }
      });
  });

  window.carregarAgendamentos = function () {
    const dataExibida = document.getElementById("data-exibida").value;
    fetch(`listar_agendamentos.php?data=${dataExibida}`)
      .then(res => res.json())
      .then(dados => {
        tabela.innerHTML = "";
        let total = 0;
        dados.forEach(a => {
          const linha = document.createElement("tr");
          linha.innerHTML = `
            <td data-label="Nome">${a.nome_cliente}</td>
            <td data-label="Serviço">${a.servico}</td>
            <td data-label="Data">${a.data}</td>
            <td data-label="Hora">${a.hora}</td>
            <td data-label="Status">${a.status}</td>`;
          tabela.appendChild(linha);
          if (a.status !== "cancelado") total += parseFloat(a.preco);
        });
        totalSpan.textContent = total.toFixed(2).replace('.', ',');
      });
  };

  document.getElementById("data-exibida").valueAsDate = new Date();
  carregarAgendamentos();
});
