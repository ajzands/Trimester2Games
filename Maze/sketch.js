var character, hwall, vwall, start, end
var walls
var maxspeed = 10;
score = 0
lives = 3
death = false;
var rows = 5;
var columns = 5;
var grid_w = 100;
var grid_h = 100;
var grid_margin = 0;
var level = [["h", "h", "v", 0, "s"],["v", 0, "h", 0, "v"],["h", "v", 0, "h", 0],["h", 0, 0, "h", "v"],["g", "v", 0, "h", 0]]
var currlevel = 1;
function setup(){
	createCanvas(800, 600);	
	noStroke();
	colorMode(HSB);
	drawGrid();

	character = createSprite(start.position.x, start.position.y, grid_w/5, grid_h/5);
	character.shapeColor = color(150, 100, 60)

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

	}

	if(keyWentDown("r")){
		lives = 3
		character.position.x = start.position.x
		character.position.y = start.position.y

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
	}

	if(keyWentDown("p")){
		lives -= 2
		character.position.x = start.position.x
		character.position.y = start.position.y
	}

	fill(0, 0, 0)
	textSize(25)
	text("Lives: " + lives, 0, 25)

}


function wallHit(character, hwall, vwall){
	lives -= 1
	character.position.x = start.position.x
	character.position.y = start.position.y
	character.velocity.x = 0
	character.velocity.y = 0

}

function endHit(character, goal){
	lives = 5
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

	for(var i = 0; i<rows; i++){
		for(var j = 0; j<columns; j++){
			var currvalue = level[i][j]
				if(currvalue == "h"){
					hwall = "h";
				hwall = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/1, 20)
					fill(0, 100, 100)
					ellipse(grid_w * j + offsetX, grid_h * i + offsetY, 5, 5);
					hwall.shapeColor = color(0, 0, 0)
					walls.add(hwall)
			} 
				if(currvalue == "v"){
					vwall = "v";
					vwall = createSprite(grid_w * j + offsetX, grid_h * i + offsetY,  20, grid_h/1)
					fill(0, 100, 100)
					ellipse(grid_w * j + offsetX, grid_h * i + offsetY, 5, 5);
					vwall.shapeColor = color(0, 0, 0)
					walls.add(vwall)
			}	

				if(currvalue == "s"){
					start = "s";
					start = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/2, grid_w/2)
					start.shapeColor = color(180, 100, 100)
			}

				if(currvalue == "g"){
					goal = "g";
					goal = createSprite(grid_w * j + offsetX, grid_h * i + offsetY, grid_w/2, grid_h/2)
					goal.shapeColor = color(0, 100, 100)
				}

		}
	}
}

function characterupdate(){

	character.position.x = constrain(character.position.x, 160, 640)
	character.position.y = constrain(character.position.y, 40, 520)

	if(keyWentDown("a") || keyWentDown(LEFT_ARROW)){
		character.velocity.x -= .5
		character.position.x += character.velocity.x
	}

	if(keyWentDown("d") || keyWentDown(RIGHT_ARROW)){
		character.velocity.x += .5
		character.position.x += character.velocity.x
	}

	if(keyWentDown("s") || keyWentDown(DOWN_ARROW)){
		character.velocity.y += .5
		character.position.y += character.velocity.y
	}

	if(keyWentDown("w") || keyWentDown(UP_ARROW)){
		character.velocity.y -= .5
		character.position.y += character.velocity.y
	}


}

function update(){
	//Check Collisions 
	character.collide(walls, wallHit)
	character.collide(goal, endHit)
	//Check Death
	death = lives == 0
	win = lives == 5

}

