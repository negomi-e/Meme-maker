draw();

function draw() {

    var canvas = document.getElementById('idCanvas');
    var context = canvas.getContext('2d');

    var imageObj = new Image();


  imageObj.onload = function() {
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