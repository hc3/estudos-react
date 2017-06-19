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
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
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
        this.setState({lista:data})
      }.bind(this),
      error:function(err) {
        console.log(err)
      }
    })
  }

  setNome(evento) {
    this.setState({nome:evento.target.value})
  }

  setEmail(evento) {
    this.setState({email:evento.target.value})
  }

  setSenha(evento) {
    this.setState({senha:evento.target.value})
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
com o onSubmit podemos passar funções através do this para o formulário na função usando *preventDefault()* no evento, fazemos com que a página não seja recarregada, a função enviarForm é declarada no construtor usando .bind(this) para usar o this do react nos inputs adicionamos value=" variável do state" com o onChange capturamentos a mudança da variável e aplicamos o setCampo, nesse momento vamos criar também três funções para setar valor na variável usando o setState, e vamos atribuir o bind lá no constructor, o próximo passo é atualizar a tabela após da inserção de um novo registro e para isso temos *this.setState({lista:data})* no success.

### Criando o primeiro component 4.4

no input temos todo o css com muita repetição de código, no react quando tivermos essa situaçao devemos sempre tentar componentizar, vamos criar um component para o input conseguindo assim uma maior reutilizaçao do codigo, para isso vamos criar um novo component chamado InputCustomizado na pasta */components/InputCustomizado.js*, quando queremos passar parâmetros para um component usamos o *props*, o atributo props guarda todos os valores que sao passados para o component

o input Customizado vai ter o seguinte código:

*/components/InputCustomizado.js*
````js
import React, {Component} from 'react';

export default class InputCustomizado extends Component {

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor="{this.props.id}">{this.props.label}</label>
        <input id="{this.props.id}" type="{this.props.type}" name="{this.props.name}" value={this.props.value} onChange={this.props.onChange} />
      </div>
    );
  }
}


````
importamos o React + Component para criar um novo component vamos ter a função *render()* que retorna o html , em App.js precisamos fazer a importação do novo component fazendo:
*App.js*
````js
import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';

class App extends Component {
  constructor() {
    super();
    this.state = {
      lista:[],
      nome:'',
      email:'',
      senha:'',
    };
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url:'http://localhost:8000/api/teste',
      dataType:'json',
      success:function(data) {
        this.setState({lista:resposta})
      }.bind(this)
    })
  }

  enviaForm(evento) {
    evento.preventDefault(); 

    $.ajax({
      url:'http://localhost:8000/api/data',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success:function(data) {
        this.setState({lista:data})
      }.bind(this),
      error:function(err) {
        console.log(err)
      }
    })
  }

  setNome(evento) {
    this.setState({nome:evento.target.value})
  }

  setEmail(evento) {
    this.setState({email:evento.target.value})
  }

  setSenha(evento) {
    this.setState({senha:evento.target.value})
  }

  render() {
    return (
      <div id="layout">
        ...
          <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                  <InputCustomizado id="nome" type="text" name="nome" value="this.state.nome" onChange="this.setNome" label="Nome"/>
                  <InputCustomizado id="email" type="text" name="email" value="this.state.email" onChange="this.setEmail" label="Email"/>
                  <InputCustomizado id="senha" type="text" name="senha" value="this.state.senha" onChange="this.setSenha" label="Senha"/>

                  <div className="pure-control-group">
                    <label></label>
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>
                  </div>
                </form>
              </div>
            </div>

          </div>

      </div>
    )
  }
}
````

### Primeira refatorada do código de App.js

vamos refatorar o *App.js* organizando melhor o código deixando cada um com sua respectiva responsabilidade, para isso o que precisamos é de um component com o formulário do autor e com a tabela de autores para isso vamos refatorar *App.js* e criar o *Autor.js*.

*App.js*
````js
import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        
        <div id="menu">
          <div className="pure-menu">
            ....
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <AutorBox />
      </div>
    )
  }
}
````


*Autor.js*
````js
import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';

class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {nome:'',email:'',senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault(); 

