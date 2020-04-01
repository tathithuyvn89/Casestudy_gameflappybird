var Fg= function (game) {
    this.game=game;
    this.image=null;
    this.loaded=null;
    this.x=0;
    this.y=512-118;
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
        if (this.x===-306) {
            this.x=0;
        }
    }
    this.draw= function () {
        if (self.loaded===false){
            return;
        }
        self.game.context.drawImage(self.image,this.x,this.y+50);
        self.game.context.drawImage(self.image,this.x+306,this.y+50);
    }
}