// Sidebar slide
// (function(document) {
//   var toggle = document.querySelector('#font-select-toggle');
//   var checkbox = document.querySelector('#font-select-checkbox');

//   document.addEventListener('click', function(e) {
//     var target = e.target;

//     if(!checkbox.checked ||
//        (target === checkbox || target === toggle)) return;

//     checkbox.checked = false;
//   }, false);
// })(document);


function initFontFamily(headerFont, bodyFont) {
  document.body.style.fontFamily = bodyFont;
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => h.style.fontFamily = headerFont);
}


// Thanks @ths for correcting my function at https://stackoverflow.com/a/74041481/19374566
function enableChangeFont() {
  if (!document.getElementsByName('font-radios')) return; 

  var fontRadios = document.getElementsByName('font-radios');

  fontRadios.forEach(fontRadio => fontRadio.addEventListener('change', function changeFont() {
    const fontsJSON = JSON.parse(fontRadio.value);
    if (fontsJSON.bodyFont === "system") {
      document.body.style.fontFamily = null;
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => h.style.fontFamily = null);
    }
    else {
      // From least to most specific
      document.body.style.fontFamily = fontsJSON.bodyFont;
      document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(h => h.style.fontFamily = fontsJSON.headerFont);
    }
  })); 
}


// Typewriting Effect at Homepage
// Based on https://codepen.io/Coding_Journey/pen/BEMgbX

function typeWriter() {

  if (!document.querySelector(".typed-text")) return; 

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


function selectLink() {
  if (!document.getElementById("post-share")) return; 
  var sharePost = document.getElementById("post-share"); 
  sharePost.addEventListener('click', function() {
    var postLink = document.getElementById("post-link"); 
    postLink.classList.toggle("d-none");
    document.getElementById("post-link-label").classList.toggle("d-none");
    document.getElementById("post-license").classList.toggle("d-none");
    postLink.focus(); 
    postLink.select(); 
  });
}



document.addEventListener('DOMContentLoaded', function() {
  
  // Initialize fonts
  initFontFamily("Nunito", "Karla"); 

  // Font radios
  enableChangeFont();

  // Enable Bootstrap popovers
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]'); 
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl)); 

  // Typing effect
  typeWriter();

  // Share post
  selectLink(); 
});
