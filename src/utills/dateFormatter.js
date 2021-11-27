const dateFormatter = (date) => {
  //save retrieved date to a new variable
  let formatDate = date;
  //set the formatDate to a new Date format
  formatDate = new Date(formatDate);
  //Format the date withe the built-in date formatter ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat
  formatDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: "long",
  }).format(formatDate);

  return formatDate;
};

export default dateFormatter;
