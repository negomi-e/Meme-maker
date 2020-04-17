const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const edit = document.querySelector('#edit-meme');
const imgWidth = 400;
let counter = 1;

let nowText;

// Load image
document.querySelector("#imageLoader").addEventListener("change", () => {

  const file = document.querySelector("#imageLoader").files[0];
  const reader = new FileReader();

  if (file) {
    fileName = file.name;
    reader.readAsDataURL(file);
  }

  reader.addEventListener('load', () => {
    img = new Image();
    img.src = reader.result;
    img.onload = function () {
      const proportion = img.width / img.height;
      canvas.width = imgWidth;
      canvas.height = imgWidth / proportion;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  },
    false
  );
});

// Add text
document.addText.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = document.createElement('span');
  text.innerText = event.target.text.value;
  text.id = `textToAdd${counter++}`;
  text.style.position = 'absolute';
  text.style.fontSize = event.target.fontSize.value;
  text.style.fontFamily = event.target.fontFamily.value;
  text.style.color = event.target.fontColor.value;
  text.style.left = (canvas.width / 2) + 'px';
  text.style.top = (canvas.height / 2) + 'px';
  text.draggable = 'true';
  nowText = text;
  event.target.text.value = '';
  edit.appendChild(text);

  let oldEvent = null
  let oldY = Number(nowText.style.top.slice(0, -2));
  let oldX = Number(nowText.style.left.slice(0, -2));

  // Drag your text
  nowText.addEventListener('dragstart', (event) => {
    const dragImg = new Image();
    event.dataTransfer.setDragImage(dragImg, 0, 0);
  });
  nowText.addEventListener('drag', (event) => {
    if (oldEvent === null) {
      oldEvent = event;
    } else if (event.x === 0 && event.y === 0) {
    }
    else {
      nowText.style.top = oldY + event.y - oldEvent.y + 'px';
      nowText.style.left = oldX + event.x - oldEvent.x + 'px';
      oldY += event.y - oldEvent.y;
      oldX += event.x - oldEvent.x;
      oldEvent = event;
    }
  }, false)

})
// Canvas render
document.querySelector('#createMeme').addEventListener('click', async (event) => {
  for (let i = 1; i < counter; i++) {
    const text = document.querySelector(`#textToAdd${i}`);
    text.style.display = 'none';
    const x = Number(text.style.left.slice(0, -2));
    const y = Number(text.style.top.slice(0, -2)) + 5;
    ctx.textBaseline = "top";
    ctx.fillStyle = text.style.color;
    ctx.font = `${text.style.fontSize} ${text.style.fontFamily}`;
    ctx.fillText(text.innerText, x, y);
  }

  let mainselect = document.getElementById('mainCat')
  let subselect = document.getElementById('subCat')
  const imgURL = canvas.toDataURL('image/png');
  const req = await fetch('/create/save', {
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `imgData=${window.encodeURIComponent(imgURL)}&mainCat=${mainselect.value}&subCat=${subselect.value}`,
  })

  debugger;
  const res = await req.json();
  if (res.success) {
    window.location = '/';
  } else {
    alert('error, try again');
  }
})







// Category List render
async function populateList() {
  let mainselect = document.getElementById('mainCat')
  let subselect = document.getElementById('subCat')
  subselect.options.length = 0

  const category = mainselect.value
  


  let response = await fetch(`/collection/maincat/${category}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  let result = await response.json()
  let options = result.subcats
 

  for (let i = 0; i < options.length; i += 1) {
    const opt = document.createElement('Option');
    subselect.appendChild(opt);
    opt.innerText = options[i].category;
    opt.value = options[i].category;
  }
}
