const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('<h3>Seeing if this works</h3>');
});

server.get("/api/accounts", (req, res) => {
  db.select("*").from("accounts")
    .then(accounts => {
      res.status(200).json(accounts)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Something went wrong"})
    })
})

server.get("/api/accounts/:id", (req, res) => {
  db.select("*").from("accounts").where("id", req.params.id)
    .then(account => {
      res.status(200).json(account)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Something went wrong"})
    })
})

server.post("/api/accounts", (req, res) => {
  db("accounts").insert(req.body)
    .then(bool => {
      console.log(bool)
      res.status(201).json({message: "New account created"})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Something went wrong"})
    })
})

server.put("/api/accounts/:id", (req, res) => {
  db("accounts").where({id: req.params.id}).update(req.body)
    .then(bool => {
      console.log(bool)
      res.status(202).json({message: `Account ${req.params.id} has been updated`})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json(error)
    })
})

server.delete("/api/accounts/:id", (req, res) => {
  db("accounts").where("id", req.params.id).del()
    .then(bool => {
      console.log(bool)
      res.status(204).json({message: `entry with id ${req.params.id} was deleted`})
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({message: "Something went wrong"})
    })
})

// server.put("/api/accounts", (req, res) => {

// })

module.exports = server;