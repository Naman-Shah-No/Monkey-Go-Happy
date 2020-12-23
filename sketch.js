var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500)
  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,900,10);
  FoodGroup = createGroup();
  obstacleGroup=createGroup();
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
}


function draw() {
  background("white");
  
  if(gameState === PLAY){
  ground.x=ground.width/2;
  
  spawnBananas();
  spawnRocks();
  
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide(ground);
    
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score,100,50);
  
  stroke("black");
  textSize(20);
  fill("black");
    
    
    
    switch(score){
      case 10 : monkey.scale = 0.12;
      case 20 :monkey.scale = 0.14;
      case 30 : monkey.scale = 0.16;
      case 40 :monkey.scale = 0.18;
    }
  survivalTime=Math.ceil(frameCount/frameRate())
  drawSprites();
  text("Survival Time: "+ survivalTime, 100,50);
    text("score : " + score, 300, 50);
    if(monkey.isTouching(obstacleGroup)){
      monkey.scale = 0.1;
      gameState = END;
  }
    if(monkey.isTouching(FoodGroup)){
      score = score+1;
      FoodGroup.destroyEach();
    }
  }
  if(gameState === END){
    text("Game Over",200,250);
  }
}

function spawnBananas(){
    if(frameCount  % 100 === 0){
      
      banana = createSprite(width+20,height-300,40,10);
      banana.addImage("banana",bananaImage);
      banana.y = Math.round(random(100,220));
      banana.scale = 0.1;
      banana.lifetime = 300;
      banana.velocityX = -3;
      banana.depth = monkey.depth;
      
      monkey.depth = banana.depth+1;
      
      FoodGroup.add(banana);
      banana.lifetime = 150;
  }
}


function spawnRocks(){
    if(frameCount  % 100 === 0){
      
      obstacle = createSprite(200,330,20,4);
      obstacle.x = Math.round(random(100,400));
      obstacle.addImage("obstacle",obstaceImage);
      obstacle.scale = 0.1;
      obstacle.lifetime = 300;
      obstacle.velocityX = -3;
      obstacle.depth = monkey.depth;
      
      monkey.depth = obstacle.depth+1;
      
      obstacleGroup.add(obstacle);
  obstacle.lifetime = 150;
  }
}