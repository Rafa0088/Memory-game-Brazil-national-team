const images=[
    'img1.jpeg',
    'img2.jpeg',
    'img3.jpeg',
    'img4.jpeg',
    'img5.jpeg',
    'img6.jpeg',
    'img7.jpeg',
    'img8.jpeg',
    'img9.jpeg',
    'img10.jpeg',
]; 
let cards=[];
let firstcard=null;
let secondcard=null;
let lockboard=false;
let score=0;
let timeleft=90;
let timeinterval;



function startgame(){
    const gameboard=document.getElementById("gameboard");
    const scoredisplay=document.getElementById("score");
    const timerdisplay=document.getElementById("timer");
    gameboard.innerHTML='';
    scoredisplay.textContent=`pontuação: ${score}`;
    timerdisplay.textContent=`tempo restante: ${timeleft}s`;
    cards=[];
    clearInterval(timeinterval);
timeinterval=setInterval(() => {
    timeleft--;
    timerdisplay.textContent=`tempo restante: ${timeleft}s`;
    if(timeleft<=0){
        clearInterval(timeinterval);
        alert("tempo esgotado");
        resetgame();
    }
    else if(score==10){
        clearInterval(timeinterval);
        alert("você venceu");
        resetgame();
    }
}, 1000);
const shuffledimages=[...images,...images].sort(()=>0.5-Math.random());

shuffledimages.forEach((img)=>
{
    const card=document.createElement('div');
    card.classList.add('card');
    card.innerHTML=`
    <div class="card-inner">
    <div class="card-front"></div>
    <div class="card-back" style="background-image:url(${img});"></div>
    </div>
    `;
    card.addEventListener('click',()=>flipCard(card));
    gameboard.appendChild(card);
    cards.push(card);
});
}
function flipCard(card){
    if(lockboard || card===firstcard || card.classList.contains('flip'))return;
        card.classList.add('flip');
        if(!firstcard){
            firstcard=card;
        }else{
            secondcard=card;
            checkformatch();
        }
    
} 
function checkformatch (){
    const ismatch=firstcard.querySelector('.card-back').style.backgroundImage===secondcard.querySelector('.card-back').style.backgroundImage;
if(ismatch){
    disableCards();
    updatescore();
}else{
    unflipCards();
}
}
function updatescore(){
    score++;
    const scoredisplay=document.getElementById("score");
    scoredisplay.textContent=`pontuação:${score}`;
}
function disableCards (){
    firstcard.removeEventListener('click',()=>flipCard(firstcard));
secondcard.removeEventListener('click',()=>flipCard(secondcard));
resetboard();
}
function unflipCards (){
    lockboard=true;
    setTimeout(()=>
    {
        firstcard.classList.remove('flip');
        secondcard.classList.remove('flip');
        resetboard();
    },1000);
}
function resetboard (){
    [firstcard,secondcard,lockboard]=[null,null,false];
}
function resetgame(){
    score=0;
    timeleft=90;
    startgame();
}
window.onload=()=>{
document.getElementById("restartbutton").addEventListener("click",resetgame);
startgame();
};