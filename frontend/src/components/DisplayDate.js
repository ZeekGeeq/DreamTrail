const DisplayDate = ({ dateString }) => {
  const date = new Date(dateString);

  // Format the date to MM/dd/yyyy
  const formattedDate = date.toLocaleDateString("en-US");

  return <div>{formattedDate}</div>;
};

export default DisplayDate;
