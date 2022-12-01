const languageButton = document.getElementById("languageButton")
const languageInput = document.getElementById("languageInput")
const countryContainer = document.getElementById("countryContainer");

languageButton.addEventListener('click', ()=>{
  countryContainer.innerHTML = ""
  let languageName = languageInput.value
  let languageURL = `https://restcountries.com/v3.1/lang/${languageName}`
  
  fetch(languageURL).then((response) => {if(response.status >= 200 && response.status <300){
    return response.json();
}
else{
    throw 'Fetch failed';
}
})
  
  .then((data) => {
    
    // outerloop
    for(let i = 0; i < data.length; i++){
      

      let countryDiv = document.createElement('div')
      countryContainer.appendChild(countryDiv)
      countryDiv.classList.add("seperateCountry")
      countryDiv.classList.add("largest")

      // lyxnamn
      let countryTitle = document.createElement('h1')
      countryDiv.appendChild(countryTitle)
      countryTitle.innerText = data[i].name.official;

      // subregion
      let countrySubregion = document.createElement('p')
      countryDiv.appendChild(countrySubregion)
      countrySubregion.innerText = data[i].subregion;

      // huvudstad
      let countryCapital = document.createElement('p')
      countryDiv.appendChild(countryCapital)
      countryCapital.innerText = data[i].capital;

      // befolkningsmängd
      let countryPopulation = document.createElement('h1')
      countryDiv.appendChild(countryPopulation)
      countryPopulation.innerText = data[i].population;

      // flagga
      let countryFlag = document.createElement('img')
      countryFlag.src = data[i].flags.png;
      countryDiv.appendChild(countryFlag)
        
      // innerloop
        for(let j = 0; j < data.length; j++){
          if(data[j].population > data[i].population){
            countryDiv.classList.remove("largest")
          }
        }
    }

  }).catch((error) => {
    console.error(error)
    let errorMessage = document.createElement('h1')
    countryContainer.appendChild(errorMessage)
    errorMessage.innerText = "Felaktig sökning. Försök igen"
  })
})



