import PhoneBook from "../services/PhoneBook";

const Addform = ({
  data,
  setData,
  newName,
  newNumber,
  setNewName,
  setNewNumber,
  setMessage,
  setError,
}) => {
  const handleAdd = () => {
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
          `${newName} is already added to the phonebook. Do you want to replace the old number with ${newNumber}?`
        )
      ) {
        const id = existingName.id;
        const updateInfo = { name: newName, number: newNumber };
        PhoneBook.update(id, updateInfo)
          .then((response) => {
            PhoneBook.getAll().then((data) => {
              setData(data);
            });
          })
          .catch((error) => {
            setError(`Updating was not successful!`);
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
      const newPerson = { name: newName, number: newNumber };
      PhoneBook.create(newPerson)
        .then((response) => {
          setData(data.concat(response));
          setMessage(`Adding ${newName} was successful`);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setError(`Adding ${newName} was not successful, ${error.response.data}`);
          setTimeout(() => {
            setError(null);
          }, 5000);
        });
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
      <button onClick={handleAdd}>Add</button>
    </div>
  );
};

export default Addform;
