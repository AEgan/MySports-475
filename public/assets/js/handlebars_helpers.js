// Handlebars helper

Handlebars.registerHelper("inchesToHeight", function (inchString) {
  console.log("Inches: " + inchString);
  var inchInt = parseInt(inchString);
	var feet = Math.floor(inchInt / 12);
	var inches = inchInt % 12;
	return "" + feet + "'" + inches + "\"";
});

Handlebars.registerHelper("noGeekDates", function(dateString) {
  var date = new Date(dateString);
  return date.toDateString();
});


// with a little help from my friends
// http://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
Handlebars.registerHelper('numberWithCommas', function(theNumber) {
  return theNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

function render (tmpl, data) {
	var div = $("#" + tmpl);
	var html = div.html();
	var template = Handlebars.compile(html);
	return template(data);
}
