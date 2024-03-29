class DataHelper{

    constructor(){
        throw new Error("Esta classe não pode ser instanciada")
    }

    static textoParaData(texto){

        if(!/\d{2}\/\d{2}\/\d{4}/.test(texto))
            throw new Error("deve estar no formato aaaa/mm/dd");
        return new Date(...texto.split("/").reverse()
            .map((item, indice) => item - indice % 2));
    }

    static dataParaTexto(data){
        return `${data.getDate()}/${(data.getMonth() + 1)}/${data.getFullYear()}`; 
    }
}