const express = require('express');
const app = express();
const port = 3000;
let goods = [
    {id: 1, name: 'фен', price:400},
    {id: 2, name: 'отвертка', price:30},
    {id: 3, name: 'шахматы', price:140}
]
app.use(express.json());
app.get('/',(req,res) =>{ res.send('Страница товаров')});

app.post('/goods', (req,res)=> {
    const {name, price} = req.body;
    const newGoods = {
        id: Date.now(),
        name,
        price
    };
    goods.push(newGoods);
    res.status(201).json(newGoods);
});
app.get('/goods', (req,res)=>{
    res.send(JSON.stringify(goods));
});
app.get('/goods/:id', (req,res) => {
    let item = goods.find(u => u.id == req.params.id);
    res.send(JSON.stringify(item));
});
app.patch('/goods/:id', (req,res) =>
{
    const item = goods.find(u => u.id == req.params.id);
    const {name, price} = req.body;
    if (name !== undefined) item.name = name;
    if (price !== undefined) item.price = price;
    res.json(item);  
});
app.delete('/goods/:id', (req,res) =>{
    goods = goods.filter(u => u.id != req.params.id);
    res.send('Ok');
});
app.listen(port,() =>{
    console.log('Сервер запущен на порту 3000 локального хоста.')
});