import { v4 as uuidv4 } from "uuid";
import PhoneBook from "../services/PhoneBook";

const Addform = ({
  data,
  setData,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setMessage,
  message,
  setError,
  error,
}) => {
  const handleadd = () => {
    if (newName === "" || newNumber === "") {
      setError("Please provide both name and number.");
      setTimeout(() => {
        setError("");
      }, 5000);
      return;
    }

    const existingName = data.find((item) => item.name === newName);
    const existingNumber = data.find((item) => item.number === newNumber);

    if (existingName) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook do you want to replace the old one with a ${newNumber}?`
        )
      ) {
        console.log("hyväksyttiin");
        const id = data
          .filter((item) => item.name === newName)
          .map((item) => item.id);
        console.log(id);
        const updateInfo = { name: newName, number: newNumber };
        PhoneBook.update(id, updateInfo)
          .then((response) => {
            PhoneBook.getAll().then((data) => {
              setData(data);
            });
          })
          .catch((error) => {
            setError(`updating was not succesfull!`);
            setTimeout(() => {
              setError(null);
            }, 5000);
          });
        setNewName("");
        setNewNumber("");
      }

      return;
    }

    if (existingNumber) {
      alert(`${newNumber} is already added to the phonebook.`);
      return;
    } else {
      const newid = uuidv4();
      setMessage(`adding ${newName} was succesful`);
      console.log(message);
      const newData = [
        ...data,
        { name: newName, id: newid, number: newNumber },
      ];
      setData(newData);
      setNewName("");
      setNewNumber("");
      console.log("toimii?");

      PhoneBook.create({ name: newName, id: newid, number: newNumber }).catch(
        (error) => {
          setError(`adding ${newName} was not succesfull`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        }
      );
    }
  };

  return (
    <div>
      <h3>Add</h3>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        Number:
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
        />
      </div>
      <button onClick={handleadd}>Add</button>
    </div>
  );
};

export default Addform;
