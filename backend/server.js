const mongoose = require("mongoose")


mongoose.connect("mongodb+srv://<DBconnectionstring>@cluster0.0s3bjaa.mongodb.net/todos")

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo: todo
}