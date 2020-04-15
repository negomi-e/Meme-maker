const express = require('express');

const app = express();

const reqRouter = require('./router/reg');

app.set('view engine', 'hbs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/reg', reqRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('PORT 3000');
});
