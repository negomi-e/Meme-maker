draw();

function draw() {

  var canvas = document.getElementById('idCanvas');
  var context = canvas.getContext('2d');

  var imageObj = new Image();


  imageObj.onload = function () {
    context.drawImage(imageObj, 0, 0);
    context.font = "40px Calibri";
    context.fillStyle = "red";
    context.fillText("My TEXT!", 50, 300);

    var canvas = document.getElementById('idCanvas');
    var dataURL = canvas.toDataURL();

    alert(dataURL);
  }
  imageObj.setAttribute('crossOrigin', 'anonymous');
  imageObj.src = "https://loremflickr.com/400/200";
};

// Category List render

let mainselect = document.getElementById('mainCat')
let subselect = document.getElementById('subCat')

mainselect.addEventListener("change", async (event)=>{
  event.preventDefault()
  subselect.options.length = 0

  const category = mainselect[event.target.value];
console.log(category);


  let response = await fetch(`/collection/maincat/${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let result = await response.json()
  let options = result
  console.log(options);
  
  for (let i = 0; i < options.length; i += 1) {
    const opt = document.createElement('Option');
    subselect.appendChild(newOption);
    opt.innerText = options[i];
    opt.value = options[i]
  }
});


  