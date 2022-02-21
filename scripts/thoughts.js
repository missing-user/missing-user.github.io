let letterIndex = 0,
  thoughtIndex = 0;
const thoughtsElement = document.getElementById("thoughts");
let txt = [
  "3/10 can't recommend",
  "Robert'); DROP TABLE Students;--",
  "There's an XKCD for that!",
  "Physics is harder than I thought",
  "Wait, the exam is next week?",
  "I'm not a robot, are you?",
  "Welcome to my TED talk",
  "Reality is an illusion!",
  "Maybe I should redesign my website",
  "How did you get here?",
  "I'm not sure what I'm doing either",
  "Where did I save that file???",
  "¯\\_(ツ)_/¯",
  "00111010 00101001",
  "Creative Quotes™",
  "Hello There",
  "Sleep is overrated",
  "No, I won't fix your printer.",
  "u/[deleted]",
  "Pantone 448C is my favorite color",
  "Is anyone even reading this?",
  "I hope you have a good day",
  "卄🝗㇄㇄ㄖ 山ㄖ尺㇄ᗪ",
  "¡ɐᴉʅɐɹʇsn∀ oʅʅǝH",
  "Entropy isn't what it used to be",
  "I'd tell a UDP joke, but you might not get it",
  "Lonely TCP packets in your area",
  "Lifehack: Just give up",
  "I'm not arguing, just explaining why I'm right!",
  "How many of these messages are there?",
  "The lettering is something called Silian Rail",
  "Did I ever fix that memory leak?",
  "May contain traces of sarcasm",
  "Why doesn't this work?",
  "Should have studied game design...",
  "<br> I love HTML",
  "Darkmode friendly 🌘",
  "Never gonna give you up",
  "I ❤️ Comic Sans",
  "The cake wasn't a lie after all!",
  "r/notLikeOtherWebsites",
  "Shouldn't you be working?",
  "Sleep is cool, but have you tried coffee?",
  "No tracking 🍪 in sight",
  "Nobody expects the spanish inquisition!",
  "My name is Inigo Montoya, prepare to die",
  "It's actually pronounced GIF",
  "404, Status not found",
  "God does not play dice with the universe",
  "Say my name",
  "sin(x) = tan(x) = x",
  "You gotta watch that movie!",
  "Congratulations, you won!",
  "There are multiple words for redundant",
  "π² = g ",
  "Great investment u/DeepFuckingValue",
  "Sell me this pen",
  "Those are rookie numbers!",
  "Models are just opinions disguised as mathematics",
  "java.lang.Error: JVM doesn't like you",
  "It works on my machine",
  "The joke is left as an exercise to the reader",
  "The proof is trivial",
  "Wake up, Neo",
  "Now I am become Death, the destroyer of worlds",
  '"I love RegEx!" - nobody ever',
  "Here's Johnny!",
  "You're tearing me apart, Lisa!",
  "Was nothing real?",
  "HELP! I'm In a Nutshell!",
  "Oh behave!",
  "REAL programmers use a magnetized needle",
  "Trying is the first step to failure",
  "import numpy as plt",
  "Proficient in HQ9+",
  "I am justice!",
  "Must be a compiler bug, my code is perfect",
  "Revive me Jett",
  "Don't worry, I got this",
  "Recursion is its own reward",
  "The lettering is something called Silian Rail.",
  "Is something wrong? Patrick... You're sweating",
  "1.21 Gigawatts!?!",
  "Shiver with Antici.....PATION",
  "Let's do the time warp again!",
  "Houston, we have a problem.",
  "What was the password again?",
  "Have you tried turning it off and on again?",
  "Weddings are basically funerals with a cake",
  "Wubba Lubba Dub Dub!",
  "Let's go. In and out. Twenty minute adventure.",
  "You can't fail if you don't even try",
  "WHY ARE WE ALWAYS SCREAMING AT SQL?",
  "It's dangerous to go alone, take this!",
  "It's not a problem, it's a learning opportunity",
  "I'm probably thinking about skiing right now",
];

