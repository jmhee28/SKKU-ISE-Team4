import express from 'express';
import ejs from "ejs"
import bodyParser from 'body-parser'
import session from 'express-session'
import fs from "fs"
import path from 'path';
import {m} from './router/main.js';

const __dirname = path.resolve();
const app = express();

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");
app.engine('html', ejs.renderFile);

const server = app.listen(3000, () => {
    console.log("server is running on localhost:3000");
});

app.use(express.static(__dirname + "/"));
app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({
 secret: '@#@$MYSIGN#@$#$',
 resave: false,
 saveUninitialized: true
}));


const router = m(app, fs);
