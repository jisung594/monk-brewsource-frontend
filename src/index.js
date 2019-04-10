document.addEventListener('DOMContentLoaded', () => {

  // VARIABLES
  let styles = [
    "ALE",
    "LAGER",
    "PILSNER",
    "STOUT",
    "PORTER",
    "HEFEWEIZEN",
    "FRUIT"
  ]
  let styleUl = document.querySelector('#style-list')
  let featuredUl = document.querySelector('#featured-list')
  let beerUl = document.querySelector('#beer-list')
  const bgImage = document.querySelector('#monk-by-the-sea')
  let mainPage = document.querySelector('.main-page')
  const sidebar = document.querySelector(".sidebar")

  // const beerURL = "http://api.brewerydb.com/v2/beers/?key=afe69a87d4126239031c4abba79cd743"


  // Get SIDEBAR on DOM --------------------------------------------------------
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

// Shows Complete List of Beers (BEERS menu option in navbar) ------------------
  const menu = document.querySelector(".menu")
  menu.addEventListener("click", menuOption)


  function menuOption(event) {
    mainPage.innerHTML = ""
    styleUl.innerHTML = ""

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
  }

  styleUl.addEventListener("click", showBeersByStyle)

  function showBeersByStyle(event) {
    mainPage.innerHTML = ""
    beerUl.innerHTML = ""

      fetch(`http://localhost:3000/api/v1/beers`)
        .then(res => res.json())
        .then(beers => beers.forEach(beer => {

          if (event.target.id === "ALE") {
            if (beer.name.includes("Ale") || beer.description.includes("ale")) {
              let aleLi = document.createElement("li")
              aleLi.innerText = beer.name + " (" + beer.style + ")"
              aleLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(aleLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "LAGER") {
            if (beer.name.includes("Lager") || beer.description.includes("lager")) {
              let lagerLi = document.createElement("li")
              lagerLi.innerText = beer.name + " (" + beer.style + ")"
              lagerLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(lagerLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "STOUT") {
            if (beer.name.includes("Stout") || beer.description.includes("stout")) {
              let stoutLi = document.createElement("li")
              stoutLi.innerText = beer.name + " (" + beer.style + ")"
              stoutLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(stoutLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "PORTER") {
            if (beer.name.includes("Porter") || beer.description.includes("porter")) {
              let porterLi = document.createElement("li")
              porterLi.innerText = beer.name + " (" + beer.style + ")"
              porterLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(porterLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "HEFEWEIZEN") {
            if (beer.style.includes("Hefeweizen") || beer.description.includes("hefeweizen")) {
              let hefeweizenLi = document.createElement("li")
              hefeweizenLi.innerText = beer.name + " (" + beer.style + ")"
              hefeweizenLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(hefeweizenLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "FRUIT") {
            if (beer.name.includes("Fruit") || beer.description.includes("fruit")) {
              let fruitLi = document.createElement("li")
              fruitLi.innerText = beer.name + " (" + beer.style + ")"
              fruitLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(fruitLi)
              mainPage.append(beerUl)
            }
          }

          if (event.target.id === "PILSNER") {
            if (beer.style.includes("Pilsner") || beer.description.includes("pilsner")) {
              let pilsnerLi = document.createElement("li")
              pilsnerLi.innerText = beer.name + " (" + beer.style + ")"
              pilsnerLi.setAttribute("data-id", `${beer.id}`)
              beerUl.append(pilsnerLi)
              mainPage.append(beerUl)
            }
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