function typeWriter() {
  if (letterIndex < txt[thoughtIndex].length) {
    thoughtsElement.textContent += txt[thoughtIndex].charAt(letterIndex++);
    setTimeout(typeWriter, 50);
  } else {
    setTimeout(resetThoughts, 1200);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function resetThoughts() {
  if (letterIndex > 1) {
    thoughtsElement.textContent = thoughtsElement.textContent.slice(0, -1);
    letterIndex--;
    setTimeout(resetThoughts, 10);
  } else {
    thoughtIndex = (thoughtIndex + 1) % txt.length;
    thoughtsElement.textContent = txt[thoughtIndex].charAt(0);
    typeWriter();
  }
}

function fallingParticles(valentinesDay) {
  // 1kb oneliner for the snow effect, adapted from https://github.com/HermannBjorgvin/SnowJs
  // creates rising hearts when valentinesDay is true
  var a = document.getElementById("snow"),
    c = a.getContext("2d"),
    e = [];
  a.style.display = "block";
  a.style.pointerEvents = "none";
  a.style.position = "fixed";
  a.style.top = 0;
  a.style.left = 0;
  a.style.width = "100vw";
  a.style.height = "100vh";
  a.height = a.offsetHeight;
  a.width = a.offsetWidth;
  window.onresize = function () {
    a.height = a.offsetHeight;
    a.width = a.offsetWidth;
  };
  var M = Math,
    oldT = 0;
  function particleLoop(newT) {
    c.clearRect(0, 0, a.width, a.height);
    c.beginPath();
    var f = M.random(),
      T = newT - oldT,
      g = T * (7e-4 + 0.07 * f);
    oldT = newT;
    flake = {};
    flake.x = 1.5 * a.width * M.random() - 0.5 * a.width;
    flake.y = valentinesDay ? t.height + 9 : -9; //if valentinesDay is true, start at the bottom of the screen
    flake.b = 2 * g * (M.random() / 2 + 0.5);
    flake.c = (4 + 2 * M.random()) * g;
    flake.a = M.pow(5 * f, 2) / 5;

    flake.update = function () {
      this.x += this.b;
      if (valentinesDay) {
        //rising hearts
        this.y -= this.c;
        c.beginPath();
        c.arc(this.x - this.a, this.y, this.a, 0.75 * h.PI, h.PI / 4);
        c.arc(this.x, this.y, this.a, 1.25 * h.PI, h.PI / 4);
        c.lineTo(
          this.x - this.a / 2,
          this.y + 1.7 * this.a
        )((c.fillStyle = "#ff5ad1"));
        c.fill();
      } else {
        //falling snow
        this.y += this.c;
        c.beginPath();
        c.arc(this.x, this.y, this.a, 0, 2 * M.PI, !1);
        c.fillStyle = "#FFF";
        c.fill();
      }
    };
    e.push(flake);
    for (b = 0; b < e.length; b++)
      e[b].y > a.height + 9 || e[b].y < -9 ? e.splice(b, 1) : e[b].update();
    requestAnimationFrame(particleLoop);
  }
  particleLoop();
}

//quote fitting the current day of the week
function howLongUntilWeekend() {
  var d = new Date();
  if (d.getDay() == 6) return "Weekend's here!!!";
  if (d.getDay() == 0) return "Oh no, tomorrow is monday already...";
  if (d.getDay() == 5) return "Almost weekend!";
  return "Just " + (6 - d.getDay()) + " more days until weekend!";
}
txt.push(howLongUntilWeekend());

function SetCssVar(varNames, varValue) {
  // if varNames is an array, set each variable
  if (Array.isArray(varNames)) {
    for (var i = 0; i < varNames.length; i++) {
      document.documentElement.style.setProperty(varNames[i], varValue);
    }
  } else {
    document.documentElement.style.setProperty(varNames, varValue);
  }
}

//check if it's a specific day or month
function isThisToday(date) {
  var now = new Date();
  return (
    now.getMonth() == date.month - 1 &&
    ("day" in date ? now.getDate() == date.day : true)
  );
}

if (new Date().getHours() > 22 || new Date().getHours() < 6) {
  txt.push("You should probably go to bed");
  txt.push("Good night!");
  txt.push("It's getting late");
}

//pride month
if (isThisToday({ month: 6 })) {
  for (pr of document.getElementsByClassName("profile"))
    pr.classList.add("pride");
  txt.push("Happy Pride Month");
}

//dies academicus
if (isThisToday({ month: 12, day: 2 })) {
  txt = [
    "Dies Academicus",
    "TUM excellence!",
    "Let's go to the library!",
    "Hooray!",
    "TUM for life!",
    "Pantone 300 C",
  ];
  const profileDiv = document.getElementsByClassName("profile")[0];
  profileDiv.style.background = "#0065BD";
  profileDiv.getElementsByTagName("h1")[0].textContent = "TUM";

  for (const lightText of document.getElementsByClassName("lightText")) {
    lightText.style.color = "#fff";
  }
  SetCssVar(
    ["--text-color-normal", "--border-color", "--text-color-softer"],
    "#000"
  );
  SetCssVar(["--accent-color", "--accent-color-hover"], "#0065BD");
  SetCssVar(["--background-color", "--background-color-softer"], "#fff");
}

//snow in december and january, add a quote
if (isThisToday({ month: 12 }) || isThisToday({ month: 1 })) {
  fallingParticles();
  txt.push(
    "See you on the slopes!",
    "Let's shred some pow",
    "Wanna go skiing tomorrow?",
    "It's snowing!"
  );
}

//christmas quotes
if (isThisToday({ day: 24, month: 12 }) || isThisToday({ day: 25, month: 12 }))
  txt = [
    "Sretan božič!",
    "All I want for Christmas is you",
    "Feliz Navidad",
    "Ho, ho, ho...",
    "Merry Christmas!",
    "I hope you get lots of presents",
    "Happy holidays!",
    "Hey Google, play 'Last Christmas'",
    "🦌🦌🦌🛷🎅   ",
  ];

//birthday quotes
if (isThisToday({ day: 11, month: 12 })) {
  txt = [
    "It's my birthday!!!",
    "I woder what presents I'll get",
    "You're invited!",
    "Happy birthday to me",
  ];
}

//valentines day quotes
if (isThisToday({ month: 2, day: 14 })) {
  document.getElementsByClassName("profile")[0].style.background =
    "linear-gradient(0, #ff0cb5 0%, #ffbaf3 100%)";
  fallingParticles(true);
  txt = [
    "Happy valentines day",
    "I love you!",
    "Are you going on a date tonight?",
  ];
}

//next year will be better
txt.push(`Maybe ${new Date().getFullYear()} will be better`);

shuffleArray(txt);
thoughtsElement.textContent = "";
typeWriter();

// change meta theme color on scroll (adapted from https://css-tricks.com/meta-theme-color-and-trickery/)
if ("IntersectionObserver" in window) {
  function setThemeColor(color) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", color);
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
          setThemeColor(getComputedStyle(document.body).backgroundColor);
        } else {
          setThemeColor("#6ac6b4"); //the color of the top part of the gradient
        }
      });
    },
    {
      rootMargin: "1px 0px -100% 0px",
      treshold: 0.1,
    }
  );

  observer.observe(document.getElementsByTagName("main")[0]);
}

console.log(
  "Hello there, fellow developer!\nThe source code for this site can be found at:\nhttps://github.com/missing-user/missing-user.github.io"
);
