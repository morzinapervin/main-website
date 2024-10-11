// ! Function for DESKTOP menu on mouse scroll  
document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.querySelector("header");
  const targetSection = document.querySelector('.header-target');
  let lastScrollTop = 0;

  if (window.innerWidth >= 981 && targetSection) {  // Check if targetSection exists
      function handleScroll() {
          const scroll = window.scrollY || document.documentElement.scrollTop;
          const headerTargetTop = targetSection.getBoundingClientRect().top + window.scrollY;
          const triggerPoint = headerTargetTop;

          // Slide in header when scrolling past the targetSection
          if (scroll >= triggerPoint) {
              if (!headerElement.classList.contains("transitioned")) {
                  headerElement.classList.add("hero_scrolled");
                  headerElement.classList.add("page_scrolled");
                  headerElement.classList.add("transitioned");
              }
          } else {
              headerElement.classList.remove("hero_scrolled");
              headerElement.classList.remove("page_scrolled");
              headerElement.classList.remove("transitioned");
          }

          lastScrollTop = scroll;
      }

      handleScroll();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleScroll);
  }
});



// ! Function to add a custom class in header tag on mouse scroll for MOBILE MENU
document.addEventListener("DOMContentLoaded", function() {
  // Function to handle scroll events
  function handleScroll() {
    const scroll = window.scrollY || document.documentElement.scrollTop;
    const headerElement = document.querySelector("header");
    if (window.innerWidth <= 980) {
    if (scroll >= 1) {
      headerElement.classList.add("page_scrolled");
    } else {
      headerElement.classList.remove("page_scrolled");
    }
  }
}
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  });

// ! Function for investor login page DESKTOP
window.addEventListener('scroll', function () {
  const scroll = window.scrollY;
  const bodyClassList = document.body.classList;
  const headerElement = document.querySelector('header'); 
  let lastScrollTop = 0;
  
      
  if (bodyClassList.contains('page-investor-login')) {  
    
    // 1. Hide header when scrolling down, show when scrolling back to top
      if (scroll > lastScrollTop) {
        headerElement.classList.add("header-off"); 
      } else if (scroll === 0) {
        headerElement.classList.remove("header-off"); 
       headerElement.classList.remove("page_scrolled");
      }
      
      // 2. Slide in header when scrolling past the 100px
    if (scroll >= 100) {
      headerElement.classList.add("hero_scrolled");
      headerElement.classList.add("page_scrolled");
    } else {
      headerElement.classList.remove("hero_scrolled");
      headerElement.classList.remove("page_scrolled");
    }
  }
});

// ! Function for logo change on page scroll for NEWS, CONTACT
document.addEventListener("DOMContentLoaded", function() {
  const pagesWithWhiteLogo = ["page-news", "page-contact"];
  const bodyClassList = document.body.classList;
  const headerElement = document.querySelector("#masthead");
  const imageElement = document.querySelector(".logo_wrapper img");
  const headerTarget = 100; 

  function updateLogo() {
    const scroll = window.scrollY || document.documentElement.scrollTop;
   
    if (window.innerWidth >= 981 && window.innerWidth <= 1024) {
      if (bodyClassList.contains('page-contact')) {
        if (scroll >= 100) {
          headerElement.classList.add("header-off");
          headerElement.classList.add("hero_scrolled");
          headerElement.classList.add("page_scrolled");
        } else {
          headerElement.classList.remove("header-off");
          headerElement.classList.remove("hero_scrolled");
          headerElement.classList.remove("page_scrolled");
        }
      }
    }
// For DESKTOP
    if (window.innerWidth >= 981) {
      if (scroll >= headerTarget) {
        imageElement.src = "";
      } else {
        imageElement.src = "";
      }
      // For MOBILE
    } else if (window.innerWidth <= 980) {
      if (scroll >= 30) {
        imageElement.src = "";
      } else {
        imageElement.src = "";
      }
    }
  }

  // Initial check
  if (pagesWithWhiteLogo.some(page => bodyClassList.contains(page))) {
    updateLogo();

    // Add scroll event listener
    window.addEventListener("scroll", updateLogo);
  }
});

