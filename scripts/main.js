
var inputHandler;
var measuringTape;

var measureOutputControl = L.Control.extend({
    options: {
        position: "bottomleft"
    },

    onAdd: function(map){
        this.container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom length');
        this.container.style.backgroundColor = 'white';
        this.container.style.width = '300px';
        this.container.style.height = '100px';

        this.totalPrefix = "<strong>Total: </strong>";
        this.segmentPrefix = "<strong>Segment: </strong>";

        this.totalLength = L.DomUtil.create('div', 'total-length', this.container);
        this.totalLength.innerHTML = this.totalPrefix;
        this.segmentLength = L.DomUtil.create('div', 'segment-length', this.container);
        this.segmentLength.innerHTML = this.segmentPrefix;

        L.DomEvent.disableClickPropagation(this.container);
        return this.container;
    },

    updateTotal: function(text){
        this.totalLength.innerHTML = this.totalPrefix + text;
    },

    updateSegment: function(text){
        this.segmentLength.innerHTML = this.segmentPrefix + text;
    }
});
var measureOutput = new measureOutputControl;

/**
 * called as soon as the DOM has finished loading
 */
function main(){
    measuringTape = new MeasuringTape(measureOutput);
    inputHandler = new InputHandler();
    inputHandler.registerInteractable(measuringTape); 

    this.measureControls = L.Control.extend({
        options: {
            position: "topright"
        },
    
        onAdd: function(map){
            this._map = map

            this.container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
            this.container.style.backgroundColor = 'white';
            this.container.style.width = '42px';
            this.container.style.height = '42px';

            var icon = L.DomUtil.create('img', 'icon', this.container);
            icon.src = "./img/icon.svg";
    
            L.DomEvent.addListener(this.container, 'click',  this.onClick, this);
            L.DomEvent.disableClickPropagation(this.container);
            return this.container;
        },
    
        onClick: function(e){
            if(isMeasuringTapeActive){
                this.container.style.backgroundColor = 'white';
                isMeasuringTapeActive = false;
                measuringTape.stop();
                this._map.removeControl(measureOutput);
            }
            else{
                this.container.style.backgroundColor = 'red';
                isMeasuringTapeActive = true;
                measuringTape.start();
                this._map.addControl(measureOutput);
            }
        },
    });
    
    map.addControl(new this.measureControls());
}

$(document).ready(main);

/*
Interface Drawable{

    function render();

    function start();

    function stop();

}
*/

/*
Interface Interactable{

    function left(latlng);

    function right(latlng);

    function mouseMove(latlng);

    function doubleClick(latlng);

    function keyDown(keycode);

    function keyUp(keycode);
}
*/