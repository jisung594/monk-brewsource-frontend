document.addEventListener('DOMContentLoaded', () => {

  // VARIABLES
  let styles = [
    "ALE",
    "LAGER",
    "PILSNER",
    "IPA",
    "PORTER",
    "STOUT",
    "WHEAT",
    "FRUIT",
    "HEFEWEIZEN"
  ]
  let countries = [
    "UNITED STATES",
    "GERMANY",
    "JAPAN"
  ]
  let mainPage = document.querySelector('.main-page')
  let styleUl = document.querySelector('#style-list')
  let countryUl = document.querySelector('#country-list')
  let featuredUl = document.querySelector('#featured-list')
  let beerUl = document.querySelector('#beer-list')
  let breweryUl = document.querySelector('#brewery-list')
  let bgImage = document.querySelector('#monk-by-the-sea')

  // const beerURL = "https://api.brewerydb.com/v2/beers/?key=afe69a87d4126239031c4abba79cd743"



// Shows Complete List of Beers (BEERS menu option in navbar) ------------------
  const menu = document.querySelector(".menu")
  menu.addEventListener("click", menuOption)

  function menuOption(event) {
    mainPage.innerHTML = ""
    styleUl.innerHTML = ""
    countryUl.innerHTML = ""

    // Show Beer Index
    if (event.target.id === "option-1") {
      styles.forEach(style => {
        let styleLi = document.createElement('li')
        styleLi.innerText = style
        let styleDiv = document.createElement('div')
        styleLi.setAttribute("id", style)
        // styleDiv.setAttribute("class", "style-div")
        styleDiv.append(styleLi)
        styleUl.append(styleDiv)
        mainPage.append(styleUl)
      })
    }

    // Show Brewery Index
    if (event.target.id === "option-2") {
      countries.forEach(country => {
        let countryLi = document.createElement('li')
        countryLi.innerText = country
        let countryId = country.split("").map(char => {
          if (char === " ") {
            return "_"
          } else {
            return char
          }
        }).join("").toUpperCase()
        let countryDiv = document.createElement('div')
        countryLi.setAttribute("id", countryId)
        // countryDiv.setAttribute("class", "country-div")
        countryDiv.append(countryLi)
        countryUl.append(countryDiv)
        mainPage.append(countryUl)
      })
    }

    if (event.target.id === "option-3") {
      mainPage.innerHTML += `<img src="assets/monk_logo_physical 2.png" alt="logo" id="monk-logo-full"/>
      <p id="philosophy">A tribute to leading beer review platforms, such as BeerAdvocate and Untapped. Such web applications offer an extensive list of beers from all over the world, constantly updated whenever a new brew or brewery pops up on the market. Monk Brewsource is an online community space for enthusiasts and hobbyists alike.</p>`
    }
  }


  styleUl.addEventListener("click", showBeersByStyle)

  function showBeersByStyle(event) {
    mainPage.innerHTML = ""
    beerUl.innerHTML = ""

    fetch('https://http://monk-brewsource-api.herokuapp.com/api/v1/beers')
      .then(res => res.json())
      .then(beers => {
        let sortedBeers = beers.sort((b1,b2) => {
          if (b2.name > b1.name) {
            return -1
          } else {
            return 1
          }
        })

        let styleHeader = document.createElement('h2')
        styleHeader.setAttribute('class', 'index-header')
        styleHeader.innerText = event.target.id
        mainPage.append(styleHeader)

        sortedBeers.forEach(beer => {
          if (beer.style.toLowerCase().includes(event.target.id.toLowerCase()) ||
          beer.description.toLowerCase().includes(event.target.id.toLowerCase())) {
            let beerLi = document.createElement("li")
            beerLi.innerText = beer.name + ` (${beer.brewery})`
            beerLi.setAttribute("data-id", `${beer.id}`)
            beerUl.append(beerLi)
            mainPage.append(beerUl)
          }
        })
    })
  }


  countryUl.addEventListener("click", showBreweryByCountry)

  function showBreweryByCountry(event) {
    mainPage.innerHTML = ""
    breweryUl.innerHTML = ""

    fetch("https://http://monk-brewsource-api.herokuapp.com/api/v1/breweries")
      .then(res => res.json())
      .then(breweries => {
        let sortedBreweries = breweries.sort((b1,b2) => {
          if (b2.name > b1.name) {
            return -1
          } else {
            return 1
          }
        })

        let countryHeader = document.createElement('h2')
        countryHeader.setAttribute('class', 'index-header')
        let newStr = event.target.id.split("_").join(" ")
        countryHeader.innerText = newStr
        mainPage.append(countryHeader)

        sortedBreweries.forEach(brewery => {
          let breweryCountry = brewery.country.split("").map(char => {
            if (char === " ") {
              return "_"
            } else {
              return char
            }
          }).join("")

          if (breweryCountry.toUpperCase() === event.target.id.toUpperCase()) {
            let breweryLi = document.createElement("li")
            breweryLi.innerText = brewery.name
            breweryLi.setAttribute("data-id", `${brewery.id}`)
            breweryUl.append(breweryLi)
            mainPage.append(breweryUl)
          }
        })
      })
  }


// Shows Detail Page of Specific Beer ------------------------------------------
  beerUl.addEventListener("click", showBeerDetailPage)

  function showBeerDetailPage(event) {
    const beerId = event.target.dataset.id
    mainPage.innerHTML = ""

    fetch(`https://http://monk-brewsource-api.herokuapp.com/api/v1/beers/${beerId}`)
      .then(res => res.json())
      .then(beer => {
        mainPage.innerHTML += `
        <div class="beer-div" data-id="${beer.id}">
          <h1>${beer.name.toUpperCase()}</h1>
          <h4>${beer.brewery}</h4>
          <img class="beer-img" src="${beer.image}">
          <h4>Style: ${beer.style}</h4>
          <p>${beer.description}</p>
          <button type="button" name="button" id="add-review-btn">Review Your Beer</button>
          <h5>Reviews:</h5>
          <div id='review-list'>
          </div>
        </div>
        `
      })

    fetch('https://http://monk-brewsource-api.herokuapp.com/api/v1/reviews')
    .then(res => res.json())
    .then(reviews => reviews.forEach(reviewObj => {
      let reviewList = document.querySelector('#review-list')
      if (reviewList && reviewObj.beer_id === parseInt(beerId)) {
        reviewList.innerHTML += `<div>
        <h3>${reviewObj.title}</h3>
        <h5>${reviewObj.rating}</h5>
        <p>${reviewObj.content}</p>
        </div>`
      }
    }))
    // const addReviewBtn = document.querySelector("#add-review-btn")
    // addReviewBtn.addEventListener("click", showReviewFormOnDom)
  }


  mainPage.addEventListener('click', showReviewFormOnDom)

  // Show Form to Add Review ("Review Your Beer" button) -------------------------
  function showReviewFormOnDom(event) {
    // mainPage.innerHTML = ""
    if (event.target.id === 'add-review-btn') {
      let reviewBtn = document.querySelector('#add-review-btn')
      reviewBtn.remove()

      mainPage.innerHTML += `<form id="add-review-form" action="index.html" method="post">
        Title: <input id="title" type="text" name="title" value=""><br>
        Content: <input id="content" type="text" name="content" value=""><br>
        Rating: <input id="rating" type="number" min="0" name="rating" value=""><br>
        <!-- Beer: <input type="text" name="beer" value=""><br> -->
        <button type="submit" name="button">Submit Review</button>
      </form>`

      let addReviewForm = document.querySelector("#add-review-form")
      mainPage.addEventListener("submit", createReview)
    }
  }


  function createReview(event) {
    event.preventDefault();
    let titleField = event.target.title.value
    let contentField = event.target.content.value
    let ratingField = event.target.rating.value
    let beerId = event.target.previousElementSibling.dataset.id
    let reviewList = document.querySelector('#review-list')

    fetch("https://http://monk-brewsource-api.herokuapp.com/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accepts": "application/json"
      },
      body: JSON.stringify({
        title: titleField,
        content: contentField,
        rating: parseInt(ratingField),
        beer_id: parseInt(beerId),
        user_id: 2
      })
    })
      .then(res => res.json())
      .then(review => {
        reviewList.innerHTML += `<div>
        <h3>${review.title}</h3>
        <h5>${review.rating}</h5>
        <p>${review.content}</p>
        </div>`

        document.querySelector('#title').value = ""
        document.querySelector('#content').value = ""
        document.querySelector('#rating').value = ""
      })
  }


  // Shows Detail Page of Specific Brewery
  breweryUl.addEventListener("click", showBreweryDetailPage)

  function showBreweryDetailPage(event) {
    let breweryId = event.target.dataset.id
    mainPage.innerHTML = ""

    fetch(`https://http://monk-brewsource-api.herokuapp.com/api/v1/breweries/${breweryId}`)
      .then(res => res.json())
      .then(brewery => {
        mainPage.innerHTML += `<div class="brewery-div">
          <h1>${brewery.name.toUpperCase()}</h1>
          <img class="brewery-img" src="${brewery.image}">
          <h4>${brewery.city}, ${brewery.state}</h4>
          <p>${brewery.country}</p>
          <h4>Beer Count: ${brewery.beer_count}</h4>
          </div>
        `
      })
  }

})
