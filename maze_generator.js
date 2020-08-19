// Random Maze Generator
// rows and cols must be at least 2
var rows = 20;
var cols = 20;
var maze;
var a;
var s;
var solve = false;
var cooldown = 0;
var input;
 

function setup()
{

    createCanvas(800, 600);
    solve = false;
    width = width - 200;
    if (input != null){
        if (int(input.value()) > 50){
            alert("Max size is 50");
            rows = 50;
            cols = 50;
        }
        else{
            rows = int(input.value());
            cols = int(input.value());
        }
    }
    a = new Agent();

    frameRate(30);
    generate();
    //console.log(maze[1][1].walls);
    //maze[1][1].display();

    s = new Solver(a, maze);
    input = createInput("" + rows);
    input.position(width + 80, 40);
    input.size(60, 20);
    button = createButton('enter');
    button.position(input.x + input.width, 40);

    button.mousePressed(setup);


}
function draw()
{

    if (solve && frameCount % 3 == 0)
        s.solve();
    background(255);
    fill(0);

    textSize(12);
    text("Maze Size", width, 50);
    text("Use WASD to move", width, 100);
    text("Press r to restart maze", width, 150);
    text("Press n for new maze", width, 200);
    text("Press l to toggle auto-solve", width, 250);


    translate(20, 20);

    for (var i = 0; i < rows; i++)
    {
        for (var j = 0; j < cols; j++)
        {
            maze[i][j].display();

        }
    }

    fill(0, 255, 0);
    a.display(maze[a.i][a.j]);
    if (a.won)
    {
        textSize(48);
        fill(0);
        text("You Win!", width/2 - 100, height/2 - 20);
    }
    if (cooldown > 0)
        cooldown--;
    if (cooldown == 0 && !solve && keyIsPressed)
    {
        cooldown = 3;
        if (key == 'w' || key == 'W')
        {
            if (a.i > 0 && maze[a.i][a.j].walls[1] == false)
            {
                a.i--;
            }
        }
        if (key == 's' || key == 'S')
        {
            if (maze[a.i][a.j].walls[3] == false)
            {
                a.i++;
            }
        }
        if (key == 'a'  || key == 'A')
        {

            if (maze[a.i][a.j].walls[0] == false)
            {
                a.j--;
            }
        }
        if (key == 'd' || key == 'D')
        {
            if (a.j == cols - 1 && a.i == rows - 1)
            {
                a.won = true;
            }
            if (a.j < cols - 1 && maze[a.i][a.j].walls[2] == false)
            {
                a.j++;
            }
        }
    }
}
function keyPressed(){

    if(key == 'r' || key == 'R'){

        a = new Agent();
        s = new Solver(a, maze);
        clearMeta();
        solve = false;
    }
    if(key == 'n' || key == 'N'){
        generate();
        a = new Agent();
        s = new Solver(a, maze);
        solve = false;
    }

    if (!a.won)
    {
        if (key == 'L' || key == 'l'){
            console.log("hi");
            if (solve)
            clearMeta();
            solve = !solve;
        }
    }
}

function generate(){
    maze = new Array(rows);
    for (var i = 0; i < rows; i++)
    {
        maze[i] = new Array(cols)
        for (var j = 0; j < cols; j++)
        {
            maze[i][j] = new Cell(i, j);
            maze[i][j].size = min(width/(cols + 2), height/(rows + 2));
        }
    }
    var i = int(rows/2);
    var j = int(cols/2);
    var count = 1;

    while (i != int(rows/2) || j != int(cols/2) || maze[i][j].visited == false)
    {

        maze[i][j].visited = true;
        maze[i][j].path = count;
        count++;

        //if nothing to move to;
        if ((j == 0 || maze[i][j-1].visited == true)
        && (j == cols - 1 || maze[i][j+1].visited == true)
        && (i == rows - 1 || maze[i + 1][j].visited == true)
        && (i == 0 || maze[i - 1][j].visited == true)){
            count-=2;
            if (j > 0 && maze[i][j-1].path == count)
            j--;
            else if (j < cols - 1 && maze[i][j+1].path == count)
            j++;
            else if (i > 0 && maze[i-1][j].path == count)
            i--;
            else if (i < rows - 1 && maze[i+1][j].path == count)
            i++;

        }
        else{ //otherwise move
            var moved = false;
            while (!moved){ //choose randomly until valid move
                var rand = int(4*Math.random());

                if (rand == 0 && j > 0 && maze[i][j-1].visited == false){ //left
                    maze[i][j].walls[0] = false;
                    maze[i][j - 1].walls[2] = false;
                    j--;
                    moved = true;
                }
                else if (rand == 1 && i > 0 && maze[i-1][j].visited == false){ //up
                    maze[i][j].walls[1] = false;
                    maze[i - 1][j].walls[3] = false;
                    i--;
                    moved = true;
                }
                else if (rand == 2 && j < cols - 1 && maze[i][j+1].visited == false){ //right
                    maze[i][j].walls[2] = false;
                    maze[i][j + 1].walls[0] = false;
                    j++;
                    moved = true;
                }
                else if (rand == 3 && i < rows - 1 && maze[i+1][j].visited == false){ //down
                    maze[i][j].walls[3] = false;
                    maze[i + 1][j].walls[1] = false;
                    i++;
                    moved = true;
                }
            }
        }
    }
    maze[0][0].walls[1] = false;
    maze[rows - 1][cols - 1].walls[2] = false;
    clearMeta();
}
function clearMeta()
{
    for (var i = 0; i < rows; i++)
    {
        for (var j = 0; j < cols; j++)
        {
            maze[i][j].visited = false;
            maze[i][j].path = 0;
        }
    }
}
