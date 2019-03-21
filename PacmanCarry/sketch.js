var character, hwall, vwall, start, goal, coin
var walls
var maxspeed = 10;
var coingroup
score = 0
lives = 3
coins = 0
death = false;
var rows = 10;
var columns = 15;
var grid_w = 30;
var grid_h = 50;
var grid_margin = 0;
var level = [["s", "h", "h", "h", "v", "c", "v", "c", "v", "h", "h", "h", "h", "v", "c"],[0,"c",0, "h", "h", "c", "v", "c", "v", "c", "h", "h", "h", "v", "c"],["v", "h", "c", 0, 0, 0, "v", "c", 0, "c", 0, 0, "v", 0, 0],["h", "h", "h", "v", 0, "c", 0, "h", "h", "h", 0, "c", "v", "c", "v"],["c", 0, "c", "v", 0, 0, "h", "c", "c", "h", 0, 0 , "h", 0, "v"],["h", 0, "v", "v", "c", "c", 0, 0, "c", "v", 0, "c", "h", 0, 0],["v", 0, 0, "h", "h", 0, 0, 0, 0, "v", 0, "c", 0, 0, "g"],["v", "c", 0, 0, "v", 0, 0, 0, 0, "c", 0, 0, "v", 0, 0],["v", "c", "c", 0, "h", "h", "h", 0, "c", "c", 0, "h", 0, 0, "v"],["v", 0, 0, 0, 0, 0, 0, 0, "h", 0, 0 , 0, 0, 0, "v"]]


function preload() {
 Oof = loadSound('sounds/oof.mp3');
 Chaching = loadSound('sounds/chaching.mp3')
 Smash = loadSound('sounds/smash.mp3')
 Bigdub = loadSound('sounds/bigdub.mp3')
}


function setup(){
	createCanvas(800, 600);	
	noStroke();
	colorMode(HSB);
	drawGrid();

	character = createSprite(start.position.x, start.position.y, grid_w/2, grid_h/2);
	character.shapeColor = color(283,71,100)

}

function draw(){
	update();
	background(0, 0, 60)
		drawSprites();
		//drawGrid();
	characterupdate();


	if(death){
		character.position.x = start.position.x
		character.position.y = start.position.y
		character.velocity.x = 0
		character.velocity.y = 0
		fill(0, 0, 100)
		rect(0, 0, 800, 800)
		fill(0, 0, 0)
		textSize(50)
		text("Game Over, Press R to Restart" , 100, 400)
		Oof.setVolume(0.3);
		Oof.play();

	}

	if(score == 29){
		lives = 5
	}

	if(keyWentDown("r")){
		score = 0
		coins = 0
		lives = 3
		character.position.x = start.position.x
		character.position.y = start.position.y
		character.velocity.x = 0
		character.velocity.y = 0
		grids.removeSprites(grids);
		walls.removeSprites(walls);
		coingroup.removeSprites(coingroup);
		drawGrid();
		character.remove();
		character = createSprite(start.position.x, start.position.y, grid_w/2, grid_h/2);
		character.shapeColor = color(283,71,100)


	}

	if(win){
		character.position.x = start.position.x
		character.position.y = start.position.y
		character.velocity.x = 0
		character.velocity.y = 0
		fill(0, 0, 100)
		rect(0, 0, 800, 800)
		fill(0, 0, 0)
		textSize(50)
		text("You Win, Press P to Play Again" , 50, 400)
		Bigdub.setVolume(0.3);
		Bigdub.play();
	}

	if(keyWentDown("p")){
		score = 0
		coins = 0
		lives -= 2
		character.position.x = start.position.x
		character.position.y = start.position.y
		grids.removeSprites(grids);
		walls.removeSprites(walls);
		coingroup.removeSprites(coingroup);
		drawGrid();
		character.remove();
		character = createSprite(start.position.x, start.position.y, grid_w/2, grid_h/2);
		character.shapeColor = color(283,71,100)
	}

	fill(0, 0, 0)
	textSize(25)
	text("Lives: " + lives, 0, 25)

	fill(0, 0, 0)
	textSize(25)
	text("Coins: " + coins, 175, 25)

	fill(0, 0, 0)
	textSize(25)
	text("Score: " + score, 530, 25)

}


function wallHit(character, hwall, vwall){
	lives -= 1
	character.position.x = start.position.x
	character.position.y = start.position.y
	character.velocity.x = 0
	character.velocity.y = 0
	Smash.play();
}

function endHit(character, goal){
	console.log("Deposit")
	score += coins
	coins = 0
}

character.overlap(coins, cointHit)

function coinHit(character, coin){
	coin.remove()
	coins += 1
	Chaching.setVolume(0.3);
	Chaching.play();
	console.log("You hit a coin")
}

function drawGrid(){

		grids = new Group();

	var offsetX = width/2-(columns-1)*(grid_margin+grid_w)/2;
	var offsetY = 80;

	for(var r = 0; r<rows; r++){
		for(var c = 0; c<columns; c++){
			var grid = createSprite(offsetX+c*(grid_w+grid_margin), offsetY+r*(grid_h+grid_margin), grid_w, grid_h)
			grid.shapeColor = color(0, 0, 100)
			grids.add(grid)

		}
	}

		walls = new Group();

		coingroup = new Group();


	for(var i = 0; i<rows; i++){
		for(var j = 0; j<columns; j++){
			var currvalue = level[i][j]
				if(currvalue == "h"){
					hwall = "h";
				hwall = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/1, 20)
					fill(0, 100, 100)
					hwall.shapeColor = color(0, 0, 0)
					walls.add(hwall)
			} 
				if(currvalue == "v"){
					vwall = "v";
					vwall = createSprite(grid_w * j + offsetX, grid_h * i + offsetY,  20, grid_h/1)
					fill(0, 100, 100)
					vwall.shapeColor = color(0, 0, 0)
					walls.add(vwall)
			}	

				if(currvalue == "s"){
					start = "s";
					start = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/1, grid_h/1)
					start.shapeColor = color(180, 100, 100)
			}

				if(currvalue == "g"){
					goal = "g";
					goal = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/1, grid_h/1)
					goal.shapeColor = color(140, 100, 100)
				}

				if(currvalue == "c"){
					coin = "c";
					coin = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/4, grid_h/4) 
					coin.shapeColor = color(43, 71, 100)
					coingroup.add(coin)
					coin.mycolumn = level[j]
					coin.myrow = level[i]
					coin.hit = false;

				}

		}
	}
}

function characterupdate(){

	character.position.x = constrain(character.position.x, 175, 620)
	character.position.y = constrain(character.position.y, 55, 550)

	if(keyWentDown("a") || keyWentDown(LEFT_ARROW)){
		character.velocity.x -= .25
		character.position.x += character.velocity.x
	}

	if(keyWentDown("d") || keyWentDown(RIGHT_ARROW)){
		character.velocity.x += .25
		character.position.x += character.velocity.x
	}

	if(keyWentDown("s") || keyWentDown(DOWN_ARROW)){
		character.velocity.y += .25
		character.position.y += character.velocity.y
	}

	if(keyWentDown("w") || keyWentDown(UP_ARROW)){
		character.velocity.y -= .25
		character.position.y += character.velocity.y
	}


}
  function update(){
	//Check Collisions 
	character.collide(walls, wallHit)
	character.collide(goal, endHit)
	character.collide(coingroup, coinHit)
	//Check Death
	death = lives == 0
	win = lives == 5
	//Change Grid


 }
