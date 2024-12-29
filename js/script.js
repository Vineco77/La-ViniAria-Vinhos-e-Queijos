import ehUmCPF from "./valida-cpf.js";
import ehMaiorDeIdade from "./valida-data.js";
const camposDoFormulario = document.querySelectorAll('[required]')
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "telefone": e.target.elements["telefone"].value,
        "cpf": e.target.elements["cpf"].value,
        "dataReservada": e.target.elements["dataReservada"].value,
        "quantidade": e.target.elements["quantidade"].value,
    }
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));

    window.location.href = "./abrir-reserva-form-2.html";
})


camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
    campo.addEventListener("invalid", evento => evento.preventDefault());
})

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome num pode ficá vazio, não, sô.",
        patternMismatch: "Faz favor de preenchê um nome que seja válido, uai.",
        tooShort: "Uai, faz favor de pôr um nome direito aí."
    },
    email: {
        valueMissing: "Esse trem de e-mail não pode ficar vazio, sô.",
        typeMismatch: "Faz favor de preencher um e-mail que seja válido, uai.",
        tooShort: "Uai, faz favor de colocar um e-mail que sirva, sô."
    },
    telefone: {
        valueMissing: "Nóis precisa do seu número pra entrá em contato, uai.",
        patternMismatch: "Uai, esse número num existe, não.",
        tooShort: "Esse número tá faltando dígito, sô."
    },
    cpf: {
        valueMissing: 'Esse campo do CPF num pode ficar vazio, não, sô.',
        patternMismatch: "Faz favor de preencher um CPF que seja válido, uai.",
        customError: "Esse CPF que cê digitou não existe, sô.",
        tooShort: "Esse CPF tá faltando caractére, sô."
    },
    dataReservada: {
        valueMissing: 'Vai precisá escolhê uma data pra reservá, sô.',
        customError: 'Ô trem, num dá pra vortá no tempo pra te atendê nessa data, sô.'
    },
    termos: {
        valueMissing: 'Antes de seguir, ocê precisa aceitá os nosso tremo, sô.',
    }
}

function verificaCampo(campo) {
    let mensagem = "";
    campo.setCustomValidity("");
    if (campo.name == "cpf" && campo.value.length >= 11) {
        ehUmCPF(campo);
    }if (campo.name == "dataReservada" && campo.value !="") {
        ehMaiorDeIdade(campo)
    }
    tiposDeErro.forEach(erro => {
        if (campo.validity[erro]) {
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const validadorDeInput = campo.checkValidity();

    if (!validadorDeInput) {
        mensagemErro.textContent = mensagem;
    } else{
        mensagemErro.textContent = "";
    }
}