// Sidebar slide
// (function(document) {
//   var toggle = document.querySelector('.sidebar-toggle');
//   var sidebar = document.querySelector('#sidebar');
//   var checkbox = document.querySelector('#sidebar-checkbox');

//   document.addEventListener('click', function(e) {
//     var target = e.target;

//     if(!checkbox.checked ||
//        sidebar.contains(target) ||
//        (target === checkbox || target === toggle)) return;

//     checkbox.checked = false;
//   }, false);
// })(document);


// Thanks @ths for correcting my function at https://stackoverflow.com/a/74041481/19374566
function changeFontStyle() {
  var fontSelector = document.getElementById("font-select");
  if (fontSelector.value === "") return; // Choose fonts...
  const fontsJSON = JSON.parse(fontSelector.value);
  // From least to most specific
  document.body.style.fontFamily = fontsJSON.bodyFont;
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => h.style.fontFamily = fontsJSON.headerFont);
  // document.getElementsByClassName('masthead-title')[0].style.fontFamily = fontsJSON.bodyFont;
}

// Typewriting Effect at Homepage
// Based on https://codepen.io/Coding_Journey/pen/BEMgbX

function typeWriter() {

  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".typing-cursor");

  const textArray = ["Hi there,",
                      "I'm Ina Tang :D",];  /* The text */
  const typingDelay = 175;
  const erasingDelay = 125;
  const newTextDelay = 1225; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;
  var speed = 50;  /* The speed/duration of the effect in milliseconds */

  const nodes = [];

  function type() {
    cursorSpan.classList.add("typing");
    if (charIndex < textArray[textArrayIndex].length) {
      // typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      cursorSpan.insertAdjacentText('beforeBegin', textArray[textArrayIndex].charAt(charIndex));
      charIndex++;
      setTimeout(type, typingDelay);
    }
    else if (charIndex == textArray[textArrayIndex].length && textArrayIndex + 1 == textArray.length) {
      cursorSpan.classList.remove("typing");
      return;
    }
    else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  
  function erase() {
    cursorSpan.classList.add("typing");
    if (charIndex > 0) {
      // typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      typedTextSpan.removeChild(cursorSpan.previousSibling);
      charIndex--;
      setTimeout(erase, erasingDelay);
    }
    else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  if(textArrayIndex>=textArray.length) return;
  if(textArray.length) setTimeout(type, newTextDelay + 250);
}


document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize fonts
  document.body.style.fontFamily = "Karla";
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => h.style.fontFamily = "Nunito");
  // document.getElementsByClassName('masthead-title')[0].style.fontFamily = "Karla";

  // Font Select
  if (document.getElementById("font-select")) document.getElementById("font-select").addEventListener('change', changeFontStyle);

  // Typing Effect
  if (document.querySelector(".typed-text")) typeWriter();
});

