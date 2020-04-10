const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
/*
// valida id
function checkId(request, response, next) {
  
  const { id } = request.params;

  if (!isUuid(id)){
    return response.status(400).json({ error: "invalid repository ID" });
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "repository not found" });
  }

  return next();
}

// valida url
function checkUrl(request, response, next) {
  
  const { url } = request.body;

  const validUrl = 'https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs';

  if(url!==validUrl){
    return response.status(400).json({ error: "invalid repository url" });
  }

  return next();
}

app.use('/repositories/:id', checkId);
*/

app.get("/repositories", (request, response) => {

  return response.json(repositories);

});

// app.post("/repositories", checkUrl, (request, response) => {
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { 
    id:uuid(), 
    title, 
    url, 
    techs, 
    likes:0 
  }

  repositories.push(repository);

  return response.json(repository);
  
});

// app.put("/repositories/:id", checkUrl, (request, response) => {
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1){
    return response.status(400).json({error:"repository not found."});
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);  

});

app.delete("/repositories/:id", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex>=0){
    repositories.splice(repositoryIndex, 1);
  }else{
    return response.status(400).json({ error: "repository not found" });
  }

  return response.status(204).send();
  
});

app.post("/repositories/:id/like", (request, response) => {

  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex === -1) {
    return response.status(400).json({ error: "repository not found." });
  }

  repositories[repositoryIndex].likes++;

  return response.json(repositories[repositoryIndex]);  

});

module.exports = app;
