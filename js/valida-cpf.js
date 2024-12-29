export default function ehUmCPF(campo) {
    const cpf = campo.value.replace(/\.|-/g, "");
    if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
      campo.setCustomValidity("Esse Cpf não é valido")
    } 
}

function validaNumerosRepetidos(cpf) {

    const numerosRepetidos = [];

    for (let i = 0; i <= 9; i++) {
        const numero = `${i}`.repeat(11);
        numerosRepetidos.push(numero)
    }

    return numerosRepetidos.includes(cpf);
}

function validaPrimeiroDigito(cpf) {
    let soma = 0;
    let multiplicador = 10;

    for (let tamanho = 0; tamanho < 9; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 | soma == 11) {
        soma = 0;
    }

    return soma != cpf[9] 
}

function validaSegundoDigito(cpf) {
    let soma = 0;
    let multiplicador = 11;

    for (let tamanho = 0; tamanho < 10; tamanho++) {
        soma += cpf[tamanho] * multiplicador;
        multiplicador--;
    }

    soma = (soma * 10) % 11;

    if (soma == 10 | soma == 11) {
        soma = 0;
    }

    return soma != cpf[10] 
}