    $.ajax({
      url:'http://localhost:8000/api/data',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success:function(data) {
        this.props.callbackAtualizaListagem(data)
      }.bind(this),
      error:function(err) {
        console.log(err)
      }
    })
  }

  setNome(evento) {
    this.setState({nome:evento.target.value})
  }

  setEmail(evento) {
    this.setState({email:evento.target.value})
  }

  setSenha(evento) {
    this.setState({senha:evento.target.value})
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value="this.state.nome" onChange="this.setNome" label="Nome"/>
          <InputCustomizado id="email" type="text" name="email" value="this.state.email" onChange="this.setEmail" label="Email"/>
          <InputCustomizado id="senha" type="text" name="senha" value="this.state.senha" onChange="this.setSenha" label="Senha"/>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    )
  }

}

class TatabelaAutores exnteds Compoent {

  render() {
    return(
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
              this.props.lista.map(function(autor){
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
    )
  }
}

export default class AutorBox extends Component {

  constructor() {
    super();
    this.state = {lista:[]};
    this.atualizaListagem = this.atualizaListagem.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url:'http://localhost:8000/api/teste',
      dataType:'json',
      success:function(data) {
        this.setState({lista:resposta})
      }.bind(this)
    })
  }

  atualizaListagem(data) {
    this.setState({lista:data})
  }

  render() {
    return (
      <div className="content" id="content">
            <FormularioAutor callbackAtualizaListagem={this.atualizaListagem}/>
            <TabelaAutores lista={this.state.lista} />
      </div>
    )
  }
}
````
o arquivo *Autor.js* vai ficar com a tabela e o formulário para isso criamos duas classes para representa-los, exportamos como default a class box que vai agrupar os components como em uma caixa, esse component se comunica com os outros através da variável *props* podemos ver TabelAutores com uma propriedade *lista* que recebe o *state* essa mesma propriedade está disponível na classe TatabelaAutores acessando *this.props.lista*, e essa é uma grande sacada do React, podemos fazer o mesmo com o formulário passando uma propriedade *callbackAtualizaListagem* que recebe uma função que atualiza o *state*, lá no formulário no sucesso do post temos o acesso a essa propriedade *this.props.callbackAtualizaListagem(data)* e fazendo a chamada dessa função.
-Muito importante perceber que estamos criando propriedades no html que estão acessíveis através da variável *props*, no formulário estamos passando uma assinatura de função que quando é chamada o EnviaForm nem sabe o que é callbackAtualizaListagem, ele apenas faz a chamada.
-Criar o component box (higher order component) é uma boa prática e muita usada no mercado.


### Segunda refatorada do código de App.js
*App.js*
````js
import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        
        <div id="menu">
          <div className="pure-menu">
            ....
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <AutorBox />
      </div>
    )
  }
}
````


*Autor.js*
````js
import React, { Component } from 'react';
import $ from 'jquery';
import InputCustomizado from './components/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from './TratadorErros';

class FormularioAutor extends Component {
  constructor() {
    super();
    this.state = {nome:'',email:'',senha:''};
    this.enviaForm = this.enviaForm.bind(this);
    this.setNome = this.setNome.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setSenha = this.setSenha.bind(this);
  }

  enviaForm(evento) {
    evento.preventDefault(); 

    $.ajax({
      url:'http://localhost:8000/api/data',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data:JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
      success:function(data) {
        PubSub.publish('atualiza-lista-autores',data);
        // limpa o form
        this.setState({nome:'',email:'',senha:''});
      }.bind(this),
      error:function(err) {
        new TratadorErros().publicaErros(err.responseJSON);
      },
      beforeSend: function() {
        PubSub.publish("limpa-erros",{});
      }
    })
  }

  setNome(evento) {
    this.setState({nome:evento.target.value})
  }

  setEmail(evento) {
    this.setState({email:evento.target.value})
  }

  setSenha(evento) {
    this.setState({senha:evento.target.value})
  }

  render() {
    return (
      <div className="pure-form pure-form-aligned">
        <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
          <InputCustomizado id="nome" type="text" name="nome" value="this.state.nome" onChange="this.setNome" label="Nome"/>
          <InputCustomizado id="email" type="text" name="email" value="this.state.email" onChange="this.setEmail" label="Email"/>
          <InputCustomizado id="senha" type="text" name="senha" value="this.state.senha" onChange="this.setSenha" label="Senha"/>

          <div className="pure-control-group">
            <label></label>
            <button type="submit" className="pure-button pure-button-primary">Gravar</button>
          </div>
        </form>
      </div>
    )
  }

}

