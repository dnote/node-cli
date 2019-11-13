const uuidv4 = require("uuid/v4");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./dnote.db");

function initialize() {
  db.run(
    "CREATE TABLE IF NOT EXISTS notes (uuid TEXT, book_uuid TEXT, body TEXT)"
  );
  db.run("CREATE TABLE IF NOT EXISTS books (uuid TEXT, label TEXT)");
}

initialize();

// console.log(process.argv);

const command = process.argv[2];
if (command === "add") {
  const bookName = process.argv[3];

  const stmt = db.prepare("INSERT INTO books (uuid, label) VALUES (?, ?)");
  stmt.run(uuidv4(), bookName);
  stmt.finalize();
} else if (command === "view") {
  console.log("Your books");
  db.each("SELECT label FROM books", function(err, row) {
    console.log(row.label);
  });
}

db.close();
