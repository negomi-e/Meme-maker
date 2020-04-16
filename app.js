const express = require('express');
const app = express();

const reqRouter = require('./router/reg');

const hbs = require('hbs')
const loginRouter = require('./router/login');
const homeRouter = require('./router/home');
const profileRouter = require('./router/profile');
const collectionRouter = require('./router/collection');
const createRouter = require('./router/create');
const aboutRouter = require('./router/about');
 
const path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// HBS PARTIALS AND TEMPLATES
hbs.registerPartials(`${__dirname}/views/partials`)
hbs.registerHelper('template', (templateName) => {
  const data = fs.readFileSync(`./public/views/partials/${templateName}.hbs`, 'utf8');
  return data;
});

app.use('/reg', reqRouter);

app.get('/', (req, res) => {
  res.render('index')
})
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
