import dotenv from 'dotenv';
import express from "express";
import bodyParser from "body-parser";
import users from "./routes/users"

dotenv.config()
const port = 3000

const app = express();

app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (req, res) => {
    // res.json({ "hello": "world" })
    res.render('add')
})

app.use('/', users );
app.use('/api', users );

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})