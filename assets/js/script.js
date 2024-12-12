document.addEventListener("DOMContentLoaded", function () {
	
	toggleMenu();
	windowLoad();
	resizeStikyElement();
	reviewsSlider();
	accordionFunction();
	addAnimationInit();
	galleryTabs();
	animationHeader();
});
AOS.init({
	duration: 1000,
});
const animationHeader = () =>{
	let lastScrollTop = 0;

  window.addEventListener("scroll", function () {
		const headerNav = document.querySelector(".header__bottom");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		let windowInnerWidth = window.innerWidth;
    if (windowInnerWidth >= 1024) {
      if (scrollTop > lastScrollTop) {
        if (scrollTop > 100) {
          headerNav.classList.add("fixed-header-nav");
          headerNav.style.animationName = "smoothScroll";
        }
      } else if (scrollTop <= 0) {
        headerNav.classList.remove("fixed-header-nav");
        headerNav.style.animationName = "removeSmoothScroll";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
  });
}
const toggleMenu = () =>{
	const htmlElement = document.querySelector("html");
	const burgerMenu = document.querySelector(".burger");
  const navLinks = document.querySelectorAll("nav a");
  burgerMenu.addEventListener("click", () =>
    htmlElement.classList.toggle("open")
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      htmlElement.classList.remove("open");
    });
  });
}
function windowLoad() {

	function statValueInit(statValues) {
		let values = statValues ? statValues : document.querySelectorAll('.stat-value');
		if (values) {
			values.forEach(statValue => {
				numScroll(statValue);
			})
		}
	}

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const statValues = targetElement.querySelectorAll('.stat-value');
				if (statValues.length) {
					statValueInit(statValues);
				}
			}
		})
	}, { threshold: 0.7});

	let sections = document.querySelectorAll('.who__count');
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		})
	}

	function numScroll(statValue) {
		let zeroValues = () => {
			statValue.innerHTML = 0;
		}

		const animationDuration = 3000;
		const frameDuration = 1000 / 60;
		const totalFrames = Math.round(animationDuration / frameDuration);
		const easeOutQuad = t => t * (2 - t);

		const animateCountUp = () => {
			let frame = 0;
			const countTo = parseInt(statValue.dataset.target.replace(/,/g, ''), 10);

			const counter = setInterval(() => {
				frame++;
				const progress = easeOutQuad(frame / totalFrames);
				const currentCount = Math.round(countTo * progress);

				if (parseInt(statValue.innerHTML, 10) !== currentCount) {
					statValue.innerHTML = currentCount;
				}

				if (frame === totalFrames) {
					clearInterval(counter);
					statValue.innerHTML = statValue.dataset.target;
				}
			}, frameDuration);
		}

		const runAnimations = () => {
			animateCountUp();
		}
		runAnimations();
	}
	window.addEventListener('DOMContentLoaded', () => {
		statValueInit();
	});

}


const resizeStikyElement = () => {
	const stikyElement = document.querySelectorAll(".stage__item__content");
	let windowInnerWidth = window.innerWidth;

	if (windowInnerWidth >= 1024 && stikyElement) {
		stikyElement.forEach((stiky, index) => {
			stiky.style.top = `calc(100px + ${50 * index}px)`;
		});
	} else if (windowInnerWidth <= 1023 && stikyElement) {
		stikyElement.forEach((stiky, index) => {
			stiky.style.top = `calc(50px + ${50 * index}px)`;
		});
	}
};
window.addEventListener("resize", resizeStikyElement);

const reviewsSlider = () => {
  const parentReviewsSlider = document.querySelector('.reviews');
	if(!parentReviewsSlider) return;
  if (!parentReviewsSlider.classList.contains('withoutSlider')) {
	
    const initReviewsSlider = document.querySelector('.reviewsSlider');
		if(!initReviewsSlider) return;
    const reviewsSliderInit = new Swiper(".reviewsSlider", {
      pagination: {
        el: ".reviews-pagination",
        type: "progressbar",
      },
      navigation: {
        nextEl: ".reviews-button-next",
        prevEl: ".reviews-button-prev",
      },
      slidesPerView: 1,
      spaceBetween: 20,
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      },
    });
  } else {
    const swiperElements = document.querySelector('.reviews__slider');
		if(!swiperElements) return;
		const childElements = swiperElements.querySelectorAll('*');
	
		childElements.forEach((el) => {
			Array.from(el.classList).forEach((className) => {
				
				if (className.startsWith('swiper-') || className === 'swiper') {
					el.classList.remove(className);
				}
			});
		});
		
  }
};

const accordionFunction = () => {
  const accordionItems = document.querySelectorAll(".accord-item");
  
  accordionItems.forEach((item) => {
    item.addEventListener("click", function () {
        item.classList.toggle("active");
    });
  });
};
const addAnimationInit = () => {

	const scrollers = document.querySelectorAll('.marquee');
	if(!window.matchMedia("(prefers-reduced-motion:reduce)").matches){
		addAnimation();
	}
	function addAnimation(){
		scrollers.forEach((scroller) =>{
			scroller.setAttribute("data-animate", true);
			const scrollerInner = scroller.querySelector('.marquee__wrap');
			const scrollerContent = Array.from(scrollerInner.children);
			scrollerContent.forEach(item =>{
				const duplicatedItem = item.cloneNode(true);
				duplicatedItem.setAttribute('aria-hidden', true);
				scrollerInner.appendChild(duplicatedItem);
			});
			
		});
	}
}
const galleryTabs = () =>{
	const galleryNameImg = document.querySelectorAll(".gallery__img");
const galleryTabsBtn = document.querySelectorAll(".gallery__tab");

if (galleryTabsBtn) {
  function showImage(imageSlug) {
    galleryNameImg.forEach((image) => {
      let imageDataSlug = image.dataset.slug;
      if (imageDataSlug === imageSlug) {
        image.style.display = "flex";
      } else {
        image.style.display = "none";
      }
    });
  }

  function activeTabs() {
    galleryTabsBtn.forEach((tab) => {
      let tabsSlug = tab.dataset.slug;
      let hasImage = false;

      galleryNameImg.forEach((image) => {
        let imageDataSlug = image.dataset.slug;
        if (imageDataSlug === tabsSlug) {
          hasImage = true;
          return;
        }
      });

      if (hasImage || tabsSlug === 'all') {
        tab.style.display = "flex";
      } else {
        tab.style.display = "none";
      }

      tab.addEventListener('click', () => {
        galleryTabsBtn.forEach((t) => t.classList.remove('active-tab'));
        tab.classList.add('active-tab');
        if (tabsSlug === 'all') {
          galleryNameImg.forEach((image) => {
            image.style.display = "flex";
          });
        } else {
          showImage(tab.dataset.slug);
        }
      });
    });
  }

  activeTabs();
}
}