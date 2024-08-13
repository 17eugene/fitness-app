export const cutExerciseName = (str, maxStrLength) => {
  let splittedStr = str.split("");
  let joinedStr = "";
  if (splittedStr.length > maxStrLength) {
    splittedStr.splice(maxStrLength, splittedStr.length - 1);
  }
  joinedStr = splittedStr.join("");
  return joinedStr.length < str.length ? joinedStr + "..." : str;
};
