const express = require('express');
const server = express();

const db = require('./database/db');

// config pasta public
server.use(express.static("public"))

server.use(express.urlencoded({  extended: true }))

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

server.post("/savepoint", (req, res) => {
  const { image, name, city, state, address, address2, items } = req.body;

  const query = `
                  INSERT INTO places (
                    image,
                    name,
                    address,
                    address2,
                    state,
                    city,                    
                    items
                  ) VALUES (
                    ?,?,?,?,?,?,?
                  );
                `;

  const values = [
    image, 
    name, 
    address, 
    address2,     
    state, 
    city, 
    items
  ]                    

  function afterInsertData(err) {    
    if (err) {
      console.log(err)      
      return res.send("Erro no cadastro!")      
    }
    
    console.log("Cadastrado com sucesso");    
    
    return res.render("create-point.html", { saved: true });
  };  
  
  db.run(query, values, afterInsertData );

})

server.get("/search-results", (req, res) => {
  const { search } = req.query;

  if (search == "") {
    return res.render("search-results.html", { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if (err) {
      return console.log(err)
    }    

    const total = rows.length
    
    return res.render("search-results.html", { places: rows, total })
  })  
})

// ligar server
server.listen('3333');