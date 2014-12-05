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

Handlebars.registerHelper("format_date", function (date) {
	var year = date.substring(0,4);
	var month = date.substring(5,7);
	var day = date.substring(8,10);

	return month + " / " + day + " / " + year;
});

Handlebars.registerHelper("round_one", function (num) {
	return (Math.round(num*10)/10);
});

function render (tmpl, data) {
	var div = $("#" + tmpl);
	var html = div.html();
	var template = Handlebars.compile(html);
	return template(data);
}
