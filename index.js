import express from "express"
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const listItem = [];
const workItem = [];

app.get("/", (req, res) => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    let currentDate = new Date();
    let dayOfMonth = currentDate.getDate();
    let dayOfWeek = currentDate.getDay();
    let dayName = daysOfWeek[dayOfWeek];
    const monthNumber = currentDate.getMonth();
    const monthName = months[monthNumber];

    res.render("index.ejs", {
        date: dayOfMonth,
        day: dayName,
        listItems: listItem,
        month:monthName,
        pageTitle: "To-Do List"
    });
});

app.get("/work", (req, res) => {
    res.render("index.ejs", {
        listItems: workItem,
        pageTitle: "Work List"
    });
});

app.post("/", (req, res) => {
    const newItem = req.body.newItem;
    const listType = req.body.list;

    if (listType === "work") {
        workItem.push(newItem);
        res.redirect("/work");
    } else {
        listItem.push(newItem);
        res.redirect("/");
    }
});

app.listen(3000, () => {
    console.log(`Listening on port ${port}`);
});