export const compareDates = (date1, date2) => {
  date1 = new Date(date1);
  date2 = new Date(date2);
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
export const formatDate = (date) => {
  const dateOfMonth = date.date();
  const dayOfWeek = date.format("dddd");
  const month = date.format("MMMM");
  return `${dateOfMonth} ${month}, ${dayOfWeek}`;
};

export const shiftEncoder = (shiftType) => {
  switch (shiftType) {
    case 1:
      return "Morning";
      break;

    case 2:
      return "Noon";
      break;

    case 3:
      return "Evening";
      break;
    default:
      return "Error";
      break;
  }
};
