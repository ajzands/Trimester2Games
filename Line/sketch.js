time = 30
timer = 0
score = 0

function setup() {
  createCanvas(800, 600);
  colorMode(HSB);
  noStroke();
  var x = random(1,5);
  
  line1 = new Rect(0, 0, 50, 600, 251, x, 0, 800) 
  line2 = new Rect(19, 0, 12, 600, 196, x, 0, 819)
  line1.loopStyle = 0
  line2.loopStyle = 0


}

function draw() {
  background(220, 0, 50);
  line1.display();
  line2.display();

  var timestop = constrain(time, 0, 9000000)
  fill(0, 0, 100)
  textSize(24);
  text("Time: " + timestop, 690c, 25)

  fill(0, 0, 100)
  textSize(24);
  text("Score: " + score, 0, 25)

  if(time <= 0){
		fill(0, 0, 100)
		textSize(100);
		text("Game Over! ", 100, 300)

		fill(0, 0, 100)
		textSize(50);
		text("Press R to Restart ", 150, 350)

  }
  if(keyWentDown('R')) {
	time = 30
	score = 0
	console.log("You Restarted ")
}

}

function Rect(x, y, wt, ht, hu, vx = 0, vy = 0, tx = 0, ty = 0, loopStyle = 0 ) {
  var PINGPONG = 0
  var RESET = 1
  this.pos = createVector(x, y);
  this.chapos = createVector(vx, vy);
  this.initpos = createVector(x, y);
  this.currpos = this.initpos.copy();
  this.tarpos = createVector(tx, ty);
  this.inittarpos = this.tarpos.copy();
  this.wt = wt 
  this.ht = ht
  this.hu = hu
  this.sat = 80
  this.br = 80
  this.currhu = hu
  this.path = [this.tarpos.copy(), this.initpos.copy()]
  this.pathStopCounter = 0;
  this.loopStyle = PINGPONG

  
  
  this.update = function(){
  
  
   var distance = this.currpos.dist(this.tarpos); 
    
    if(this.loopStyle == PINGPONG) {
    		//print(distance);
    		if(distance > 3){
      		this.currpos.add(this.chapos)
      	//don't update
    		} else {
    		//This is the Reset Loop behavior
  			//this.currpos = this.initpos.copy();
    		//This is the Reverse Loop behavior
    		this.pathStopCounter += 1;
    		this.tarpos = this.path[this.pathStopCounter % 2]
      	this.chapos.mult(-1);
    	}
  }
    
   	if(this.loopStyle == RESET){
    	if(distance > 3){
    	this.currpos.add(this.chapos)
		}	else {
      this.currpos = this.initpos.copy();
		}	  	
	} 
}    
   
    this.display = function(){
    this.update();
    fill(this.currhu, this.sat, this.br);
   	rect(this.currpos.x, this.currpos.y, this.wt, this.ht);
	}
}

window.setInterval(function(){
	time -= 1

}, 1000)
 
function mouseClicked(){
  if(line1.currpos.x <= mouseX && mouseX <= (line1.currpos.x + line1.wt)){
  	if(line1.currpos.y <= mouseY && mouseY <= (line1.currpos.y + line1.ht)){
  	console.log("You clicked line 1 ")
  	score += 1
  	time += 2
  	} else {
  		time -= 1
  	} 
  }
  	else {
  		time -= 1
  	}
  

  if(line2.currpos.x <= mouseX && mouseX <= (line2.currpos.x + line2.wt)){
  	if(line2.currpos.y <= mouseY && mouseY <= (line2.currpos.y + line2.ht)){
  	console.log("You clicked line 2 ")
  	score += 2
  	time += 3
	} else {
		time -= 2
	}
  }
  else {
  	time -= 2
  }
}
