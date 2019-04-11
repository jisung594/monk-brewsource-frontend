document.addEventListener('DOMContentLoaded', () => {

  // VARIABLES
  let styles = [
    "IPA",
    "ALE",
    "LAGER",
    "PILSNER",
    "STOUT",
    "PORTER",
    "HEFEWEIZEN",
    "FRUIT"
  ]
  let countries = [
    "UNITED STATES",
    "GERMANY",
    "JAPAN"
  ]
  let styleUl = document.querySelector('#style-list')
  let countryUl = document.querySelector('#country-list')
  let featuredUl = document.querySelector('#featured-list')
  let beerUl = document.querySelector('#beer-list')
  let breweryUl = document.querySelector('#brewery-list')
  const bgImage = document.querySelector('#monk-by-the-sea')
  let mainPage = document.querySelector('.main-page')
  const sidebar = document.querySelector(".sidebar")

  // const beerURL = "http://api.brewerydb.com/v2/beers/?key=afe69a87d4126239031c4abba79cd743"



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
        let li = document.createElement('li')
        li.innerText = style
        li.setAttribute("id", `${li.innerText}`)
        styleUl.append(li)
        mainPage.append(styleUl)
      })
    }

    // Show Brewery Index
    if (event.target.id === "option-2") {
      countries.forEach(country => {
        let li = document.createElement('li')
        li.innerText = country
        li.setAttribute("id", `${li.innerText}`)
        countryUl.append(li)
        mainPage.append(countryUl)
      })
    }
  }


  styleUl.addEventListener("click", showBeersByStyle)

  function showBeersByStyle(event) {
    mainPage.innerHTML = ""
    beerUl.innerHTML = ""

    fetch('http://localhost:3000/api/v1/beers')
      .then(res => res.json())
      .then(beers => beers.forEach(beer => {
        if (beer.style.toLowerCase().includes(event.target.id.toLowerCase()) ||
        beer.description.toLowerCase().includes(event.target.id.toLowerCase())) {
          let beerLi = document.createElement("li")
          beerLi.innerText = beer.name + ` (${beer.brewery})`
          beerLi.setAttribute("data-id", `${beer.id}`)
          beerUl.append(beerLi)
          mainPage.append(beerUl)
        }
      }))
  }


  countryUl.addEventListener("click", showBreweryByCountry)

  function showBreweryByCountry(event) {
    mainPage.innerHTML = ""
    breweryUl.innerHTML = ""

    fetch("http://localhost:3000/api/v1/breweries")
      .then(res => res.json())
      .then(breweries => breweries.forEach(brewery => {
        let newArr = event.target.id.split(" ")
        let selected_country = newArr.map(str => {
          return str[0].toUpperCase() + str.slice(1).toLowerCase()
        }).join(" ")

        if (brewery.country === selected_country) {
          let breweryLi = document.createElement("li")
          breweryLi.innerText = brewery.name
          breweryLi.setAttribute("data-id", `${brewery.id}`)
          breweryUl.append(breweryLi)
          mainPage.append(breweryUl)
        }
      }))
  }


// Shows Detail Page of Specific Beer ------------------------------------------
  beerUl.addEventListener("click", showBeerDetailPage)

  function showBeerDetailPage(event) {
    const beerId = event.target.dataset.id
    mainPage.innerHTML = ""

    fetch(`http://localhost:3000/api/v1/beers/${beerId}`)
      .then(res => res.json())
      .then(beer => {
        mainPage.innerHTML = `
        <div class="beer-div" data-id="${beer.id}">
        <h1>${beer.name}</h1>
        <img src="${beer.image}">
        <h4>Style: ${beer.style}</h4>
        <p>${beer.description}</p>
          <div id="review-list">
            <label>Reviews:</label>
          </div>
        <button type="button" name="button" id="add-review-btn">Review Your Beer</button>
        </div>
        `
        const addReviewBtn = document.querySelector("#add-review-btn")
        addReviewBtn.addEventListener("click", showReviewFormOnDom)
      })

  }


  // Shows Detail Page of Specific Brewery
  breweryUl.addEventListener("click", showBreweryDetailPage)

  function showBreweryDetailPage(event) {
    let breweryId = event.target.dataset.id
    mainPage.innerHTML = ""

    fetch(`http://localhost:3000/api/v1/breweries/${breweryId}`)
      .then(res => res.json())
      .then(brewery => {
        mainPage.innerHTML = `
          <div>
            <h1>${brewery.name}</h1>
            <img src="${brewery.image}">
            <h4>${brewery.city}, ${brewery.state}</h4>
            <p>${brewery.country}</p>
            <p>Beer Count: ${brewery.beer_count}</p>
          </div>
        `
      })
  }


  // Show Form to Add Review ("Review Your Beer" button) -------------------------
  function showReviewFormOnDom(event) {
    // mainPage.innerHTML = ""

    mainPage.innerHTML += `<form id="add-review-form" action="index.html" method="post">
      Title: <input type="text" name="title" value=""><br>
      Content: <input type="text" name="content" value=""><br>
      Rating: <input type="number" min="0" name="rating" value=""><br>
      <!-- Beer: <input type="text" name="beer" value=""><br> -->
      <button type="submit" name="button">Submit Review</button>
    </form>`

    let addReviewForm = document.querySelector("#add-review-form")
    addReviewForm.addEventListener("submit", createReview)
  }

  // add event listener on mainPage (event.target should be submit button)
  // mainPage.addEventListener("submit", createReview)


  function createReview(event) {
    event.preventDefault();
    let titleField = event.target.title.value
    let contentField = event.target.content.value
    let ratingField = event.target.rating.value
    // let beerField = event.target.beer.value
    let beerId = event.target.previousElementSibling.dataset.id

    fetch("http://localhost:3000/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: titleField,
        content: contentField,
        rating: ratingField,
        beer_id: beerId,
        user_id: 1
      })
    })
      .then(res => res.json())
      .then(review => {
        // let reviewList = event.target.previousElementSibling.querySelector("#review-list")
        mainPage += `<div>
        <h3>${review.title}</h3>
        <h5>${review.rating}</h5>
        <p>${review.content}</p>
        </div>`
      })
  }

  // function displayNewReview(review) {
  //   mainPage.append(review.title)
  // }



})
