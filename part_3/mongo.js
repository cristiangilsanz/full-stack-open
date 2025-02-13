const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const [, , password, name, number] = process.argv

const url = `mongodb+srv://fullstack:${password}@cluster0.lxxtq.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'The name must be at least 3 characters long'],
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: [8, 'The number must be at least 8 characters long'],
    required: true,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number. Use format XX-XXXXXXX or XXX-XXXXXXXX`
    }
  },
})

const Person = mongoose.model('Person', personSchema, 'people')

const person = new Person({
  name,
  number,
})

if (process.argv.length === 3) {
  Person.find({}).then((persons) => {
    console.log('phonebook:')
    persons.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(() => {
    mongoose.connection.close()
    console.log(`added ${name} number ${number} to phonebook`)
  })
}