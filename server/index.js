//set up espress server
const express = require('express');
//import mongoose library
const mongoose = require('mongoose');
const cors = require('cors');
//initializes express server
const app = express();

const TodoModel = require("./models/Todo");

//helps recieve info from frontend in json format
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://newuser:dagon8@cluster0.1slmc.mongodb.net/Todo?retryWrites=true&w=majority", 
    {
        useNewUrlParser: true,
    }
);

app.post('/insert', async (req, res) => {

    const todoName = req.body.todoName;
    const todo = new TodoModel({todoName: todoName});

    try {
        await todo.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err);
    }
});

app.get('/read', async (req, res) => {

    TodoModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }

        res.send(result);
    });
});

app.put('/update', async (req, res) => {

    const newTodoName = req.body.newTodoName;
    const id = req.body.id;

    try {
        await TodoModel.findById(id, (err, updatedTodo) => {
            updatedTodo.todoName = newTodoName;
            updatedTodo.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await TodoModel.findByIdAndDelete(id).exec();
    res.send("deleted");
});

app.listen(3001, ()=> {
    console.log("Server is running on port 3001");
});
  
