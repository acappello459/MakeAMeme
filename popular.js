var key = 'cd5656de-e732-44b4-aa9d-e41a4fa57c3f'
var input = document.getElementById('input')
var topText = document.getElementById('topText')
var bottomText = document.getElementById('bottomText')
var createButt = document.getElementById('create')
var memeCanvas = document.getElementById('meme-canvas')
var ctx = memeCanvas.getContext('2d')
var submit = document.getElementById('submit')
var wrapper = document.createElement('div')
var clearButt = document.getElementById('clearButt')
var topTextSize = document.getElementById('topTextSize')
var bottomTextSize = document.getElementById('bottomTextSize')
// document.body.appendChild(wrapper)

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// document.body.appendChild(displayName)
//event listener to load memes when you open the site
window.addEventListener('load', loadMemes)

//event listener to populate the template with the words that you want
createButt.addEventListener('click', generateMeme)

clearButt.addEventListener('click', function(){
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height)
})

//loads the 25 most popular meme templates via meme-generator.com
function loadMemes(){
if (wrapper.innerHTML != ('')){
  wrapper.innerHTML = ''
}
  $.ajax({url: "http://version1.api.memegenerator.net//Generators_Select_ByPopular?pageIndex=0&pageSize=25&days=&apiKey=cd5656de-e732-44b4-aa9d-e41a4fa57c3f",
  success: function(response){
    console.log(response)
    createImage(response.result)
    }

  })
}


//grabs the info from the API and creates an img element for each of the 25 responses, and sets their attributes
function createImage(array){
  document.body.appendChild(wrapper)
  wrapper.id = 'wrapper'
    for(let i = 0;i<array.length;i++){
        var img = document.createElement("img")
        img.style.width = "300px";
        img.style.height = "300px";
        img.style.display = "inline-block";
        img.style.margin = '15px'
        img.classList.add("images")
        img.style.backgroundImage =  "url(" + array[i].imageUrl + ")"
        img.style.backgroundSize = "100% 100%"
        wrapper.appendChild(img)
    }
    getImgInfo(array)

}

//creates an event listener on each of the images that populate the wrapper
function getImgInfo(array){

  let images = document.getElementsByClassName("images")
  for(let i  = 0;i<images.length;i++){
    images[i].addEventListener('click', function(){
      console.log('first event')
      var src = array[i].imageUrl
      drawImage(src, 0, 0)
    })
  }
}
//populates the canvas with the selected meme by the user
function drawImage(imgSrc, x, y){
  console.log('drawimage')
  var myImg = new Image();
  ctx.clearRect(0, 0, memeCanvas.width, memeCanvas.height)
  myImg.src = imgSrc;
  ctx.drawImage(myImg, x, y, memeCanvas.width, memeCanvas.height);
}

//populates the meme with the text that the user inputs
function generateMeme(){
let fontSize;
  ctx.fillStyle = 'white'
  ctx.strokeStyle = 'black'
  ctx.textAlign = 'center'


  fontSize =topTextSize.value
  ctx.font = fontSize + 'px Lato Black'
  ctx.lineWidth = fontSize/20;
  //inputs the top text value into the  meme
  topText.value.split('\n').forEach( function(t, i){
    ctx.textBaseline = 'top'
    ctx.fillText(t.toUpperCase(), memeCanvas.width/2, i * fontSize, memeCanvas.width )
    ctx.strokeText(t.toUpperCase(), memeCanvas.width/2, i * fontSize, memeCanvas.width )
  });



  fontSize = bottomTextSize.value
  ctx.font = fontSize + 'px Lato Black'
  ctx.lineWidth = fontSize/20;
  //inputs the bottom text value into the meme
  ctx.textBaseline = 'bottom'
  bottomText.value.split('\n').reverse().forEach( function(t, i){
    ctx.fillText(t.toUpperCase(), memeCanvas.width/2, memeCanvas.height-i*fontSize + 5, memeCanvas.width )
    ctx.strokeText(t.toUpperCase(), memeCanvas.width/2, memeCanvas.height-i*fontSize + 5, memeCanvas.width )
  });

}
