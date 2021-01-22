const mysql = require("mysql");
const util = require('util'); 
var connection; 
if(process.env.JAWSDB_URL){
  connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else {
   connection = mysql.createConnection({
      host: MYSQL_HOST,
      port: 3306,
      user: MYSQL_USER,
      password: MYSQL_PW,
      database: "gift_tracker_db"
    });
}
   connection.connect(function() {
      console.log("connected on id " + connection.threadId)
  });
   module.exports = connection