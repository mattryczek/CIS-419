import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';

const app = express();

app.use(compress());
app.use(helmet());
app.use(cors());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:", "*.amazonaws.com"]
  }
}));

app.use(helmet.referrerPolicy({ policy: 'same-origin' }));

var randPage = 0;

app.get('/', function (req, res, next) {
    randPage = Math.floor(Math.random() * (10 - 1) + 1)
    console.log('Generated: ' + randPage);
    next();
  }, function (req, res) {
    res.send('Welcome to page ' + randPage + '!');
  });

  app.get('/quine', function (req, res) {
    res.send('app.get(\'/quine\', function (req, res) {     res.send(\'\');   });');
  });

app.listen(8000, () => console.log('Listening on port 8000!'));