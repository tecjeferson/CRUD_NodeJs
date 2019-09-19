const express = require('express')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000
const mysql = require('mysql')
const bodyParser = require('body-parser')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'cadastro'
})

const dependencies = {
    connection
}

//importando o arquivo Pessoas.js
const pessoas = require('./routes/pessoas')
app.use(bodyParser.urlencoded({
    extended: false
}))


//roteamento para o /
app.get('/', (req, res) => {
    res.render('home')
})

//Utiliza o roteamento do pessoas.js
app.use('/pessoas', pessoas(dependencies))

//reconhecer arquivos estaticos
app.use(express.static('public'))

//caminho absoluto e view engine
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//connectar ao banco de dados
connection.connect((err) => {
    //chama o banco
    if (err) {
        console.log("Erro ao conectar ao banco de dados" + err)
    } else {
        console.log('Connectado ao banco de dados')

    }

    //inicia o express
    app.listen(port, (err) => {
        if (err) {
            console.log("Erro ao executar o express " + err)
        }
        console.log('Server Running at Port: ' + port)
    })
})