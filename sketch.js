//Create variables here
var dog, happyDog, database, foodS, foodStock;
function preload()
{
  //load images here
  
  happyDogI = loadImage('images/dogImg.png');
  hungryDogI = loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(550, 550);
  Dog = createSprite(250,250,50,50);
  feed = createButton('Feed the Dog');
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton('Add Food');
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  Dog.addImage(hungryDogI);
  Dog.scale = (0.2)
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock)
}


function draw() {  
background(46,139,87)
if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  Dog.addImage(happyDogI);
  Dog.scale = (0.2)
}
 fill(255,255,254);
 textSize(15);
 /*if(lastFed>=12){
   text("Last Fed : "+lastFed%12+"PM",350,30);
 }
else if(lastFed ==0){
  text('LastFed : 12 AM', 350,30)
}
else{
  text('Last Fed: '+lastFed+"AM",350,30);
}*/
 drawSprites();
  text('Note: Press the button to feed the dog some milk!', 50, 100)
  //add styles here

}
function readStock(data){
foodS = data.val();
}
function writeStock(x){
  database.ref("/").update({
    Food:x
  })
}
function feedDog(){
  foodS = foodS-1
  Dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food1:foodObj.getFoodStock(),
    FeedTime:hour(),
    Food:foodS

  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })  
}