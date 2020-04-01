let Game = function () {
    this.canvas=null;
    this.context=null;
    this.width=288;
    this.height=512;
    this.bird=null;
    this.background=null;
    this.pipe=null;
    let self= this;
    this.base=null;
    this.gameOver=false;
    this.init=function () {
        this.canvas= document.createElement("canvas");
        this.context=this.canvas.getContext("2d");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        this.canvas.id="before";
        document.body.appendChild(this.canvas);
        //  Khởi tạo đối tượng con chim
        this.bird= new Bird(this);
        this.bird.unit();
        //Khổi tạo đối tựng hình nền là các tòa nhà và mây
        this.background= new Bg(this);
        this.background.init();
        // Khởi tạo nền
        this.base= new Fg(this);
        this.base.init();
        this.pipe= new Pipe(this);
        this.pipe.init();
        this.listenMouse();
        this.run();
    }
    this.listenMouse=function () {
        this.canvas.addEventListener("click",function () {
         self.bird.flap();
        })
    }
    this.run= function () {
        self.update();
        self.draw();
        self.pipe.makePoint();
        setTimeout(self.run,40);
    }
    this.update=function () {
        this.background.update();
        this.pipe.update();
        this.base.update();
        this.bird.update();
        this.pipe.hitPipe();
    }
    this.draw = function () {
        this.background.draw();
        this.pipe.draw();
        this.base.draw();
        this.bird.draw();
        this.stopGame();
    }
    this.stopGame= function () {
        if (self.gameOver){
            var img= new Image();
            img.src="img/game_over.png";
            self.context.drawImage(img,-50,250);
        }
    };
    // this.gameClear = function () {
    //     self.context.clearRect(0, 0, 288, 512);
    // };
    // this.gameStart=function () {
    //     document.getElementById("startGame").style.display = "none";
    //    let ctx=document.getElementById('before')
    //     ctx.focus();
    // }
}
     let game= new Game();
     game.init();
//  <button type="button" id="startGame" onclick="startGame()">START</button>