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

  const createDBAndTables = `CREATE DATABASE IF NOT EXISTS assignment;
  use assignment;
  CREATE TABLE IF NOT EXISTS appUser (
  userID varchar(15) NOT NULL,
  userName varchar(20),
  location varchar(30),
  gasBool varchar(30),
  emission int(10),
  PRIMARY KEY (userID));
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('mhav1', 'madhav', 'vancouver', 'no', '23');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('slando', 'sam', 'burnaby', 'yes', '27');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('jryue', 'john', 'surrey', 'no', '12');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('hsaini123', 'harleen', 'vancouver', 'no', '25');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('aFerg101', 'aaron', 'richmond', 'yes', '32');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('canucksfan7', 'dustin', 'north vancouer', 'yes', '23');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('ecoHenry', 'henry', 'vanouver', 'yes', '14');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('scottVan1996', 'scott', 'downtown', 'no', '87');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('smithy12', 'smith', 'burnaby', 'no', '27');
  INSERT IGNORE INTO appUser (userID, userName, location, gasBool, emission) values ('thisJustIn', 'justin', 'surrey', 'yes', '23');`;

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
    database: 'assignment'
  });
  connection.connect();
  connection.query('SELECT * FROM appUser', function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log('Rows returned are: ', results);
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

  console.log("username", req.body.userName);
  console.log("location", req.body.location);
  console.log("gas vehicle", req.body.gasBool);
  console.log("emissions", req.body.emission);

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'assignment'
  });
  connection.connect();

  connection.query('INSERT INTO appUser (userID, userName, location, gasBool, emission) values (?, ?, ?, ?, ?)',
    [req.body.userID, req.body.userName, req.body.location, req.body.gasBool, req.body.emission],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded added."
      });

    });
  connection.end();

});

app.post('/update-userBool', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'assignment'
  });
  connection.connect();

  connection.query('UPDATE appUser SET gasBool = ? WHERE userID = ?',
    [req.body.gasBool, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});
app.post('/update-userName', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'assignment'
  });
  connection.connect();

  connection.query('UPDATE appUser SET userName = ? WHERE userID = ?',
    [req.body.userName, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

app.post('/update-userLocation', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'assignment'
  });
  connection.connect();

  connection.query('UPDATE appUser SET location = ? WHERE userID = ?',
    [req.body.location, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('Rows returned are: ', results);
      res.send({
        status: "success",
        msg: "Recorded updated."
      });

    });
  connection.end();

});

app.post('/update-userEmission', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Password@123',
    database: 'assignment'
  });
  connection.connect();

  connection.query('UPDATE appUser SET emission = ? WHERE userID = ?',
    [req.body.emission, req.body.id],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
      console.log('Rows returned are: ', results);
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
    database: 'assignment'
  });
  connection.connect();

  connection.query('DELETE FROM appUser WHERE userID = ?',
    [req.body.userID],
    function (error, results, fields) {
      if (error) {
        throw error;
      }
       console.log('Rows returned are: ', results);
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