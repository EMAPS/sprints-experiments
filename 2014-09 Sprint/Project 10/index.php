<?php

// -----------------------------------------
// some basic parameters, info, etc.
// -----------------------------------------

$bangladesh = json_decode('[{"district":"Barguna","division":"Barisal","population_thousands":882,"surface_km2":1831,"density_peopleperkm2":481},
	{"district":"Barisal","division":"Barisal","population_thousands":2291,"surface_km2":2785,"density_peopleperkm2":823},
	{"district":"Bhola","division":"Barisal","population_thousands":1758,"surface_km2":3403,"density_peopleperkm2":517},
	{"district":"Jhalokati","division":"Barisal","population_thousands":596,"surface_km2":749,"density_peopleperkm2":795},
	{"district":"Patuakhali","division":"Barisal","population_thousands":1517,"surface_km2":3221,"density_peopleperkm2":471},
	{"district":"Pirojpur","division":"Barisal","population_thousands":1103,"surface_km2":1308,"density_peopleperkm2":844},
	{"district":"Bandarban","division":"Chittagong","population_thousands":383,"surface_km2":4479,"density_peopleperkm2":86},
	{"district":"Brahmanbaria","division":"Chittagong","population_thousands":2808,"surface_km2":1927,"density_peopleperkm2":1457},
	{"district":"Chandpur","division":"Chittagong","population_thousands":2393,"surface_km2":1704,"density_peopleperkm2":1404},
	{"district":"Chittagong","division":"Chittagong","population_thousands":7509,"surface_km2":5283,"density_peopleperkm2":1421},
	{"district":"Comilla","division":"Chittagong","population_thousands":5304,"surface_km2":3085,"density_peopleperkm2":1719},
	{"district":"Cox\'s Bazar","division":"Chittagong","population_thousands":2275,"surface_km2":2492,"density_peopleperkm2":913},
	{"district":"Feni","division":"Chittagong","population_thousands":1420,"surface_km2":928,"density_peopleperkm2":1530},
	{"district":"Khagrachhari","division":"Chittagong","population_thousands":608,"surface_km2":2700,"density_peopleperkm2":225},
	{"district":"Lakshmipur","division":"Chittagong","population_thousands":1711,"surface_km2":1456,"density_peopleperkm2":1175},
	{"district":"Noakhali","division":"Chittagong","population_thousands":3072,"surface_km2":3601,"density_peopleperkm2":853},
	{"district":"Rangamati","division":"Chittagong","population_thousands":596,"surface_km2":6116,"density_peopleperkm2":97},
	{"district":"Dhaka","division":"Dhaka","population_thousands":11875,"surface_km2":1464,"density_peopleperkm2":8111},
	{"district":"Faridpur","division":"Dhaka","population_thousands":1867,"surface_km2":2073,"density_peopleperkm2":901},
	{"district":"Gazipur","division":"Dhaka","population_thousands":3333,"surface_km2":1800,"density_peopleperkm2":1852},
	{"district":"Gopalganj","division":"Dhaka","population_thousands":1149,"surface_km2":1490,"density_peopleperkm2":771},
	{"district":"Jamalpur","division":"Dhaka","population_thousands":2265,"surface_km2":2032,"density_peopleperkm2":1115},
	{"district":"Kishoreganj","division":"Dhaka","population_thousands":2853,"surface_km2":2689,"density_peopleperkm2":1061},
	{"district":"Madaripur","division":"Dhaka","population_thousands":1149,"surface_km2":1145,"density_peopleperkm2":1004},
	{"district":"Manikganj","division":"Dhaka","population_thousands":1379,"surface_km2":1379,"density_peopleperkm2":1000},
	{"district":"Munshiganj","division":"Dhaka","population_thousands":1420,"surface_km2":955,"density_peopleperkm2":1487},
	{"district":"Mymensingh","division":"Dhaka","population_thousands":5042,"surface_km2":4363,"density_peopleperkm2":1156},
	{"district":"Narayanganj","division":"Dhaka","population_thousands":2897,"surface_km2":759,"density_peopleperkm2":4139},
	{"district":"Narsingdi","division":"Dhaka","population_thousands":2202,"surface_km2":1141,"density_peopleperkm2":1930},
	{"district":"Netrakona","division":"Dhaka","population_thousands":2207,"surface_km2":2810,"density_peopleperkm2":786},
	{"district":"Rajbari","division":"Dhaka","population_thousands":1040,"surface_km2":1119,"density_peopleperkm2":929},
	{"district":"Shariatpur","division":"Dhaka","population_thousands":1146,"surface_km2":1182,"density_peopleperkm2":970},
	{"district":"Sherpur","division":"Dhaka","population_thousands":1334,"surface_km2":1364,"density_peopleperkm2":978},
	{"district":"Tangail","division":"Dhaka","population_thousands":3571,"surface_km2":3414,"density_peopleperkm2":1046},
	{"district":"Bagerhat","division":"Khulna","population_thousands":1461,"surface_km2":3959,"density_peopleperkm2":369},
	{"district":"Chuadanga","division":"Khulna","population_thousands":1123,"surface_km2":1177,"density_peopleperkm2":954},
	{"district":"Jessore","division":"Khulna","population_thousands":2742,"surface_km2":2567,"density_peopleperkm2":1068},
	{"district":"Jhenaidah","division":"Khulna","population_thousands":1756,"surface_km2":1961,"density_peopleperkm2":895},
	{"district":"Khulna","division":"Khulna","population_thousands":2294,"surface_km2":4394,"density_peopleperkm2":522},
	{"district":"Kushtia","division":"Khulna","population_thousands":1933,"surface_km2":1601,"density_peopleperkm2":1207},
	{"district":"Magura","division":"Khulna","population_thousands":913,"surface_km2":1049,"density_peopleperkm2":871},
	{"district":"Meherpur","division":"Khulna","population_thousands":652,"surface_km2":579,"density_peopleperkm2":910},
	{"district":"Narail","division":"Khulna","population_thousands":715,"surface_km2":990,"density_peopleperkm2":722},
	{"district":"Satkhira","division":"Khulna","population_thousands":1973,"surface_km2":3858,"density_peopleperkm2":511},
	{"district":"Bogra","division":"Rajshahi","population_thousands":3371,"surface_km2":2920,"density_peopleperkm2":1154},
	{"district":"Joypurhat","division":"Rajshahi","population_thousands":909,"surface_km2":965,"density_peopleperkm2":942},
	{"district":"Naogaon","division":"Rajshahi","population_thousands":2576,"surface_km2":3436,"density_peopleperkm2":750},
	{"district":"Natore","division":"Rajshahi","population_thousands":1696,"surface_km2":1896,"density_peopleperkm2":894},
	{"district":"Nawabganj","division":"Rajshahi","population_thousands":1635,"surface_km2":1703,"density_peopleperkm2":960},
	{"district":"Pabna","division":"Rajshahi","population_thousands":2497,"surface_km2":2372,"density_peopleperkm2":1053},
	{"district":"Rajshahi","division":"Rajshahi","population_thousands":2573,"surface_km2":2407,"density_peopleperkm2":1069},
	{"district":"Sirajganj","division":"Rajshahi","population_thousands":3072,"surface_km2":2498,"density_peopleperkm2":1230},
	{"district":"Dinajpur","division":"Rangpur","population_thousands":2970,"surface_km2":3438,"density_peopleperkm2":864},
	{"district":"Gaibandha","division":"Rangpur","population_thousands":2349,"surface_km2":2179,"density_peopleperkm2":1078},
	{"district":"Kurigram","division":"Rangpur","population_thousands":2050,"surface_km2":2296,"density_peopleperkm2":893},
	{"district":"Lalmonirhat","division":"Rangpur","population_thousands":1249,"surface_km2":1241,"density_peopleperkm2":1006},
	{"district":"Nilphamari","division":"Rangpur","population_thousands":1820,"surface_km2":1580,"density_peopleperkm2":1152},
	{"district":"Panchagarh","division":"Rangpur","population_thousands":981,"surface_km2":1405,"density_peopleperkm2":698},
	{"district":"Rangpur","division":"Rangpur","population_thousands":2866,"surface_km2":2368,"density_peopleperkm2":1210},
	{"district":"Thakurgaon","division":"Rangpur","population_thousands":1380,"surface_km2":1810,"density_peopleperkm2":762},
	{"district":"Habiganj","division":"Sylhet","population_thousands":2059,"surface_km2":2637,"density_peopleperkm2":781},
	{"district":"Moulvibazar","division":"Sylhet","population_thousands":1902,"surface_km2":2799,"density_peopleperkm2":679},
	{"district":"Sunamganj","division":"Sylhet","population_thousands":2443,"surface_km2":3670,"density_peopleperkm2":666},
	{"district":"Sylhet","division":"Sylhet","population_thousands":3404,"surface_km2":3490,"density_peopleperkm2":975}]');

