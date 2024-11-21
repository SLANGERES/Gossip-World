import express from 'express';
import { Sign_up, Login } from '../controller/userController.js'; // Adjust the path as necessary

const Router = express.Router();

// Define your routes
Router.post('/', Sign_up);
Router.post('/Login', Login);

export { Router }; // Export Router as a named export
