import React, { Component } from 'react';
import logo from './logo.svg';
import './css/pure.css';
import './css/side-menu.css';
import './App.css';

class App extends Component {

  render() {
    return (
      <div id="layout">
        <a href="#menu" id="menuLink" className="menu-link">
            <span></span>
        </a>
        <div id="menu">
            <div className="pure-menu">
                <a className="pure-menu-heading" href="#">Company</a>

                <ul className="pure-menu-list">
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Principal</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Mural</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Avisos</a></li>
                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Agenda</a></li>

                    <li className="pure-menu-item">
                        <a href="#" className="pure-menu-link">Configuração</a>
                    </li>

                    <li className="pure-menu-item"><a href="#" className="pure-menu-link">Sobre nós</a></li>
                </ul>
            </div>
        </div>

        <div id="main">
          <div className="header">
                <h1>Titulo da Página</h1>
                <h2>Aqui fica um sub titulo</h2>
            </div>
            <div className="content">
                
            </div>
        </div>
      </div>
    );
  }
}

export default App;
