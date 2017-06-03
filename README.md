# Material de estudos sobre REACT

O [React](https://facebook.github.io/react/), é uma lib para construção de interfaces, feita pelo pessoal do facebook e muito usada pela comunidade.

## Resumo dos estudos

### Introdução

primeiro de tudo vamos instalar o create react app, que é uma ferramente para auxiliar na configuração inicial de uma aplicação react, lembrando que o react é composto por um conjunto de tecnologias e não é algo trivial fazer a configuração do zero, os comandos para instalar o create react app são:
````
1º - npm install -g create-react-app

2º - create-react-app nome-do-app
3º - cd nome-do-app
4º - npm start
````
usando o comando *create-react-app* vamos ter a criação de uma série de arquivos que fazem parte da configuração do react, na pasta *src* temos a estrutura da aplicação, o arquivo *index.html* é o ponto de partida junto com o arquivo *index.js* no arquivo *index.js* podemos ver uma chamada utilizando JSX ( html direto no código javascript ).
index.js
````js
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
````
app.js
````js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
    < XML QUE SERÁ EXIBIDO NO FRONT />
    < OBRIGATÓRIO FECHAR AS TAGS />
    );
  }
}

export default App;
````
app.js é um component, que é importado no index e pode ser exibido na tela.


### Estado do Component
o estado pode ser qualquer conjunto de informações que serão usadas pelo component, o estado vai estar na variável state e é nesse variável que vamos guardar o estado, vale lembrar que essa variável é observada pelo react, para isso vamos incializar o contrutor com state.
````js
...

class App extends Component {
  constructor() {
    super();
    this.state = {
      lista:[{id:1,nome:'joselino',email:'jose@mail.com'},{id:2,nome:'carlos',email:'carlos@mail.com'}]
    }
  }

  render() {
    ...
  }
}
````
a variável *state* que é referenciada pelo *this* que com o super() faz a chamada para o contrcutor da classe Component, vale lembrar que no construtor podemos incializar state mas não devemos carregar com dados, tipo fazer uma requisição ajax, podemos fazer uso dessa lista fazendo um loop em uma <table> e exibindo cada campo da lista em uma <tr>

App.js
````html
<div>            
  <table className="pure-table">
    <thead>
      <tr>
        <th>Nome</th>
        <th>email</th>
      </tr>
    </thead>
    <tbody>
      {
        this.state.lista.map(function(autor){
          return (
            <tr key={autor.id}>
              <td>{autor.nome}</td>
              <td>{autor.email}</td>
            </tr>
          );
        })
      }
    </tbody>
  </table> 
</div> 
````
poderiamos carregar esses dados a partir de uma API usndo jquery e fazer algo do tipo.
*App.js*
````js
componentDidMount() {
  $.ajax({
    url:"http://localhost:8000/api/data",
    dataType: 'json',
    success:function(data) {
      this.setState({lista:data})
    }.bind(this)
  })
}
````
esse método é chamado quando o component for criado e nesse momento é feita a requisição ajax que vai alimentar o state do component, além do DidMount existe também o WillMount que faz a chamada antes da criação do component, outra coisa que precisamos é que quando a *lista* em state mudar, o state precisa saber disso e precisa renderizar o component novamente com o state atualizado, é como se fosse um watcher que fica observando e quando state muda ele chama o render e o component é atualizado, o this.setState faz essa mágica acontecer, o .bind(this) é pra dizer ao jQuery que o this é referente ao react.

### Ciclo de vida do React

existem outras funções do ciclo de vida do react como componentDidMount ou componentWillMount sendo o DidMount a função chamada depois do component ser renderizado o WillMount é chamado antes da renderização do component.

### Evento

quando clicamos em um botão do form precisamos disparar um evento que normalmente faz uma requisição ajax enviando os inputs do form para o servidor para isso precisamos criar um form e colocar a chamada de uma função dessa forma:
App.js
````js

class App extends Component {

  constructor() {
    super()
    this.state = {
      lista:[],
      nome:'',
      email:'',
      senha:''
    };
    this.enviarForm = this.enviaForm.bind(this);
  }

  componentDidMount() {
    ...
  }

  enviarForm(evento) {
    evento.preventDefault(); // -> INFORMA AO REACT QUE NÃO QUER RECARREGAR A PÁGINA APÓS O ENVIO DO FORM

    $.ajax({
      url:'http://localhost:8000/api/data',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success:function(data) {

      }.bind(this),
      error:function(data) {
        
      }
    })
  }

  render() {
    <form onSubmit={this.nomeFunction} method="post">
    ...
      <input type="text" name="nome" id="nome" value="this.state.nome" onChange={this.setNome}/>
      <input type="text" name="email" id="email" value="this.state.email" onChange={this.setEmail}/>
      <input type="text" name="senha" id="senha" value="this.state.senha" onChange={this.setSenha}/>
    </form>
  }
}
````
com o onSubmit podemos passar funções através do this para o formulário na função usando *preventDefault()* no evento fazemos com que a página não seja recarregada, a função enviarForm é declarada no construtor usando .bind(this) para usar o this do react nos inputs adicionamos value=" variável do state" 

4.2