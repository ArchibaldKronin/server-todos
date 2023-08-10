const express = require('express')
const cors = require('cors');

const app = express()
const port = 7000

let todos = [{
    id: 1,
    title: 'Example task',
    description: "Example task's description",
    categoryId: 1,
}]

const categories = [{
    id: 1,
    title: 'Нет категории',
    description: 'Default description'
}]

app.use(cors());

app.use(express.json());

app.get('/todos', (req, res) => {
    res.status(200).json({ todos });
});

app.post('/todos/create', (req, res) => {
    todos.push({ ...req.body, id: Date.now() });

    res.status(200).send(`Добавили эту задачу ${JSON.stringify(req.body, null, 4)}`);
})

app.put('/todos/update', (req, res) => {
    const requestedTodo = req.body;

    todos = todos.map((t) => (t.id === requestedTodo.id ? requestedTodo : t));

    console.log({ todos });

    res.status(200).send('Поменяли!');
})

app.delete('/todos/delete/:id', (req, res) => {
    const deletingTodoId = req.params.id;

    todos = todos.filter(t => t.id !== +deletingTodoId);

    res.status(200).send(`Удалили ${deletingTodoId} эту задачу`)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})