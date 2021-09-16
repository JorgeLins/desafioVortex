const fields = document.querySelectorAll("[required]")

var T = document.querySelector("#T");
var Q = document.querySelector("#Q");
var X = document.querySelector("#X");

var resultado = document.querySelector(".resultado");

function isAllValid(){



    if(T.value <= 0 || T.value > 24){
        return {value:false, message:"O T tem que estar entre 1 e 24"};
    }

    if(Q.value < 2 || Q.value > 5){
        return {value:false, message:"O Q tem que estar entre 2 e 5"};
    }

    if(X.value <= 0 || X.value > Q.value - 1){
        return {value:false, message:`O X tem que estar entre 1 e ${Q.value - 1}`};
    }

    return {value:true, message:`ta certo`};;

}

function getIdEvent(event){
    return event.target.id
}


function customValidation(event){

    const field = event.target



    function verifyErrors(){
        let foundError = false;

        

        for(error in field.validity){
            if(error != "customError" && field.validity[error]){
                foundError = true;
            }
        }

        return foundError
    }

    const error = verifyErrors();

    if(error){
        field.setCustomValidity("Preencha esse campo")
    } else {
        field.setCustomValidity("")
    }
    

}

for ( field of fields ){
    field.addEventListener("invalid", customValidation)

}

function resetNumbers(){

    T.value = ""
    Q.value = ""
    X.value = ""

}

function doCalculate(){

    const spanError = document.querySelector(".error");

    res = isAllValid();

    if(res.value){
        var operador = 1
        var calculo = 0
        for(i=T.value; i > 0; i -= 1) {
            if (operador != X.value ) {
                calculo += (Q.value - operador)
                operador += 1;
            }else if (operador == X.value){
                calculo += (Q.value-X.value)
                T.value -=1;
            }
        }
        console.log(calculo)
        resultado.innerHTML = calculo
        resetNumbers();
        spanError.classList.remove("active")
        spanError.innerHTML = ""
    } else {
        
        spanError.classList.add("active")
        spanError.innerHTML = res.message
    }
}
