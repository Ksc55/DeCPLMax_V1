const express = require('express');

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

const integration = require('./integration');
app.use('/decplmax/v1', integration);

app.use((req, res, next) => {
    res.status(404).send({
      success : false,
      message : 'notFound',
      type : 'Decplmax V1',
      action: req.method+' '+req.originalUrl,
      data : [],
      meta:{}
    });
  });
  
  // error handler
  app.use((err, req, res, next) => {
    if(err && err.status==520){
      return next();
    }
    console.error({
      type : 'uncaughtException',
      err:err
    }, 'doeremi uncaughtException');
    res.status(520).send({
      success : false,
      message : 'somethingWentWrong',
      type : 'Decplmax V1',
      action: 'uncaughtException'
    });
  });
  
  
  module.exports = app;

