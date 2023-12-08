import {fastify} from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const database = new DatabaseMemory()
const server = fastify()

server.get('/', () => {
    return 'Rota padrão'
})

server.post('/sessão', (request, reply) => {
// Acessando dados do corpo da requisição
    const {nome, ano, duracao} = request.body
// Exibindo dados
// console.log(body)
   
    // return 'cadastrar'
    database.create({
        nome: nome,
        ano: ano,
        duracao: duracao
    })

    return reply.status(201).send
})

server.get('/sessão', (request) => {
    const search = request.query.search
    console.log(search)
    const sessões = database.list(search)
    //console.log(sessões)
    return sessões
})

server.put('/sessões/:id', (request, reply) => {
    const sessãoId = request.params.id
    const {nome, ano, duracao} = request.body
    const sessão = database.update(sessãoId, {
        nome: nome,
        ano: ano,
        duracao: duracao,
    })
    return reply.status(204).send()
})

server.delete('/sessões/:id', (request, reply) => {
    const sessãoId = request.params.id

    database.delete(sessãoId)

    return reply.status(204).send()
}) 

server.listen({
    port: 3333,
})