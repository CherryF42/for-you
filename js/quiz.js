const questions = [

{
question:"Какого цвета у меня глаза?",

answers:[
"Зеленые",
"Голубые",
"Хуй пойми какие",
"А я че ебу"
],

correct:2,

points:[
1,
1,
-1,
1
]
},

{
question:"Какого животного у меня не было?",

answers:[
"Аксолотль",
"Кот",
"Собака",
"Крысы",
"Попугай"
],

correct:4,

points:[
2,
2,
2,
2,
-2
]

},

{
question:"Какой мой любимый цвет? ❤️",

answers:[
"Красный",
"Фиолетовый",
"Черный",
"Зеленый"
],

correct:1,

points:[
2,
-1,
2,
2
]

},


{
question:"Моя любимая еда? 🍽️",

answers:[
"Роллы",
"Пицца",
"Пюрешка с говяжьими щечками",
"Куриные сердечки"
],

correct:2,

points:[
2,
2,
-1,
2
]

},
{
question:"Уажаешь пчелок?",

answers:[
"Да",
"Нет",
"Кто пчелок уважаеn, того они не жалят"

],

correct:2,

points:[
2,
2,
-1
]

},

{
question:"Серьезно?",

answers:[
"Да серьезно",
"Ты ебнутая",
"Нюхай бебру"
],

correct:2,

points:[
42,
2,
-1
]

},

{
question:"Мое любимое число?",

answers:[
"17",
"21",
"42",
"12",
"24"
],

correct:2,

points:[
2,
2,
-42,
2,
2
]

},
{
question:"Мой любимый вкус сока? 🧃",

answers:[
"Гранат-виноград",
"Яблоко-вишня",
"Мультифрукт",
"Ананас"
],

correct:0,

points:[
-1,
2,
2,
2
]

},


{
question:"Вилкой в глаз или в попу раз? ",

answers:[
"Вилкой в глаз",
"В попу раз"
],

correct:1,

points:[
-1,
-2
]

},


{
question:"Продолжи фразу: Спасти 10 детей не обязательно чёрных или...",

answers:[
"Спасти 10 белых детей",
"Мега пачка чипсов Lays с крабом",
"Какать со мной по видеозвонку"
],

correct:2,

points:[
2,
1,
-3
]

}


];



let currentQuestion=0;

let days=0;



const questionText=
document.getElementById("question");


const answersBox=
document.getElementById("answers");


const daysText=
document.getElementById("daysCount");


const message=
document.getElementById("message");




// =====================
// Загрузка вопроса
// =====================

function loadQuestion(){


message.innerHTML="";


let q=questions[currentQuestion];


questionText.innerHTML=q.question;


answersBox.innerHTML="";



q.answers.forEach((answer,index)=>{


let button=document.createElement("button");


button.className="answer";


button.innerHTML=answer;



button.onclick=()=>{

checkAnswer(index,button);

};



answersBox.appendChild(button);


});


}




// =====================
// Проверка ответа
// =====================


function checkAnswer(index,button){


let q=questions[currentQuestion];


let buttons=
document.querySelectorAll(".answer");



buttons.forEach(btn=>{

btn.disabled=true;

});



if(index===q.correct){


button.classList.add("correct");


message.innerHTML=
"✅ Правильно! " + q.points[index] + " день";



}

else{


button.classList.add("wrong");


buttons[q.correct]
.classList.add("correct");


message.innerHTML=
"❌ Неправильно! " + 
(q.points[index]>0?"+":"")
+
q.points[index]
+
" дня";


}



days += q.points[index];


daysText.innerHTML=days;



setTimeout(()=>{


currentQuestion++;



if(currentQuestion<questions.length){


loadQuestion();


}

else{


window.location.href="final.html";


}


},2500);



}



loadQuestion();