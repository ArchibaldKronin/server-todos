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

let categories = [{
    id: 1,
    title: 'Нет категории',
    description: 'Default description'
}]

app.use(cors());

app.use(express.json());

app.get('/categories', (req, res) => {
    res.status(200).json({ categories });
})

app.post('/categories/create', (req, res) => {
    categories.push({ ...req.body, id: Date.now() });

    res.status(200).send(`Добавили эту категорию ${JSON.stringify(req.body, null, 4)}`);
})

app.put('/categories/update', (req, res) => {
    console.log({ categories });

    const requestedCategory = req.body;

    categories = categories.map((c) => (c.id === requestedCategory.id ? requestedCategory : c));

    console.log({ categories });

    res.status(200).send(`Поменяли! ${JSON.stringify(req.body, null, 4)}`);
})

app.delete('/categories/delete/:id', (req, res) => {
    const deletingCategoryId = req.params.id;

    categories = categories.filter(c => c.id !== +deletingCategoryId);

    res.status(200).send(`Удалили ${deletingCategoryId} эту категорию`)
})

app.put('/todos/updateTodosCategoryToDefault', (req, res) => {
    const idCategoryToChangeToDefault = req.body.id;

    todos = todos.map(t => {
        if (t.categoryId == idCategoryToChangeToDefault)
            t.categoryId = 1;
        return t;
    })

    res.status(200).json({ todos });
})

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

    res.status(200).send(`Поменяли! ${JSON.stringify(req.body, null, 4)}`);
})

app.delete('/todos/delete/:id', (req, res) => {
    const deletingTodoId = req.params.id;

    todos = todos.filter(t => t.id !== +deletingTodoId);

    res.status(200).send(`Удалили ${deletingTodoId} эту задачу`)
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})