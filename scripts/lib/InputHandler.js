


function InputHandler(){
    
    this.interactables = [];

    let instance = this;
    map.on("click", function(e){
        instance.interactionHandler(e, true);
    });
    map.on("contextmenu", function(e){
        instance.interactionHandler(e, true);
    });
    map.on("mousemove", function(e){
        instance.interactionHandler(e, true);
    });
    map.on("dblclick", function(e){
        instance.interactionHandler(e, true);
    });

    $("input").keydown(function(e){
        instance.interactionHandler(e, false);
    });
    $("input").keyup(function(e){
        instance.interactionHandler(e, false);
    });
}

InputHandler.prototype.registerInteractable = function(interactable){
    this.interactables.push(interactable);
}

InputHandler.prototype.interactionHandler = function(e, isMouseEvent){
    if(isMouseEvent){
        switch(e.type){
            case "contextmenu":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].right(e.latlng);
                }
                break;
            case "click":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].left(e.latlng);
                }
                break;
            case "mousemove":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].mouseMove(e.latlng);
                }
                break;
            case "dblclick":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].doubleClick(e.latlng);
                }
                break;
            default:
                //unhandled event do nothing?
                break;
        }
    }
    else{
        switch(e.type){
            case "keydown":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].keydown(e.which);
                }
                break;
            case "keyup":
                for(let i=0; i<this.interactables.length; i++){
                    this.interactables[i].keyup(e.which);
                }
                break;
        }
    }
}