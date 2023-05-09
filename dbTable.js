let mysql = require("mysql");
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbtest"
});
con.connect(function (err){
    if (err) throw err;
    console.log("Connected!");
    // if the table obstacles does not exists, create it
    let sql = "CREATE TABLE IF NOT EXISTS obstacles (id INT AUTO_INCREMENT PRIMARY KEY, sprite VARCHAR(50), damage INT, canJump BOOLEAN, speed INT)";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("TABLE created");
    });
    let sql2 = "CREATE TABLE IF NOT EXISTS score (id INT AUTO_INCREMENT PRIMARY KEY, score INT, time TIME, name VARCHAR(50))";
    con.query(sql2, function (err, result){
        if (err) throw err;
        console.log("TABLE score created");
    });
    let sql3 = "CREATE TABLE IF NOT EXISTS objects (id INT AUTO_INCREMENT PRIMARY KEY, score INT, heal INT, JumpBoot BOOL)";
    con.query(sql3, function (err, result){
        if (err) throw err;
        console.log("TABLE objects created");
    });
});