// create two arrays from data for easier transformation handling

$bangladesh_districts = array();

foreach($bangladesh as $district) {
	$bangladesh_districts[$district->district] = array();
	$bangladesh_districts[$district->district]["division"] = $district->division;
	$bangladesh_districts[$district->district]["population_thousands"] = $district->population_thousands;
	$bangladesh_districts[$district->district]["surface_km2"] = $district->surface_km2;
	$bangladesh_districts[$district->district]["density_peopleperkm2"] = $district->density_peopleperkm2;
}

//print_r($bangladesh_districts); exit;


$bangladesh_divisions = array();

foreach($bangladesh as $district) {

	if(!isset($bangladesh_divisions[$district->division])) {
		$tmp = array();
		$tmp["districts"] = array();
		$tmp["population_thousands"] = 0;
		$tmp["surface_km2"] = 0;
		$tmp["density_peopleperkm2"] = 0;
		$bangladesh_divisions[$district->division] = $tmp;
	}

	$bangladesh_divisions[$district->division]["districts"][] = $district->district;
	$bangladesh_divisions[$district->division]["population_thousands"] += $district->population_thousands;
	$bangladesh_divisions[$district->division]["surface_km2"] += $district->surface_km2;
	$bangladesh_divisions[$district->division]["density_peopleperkm2"] = round(($bangladesh_divisions[$district->division]["population_thousands"] * 1000) / $bangladesh_divisions[$district->division]["surface_km2"],1);
}

