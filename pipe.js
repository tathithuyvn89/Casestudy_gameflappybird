var Pipe = function (game) {
    this.game=game;
    this.image=null;
    this.pipe1loaded=false;
    this.pipe2loaded=false;
    this.pipe1=null;
    this.pipe2=null;
    this.score=0;
    this.x=300;
    this.y=0;
    var self=this;
    this.init=function () {
        this.loadImages();
    };
    this.loadImages=function () {
        this.pipe1= new Image();
        this.pipe2=new Image();
        this.pipe1.onload=function () {
            self.pipe1loaded=true
        };
        this.pipe2.onload=function () {
            self.pipe2loaded=true
        };
        this.pipe1.src="img/pipeNorth.png";
        this.pipe2.src="img/pipeSouth.png";
    }
    this.update=function () {
        var count=0;
        if (self.pipe1loaded===false||self.pipe1loaded===false){
            return;
        }
        if (this.game.gameOver){
            return;
        }
        //lever 1
        if (self.score<2){
         this.x-=2;
        if (this.x===-54){
            this.x=300;
            this.y=Math.floor(Math.random()*242)-242;
        }
        }
        //lever 2
        if (self.score>=2){
            this.x-=3;
            if (this.x===-54){
                this.x=300;
                this.y=Math.floor(Math.random()*242)-242;
            }
        }

    }
    this.draw = function () {
        if (self.pipe1loaded===false ||self.pipe1loaded===false){
            return;
        }
        self.game.context.drawImage(self.pipe1,this.x,this.y);
        self.game.context.drawImage(self.pipe2,this.x,this.y+242+100);// 242 la chiều cao của ống trên, 200 là khoảng trống
    }
    this.hitAudio=function () {
        if (game.gameOver===false){
        var hit=new Audio();
        hit.src="audio/sfx_hit.wav";
        hit.play();
        }
    }
    this.hitPipe=function () {
        if ((self.game.bird.x+50>=this.x&&self.game.bird.x<=this.x+52)&&
            (self.game.bird.y<=242+this.y||self.game.bird.y+40>this.y+100+242)){
            self.hitAudio();
            self.game.gameOver=true;
            return true;
        }
    }
    this.pointAudio=function () {
        if (game.gameOver===false){
            var point= new Audio();
            point.src="audio/sfx_point.wav";
            point.play();
        }
    }
   this. makePoint=function () {
        if (self.pipe1loaded&&self.pipe2loaded){
        if (self.x===60){
            self.score++;
          this.pointAudio();
        }
        var c= document.getElementById("before");
        var context= c.getContext("2d");
       context.font="30px Arial";
        context.fillText("SCORE: "+ self.score,16,50);
        if (self.game.gameOver===true){
            context.fillStyle= "red";
        }
        }
    }
}