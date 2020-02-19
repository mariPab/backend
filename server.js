const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname + '/public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('.hbs', hbs({ extname: 'hbs', layoutsDir: './views/layouts', defaultLayout: 'main' }));
app.set('view engine', '.hbs');

app.get('/error.jpeg', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/error.jpeg'));
  });

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/style.css'));
});

app.get('/dark.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/dark.css'));
});

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about.hbs', { layout: 'dark' });
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.post('/contact/send-message', (req, res) => {
  const { author, sender, title, message } = req.body;
  if(author && sender && title && message) {
    res.render('contact', { isSent: true });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.get('/info', (req, res) => {
  res.render('info');
});

app.get('/history', (req, res, next) => {
  res.render('history');
});

app.get('/hello/:name', (req, res) => {
  res.render('hello', { name: req.params.name });
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});