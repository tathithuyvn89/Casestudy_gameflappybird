let Bg = function (game) {
    this.game=game;
    this.image=null;
    this.loaded=false;
    this.width=288;
    this.height=512;
    this.x=0;
    var self=this;
    this.init=function () {
        this.loadImage();
    }
    this.loadImage=function () {
        this.image= new Image();
        this.image.onload=function () {
            self.loaded=true;
        };
        this.image.src="img/bg.png";
    }
    this.update=function () {
        if (self.game.gameOver===true){
            return;
        }
        this.x-=2;
        if (this.x===-this.width){
            this.x=0;
        }
    }
    this.draw =function () {
        if (self.loaded===false){
            return;
        }
        self.game.context.drawImage(self.image,this.x,0);
        self.game.context.drawImage(self.image,this.x+this.width,0);
    }
}