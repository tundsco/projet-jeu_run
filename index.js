const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccesStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);
// Shows a "hello world" on the default link
app.get("/", function (req, res){
    res.send("Hello World");
});

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.statusMessage, err.stack);
    res.status(statusCode).json({ message: err.message});
    return;
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
var server = app.listen(8081, function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example server listening at http://%s:%s", host, port);
});

// let the "public" folder be seen by everyone, this is where the game logic should be placed
app.use(express.static("public"));