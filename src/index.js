document.addEventListener('DOMContentLoaded', () => {

  // VARIABLES
  let styleUl = document.querySelector('#style-list')
  let featuredUl = document.querySelector('#featured-list')
  let beerUl = document.querySelector('#beer-list')
  const bgImage = document.querySelector('#monk-by-the-sea')
  let mainPage = document.querySelector('.main-page')
  // const beerURL = "http://api.brewerydb.com/v2/beers/?key=afe69a87d4126239031c4abba79cd743"


  // Get SIDEBAR on DOM
  sidebarList();
  function sidebarList() {
    fetch("http://localhost:3000/api/v1/beers")
      .then(res => res.json())
      .then(beers => {
        featuredUl.innerHTML = `
        <li>${beers[3]["name"]}</li>
        <li>${beers[5]["name"]}</li>
        <li>${beers[1]["name"]}</li>
        <li>${beers[7]["name"]}</li>
        <li>${beers[14]["name"]}</li>
        <li>${beers[6]["name"]}</li>
        <li>${beers[10]["name"]}</li>
        <li>${beers[32]["name"]}</li>
        `
      })
  }


  const menu = document.querySelector(".menu")
  menu.addEventListener("click", menuOption)

  function menuOption(event) {
    mainPage.innerHTML = ""

    // Show Beer Index
    if (event.target.id === "option-1") {
      fetch("http://localhost:3000/api/v1/beers")
        .then(res => res.json())
        .then(beers => beers.forEach(beer => {
          beerUl.innerHTML += `<li class="beer-name" data-id="${beer.id}">${beer.name}</li>`
        }))

        let styles = ["ALE","LAGER","STOUT","PORTER","MALT","FLAVORED"]

        styles.forEach(style => {
          let li = document.createElement('li')
          li.innerText = style
          li.setAttribute("class", "style-name")
          styleUl.append(li)
          mainPage.append(styleUl)
        })

        mainPage.append(beerUl)
    }
  }


  beerUl.addEventListener("click", showBeerDetailPage)

  function showBeerDetailPage(event) {
    mainPage.innerHTML = ""
    const beerId = event.target.dataset.id

    fetch(`http://localhost:3000/api/v1/beers/${beerId}`)
      .then(res => res.json())
      .then(beer => {
        mainPage.innerHTML = `
        <div>
        <h1>${beer.name}</h1>
        <img src="${beer.image}">
        <h4>Style: ${beer.style}</h4>
        <p>${beer.description}</p>
        </div>
        `
        console.log(beer);
      })
  }




})
