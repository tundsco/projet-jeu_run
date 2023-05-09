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
    let sql = "CREATE TABLE IF NOT EXISTS obstacles (id INT AUTO_INCREMENT PRIMARY KEY, sprite VARCHAR(50), damage INT(50), canJump BOOLEAN, speed INT(50))";
    con.query(sql, function (err, result){
        if (err) throw err;
        console.log("TABLE created");
    });
});