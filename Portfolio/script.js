let deg = 0;
let multi = 20;
let move = 0;
let count2 = 0;
let mobileMouseX = 0;
let mobileMouseY = 0;
let lockTexts = ["jits are real", "very cool", "basically a professional"]
let currentLockText = 0;
let mouseX = 0;
let mouseY = 0;
let randomTextCount = 0;
let currentJoke = 0;
let dotXs = [];
let dotYs = [];
let connectedDots = [];
let tick = 0;
let total = 0;
let baseMouseX = 0;
let baseMouseY = 0;
const alphabet = "abcdefghijklmnopqrstuvwxyz!@#$%^&*";
let jokes = ["What do you call a french jit?", "le-jit!", "What do french coders use?", 
    "le-git!", "hahahaha", "guess what?", "chicken butt!", "what happens when a jit gets nervous?", "it gets the jitters!"]

function vwToPx(vw){
    return (vw * window.innerWidth) / 100;
}

function addSpacingForLockText(){
    let count = 0;
    (document.querySelectorAll(".lock")).forEach((item) => {
        count += 9;
        item.style.left = count + "px";
    });
}

function createSpinText(text)
{
    const container = document.getElementById("lockTextContainer");
    container.innerHTML = "";
    for (let i = 0; i < text.length; i++)
    {   
        const letter = document.createElement("span");
        letter.innerHTML = text[i];   
        if(getRandomInt(1,2) == 1)
        {
            letter.classList = "lock";
        }
        else
        {
            letter.classList = "lock";
        }
        
        container.append(letter);
    }   
    addSpacingForLockText();
}

function rainbow()
{
    (document.querySelectorAll(".rainbow")).forEach((item) => {
        item.style.color = "hsl(" + deg + ", 100%, 80%)";
        //item.style.color = "#ffffff";
    });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function shineStars()
{
    if(isMobileUserAgent())
    {
        mouseX = 0;
        mouseY = 0;
    }

    (document.querySelectorAll(".dot")).forEach((item) => { 
        item.style.boxShadow = "0px 0px 10px " + (300 - Math.hypot(mouseX - item.getBoundingClientRect().x, baseMouseY - (item.getBoundingClientRect().y)))/30 + "px white";
    });
}
function isMobileUserAgent() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobileUserAgent()) {
  console.log("User is on a mobile device");
}
else
{
    console.log("PC user")
}

window.addEventListener('scroll', (event) => {
    mouseY = baseMouseY + window.scrollY;
});

window.addEventListener('mousemove', (event) => {
    baseMouseX = event.clientX;
    baseMouseY = event.clientY;
    mouseX = event.clientX + window.scrollX;
    mouseY = event.clientY + window.scrollY;
});

function moveStars(item)
{
    item.dataset.left = Number(item.dataset.left) + Number(item.dataset.velX)/5;
        
    item.dataset.top = Number(item.dataset.top) + Number(item.dataset.velY)/5;
    if(Number(item.dataset.left) >= 100)
    {
        item.dataset.left = 1;
        item.style.left = 1 + "vw";
    }
    if(Number(item.dataset.left) <= 0)
    {
        item.dataset.left = 99;
        item.style.left = 99 + "vw";
    }
    if(Number(item.dataset.top) >= 499)
    {
        item.dataset.top = 1;
        item.style.top = 1 + "vh";
    }
    if(Number(item.dataset.top) <= 0)
    {
        item.dataset.top = 499;
        item.style.top = 499 + "vh";
    }
    item.style.top = (Number(item.dataset.top)) + "vh";
    item.style.left = (Number(item.dataset.left)) + "vw";
}

function calculateLines(item)
{
    console.log(total);
    if(total < 8)
    {   
        let dotX = item.getBoundingClientRect().x;
        let dotY = item.getBoundingClientRect().y + window.scrollY;
        if(Math.hypot(mouseX - dotX, mouseY - dotY) < 300)
        {
            total += 1;
            dotDists.push(Math.hypot(dotX-mouseX, dotY-mouseY)/250);
            dotXs.push(dotX);
            dotYs.push(dotY);
            connectedDots.push(item);
        }
    }
}

