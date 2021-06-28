var dog, dogJump, dogRun, dogSlide, dogDead, dogEnd;
var birds,birdFly;
var invisibleground;
var alienbackground, backgroundImg;
var stoneImg,stoneImg2,randomstone,stones;
var score = 0;
var randommon;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
    backgroundImg = loadImage("background0.png");

    dogJump = loadAnimation("Jump (1).png", "Jump (2).png", "Jump (3).png", "Jump (4).png", "Jump (5).png", "Jump (6).png", "Jump (7).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png", "Jump (8).png");
    dogRun = loadAnimation("Run (1).png", "Run (2).png", "Run (3).png", "Run (4).png", "Run (5).png", "Run (6).png", "Run (7).png", "Run (8).png");
    dogSlide = loadAnimation("Slide (1).png", "Slide (2).png", "Slide (3).png", "Slide (4).png", "Slide (5).png", "Slide (6).png", "Slide (7).png", "Slide (8).png","Slide (9).png", "Slide (10).png" );
    dogDead = loadAnimation("Dead (1).png", "Dead (2).png", "Dead (3).png", "Dead (4).png", "Dead (5).png", "Dead (6).png", "Dead (7).png", "Dead (8).png", "Dead (9).png", "Dead (10).png");
    dogEnd = loadAnimation("Dead (10).png");

    birdFly = loadAnimation("bird1-removebg-preview.png", "bird2-removebg-preview.png", "bird3-removebg-preview.png", "bird4-removebg-preview.png", "bird5-removebg-preview.png", "bird6-removebg-preview.png", "bird7-removebg-preview.png", "bird8-removebg-preview.png", "bird7-removebg-preview.png", "bird6-removebg-preview.png", "bird5-removebg-preview.png", "bird4-removebg-preview.png", "bird3-removebg-preview.png", "bird2-removebg-preview.png", "bird1-removebg-preview.png")
    
    stoneImg = loadImage("stone.png");
    stoneImg2 = loadImage("stone2.png");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    alienbackground = createSprite(width/2,height/2,10,10);
    alienbackground.addImage(backgroundImg);
    alienbackground.scale = 3;

    dog = createSprite(70,height-120,10,10);
    dog.addAnimation("jump",dogJump);
    dog.addAnimation("run",dogRun);
    dog.addAnimation("slide",dogSlide);
    dog.addAnimation("dead",dogDead);
    dog.addAnimation("end",dogEnd);

    dog.scale = 0.25;
    dog.setCollider("rectangle",10,10,300,450);

    invisibleground = createSprite(70,height-45,150,10);
    invisibleground.visible = false;

    stones = createGroup();
    birds = createGroup();
}

function draw() {
    background("white");
    drawSprites();
    dog.collide(invisibleground);

    if (gameState == PLAY){
        dog.changeAnimation("run");
        dog.setCollider("rectangle",10,10,300,450);

        fill(0);
        textSize(20);
        text("Score: " + score,10,20)

        dog.velocityY += 1;
        alienbackground.velocityX = -10;
        if (alienbackground.x < 300){
            alienbackground.x = alienbackground.width;
        }

        if((keyWentDown("space") || keyWentDown("up")) && dog.y>height-120){
            dog.velocityY -=18;
        }
        if(dog.y<height-120){
            dog.changeAnimation("jump");
            dog.setCollider("rectangle",10,10,300,400);
        }
        if(keyDown("down")){
            dog.changeAnimation("slide");
            dog.setCollider("rectangle",-70,50,320,350);
        }

        if(frameCount % 120 == 0){
            randommon = Math.round(random(1,2));

            if (randommon == 1){
                createstone();
            }
            else{
                createbird();
            }
        }

        if (dog.isTouching(stones) || dog.isTouching(birds)){
            dog.changeAnimation("dead");

            gameState = END;
        }

        score++;
    }
    else{
        dog.changeAnimation("end");
        dog.velocityY +=1;

        stones.setVelocityXEach(0);
        stones.setLifetimeEach(-1);

        birds.setVelocityXEach(0);
        birds.setLifetimeEach(-1);

        alienbackground.velocityX = 0;
        textSize(50);
        fill(0);
        text("GAME OVER",width/2-150,height/4);

        textSize(25);
        text("SCORE: " + score,width/2-90,height/4+100)
        text("Press R to Reset",width/2-90,height/4+150)

        textSize(10);

        if (keyWentDown("space") || keyWentDown("up") || keyWentDown("R")){
            reset();
        }
    }
}

function createstone(){
    var stone = createSprite(width+50,height-120,10,10);
    stone.lifetime = 1000;
    stone.velocityX = -10;

    randomstone = Math.round(random(1,2));

    if (randomstone == 1){
        stone.addImage(stoneImg);
        stone.scale = 0.2;
        stone.y = height-75;
    }
    else{
        stone.addImage(stoneImg2);
        stone.scale = 0.05;
        stone.setCollider("circle",0,0,1100);
        stone.y = height-100;
    }

    stones.add(stone);
    dog.depth = stone.depth + 1;
}

function createbird(){
    var bird = createSprite(width+50,height-180,10,10);
    bird.lifetime = 1000;
    bird.addAnimation("fly",birdFly);
    bird.scale = 0.5;
    bird.velocityX = -12;
    
    birds.add(bird);
    dog.depth = bird.depth + 1;
}

function reset(){
    frameCount = 0;
    stones.destroyEach();
    birds.destroyEach();
    alienbackground.x = width/2;
    gameState = PLAY;
}