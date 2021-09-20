substituiValores = function(evt) {
    jQuery(evt).not('script').not('style').not('iframe').not('canvas').not('input').not('textarea').contents().each(function() {

        if (this.nodeType === 3) {
            var u = this.nodeValue;
            var reais = 'R$';
            var reais_extenso = 'reais';
            if (u.indexOf(reais) !== -1) {

                var total_preco = u.split("R$");
                var calculou = 0;
                for (var k = 0; k < total_preco.length - 1; k++) {
                    var valores = total_preco[k + 1];
                    if (valores[0] === ' ') {
                        valores = valores.slice(1);
                        espaco = ' ';
                    } else {
                        espaco = '';
                    }

                    if (valores.indexOf(" ") === -1) {
                        var total_sufixo = new Array();
                        total_sufixo[0] = valores;
                        total_sufixo[1] = '';
                    }else{
                        var total_sufixo = valores.split(" ");
                    }

                    var prefixo_sem_pontuacao = total_sufixo[0].replace(/\b[-.,;()&$#!?\[\]{}""“”']+\B|\B[-.,;()&$#!?\[\]{}"“”']+\b/g, "");
                    string_a_substituir = reais + espaco + prefixo_sem_pontuacao;
                    var sufixo_sem_pontuacao = total_sufixo[1].replace(/\b[-.,;()&$#!?\[\]{}""“”']+\B|\B[-.,;()&$#!?\[\]{}"“”']+\b/g, "");
                    var sufixo = sufixo_sem_pontuacao.toLowerCase().trim();

                    sufixo_numero = detectaSufixo(sufixo);
                    if (sufixo_numero != 1) {
                        string_a_substituir = string_a_substituir + " " + sufixo_sem_pontuacao;
                    }
                    var valor_financeiro = total_sufixo[0].replace(/\./g, "").replace(/,/g, ".");
                    valor_financeiro = parseFloat(valor_financeiro);
                    var valor_final = valor_financeiro * sufixo_numero;
                    tempo_salario = tempoSalario(valor_final);

                    if (typeof tempo_salario !== 'undefined' && !isNaN(valor_financeiro)) {
                        span_calculado = '<bdi class="tempoSalario" title="' + string_a_substituir + '">' + total_calculado + '</bdi>';
                        replacedText = u.replace(string_a_substituir, span_calculado);
                        u = replacedText;
                        calculou = 1;
                    }

                }
                if(calculou){
                    this.outerHTML = replacedText
                    jQuery(this).replaceWith(replacedText);
                }
            } else if (u.indexOf(reais_extenso) !== -1) {
                var total_preco = u.split("reais");
                var calculou = 0;
                for (var k = 0; k < total_preco.length - 1; k++) {
                    var valores = total_preco[k].trim();
                    if (valores.indexOf(" ") !== -1) {
                        var total_sufixo = valores.split(" ");
                        var checa_ultimo = total_sufixo[total_sufixo.length - 1];
                        if (isNaN(checa_ultimo)) {
                            if (checa_ultimo.toLowerCase() === 'de') {
                                conectivo = ' de';
                                sufixo = total_sufixo[total_sufixo.length - 2];
                                valor_financeiro = total_sufixo[total_sufixo.length - 3];
                            } else {
                                conectivo = '';
                                sufixo = checa_ultimo;
                                valor_financeiro = total_sufixo[total_sufixo.length - 2];
                            }
                        } else {
                            conectivo = '';
                            sufixo = '';
                            valor_financeiro = checa_ultimo;
                        }
                    } else if (!isNaN(valores)) {
                        sufixo = '';
                        conectivo = '';
                        valor_financeiro = valores;
                    }
                    sufixo_final = sufixo.toLowerCase().trim();
                    sufixo_numero = detectaSufixo(sufixo_final);
                    var valor_final = valor_financeiro * sufixo_numero;

                    tempo_salario = tempoSalario(valor_final);
                    if (sufixo !== '')
                        string_a_substituir = valor_financeiro + ' ' + sufixo + conectivo + ' ' + reais_extenso;
                    else
                        string_a_substituir = valor_financeiro + ' ' + reais_extenso;
                    if (typeof tempo_salario !== 'undefined' && !isNaN(valor_financeiro)) {
                        span_calculado = '<bdi class="tempoSalario" title="' + string_a_substituir + '">' + total_calculado + '</bdi>';
                        replacedText = u.replace(string_a_substituir, span_calculado);
                        u = replacedText;
                        calculou = 1;
                    }
                }
                if(calculou){
                    this.outerHTML = replacedText
                    jQuery(this).replaceWith(replacedText);
                }
            }
        }
    })
}