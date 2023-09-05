import PhoneBook from "../services/PhoneBook";

const Table = ({ filtershown, data, setData, setMessage }) => {
  const handleDestroy = (id, name) => {
    if (window.confirm(`Delete ${name} ${id}`)) {
      PhoneBook.deleting(id)
        .then(() => {
          PhoneBook.getAll()
            .then((responseData) => {
              setData(responseData);
            })
            .catch((error) => {
              console.error("Error fetching updated data:", error);
            });
        })
        .catch((error) => {
          console.log(error)
        });
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
        {filtershown
          ? data 
              .filter((info) => info.name.includes(filtershown))
              .map((filteredName) => (
                <tr key={filteredName.id}>
                  <td>{filteredName.name}</td>
                  <td>{filteredName.number}</td>
                  <td>
                    <button
                      onClick={() => handleDestroy(filteredName.id, filteredName.name)}
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
                  <button onClick={() => handleDestroy(phonebook.id, phonebook.name)}>
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
