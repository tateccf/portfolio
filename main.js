// ======== MENU FUNCTIONALITY ========//
(function () {
  const menuBtn = document.querySelector('.menu-btn');
  const sidebar = document.querySelector('aside');
  const closeBtn = document.querySelector('.menu-sidebar__close-btn');

  //When clicking the hamburguer menu, show the sidebar
  menuBtn.addEventListener('click', function () {
    sidebar.classList.toggle('show');
  });

  //Close the menu sidebar

  closeBtn.addEventListener('click', function () {
    sidebar.classList.toggle('show');
  });
})();

// ======== STICKY NAV ========//

(function () {
  const header = document.querySelector('header');
  const navigation = document.querySelector('.main-nav');
  const navHeight = navigation.getBoundingClientRect().height;

  function stickyNav(entries) {
    const [entry] = entries;

    //Stick the navbar if the header is not intersecting
    if (!entry.isIntersecting) {
      navigation.classList.add('sticky');
    } else {
      navigation.classList.remove('sticky');
    }
  }
  const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.1,
    rootMargin: `${navHeight}px`,
  });

  //Start to observe the header element
  headerObserver.observe(header);
})();

// ======== SMOOTH SCROLLING ========//

(function () {
  const arrowDownBtn = document.querySelector('.header__arrow-down');
  arrowDownBtn.addEventListener('click', function () {
    const about = document.querySelector('.about');
    about.scrollIntoView({ behavior: 'smooth' });
  });

  //Select all navlinks
  const navLinks = document.querySelectorAll('.main-nav__link');
  const menuSidebarLinks = document.querySelectorAll('.menu-sidebar__link');
  const allLinks = [...navLinks, ...menuSidebarLinks];

  allLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const id = link.getAttribute('href');

      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });

      //If we navigate from sidebar, close it after clicking the link
      if (link.classList.contains('menu-sidebar__link')) {
        const sidebar = document.querySelector('aside');
        sidebar.classList.remove('show');
      }
    });
  });
})();

// ======== REVEAL SECTIONS ON SCROLL========//
(function () {
  const allSections = document.querySelectorAll('section');

  const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  };

  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });

  allSections.forEach(function (section) {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
  });
})();
