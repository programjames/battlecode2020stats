var scores = [];
var mus = [];
var ranks = [];
var strat = "Unknown";

function updateData(response) {
	if(response != null) {
		scores = response["scores"];
		mus = response["mus"];
		ranks = response["mus"];
		strat = response["strat"];
		updateGraphs()
	}
}

function loadData(name) {
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
	$.ajax({
		url: "https://programjames.github.io/battlecode2020stats/data/" + filename + ".json",
		dataType: "json",
		success: updateData
	});
}

function updateGraphs(){
	google.charts.load('44', {
  callback: drawBackgroundColor,
  packages: ['corechart']
});

function drawBackgroundColor() {
	let c = [];
	for(let i=0; i<scores.length; i++) {
		c.push([i, scores[i]]);
	}

  var data = new google.visualization.DataTable();
  data.addColumn('number', '#');
  data.addColumn('number', 'Score');

  data.addRows(c);

  var options = {
    hAxis: {
      title: 'Time'
    },
    vAxis: {
      title: 'Score'
    },
    backgroundColor: '#f1f8e9'
  };

  var chart = new google.visualization.LineChart(document.getElementById('scoreGraph'));
  chart.draw(data, options);
}
}