//print_r($bangladesh_divisions); exit;


// -----------------------------------------
// load data from Google spreadsheet
// -----------------------------------------

// URL for listing worksheets: https://spreadsheets.google.com/feeds/worksheets/1BcwY95ILtPhQaWDZHZmVBWq1mstdgy-aVtsoa4eKLMw/public/basic
// Sheet1: od6
// Sheet2: o50mh82
// aggregate spreadsheet: 1WwFHZs6sPdSQFs3_rJERzsEgCS4oajR1D4LrrEj4aOo
// BCCTF: 1BcwY95ILtPhQaWDZHZmVBWq1mstdgy-aVtsoa4eKLMw

$ws_url = "https://spreadsheets.google.com/feeds/list/1WwFHZs6sPdSQFs3_rJERzsEgCS4oajR1D4LrrEj4aOo/od6/public/basic";
$data = simplexml_load_file($ws_url);

//print_r($data); exit;

// -----------------------------------------
// transform XML into a treatable data form
// -----------------------------------------

$mydata = array();
foreach ($data->entry as $entry) {

	$row = array();
	$row["datasource"] = (string)$entry->title;

	$values = explode(", ", (string)$entry->content);

	foreach($values as $value) {

		$pair = explode(": ", $value);

		$row[$pair[0]] = $pair[1];
	}

	foreach($row as $name => $field) {

		$elements = explode(";",$field);

		if(count($elements) > 1 && $name != "projecttitle") {

			$tmp = array();
			for($i = 0; $i < count($elements); $i++) {
				$elements[$i] = trim($elements[$i]);
				if($elements[$i] != "" && $elements[$i] != " ") {
					$tmp[] = $elements[$i];
				}
			}

			$row[$name] = $tmp;
		}
	}
	$mydata[] = $row;
}

//print_r($mydata);exit;


// -----------------------------------------
// chreate "view" arrays
// -----------------------------------------


// Funds per datasource
$v_monPerDatasource = array();
foreach($mydata as $row) {
	if(!isset($v_monPerDatasource[$row["datasource"]])) { $v_monPerDatasource[$row["datasource"]] = 0; }
	$v_monPerDatasource[$row["datasource"]] += $row["budget"];
}

// Funds per sector
$v_monPerSector	 = array();
foreach($mydata as $row) {

	if(!is_array($row["sector"])) {
		$row["sector"] = strtolower($row["sector"]);
		if(!isset($v_monPerSector[$row["sector"]])) {$v_monPerSector[$row["sector"]] = 0; }
		$v_monPerSector[$row["sector"]] += $row["budget"];
	} else {

		foreach($row["sector"] as $sector) {
			$sector = strtolower($sector);
			if(!isset($v_monPerSector[$sector])) { $v_monPerSector[$sector] = 0; }
			$v_monPerSector[$sector] += $row["budget"] / count($row["sector"]);
		}
	}
}
arsort($v_monPerSector);

