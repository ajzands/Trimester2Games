var ball, paddle, wallTop, wallBottom, wallLeft, wallRight
var bricks;
var maxspeed = 10;
var wall_thickness = 30;
var brick_w = 40;
var brick_h = 20;
var brick_margin = 4;
var rows = 9;
var columns = 16;
score = 0
lives = 3

function setup() {
	createCanvas(800, 600);
	noStroke();
	colorMode(HSB);
	drawBricks();

	paddle = createSprite(width/2, height-50, 200, 10);
	paddle.immovable = true;

	wallLeft = createSprite(-15, height/2, wall_thickness, height);
	wallLeft.immovable = true;

	wallRight = createSprite(width+wall_thickness/2, height/2, wall_thickness, height);
	wallRight.immovable = true;

	wallTop = createSprite(width/2, -15, width+wall_thickness*2, wall_thickness);
	wallTop.immovable = true;

 	wallBottom = createSprite(width/2, height+wall_thickness/2, width+wall_thickness*2, wall_thickness);
 	wallBottom.immovable = true;


	ball = createSprite(width/2, height-200, 12, 12);
	ball.maxSpeed = maxspeed;
	paddle.shapeColor = ball.shapeColor = color(0, 0, 0);

}


function draw(){
	background(189, 80, 100);

	paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);

	ball.bounce(wallTop);
	ball.bounce(wallLeft);
	ball.bounce(wallRight);
	if(ball.bounce(wallBottom)){
		lives -= 1
	}

	if(ball.bounce(paddle))
	{
	var swing = (ball.position.x-paddle.position.x)/3;
		ball.setSpeed(maxspeed, ball.getDirection()+swing);
	}

	ball.bounce(bricks, brickHit)

	drawSprites();

	fill(0, 0, 0)
	textSize(24);
	text("Score: " + score, 0, 25)


	if(lives <= 0){
		lives = 0
		fill(0, 0, 0)
		textSize(100)
		text("Game Over! ", 100, 400)
		ball.setSpeed(0, 0, 0)
		fill(0, 0, 0)
		textSize(50)
		text("Press R to Restart ", 150, 450)

	}

	fill(0, 0, 0)
	textSize(24);
	text("Lives Remaining: " + lives, 275, 25)

		if(keyWentDown('R')){
		score = 0
		lives = 3
		ball.position.x = width/2
		ball.position.y = height-200
		bricks.removeSprites(bricks);
		drawBricks();
	}


	if(score >= 432){
		fill(0, 0, 0)
		textSize(100)
		text("You Win! ", 200, 400)
		ball.setSpeed(0, 0, 0)
		fill(0, 0, 0)
		textSize(50)
		text("Press W to play again", 150, 450)
	}

	if(keyWentDown('W')){
		score = 0
		lives = 3
		ball.position.x = width/2
		ball.position.y = height-200
		bricks.removeSprites(bricks);
		drawBricks();
	}

	if(keyWentDown('F')){
		ball.position.x = width/2
		ball.position.y = height-200
		ball.velocity.x = 0
		ball.velocity.y = 0
	}

}

function mousePressed() {
 if(ball.velocity.x == 0 && ball.velocity.y == 0)
 	ball.setSpeed(maxspeed, random(90-10, 90+10));
}

function brickHit(ball, brick) {
  score += 3
  brick.remove();
}

function drawBricks(){

	 		bricks = new Group();

	var offsetX = width/2-(columns-1)*(brick_margin+brick_w)/2;
	var offsetY = 80;

	for(var r = 0; r<rows; r++){
		for(var c = 0; c<columns; c++){
			var brick = createSprite(offsetX+c*(brick_w+brick_margin), offsetY+r*(brick_h+brick_margin), brick_w, brick_h)
			brick.shapeColor = color(0, 0, 0)
			bricks.add(brick)
			brick.immovable = true;
		}
	}

}