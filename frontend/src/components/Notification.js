import "../index.css";

const Notification = ({ message }) => {
  if (message === "") {
    return null;
  }

  return <div className="add">{message}</div>;
};

export default Notification;
