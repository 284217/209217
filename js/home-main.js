// ===== Slideshow =====
let slideIndex = 1;
let track = document.getElementById("slideshow-track");
let slides = document.querySelectorAll(".slideshow-slide");
const totalSlides = slides.length;

// Clone first & last slides
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[totalSlides - 1].cloneNode(true);
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Update after cloning
const allSlides = document.querySelectorAll(".slideshow-slide");

// Initial position (-100% because of prepended lastClone)
track.style.transform = `translateX(-${slideIndex * 100}%)`;

function moveSlides() {
  slideIndex++;
  track.style.transition = "transform 0.8s ease-in-out";
  track.style.transform = `translateX(-${slideIndex * 100}%)`;

  track.addEventListener("transitionend", () => {
    if (allSlides[slideIndex].isEqualNode(firstClone)) {
      track.style.transition = "none";
      slideIndex = 1;
      track.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
    if (allSlides[slideIndex].isEqualNode(lastClone)) {
      track.style.transition = "none";
      slideIndex = totalSlides;
      track.style.transform = `translateX(-${slideIndex * 100}%)`;
    }
  }, { once: true }); // avoid stacking listeners
}

setInterval(moveSlides, 3000);


// ===== Search Bar Features =====
const searchInput = document.getElementById("photographer-search");
const suggestionsList = document.getElementById("suggestions-list");
const clearBtn = document.getElementById("clear-search");
const voiceBtn = document.getElementById("voice-search");
//const photographersList = document.getElementById("photographers-list");
//const seeMoreBtn = document.getElementById("see-more");

// Example photographer data
let photographers = [
  { name: "Gayan K Senevirathna", category: "Fasion, Portraits", rating: 4.8 },
  { name: "Maleesha Mihisara", category: "Nature, Travel", rating: 4.6},
  { name: "Shehan Anuranga", category: "Events, Nature, Lifestyle", rating: 4.9},
  { name: "Nethmina L Chathuranga", category: "Commercial, Product", rating: 4.7},
  { name: "Theeskshana Malshan", category: "Art, Creative", rating: 4.5},
  { name: "Yuwantha Nethsara", category: "Sports, Action", rating: 4.8 },
];




// Search filtering
searchInput.addEventListener("input", () => {
  let query = searchInput.value.toLowerCase();
  suggestionsList.innerHTML = "";
  if (query) {
    suggestionsList.style.display = "block";
    let matches = photographers.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.category.toLowerCase().includes(query)
    );
    matches.forEach(m => {
      let highlighted = m.name.replace(new RegExp(query, "gi"), match => `<mark>${match}</mark>`);
      suggestionsList.innerHTML += `<li class="list-group-item">${highlighted}</li>`;
    });
  } else {
    suggestionsList.style.display = "none";
  }
});

// Suggestion click
suggestionsList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI" || e.target.tagName === "MARK") {
    searchInput.value = e.target.textContent.trim();
    suggestionsList.style.display = "none";
    filterCards();
  }
});

// Clear button
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  suggestionsList.style.display = "none";
  renderPhotographers();
});

// Voice Search
voiceBtn.addEventListener("click", () => {
  if ('webkitSpeechRecognition' in window) {
    let recognition = new webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    recognition.onresult = function(event) {
      searchInput.value = event.results[0][0].transcript;
      filterCards();
    };
  } else {
    alert("Voice search is not supported in your browser.");
  }
});

// Scroll search to top on focus
searchInput.addEventListener("focus", () => {
  document.querySelector("#search-section").scrollIntoView({ behavior: "smooth" });
});
