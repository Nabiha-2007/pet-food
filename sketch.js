var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
var backImage;

function preload(){
backImage = loadImage("farm.jpg")
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");

}

function setup() {
  database=firebase.database();

  createCanvas(1000,670);
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(790,380);
  dog.addImage(sadDog);
  dog.scale=0.20;
  
  //Uncomment the correct code to create 
  feed=createButton("Feed the dog");
  feed.position(950,95);
  //Uncomment the correct code to call FeedDog() using mousePressed
  feed.mousePressed(feedDog);
  
  addFood=createButton("Add Food");
  addFood.position(870,95);
  addFood.mousePressed(addFoods);

}

function draw() {

 
  background(backImage);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);

  if(lastFed>=12){
    fill(0, 43, 108)
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
    fill(0, 43, 108)
     text("Last Feed : 12 AM",350,30);
   }else{
    fill(0, 43, 108)
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
   
  
  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
      foodObj.updateFoodStock(food_stock_val -1);
  }
  
  //Uncomment correct code block to update food quantity and fed timing
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}