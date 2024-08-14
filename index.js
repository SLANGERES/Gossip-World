const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const ejs = require('ejs');
const path = require('path');
const http = require('http');
const Route = require('./Route/user');
const { restrictToLoginUserOnly } = require('./middleware/auth');
const { mongooseConnection } = require('./mongooseConnection');

const app = express();

mongooseConnection("mongodb://127.0.0.1:27017/chat-App")
    .then(() => { console.log(`Connection Established`) })
    .catch((error) => { console.log("Unable to connect database") });

const port = 9800;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// HTTP Server uses Express as a parent 
const server = http.createServer(app);

// Socket.IO setup
const io = require('socket.io')(server);

app.use('/user', Route);

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

// Serve static files
app.use(express.static(path.resolve('./views')));

app.get('/', restrictToLoginUserOnly, (req, res) => {
    return res.render('index', { username: req.username });
});

app.get('/signup', (req, res) => {
    return res.render('signup');
});

app.get('/login', (req, res) => {
    return res.render('login');
});

io.on('connection', (socket) => {
    console.log('User joined');
    socket.on('join', (username) => {
        console.log(`User ${username} joined the chat`);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', { username: msg.username, message: msg.message });
    });
});

server.listen(port, () => {
    console.log(`Server started on ${port}`);
});
