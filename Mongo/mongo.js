const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const addedname = process.argv[3];

const addednumber = process.argv[4];

const url = `mongodb+srv://leevipuntanen2:${password}@phonebook.dwgzny3.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  name: String,
  Number: String,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  name: addedname,
  Number: addednumber,
});
if (addedname !== undefined && addednumber !== undefined) {
  note.save().then((result) => {
    console.log(addedname, addednumber);
    console.log("added", result.name, "number:", result.Number, "to phonebook");
    mongoose.connection.close();
  });
} else {
  Note.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((contacts) => {
      console.log(contacts.name, contacts.Number);
    });
    mongoose.connection.close();
  });
}
