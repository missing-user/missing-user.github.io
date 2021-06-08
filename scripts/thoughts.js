(function () {
  let letterIndex = 0, thoughtIndex = 0;
  let txt = ["3/10 can't recommend",
    "Robert'); DROP TABLE Students;--",
    "There's an XKCD for that",
    'Physics is harder than I thought',
    "Wait, the exam is next week?",
    "Welcome to my TED talk",
    'Maybe next semester will be easier 🤡',
    "It's muffin time",
    "Where did I save that file???",
    "¯\\_(ツ)_/¯",
    "Sleep is overrated",
    "No, I won't fix your computer",
    "u/[deleted]",
    "Entropy isn’t what it used to be",
    "I’d tell a UDP joke, but you might not get it",
    "Lonely TCP packets in your area",
    'Lifehack: Just give up',
    "I’m not arguing, just explaining why I'm right!",
    "May contain traces of sarcasm",
    "Why doesn't this work?",
    'Should have studied game design...',
    '<br> I love HTML',
    'Darkmode friendly 🌘',
    'Never gonna give you up',
    "I ❤️ Comic Sans",
    "The cake wasn't a lie after all!",
    'r/notLikeOtherWebsites',
    "Shouldn't you be working?",
    'Sleep is cool, but have you tried coffee?',
    'No tracking 🍪 in sight',
    "Nobody expects the spanish inquisition!",
    "My name is Inigo Montoya, prepare to die",
    "It's actually pronounced GIF",
    "404, Status not found",
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
    '"I love RegEx!" - nobody ever',
    "Here's Johnny!",
    "You're tearing me apart, Lisa!",
    "Anyway, how's your sex life?",
    "Was nothing real?",
    "Oh behave!",
    "Proficient in HQ9+",
    '"I am justice!" - L',
    "Must be a compiler bug, my code is perfect",
    "Revive me Jett",
    "Don't worry, I got this",
    "1.21 Gigawatts!?!",
    "Shiver with Antici.....PATION",
    "Let's do the time warp again!",
    "Houston, we have a problem.",
    "What was the password again?",
    "Have you tried turning it off and on again?"
  ];

  function typeWriter() {
    if (letterIndex < txt[thoughtIndex].length) {
      document.getElementById("thoughts").textContent += txt[thoughtIndex].charAt(letterIndex++)
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
      document.getElementById("thoughts").textContent = document.getElementById("thoughts").textContent.slice(0, -1)
      letterIndex--;
      setTimeout(resetThoughts, 10);
    } else {
      thoughtIndex = (thoughtIndex + 1) % txt.length
      document.getElementById("thoughts").textContent = txt[thoughtIndex].charAt(0)
      typeWriter()
    }
  }

  //quote fitting the current day of the week
  function howLongUntilWeekend() {
    var d = new Date()
    if (d.getDay() == 6)
      return "Weekend's here!!!"
    if (d.getDay() == 0)
      return "Oh no, tomorrow is monday already..."
    if (d.getDay() == 5)
      return "Weekend's almost here"
    return "Just " + (6 - d.getDay()) + " more days till saturday"
  }
  txt.push(howLongUntilWeekend())

  //something for the holidays
  function isThisToday(date) {
    var now = new Date()
    return (now.getMonth() == date.month - 1 && ('day' in date ? now.getDate() == date.day : true))
  }
  //pride month
  if (isThisToday({ month: 6 }) || isThisToday({ month: 1 })) {
    txt.push("Happy Pride Month")
    for (pr of document.getElementsByClassName('profile'))
      pr.classList.add('pride')
  }
  //snow in december and january
  if (isThisToday({ month: 12 }) || isThisToday({ month: 1 })) {
    (function () { var a = document.getElementById("snow"), c = a.getContext("2d"), e = []; a.style.pointerEvents = "none"; a.style.position = "fixed"; a.style.top = 0; a.style.left = 0; a.style.width = "100vw"; a.style.height = "100vh"; a.height = a.offsetHeight; a.width = a.offsetWidth; window.onresize = function () { a.height = a.offsetHeight; a.width = a.offsetWidth }; var d = Math; setInterval(function () { c.clearRect(0, 0, a.width, a.height); c.beginPath(); var f = d.random(), g = .05 + .95 * f; flake = {}; flake.x = 1.5 * a.width * d.random() - .5 * a.width; flake.y = -9; flake.b = 2 * g * (d.random() / 2 + .5); flake.c = (4 + 2 * d.random()) * g; flake.a = d.pow(5 * f, 2) / 5; flake.update = function () { this.x += this.b; this.y += this.c; c.beginPath(); c.arc(this.x, this.y, this.a, 0, 2 * d.PI, !1); c.fillStyle = "#FFF"; c.fill() }; e.push(flake); for (b = 0; b < e.length; b++)e[b].y > a.height ? e.splice(b, 1) : e[b].update() }, 16) })();
  }
  //christmas quotes
  if (isThisToday({ day: 24, month: 12 }) || isThisToday({ day: 25, month: 12 }))
    txt.push("Ho, ho, ho...", "Merry Christmas!", "I hope you get lots of presents", "Happy holidays!", "Hey Google, play WHAM! Last Christmas")
  //birthday quotes
  if (isThisToday({ day: 11, month: 12 }))
    txt.push("It's my birthday!!!", "I woder what presents I'll get", "You're invited!", "Happy birthday to me")
  //valentines day quotes
  if (isThisToday({ month: 2, day: 14 })) {
    txt.push('Happy valentines day')
    document.getElementsByClassName("profile")[0].style.background = "linear-gradient(0, #ff0cb5 0%, #ffbaf3 100%)";
    (function () { var t = document.getElementById("snow"), e = t.getContext("2d"), i = []; t.style.display = ""; t.style.pointerEvents = "none", t.style.position = "fixed", t.style.top = 0, t.style.left = 0, t.style.width = "100vw", t.style.height = "100vh", t.height = t.offsetHeight, t.width = t.offsetWidth, window.onresize = function () { t.height = t.offsetHeight, t.width = t.offsetWidth }; var h = Math; setInterval(function () { e.clearRect(0, 0, t.width, t.height); e.beginPath(); var s = h.random(), a = .05 + .95 * s; for (flake = {}, flake.x = 1.5 * t.width * h.random() - .5 * t.width, flake.y = t.height + 9, flake.b = 2 * a * h.random(), flake.c = (3 + h.random()) * a, flake.a = h.pow(5 * s + 1, 2) / 5, flake.update = function () { this.x += this.b, this.y -= this.c, e.beginPath(), e.arc(this.x - this.a, this.y, this.a, .75 * h.PI, h.PI / 4), e.arc(this.x, this.y, this.a, 1.25 * h.PI, h.PI / 4), e.lineTo(this.x - this.a / 2, this.y + 1.7 * this.a), e.fillStyle = "#ff5ad1", e.fill() }, h.random() > 0.8 ? i.push(flake) : a, b = 0; b < i.length; b++)i[b].y < 0 ? i.splice(b, 1) : i[b].update() }, 16) })();
  }

  //next year will be better
  txt.push(`Maybe ${new Date().getFullYear()} will be better`)

  shuffleArray(txt)
  typeWriter()
})()