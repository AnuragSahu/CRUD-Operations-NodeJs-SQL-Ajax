"use strict";
// REQUIRES
const express = require('express');
const app = express();
const fs = require("fs");
const mysql = require('mysql');
const bodyParser = require('body-parser');


const msg404 = 'Not Found';

app.use('/js', express.static('client/js'))
app.use('/css', express.static('client/css'))
app.use('/img', express.static('client/img'))




app.get('/', function (req, res) {


  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    multipleStatements: true
  });

  const createDBAndTables = `CREATE DATABASE IF NOT EXISTS family;
  use family;
  CREATE TABLE IF NOT EXISTS relatives (
  identification varchar(10) NOT NULL,
  firstName varchar(20),
  lastName varchar(20),
  fatherName varchar(20),
  motherName varchar(20),
  siblings int(10),
  PRIMARY KEY (identification));
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('0', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('1', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('2', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('3', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('4', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('5', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('6', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('7', 'abcd','efgh','ijkl','mnop','45');
  INSERT IGNORE INTO relatives (identification, firstName, lastName, fatherName, motherName, siblings) values ('8', 'abcd','efgh','ijkl','mnop','45'); `;

  connection.connect();
  connection.query(createDBAndTables, function (error, results, fields) {
    if (error) {
      throw error;
    }

  });
  connection.end();

  let doc = fs.readFileSync('./client/html/index.html', "utf8");
  res.send(doc);
});


app.get('/get-users', function (req, res) {

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();
  connection.query('SELECT * FROM relatives', function (error, results, fields) {
    if (error) {
      throw error;
    }
    // console.log('Rows returned are: ', results);
    res.send({
      status: "success",
      rows: results
    });

  });
  connection.end();


});

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.post('/add-user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  console.log("firstName", req.body.firstName);
  console.log("lastName", req.body.lastName);
  console.log("fatherName", req.body.fatherName);
  console.log("gas vehicle", req.body.motherName);
  console.log("siblingss", req.body.siblings);

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('INSERT INTO relatives (identification, firstName,lastName, fatherName, motherName, siblings) values (?, ?, ?, ?, ?, ?)',
    [req.body.identification, req.body.firstName, req.body.lastName, req.body.fatherName, req.body.motherName, req.body.siblings],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded added."
      });

    });
  connection.end();

});

app.post('/update-motherName', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();
  // console.log(req.body.motherName);
  // console.log(req.body.id);
  connection.query('UPDATE relatives SET motherName = ? WHERE identification = ?',
    [req.body.motherName, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Called Mother Update');
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});
app.post('/update-firstName', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('UPDATE relatives SET firstName = ? WHERE identification = ?',
    [req.body.firstName, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

app.post('/update-lastName', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('UPDATE relatives SET lastName = ? WHERE identification = ?',
    [req.body.lastName, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

app.post('/update-userfatherName', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('UPDATE relatives SET fatherName = ? WHERE identification = ?',
    [req.body.fatherName, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

app.post('/update-usersiblings', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('UPDATE relatives SET siblings = ? WHERE identification = ?',
    [req.body.siblings, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      // console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});


app.post('/delete-user', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'family'
  });
  connection.connect();

  connection.query('DELETE FROM relatives WHERE identification = ?',
    [req.body.identification],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      //  console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded deleted."
      });

    });
  connection.end();

});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
  console.log('App listening on port ' + port + '!');
})