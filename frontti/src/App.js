import { useState, useEffect } from "react";
import Addform from "./components/Addform";
import Table from "./components/Table";
import Filter from "./components/Filter";
import axios from "axios";
import ErrorNotification from "./components/ErrorNotification";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [data, setData] = useState([]);
  const [filtershown, setfiltershown] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/api/persons").then((response) => {
      console.log("Täytetty");
      setData(response.data);
    });
  }, []);

  if (!data) {
    return null;
  } else {
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
  }
};

export default App;
