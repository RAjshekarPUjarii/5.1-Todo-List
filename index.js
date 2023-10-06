import express, { Router } from "express"
import bodyParser from "body-parser";
import mongoose from "mongoose";
import {Items,List} from "./app.js";


const app = express();
const port = 3000;
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// default items
const item1 = new Items({
      name : "wake up at 5'clock.",
  });

  const item2 = new Items({
    name : "brush my teeth at 7'clock",
});

const item3= new Items({
    name : "break-fast",
});


const defaultItems = [item1,item2,item3];
  
app.get("/", (req, res) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    let currentDate = new Date();
    let dayOfMonth = currentDate.getDate();
    let dayOfWeek = currentDate.getDay();
    let dayName = daysOfWeek[dayOfWeek];
    const monthNumber = currentDate.getMonth();
    const monthName = months[monthNumber];


    // insert and find values
    Items.find()
    .then((items)=>{
           if(items.length === 0){
             Items.insertMany(defaultItems)
            .then((ans)=> console.log("succesfullu inserted!",ans))
            .catch(()=> "error while inserting")
            res.redirect("/")
           }
           else{
        res.render("index.ejs", {
            date: dayOfMonth,
            day: dayName,
            listItems: items,
            month:monthName,
            pageTitle: "To-Do List"
        });
    }
    })
    .catch(()=>"something went wrong")
    })

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const listType = req.body.list;
    if (listType === "work") {
        const newItem = new Items({
            name : itemName,
        })
        newItem.save()
        res.redirect("/");
    }
});

app.post("/delete",(req,res)=>{
    const itemId = req.body.checkbox
    Items.deleteOne({_id:itemId}).then(()=>"deleted")
    res.redirect("/")
})

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});