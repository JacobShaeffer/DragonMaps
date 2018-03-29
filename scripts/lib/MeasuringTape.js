
const KAPPA = 7.7975;
var isMeasuringTapeActive = false;

function MeasuringTape(measureOutput){ // Implements Interactable, Drawable
    //Initialize class variables
    this.measureOutput = measureOutput;
    this.polyline = {
        mousePosition: null,
        points: [],
        feature: L.polyline([], {color: 'yellow'}),
    }
    this.running = false;
}

//Local Functions
MeasuringTape.prototype.calculateDistance = function(){
    let totalDistance = 0;
    for(let i=1; i<this.polyline.points.length; i++){
        var x1, x2, y1, y2;
        x1 = this.polyline.points[i-1].lat;
        x2 = this.polyline.points[i].lat;
        y1 = this.polyline.points[i-1].lng;
        y2 = this.polyline.points[i].lng;

        let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
        totalDistance += distance;
    }
    var x1, x2, y1, y2;
    x1 = this.polyline.points[this.polyline.points.length-1].lat;
    x2 = this.polyline.mousePosition.lat;
    y1 = this.polyline.points[this.polyline.points.length-1].lng;
    y2 = this.polyline.mousePosition.lng;
    let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
    totalDistance += distance;
    return {total: totalDistance*KAPPA, segment: distance*KAPPA};
}
    
//Implements Interactable
MeasuringTape.prototype.right = function(latlng){
    if(!this.running)return;
    if(this.polyline.points.length >= 1){
        this.polyline.points.pop();
        this.render();
    }
    else{
        return;
    }
}

MeasuringTape.prototype.left = function(latlng){
    if(!this.running)return;
    this.polyline.points.push(latlng);
    this.render();
}

MeasuringTape.prototype.doubleClick = function(latlng){
    if(!this.running)return;
    this.right();
    this.right();
}

MeasuringTape.prototype.mouseMove = function(latlng){
    if(!this.running)return;
    this.polyline.mousePosition = latlng;
    this.render();
}

MeasuringTape.prototype.keyDown = function(keycode){
    if(!this.running)return;
    
}

MeasuringTape.prototype.keyUp = function(keycode){
    if(!this.running)return;
    
}

//Implements Drawable
MeasuringTape.prototype.render = function(){
    this.polyline.feature.removeFrom(map);
    this.polyline.feature = L.polyline([...this.polyline.points, this.polyline.mousePosition], {color: 'yellow', interactive: false}).addTo(map);
    if(this.polyline.points.length >= 1){
        var totals = this.calculateDistance();
        this.measureOutput.updateTotal(Math.round(totals.total) + " miles");
        this.measureOutput.updateSegment(Math.round(totals.segment) + " miles");
    }
    else{
        this.measureOutput.updateTotal("");
        this.measureOutput.updateSegment("");
    }
}

MeasuringTape.prototype.start = function(){
    this.running = true;
}

MeasuringTape.prototype.stop = function(){
    this.running = false;
    this.polyline.points = [];
    this.render();
}