import axios from "axios";
import PhoneBook from "../services/PhoneBook";

const Table = ({ filtershown, data, setData, setMessage }) => {
  const handleDestroy = (id, name) => {
    if (window.confirm(`Delete ${name} ${id}`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then((response) => {
          PhoneBook.getAll().then((data) => {
            console.log(data);
            setData(data);
          });
        })
        .catch((error) => {
          error(`deleting ${name} was not succesfull!`);
          setTimeout(() => {
            error(null);
          }, 5000);
        });
      setMessage(`Deleting ${name} was succesful!`);
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Nimet</th>
          <th>Numerot</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filtershown !== ""
          ? data
              .filter((info) => info.name.includes(filtershown))
              .map((filteredName) => (
                <tr key={filteredName.id}>
                  <td>{filteredName.name}</td>
                  <td>{filteredName.number}</td>
                  <td>
                    <button
                      onClick={() =>
                        handleDestroy(
                          filteredName.id,
                          filteredName.name,
                          data,
                          setData
                        )
                      }
                    >
                      Poista
                    </button>
                  </td>
                </tr>
              ))
          : data.map((phonebook) => (
              <tr key={phonebook.id}>
                <td>{phonebook.name}</td>
                <td>{phonebook.number}</td>
                <td>
                  <button
                    onClick={() =>
                      handleDestroy(phonebook.id, phonebook.name, data, setData)
                    }
                  >
                    Poista
                  </button>
                </td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default Table;
