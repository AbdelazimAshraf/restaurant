/*
https://dummyjson.com/docs
https://www.themealdb.com/api.php
*/
// ============================================
// Simple Meal Recipe App
// ============================================

// API Configuration
const API_URL = "https://www.themealdb.com/api/json/v1/1";
// Global Variables
let allMeals = [];
const MEALS_PER_PAGE = 6;
let currentChunkIndex = 0;

// ============================================
// Function 1: Load All Meals on Page Load
// ============================================
/**
 * Load all meals when page loads
 * Uses Fetch API with Promises
 * Only loads meals starting with letter 'a'
 */
function loadAllMeals() {
  allMeals = [];
  currentChunkIndex = 0;
  fetch(`${API_URL}/search.php?f=a`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals || [];
      allMeals = meals;

      //   displayMeals(allMeals);
      displayMealsChunk();
      //   console.log("allMeals:", allMeals);
      document.getElementById("loaderScreen").classList.add("d-none");
    })
    .catch((error) => {
      console.error("Error loading meals:", error);
      alert("Failed to load meals. Please refresh the page.");
      document.getElementById("loaderScreen").classList.add("d-none");
    });
}

// ============================================
// Function 2: Display Meals
// ============================================
/**
 * Display meals in the container
 * DOM Manipulation
 * @param {Array} meals - Array of meal objects
 */

function displayMeals(meals, appendData = false) {
  const container = document.getElementById("mealsContainer");

  if (!appendData) {
    container.innerHTML = "";
  }

  if (meals.length === 0 && !appendData) {
    container.innerHTML =
      '<div class="col-12"><p class="text-center">No meals found.</p></div>';
    return;
  }

  meals.forEach((meal) => {
    const col = document.createElement("div");
    col.className = "col-md-4 col-sm-6 mb-4";

    col.innerHTML = `
        <div class="card h-100 shadow-sm">
            <img src="${meal.strMealThumb}"
                alt="${meal.strMeal}" class="card-img-top" style="height: 250px; object-fit: cover;">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text text-muted">${meal.strCategory || "N/A"}</p>
                <button class="btn btn-primary" onclick="showMealDetails('${meal.idMeal}')">
                    View Details
                </button>
            </div>
        </div>
    `;

    container.appendChild(col);
  });
}

// ============================================
// Function 3: Display Meals Chunk (6 meals)
// ============================================

/**
 * Display meals in chunks of 6
 * Simple function for beginners
 */
function displayMealsChunk() {
  const startIndex = currentChunkIndex * MEALS_PER_PAGE; // 0 * 6 => 0
  const endIndex = startIndex + MEALS_PER_PAGE; // 0 + 6 = 6

  const chunk = allMeals.slice(startIndex, endIndex); // 0,6

  if (chunk.length === 0) {
    document.getElementById("loadMoreBtn").classList.add("d-none");
    return;
  }

  displayMeals(chunk, currentChunkIndex > 0);

  if (endIndex >= allMeals.length) {
    document.getElementById("loadMoreBtn").classList.add("d-none");
  } else {
    document.getElementById("loadMoreBtn").classList.remove("d-none");
  }
}

// ============================================
// Function 4: Load More Meals
// ============================================

/**
 * Load more meals from array chunks (6 by 6)
 * Simple function for beginners
 */
function loadMoreMeals() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  loadMoreBtn.disabled = true;

  setTimeout(() => {
    currentChunkIndex++;
    displayMealsChunk();
    loadMoreBtn.disabled = false;
  }, 300);
}

// ============================================
// Function 5: Search Meals
// ============================================

/**
 * Search for meals by name
 * @param {string} searchTerm - The meal name to search for
 */

function searchMeals(searchTerm) {
  //    console.log("searchTerm",searchTerm)

  // sanitize data
  let cleanedSearchTerm = sanitizeData(searchTerm);
  // reset
  if (!cleanedSearchTerm) {
    currentChunkIndex = 0;
    displayMealsChunk();
    document.getElementById("loadMoreBtn").style.display = "block";
    return;
  }

  fetch(`${API_URL}/search.php?s=${encodeURIComponent(cleanedSearchTerm)}`)
    .then((response) => response.json())
    .then((data) => {
      const meals = data.meals || [];

      console.log("meals", meals);
      allMeals = meals;
      console.log("allMeals", allMeals);

      currentChunkIndex = 0;
      displayMealsChunk();
    })
    .catch((error) => {
      console.error("Error loading meals:", error);
      alert("Failed to search meals. Please try again");
    });
}

function sanitizeData(input) {
  return input.trim().replace(/[<>]/g, "");
}



// ============================================
// Function 7: Toggle Dark Mode
// ============================================

/**
 * Toggle dark mode and save to localStorage
 * BOM - localStorage usage
 */
function toggleDarkMode() {
  const body = document.body;
  const isDark = body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDark);

  // Update icon
  const icon = document.getElementById("darkModeIcon");
  icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
}
/**
 * Load dark mode preference from localStorage
 */
function loadDarkMode() {
  const savedMode = localStorage.getItem("darkMode");
  if (savedMode === "true") {
    document.body.classList.add("dark-mode");
    document.getElementById("darkModeIcon").classList = "fas fa-sun"
  }
}

