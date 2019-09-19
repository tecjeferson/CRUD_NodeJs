const express = require('express')
const pessoasController = require('../controllers/pessoas')

const pessoasRouter = ({
    connection
}) => {
    //definindo e chamando roteador
    const router = express.Router()

    //roteamento para o /pessoas
    //O Bind passa a connection atraves de uma função para pessoasController, passando uma dependencia
    router.get('/', pessoasController.index.bind(null, connection))

    router.get('/delete/:id', pessoasController.deleteOne.bind(null, connection))

    //não é preciso enviar nenhuma dependencia por isso não utilizamos o Bind
    router.get('/create', pessoasController.createForm)
    router.post('/create', pessoasController.createProcess.bind(null, connection))
    router.get('/update/:id', pessoasController.UpdateForm.bind(null, connection))
    router.post('/update/:id', pessoasController.UpdateProcess.bind(null, connection))

    return router
}


module.exports = pessoasRouter