class TatabelaAutores exnteds Compoent {

  render() {
    return(
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
              this.props.lista.map(function(autor){
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
    )
  }
}

export default class AutorBox extends Component {

  constructor() {
    super();
    this.state = {lista:[]};
  }

  componentDidMount() {
    $.ajax({
      url:'http://localhost:8000/api/teste',
      dataType:'json',
      success:function(data) {
        this.setState({lista:resposta})
      }.bind(this)
    })

    PubSub.subscribe('atualiza-lista-autores', function(topico,data) {
      this.setState({lista:data})
    }.bind(this))
  }

  render() {
    return (
      <div className="content" id="content">
            <FormularioAutor/>
            <TabelaAutores lista={this.state.lista} />
      </div>
    )
  }
}
````

*TratadorErros.js*
````js
import PubSub from 'pubsub-js';

export default class TratadorErros {

  publicaErros(erros) {
    for(var i=1; i<erros.erros.length; i++) {
      var erro = erros.errors[i];
      PubSub.publish('erro-validacao',erro);
    }
  }
}

````

*/components/InputCustomizado.js*
````js
import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class InputCustomizado extends Component {

  constructor() {
    super();
    this.state = {msgErro:''};
  }

  componentDidMount() {
    PubSub.subscribe('erro-validacao',function(topico,erro) {
      if(erro.field === this.props.name) {
        this.setState({msgErro:erro.defaultMessage })
      }
    }.bind(this));

    //LIMPA AS MENSAGENS
    PubSub.subscribe('limpa-erros',function(topico) {    
        this.setState({msgErro:'' });
    }.bind(this));
  }

  render() {
    return (
      <div className="pure-control-group">
        <label htmlFor="{this.props.id}">{this.props.label}</label>
        <input id="{this.props.id}" type="{this.props.type}" name="{this.props.name}" value={this.props.value} onChange={this.props.onChange} />
        <span className="error">{this.state.msgErro}</span>
      </div>
    );
  }
}


````
Vamos iniciar essa refatoração evoluindo o código com uma nova biblioteca o [PubSubJS](https://github.com/mroderick/PubSubJS) para desacoplar os components com o *npm install --save pubsub-js* e importamos com *import PubSub from 'pubsub-js';* e agora ao cadastrar um novo autor vamos fazer o seguinte *PubSub.publish('atualiza-lista-autores',novaListagem);* usando PubSub com o método publish passando um tópico e a data com agora em *AutorBox* podemos subscribe o mesmo tópico e toda vez que o form for enviando ele vai emitir uma chamada pra todos os subscribe e podemos fazer o seguinte trecho de código.
````js
PubSub.subscribe('atualiza-lista-autores', function(topico,data) {
  this.setState({lista:data})
})
````
O uso do PubSub é algo que agrega muito pois com ele temos o controle dos components pelo *estado* , quando fazemos *publish* estamos fazendo os components conversarem, parece muito com o design pattern Observe [ estudar + sobre isso ].

### Configuração do Router

Vamos aprender agora sobre a troca de telas, algo comum em qualquer aplicação se clicamos no menu opção 1 mostra uma view, se clicamos na opção 2 mostra outra view, e assim vai podemos usar o Box para ser a view, para isso vamos usar o [react-route](https://github.com/ReactTraining/react-router)
*npm install --save react-router* é o comando para instalar o react-router agora vamos para a prática.
*index.js*
````js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Router, Route} from 'react-router';

ReactDOM.render(
  (<Router>
    <Route path="/" component={App} />
    <Route path="/outrarota" />
    <Route path="/terceirarota"/>
  </Router>),
  document.getElementById('root')
);

````


*App.js*
````js
import React, { Component } from 'react';
import './css/pure-min.css';
import './css/side-menu.css';
import AutorBox from './Autor';

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
          <span></span>
        </a>
        
        <div id="menu">
          <div className="pure-menu">
            ....
          </div>
        </div>

        <div id="main">
          <div className="header">
            <h1>Cadastro de Autores</h1>
          </div>
          <AutorBox />
      </div>
    )
  }
}

export default App;
````

stop in 6.2 aplicando o history api.