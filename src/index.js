document.addEventListener('DOMContentLoaded', () => {
  // Variables
  // const beerURL = "http://api.brewerydb.com/v2/beers/?key=afe69a87d4126239031c4abba79cd743"

  fetch("http://localhost:3000/api/v1/beers")
    .then(res => res.json())
    .then(beers => beers.forEach(getBeerOnDom))

  function getBeerOnDom(beer) {
    // console.log(beer);
    let beerUl = document.querySelector('#beer-list')
    // console.log(beerList);
    let beerLi = document.createElement('li')
    beerLi.innerText = beer.name

    beerUl.append(beerLi)
  }


})
