const express = require('express');
const app = express();

const reqRouter = require('./router/reg');
const loginRouter = require('./router/login');
const homeRouter = require('./router/home');
const profileRouter = require('./router/profile');
const collectionRouter = require('./router/collectionn');
const createRouter = require('./router/create');
const aboutRouter = require('./router/about');
 
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/reg', reqRouter);
app.use('/login', loginRouter );
app.use('/home', homeRouter);
app.use('/collection', collectionRouter);
app.use('/create', createRouter);
app.use('/about', aboutRouter);
app.use('/profile', profileRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('PORT 3000');
});
