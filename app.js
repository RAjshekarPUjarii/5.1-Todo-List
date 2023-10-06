import mongoose, { mongo } from "mongoose";

//connect to databse
mongoose.connect('mongodb://localhost:27017/TodoListDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schema
const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        
    }
});

// model 
export const Items = mongoose.model('Items', itemSchema);

// routers schema
const listSchema = new mongoose.Schema({
    name : String,
    items : [itemSchema],
})
export const List = mongoose.model("List",listSchema);


