GAMESTATE="startMenu"
player1Lives=3
player1Health=100
minutesSurvived=0
score=0
levelState=0

var player1, playerRunRight,playerRunLeft
var ground,groundImage
var testBackground, testBackgroundImg
var resultStatus = ""



function preload(){
 playerRunRight=loadAnimation("Assets/playerRunRight1.png","Assets/playerRunRight2.png","Assets/playerRunRight3.png","Assets/playerRunRight4.png","Assets/playerRunRight5.png","Assets/playerRunRight6.png","Assets/playerRunRight7.png","Assets/playerRunRight8.png",);
 playerRunLeft=loadAnimation("Assets/playerRunLeft1.png","Assets/playerRunLeft2.png","Assets/playerRunLeft3.png","Assets/playerRunLeft4.png","Assets/playerRunLeft5.png","Assets/playerRunLeft6.png","Assets/playerRunLeft7.png","Assets/playerRunLeft8.png");

 playerIdleLeft=loadAnimation("Assets/playerIdleLeft1.png","Assets/playerIdleLeft2.png","Assets/playerIdleLeft2.png","Assets/playerIdleLeft1.png");
 playerIdleRight=loadAnimation("Assets/playerIdleRight1.png","Assets/playerIdleRight2.png","Assets/playerIdleRight2.png","Assets/playerIdleRight1.png");

 //playerPunchRight=loadAnimation("Assets/playerPunchRight1.png","Assets/playerPunchRight2.png","Assets/playerPunchRight3.png","Assets/playerPunchRight4.png","Assets/playerPunchRight5.png","Assets/playerPunchRight6.png",);
 //playerPunchLeft=loadAnimation("Assets/playerPunchLeft1.png","Assets/playerPunchLeft2.png","Assets/playerPunchLeft3.png","Assets/playerPunchLeft4.png","Assets/playerPunchLeft5.png","Assets/playerPunchLeft6.png",)

 
 playerJumpLeft=loadAnimation("Assets/playerJumpLeft1.png","Assets/playerJumpLeft2.png","Assets/playerJumpLeft3.png")
 playerJumpRight=loadAnimation("Assets/playerJumpRight1.png","Assets/playerJumpRight2.png","Assets/playerJumpRight3.png")
 
 //NPCs
 coinImg=loadImage("Assets/coin.png")
 oneUpimg = loadImage("Assets/1up.png")
 zombieLeftAnimation=loadAnimation("Assets/zombieLeft1.png","Assets/zombieLeft2.png","Assets/zombieLeft3.png")
 zombieRightAnimation=loadAnimation("Assets/zombieRight1.png","Assets/zombieRight2.png","Assets/zombieRight3.png")

 groundImage=loadImage("Assets/ground2.png");
 testBackgroundImg=loadImage("Assets/background.png");
 
 //MUSIC
 pauseMenu=loadSound("Sounds/cheapShop.mp3");
 gameSong=loadSound("Sounds/inGame1.mp3");


 startMenu=loadSound("Sounds/startingScreenSong.mp3");
 scoreBoardSong=loadSound("Sounds/scoreBoardSong3.mp3");
 gameOver=loadSound("Sounds/Extras - 23 Game Over.mp3");
 //SFX
 jumpSound=loadSound("Sounds/swoosh.wav");
 runningSound=loadSound("Sounds/run.mp3");
 shootSound=loadSound("Sounds/shoot.mp3");
 coinSound=loadSound("Sounds/coinCollect.mp3");
 dmg = loadSound("Sounds/hurt.wav")
 heal = loadSound("Sounds/1Up.wav")
}