window.addEventListener("DOMContentLoaded", function () {
  loadDarkMode();
  loadAllMeals();
  loadAreas(); // Load country areas

  document
    .getElementById("searchForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const searchTerm = document.getElementById("searchInput").value;
      searchMeals(searchTerm);
    });

  document
    .getElementById("darkModeToggle")
    .addEventListener("click", toggleDarkMode);

  document
    .getElementById("backButton")
    .addEventListener("click", closeMealDetails);

  document.getElementById("areaFilter").addEventListener("change", function (e) {
    const area = e.target.value;
    if (area) {
      filterByArea(area);
    } else {
      loadAllMeals();
    }
  });
});

// ============================================
// Function 6: Show Meal Details
// ============================================

/**
 * Show meal details page
 * Navigates to details page
 * @param {string} mealId - The meal ID
 */
function showMealDetails(mealId) {
  document.getElementById("loaderScreen").classList.remove("d-none");

  fetch(`${API_URL}/lookup.php?i=${mealId}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals ? data.meals[0] : null;
      if (meal) {
        displayMealDetails(meal);
      } else {
        alert("Meal details not found.");
      }
    })
    .catch(error => {
      console.error("Error details:", error);
      alert("Failed to load details");
    })
    .finally(() => {
      document.getElementById("loaderScreen").classList.add("d-none");
    });
}

function displayMealDetails(meal) {
  document.getElementById("mainContent").classList.add("d-none");
  document.getElementById("mealDetailsPage").classList.remove("d-none");

  // Generate Ingredients List
  // Generate Ingredients List
  let ingredientsHtml = '<div class="row g-2">';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredientsHtml += `
            <div class="col-sm-6">
                <div class="d-flex justify-content-between align-items-center p-2 border rounded bg-white">
                    <span>${ingredient}</span>
                    <span class="badge bg-primary rounded-pill">${measure}</span>
                </div>
            </div>
            `;
    }
  }
  ingredientsHtml += '</div>';



  const content = `
        <div class="row">
            <div class="col-md-4 mb-4">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid w-100 rounded mb-4 shadow-sm" style="border: 4px solid white;">
                

                 
                <div class="mt-4 text-center">
                     <a href="${meal.strSource}" target="_blank" class="btn btn-dark w-100 ${meal.strSource ? '' : 'd-none'}">
                        <i class="fas fa-external-link-alt me-2"></i>View Original Source
                     </a>
                     <a href="${meal.strYoutube}" target="_blank" class="btn btn-danger w-100 mt-2 ${meal.strYoutube ? '' : 'd-none'}">
                        <i class="fab fa-youtube me-2"></i>Watch on YouTube
                     </a>
                </div>
            </div>
            
            <div class="col-md-8">
                <div class="d-flex justify-content-between align-items-start mb-3">
                    <h2 class="display-5 fw-bold mb-0">${meal.strMeal}</h2>
                    <div class="text-end">
                        <span class="badge bg-danger mb-1">${meal.strCategory}</span><br>
                        <span class="badge bg-secondary">${meal.strArea}</span>
                    </div>
                </div>

                <div class="row">
                     <div class="col-12 mb-4">
                         <div class="p-4 rounded shadow-sm bg-light border border-light">
                            <h3 class="h4 mb-3 border-bottom pb-2 border-success"><i class="fas fa-carrot me-2 text-success"></i>Ingredients</h3>
                            ${ingredientsHtml}
                        </div>
                    </div>

                    <div class="col-12">
                        <div class="p-4 rounded shadow-sm bg-white border border-light h-100">
                             <h3 class="h4 mb-3 border-bottom pb-2 border-warning"><i class="fas fa-book-open me-2 text-primary"></i>Instructions</h3>
                             <p class="lead fs-6 text-muted" style="white-space: pre-line; line-height: 1.8;">${meal.strInstructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

  document.getElementById("mealDetailsContent").innerHTML = content;
  // Scroll to top
  window.scrollTo(0, 0);
}

function closeMealDetails() {
  document.getElementById("mealDetailsPage").classList.add("d-none");
  document.getElementById("mainContent").classList.remove("d-none");
  // Preserve scroll position or reset? Let's verify usage.
}

// ============================================
// Function 8: Country/Area API
// ============================================

function loadAreas() {
  fetch(`${API_URL}/list.php?a=list`)
    .then(res => res.json())
    .then(data => {
      const areas = data.meals || [];
      const select = document.getElementById("areaFilter");

      areas.forEach(area => {
        const option = document.createElement("option");
        option.value = area.strArea;
        option.textContent = area.strArea;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error loading areas:", err));
}

function filterByArea(area) {
  document.getElementById("loaderScreen").classList.remove("d-none");

  fetch(`${API_URL}/filter.php?a=${area}`)
    .then(res => res.json())
    .then(data => {
      allMeals = data.meals || [];
      currentChunkIndex = 0;
      displayMealsChunk();
    })
    .catch(err => {
      console.error("Error filtering:", err);
      alert("Failed to filter by area");
    })
    .finally(() => {
      document.getElementById("loaderScreen").classList.add("d-none");
    });
}


// how to host site in git
// https://www.youtube.com/watch?si=g0LI2C798gyPMMXk&v=e5AwNU3Y2es&feature=youtu.be