/* =============================================================================
PLANNING TO REWRITE WITH REACT STATE
============================================================================= */

import React, { Component } from 'react';
import './css/snake.css';

//Variable to hold the entire game context
var context;
//Specifying the width and height of our game area
var width = 480;
var height = 360;
//Specify the initial game configuration
var snakeLength = 3;
var level = 1;
var squareSize = 10;
//Array to manage X coordinates for snake body
var bodyX = new Array(150, 150-squareSize, 150-2*squareSize);
//Array to manage Y coordinates for snake body
var bodyY = new Array(200, 200, 200);
//Array to manage horizontal velocity for snake body
var vX = new Array(1, 1, 1);
//Array to manage vertical velocity for snake body
var vY = new Array(0, 0, 0);
//Variables used to place strawberries on the canvas
var strawberryX;
var strawberryY;
//Variable holding the score, will be used to update document each time strawberry is eaten, also added to high score table when game is over
var score = 0;
//Variables holding the sounds for the game
var chomp = new Audio("/assets/sounds/chomp.wav");
var pop = new Audio("/assets/sounds/pop.wav");
var gameOverSound = new Audio("/assets/sounds/gameover.wav");
//To hold the context of div used to display score and level
var scoreDiv;
var restartDiv;
//To check if new Strawberry needs to be placed
var eaten = true;
//To check if the game is over and enable control to restart the game
var gameOver = false;
//To check if 'play' button has been pressed before
var buttonPressed = false;
var intervalId;



class Snake extends Component {
  constructor(props) {
    super(props);
    this.handleStart = this.handleStart.bind(this);
  }
  componentDidMount() {
    const canvas = this.refs.canvas1;
    context = canvas.getContext("2d");
    this.drawCanvasBoundary();
  }

  //INITIALISE CANVAS
  drawCanvasBoundary() {
    context.fillStyle="#ffffff";
    context.fillRect(0,0,width,height);
    context.fill();
    context.strokeStyle="#000000";
    context.strokeRect(0,0,width,height)
  }