function setup(){
  createCanvas(windowWidth,windowHeight)
  //camera.x=player1.x
  //camera.y=player1.y

 //ground
 ground=createSprite(windowWidth/2,windowHeight,windowWidth,20);
 borderLeft=createSprite(windowWidth/170,windowHeight/2,20,windowHeight);
 borderRight=createSprite(windowWidth-10,windowHeight/2,20,windowHeight);
 restart=createSprite(windowWidth/2,windowHeight,50,50);


 //Side OBJECT GROUP
 leftObjectGroup = new Group();
 rightObjectGroup= new Group();
 

 coins = new Group();
 oneups = new Group();
 zombies = new Group();


 platformGroup= new Group(); 
 //platforms  

 platform1=createSprite(windowWidth/4,windowHeight-200,120,10);
 platform1.shapeColor=("black")
 platformGroup.add(platform1);
 platform2=createSprite(windowWidth-500,windowHeight-200,120,10);
 platform2.shapeColor=("black")
 platformGroup.add(platform2);
 platform3=createSprite(windowWidth-900,windowHeight-300,120,10);
 platform3.shapeColor=("black")
 platformGroup.add(platform3);
 platform4=createSprite(windowWidth/4 +300,windowHeight-300,120,10);
 platform4.shapeColor=("black")
 platformGroup.add(platform4);
 platform5=createSprite(windowWidth/2,windowHeight-500,120,10);
 platform5.shapeColor=("black")
 platformGroup.add(platform5);





 

//bullet group
bullets = new Group();
 
//player 1 config
 player1=createSprite(windowWidth/2,windowHeight,20,10);
 
 player1.addAnimation("idleLeft",playerIdleLeft);
 player1.addAnimation("idleRight",playerIdleRight);

 player1.addAnimation("runRight",playerRunRight);
 player1.addAnimation("runLeft",playerRunLeft);
 
 player1.addAnimation("jumpLeft",playerJumpLeft);
 player1.addAnimation("jumpRight",playerJumpRight);
 player1.scale=1.5;
 //player1.debug=true;
 player1.setCollider("rectangle",0,0,30,90)

 
//player hit effect
player1hit=createSprite(player1.x,player1.y,20,10);
player1hit.shapeColor=("red")



}

