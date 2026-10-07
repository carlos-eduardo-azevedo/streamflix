// ===== 1. DADOS =====
// Cada pessoa é um objeto dentro de um array (vetor).
// A foto de cada uma fica na pasta "imagens".
// Para adicionar mais gente: copie um bloco, mude o nome, a foto e a descrição.
// Atenção: todo bloco termina com "}," (vírgula), menos o último.
var filmes = [
  // ----- ARTISTAS -----
  { titulo: "Mc Kevin", genero: "Artistas", cor: "#222222",
    imagem: "imagens/foto2.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Yuri 22", genero: "Artistas", cor: "#222222",
    imagem: "imagens/foto1.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Mc Ig", genero: "Artistas", cor: "#4a4e69",
    imagem: "imagens/mcig.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Nino Abravanel", genero: "Artistas", cor: "#3d5a80",
    imagem: "imagens/ninoabravanel.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Wesley Alemao", genero: "Artistas", cor: "#5c2a86",
    imagem: "imagens/wesleyalemao.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Boca de 09", genero: "Artistas", cor: "#b5380f",
    imagem: "imagens/boca09.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Alves", genero: "Artistas", cor: "#8a5a2b",
    imagem: "imagens/alves.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Coringa", genero: "Artistas", cor: "#0f8b8d",
    imagem: "imagens/coringa.jpg",
    descricao: "Escreva aqui a descrição." },

  // ----- INFLUENCERS -----
  { titulo: "Buzeira", genero: "Influencers", cor: "#c28a00",
    imagem: "imagens/buzeira.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Fontineli", genero: "Influencers", cor: "#2e8b57",
    imagem: "imagens/fontineli.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Jon Vlogs", genero: "Influencers", cor: "#26547c",
    imagem: "imagens/jonvlogs.jpg",
    descricao: "Escreva aqui a descrição." },

  // ----- FUTEBOL -----
  { titulo: "Neymar", genero: "Futebol", cor: "#8e0e1a",
    imagem: "imagens/neymar.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Messi", genero: "Futebol", cor: "#1d4e89",
    imagem: "imagens/messi.jpg",
    descricao: "Escreva aqui a descrição." },
  { titulo: "Cr7", genero: "Futebol", cor: "#7a1f6b",
    imagem: "imagens/cr7.jpg",
    descricao: "Escreva aqui a descrição." }
];

// A ordem aqui é a ordem das linhas na tela.
// O nome tem que ser igual ao "genero" usado nos blocos acima.
var generos = ["Artistas", "Influencers", "Futebol"];

var minhaLista = [];     // guarda quem o usuário adicionou
var filmeAberto = null;  // guarda quem está aberto no modal

// ===== 2. PEGANDO OS ELEMENTOS DO HTML =====
var areaLinhas = document.getElementById("linhas");
var areaResultados = document.getElementById("resultados");
var campoBusca = document.getElementById("busca");
var modal = document.getElementById("modal");

// ===== 3. FUNÇÕES =====

// Coloca a foto (ou a cor) de fundo em um elemento
function aplicarFundo(elemento, item) {
  elemento.style.backgroundColor = item.cor;   // cor de reserva, se a foto não carregar
  if (item.imagem) {
    elemento.style.backgroundImage =
      "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 60%), url('" + item.imagem + "')";
    elemento.style.backgroundSize = "cover";
    elemento.style.backgroundPosition = "center 20%";
  } else {
    elemento.style.backgroundImage = "linear-gradient(135deg, " + item.cor + ", #000000)";
  }
}

// Cria um card para uma pessoa
function criarCard(filme) {
  var card = document.createElement("div");
  card.className = "card";
  aplicarFundo(card, filme);
  card.textContent = filme.titulo;

  // Quando clicar no card, abre o modal
  card.addEventListener("click", function () {
    abrirModal(filme);
  });

  return card;
}

// Cria uma linha completa: título + cards
function criarLinha(titulo, listaDeFilmes) {
  var linha = document.createElement("div");
  linha.className = "linha";

  var h3 = document.createElement("h3");
  h3.textContent = titulo;
  linha.appendChild(h3);

  var lista = document.createElement("div");
  lista.className = "lista-cards";

  for (var i = 0; i < listaDeFilmes.length; i++) {
    lista.appendChild(criarCard(listaDeFilmes[i]));
  }

  linha.appendChild(lista);
  return linha;
}

