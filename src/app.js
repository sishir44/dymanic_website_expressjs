const express = require("express");
const path = require("path");
const hbs = require("hbs");

require("./db/conn");
const User = require("./models/usermessage");
const app  = express();
const port = process.env.PORT || 4000;

// setting the path
const staticpath = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

// middleware
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));

app.use(express.urlencoded({ extended:false }));
app.use(express.static(staticpath));
app.set('view engine', 'hbs');
app.set("views", viewspath);
hbs.registerPartials(partialspath);

// routing
app.get("/", (req,res) => {
    res.render("index");
})

app.post("/contact", async(req, res) => {
    try {
        //request.send(req.body);
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(port, ()=> {
    console.log(`server is running at port number ${port}`);
})