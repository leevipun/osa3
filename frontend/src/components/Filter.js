const Filter = ({ filtershown, setfiltershown }) => {
  return (
    <div>
      Filter Shown with:
      <input
        value={filtershown}
        onChange={(e) => setfiltershown(e.target.value)}
      />
    </div>
  );
};

export default Filter;
