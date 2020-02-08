Date.prototype.format = function(a) {
  var b = this,
    c = new Array(
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ),
    d = new Array("st", "nd", "rd", "th"),
    e = b.getFullYear(),
    f = c[b.getMonth()],
    g = b.getDate();
  return (
    (g +=
      1 > g % 10 || g % 10 > 3
        ? d[3]
        : 1 == g % 10
        ? d[0]
        : 2 == g % 10
        ? d[1]
        : d[2]),
    a
      .replace(/y/gi, e)
      .replace(/d/gi, g)
      .replace(/m/gi, f)
  );
};
String.prototype.replaceAll = function(AFindText, ARepText) {
  return this.replace(
    new RegExp(AFindText.replace(/([()[\]{}^$+\-*?."'|/\\])/g, "\\$1"), "ig"),
    ARepText
  );
};
