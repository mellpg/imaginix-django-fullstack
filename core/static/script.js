const API_URL = ""; // Chamadas locais do django

// Variável global para guardar todos os brinquedos vindos do banco
let todosOsBrinquedos = [];

// Instanciação do modal do Bootstrap
let bootstrapModal;
let toastBootstrap;

document.addEventListener("DOMContentLoaded", () => {
  bootstrapModal = new bootstrap.Modal(
    document.getElementById("modalEsgotado")
  );

  toastBootstrap = new bootstrap.Toast(
    document.getElementById("notificacaoToast")
  );

  // Monitora cada letra digitada no campo de busca
  const inputBusca = document.getElementById("inputBusca");
  if (inputBusca) {
    inputBusca.addEventListener("input", (e) => {
      const termoBusca = e.target.value.toLowerCase();

      const produtosFiltrados = todosOsBrinquedos.filter((prod) =>
        prod.nome.toLowerCase().includes(termoBusca)
      );

      // Renderiza apenas os produtos filtrados na tela
      exibirProdutos(produtosFiltrados);
    });
  }

  // Evita que a página recarregue se o usuário apertar "Enter" na busca
  const formBusca = document.getElementById("formBusca");
  if (formBusca) {
    formBusca.addEventListener("submit", (e) => e.preventDefault());
  }

  // Cadastro de brinquedos (Garantindo que o formulário já existe na tela)
  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = {
        nome: document.getElementById("nomeBrinquedo").value,
        preco: parseFloat(document.getElementById("precoBrinquedo").value),
        estoque: parseInt(document.getElementById("estoqueBrinquedo").value),
      };

      const resposta = await fetch(`${API_URL}/api/cadastrar/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();
      if (resultado.status === "sucesso") {
        mostrarAviso(resultado.mensagem);
        formCadastro.reset(); // Limpa os campos
        carregarProdutos(); // Recarrega a vitrine preta dinamicamente
      }
    });
  }

  // Envio de agendamento(Garantindo que o formulário já existe na tela)
  // Envio de agendamento (Garantindo que o formulário já existe na tela)
  const formAgendamento = document.getElementById("formAgendamento");
  if (formAgendamento) {
    formAgendamento.addEventListener("submit", async (e) => {
      e.preventDefault();

      const dados = {
        nome_cliente: document.getElementById("cliente").value,
        nome_brinquedo: document.getElementById("brinquedoForm").value,
        data_servico: document.getElementById("dataServico").value,
      };

      const resposta = await fetch(`${API_URL}/api/agendar/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      const resultado = await resposta.json();
      if (resultado.status === "sucesso") {
        // TROCADO AQUI: Sai o alert() feio e entra o nosso Toast elegante!
        mostrarAviso(resultado.mensagem);
        formAgendamento.reset();
      }
    });
  }

  // Inicia o sistema carregando a prateleira assim que a página estiver pronta
  carregarProdutos();
});

// Carregando produtos do banco de dados
async function carregarProdutos() {
  const resposta = await fetch(`${API_URL}/api/brinquedos/`);
  const produtos = await resposta.json();

  // Guardamos a lista original na nossa variável global para poder filtrar depois
  todosOsBrinquedos = produtos;

  // Chama a função para desenhar os produtos na tela
  exibirProdutos(todosOsBrinquedos);
}

// Função auxiliar Desenha os cards na tela baseado na lista que receber
function exibirProdutos(listaDeProdutos) {
  const vitrine = document.getElementById("vitrine");
  if (!vitrine) return;

  vitrine.innerHTML = ""; // Limpa a vitrine

  if (listaDeProdutos.length === 0) {
    vitrine.innerHTML = `<div class="text-center text-muted my-5">Nenhum brinquedo encontrado.</div>`;
    return;
  }

  listaDeProdutos.forEach((prod) => {
    const emEstoque = prod.estoque > 0;

    const textoEstoque = emEstoque
      ? `Estoque: <span class="badge bg-dark text-light border border-secondary" id="est-${prod.id}">${prod.estoque}</span>`
      : `<span class="badge bg-danger-subtle text-danger border border-danger">ESGOTADO</span>`;

    const botao = emEstoque
      ? `<button class="btn btn-outline-success btn-sm w-100" onclick="comprar(${prod.id})">Comprar</button>`
      : `<button class="btn btn-secondary btn-sm w-100" disabled>Indisponível</button>`;

    vitrine.innerHTML += `
            <div class="col-md-4">
                <div class="card h-100 shadow-sm border-0">
                    <div class="card-body d-flex flex-column justify-content-between text-center">
                        <div>
                            <h5 class="card-title fw-bold">${prod.nome}</h5>
                            <p class="card-text text-success fs-5">R$ ${prod.preco.toFixed(2)}</p>
                        </div>
                        <div class="mt-3">
                            <p class="card-text mb-3">${textoEstoque}</p>
                            ${botao}
                        </div>
                    </div>
                </div>
            </div>
        `;
  });
}

// Compra de brinquedo(Diminui no banco e atualiza na tela sem piscar)
async function comprar(id) {
  const resposta = await fetch(`${API_URL}/api/comprar/${id}/`, {
    method: "POST",
  });
  const resultado = await resposta.json();

  if (resultado.status === "sucesso") {
    // Reduz o valor visual do badge imediatamente
    const elementoEstoque = document.getElementById(`est-${id}`);
    if (elementoEstoque) {
      elementoEstoque.innerText = resultado.novo_estoque;
    }

    // Se zerou, atualiza a vitrine inteira para mudar o botão para 'Indisponível'
    if (resultado.novo_estoque === 0) {
      carregarProdutos();
    }
  } else if (resultado.status === "esgotado") {
    // Mostra o modal customizado de esgotado do Bootstrap
    if (bootstrapModal) {
      bootstrapModal.show();
    }
  }
}

function mostrarAviso(mensagem) {
  const textoElemento = document.getElementById("notificacaoTexto");
  if (textoElemento && toastBootstrap) {
    textoElemento.innerText = mensagem;
    toastBootstrap.show();
  }
}
