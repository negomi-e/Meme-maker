//CREATE SECOND DROPDOWN LIST
//Change option of Sub categories depending on selected main category - client side

const mainCat = document.getElementById('maincategory')
const subCat = document.getElementById('subcategory')
const search = document.getElementById('search-tag')
const carousel = document.getElementById('memeCarousel')

mainCat.addEventListener('click', chooseMain)

//ASK EVGENY : How to use info from Model to render second list
//render second list
function chooseMain(event) {
    subCat.options.length = 0;
    const category = mainCat[event.target.value];


}

//Render carousel once subcat selected
subCat.addEventListener('click', async (event) => {
    event.preventDefault();
    let response = await fetch('/memes', {
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
    let response = await fetch('/memes', {
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


const nav = document.getElementsByClassName('nav')
//CREATE class "active" move depening on which page the nav bar is in
nav.addEventListener('click', (event)=>{
   nav.querySelector('li.active').classList.replace('active', '')
   console.log(event.target);
   
   event.target.classList.add('active')
    // nav.forEach(element => {
    //     if(element.classList == 'active'){
    //         element.classList.remove('active')
    //     }

    //     if(element.href == document.URL){
    //         element.classList.add('active')
    //     }  
    // });
})