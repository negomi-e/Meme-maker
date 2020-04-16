const express = require('express');

const app = express();

const reqRouter = require('./router/reg');
const hbs = require('hbs')

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

// HBS PARTIALS AND TEMPLATES
hbs.registerPartials(`${__dirname}/public/views/partials`)
hbs.registerHelper('template', (templateName) => {
  const data = fs.readFileSync(`./public/views/partials/${templateName}.hbs`, 'utf8');
  return data;
});

app.use('/reg', reqRouter);

app.get('/', (req, res) => {
  res.render('index')
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('PORT 3000');
});
