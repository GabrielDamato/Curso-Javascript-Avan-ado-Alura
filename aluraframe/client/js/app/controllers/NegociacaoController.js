class NegociacaoController {

    constructor(){

        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._ordemAtual = "";

        this._listaNegociacoes = new Bind(
            new ListaNegociacoes(),
            this._negociacoesView = new NegociacoesView($("#negociacoesView")),
            "adiciona", "esvazia", "ordena", "inverteOrdem"
        );

        this._mensagem = new Bind(
            new Mensagem(),
            this._mensagemView = new MensagemView($("#MensagemView")),
            "texto"
        );
    }

    adiciona(event){

        event.preventDefault();
        
        try{
            this._listaNegociacoes.adiciona(this._criaNegociacao());
            this._mensagem.texto = "Negociação adicionada com sucesso";
            this._limpaFormulario();
        }catch(erro){
            this._mensagem.texto = erro;
        }
    }

    importaNegociacoes(){

        let service = new NegociacaoService();
     
        service.obterNegociacoes()
            .then(negociacoes => {
                negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
                this._mensagem.texto = "Negociacoes importadas com sucesso";
            })
            .catch(erro => this._mensagem.texto = erro);
    }

    _limpaFormulario(){

        this._inputData.value = "";
        this._inputQuantidade.value = 1;
        this._inputValor.value = 0;

        this._inputData.focus();
    }

    _criaNegociacao(){

        return new Negociacao(
            DataHelper.textoParaData(this._inputData.value), 
            this._inputQuantidade.value, 
            this._inputValor.value
        );
    }

    apaga() {

        this._listaNegociacoes.esvazia();
        this._mensagem.texto = "Negociações apagadas com sucesso";
    }

    ordena(coluna){
        if(this._ordemAtual == coluna){
            this._listaNegociacoes.inverteOrdem();
        }else{
            this._listaNegociacoes.ordena((a,b) => a[coluna] - b[coluna]);
        }
        this._ordemAtual = coluna;
    }
}