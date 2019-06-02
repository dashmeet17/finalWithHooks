const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var env = process.env.NODE_ENV || 'dev';
var config = require('./server.config')[env];

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

var mongoose = require('mongoose');
var Transaction = require('./models/transaction');

mongoose.connect(config.dbURL, function(err){
  if(err){
    console.log('Error connecting to: '+ config.dbURL)
  }
  else{
    console.log('Connected to: '+ config.dbURL)
  }
})

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

console.log("yes connected to mlab");

app.get('/customer-transactions', function (req, res) {

  // get all the transactions
  Transaction.find({}, function(err, trxns) {
    if (err) throw err;

    console.log('Transactions from db : '+trxns);
    res.status(200).json(trxns);
  });
})

//create new transaction
app.post('/add-transaction', function (req, res) {
  var newTransaction = Transaction({
    transactionID: 'TRXN_'+Math.random(),
    username: req.body.username,
    paymentMode: req.body.paymentMode,
    amount: req.body.amount
  });

  // save the transaction
  newTransaction.save(function(err) {
    if (err) throw err;

    console.log('newTransaction created!');
    res.sendStatus(200)
  });
});

app.listen(port, function () {
  console.log('React-Redux Server app is running at localhost:' + port)
})
