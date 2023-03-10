const express = require("express")
//const morgan = require("morgan")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
//morgan.token('data', function (request, response){ return request.body.name ? JSON.stringify(request.body) : '-'})
//app.use(morgan(':method :url :status :total-time[3] ms :data'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/api/persons', (require,response) => {
    response.json(persons)
})

app.get('/info', (request,response) => {
    const personsCount = persons.length
    const date = new Date()
    //response.set({ 'content-type': 'charset=utf-8' })
    response.end(
        `Phonebook has info for ${personsCount} people
        
${date}`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)

    const person = persons.find((p) => p.id === id)

    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find((p) => p.id === id)

    if(person){
        persons = persons.filter((p) => p.id !== id)
        response.status(204).end()
    }else{
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(typeof body.name !== "string" ||  typeof body.number !== "string"){
        return response.status(400).json({error: 'bad request'})
    }

    if(persons.find( p => p.name === body.name)){
        return response.status(400).json({error: 'name must be unique'})
    }

    person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * 100000)
    }

    persons.push(person)

    response.json(person)
})

const PORT = process.env.PORT || 80

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})