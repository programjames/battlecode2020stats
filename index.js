function getTeamData(name) {
	filename = "";
	for (let i = 0; i < name.length; i++) {
		let c = name.charAt(i);
		// Is alphanumeric?
		if(c.match(/^[0-9a-zA-Z]+$/)) {
			filename += c;
		} else {
			filename += name.charCodeAt(i);
		}
	}
	let ret = null;
	$.ajax({
		url: "data/" + filename + ".json",
		dataType: "json",
		success: function(response) {
			ret = response;
		}
	});
	return ret;
}