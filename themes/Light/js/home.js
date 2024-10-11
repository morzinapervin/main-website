document.addEventListener('DOMContentLoaded', () => {
  // Home page header and logo animation starts===================
  let tlHeader
  const logoImage = document.querySelector('.logo_wrapper img')
  const heroContent = document.querySelector('.hm-hero-content')
  const heroSection = document.querySelector('.hero-section');
  const isMobile = window.matchMedia('(max-width: 1024px)').matches
  const whiteLogo = document.querySelector('.white-logo')
  const whiteLogoPaths = document.querySelectorAll('.slide-path')
  const logoText = document.querySelectorAll('.slide-logText')

  // home on load logo animation
  function homeOnLoadLogoAnim() {
    if (document.body.classList.contains('home') && scrollY === 0 && !isMobile) {
      const tlHeader = gsap.timeline()

      tlHeader
        .to(logoImage, { display: 'none', duration: 1 })
        .to(whiteLogo, { display: 'block', duration: 0 })
        .fromTo(
          whiteLogoPaths,
          {
            x: -10,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'linear',
            immediateRender: false,
          }
        )
        .fromTo(
          logoText,
          {
            x: -10,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'linear',
          }
        )
    } else {
       logoImage.style.display = 'block'
        whiteLogo.style.display = 'none'
    }

    // home on scroll logo animation
    function updateHomeLogoScroll() {
      const scroll = window.scrollY || document.documentElement.scrollTop;
      const heroHeight = heroSection.offsetHeight;
      if (window.scrollY >= 5 && tlHeader) {
        tlHeader.kill()
        tlHeader = null
      }
      if (scroll >= heroHeight){
        logoImage.style.display = 'block'
        whiteLogo.style.display = 'none'
        logoImage.src = ''
      } else if (!isMobile) {
        logoImage.src = ''
      }
    }
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 5 && tlHeader) {
        tlHeader.kill()
        tlHeader = null
      }
      updateHomeLogoScroll()
    })
  }
  // home on 1024px logo animation
  function homeLogoMobile() {
    if (document.body.classList.contains('home')) {
      if (isMobile) {
        logoImage, { opacity: 0, duration: 1 }
      }
    }
  }
  homeLogoMobile()
  // Home page header and logo animation ends here=============
  // Home hero section bg and svg animation start==============
  const svgElements = {
    desktop: document.querySelector('.desktop-svg'),
    laptop: document.querySelector('.laptop-svg'),
    tablet: document.querySelector('.tablet-svg'),
    ipadMini: document.querySelector('.ipadmini-svg'),
    mobile: document.querySelector('.mobile-svg'),
  }

  function getSvg() {
    const width = window.innerWidth
    if (width >= 1281 ){
      return {
        svg: svgElements.desktop,
      }
    } else if (width >= 1025) {
      return {
        svg: svgElements.laptop,
      }
    } else if (width >= 769) {
      return {
        svg: svgElements.tablet,
      }
    } else if (width >= 500) {
      return {
        svg: svgElements.ipadMini,
      }
    } else {
      return {
        svg: svgElements.mobile,
      }
    }
  }

  function updateSvg() {
    const { svg } = getSvg()

    document.querySelectorAll('.hm-hero-container svg').forEach((svgElement) => (svgElement.style.display = 'none'))
    svg.style.display = 'block'
  }

  function startAnimation() {
    const { svg } = getSvg()
    const path = svg.querySelector('path')
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length / 1} ${length / 1}`
    path.style.strokeDashoffset = -length / 1

    const tl = gsap.timeline({ defaults: { duration: 1 } })
    tl.to('.desktop-svg, .laptop-svg, .tablet-svg, .ipadmini-svg, .mobile-svg', { opacity: 1, duration: 3 })
      .to(path, { strokeDashoffset: 0, duration: 5 }, '-=4')
      .to(heroContent, {opacity: 1, duration: 2, delay: -1}, '-=2.4' )
      .to('.hm-hero-background', { opacity: 0.001, duration: 1 }, '-=3')
      .to('.hm-hero-background', { opacity: 1, duration: 2, delay: -1 })
      .to(".hero-line-svg", {opacity: 0, duration: 0.5})
      .add(() => {
        homeOnLoadLogoAnim();
      }, '-=3');
  }
  // Home hero section bg and svg animation ends==============
  // drawing vertical line animation
  gsap.registerPlugin(ScrollTrigger)

  const columns = document.querySelectorAll('.animated-column, .animated-img-mobile, .hm-border-content-last')

  function verticalLineAnim() {
    columns.forEach((column) => {
      ScrollTrigger.create({
        trigger: column,
        start: 'top 90%',
        end: 'bottom center',
        onEnter: () => {
          column.classList.add('animate')
        },
      })
    })
  }

  // for sliding text block in DESKTOP
  const dur = 1
  const elements = gsap.utils.toArray('.slide-left-desk')
  const eleRight = document.querySelector('.slide-right-desk')

  function slidingAnimDesk() {
    if (window.innerWidth >= 651) {
      // for sliding to left
      elements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, x: 30, transformOrigin: '50% 50%' },
          {
            opacity: 1,
            x: 0,
            duration: dur,
            scrollTrigger: {
              trigger: element,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(element, { opacity: 1, x: 0, duration: dur })
              },
              once: true,
            },
          }
        )
      })
      // for sliding to right
      if (eleRight) {
        gsap.fromTo(
          eleRight,
          { opacity: 0, x: -30, transformOrigin: '50% 50%' },
          {
            opacity: 1,
            x: 0,
            duration: dur,
            scrollTrigger: {
              trigger: eleRight,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(eleRight, { opacity: 1, x: 0, duration: dur })
              },
              once: true,
            },
          }
        )
      }
    }
  }

  // for sliding text block in MOBILE
  const mblDur = 1
  const mblEleLefts = gsap.utils.toArray('.slide-left-mbl')
  const sectionsHm = document.querySelectorAll(".hm-mbl-section")
  function slidingAnimMbl() {
    if (window.innerWidth <= 650) {
      // for sliding to right
      sectionsHm.forEach((section) => {
        const mblElement = section.querySelectorAll('.slide-right-mbl');
        gsap.fromTo(
          mblElement,
          { opacity: 0, x: -30, transformOrigin: '50% 50%' },
          {
            opacity: 1,
            x: 0,
            duration: dur,
            scrollTrigger: {
              trigger: mblElement,
              start: 'top 90%',
              onEnter: () => {
                gsap.to(mblElement, { opacity: 1, x: 0, duration: mblDur })
              },
              once: true,
            },
          }
        )
      })
      // for sliding to left
      if (mblEleLefts) {
        sectionsHm.forEach((section) => {
          const mblEleLeft = section.querySelectorAll('.slide-left-mbl');
          gsap.fromTo(
            mblEleLeft,
            { opacity: 0, x: 20, transformOrigin: '50% 50%' },
            {
              opacity: 1,
              x: 0,
              duration: dur,
              scrollTrigger: {
                trigger: mblEleLeft,
                start: 'top 90%',
                onEnter: () => {
                  gsap.to(mblEleLeft, { opacity: 1, x: 0, duration: mblDur })
                },
                once: true,
              },
            }
          )
        })
      }
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    updateSvg()
    startAnimation()
    verticalLineAnim()
    slidingAnimDesk()
    slidingAnimMbl()
    homeLogoMobile()
  })

  window.addEventListener('resize', () => {
    updateSvg()
    verticalLineAnim()
    homeOnLoadLogoAnim()
  })

});

// Parallax animation for homepage hero
const parallaxAnim = gsap.timeline({defaults: {ease: "none",}, scrollTrigger: {
  trigger:".hm-hero",
    start:"top top",
    end: "+=300",
    scrub: 2,
}})
.fromTo(".sky-layer", {yPercent: -12.5}, {yPercent: 0}, 0)
.to(".city-layer", {yPercent: 10}, 0)
.to(".skyline-layer, .hero-line-svg", {yPercent: 5}, 0)




// mini zoom on scroll on small images 
document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);

  // Check if the screen width is below 1025px
  if (window.innerWidth < 1025) {
    const images = document.querySelectorAll(".hm-pic-desktop, .animated-img-mobile img");

    // Iterate over each image element
    images.forEach(function(image) {
      gsap.to(image, {
        scale: 1.05,
        duration: 2.5, 
        ease: "none",
        scrollTrigger: {
          trigger: image,
          start: "top 50%", 
          toggleActions: "play none none none",
          once: true, 
        }
      });
    });
  }
});