function draw(){
  background(testBackgroundImg);
  //START MENU GAME STATE --------------------------------------------------------------
  if(GAMESTATE=="startMenu"){
 // player2.visible=false;
 
 player1.visible=false;
  

  
  ground.visible=false;
  borderLeft.visible=false;
  borderRight.visible=false;
  platformGroup.visible=false;

  background("black");
    fill("white");
	 textSize(50)
   text("Press space to play",windowWidth/2 -200,windowHeight/2);
   textSize(25)
   text("Simple platformer concept game",windowWidth/2- 180,windowHeight/2 - 50);
   fill("red");
	 textSize(25)
   text("A or D : run left/right",windowWidth/2 -700,windowHeight/2 -300);
   text("Hold W : JUMP",windowWidth/2 -700,windowHeight/2 -250);
   text("Hold run + F : Shoot laser",windowWidth/2 -700,windowHeight/2 -200);
   text("P: Pause game",windowWidth/2 -700,windowHeight/2 -150);
   text("Test out the game!",windowWidth/2 -700,windowHeight/2 -100);

  
  if(keyDown("space")){
  GAMESTATE="play";
  gameSong.loop();
 
  player1.visible=true;
  ground.visible=true;
 

  }
  }
  //--------------------------------------------------------------------------------------
 //player2.collide(ground);
  //PAUSE GAME-------------------------------------------------------------------------------
  if(GAMESTATE=="pause"){
   
   
   
    background("black");
    fill("Green");
    textSize(50)
    text("GAME PAUSED",windowWidth/2 -200,windowHeight/2);
    textSize(20);
    text("PRESS SPACE TO PLAY",windowWidth/2 -130,windowHeight-350);
    fill("white");
    textSize(20)
    text("Come onnnn.",player1.x-50,player1.y-100);
    
     player1.velocityY=0;
     player1.velocityX=0;
    // player2.velocityX=0;
     //player2.velocityY=0;
   
   coins.visible=false;
   coins.setVelocityYEach(0);
   leftObjectGroup.visible=false;
   rightObjectGroup.visible=false;
   leftObjectGroup.setVelocityXEach(0);
   rightObjectGroup.setVelocityXEach(0);
   zombies.setVelocityXEach(0);
   
     if(keyDown("space")){  
       GAMESTATE="play"
       pauseMenu.stop();
       gameSong.loop();
      leftObjectGroup.setVelocityXEach(+10);
      rightObjectGroup.setVelocityXEach(-10);
      zombies.setVelocityXEach(5)
      coins.setVelocityYEach(5);
     }
   
     

   }
  //----------------------------------------------------------------------------------------
 
 if(GAMESTATE=="scoreBoard"){

  

 background("white")
 fill("Black");
 textSize(40)
 text(minutesSurvived,windowWidth/2,windowHeight-350);
 text("Minutes survived:",windowWidth/2 -140,windowHeight/2);
 
 text(score,windowWidth/4,windowHeight-350);
 text("Coins collected:",windowWidth/4 -140,windowHeight/2);
 
 if(score<5){
   resultStatus = "COOKED"
 }
 if(score>5 & score<10){
  resultStatus = "Not bad"
 }
 if(score>=10 & score<15){
  resultStatus = "Mid"
 }
 if (score>=15){
  resultStatus = "Touch GRASS"
 }
 
 
 fill("orange")
 text("OVERALL:",windowWidth-500,windowHeight/2);
 fill("black")
 text(resultStatus,windowWidth-300,windowHeight/2);
 
 if(keyDown("p")){
   GAMESTATE="startMenu"
   scoreBoardSong.stop();
   }
 
 
 }
 
 
 
 
 //
 
  //GAME OVER
 
  if(GAMESTATE=="end"){
   
   platformGroup.visible=false;
   leftObjectGroup.destroyEach();
   rightObjectGroup.destroyEach();
   player1.velocityX=0;
   player1.velocityY=0;
   
   
 
   
   background("RED");
   fill("BLACK");
  textSize(50)
  text("GAME OVER",windowWidth/2 -160,windowHeight/2);
   
  textSize(20);
    text("PRESS SPACE TO RESTART",windowWidth/2 -130 ,windowHeight-400);
    text("PRESS 'S' FOR SCOREBOARD",windowWidth/2 -600 ,windowHeight-400);
    
 
 
   if(keyDown("SPACE")){
   
    location.reload();
   }
   if(keyDown("s")){
     GAMESTATE="scoreBoard"
     scoreBoardSong.play();
     }
 
  }
 
 
 //---------------------------------------------------------------
 
 
 
 


 //ACTIVE GAME----------------------------------------------------------------------------
 if(GAMESTATE=="play"){
 
 
  player1.collide(ground);
  player1.collide(borderLeft);
  player1.collide(borderRight);
  player1.collide(platformGroup);
  //timer
  if(frameCount%1800==0){
    minutesSurvived+=1;
  }

  fill("black")
  textSize(20)
  text("Coins collected:",windowWidth/2 - 700, windowHeight/2 -300

  )
  fill("orange");
  textSize(30)
  text(score,windowWidth/2 -500,windowHeight/2 -300);


 //PLAYER CODE-------------------------------------------------------------------------------------------
 
 playerState=""
 
 
 //Player health
   fill("green");
	 textSize(20)
   text(player1Health,player1.x-15,player1.y-70);
   textSize(25)
   fill("black");
   text("▐ HP▐",player1.x-40,player1.y-90);
 
   //playerTimeSurvived
   fill("Black");
	 textSize(40)
   text(minutesSurvived,windowWidth/2,windowHeight/5);
   text("Minutes survived:",windowWidth/2 -140,windowHeight/7);
 
   //player lives
   fill("red");
	 textSize(40)
   text(player1Lives,player1.x,player1.y-110);

//PLAYER CONTROLS-----------------------------------------------------------------------------------------

//RIGHT 
 if(keyDown("d")){
  player1.x+= 15;
  player1.changeAnimation("runRight");
  if(keyDown("a")){
  player1.velocityX=0
  player1.changeAnimation("idleLeft");
  }
}
if(keyWentUp("d")){
  player1.x+=0;
  player1.changeAnimation("idleRight");
}
//LEFT
if(keyDown("a")){
 player1.x-=15;
 player1.changeAnimation("runLeft");
 if(keyDown("d")){
  player1.velocityX=0
  player1.changeAnimation("idleRight");
  }
}
if(keyWentUp("a")){
player1.x+=0;
player1.changeAnimation("idleLeft");
}

//UP


if(frameCount% 20 == 0){
   if(keyDown("w")){
      player1.velocityY-=60
      jumpSound.play();
   }
  
}






//player SHOOT
if(keyDown("f")){
 
  if(frameCount%15==0){
if(keyDown("a")){
bullet=createSprite(player1.x-30,player1.y,15,10);
bullet.shapeColor=("red")
bullet.velocityX-=40
shootSound.play();
bullet.lifetime=0.5;
bullets.add(bullet);
}
if(keyDown("d")){
  bullet=createSprite(player1.x+30,player1.y,15,10);
  bullet.velocityX+=40
  bullet.shapeColor=("red")
shootSound.play();
bullet.lifetime=0.5;
bullets.add(bullet);
  }
  
}
}

player1.velocityY+=5;


//PAUSE  INPUT
if(keyDown("p")){
  GAMESTATE="pause"
  gameSong.stop();
  pauseMenu.loop();
  }
 
 
  if(leftObjectGroup.bounceOff(player1)){
    leftObjectGroup.destroyEach();
    player1Health-=20;

    dmg.play();
  }
  if(rightObjectGroup.bounceOff(player1)){
    rightObjectGroup.destroyEach();
    player1Health-=20;
    dmg.play();
  }

  if(zombies.isTouching(player1)){
    player1Health-=20;
    player1.x += 30 
    dmg.play();

  }
  if(bullets.collide(zombies)){
    zombies.destroyEach();
    bullets.destroyEach();
    dmg.play();
  }
 
  
 if(player1.isTouching(coins)){
   coins.destroyEach();
   coinSound.play();
   score+=1;
 }

 if(player1.isTouching(oneups)){
    oneups.destroyEach();
    heal.play();
    player1Health += 50;
 }




  if(player1Lives==0){
  GAMESTATE="end"
  gameOver.play();
  gameSong.stop();
  }

  if(player1Health==0){
    player1Lives-=1
    player1Health=100
    }
    if(player1Health>100){
      player1Health = 100
    }
    



//END OF PLAYER STUFF-------------------------------------------------------------------





//spawnZombie();
//spawnObjectFromLeft();
//spawnObjectFromRight();
//spawnCoin();
//spawnHeal();

coins.collide(platformGroup);
coins.collide(ground)
oneups.collide(platformGroup)
oneups.collide(ground)
zombies.collide(ground)
zombies.collide(platformGroup)


if(frameCount%100 == 0){
  spawnZombie();
}

spawnCoin();
spawnHeal();
spawnObjectFromRight();

}


drawSprites()
}


