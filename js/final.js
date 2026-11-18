const title = document.getElementById("title");
const text = document.getElementById("text");
const hug = document.getElementById("hug");


// =====================
// Печать текста
// =====================

function typeText(element, content, speed){

if(element.timer){

clearInterval(element.timer);

}


let i = 0;

element.innerHTML="";


element.timer=setInterval(()=>{


element.innerHTML += content[i];


i++;


if(i>=content.length){

clearInterval(element.timer);

element.timer=null;

}


},speed);


}




setTimeout(()=>{

typeText(
title,
"Ты прошел все испытания ❤️",
100
);

},500);



setTimeout(()=>{

typeText(
text,
"Спасибо, что ты со мной ❤️\n\nТы действительно особенный человек для меня.\n\nЯ тебя люблю, рыбка котик самолетик 🥰",
60
);

},3500);




// =====================
// Летающие сердечки
// =====================

function createHeart(){


const heart=document.createElement("div");


heart.className="heart-fly";


heart.innerHTML="❤️";


heart.style.left=
Math.random()*100+"vw";


heart.style.animationDuration=
(3+Math.random()*4)+"s";


document.body.appendChild(heart);



setTimeout(()=>{

heart.remove();

},7000);


}



setInterval(createHeart,300);




// =====================
// Фейерверк
// =====================


const canvas =
document.getElementById("fireworks");


const ctx =
canvas.getContext("2d");



canvas.width =
window.innerWidth;


canvas.height =
window.innerHeight;



let particles=[];



function fireworks(){


for(let i=0;i<80;i++){


particles.push({

x:Math.random()*canvas.width,

y:Math.random()*canvas.height/2,

dx:(Math.random()-0.5)*8,

dy:(Math.random()-0.5)*8,

life:100

});


}


}



setInterval(fireworks,1500);



function animate(){


ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);



particles.forEach((p,index)=>{


p.x+=p.dx;

p.y+=p.dy;

p.life--;


ctx.fillStyle="#ff0055";


ctx.fillRect(
p.x,
p.y,
5,
5
);



if(p.life<=0){

particles.splice(index,1);

}


});


requestAnimationFrame(animate);


}



animate();




// =====================
// Кнопка "Обнять"
// =====================


hug.onclick=function(){


typeText(
text,
"Я тебя люблю ❤️ Спасибо, что ты рядом рыбка котик самолетик 🥰",
70
);



for(let i=0;i<50;i++){

createHeart();

}


};