const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
console.log("TTTRESS",process.argv[2])
const url = `mongodb+srv://rodrigo95:${password}@cluster0.egfrhe1.mongodb.net/personApp?retryWrites=true&w=majority`

const schemaPersons = mongoose.Schema({
    name: String,
    number: Number
})

const Person = mongoose.model('Person',schemaPersons)

if(process.argv.length === 3){
    mongoose.connect(url).then(  result => {
        Person.find({}).then(persons => {
            persons.map( person => console.log(person))
        })
        return mongoose.connect.close()
    })
    .catch( err => {
        console.log('Not possible connect in server', err)
    })
}

if(process.argv.length === 5){
    mongoose.connect(url).then( result => {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        return person.save()
    }).then(() => {
        console.log(`added ${process.argv[3]} ${process.argv[4]} to phonebook`)
        return mongoose.connect.close()
    })
    .catch( err => {
        console.log('Not possible connect in server', err)
    })
}

