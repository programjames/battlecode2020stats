var scores = [];
var mus = [];
var ranks = [];
var strat = "Unknown";

function updateData(response) {
	if(response != null) {
		scores = response["scores"];
		mus = response["mus"];
		ranks = response["ranks"];
		sigmas = response["sigmas"];
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
	let avgRank = ranks.reduce((a,b) => a + b, 0) / ranks.length;
	let avgScore = scores.reduce((a,b) => a + b, 0) / scores.length;
	let avgMu = mus.reduce((a,b) => a + b, 0) / mus.length;
	let avgSigma = sigmas.reduce((a,b) => a + b, 0) / sigmas.length;
	let c = [];
	for(let i=0; i<scores.length; i++) {
		c.push([i, ranks[i], scores[i]*avgRank/avgScore, mus[i]*avgRank/avgMu]);//, sigmas[i]*avgRank/avgSigma]);
	}

  var data = new google.visualization.DataTable();
  data.addColumn('number', 'Checkins');
  data.addColumn('number', 'Rank');
  data.addColumn('number', 'Score');
  data.addColumn('number', 'Mu');
  //data.addColumn('number', 'Sigma');

  data.addRows(c);

  var options = {
    hAxis: {
      title: 'Checkins'
    },
    vAxis: {
      title: 'Rank'
    },
	width:window.innerWidth,
	height: window.innerWidth/2,
    backgroundColor: '#ffffff'
  };

  var chart = new google.visualization.LineChart(document.getElementById('overallGraph'));
  chart.draw(data, options);
}
}