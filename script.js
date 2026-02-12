const cat = document.getElementById("cat");
const obstacle = document.getElementById("obstacle");
const scoreEl = document.getElementById("score");

let score = 0;
let gameOver = false;

function jump(){
  if(!cat.classList.contains("jump")){
    cat.classList.add("jump");
    setTimeout(()=>cat.classList.remove("jump"),500);
  }
}

document.addEventListener("touchstart",jump);
document.addEventListener("mousedown",jump);

let scoreInterval = setInterval(()=>{
  score++;
  scoreEl.textContent = score;

  if(score > 40){
    endGame();
  }
},200);

let collisionCheck = setInterval(()=>{
  const catBottom = parseInt(window.getComputedStyle(cat).bottom);
  const obstacleRight = parseInt(window.getComputedStyle(obstacle).right);

  if(obstacleRight>250 && obstacleRight<290 && catBottom<30){
    score=0;
  }
},50);

function endGame(){
  clearInterval(scoreInterval);
  clearInterval(collisionCheck);

  document.getElementById("gameScreen").style.display="none";
  document.getElementById("questionScreen").style.display="block";
}

/* ====== BOTONES ====== */

const yesBtn=document.getElementById("yes");
const noBtn=document.getElementById("no");

let yesSize=20;

function dodgeNo(){
  yesSize+=8;
  yesBtn.style.fontSize=yesSize+"px";

  const maxX=window.innerWidth-noBtn.offsetWidth;
  const maxY=window.innerHeight-noBtn.offsetHeight;

  noBtn.style.left=Math.random()*maxX+"px";
  noBtn.style.top=Math.random()*maxY+"px";
}

noBtn.addEventListener("mouseenter",dodgeNo);
noBtn.addEventListener("touchstart",dodgeNo);

yesBtn.addEventListener("click",()=>{
  explodeHearts();
  setTimeout(()=>{
    document.body.innerHTML="<h1>❤ Yupiiiii gracias papá ¡Eres el San Valentin de papi! ✨🐱</h1>";
  },1200);
});

/* explosión */

function explodeHearts(){
  for(let i = 0; i < 30; i++){
    const h = document.createElement("div");
    h.textContent = "❤";
    h.style.position = "fixed";
    h.style.left = "50%";
    h.style.top = "50%";

    // Tamaño aleatorio grande
    const size = 80 + Math.random()*120;
    h.style.fontSize = size+"px";

    // Color aleatorio
    const colors = ["#ff4d6d","#ff99cc","#ff66aa","#ffb3d9"];
    h.style.color = colors[Math.floor(Math.random()*colors.length)];

    // Movimiento aleatorio para cubrir pantalla
    const x = (Math.random()-0.5) * window.innerWidth * 2;
    const y = (Math.random()-0.5) * window.innerHeight * 2;

    h.animate([
      {transform:"translate(0,0) scale(1)",opacity:1},
      {transform:`translate(${x}px,${y}px) scale(0.5)`,opacity:0}
    ],{
      duration:2000,
      easing:"ease-out"
    });

    document.body.appendChild(h);
    setTimeout(()=>h.remove(),2000);
  }
}

/* ====== CHISPITAS DE FONDO ====== */
function createSparkle(){
  const sparkle = document.createElement("div");
  sparkle.className="sparkle";

  sparkle.style.left = Math.random()*window.innerWidth + "px";
  sparkle.style.top = Math.random()*window.innerHeight + "px";

  document.body.appendChild(sparkle);
  setTimeout(()=>sparkle.remove(),2000);
}

setInterval(createSparkle,120);