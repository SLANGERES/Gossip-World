import express from 'express';
import cookieParser from 'cookie-parser';
import ejs from 'ejs';
import path from 'path';
import { VertexAI } from "@langchain/google-vertexai";
import http from 'http';

import { Router } from './Route/user.js'; // Correct named import

import { restrictToLoginUserOnly } from './middleware/auth.js';
import { mongooseConnection } from './mongooseConnection.js';
import { Server } from 'socket.io';

const app = express();

const model = new VertexAI({
    temperature: 0.7,
});

async function aidata(prompt) {
    const Aires = await model.invoke(prompt);
    return Aires;
}


function replaceAsterisksWithSpaces(text) {
    return text.replace(/\*\*/g, ' ');  // Replace all occurrences of ** with a space
  }

mongooseConnection("mongodb://127.0.0.1:27017/chat-App")
    .then(() => console.log(`Connection Established`))
    .catch((error) => console.error("Unable to connect database", error));

const port = 9800;

function truncateResponse(responseText, maxLength = 400) {
    // If the response is too long, truncate it and append a 'Read more' message
    if (responseText.length > maxLength) {
      return responseText.substring(0, maxLength) + '... [Read more]';
    }
    return responseText;  // If not too long, return the original response
  }

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

const server = http.createServer(app);
const io = new Server(server);

app.use('/user', Router);

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));

app.use(express.static(path.resolve('./views')));

app.get('/chatroom', restrictToLoginUserOnly, (req, res) => {
    return res.render('index', { username: req.username });
});

app.get('/', (req, res) => res.render('Homepage'));
app.get('/ai-chat', (req, res) => res.render('chatAI'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/video-call', (req, res) => res.render('video'));
app.get('/login', (req, res) => res.render('login'));

io.on('connection', (socket) => {
    console.log('User joined');
    socket.on('join', (username) => console.log(`User ${username} joined the chat`));

    socket.on('chat message', (msg) => {
        io.emit('chat message', { username: msg.username, message: msg.message });
    });

    socket.on('offer', (offer) => {
        console.log('Offer received:', offer);
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
        console.log('Answer received:', answer);
        socket.broadcast.emit('answer', answer);
    });

    socket.on('ice-candidate', (candidate) => {
        console.log('ICE candidate received:', candidate);
        socket.broadcast.emit('ice-candidate', candidate);
    });

    socket.on('message', async (message) => {
        console.log('Received message:', message);

        const aiMsg = await aidata(message);
        console.log(aiMsg)
        const mainres = truncateResponse(aiMsg);
        const finalResponse = replaceAsterisksWithSpaces(mainres)
        socket.emit('response', { message: `AI says: ${finalResponse}` });
    });

    socket.on('disconnect', () => console.log('A user disconnected: ' + socket.id));
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
