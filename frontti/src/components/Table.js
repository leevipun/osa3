import PhoneBook from "../services/PhoneBook";

const Table = ({ filtershown, data, setData, setMessage }) => {
  const handleDestroy = (id, name) => {
    if (window.confirm(`Delete ${name} ${id}`)) {
      console.log("Poistetaan");
      PhoneBook.deleting(id)
        .then((response) => {
          console.log("Päästäänkö tänne?");
          setMessage(`Deleting ${name} was successful!`);
          PhoneBook.getAll()
            .then((responseData) => {
              console.log(responseData);
              setData(responseData);
            })
            .catch((error) => {
              console.error("Error fetching updated data:", error);
            });
        })
        .catch((error) => {
          setMessage(`Deleting ${name} was not successful!`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    }
  };
  if (data === "") {
    return (
      <table>
        <thead>
          <tr>
            <th>Nimet</th>
            <th>Numerot</th>
            <th></th>
          </tr>
        </thead>
      </table>
    );
  } else if (data !== "") {
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
                        handleDestroy(
                          phonebook.id,
                          phonebook.name,
                          data,
                          setData
                        )
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
  }
};

export default Table;
