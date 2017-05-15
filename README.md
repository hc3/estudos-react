# estudos-react
material de estudos sobre react

iniciando o projeto com webpack

1º -> inciar o projeto npm init
2º -> criar o arquivo webpack.config.js
<b> webpack.config.js </b>
````js
'use strict'

const path = require('path')

module.exports = {
    entry : path.join(__dirname, 'src', 'index'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
````
3º -> instalar webpack global - npm install -g webpack
4º -> criar index.html
````html
<!DOCTYPE html>
<html lang="en">
    <head>
        <title></title>
        <meta charset="UTF-8">
    </head>
    <body>
        
        <script src="/dist/bindle.js"></script>
    </body>
</html>
````
5º -> instalar o webpack dev server - npm install --save-dev webpack-dev-server
6º -> 