function drawLines()
{
    document.getElementById("lineScreen").innerHTML = "";
    const lineScreen = document.getElementById("lineScreen");
    let inner = lineScreen.innerHTML;
    for (let i = 0; i < connectedDots.length; i += 1)
    {
        for (let j = i+1; j < connectedDots.length; j += 1)
        {
            let comp = i;
            if (comp < 0)
            {
                comp = connectedDots.length - 1;
            }
            const x = dotXs[j];
            const y = dotYs[j];
            const x2 = dotXs[comp];
            const y2 = dotYs[comp];
            let width = dotDists[j];
            lineScreen.innerHTML = `${inner}<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="white" stroke-width="${width}"/>`;
            inner = lineScreen.innerHTML;
        }
    }
}

function main(){
    deg += 1;
    connectedDots = [];
    dotXs = [];
    dotYs = [];
    dotDists = [];
    tick += 1;
    (document.querySelectorAll(".dot")).forEach((item) => {
        moveStars(item);
    });
    if(tick)
    {
        total = 0;
        for (const item of document.querySelectorAll(".dot"))
        {
            calculateLines(item);
            if(total >= 8)
            {
                break;
            }
        }
        drawLines();
    }
    shineStars();
    rainbow();
    if(document.getElementById("John").innerHTML !== "John")
    {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    if(document.getElementById("introText").innerHTML !== "I'm a very cool person")
    {
        window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    }
    requestAnimationFrame(main);
}

/*setInterval(() => {
    currentLockText += 1;
    if(currentLockText >= lockTexts.length)
    {
        currentLockText = 0;
    }
    
    createSpinText(lockTexts[currentLockText]);
}, 2400);*/

setTimeout(lockText, 0)
function lockText()
{
    setInterval(() => {
        randomTextCount += 1;
        if(randomTextCount > 40)
        {
            randomTextCount = 0;
        }
        if(randomTextCount < 15)
        {
            (document.querySelectorAll(".lock")).forEach((item) => { 
                item.innerHTML = alphabet[Math.floor(Math.random() * alphabet.length)];;
            });
        }
        else
        {
            if(randomTextCount == 15)
            {
                let lockCount = 0;
                (document.querySelectorAll(".lock")).forEach((item) => { 
                    item.innerHTML = lockTexts[currentLockText][lockCount];
                    lockCount += 1;
                });
            }
            if(randomTextCount == 40)
            {
                randomTextCount = 0;
                currentLockText += 1;
                if(currentLockText >= lockTexts.length)
                {
                    currentLockText = 0;
                }
                createSpinText("x".repeat(lockTexts[currentLockText].length));

            }
        }
    }, 75);
}

for (let i = 0; i <= 160; i++)
{
    const dot = document.createElement("div");
    dot.className = "dot";
    let tops = getRandomInt(0, 500);
    let lefts = getRandomInt(0, 100);
    dot.style.top = tops + "vh";
    dot.style.left = lefts + "vw";
    dot.dataset.left = lefts;
    dot.dataset.top = tops;
    dot.dataset.velX = getRandomNumber(-1,1);
    dot.dataset.velY = getRandomNumber(-1,1);
    if(Math.abs(dot.dataset.velY) < 0.1)
    {
        dot.dataset.velY = (dot.dataset.velY + 0.2) * 2
    }
    if(Math.abs(dot.dataset.velX) < 0.1)
    {
        dot.dataset.velX = (dot.dataset.velX + 0.2) * 2
    }
    const dotSize = getRandomInt(1,5);
    dot.style.width = dotSize + "px";
    dot.style.height = dotSize + "px";
    let container = document.getElementById("dotScreen");
    container.append(dot);
}

document.querySelector("#copyright").addEventListener('click', (event) => {
    event.target.innerHTML = jokes[currentJoke % (jokes.length)];
    currentJoke += 1;
});

createSpinText("jits are real");

requestAnimationFrame(main);

/*(document.querySelectorAll(".projectFrame")).forEach((item) => {
    item.addEventListener('click', (event) => {
        event.target
    });
});*/

//        document.querySelector(".hello").style.color = "hsl(" + deg + ", 99%, 80%)";
