    const Score = document.querySelector('.Score');
    const StartGame = document.querySelector('.StartGame');
    const GameArea = document.querySelector('.GameArea');

    StartGame.addEventListener('click',Start);
    let keys={ArrowUp: false, ArrowDown: false, ArrowRight: false, ArrowLeft: false};

    document.addEventListener('keydown',keyDown);
    document.addEventListener('keyup',keyUp);
    function keyDown(ev){
        ev.preventDefault();
        keys[ev.key]=true;

     }
    function keyUp(ev){
        ev.preventDefault();
        keys[ev.key]=false;
        
    }

    function hit(Maincar, Othercar){
        Maincar = Maincar.getBoundingClientRect();
        Othercar = Othercar.getBoundingClientRect();

        return !((Maincar.top > Othercar.bottom) || (Maincar.bottom < Othercar.top) || (Maincar.left > Othercar.right) || (Maincar.right < Othercar.left))
    }

    // Move Lines
    function movelines()
    {
        const lines = document.querySelectorAll('.RoadLine');

        lines.forEach(function(value){
          
           if(value.y >= 720)
           {
                value.y -=750;
               
           }

           value.y += Player.Speed;
           value.style.top=value.y + "px";
          
           
        })
    }

    function Gameend(){
        Player.Start = false;
        StartGame.classList.remove('hide');  
        StartGame.innerHTML="Game Over <br> Your Score is :"+ Player.Score + " <br> Press Key To Restart Game";
        StartGame.style.padding="20px";
        audio.Start();
        Player.Speed = 5;
    }

    // Move Other Cars
    function moveothercar(car)
    {
        const othercar = document.querySelectorAll('.othercar');
        
        othercar.forEach(function(value){
        
        if(hit(car,value))    
        {
            console.log("Hit Car");
            var audio = document.getElementById('audio');
            audio.pause();
            Gameend();     
        
        }

        if(value.y >= 700)
        {
                value.y = -300;

                value.style.left = Math.floor(Math.random()* 350) + "px";
            
        }

        value.y += Player.Speed;
        value.style.top=value.y + "px";
        
        
        })
    }
    
    //Create An Player Object
  const Player = {Speed:5 , Score :0};

    function PlayGame(){
       // console.log('Hey I am clicked');

        const car = document.querySelector('.car');
        const Level = document.querySelector('.Level');   
       
        // Obtain Road Boundry 
        const road = GameArea.getBoundingClientRect();
        console.log(road);

      if(Player.Start){

       
        movelines();
        moveothercar(car);
      
        if(keys.ArrowUp && Player.y > 80 ){
            Player.y -=  Player.Speed; 
        }
        if(keys.ArrowDown && Player.y < road.bottom - 70){
            Player.y += Player.Speed; 
        }
        if(keys.ArrowLeft && Player.x > 0){
            Player.x -=  Player.Speed; 
        }
        if(keys.ArrowRight && Player.x < road.width - 50){
            Player.x += Player.Speed; 
        }

        car.style.top = Player.y + "px";
        car.style.left = Player.x + "px";

        Score.innerText = Player.Score++;
      
        // increase Speed of Player
        if(Score.innerText >= 0 && Score.innerText <= 1000)
        {
            Level.innerText='Level  1' ;     
        }
        else if(Score.innerText >= 1001 && Score.innerText <= 2000)  
        {
            Level.innerText='Level  2' ; 
            Player.Speed = 6;
        } 
        else if(Score.innerText >= 2001 && Score.innerText <= 3000)  
        {
            Level.innerText='Level  3' ; 
            Player.Speed = 7;
        }  
        else if(Score.innerText >= 3001 && Score.innerText <= 4000)  
        {
            Level.innerText='Level  4' ; 
            Player.Speed = 8;
        }  
        else if(Score.innerText >= 4001 && Score.innerText <= 5000)  
        {
            Level.innerText='Level  5' ; 
            Player.Speed = 9;
        }   
        else
        {
            Level.innerText='Level 6' ; 
            Player.Speed = 10;
        }   

        window.requestAnimationFrame(PlayGame);
      }
    
    }

    function Start(){

      //  GameArea.classList.remove('hide');

        StartGame.classList.add('hide');
        GameArea.innerHTML="";
        var audio = document.getElementById('audio');
        audio.play();
      
        Player.Start=true;
        Player.Score=0;

        // Use For Call Function 
        window.requestAnimationFrame(PlayGame);
 

         // Create Car
        const car = document.createElement('div');
        car.setAttribute('class','car');
        GameArea.appendChild(car);

        // Obtain Car Position
        Player.x=car.offsetLeft;
        Player.y=car.offsetTop;

        console.log(Player.x);
        console.log(Player.y);

         // Create Road Lines
        for(x=0;x<Player.Speed;x++){
            const RoadLine = document.createElement('div');
            RoadLine.setAttribute('class','RoadLine');
            RoadLine.y =x*150; 
            RoadLine.style.top=RoadLine.y + "px";
            GameArea.appendChild(RoadLine);
        }

        // Create other Car
        for(x=0;x<3;x++){
            const othercar = document.createElement('div');
            othercar.setAttribute('class','othercar');
            othercar.y = ((x+1) * 350) * -1;
            othercar.style.top = othercar.y + "px";
            othercar.style.backgroundImage="url('images/orange_car.png')"

            // For Random Position
            othercar.style.left = Math.floor(Math.random()* 350) + "px";
            GameArea.appendChild(othercar);
        }   
    }