function Agent(){
    this.i = 0;
    this.j = 0;
    this.won = false;

    this.display = function(c)
    {
        if (!this.won)
            ellipse(c.size * this.j + c.size/2, c.size * this.i + c.size/2, c.size - 1, c.size - 1);
        else
            ellipse(c.size * this.j + 3 * c.size/2, c.size * this.i + c.size/2, c.size - 1, c.size -1);
    }
}