// Funds per risk
$v_monPerRisk = array();
foreach($mydata as $row) {

	if(!is_array($row["risktype"])) {
		$row["risktype"] = strtolower($row["risktype"]);
		if(!isset($v_monPerRisk[$row["risktype"]])) {$v_monPerRisk[$row["risktype"]] = 0; }
		$v_monPerRisk[$row["risktype"]] += $row["budget"];
	} else {

		foreach($row["risktype"] as $risk) {
			$risk = strtolower($risk);
			if(!isset($v_monPerRisk[$risk])) { $v_monPerRisk[$risk] = 0; }
			$v_monPerRisk[$risk] += $row["budget"] / count($row["risktype"]);
		}
	}
}
arsort($v_monPerRisk);


// Funds per district
$v_monPerDistrict = array();
foreach($mydata as $row) {

	if(!is_array($row["district"])) {
		$row["district"] = trim(strtolower($row["district"]));
		if(!isset($v_monPerDistrict[$row["district"]])) { $v_monPerDistrict[$row["district"]] = array("count" => 0,"sum" => 0); }
		$v_monPerDistrict[$row["district"]]["sum"] += $row["budget"];
		$v_monPerDistrict[$row["district"]]["count"]++;
	} else {

		foreach($row["district"] as $district) {
			$district = trim(strtolower($district));
			if(!isset($v_monPerDistrict[$district])) { $v_monPerDistrict[$district] = array("count" => 0,"sum" => 0); }
			$v_monPerDistrict[$district]["sum"] += $row["budget"] / count($row["district"]);
			$v_monPerDistrict[$district]["count"]++;
		}
	}
}
arsort($v_monPerDistrict);

//print_r($v_monPerDistrict); exit;

// Funds per solution


$v_flows = array();
$v_flows["fs2div"] = array();
$v_flows["div2risk"] = array();
$v_flows["div2strategy"] = array();

foreach($mydata as $row) {

	// FS to DIV

	if(!is_array($row["division"])) {

		$tmpedge =  $row["datasource"] . "_X_" . strtolower($row["division"]);

		if(!isset($v_flows["fs2div"][$tmpedge])) {
			$v_flows["fs2div"][$tmpedge] = 0;
		}

		$v_flows["fs2div"][$tmpedge] += $row["budget"];

	} else {

		foreach($row["division"] as $div) {

			$tmpedge =  $row["datasource"] . "_X_" . strtolower($div);

			if(!isset($v_flows["fs2div"][$tmpedge])) {
				$v_flows["fs2div"][$tmpedge] = 0;
			}

			$v_flows["fs2div"][$tmpedge] += ($row["budget"] / count($row["division"]));

		}
	}

	// DIV to RISK

	if(!is_array($row["division"])) {

		if(!is_array($row["risktype"])) {

			$tmpedge =  strtolower($row["division"]) . "_X_" . strtolower($row["risktype"]);

			if(!isset($v_flows["div2risk"][$tmpedge])) { $v_flows["div2risk"][$tmpedge] = 0; }

			$v_flows["div2risk"][$tmpedge] += $row["budget"];

		} else {

			foreach($row["risktype"] as $risk) {

				$tmpedge = strtolower($row["division"]) . "_X_" . strtolower($risk);

				if(!isset($v_flows["div2risk"][$tmpedge])) { $v_flows["div2risk"][$tmpedge] = 0; }

				$v_flows["div2risk"][$tmpedge] += ($row["budget"] / count($row["risktype"]));
			}
		}

	} else {

		foreach($row["division"] as $div) {

			if(!is_array($row["risktype"])) {

				$tmpedge =  strtolower($div) . "_X_" . strtolower($row["risktype"]);

				if(!isset($v_flows["div2risk"][$tmpedge])) { $v_flows["div2risk"][$tmpedge] = 0; }

				$v_flows["div2risk"][$tmpedge] += ($row["budget"] / count($row["division"]));

			} else {

				foreach($row["risktype"] as $risk) {

					$tmpedge = strtolower($div) . "_X_" . strtolower($risk);

					if(!isset($v_flows["div2risk"][$tmpedge])) { $v_flows["div2risk"][$tmpedge] = 0; }

					$v_flows["div2risk"][$tmpedge] += ($row["budget"] / (count($row["risktype"]) *  count($row["division"])));
				}

			}
		}
	}


	// DIV to STRAT

	if(!is_array($row["division"])) {

		if(!is_array($row["adaptationstrategies"])) {

			$tmpedge =  strtolower($row["division"]) . "_X_" . strtolower($row["adaptationstrategies"]);

			if(!isset($v_flows["div2strategy"][$tmpedge])) { $v_flows["div2strategy"][$tmpedge] = 0; }

			$v_flows["div2strategy"][$tmpedge] += $row["budget"];

		} else {

			foreach($row["adaptationstrategies"] as $strat) {

				$tmpedge = strtolower($row["division"]) . "_X_" . strtolower($strat);

				if(!isset($v_flows["div2strategy"][$tmpedge])) { $v_flows["div2strategy"][$tmpedge] = 0; }

				$v_flows["div2strategy"][$tmpedge] += ($row["budget"] / count($row["adaptationstrategies"]));
			}
		}

	} else {

		foreach($row["division"] as $div) {

			if(!is_array($row["adaptationstrategies"])) {

				$tmpedge =  strtolower($div) . "_X_" . strtolower($row["adaptationstrategies"]);

				if(!isset($v_flows["div2strategy"][$tmpedge])) { $v_flows["div2strategy"][$tmpedge] = 0; }

				$v_flows["div2strategy"][$tmpedge] += ($row["budget"] / count($row["division"]));

			} else {

				foreach($row["adaptationstrategies"] as $strat) {

					$tmpedge = strtolower($div) . "_X_" . strtolower($strat);

					if(!isset($v_flows["div2strategy"][$tmpedge])) { $v_flows["div2strategy"][$tmpedge] = 0; }

					$v_flows["div2strategy"][$tmpedge] += ($row["budget"] / (count($row["adaptationstrategies"]) *  count($row["division"])));
				}
			}
		}
	}
}



