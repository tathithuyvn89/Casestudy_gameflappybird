let Bird = function (game) {
    this.game=game;
    this.images=[];
    this.img1Loaded=null;
    this.img2Loaded=null;
    this.currentImage=null;
    this.currentImageIndex=0;
    this.currentFlame=0;
    this.x=100;
    this.y=150;
    this.width=50;
    this.height=40;
    this.speedY=0;
    this.gravity=1;
    this.direction="down";
    let self=this;
    this.unit=function () {
        this.loadImages();
    }
    this.loadImages=function () {
        let img1= new Image();
        let img2= new Image();
        img1.onload=function () {
            self.img1Loaded=true;
            self.images.push(img1);
            self.currentImage=img1;
        }
        img2.onload=function () {
            self.img2Loaded=true;
            self.images.push(img2);
            self.currentImage=img2;
        }
        img1.src="img/bird.png";
        img2.src="img/bird_up.png";
        this.update=function () {
            if (self.game.gameOver===true) {
                return;
            }
            if (!self.img1Loaded||!self.img2Loaded){
                return;
            }
            self.currentFlame++;
            if (this.currentFlame%8===0){
                self.changeImage();
            }
            if (this.y<self.game.canvas.height-self.game.base.height) {
                if (this.direction){
                    this.speedY+=this.gravity;
                } else {
                    this.speedY-=this.gravity;
                }
                this.y+=this.speedY;
                if (this.y>=self.game.canvas.height-self.game.base.height||this.y<=0 ){
                    self.game.gameOver=true;
                    let die= new Audio();
                    die.src="audio/sfx_die.wav";
                    die.play();
                }
            }
        }
        this.flap= function () {
            if (self.game.gameOver){
                return;
            }
            this.speedY=-10;
            let flapAudio= new Audio();
            flapAudio.src="audio/sfx_flap.wav";
            flapAudio.play();
        }
        this.changeImage=function () {
            if (this.currentImageIndex===1){
                this.currentImageIndex=0
            } else {
                this.currentImageIndex=1
            }
            self.currentImage=this.images[self.currentImageIndex];
        }
    }
    this.draw=function () {
        if (self.img1Loaded&&self.img2Loaded){
            self.game.context.drawImage(self.currentImage,this.x,this.y);
        }
    }
}
