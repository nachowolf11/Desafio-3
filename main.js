const express = require('express');
const fs = require('fs')
const { send } = require('process');

const app = express()

const PORT = 8080

let productos = []

let productoRandom = {}

async function obtenerProd (){
    try {
        const arr = await fs.promises.readFile('productos.txt', 'utf-8');
        const arrParsed = JSON.parse(arr);
        return arrParsed;
    } catch (err) {
        console.log(err);
    }
}

// Math.floor(Math.random()*productos.length)
(async function(){
    productos = await obtenerProd()
    productoRandom = productos[Math.floor(Math.random()*productos.length)]
})();

const server = app.listen(PORT,() => {
    console.log(`Escuchando puerto ${server.address().port}`);
})

app.get('/productos',(req,res) => {
    res.send(productos)
})

app.get('/productoRandom',(req,res) => {
    res.send(productoRandom)
})