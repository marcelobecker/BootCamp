const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})
app.set('view engine', 'njk')
app.use(express.urlencoded({ extended: false }))

const checkMiddleware = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }
  return next()
}

app.get('/', (req, res) => {
  return res.render('age')
})

app.get('/major', checkMiddleware, (req, res) => {
  var msg = `Você é maior de idade e possui ${req.query.age} anos`
  return res.render('msg', { msg })
})

app.get('/minor', checkMiddleware, (req, res) => {
  var msg = `Você é menor de idade e possui ${req.query.age} anos`
  return res.render('msg', { msg })
})

app.post('/check', (req, res) => {
  if (req.body.age >= 18) {
    return res.redirect(`/major?age=${req.body.age}`)
  } else {
    return res.redirect(`/minor?age=${req.body.age}`)
  }
})

app.listen(3000)