?>

<html>
<head>

	<title>TAFIB</title>

	<script type="text/javascript" src="https://www.google.com/jsapi"></script>

	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.min.js"></script>

	<script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1.1','packages':['sankey']}]}"></script>

	<script type='text/javascript'>

	google.load('visualization', '1.1', {'packages': ["corechart","geochart","treemap"]});

	google.setOnLoadCallback(init);


	function init() {

		// Funding Overview
		drawPie();
		drawSectorsBar();
		drawRisksBar();

		// Geo
		drawOverviewTreemap();
		drawFundsTreemap();
		drawProjectsTreemap();
		drawMap();

		// Flows
		drawSankeyRisk();
		drawSankeyStrategies();
	}


	var _activeReport = 1;

	function switchReport(_to) {

		//alert(_to);

		$("#if_report" + _activeReport).css("visibility","hidden");
		$("#if_ridernav" + _activeReport).css("background-color","white");
		$("#if_report" + _to).css("visibility","visible");
		$("#if_ridernav" + _to).css("background-color","#ddd");
		_activeReport = _to;
	}


	// Funds overview

	function drawPie() {

        var data = google.visualization.arrayToDataTable([
			['Funding Source', 'Sum']
			<?php
          		// format: ,['Work',11]
          		foreach($v_monPerDatasource as $datasource => $value) {
          			echo ",['" . $datasource . "'," . $value . "]\n";
          		}
         	?>
			]);

        var options = {
          title: 'Funds per Datasource',
          legend: {position: 'right', textStyle: {fontSize:11}}
        };

        var chart = new google.visualization.PieChart(document.getElementById('vis_piechart'));
        chart.draw(data, options);
	}

	function drawSectorsBar() {
		var data = google.visualization.arrayToDataTable([
			['Sector', 'Dollars']
  			// Format: .['2004',1000]
  			<?php
          		// format: ,['Work',11]
          		foreach($v_monPerSector as $sector => $value) {
          			echo ",['" . $sector . "'," . $value . "]\n";
          		}
         	?>
		]);

		var options = {
			title: 'Funds per Sector',
 			vAxis: {title: 'Sector',textStyle: {color:'black',fontSize:11},titleTextStyle: {color:'black',fontSize:12}},
 			hAxis: {title: 'Dollars',textStyle: {color:'black',fontSize:11},titleTextStyle: {color:'black',fontSize:12}},
			legend: {position:'none'}
 		};

		var chart = new google.visualization.BarChart(document.getElementById('vis_sectorbar'));
    	chart.draw(data, options);
  	}

	function drawRisksBar() {
		var data = google.visualization.arrayToDataTable([
			['Risk', 'Dollars']
  			// Format: .['2004',1000]
  			<?php
          		// format: ,['Work',11]
          		foreach($v_monPerRisk as $risk => $value) {
          			echo ",['" . $risk . "'," . $value . "]\n";
          		}
         	?>
		]);

		var options = {
			title: 'Funds per Risk',
 			vAxis: {title: 'Risk',textStyle: {color:'black',fontSize:11},titleTextStyle: {color:'black',fontSize:12}},
 			hAxis: {title: 'Dollars',textStyle: {color:'black',fontSize:11},titleTextStyle: {color:'black',fontSize:12}},
			legend: {position:'none'}
 		};

		var chart = new google.visualization.BarChart(document.getElementById('vis_risksbar'));
    	chart.draw(data, options);
  	}


	// Geo

	function drawMap() {

		var data = google.visualization.arrayToDataTable([
			['District','Budget', 'Number of Projects']
			// Format: ,['Bogra',      2761477,    1285.31],
			<?php

			foreach($bangladesh_districts as $district => $data) {
				$color = (isset($v_monPerDistrict[strtolower($district)])) ? $v_monPerDistrict[strtolower($district)]["sum"]:0;
				$size = (isset($v_monPerDistrict[strtolower($district)])) ? $v_monPerDistrict[strtolower($district)]["count"]:0;
      			echo ",['" . addslashes($district) . "'," . $color . "," . $size . "]\n";
      		}

			?>
		]);

		var options = {
			region: 'BD',
			displayMode: 'markers',
			colorAxis: {colors: ['#ddd','#ff0','#f00']}
		};

		var chart = new google.visualization.GeoChart(document.getElementById('vis_map'));
		chart.draw(data, options);
	};

	function drawOverviewTreemap() {

		var data = google.visualization.arrayToDataTable([
			['Location','Parent','Population (size)','Density (color)'],
			['Global',null,0,0]
         	<?php
          		foreach($bangladesh_divisions as $division => $data) {
          			echo ",['" . addslashes($division) . " division','Global'," . $data["population_thousands"] . "," . $data["density_peopleperkm2"] . "]\n";
          		}

				foreach($bangladesh_districts as $district => $data) {
          			echo ",['" . addslashes($district) . "','" . addslashes($data["division"]) . " division'," . $data["population_thousands"] . "," . $data["density_peopleperkm2"] . "]\n";
          		}
			?>
        ]);

        // Create and draw the visualization.
		var tree = new google.visualization.TreeMap(document.getElementById('vis_overviewtreemap'));

		tree.draw(data, {
			maxDepth:2,
			minColor:'#00f',
			midColor:'#ff0',
			maxColor:'#f00',
			headerHeight:15,
			fontColor:'black',
			showScale:true
		});
	}


	function drawFundsTreemap() {

		var data = google.visualization.arrayToDataTable([
			['Location','Parent','Population (size)','Funds (color)'],
			['Global',null,0,0]
         	<?php
          		foreach($bangladesh_divisions as $division => $data) {
          			echo ",['" . addslashes($division) . " division','Global'," . $data["population_thousands"] . "," . $data["density_peopleperkm2"] . "]\n";
          		}

				foreach($bangladesh_districts as $district => $data) {
					$color = (isset($v_monPerDistrict[strtolower($district)])) ? $v_monPerDistrict[strtolower($district)]["sum"]:0;
          			echo ",['" . addslashes($district) . "','" . addslashes($data["division"]) . " division'," . $data["population_thousands"] . "," . $color . "]\n";
          		}
			?>
        ]);

        // Create and draw the visualization.
		var tree = new google.visualization.TreeMap(document.getElementById('vis_fundstreemap'));

		tree.draw(data, {
			maxDepth:2,
			minColor:'#ddd',
			midColor:'#ff0',
			maxColor:'#f00',
			headerHeight:15,
			fontColor:'black',
			showScale:true
		});
	}

	function drawProjectsTreemap() {

		var data = google.visualization.arrayToDataTable([
			['Location','Parent','Population (size)','Number of Projects (color)'],
			['Global',null,0,0]
         	<?php
          		foreach($bangladesh_divisions as $division => $data) {
          			echo ",['" . addslashes($division) . " division','Global'," . $data["population_thousands"] . "," . $data["density_peopleperkm2"] . "]\n";
          		}

				foreach($bangladesh_districts as $district => $data) {
					$color = (isset($v_monPerDistrict[strtolower($district)])) ? $v_monPerDistrict[strtolower($district)]["count"]:0;
          			echo ",['" . addslashes($district) . "','" . addslashes($data["division"]) . " division'," . $data["population_thousands"] . "," . $color . "]\n";
          		}
			?>
        ]);

        // Create and draw the visualization.
		var tree = new google.visualization.TreeMap(document.getElementById('vis_projectstreemap'));

		tree.draw(data, {
			maxDepth:2,
			minColor:'#ddd',
			midColor:'#ff0',
			maxColor:'#f00',
			headerHeight:15,
			fontColor:'black',
			showScale:true
		});
	}


	function drawSankeyRisk() {

		var data = new google.visualization.DataTable();

		data.addColumn('string', 'From');
		data.addColumn('string', 'To');
		data.addColumn('number', 'Weight');
		data.addRows([

			//[ 'Brazil', 'Portugal', 5 ]
			<?php

				$datarows = array();
	      		foreach($v_flows["fs2div"] as $edge => $value) {

					if($value > 0) {
						$nodes = explode("_X_",$edge);
						if($nodes[0] == "unknown") { $nodes[0] = "unknown datasource"; }
						if($nodes[1] == "unknown") { $nodes[1] = "unknown division"; }
		      			$datarows[] = "['" . addslashes($nodes[0]) . "','" . addslashes($nodes[1]) . "'," . $value . "]\n";
					}
				}
				echo implode(",", $datarows);

				echo ",";

				$datarows = array();
	      		foreach($v_flows["div2risk"] as $edge => $value) {

					if($value > 0) {
						$nodes = explode("_X_",$edge);
						if($nodes[0] == "unknown") { $nodes[0] = "unknown division"; }
						if($nodes[1] == "unknown") { $nodes[1] = "unknown risk"; }
		      			$datarows[] = "['" . addslashes($nodes[0]) . "','" . addslashes(preg_replace("/[-\s]/","",$nodes[1])) . "'," . round($value) . "]\n";
					}
				}
				echo implode(",", $datarows);

			?>
		]);

		// Set chart options
		var options = {
			//width: 600,
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.Sankey(document.getElementById('vis_sankey_risk'));
		chart.draw(data, options);
	}


	function drawSankeyStrategies() {

		var data = new google.visualization.DataTable();

		data.addColumn('string', 'From');
		data.addColumn('string', 'To');
		data.addColumn('number', 'Weight');
		data.addRows([

			//[ 'Brazil', 'Portugal', 5 ]
			<?php

				$datarows = array();
	      		foreach($v_flows["fs2div"] as $edge => $value) {

					if($value > 0) {
						$nodes = explode("_X_",$edge);
						if($nodes[0] == "unknown") { $nodes[0] = "unknown datasource"; }
						if($nodes[1] == "unknown") { $nodes[1] = "unknown division"; }
		      			$datarows[] = "['" . addslashes($nodes[0]) . "','" . addslashes($nodes[1]) . "'," . $value . "]\n";
					}
				}
				echo implode(",", $datarows);

				echo ",";

				$datarows = array();
	      		foreach($v_flows["div2strategy"] as $edge => $value) {

					if($value > 0) {
						$nodes = explode("_X_",$edge);
						if($nodes[0] == "unknown") { $nodes[0] = "unknown division"; }
						if($nodes[1] == "unknown") { $nodes[1] = "unknown strategy"; }
		      			$datarows[] = "['" . addslashes($nodes[0]) . "','" . addslashes(preg_replace("/[-\s]/","",$nodes[1])) . "'," . round($value) . "]\n";
					}
				}
				echo implode(",", $datarows);

			?>
		]);

		// Set chart options
		var options = {
			//width: 600,
		};

		// Instantiate and draw our chart, passing in some options.
		var chart = new google.visualization.Sankey(document.getElementById('vis_sankey_strategies'));
		chart.draw(data, options);
	}


	</script>

<style>

body,html { margin:0px; font-family:Arial, Helvetica, sans-serif; font-size:13px; }

#if_topbar { background-color:black; padding:8px 15px 8px 15px; }
#if_topbar_text { width:100%; margin:0; padding:0; border:0; font-size:16px; color:white; letter-spacing:1px; }
#if_ridernav { height:50px; }

.if_ridernavs {  display:block; float:left; border:1px solid black; padding:5px; margin:10px 0px 10px 10px; background-color:#fff;  }
.if_reports { visibility:hidden; padding:10px; position:absolute; }
.if_report_headline { font-size:14px; margin-bottom:10px; font-weight:bold; letter-spacing:1px; background-color:#ddd; padding:3px; }
.if_visbox { border:1px solid #aaa; margin-bottom:20px; }
.if_vis_headline { font-size:13px; margin-bottom:5px; font-weight:bold; }

#if_report1 { visibility:visible; width:800px; }
#if_ridernav1 { background-color:#ddd; }

.clear { width: 100%; height: 1px; margin: 0 0 -1px; clear: both; }

</style>

</head>
<body>

<div id="container">

	<div id="if_topbar">
		<div id="if_topbar_text">TAFIB - Tracking Adaptation Finance in Bangladesh</div>
	</div>

	<div class="clear"></div>

	<div id="if_ridernav">
		<span id="if_ridernav1" class="if_ridernavs" onclick="switchReport(1);">Introduction</span>
		<span id="if_ridernav2" class="if_ridernavs" onclick="switchReport(2);">Funds overview</span>
		<span id="if_ridernav3" class="if_ridernavs" onclick="switchReport(3);">Geographic overview</span>
		<span id="if_ridernav4" class="if_ridernavs" onclick="switchReport(4);">Money Flows</span>
		<!--<span id="if_ridernav5" class="if_ridernavs" onclick="switchReport(5);">Explore</span>-->
	</div>

	<div id="if_report1" class="if_reports">

		<div class="if_report_headline">Introduction</div>

		This dashboard visualizes climate change related funds in Bangladesh. It was built during a datasprint in Oxford for the
		<a href="http://www.emapsproject.com/">EMAPS</a> project. It uses data from publicly available sources provided by various organizations.
		Data was coded during the datasprint by the group members.<br /><br />
		All data is retrieved from a Google spreadsheet at runtime.<br /><br />
		Group members: Sukaina Bharwani, Peter Gerry, Michele Mauri, Bernhard Rieder, Tom Turnbull
	</div>

	<div id="if_report2" class="if_reports">

		<div class="if_report_headline">Funds Overview</div>

		<div id="vis_piechart" class="if_visbox" style="width:500px; height:300px;"></div>

		<div id="vis_sectorbar" class="if_visbox" style="width:500px; height:600px;"></div>

		<div id="vis_risksbar" class="if_visbox" style="width:500px; height:600px;"></div>
	</div>

	<div id="if_report3" class="if_reports">

		<div class="if_report_headline">Geographic Overview</div>

		<div class="if_vis_headline">Country Overview - Elements: districts / Size: population / Color: population density</div>
		<div id="vis_overviewtreemap" class="if_visbox" style="width:800px; height:600px;"></div>

		<div class="if_vis_headline">Funds Overview - Elements: districts / Size: population / Color: adaptation funds ($)</div>
		<div id="vis_fundstreemap" class="if_visbox" style="width:800px; height:600px;"></div>

		<div class="if_vis_headline">Projects Overview - Elements: districts / Size: population / Color: number of adaptation projects</div>
		<div id="vis_projectstreemap" class="if_visbox" style="width:800px; height:600px;"></div>

		<div class="if_vis_headline">Map View - Elements: districts / Size: number of adaptation projects / Color: adaptation funds ($)</div>
		<div id="vis_map" class="if_visbox" style="width:800px; height:500px;"></div>
	</div>

	<div id="if_report4" class="if_reports">

		<div class="if_report_headline">Money Flows</div>

		<div class="if_vis_headline">Funding flowing from source to division to risks</div>
		<div id="vis_sankey_risk" class="if_visbox" style="width:800px; height:600px;"></div>

		<div class="if_vis_headline">Funding flowing from source to division to solutions</div>
		<div id="vis_sankey_strategies" class="if_visbox" style="width:800px; height:1200px;"></div>
	</div>

	<div id="if_report5" class="if_reports">

		<div class="if_report_headline">Explorer</div>
	</div>

</div>

</body>
</html>