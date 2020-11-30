var viggenere = viggenere || (function(){

    var doStaff = function(txt, desp, action){
        var replace = (function(){
            var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                    'l','m','n','ñ','o','p','q','r','s','t','u',
                    'v','w','x','y','z'];
            var l = abc.length;

            return function(c){
                var i = abc.indexOf(c.toLowerCase());
                if (i != -1) {
                    var pos = i;
                    if (action) {
                        pos += desp;
                        pos = (pos >= l) ? pos-l : pos;                                
                    }else{
                        pos -= desp;
                        pos = (pos < 0) ? l+pos : pos;
                    }
                    return abc[pos];
                }
                return c;
            };
        })();
        var re = (/([a-z-ñ])/ig);
        return String(txt).replace(re, function(match){
            return replace(match);
        });
    };
    return{
        encode : function(txt, desp){
            return doStaff(txt, desp, true);
        },

        decode : function(txt, desp){
            return doStaff(txt, desp, false);x
        }
    };
})();


function codificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split(''); 

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.encode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}

function decodificar(texto, clave) {

    var resultado = "";
    var indiceClave = 0;
    var charArTexto = texto.split('');

    for (var i = 0; i < charArTexto.length; i++) {
        
        var despla = obIndiceClave(clave.charAt(indiceClave));
        var charTexto = charArTexto[i];

        resultado += viggenere.decode(charTexto, (despla >= 27) ? despla%27 : despla);
        indiceClave++

        if (indiceClave >= clave.length) {
            indiceClave = 0;
        }

    }

    document.getElementById("res").value = resultado;

}


function obIndiceClave(reco) {
    
    var abc = ['a','b','c','d','e','f','g','h','i','j','k',
                'l','m','n','ñ','o','p','q','r','s','t','u',
                'v','w','x','y','z'];
    
    return abc.indexOf(reco.toLowerCase());
}


function verificar(){
    var cadena = document.getElementById("cadena").value;
    var clave = document.getElementById("pos").value;
    if (cadena == "") {
        alert("Ingresa el texto");
    }if (clave == "") {
        alert("Ingresa la clave")
    }
}


function longitudc() {
    verificar();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("pos").value;
    if (clave.length > texto.length) {
        alert("La clave es más larga que el texto");
    }else{
        codificar(texto, clave);
    }
}

function longitudd() {
    verificar();
    var texto = document.getElementById("cadena").value;
    var clave = document.getElementById("pos").value;
    if (clave.length > texto.length) {
        alert("La clave es más larga que el texto");
    }else{
        decodificar(texto, clave);
    }
}


