const select = document.querySelector("#countriesSelector");
const search = document.querySelector("#countriesSearch");
const searchButton = document.querySelector("#searchButton");


//----------------------- countriesSelector ---------------------------

// --- Отримання масиву з країнами ---
async function fetchData() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all?fields=name');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const countries = await response.json();

        // --- Сортування країн за алфавітом ---
        const sortedCountries = countries.sort((a, b) => {
          const nameA = a.name.common.toUpperCase(); 
          const nameB = b.name.common.toUpperCase();
          if (nameA < nameB) {
              return -1;
          }
          if (nameA > nameB) {
              return 1;
          }
          return 0;
        });

        countriesOption(sortedCountries);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// --- Виведення країн на сторінку ---
function countriesOption(countries) {
    countries.forEach(country => {
        const option = document.createElement("option");
        option.innerHTML = country.name.common;
        select.appendChild(option);
    });
}

fetchData();

//----------------------- countriesSearch ---------------------------

function selectCountry() {
  const searchValue = search.value.trim().toLowerCase();
  for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].text.toLowerCase() === searchValue) {
          select.selectedIndex = i;

          search.value = "Search country    ";
          break;
      }
  }
}


search.addEventListener("keydown", (event) => {
if (event.key === "Enter") {
  selectCountry();
}
});


searchButton.addEventListener("click", selectCountry);