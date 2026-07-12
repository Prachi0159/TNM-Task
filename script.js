/* ===================================================
   1. HERO SLIDER (auto changes every 4 seconds)
=================================================== */
let heroSlides = document.querySelectorAll(".hero__slide");
let heroDots = document.querySelectorAll("#hero-dots .dot");
let currentSlide = 0;

// Show one slide and its matching dot
function showSlide(index) {
  // If we go past the last slide, go back to the first
  if (index >= heroSlides.length) {
    index = 0;
  }
  // If we go before the first slide, jump to the last
  if (index < 0) {
    index = heroSlides.length - 1;
  }
  currentSlide = index;

  // Hide all slides and dots
  for (let i = 0; i < heroSlides.length; i++) {
    heroSlides[i].classList.remove("is-active");
    heroDots[i].classList.remove("is-active");
  }

  // Show only the current one
  heroSlides[currentSlide].classList.add("is-active");
  heroDots[currentSlide].classList.add("is-active");
}

// Next / previous buttons
function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlide() {
  showSlide(currentSlide - 1);
}

document.getElementById("hero-next").onclick = nextSlide;
document.getElementById("hero-prev").onclick = prevSlide;

// Clicking a dot goes to that slide
for (let i = 0; i < heroDots.length; i++) {
  heroDots[i].onclick = function () {
    showSlide(i);
  };
}


setInterval(nextSlide, 4000);


/* ===================================================
   2. TRENDING SLIDER (arrows move the cards)
=================================================== */
let trendingTrack = document.getElementById("trending-track");

// Put the correct card in the middle as "active"
function updateTrendingActive() {
  let cards = trendingTrack.querySelectorAll(".trend-card");
  let middle = 1; // there are 3 cards, so index 1 is the center

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("trend-card--active", "trend-card--side");
    if (i === middle) {
      cards[i].classList.add("trend-card--active");
    } else {
      cards[i].classList.add("trend-card--side");
    }
  }
}

// Next
document.getElementById("trend-next").onclick = function () {
  let cards = trendingTrack.querySelectorAll(".trend-card");
  trendingTrack.appendChild(cards[0]);
  updateTrendingActive();
};

// Previous: move the last card to the front
document.getElementById("trend-prev").onclick = function () {
  let cards = trendingTrack.querySelectorAll(".trend-card");
  trendingTrack.insertBefore(cards[cards.length - 1], cards[0]);
  updateTrendingActive();
};


/* ===================================================
   3. VIDEOS SLIDER (slides left and right)
=================================================== */
let videosTrack = document.getElementById("videos-track");
let videoIndex = 0;

function slideVideos() {
  let cards = videosTrack.querySelectorAll(".video-card");
  let lastIndex = cards.length - 1;

  // Keep the index inside the allowed range
  if (videoIndex < 0) {
    videoIndex = 0;
  }
  if (videoIndex > lastIndex) {
    videoIndex = lastIndex;
  }

  // Each step moves the track by 50%
  videosTrack.style.transform = "translateX(-" + videoIndex * 50 + "%)";
}

document.getElementById("video-next").onclick = function () {
  videoIndex = videoIndex + 1;
  slideVideos();
};
document.getElementById("video-prev").onclick = function () {
  videoIndex = videoIndex - 1;
  slideVideos();
};


/* ===================================================
   4. MOBILE MENU (hamburger open / close)
=================================================== */
let hamburger = document.getElementById("hamburger");
let navMenu = document.getElementById("nav-menu");

hamburger.onclick = function () {
  navMenu.classList.toggle("is-open");
};


/* ===================================================
   5. SCROLL for the navbar links
=================================================== */
let pageLinks = document.querySelectorAll('a[href^="#"]');

for (let i = 0; i < pageLinks.length; i++) {
  pageLinks[i].onclick = function (event) {
    let targetId = this.getAttribute("href");

    // Skip empty "#" links
    if (targetId === "#") {
      return;
    }

    let target = document.querySelector(targetId);
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      navMenu.classList.remove("is-open"); 
    }
  };
}
