const express = require('express');
const server = express();

// config pasta public
server.use(express.static("public"))

// utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
  express: server,
  noCache: true
})

// config caminhos
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  return res.render("create-point.html")
})

server.get("/search-results", (req, res) => {
  return res.render("search-results.html")
})

// ligar server
server.listen('3333');