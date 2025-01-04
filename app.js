var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoconnection = require('./config/mongoconnnection.json')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var joueurRouter = require('./routes/joueur');
var partieRouter = require('./routes/partie');

var app = express();
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/joueurs',joueurRouter);
app.use('/parties',partieRouter);

const Joueur = require('./models/joueur');
const Partie = require('./models/partie');


//mongodb connection
mongoose.connect(mongoconnection.url)
.then(()=>{console.log("Connected to the database!")})
.catch((err) => {console.log("Cannot connect to the database!", err)});
 //socket.io
 const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", async (socket) => {
  console.log("user connected");
  io.emit("userConnection", { message: "A user is connected!" });





//afficher les joueurs
socket.on("getJoueurs", async () => {
try{
  const joueurs = await Joueur.find();
socket.emit("getJoueurs",joueurs);
}catch{
socket.emit("error","Erreur de récupération de joueurs");
}
});

//ajouter partie avec id des 2 joueurs
socket.on("EnvoieId", async({nom,joueur1,joueur2})=>{
const partie = new Partie({nom,joueur1,joueur2});
await partie.save();
socket.emit("partieAjoutee",partie);
});
//afficher les parties
socket.on("getParties",async()=>{
try{
const parties = await Partie.find();
socket.emit("getParties",parties);
}catch{
socket.emit("erreur","Erreur");
}
});


  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user disconnect");
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(3001,() =>{ console.log("server run on 3001")});
module.exports = app;
