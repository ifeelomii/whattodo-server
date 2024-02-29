const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "whattodo",
  insecureAuth: true
});
app.get("/", (req, res) => { return res.json("Connected to Backend") } );
app.get("/activities", (req, res) => { 
    const sql = "SELECT * FROM activities";
    db.query(sql, (err,data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post("/activities", (req, res) => {
    const {activity}  = req.body; 
    // return res.json(activity)
    // console.log(activity)
  const sql = `INSERT INTO activities (activity) VALUES (?)`;
  db.query(sql, [activity], (err, result) => {
    if (err) {
      res
        .status(500)
        .json({ error: "Failed to insert activity into database" });
      throw err;
    }
    console.log("Activity inserted successfully");
    res.status(200).json({ message: "Activity inserted successfully" });
  });
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
})