// Monta a tela inicial com todas as linhas
function montarLinhas() {
  areaLinhas.innerHTML = "";   // limpa antes de montar

  // Linha "Minha lista" só aparece se tiver algo nela
  if (minhaLista.length > 0) {
    areaLinhas.appendChild(criarLinha("Minha lista", minhaLista));
  }

  // Linha "Em alta" com os 6 primeiros do array
  var emAlta = [];
  for (var i = 0; i < filmes.length && i < 6; i++) {
    emAlta.push(filmes[i]);
  }
  areaLinhas.appendChild(criarLinha("Em alta agora", emAlta));

  // Uma linha para cada gênero
  for (var g = 0; g < generos.length; g++) {
    var doGenero = [];
    for (var j = 0; j < filmes.length; j++) {
      if (filmes[j].genero === generos[g]) {
        doGenero.push(filmes[j]);
      }
    }
    // Só mostra a linha se tiver alguém nela
    if (doGenero.length > 0) {
      areaLinhas.appendChild(criarLinha(generos[g], doGenero));
    }
  }
}

// ----- Modal -----
function abrirModal(filme) {
  filmeAberto = filme;

  var capa = document.getElementById("modal-capa");
  aplicarFundo(capa, filme);

  document.getElementById("modal-titulo").textContent = filme.titulo;
  document.getElementById("modal-detalhes").textContent = filme.genero;
  document.getElementById("modal-descricao").textContent = filme.descricao;
  atualizarBotaoLista();

  modal.classList.remove("escondido");
}

function fecharModal() {
  modal.classList.add("escondido");
}

// Muda o texto do botão conforme esteja ou não na lista
function atualizarBotaoLista() {
  var botao = document.getElementById("modal-lista");
  if (minhaLista.indexOf(filmeAberto) >= 0) {
    botao.textContent = "✓ Na minha lista";
  } else {
    botao.textContent = "+ Minha lista";
  }
}

// Adiciona ou remove da lista
function alternarLista() {
  var posicao = minhaLista.indexOf(filmeAberto);
  if (posicao >= 0) {
    minhaLista.splice(posicao, 1);   // remove
  } else {
    minhaLista.push(filmeAberto);    // adiciona
  }
  atualizarBotaoLista();
  montarLinhas();
}

// ----- Busca -----
function buscar() {
  var texto = campoBusca.value.toLowerCase();

  // Se o campo estiver vazio, volta para a tela normal
  if (texto === "") {
    areaResultados.classList.add("escondido");
    areaLinhas.classList.remove("escondido");
    document.getElementById("banner").classList.remove("escondido");
    return;
  }

  // Esconde o banner e as linhas, mostra os resultados
  document.getElementById("banner").classList.add("escondido");
  areaLinhas.classList.add("escondido");
  areaResultados.classList.remove("escondido");
  areaResultados.innerHTML = "";

  var grade = document.createElement("div");
  grade.className = "grade";

  var achou = false;
  for (var i = 0; i < filmes.length; i++) {
    var titulo = filmes[i].titulo.toLowerCase();
    var genero = filmes[i].genero.toLowerCase();
    if (titulo.indexOf(texto) >= 0 || genero.indexOf(texto) >= 0) {
      grade.appendChild(criarCard(filmes[i]));
      achou = true;
    }
  }

  if (achou) {
    areaResultados.appendChild(grade);
  } else {
    areaResultados.textContent = "Nenhum resultado encontrado.";
  }
}

// ===== 4. EVENTOS =====
campoBusca.addEventListener("input", buscar);
document.getElementById("modal-fechar").addEventListener("click", fecharModal);
document.getElementById("modal-lista").addEventListener("click", alternarLista);

// Clicar fora da caixa também fecha o modal
modal.addEventListener("click", function (evento) {
  if (evento.target === modal) {
    fecharModal();
  }
});

// Botões "Assistir" só mostram um aviso (não tem vídeo de verdade)
function assistir() {
  alert("Abrindo: " + filmeAberto.titulo + " (simulação)");
}
document.getElementById("modal-assistir").addEventListener("click", assistir);

// ===== 5. BANNER =====
// O banner usa o primeiro da lista (filmes[0]).
// Para mudar, troque o 0 por outro número: filmes[1] é o segundo, filmes[2] o terceiro...
var destaque = filmes[0];

var banner = document.getElementById("banner");
if (destaque.imagem) {
  banner.style.backgroundImage =
    "linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.2)), " +
    "linear-gradient(to top, #141414, rgba(20,20,20,0) 25%), " +
    "url('" + destaque.imagem + "')";
  banner.style.backgroundSize = "cover";
  banner.style.backgroundPosition = "center 20%";
}

document.getElementById("banner-titulo").textContent = destaque.titulo;
document.getElementById("banner-descricao").textContent = destaque.descricao;
document.getElementById("banner-assistir").addEventListener("click", function () {
  filmeAberto = destaque;
  assistir();
});
document.getElementById("banner-info").addEventListener("click", function () {
  abrirModal(destaque);
});

// ===== 6. INÍCIO =====
montarLinhas();