let paisesPossiveis = [...reinosepaises];
let perguntaIndex = 0;

let perguntas = [
    { campo: "periodo", texto: "Este país existiu durante o período do(a) {periodo}?" },
    { campo: "continente", texto: "Este país se localiza atualmente no continente {continente}?" },
    { campo: "atuaispaises", texto: "O estado se localiza atualmennte no país {atuaispaises}?" },
    { campo: "principaisReis", texto: "O país teve {principaisReis} como líder?" }
    { campo: ""}
];

// função p  embaralhar as perguntas
function shuffleQuestions(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos?
    }}

// função para gerar a próxima pergunta
function nextQuestion() {
    if (figurasPossiveis.length === 1) {
        // caso reste só uma pessoa, vai mostra isso ae
        document.getElementById('question').textContent = 'Você estava pensando em ${figurasHistoricas[0].nome}?';
        document.getElementById('result').textContent = figurasHistoricas[0].descricao;
        return;
    }

    if (perguntaIndex >= perguntas.length) {
        // se não tiver mais perguntas para fazer, finaliza o jogo
        document.getElementById('question').textContent = "Eu não consegui adivinhar. Você tem outra figura em mente?";
        document.getElementById('result').textContent = "";
        return;
    }

    const pergunta = perguntas[perguntaIndex];
    const atributo = pergunta.campo;

    if (atributo === 'principaisRealizacoes') {
        // se for para pergunta sobre realizações dos mano, escolhe uma realização aleatória
        const realizacaoIndex = Math.floor(Math.random() * figurasHistoricas[0].principaisRealizacoes.length);
        const realizacao = figurasHistoricas[0].principaisRealizacoes[realizacaoIndex];
        document.getElementById('question').textContent = pergunta.texto.replace("{realizacao}", realizacao);
    } else {
        // para as outras perguntas (ocupação, período, etc.), esse codigo burro escolhe o primeiro valor
        const valor = figurasHistoricas[0][atributo] || figurasHistoricas[0][atributo][0];  // Pega o primeiro valor caso seja uma lista
        document.getElementById('question').textContent = pergunta.texto.replace(`{${atributo}}`, valor);
    }
}

// Função para processar a resposta
function answer(resposta) {
    let filtro;

    if (resposta === "sim") {
        filtro = figurasPossiveis.filter(figura => {
            if (figura[perguntas[perguntaIndex].campo] instanceof Array) {
                return figura[perguntas[perguntaIndex].campo].includes(perguntas[perguntaIndex].texto);  // Para listas, verifica se contém o valor
            } else {
                return figura[perguntas[perguntaIndex].campo] === perguntas[perguntaIndex].texto;
            }
        });
    } else if (resposta === "nao") {
        filtro = figurasHistoricas.filter(figura => {
            if (figura[perguntas[perguntaIndex].campo] instanceof Array) {
                return !figura[perguntas[perguntaIndex].campo].includes(perguntas[perguntaIndex].texto);
            } else {
                return figura[perguntas[perguntaIndex].campo] !== perguntas[perguntaIndex].texto;
            }
        });
    }

    figurasPossiveis = filtro;
    perguntaIndex++;

    nextQuestion();
}

// começar o jogo
shuffleQuestions(perguntas); // embaralha as pergunta para a ordem ser random
nextQuestion();