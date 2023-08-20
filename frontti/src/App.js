import { useState, useEffect } from "react";
import Addform from "./components/Addform";
import Table from "./components/Table";
import Filter from "./components/Filter";
import ErrorNotification from "./components/ErrorNotification";
import Notification from "./components/Notification";
import "./index.css";
import PhoneBook from "./services/PhoneBook";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [data, setData] = useState([]);
  const [filtershown, setfiltershown] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    PhoneBook.getAll()
      .then((response) => {
        console.log("Täytetty");
        setData(response.data);
        console.log("Data:", data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification error={error} />
      <Notification message={message} />
      <div>
        <Filter filtershown={filtershown} setfiltershown={setfiltershown} />
      </div>
      <Addform
        data={data}
        setData={setData}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        setMessage={setMessage}
        setError={setError}
        message={message}
        error={error}
      />
      <Table data={data} filtershown={filtershown} setData={setData} />
    </div>
  );
};

export default App;
