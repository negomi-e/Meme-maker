const express = require('express');
const mongoose = require('mongoose');
const app = express();
const session = require("express-session");
const { sessionapp } = require('./middleware/index')
const { isLoggedin } = require('./middleware/auth')
const reqRouter = require('./router/reg');
const fs = require('fs')


const connectionAddress = 'mongodb://localhost:27017/meme';
mongoose.connect(connectionAddress, { useNewUrlParser: true, useUnifiedTopology: true , useCreateIndex:true });
const db = mongoose.connections;
db.concat('error', console.error.bind(console, 'Error with MongoDB: '));

// app.use(cookieParser());


const hbs = require('hbs');
const loginRouter = require('./router/login');
const homeRouter = require('./router/home');
const profileRouter = require('./router/profile');
const collectionRouter = require('./router/collection');
const createRouter = require('./router/create');
const aboutRouter = require('./router/about');
const registerRouter = require('./router/reg')
const logoutRouter = require('./router/logout')


const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

sessionapp(app);
app.use(isLoggedin);
// app.use(
//   session({
//     key: "user_sid",
//     secret: "anything here",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 24 * 60 * 60 * 1000
//     }
//   })
// );

// HBS PARTIALS AND TEMPLATES
hbs.registerPartials(`${__dirname}/views/partials`)

hbs.registerHelper('template', (templateName) => {

  const data = fs.readFileSync(`./views/partials/${templateName}.hbs`, 'utf8');
  return data;
});



app.use('/reg', reqRouter);

app.use('/login', loginRouter);
app.use('/', homeRouter);
app.use('/collection', collectionRouter);
app.use('/create', createRouter);
app.use('/about', aboutRouter);
app.use('/profile', profileRouter);
app.use('/register', registerRouter);
app.use('/logout', logoutRouter);





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('PORT 3000');
});
