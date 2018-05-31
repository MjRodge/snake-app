

drawCanvasBoundary() {
  context.fillStyle="#ffffff";
  context.fillRect(0,0,width,height);
  context.fill();

  context.strokeStyle="#000000";

  context.strokeRect(0,0,width,height)
}


drawPoint(x,y) {
  context.fillStyle = "#df752d";
  context.fillRect(x,y,squareSize, squareSize);
  context.fill();
  context.strokeStyle="#000000";
  context.strokeRect(x,y,squareSize, squareSize);
}

drawSnake() {
  for(var i=0; i < snakeLength; i++)
    drawPoint(bodyX[i],bodyY[i]);
}

moveSnake() {
  for(var i=0; i < snakeLength; i++)
  {
    bodyX[i] += (vX[i]*squareSize);
    bodyY[i] += (vY[i]*squareSize);

    //Pop sounds horrible as a move noise, will try find something more suitable, else leave it out completely
    //pop.play();
  }
  for(var i=snakeLength-1; i>0; i--)
  {
    vX[i] = vX[i-1];
    vY[i] = vY[i-1];
  }
  eatStrawberry();
}

placeStrawberry() {
  if(eaten)
  {
      strawberryX = Math.floor(width*Math.random()/squareSize)*squareSize;
      strawberryY = Math.floor(height*Math.random()/squareSize)*squareSize;
      if(checkFoodCollision(strawberryX,strawberryY))
      {
        placeStrawberry();
      }
      else
      {
          eaten = false;
        }
  }
  var strawberryImg = new Image();
  strawberryImg.src="/portfolio/snake/images/game/strawberry.png";
  context.drawImage(strawberryImg, strawberryX, strawberryY);
}

checkCollision() {
  if(bodyX[0] >= width || bodyX[0] < 0 || bodyY[0] < 0 || bodyY[0] >= height)
  {
    gameOverSound.play();
    alert("Game Over --- Score: " + score + " Level: " + level);
    restartDiv.innerHTML = "<p>Press \"Enter\" to try again</p>";
    //submitScore();
    gameOver = true;
    clearTimeout(intervalId);
  }
  else if(snakeLength > 4)
  {
    if(checkSelfCollision(bodyX[0],bodyY[0]))
      {
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
  for (var i = 4; i < snakeLength; i++)
  {
      if(x == bodyX[i] && y == bodyY[i])
      {
        return true;
      }
    return false;
    }
}

checkFoodCollision(x, y) {
  for (var i = 0; i < snakeLength; i++)
  {
      if(x == bodyX[i] && y == bodyY[i])
      {
        return true;
      }
    return false;
  }
}

eatStrawberry() {
  if(bodyX[0] == strawberryX && bodyY[0] == strawberryY)
  {
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

    if((score%100) == 0)
    {
      level++;
    }

        scoreDiv.innerHTML = "Score: " + score + "     Level: " + level;
  }
}


keydown(e) {
    if(e.keyCode == 65 && vX[0] != 1)
    {
    vX[0] = -1;
    vY[0] = 0;
  }
  else if (e.keyCode == 87 && vY[0] != 1)
  {
      vY[0] = -1;
    vX[0] = 0;
    }
  else if (e.keyCode == 68 && vX[0] != -1)
  {
    vX[0] = 1;
    vY[0] = 0;
  }
  else if (e.keyCode == 83 && vY[0] != -1)
  {
    vY[0] = 1;
    vX[0] = 0;
  }
  else if (e.keyCode == 13 && gameOver == true)
  {
    gameOver = false;
    clearTimeout(intervalId);
    restart();
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

  intervalId = setTimeout(gameProcess, 1000/6);
}


gameProcess() {
  intervalId = setTimeout(gameProcess, 1000/(6*level));
    clear();
    drawCanvasBoundary();
    placeStrawberry();
    moveSnake();
    checkCollision();
    drawSnake();
}

clear() {
  context.clearRect(0,0,width,height);
}

//Initialise the game variables and the game context and then sends the game to the main game loop
init() {
  drawSnake();
  intervalId = setTimeout(gameProcess, 1000/6);
  scoreDiv = document.getElementById("snake-score");
  restartDiv = document.getElementById("snake-restart");
  window.onkeydown = keydown;
}

runGame() {
  //call initialisation function when 'play' button is clicked on snake page
  init();
}