  //GAME FUNCTIONS
  drawPoint(x,y) {
    context.fillStyle = "#df752d";
    context.fillRect(x,y,squareSize, squareSize);
    context.fill();
    context.strokeStyle="#000000";
    context.strokeRect(x,y,squareSize, squareSize);
  }
  drawSnake() {
    for(var i=0; i < snakeLength; i++)
      this.drawPoint(bodyX[i],bodyY[i]);
  }
  moveSnake() {
    for(var i=0; i < snakeLength; i++) {
      bodyX[i] += (vX[i]*squareSize);
      bodyY[i] += (vY[i]*squareSize);
      //add sound for movement here if required
      //pop.play();
    }
    for(var i=snakeLength-1; i>0; i--) {
      vX[i] = vX[i-1];
      vY[i] = vY[i-1];
    }
    this.eatStrawberry();
  }
  placeStrawberry() {
    if(eaten) {
        strawberryX = Math.floor(width*Math.random()/squareSize)*squareSize;
        strawberryY = Math.floor(height*Math.random()/squareSize)*squareSize;
        if(this.checkFoodCollision(strawberryX,strawberryY)) {
          this.placeStrawberry();
        }
        else {
            eaten = false;
          }
    }
    var strawberryImg = new Image();
    strawberryImg.src="/assets/images/game/strawberry.png";
    context.drawImage(strawberryImg, strawberryX, strawberryY);
  }
  checkCollision() {
    if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height) {
      gameOverSound.play();
      alert("Game Over --- Score: " + score + " Level: " + level);
      restartDiv.innerHTML = "<p>Press \"Enter\" to try again</p>";
      //submitScore();
      gameOver = true;
      clearTimeout(intervalId);
    }
    else if(snakeLength > 4) {
      if(this.checkSelfCollision(bodyX[0],bodyY[0])) {
          gameOverSound.play();
          alert("Game Over --- Score: " + score + " Level: " + level);
          restartDiv.innerHTML = "Press \"Enter\" to restart";
          //submitScore();
          gameOver = true;
          clearTimeout(intervalId);
        }
    }
  }
  checkSelfCollision(x, y) {
    for (var i = 4; i < snakeLength; i++) {
        if(x == bodyX[i] && y == bodyY[i]) {
          return true;
        }
      return false;
      }
  }
  checkFoodCollision(x, y) {
    for (var i = 0; i < snakeLength; i++) {
        if(x == bodyX[i] && y == bodyY[i]) {
          return true;
        }
      return false;
    }
  }
  eatStrawberry() {
    if(bodyX[0] == strawberryX && bodyY[0] == strawberryY) {
      eaten = true;
      var newX = bodyX[snakeLength-1] - vX[snakeLength-1]*squareSize;
      var newY = bodyY[snakeLength-1] -vY[snakeLength-1]*squareSize;
      bodyX.push(newX);
      bodyY.push(newY);
      vX.push(vX[snakeLength-1]);
      vY.push(vY[snakeLength-1]);
      snakeLength++;
      score += 10;
      chomp.play();
      if((score%100) == 0) {
        level++;
      }
      scoreDiv.innerHTML = "Score: " + score + "     Level: " + level;
    }
  }
  keydown(e) {
    if(e.keyCode == 65 && vX[0] != 1) {
      vX[0] = -1;
      vY[0] = 0;
    }
    else if (e.keyCode == 87 && vY[0] != 1) {
      vY[0] = -1;
      vX[0] = 0;
    }
    else if (e.keyCode == 68 && vX[0] != -1) {
      vX[0] = 1;
      vY[0] = 0;
    }
    else if (e.keyCode == 83 && vY[0] != -1) {
      vY[0] = 1;
      vX[0] = 0;
    }
    else if (e.keyCode == 13 && gameOver == true) {
      gameOver = false;
      clearTimeout(intervalId);
      this.restart();
    }
  }
  /*
   submitScore()
  {
    var name = prompt("Enter your name and click ok to submit your score to the leader board","");
    if (name != null && name != "")
    {
      $.post("save.php", { name: name, score: score, level: level});
    }
  }
  */
  restart() {
    bodyX = new Array(150, 150 - squareSize, 150 - 2 * squareSize);
    bodyY = new Array(200, 200, 200);
    vX = new Array(1, 1, 1);
    vY = new Array(0, 0, 0);
    snakeLength = 3;
    score = 0;
    level  = 1;
    eaten = true;
    scoreDiv.innerHTML = "Score: " + score + "    Level: " + level;
    restartDiv.innerHTML = "";
    intervalId = setInterval(this.gameProcess, 1000/6);
  }
  clearCanvas() {
    context.clearRect(0,0,width,height);
  }
  gameProcess() {
    intervalId = setInterval(this.gameProcess, 1000/(6*level));
      this.clearCanvas();
      this.drawCanvasBoundary();
      this.placeStrawberry();
      this.moveSnake();
      this.checkCollision();
      this.drawSnake();
  }
  //Initialise the game variables and the game context and then sends the game to the main game loop
  init() {
    this.drawSnake();
    intervalId = setInterval(this.gameProcess, 1000/6);
    scoreDiv = document.getElementById("snake-score");
    restartDiv = document.getElementById("snake-restart");
    window.onkeydown = this.keydown;
  }
  runGame() {
    //call initialisation function when 'play' button is clicked on snake page
    this.init();
  }
  //END OF GAME FUNCTIONS


  //BUTTON TO START GAME
  handleStart() {
    if (!buttonPressed) {
      this.runGame();
      buttonPressed = true;
    } else {
      clearTimeout(intervalId);
      this.restart();
    }
  }

  render() {
    return (
      <div id="snake-main">
        <div id="snake-score">
          Score: 0    Level: 1
        </div>
        <div id="snake-restart"></div>
        <canvas ref="canvas1" width="480" height="360">
          Unfortunately your browser does not support the Canvas element
        </canvas>
        <div>
          <button id="snake-button" onClick={this.handleStart}>Play</button>
          <p>Controls:</p>
          <p>Snake Movement: W = Up | S = Down | A = Left | D = Right</p>
        </div>
      </div>
    );
  }
}

export default Snake;
