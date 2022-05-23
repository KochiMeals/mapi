let map;
var farm_main_plot_polygon;

function initMap() {

	const house_cords = {
		lat: 8.77721105135935,
		lng: 77.46167218773766
	}
	const farm_center_cords = {
		lat: 8.776286,
		lng: 77.462873,
	}
	const map = new google.maps.Map(document.getElementById("map"), {
		center: farm_center_cords,
		zoom: 18,
		mapTypeId: 'satellite'
	});
	const marker = new google.maps.Marker({
		position: house_cords,
		map: map,
		title: "Swathy Farms",
	});
	farm_main_plot_cords = [
		{ lat: 8.7792741,	lng: 77.4629707},
		{ lat: 8.7793431,	lng: 77.462478},
		{ lat: 8.7790412,	lng: 77.4618465},
		{ lat: 8.7785458,	lng: 77.461278},
	];
	farm_main_plot_polygon = new google.maps.Polygon({
		paths: farm_main_plot_cords,
		strokeColor: "#FF0000",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#FF0000",
		fillOpacity: 0.25,
		// editable: true
	});
	farm_main_plot_polygon.setMap(map);

	farm_vayal_plot_cords = [
		{ lat: 8.7791087,	lng: 77.4593409 },
		{ lat: 8.7790584,	lng: 77.4591858 },
		{ lat: 8.77902, 	lng: 77.4590687 },
		{ lat: 8.7789756,	lng: 77.4589766 },
	];
	farm_vayal_plot_polygon = new google.maps.Polygon({
		paths: farm_vayal_plot_cords,
		strokeColor: "#0000FF",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#0000FF",
		fillOpacity: 0.25,
		// editable: true
	});
	farm_vayal_plot_polygon.setMap(map);

	farm_front_plot_cords = [
		{ lat: 8.7782406,	lng: 77.4642373 },
		{ lat: 8.7779574,	lng: 77.4641466 },
		{ lat: 8.7779314,	lng: 77.4641231 },
		{ lat: 8.7776223,	lng: 77.4640437 },
	];

	farm_front_plot_polygon = new google.maps.Polygon({
		paths: farm_front_plot_cords,
		strokeColor: "#00FF00",
		strokeOpacity: 0.8,
		strokeWeight: 2,
		fillColor: "#00FF00",
		fillOpacity: 0.25,
		// editable: true
	});
	farm_front_plot_polygon.setMap(map);

	[
		farm_main_plot_polygon,
		farm_vayal_plot_polygon,
		farm_front_plot_polygon,
	].forEach(polygon => {
		["insert_at", "remove_at", "set_at"].forEach(event => {
			google.maps.event.addListener(polygon.getPath(), event, function () {
				var len = polygon.getPath().getLength();
				var points = [];
				for (var i = 0; i < len; i++) {
					point = polygon.getPath().getAt(i).toUrlValue(7).split(',');
					points.push("{ lat: " + point[0] + ",\tlng: " + point[1] + " },");
				}
				console.log(points.join("\n"));
			});
		})	
	})
}




window.initMap = initMap;
