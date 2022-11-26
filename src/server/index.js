import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import servicesLoader from './services';
import db from './database';
import { graphqlUploadExpress } from 'graphql-upload';
import ApolloClient from './ssr/apollo';
import React from 'react';
import Graphbook from './ssr/';
import ReactDOM from 'react-dom/server';
import template from './ssr/template';
import { Helmet } from 'react-helmet';

const utils = {
  db,
};

const services = servicesLoader(utils);

const root = path.join(__dirname, '../../');

const app = express();
app.use(compress());
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "*.amazonaws.com"]
    }
  }));

  if(process.env.NODE_ENV === 'development') {
    console.log("NODE ENV dev mode check complete");
    const devMiddleware = require('webpack-dev-middleware');
    const hotMiddleware = require('webpack-hot-middleware');
    const webpack = require('webpack');
    const config = require('../../webpack.server.config');
    const compiler = webpack(config);
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
  }

  app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
}
app.use(cors());
app.use('/', express.static(path.join(root, 'dist/client')));
app.use('/uploads', express.static(path.join(root, '/public/uploads/')));
const serviceNames = Object.keys(services);

for (let i = 0; i < serviceNames.length; i += 1) {
  const name = serviceNames[i];
  if (name === 'graphql') {
    (async () => {
      await services[name].start();
      app.use(graphqlUploadExpress());
      services[name].applyMiddleware({ app });
    })();
  } else {
    app.use(`/${name}`, services[name]);
  }
}

app.get('*', (req, res) => {
  const client = ApolloClient(req);
  const context= {};
  const App = (<Graphbook client={client} location={req.url} context= {context}/>);
  const content = ReactDOM.renderToString(App);

  if (context.url) {
    console.log(context.url);
    res.redirect(301, context.url);
  } else {
    const head = Helmet.renderStatic();
    res.status(200);
    res.send(`<!doctype html>\n${template(content, head)}`);
    res.end();
  }

});

app.listen(8000, () => console.log('Listening on port 8000!'));