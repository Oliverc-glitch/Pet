//Create variables here
var dog, database, foodS;
var fedTime, lastFed;
var feed, addfood;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("Dog.png");
  dogImage2 = loadImage("happyDog.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1000, 500);

  
  dog = createSprite(250, 350, 10, 10);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  feed = createButton("Feed the dog");
  feed.position(650, 95);
  feed.mousePressed(feedDog);

  addfood = createButton("Add food");
  addfood.position(750, 95);
  addfood.mousePressed(addFood);

   foodObj = new Food();

   fedTime = database.ref('FeedTime');
   fedTime.on("value", function(data){
     lastFed = data.val();
   })
}


function draw() {  
  background("white");
  
  foodObj.getFoodStock();
  foodObj.display(foodS);

  drawSprites();

 
  strokeWeight(3);
  stroke("black");
  textSize(20);
  fill("white");
  text("Food Remaining : " + foodS, 150,150);
  text("Note : ", 475, 50);
  text(" Press Down_ARROW key to put Drago to sleep", 475, 100);

  if(lastFed > 12){
    text(" Last Fed : " + lastFed%12 + " P.M", 300, 30);
  }else if(lastFed == 0){
    text("Last Fed : 12 A.M", 300, 30);
  }else{
    text("Last Fed : " + lastFed +  " A.M", 300, 30);
  }

}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if(x <= 0) {
    x = 0;
  }
  else
  {
    x = x - 1;
  }

  database.ref('/').update({
    Food : x
  })
}

function feedDog() {
  dog.addImage(dogImage2);

  foodObj.updateFoodStock(foodS - 1);
  database.ref('/').update({
      FeedTime : hour()
  })
}

function addFood() {
    foodS++;
    database.ref('/').update({
        Food : foodS
    })
}


