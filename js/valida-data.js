export default function ehMaiorDeIdade(campo) {
    const dataReserva = new Date(campo.value + 'T00:00:00');
    if (!validaReserva(dataReserva)) {
        campo.setCustomValidity("Ô trem, num dá pra vortá no tempo pra te atendê nessa data, sô.");
    }
}

function validaReserva(dataReserva) {
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    dataReserva.setHours(0, 0, 0, 0);

    return dataReserva >= dataAtual
};

