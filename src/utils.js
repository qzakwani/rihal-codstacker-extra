export function isEmpty(obj) {
  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return true;
}

export function displaySize(size, unit) {
  switch (unit) {
    case "Byte":
      return size.toString() + " " + unit;
    case "KB":
      return (size / 1000).toFixed(2) + " " + unit;
    case "MB":
      return (size / 1000000).toFixed(2) + " " + unit;
    default:
      return size.toString() + " " + unit;
  }
}

export function localizeDate(date) {
  return new Date(date).toLocaleString();
}
