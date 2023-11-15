export const handleDate = () => {
  const today = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const dayOfWeek = daysOfWeek[today.getDay()];
  const month = monthsOfYear[today.getMonth()];
  const date = today.getDate();
  const year = today.getFullYear();
  const formattedDate = `${dayOfWeek} ${month} ${date} ${year}`;
  return formattedDate;
};
export const handleTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();

  const amOrPm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12; // Convert hours to 12-hour format

  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, '0')}:00 ${amOrPm}`;
  return formattedTime;
};

export const convertTimeFormat = inputString => {
  // Regular expression to match the time in the format hh:mm:ss AM/PM
  const timeRegex = /\b\d{1,2}:\d{2}:\d{2}\b \w{2}/g;

  // Replace the matched time formats with modified ones (without seconds)
  const modifiedString = inputString.replace(timeRegex, match => {
    const timeParts = match.split(':');
    const hour = timeParts[0];
    const minute = timeParts[1].slice(0, 2); // Get minutes (slice seconds)
    const amPm = timeParts[2].slice(3); // Get AM/PM

    return `${hour}:${minute}:${amPm}`;
  });

  return modifiedString;
};

// Example usage
const inputData = '5:41:00 pm time34343 6:01:00 pm';
const convertedData = convertTimeFormat(inputData);
console.log(convertedData);
