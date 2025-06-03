const formatDate = (d) =>
    new Date(d).toLocaleString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

export default formatDate;