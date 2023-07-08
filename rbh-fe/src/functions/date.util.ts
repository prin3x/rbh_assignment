export const convertDate = (datestr: string | undefined = undefined) => {
  const date = datestr ? new Date(datestr) : new Date();
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
  });
  const formattedDate = formatter.format(date);
  return formattedDate;
};
