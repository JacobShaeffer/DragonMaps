const bounds = new L.LatLngBounds(new L.LatLng(-75, -180), new L.LatLng(75, 180));

var map = L.map('mapid', {
	center: bounds.getCenter(),
	zoom: 4, 
	maxBounds: bounds,
	maxBoundsViscosity: 0.5,
});

L.tileLayer('http://jacobshaeffer.com:8000/tileSet/{z}/{y}/{x}', {
    attribution: 'Map data and Imagery &copy; <a href="http://dnd.wizards.com/">Wizards</a>',
	maxZoom: 6,
	minZoom: 2,
	noWrap: true,
}).addTo(map);