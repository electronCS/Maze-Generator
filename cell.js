function Cell(i, j)
{
    this.i = i;
    this.j = j;
    this.size = 30;
    this.offset = 10;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.path = 0;

    this.display = function()
    {
        if (this.visited)
        {

            fill(255, 153, 0);
            noStroke();
            rect(this.size * this.j, this.size * this.i, this.size, this.size);
        }

        stroke(0);
        if (this.walls[0])
            line(this.size * this.j, this.size * this.i, this.size * this.j, this.size * this.i + this.size);
        if (this.walls[1])
            line(this.size * this.j, this.size * this.i, this.size * this.j + this.size, this.size * this.i);
        if (this.walls[2])
            line(this.size * this.j + this.size, this.size * this.i, this.size * this.j + this.size, this.size * this.i + this.size);
        if (this.walls[3])
            line(this.size * this.j, this.size * this.i + this.size, this.size * this.j + this.size, this.size * this.i + this.size);
        textSize(12);
        fill(0);
    }
}
