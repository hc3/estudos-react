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


### Estado do Component 3.1