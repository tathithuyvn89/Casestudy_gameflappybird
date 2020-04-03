let Pipe = function (game) {
    this.game=game;
    this.image=null;
    this.pipe1loaded=false;
    this.pipe2loaded=false;
    this.pipe1=null;
    this.pipe2=null;
    this.score=0;
    this.pipe1Width=52;
    this.pipe2Width=52;
    this.pipe1Height=242;
    this.pipe2Height=378;
    this.pipe2L=null;
    this.x=300;
    this.y=0;
    let self=this;
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
        if (self.score<5){
            this.x-=2;
            if (this.x===-54){
                this.x=300;
                this.y=Math.floor(Math.random()*this.pipe1Height)-this.pipe1Height;
            }
        }
        //lever 2
        if (self.score>=5){
            this.x-=3;
            if (this.x===-54){
                this.x=300;
                this.y=Math.floor(Math.random()*this.pipe1Height)-this.pipe1Height;
            }
        }
    }
    this.draw = function () {
        const gap =100;
        this.pipe2L=this.pipe1Height+ gap;
        if (self.pipe1loaded===false ||self.pipe1loaded===false){
            return;
        }
        self.game.context.drawImage(self.pipe1,this.x,this.y);
        self.game.context.drawImage(self.pipe2,this.x,this.y+this.pipe2L);
    }
    this.hitAudio=function () {
        if (game.gameOver===false){
            var hit=new Audio();
            hit.src="audio/sfx_hit.wav";
            hit.play();
        }
    }
    this.hitPipe=function () {
        if ((self.game.bird.x+self.game.bird.width>=this.x&&self.game.bird.x<=this.x+this.pipe1Width)&&
            (self.game.bird.y<=this.pipe1Height+this.y||self.game.bird.y+self.game.bird.height>=this.y+this.pipe2L)){
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
            let c= document.getElementById("before");
            let context= c.getContext("2d");
            context.font="30px Arial";
            context.fillText("SCORE: "+ self.score,16,50);
            if (self.game.gameOver===true){
                context.fillStyle= "red";
            }
        }
    }
}