
//todo refatorar
const detectaSufixo = (sufixo) =>{

    let sufixo_numero = 0;

    switch (sufixo) {
        case "mil":
            sufixo_numero = 1000;
            break;
        case "mi":
            sufixo_numero = 1000000;
            break;
        case "milhão":
            sufixo_numero = 1000000;
            break;
        case "milhões":
            sufixo_numero = 1000000;
            break;
        case "bi":
            sufixo_numero = 1000000000;
            break;
        case "bilhão":
            sufixo_numero = 1000000000;
            break;
        case "bilhões":
            sufixo_numero = 1000000000;
            break;
        case "tri":
            sufixo_numero = 1000000000000;
            break;
        case "trilhão":
            sufixo_numero = 1000000000000;
            break;
        case "trilhões":
            sufixo_numero = 1000000000000;
            break;
        default:
            sufixo_numero = 1;
    }
    return sufixo_numero;
}


//todo refatorar
tempoSalario = (valor_final) => {

    let totalhoras

    if(!isNaN(valor_final)){

        tempo_salario = (valor_final / minutoSalario());
        tempo_salario_sufixo = 'minutos';

        if (tempo_salario < 1) {

            let tempo_salario_segundos = (tempo_salario * 60).toFixed(0);

            if (tempo_salario_segundos === 0) {
                tempo_salario = (tempo_salario * 60 * 1000).toFixed(0);
                if (tempo_salario !== 1)
                    tempo_salario_sufixo = 'milisegundos';
                else
                    tempo_salario_sufixo = 'milisegundo';
            } else {
                tempo_salario = tempo_salario_segundos;
                if (tempo_salario !== 1)
                    tempo_salario_sufixo = 'segundos';
                else
                    tempo_salario_sufixo = 'segundo';
            }
        } else if (tempo_salario >= 60) {
            tempo_salario = (tempo_salario / 60).toFixed(0);
            if (tempo_salario !== 1)
                tempo_salario_sufixo = 'horas';
            else
                tempo_salario_sufixo = 'hora';
            if (tempo_salario >= horasPorDia) {
                totalhoras = tempo_salario
                tempo_salario = (tempo_salario / horasPorDia).toFixed(0);

                if (tempo_salario !== 1)
                    tempo_salario_sufixo = 'dias';
                else
                    tempo_salario_sufixo = 'dia';
                if (tempo_salario >= 365) {
                    tempo_salario = (tempo_salario / 365).toFixed(0);
                    if (tempo_salario !== 1)
                        tempo_salario_sufixo = 'anos';
                    else
                        tempo_salario_sufixo = 'ano';

                }
            }
        } else {
            tempo_salario = tempo_salario.toFixed(0);
            if (tempo_salario === 1) tempo_salario_sufixo = 'minuto';
        }
        total_calculado_valor = tempo_salario.replace(".", ",") + " " ;
        total_calculado = totalhoras ? total_calculado_valor + tempo_salario_sufixo + ' ou ' + totalhoras+ " horas de trabalho " : total_calculado_valor + tempo_salario_sufixo
        return total_calculado;
    }
}