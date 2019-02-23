"use strict";
const express = require("express");
const fs = require("fs");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const app = express();

let todo_items = null;

app.use(express.static("dist"));
app.use(bodyParser.text()); //bodyParser for reading req object in the route handlers

//sends html file on inital load
app.get("/", (req, res) => {
	res.send("public/index.html");
});

//retrieves all items from the todo_items array
app.get("/api/getdata", (req, res) => {
	res.json(todo_items);
});

//handler for adding new items to the todo_items array
app.post("/api/postdata", (req, res) => {
	const hash = crypto.createHash("md4");
	todo_items.push({[hash.update(req.body).digest("hex")]: req.body}); //adds a new object with unique key (md4 key)
});

app.put("/api/deleteitem", (req, res) => {
	const hash = crypto.createHash("md4").update(req.body).digest("hex");
	let i;
	for(i = 0; i < todo_items.length; i++) {
		if(Object.keys(todo_items[i])[0] == hash) {
			 todo_items.splice(i, 1);
 		}
	}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
	res.end();
})

//if server is closed using Ctrl+C the todo_items array is being saved
process.on("SIGINT", () => {
	fs.writeFileSync("src/items.json", JSON.stringify(todo_items), err => {
		if(err) console.log(err);
		console.log("Data saved and shutting down...");
	});
});

//starts server and reads content off the items.json file and writes it to the todo_items object
app.listen(8081, () => {
	console.log("Server listening on port 8081");
	fs.readFile("src/items.json", (err, data) => {
		todo_items = JSON.parse(data);
	})
});
