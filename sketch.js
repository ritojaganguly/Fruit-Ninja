var sword, sword1, swordSound;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var fruitGroup, enemyGroup;
var fruit, monster;
var fruit1, fruit2, fruit3, fruit4;
var monsterImage;
var score;
var gameOverImage, gameOverSound;
var position;

function preload(){
  sword = loadImage("sword.png")
  
  fruit1 = loadImage("fruit1.png")
  fruit2 = loadImage("fruit2.png")
  fruit3 = loadImage("fruit3.png")
  fruit4 = loadImage("fruit4.png")
  
  monsterImage = loadImage("alien1.png")
  gameOverImage = loadImage("gameover.png")
  
  swordSound = loadSound("knifeSwooshSound.mp3")
  gameOverSound = loadSound("gameover.mp3")
  
  enemyGroup = new Group()
  fruitGroup = new Group()
}

function setup(){
  createCanvas(400,400)
  
  sword1 = createSprite(200,200,3,4)
  sword1.addImage("sword" , sword);
  sword1.addImage("gameOver", gameOverImage)
  sword1.scale = 0.75
  
  score = 0
}

function draw(){
  background("black"); 
  fill("white")
  text("Score: " + score, 350, 50)
  if (gameState == PLAY){
    sword1.y = World.mouseY
    sword1.x = World.mouseX
  } 
  if (fruitGroup.isTouching(sword1)){
      fruitGroup.destroyEach();
      swordSound.play();
      score = score + 2;
  }
  if (enemyGroup.isTouching(sword1)){
    gameState = END;
    gameOverSound.play();
    sword1.changeImage("gameOver", gameOverImage);
    sword1.x = 200;
    sword1.y = 200;
  }
  if (gameState == END){
    enemyGroup.destroyEach();
    fruitGroup.destroyEach();
    enemyGroup.setVelocityX = 0;
    fruitGroup.setVelocityX = 0;
  }
  
  fruits();
  Enemy();
  drawSprites();
}

function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    if (position == 1){
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4));
    }else {
      if (position == 2){
        fruit.x = 0
        fruit.velocityX = (7+(score/4))
      }
    }
    r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    }else if (r == 2){
      fruit.addImage(fruit2);
    }else if (r == 3){
      fruit.addImage(fruit3);
    }else if (r == 4){
      fruit.addImage(fruit4);
    }
    
    fruit.y = Math.round(random(50,340));
    
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
  }
}

function Enemy(){
  if(World.frameCount%200===0){
    monster = createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8+(score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}