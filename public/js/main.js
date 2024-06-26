 //--Show Menu--//
 fetch('http://localhost:3000/api/bikes')
   .then(res => res.json())
   .then(data => console.log(data));
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);
    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
  }
  showMenu('nav-toggle', 'nav-menu');
  
  const navLink = document.querySelectorAll('.nav_link'),
    navMenu = document.getElementById('nav-menu');
  
  function linkAction() {
    navMenu.classList.remove('show')
  }
  navLink.forEach(n => n.addEventListener('click', linkAction));
  
  

  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", navHighlighter);
  
  function navHighlighter() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 400;
        sectionId = current.getAttribute("id");
  
        if (
            scrollY > sectionTop &&
            scrollY <= sectionTop + sectionHeight
        ) {
            document.querySelector(".nav a[href*=" + sectionId + "]").classList.add("active_link");
        } else {
            document.querySelector(".nav a[href*=" + sectionId + "]").classList.remove("active_link");
        }
    });
  }
  
  window.onscroll = () => {
    const nav = document.querySelector('#header');
    if (this.scrollY <= 10) nav.className = 'header';
    else nav.className = 'header-scroll';
  };
    
  const slide = document.getElementById("slide");
  const left = document.getElementById("left");
  const right = document.getElementById("right");
  
  let x = 0;
  
  left.onclick = function() {
    if (x > "-900") {
        x = x - 300;
        slide.style.top = x + "px";
    }
  }
  
  right.onclick = function() {
    if (x < "0") {
        x = x + 300;
        slide.style.top = x + "px";
    }
  }
