function Solver(a, maze)
{
   this.a = a;
   this.maze = maze;
   this.count = 0;

   this.solve = function()
   {
      this.maze[this.a.i][this.a.j].visited = true;
      this.maze[this.a.i][this.a.j].path = this.count;
      if (this.a.i == this.maze.length - 1 && this.a.j == this.maze[0].length - 1){
         this.a.won = true;
         return;
      }
      if (this.maze[this.a.i][this.a.j].walls[2] == false && this.maze[this.a.i][this.a.j + 1].visited == false){
         this.a.j++;
      }
      else if (this.maze[this.a.i][this.a.j].walls[3] == false && this.maze[this.a.i + 1][this.a.j].visited == false){
         this.a.i++;
      }
      else if (maze[this.a.i][this.a.j].walls[0] == false && this.maze[this.a.i][this.a.j - 1].visited == false){
         this.a.j--;
      }
      else if ((this.a.i != 0 || this.a.j != 0) && this.maze[this.a.i][this.a.j].walls[1] == false && this.maze[this.a.i - 1][this.a.j].visited == false){
         this.a.i--;
      }
      else
      {
         //maze[a.i][a.j].visited = false;
         if (this.maze[this.a.i][this.a.j].walls[2] == false && this.maze[this.a.i][this.a.j + 1].path == this.count - 1){
             this.a.j++;
         }
         else if (this.maze[this.a.i][this.a.j].walls[3] == false && this.maze[this.a.i + 1][this.a.j].path == this.count - 1){
            this.a.i++;
         }
         else if (this.maze[this.a.i][this.a.j].walls[0] == false && this.maze[this.a.i][this.a.j - 1].path == this.count - 1){
            this.a.j--;
         }
         else if (this.maze[this.a.i][this.a.j].walls[1] == false && this.maze[this.a.i - 1][this.a.j].path == this.count - 1){
            this.a.i--;
         }
         else
         {
            return;
         }
         this.count--;

         return;
      }

      this.count++;
      this.maze[this.a.i][this.a.j].path = this.count;
      this.maze[this.a.i][this.a.j].visited = true;

   }
}
