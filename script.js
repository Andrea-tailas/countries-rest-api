
//dark mode
const dark=document.getElementById('theme')
dark.addEventListener('click',()=>{
    document.body.classList.toggle('dark-mode')
    const dk=document.getElementById('dk')
    dk.innerHTML="☪️Dark Mode"
})





//filtering data from api
function displayCountry(data) {
  const main = document.getElementById('main')

  const container = document.createElement('div');
  container.classList.add('container');
  const imageDiv = document.createElement('div');
  imageDiv.classList.add('image');
  const image = document.createElement('img');
  flag_image = data.flags['png']
  image.src = flag_image;
  imageDiv.appendChild(image);


  const info = document.createElement('div');
  info.classList.add('info');

  const h3 = document.createElement('h3');

  h3.innerText = data.name

  const contryInfo = document.createElement('div');
  contryInfo.classList.add('contry-info');

  const population = document.createElement('p');
  population.innerHTML = `<span>Population:</span> <span>${data.population}</span>`;
  contryInfo.appendChild(population);

  const region = document.createElement('p');
  region.innerHTML = `<span>Region:</span> <span>${data.region}</span>`;
  contryInfo.appendChild(region);

  const capital = document.createElement('p');
  capital.innerHTML = `<span>Capital:</span> <span>${data.capital}</span>`;
  contryInfo.appendChild(capital);

  info.appendChild(h3);
  info.appendChild(contryInfo);

  container.appendChild(imageDiv);
  container.appendChild(info);

  main.appendChild(container);

}
//countries sorting

function displayCountries(contriesData, selectedContinent) {
  const mainContainer = document.getElementById('main')
  mainContainer.innerHTML = '';
  contriesData.forEach((countryInfo) => {
    if (countryInfo.region === selectedContinent) {
      console.log(countryInfo.name)
      displayCountry(countryInfo);
    }
  });
}

const filterDropdown = document.getElementById('filter-dropdown');
filterDropdown.addEventListener('change', () => {
  const selectedContinent = filterDropdown.value;
  (async () => {
    try {
      const countriesData = await countryInformation();
      displayCountries(countriesData, selectedContinent);
    } catch (error) {
      console.error('Error fetching country information:', error);
    }
  })();
});


const countrySearch = document.getElementById('country');
countrySearch.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const inputValue = countrySearch.value;
    (async () => {
      try {
        const countriesData = await countryInformation();
        countriesData.forEach(country => {
          if (country.name.lower() === inputValue.toLowerCase()) {
            console.log(country)
            displayCountry(country);
          }
        })
      } catch (error) {
        console.error('Error fetching country information:', error);
      }
    })();
  }
});

(async () => {
  try {
    const contriesData = await countryInformation();
    contriesData.forEach(countryInfo => {
      displayCountry(countryInfo);
    });
  } catch (error) {
    console.error('Error fetching country information:', error);
  }
})();


async function countryInformation() {

  const jsonUrl = './data.json';

  try {

    const response = await fetch(jsonUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }


    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation: \n' + error.message);
  }
}

// const v=document.querySelector('#country')
// v.addEventListener('submit',()=>{
//   function searchCountry(input) {
//     const searchTerm = input.toLowerCase();
//     const searchResults = [];
  
//     for (let i = 0; i < data.length; i++) {
//       const country = data[i];
//       const name = country.name.toLowerCase();
  
//       if (name.includes(searchTerm)) {
//         searchResults.push(country);
//       }
//     }
  
//     return searchResults;
//   }
//   searchCountry()
// })

  const countrySearch = document.getElementById('country');
  countrySearch.addEventListener('keydown', (event) => {
    // event.preventDefault()
    if (event.key === 'Enter') {
      const inputValue = countrySearch.value;
      (async () => {
        try {
          const countriesData = await countryInformation();
          const selectedcountry=countriesData.find(country=>country.name.toLowerCase()==inputValue.toLowerCase())
            if (selectedcountry) {
              const mainContainer=document.getElementById('main')
              mainContainer.innerHTML=''
              displayCountry(selectedcountry)
            }
          }
        catch (error) {
          console.error('Error fetching country information:', error);
        }
      })();
    }
  });
const countrylist=document.getElementById('main')
countrylist.addEventListener('click',(event)=>{
  const yen=document.querySelector('.container')
  yen.forEach(elem=>{
    countrylist.innerHTML=''
    displayCountry(elem)
  })
})

