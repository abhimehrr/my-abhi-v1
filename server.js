// Express
const express = require('express')
const app = express()

// Static
app.use('/static', express.static('static'))

// View Engine
require('ejs')
app.use(require('express-ejs-layouts'))

app.set('view engine', 'ejs')
app.set('layout', 'main')


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended : true }))



// Routes
app.get('/', (req, res) => {
    return res.render('components/index', { title : 'Home' })
})

app.get('/project', (req, res) => {
    return res.render('components/project', { title : 'Project' })
})

app.get('/contact', (req, res) => {
    return res.render('components/contact', { title : 'Contact' })
})

// Send Mail
const sendMail = require('./controllers/send-mail')

// Client IP
const getIP = require('request-ip')

app.post('/contact', (req, res) => {
    const ip = getIP.getClientIp(req)

    const { name, email, mobile, subject, message } = req.body

    const body = `
        <h1>Contact | myAbhi</h1>
        <hr>
        <p>Name : ${name}</p>
        <p>Email : ${email}</p>
        <p>Mobile : ${mobile}</p>
        <p>Subject : ${subject}</p>
        <p>Message : ${message}</p>
        <hr>
        <p>IP : ${ip}</p>
        <p>Date : ${Date()}</p>
        <hr>
    `

    sendMail({email, subject, body})
    return res.send('Email sent!')
})



// 404 NOT FOUND!!!
app.get('*', (req, res) => {
    return res.render('404', { title: '404', url: req.originalUrl })
})


app.listen(5000, () => console.log('Server running...'))