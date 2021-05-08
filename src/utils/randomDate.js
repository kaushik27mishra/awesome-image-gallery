export const randomDate = () => {
  let start = new Date();
  let end = new Date();
  let pastYear = end.getFullYear() - 1;
  end.setFullYear(pastYear);

  let d = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};
