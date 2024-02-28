const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "whattodo",
  insecureAuth: true
});
app.get("/", (req, res) => { return res.json("From Backend") } );
app.get("/activities", (req, res) => { 
    const sql = "SELECT * FROM activities";
    db.query(sql, (err,data) => {
        // console.log(data)
        // console.log(err)
        if (err) return res.json(err);
        return res.json(data);
    })

    // return res.json("inside")
 } );

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
})

