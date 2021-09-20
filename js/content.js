
if(window.ativado){

    console.log("reset");

}else{
    
    chrome.storage.sync.get(['options'], function(items) {
        const
            options = JSON.parse(items.options)
            console.log(items)

        if(options){
            window.localStorage.setItem('salario',options.salario || "") 
            window.localStorage.setItem('horas-dia',options["horas-dia"] || "")
            window.localStorage.setItem('horas-semana',options["horas-semana"] || '')  
        }
        console.log(window.localStorage)
    });

    window.ativado = true;

    let mutationCounter = 0;
    let horasPorDia = window.localStorage.getItem('horas-dia') || 8;

    let salario = window.localStorage.getItem('salario') parseFloat(window.localStorage.getItem('salario').replace(/[^0-9,.]/g, '').replace(/[.]/g, '').replace(',', '.')).toFixed(0) : 1100;

    let horasSemanais = window.localStorage.getItem('horas-semana') || 40;
    let totalSemanas = 4.5;

    minutoSalario = () =>  ((salario / (horasSemanais * totalSemanas) ) / 60);

        observeDOM = () => {
            let MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
                eventListenerSupported = window.addEventListener

            return (obj, callback) => {
                if(obj && obj.nodeType){
                    if( MutationObserver ){
                        let disableObserver = false;
                        let obs = new MutationObserver(function(mutations, observer){
                            if( mutations[0].addedNodes.length || mutations[0].removedNodes.length ){
                                mutations.forEach(mutation => {
                                    if (mutation.addedNodes && !disableObserver) {
                                        [].slice.call(mutation.addedNodes).forEach(node => {
                                            nodeHTML = node.innerHTML
                                            reais = 'R$'
                                            reais_extenso = 'reais'
                                            if (nodeHTML && (nodeHTML.indexOf(reais) !== -1)) {
                                                disableObserver = true
                                                substituiValores("*")
                                                disableObserver = false
                                            }
                                        })
                                    }
                                })
                            }
                        })
                        obs.observe( obj, { childList:true, subtree:true })
                    }    
                }   
            }
        }


        // ,

        // todo <detectaSufixo>
        // ,
        // todo <tempoSalario>

        // ,
        // todo <substitui valores>

    jQuery(document).ready(function(){
        substituiValores('*');
    })

    observeDOM(document.body)
}
