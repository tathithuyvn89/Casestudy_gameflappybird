let Fg= function (game) {
    this.game=game;
    this.image=null;
    this.loaded=null;
    this.width=306;
    this.height=118;
    this.x=0;
    this.y=this.game.canvas.height-this.height;
    var self=this;
    this.init=function () {
        this.loadImage();
    }
    this.loadImage=function () {
        this.image= new Image();
        this.image.onload=function () {
            self.loaded=true;
        }
        this.image.src="img/fg.png";
    }
    this.update= function () {
        if (self.game.gameOver===true) {
            return;
        }
        if (self.loaded===false){
            return;
        }
        this.x-=3;
        if (this.x===-this.width) {
            this.x=0;
        }
    }
    this.draw= function () {
        if (self.loaded===false){
            return;
        }
        self.game.context.drawImage(self.image,this.x,this.y+50);
        self.game.context.drawImage(self.image,this.x+this.width,this.y+50);
    }
}