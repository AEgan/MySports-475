// Handlebars helper

Handlebars.registerHelper("inchesToHeight", function (inchString) {
  console.log("Inches: " + inchString);
  var inchInt = parseInt(inchString);
	var feet = Math.floor(inchInt / 12);
	var inches = inchInt % 12;
	return "" + feet + "'" + inches + "\"";
});

function render (tmpl, data) {
	var div = $("#" + tmpl);
	var html = div.html();
	var template = Handlebars.compile(html);
	return template(data);
}