document.addEventListener("DOMContentLoaded", function() {

  const menuToggleButton = document.querySelector('.menu-toggle');
  const menuOpenIcon = document.querySelector('.menu_open_icon');
  const menuCloseIcon = document.querySelector('.menu_close_icon');
  const menuContainer = document.querySelector('.menu-primary-menu-container');
  const header = document.querySelector('header');
  const scrollLogo = document.querySelector('.page_scrolled .logo_wrapper img');

  // Function to disable scrolling
  function disableScroll() {
      document.body.style.overflow = 'hidden';
  }

  // Function to enable scrolling
  function enableScroll() {
      document.body.style.overflow = 'auto';
  }

  menuToggleButton.addEventListener('click', function () {
    if (menuContainer.classList.contains('open')) {
        menuContainer.classList.remove('open');
        menuCloseIcon.style.display = 'none';
        menuOpenIcon.style.display = 'inline';
        enableScroll();
        header.classList.remove('menu-open');

        if (scrollLogo) {
            scrollLogo.classList.remove('visible-logo');
        }
    } else {
        menuContainer.classList.add('open');
        menuOpenIcon.style.display = 'none';
        menuCloseIcon.style.display = 'inline';
        disableScroll();
        header.classList.add('menu-open');

        if (scrollLogo) {
            scrollLogo.classList.add('visible-logo');
        }
    }
});


  // Initially hide the close icon
  menuCloseIcon.style.display = 'none';
});

  
  


  //! Function to add Custom HTML with logo in burger menu popup
document.addEventListener("DOMContentLoaded", function () {
  const mainNavigation = document.getElementById('site-navigation');
  const logoHTML = '<div class="popup_menu_logo"><img src=""></div>';

  function toggleLogo() {
      const primaryMenu = document.getElementById('primary-menu');
      const logoDiv = document.querySelector('.popup_menu_logo');

      if (window.innerWidth < 981) {
          if (!logoDiv) {
              primaryMenu.insertAdjacentHTML('beforebegin', logoHTML);
          }
      } else if (logoDiv) {
          logoDiv.remove();
      }
  }

  toggleLogo();

  window.addEventListener('resize', toggleLogo);
  new MutationObserver(toggleLogo).observe(mainNavigation, { attributes: true });
});






// ! Function to add class name to the mobile menu for few pages which has white menu text (before scroll)
document.addEventListener("DOMContentLoaded", () => {
  const classesToCheck = ['page-team', 'page-news', 'page-contact'];
  const hasClass = classesToCheck.some(cls => document.body.classList.contains(cls));
  if (hasClass) document.querySelector('.menu')?.classList.add('menu_white'); 
});




// ! Function to add class name when the Footer is in device viewport

document.addEventListener("DOMContentLoaded", function() {
  const footer = document.querySelector('footer');
  const header = document.querySelector('header');
  const breathingRoom = 50; // Distance in pixels before the footer is in the viewport

  function checkFooterNearView() {
      const footerRect = footer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Check if the footer is near the viewport
      if (footerRect.top <= viewportHeight + breathingRoom && footerRect.bottom >= 0) {
          header.classList.add('footer_inView');
      } else {
          header.classList.remove('footer_inView');
      }
  }

  // Check on scroll
  window.addEventListener('scroll', checkFooterNearView);

  // Check on resize
  window.addEventListener('resize', checkFooterNearView);

  // Initial check
  checkFooterNearView();

  // Observe changes in the DOM that might affect the content height
  const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' || mutation.type === 'attributes' || mutation.type === 'subtree') {
              setTimeout(checkFooterNearView, 100); // Delay to allow content to fully expand/contract
          }
      });
  });

  // Configuration of the observer:
  const config = { attributes: true, childList: true, subtree: true };

  // Start observing the document body or a specific container:
  observer.observe(document.body, config);
});



