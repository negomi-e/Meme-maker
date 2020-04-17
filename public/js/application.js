
//CREATE class "active" move depening on which page the nav bar is in use
document.addEventListener('DOMContentLoaded', (event) => {
    let pathname = window.location.pathname;
    let active2 = document.querySelector('.nav > li.active').classList.remove('active')

    let active = document.querySelector('.nav > li > a[href= "' + pathname + '"]').parentElement.classList.add('active')

})


//CREATE SECOND DROPDOWN LIST
//Change option of Sub categories depending on selected main category - client side

const mainCat = document.getElementById('maincategory')
const subCat = document.getElementById('subcategory')
const search = document.getElementById('search-tag')
const carousel = document.getElementById('memeCarousel')

//ASK EVGENY : How to use info from Model to render second list
//render second list
mainCat.addEventListener('click', async (event) => {
    event.preventDefault()
    const category = event.target.text
    console.log(category);
    
    let response = await fetch(event.target.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCat: category })
    })
    let options = await response.json()
    // const hbs = fetch('/flickity.hbs')
    const hbsResponse = await fetch('/flickity.hbs');
    const hbs = await hbsResponse.text();
    const template = window.Handlebars.compile(hbs);
    $('#subcategory').innerHTML = template({
        subCat: options
    });

    const flkty = new Flickity('#subcategory .category', {});
})

//Render carousel once subcat selected
subCat.addEventListener('click', async (event) => {
    event.preventDefault();
    let response = await fetch(event.target.href, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedCat: event.target.value })
    })

    let result = await response.json();

    const hbsResponse = await fetch('/views/partials/carousel.hbs');
    const hbs = await hbsResponse.text();
    const template = window.Handlebars.compile(hbs);
    carousel.innerHTML += template({
        result
    });
}
)



//Render memes by tag search
search.addEventListener('input', async (event) => {
    console.log(event.target.value)
    event.preventDefault();
    let response = await fetch(event.target.value, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchInput: event.target.value })
    })

    let result = await response.json();

    const hbsResponse = await fetch('/views/partials/carousel.hbs');
    const hbs = await hbsResponse.text();
    const template = window.Handlebars.compile(hbs);
    carousel.innerHTML += template({
        result
    });

})

