const express = require('express');

const actionsRouter = require('./actionsRouter');
const projectsRouter = require('./projectsRouter');

const server = express();

server.use(express.json());
server.use(logger);

server.use('/actions', actionsRouter);
server.use('/projects', projectsRouter);

server.get("/", (req, res) => {
	res.send('T e s t i n g !');
});

 function logger(req, res, next){
 	console.log(`${new Date()}\n${req.method} request to ${req.originalUrl}\n`)
 	next();
 }

module.exports = server;