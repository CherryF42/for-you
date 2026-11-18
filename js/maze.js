const canvas = document.getElementById("maze");
const ctx = canvas.getContext("2d");


// ==========================
// Настройки лабиринта
// ==========================

const size = 15;

const cell = 35;


canvas.width = size * cell;
canvas.height = size * cell;



let grid = [];

let walls = [];



// ==========================
// Создание карты
// ==========================

function createGrid(){

    grid=[];

    for(let y=0;y<size;y++){

        grid[y]=[];

        for(let x=0;x<size;x++){

            grid[y][x]=1;

        }

    }

}



// ==========================
// Генерация пути
// ==========================

function generate(x,y){

    grid[y][x]=0;


    let directions=[

        [2,0],
        [-2,0],
        [0,2],
        [0,-2]

    ];


    directions.sort(
        ()=>Math.random()-0.5
    );


    for(let d of directions){


        let nx=x+d[0];

        let ny=y+d[1];


        if(

            nx>=0 &&
            ny>=0 &&
            nx<size &&
            ny<size &&
            grid[ny][nx]===1

        ){


            grid[
                y+d[1]/2
            ][
                x+d[0]/2
            ]=0;


            generate(nx,ny);

        }

    }

}




// ==========================
// Создание стен
// ==========================

function buildWalls(){

    walls=[];


    for(let y=0;y<size;y++){

        for(let x=0;x<size;x++){


            if(grid[y][x]===1){


                walls.push({

                    x:x*cell,

                    y:y*cell,

                    size:cell

                });


            }


        }

    }

}



createGrid();

generate(0,0);

buildWalls();



// ==========================
// Игрок
// ==========================

let player={

    x:cell/2,

    y:cell/2,

    radius:12,

    speed:3

};



// ==========================
// Финиш
// ==========================

let finish={

    x:(size-1)*cell+cell/2,

    y:(size-1)*cell+cell/2

};



// ==========================
// Таймер
// ==========================

let seconds=0;


setInterval(()=>{

    seconds++;

    document.getElementById("timer")
    .innerHTML=seconds;

},1000);

// ==========================
// Управление
// ==========================

let keys = {};



document.addEventListener(
"keydown",
(e)=>{

keys[e.key.toLowerCase()] = true;

});



document.addEventListener(
"keyup",
(e)=>{

keys[e.key.toLowerCase()] = false;

});




// кнопки телефона

let mobileDirection = "";



document.getElementById("up").onclick=()=>{

mobileDirection="up";

};


document.getElementById("down").onclick=()=>{

mobileDirection="down";

};


document.getElementById("left").onclick=()=>{

mobileDirection="left";

};


document.getElementById("right").onclick=()=>{

mobileDirection="right";

};




// ==========================
// Движение игрока
// ==========================


function movePlayer(){


let oldX = player.x;

let oldY = player.y;



if(
keys["w"] ||
keys["arrowup"] ||
mobileDirection==="up"
){

player.y -= player.speed;

}



if(
keys["s"] ||
keys["arrowdown"] ||
mobileDirection==="down"
){

player.y += player.speed;

}



if(
keys["a"] ||
keys["arrowleft"] ||
mobileDirection==="left"
){

player.x -= player.speed;

}



if(
keys["d"] ||
keys["arrowright"] ||
mobileDirection==="right"
){

player.x += player.speed;

}



mobileDirection="";



// проверка стен

if(checkCollision()){

player.x=oldX;

player.y=oldY;

}



// границы

if(player.x < player.radius){

player.x=player.radius;

}



if(player.y < player.radius){

player.y=player.radius;

}



if(player.x > canvas.width-player.radius){

player.x=canvas.width-player.radius;

}



if(player.y > canvas.height-player.radius){

player.y=canvas.height-player.radius;

}



checkFinish();

}



// ==========================
// Столкновение со стеной
// ==========================


function checkCollision(){



for(let wall of walls){



let closestX=Math.max(
wall.x,
Math.min(
player.x,
wall.x+wall.size
)
);



let closestY=Math.max(
wall.y,
Math.min(
player.y,
wall.y+wall.size
)
);



let dx =
player.x-closestX;


let dy =
player.y-closestY;



if(
dx*dx+dy*dy <
player.radius*player.radius
){

return true;

}



}



return false;


}

// ==========================
// Секретная невидимая стена
// ==========================


let secretWall = {

    x: cell * 5,

    y: cell * 7,

    size: cell

};


let catUsed = false;



// ==========================
// Проверка секретной стены
// ==========================


function checkSecretWall(){


if(catUsed)
return false;



if(

player.x > secretWall.x &&
player.x < secretWall.x + secretWall.size &&
player.y > secretWall.y &&
player.y < secretWall.y + secretWall.size

){


showCat();


return true;


}


return false;


}



// добавляем её к столкновению


const oldCollision = checkCollision;


checkCollision = function(){


if(checkSecretWall()){

return true;

}


return oldCollision();

};




// ==========================
// Окно котика
// ==========================


function showCat(){


catUsed=true;


document
.getElementById("catPopup")
.style.display="flex";


}



document
.getElementById("continueBtn")
.onclick=function(){


document
.getElementById("catPopup")
.style.display="none";


player.x=cell/2;

player.y=cell/2;


};




// ==========================
// Проверка финиша
// ==========================


let finished=false;



function checkFinish(){


if(finished)
return;



let dx =
player.x-finish.x;


let dy =
player.y-finish.y;



if(
Math.sqrt(dx*dx+dy*dy)<25
){


finished=true;


showWin();



}


}




// ==========================
// Победа
// ==========================


function showWin(){


document
.getElementById("winPopup")
.style.display="flex";



setTimeout(()=>{


window.location.href="quiz.html";


},3000);


}





// ==========================
// Отрисовка
// ==========================


function draw(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



ctx.fillStyle="#050505";

ctx.fillRect(
0,
0,
canvas.width,
canvas.height
);



// стены

ctx.strokeStyle="#ff0055";

ctx.lineWidth=2;



walls.forEach(w=>{


ctx.strokeRect(

w.x+1,

w.y+1,

w.size-2,

w.size-2

);


});




// финиш


ctx.font="30px Arial";


ctx.fillText(

"💖",

finish.x-15,

finish.y+10

);




// игрок сердце


ctx.beginPath();


ctx.arc(

player.x,

player.y,

player.radius,

0,

Math.PI*2

);



ctx.fillStyle="#ff0055";


ctx.shadowColor="red";

ctx.shadowBlur=20;


ctx.fill();



ctx.shadowBlur=0;



}





// ==========================
// Игровой цикл
// ==========================


function gameLoop(){


movePlayer();


draw();


requestAnimationFrame(gameLoop);


}



gameLoop();





// ==========================
// Новый лабиринт
// ==========================


document
.getElementById("restart")
.onclick=function(){


location.reload();


};