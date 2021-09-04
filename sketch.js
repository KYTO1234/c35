var hynopticallBall,database;
var position;
function setup(){
    database = firebase.database();
    console.log(database);
    createCanvas(500,500);

    hynopticallBall = createSprite(250,250,10,10);
    hynopticallBall.shapeColor = "red";

    var hynopticallBallPosition = database.ref('ball/position');
    hynopticallBallPosition.on("value",readPosition, showError);
}

function draw(){

    background("white");
    if(position!==undefined){

    
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
      writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
      writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        
      writePosition(0,+1);
    }
    drawSprites();
  }
}

function writePosition(x,y){
database.ref('ball/position').set({
  'x':position.x + x,
  'y':position.y+y
})
}



function readPosition(data){
  position = data.val();
  console.log(position.x);

  hynopticallBall.x = position.x;
  hynopticallBall.y = position.y;
}

function showError(){ 
  console.log("error in reading data from the database")
}