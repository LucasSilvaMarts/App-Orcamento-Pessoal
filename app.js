// Classe despesa
class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano 
        this.mes = mes 
        this.dia = dia 
        this.tipo = tipo 
        this.descricao = descricao 
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            // Recuperando o valor dos atributos do objeto
            if(this[i] == undefined || this[i] == '' || this[i] == null ) {
                return false
            }
        }
        return true
    }
}

// Inserindo dados no local storage
class Bd {

    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        }
    }

     // Verifica se já existe um id no storage
     getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    // Gravando os dados
    gravar(d) { // 'd' = despesa
        
        let id = this.getProximoId()

        // Convertendo o item em JSON para armazenar no local storage
        localStorage.setItem(id, JSON.stringify(d))

        // Atualiza o documento id com o novo id recuperado
        localStorage.setItem('id', id)
    }    

    recuperarTodosRegistros() {

        // Array despesas
        let despesas = Array()

        let id = localStorage.getItem('id')

        // Recuperar todas as despesas cadastradas em localStorage
        for (let i = 1; i <= id; i++) {

            // Recupera a despesa
            let despesa = JSON.parse(localStorage.getItem(i))
            
            // Verificar se existe a possibilidade de haver índices que foram pulados/removidos
            // nestes casos nós vamos pular esses índices

            if ( despesa === null ) {
                continue
            }

            despesas.push(despesa)
        }

        return despesas
    }
}

let bd = new Bd() 

// Função de cadastrar despesas
// Capturando as informações dos inputs html
function cadastrarDespesa() {
  // Referenciando as informações em variáveis para uso posterior  
  let ano = document.getElementById('ano')
  let mes =  document.getElementById('mes')
  let dia =  document.getElementById('dia')  
  let tipo =  document.getElementById('tipo')
  let descricao =  document.getElementById('descricao')
  let valor = document.getElementById('valor')

    
  let despesa = new Despesa(
        ano.value, 
        mes.value, 
        dia.value, 
        tipo.value, 
        descricao.value, 
        valor.value
  )
  
  if(despesa.validarDados()) {
    bd.gravar(despesa)

    document.getElementById('modal_titulo').innerHTML = 'Gravação feita com sucesso'
    document.getElementById('modal_titulo_div').className = 'modal-header text-success'
    document.getElementById('button').className = 'btn btn-success'
    document.getElementById('modal-text').innerHTML = 'Todos os dados foram salvos!'

    $('#modalRegistraDespesa').modal('show')

    ano.value = ''
    mes.value = ''
    dia.value = ''
    tipo.value = ''
    descricao.value = ''
    valor.value = ''

  } else {
     
    document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
    document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
    document.getElementById('button').className = 'btn btn-danger'
    document.getElementById('button').innerHTML = 'Voltar e corrigir'
    document.getElementById('modal-text').innerHTML = 'Ainda esxitem campos para serem preenchidos.'
    
    $('#modalRegistraDespesa').modal('show')
  }
    
}

// Listando despesas

function carregaListaDespesas() {

    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()

    // Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas')

    // Percorrer o array despesas, listando cada despesa de forma dinâmica
    despesas.forEach(function(d) {
        
        // Criando a linha (tr)

        let linha = listaDespesas.insertRow()

        // Criando as colunas (td)

        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`

        // Ajusta o tipo

        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break    
            case '5': d.tipo = 'Transporte'
                break
        }

        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor
    }) 
}   
