const express = require('express');
const { createTodo, updateTodo } = require('./types');
const { todo } = require('./server');
const cors = require("cors");
const app = express()
const port = 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

app.post("/todo", async (req, res) => {
    const craetePayload = req.body;
    const parsedPayload = createTodo.safeParse(craetePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }
    // post in mongoodb
    await todo.create({
        title: craetePayload.title,
        description: craetePayload.description,
        completed: false
    })
    res.json({
        msg: "Todo Created"
    })
})

app.get("/todos", async (req, res) => {
    const todos = await todo.find({})

    res.json({
        todos
    })
})

app.put("/completed", async (req, res) => {
    const updatePayload = req.body;

    const parsedPayload = updateTodo.safeParse(updatePayload);
    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs",
        })
        return;
    }

    try {
        const existingTodo = await todo.findById(req.body.id);
        if (!existingTodo) {
            return res.status(404).json({ msg: "Todo not found" });
        }
        // const updatedCompleted = () => {
        //     if (!existingTodo.completed)
        //         return true;
        //     else {
        //         return false;
        //     }
        // }
        const updatedCompleted = !existingTodo.completed;
        const updatedTodo = await todo.findByIdAndUpdate(
            req.body.id,
            {
                completed: updatedCompleted,
                new: true
            }
        );

        res.json({
            msg: "Todo status updated",
            todo: updatedTodo
        })
    }
    catch (error) {
        res.status(500).json({ msg: " server error, update failed" })
    }
})

app.listen(port);
