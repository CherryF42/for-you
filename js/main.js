const loveBtn = document.getElementById("loveBtn");

let clicks = 0;


loveBtn.addEventListener("click",()=>{

clicks++;


if(clicks === 1){

loveBtn.innerHTML = "Еще раз ❤️";

moveButton();

loveBtn.style.transform = "scale(1.15)";

}


else if(clicks === 2){

loveBtn.innerHTML = "Ну еще раз 🥺";

moveButton();

loveBtn.style.transform = "scale(1.3)";

}


else if(clicks === 3){

loveBtn.innerHTML = "Последний раз 😘";

moveButton();

loveBtn.style.transform = "scale(1.45)";

}


else{


document.body.style.transition="1s";

document.body.style.opacity="0";


setTimeout(()=>{

window.location.href="maze.html";

},1000);


}


});



function moveButton(){


const buttonWidth = loveBtn.offsetWidth;

const buttonHeight = loveBtn.offsetHeight;


const maxX = window.innerWidth - buttonWidth;

const maxY = window.innerHeight - buttonHeight;


const randomX = Math.random()*maxX;

const randomY = Math.random()*maxY;



loveBtn.style.position="absolute";

loveBtn.style.left=randomX+"px";

loveBtn.style.top=randomY+"px";


}