function spawnObjectFromRight(){
  if(frameCount%50==0){
  var objectRight=createSprite(windowWidth+300,10,10)
  objectRight.y=random(300,windowHeight)
  objectRight.velocityX-=10;
  rightObjectGroup.add(objectRight);
  objectRight.lifetime=1000;
  objectRight.shapeColor=("red")
  }
}

function spawnObjectFromLeft(){
  if(frameCount%70==0){
  var objectLeft=createSprite(windowWidth-2000,10,10)
  objectLeft.y=random(300,windowHeight)
  objectLeft.velocityX+=10;
  leftObjectGroup.add(objectLeft);
  objectLeft.lifetime=1000;
  }
}



function spawnCoin(){
  if(frameCount%200==0){
  var coin=createSprite(windowWidth,0,5,5)
  coin.x=Math.round(random(0,windowWidth));
  coin.velocityY+=5;
  coin.scale=0.5;
  coin.addImage(coinImg)
  coin.lifetime=1000;
  coins.add(coin);
  }
}


function spawnHeal(){
  if(frameCount%500==0){
  var oneup=createSprite(windowWidth,0,5,5)
  oneup.x=Math.round(random(0,windowWidth));
  oneup.velocityY+=3;
  oneup.scale=0.5;
  oneup.addImage(oneUpimg)
  oneup.lifetime=1000;
  oneups.add(oneup);
  }
}


function spawnZombie(posX){
  
   
    var zombie=createSprite(posX,windowHeight/5,10,20,10)
    zombie.addAnimation("Zright",zombieRightAnimation);
    zombie.addAnimation("Zleft",zombieLeftAnimation);
    zombie.scale = 1.5
    zombie.lifetime = 1000;

    
    
    
   //zombie gravity
   zombie.velocityY +=60
   zombie.velocityX +=5
   zombies.add(zombie)
  
}
/*
function reset(){
  GAMESTATE="p"
}
*/