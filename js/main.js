// Setting box openning
let toggle = document.querySelector(".toggle .icon-setting");
let settingBox =document.querySelector(".setting-box");
toggle.onclick=function(){
  this.classList.toggle("fa-spin");
  settingBox.classList.toggle("open")
};
//switch the main color
let mainColors = localStorage.getItem("color-option");
if (mainColors !== null){
  document.documentElement.style.setProperty("--main-color",localStorage.getItem("color-option"));

  document.querySelectorAll(".colors-list li").forEach((element)=>{
    element.classList.remove("active");

    
  });
  document.querySelector(`[data-color="${localStorage.getItem("color-option")}"]`).classList.add("active");
};
const colorsLi = document.querySelectorAll(".colors-list li");

colorsLi.forEach(li => {

  li.addEventListener("click",(e)=>{
    document.documentElement.style.setProperty("--main-color",e.target.dataset.color);
    localStorage.setItem("color-option",e.target.dataset.color);
    
    handleActive(e)
  });
  

});

//Switch background off
let backgroundOption = true;

// control interval
let backgroundInterval ;

const switchBackground = document.querySelectorAll(".setting-box .random-background span");

//check if localstorage has random background item
let backgroundLocalItem = localStorage.getItem("background-option");
//check if the localstorage is not empety
if (backgroundLocalItem !== null){
  document.querySelectorAll(".setting-box .random-background span").forEach(ele=>{
    ele.classList.remove("active");
  });
  if(backgroundLocalItem === 'true'){
    backgroundOption=true;
    document.querySelector(".setting-box .random-background .yes").classList.add("active");
  }else{
    backgroundOption=false;
    document.querySelector(".setting-box .random-background .no").classList.add("active");

  };
//use if because the data back from localstorage true/false but dataset is yes/no upper
}

switchBackground.forEach(element=>{

  element.addEventListener("click",(e)=>{
    
    handleActive(e)

    if (e.target.dataset.background === "yes"){
      backgroundOption = true;
      randomizeImags();
      localStorage.setItem("background-option",true);
    }else{
      backgroundOption = false;
      clearInterval(backgroundInterval)
      localStorage.setItem("background-option",false);
    }
  });

})

////////////////////////////////////////////////////////////////////////////////////////////
// Landing page element
let landingPage = document.querySelector(".landing-page");
// image array 
let image =["pexels-1.jpg","pexels-2.jpg","pexels-3.jpg","pexels-4.jpg","pexels-5.jpg"];
// randomize images
function randomizeImags(){

  if(backgroundOption === true){
    backgroundInterval=setInterval(function(){
    // randome numbers
    let randomeNumber = Math.floor(Math.random()*image.length);
      //change background images
    landingPage.style.backgroundImage =`url("image/${image[randomeNumber]}")`

    },10000);
  }
}
randomizeImags()
/////////////////////////////////////////////////////////////////////
//Skills Part 
let ourSkills = document.querySelector(".our-skills");

window.onscroll = function(){
  //skills offset top
  // Distance from the top of the page
  let skillOffsetTop = ourSkills.offsetTop;

  //Total height of the "our-skills" section
  let skillsHeight = ourSkills.offsetHeight;
  
  // Height of the visible window (viewport)
  let windowHeight = this.innerHeight;


  //Current vertical scroll position
  let windowScrollTop=this.pageYOffset;


  if (windowScrollTop >= (skillOffsetTop + skillsHeight - windowHeight)){
    document.querySelectorAll(".our-skills .skill-progress span").forEach(skill=>{
      skill.style.width=skill.dataset.progress;
    });
  }else{
    document.querySelectorAll(".our-skills .skill-progress span").forEach(skill => {
      // Reset the progress bar width if the section is not visible
      skill.style.width = "0";
  });
  };
};
///////////////////////////////////////////////////////////////////////////////////////////
//Create the Popup Box For Image
let ourGallary = document.querySelectorAll(".gallary .images-box img");

ourGallary.forEach(img=>{

  img.addEventListener("click",(e)=>{

    //create overlay element
    let overlay = document.createElement("div");
    overlay.className='popup-overlay';
    document.body.appendChild(overlay);

    //create popup
    let popupBox = document.createElement("div");
    popupBox.className="popup-box";


    //create headin for image from alt
    if (img.alt !==null){
      let headingImage = document.createElement("h3");
      let imageText = document.createTextNode(img.alt);
      headingImage.appendChild(imageText);
      popupBox.appendChild(headingImage);

    }

    //create image
    let popupImage=document.createElement("img");
    popupImage.src=img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);


  //create close span
  let closeButton= document.createElement("span");
  closeButton.className = "close-button";
  let closeButtonText = document.createTextNode("Close");
  closeButton.appendChild(closeButtonText);
  popupBox.appendChild(closeButton);


  });;
});


//close the popup
document.addEventListener("click",function(e){
  //if the target element has class name close-botton
  if (e.target.className == "close-button"){
    //remove the parent
    e.target.parentElement.remove();

    //remove the overlay
    document.querySelector(".popup-overlay").remove();
  };
});

////////////////////////////////////////////////////////////////////////

// Select all bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// select all links
const allLinks = document.querySelectorAll(".landing-page .links")
function scrollToTarget(elements){

  elements.forEach(ele=>{

    ele.addEventListener("click",(e)=>{
      e.preventDefault()
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior:"smooth"
      });
    });
  });
};
scrollToTarget(allBullets);
scrollToTarget(allLinks);
/////////////////////////////
// handle active function
function handleActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(ele=>{
      ele.classList.remove("active");
    });

    ev.target.classList.add("active")
};
/////////////////////////////////////////
//bullets settings
let bulletsOption = document.querySelectorAll(".setting-box .bullets-option span");

let bulletsContainer =document.querySelector(".nav-bullets");

let bulletStorage = localStorage.getItem('bullet-option');
if(bulletStorage !== null){
  bulletsOption.forEach(bullet => {
    bullet.classList.remove("active");
  })
  if (bulletStorage === 'block'){
    bulletsContainer.style.display="block";
    document.querySelector(".setting-box .bullets-option .yes").classList.add("active");
  }else{
    bulletsContainer.style.display="none";
    document.querySelector(".setting-box .bullets-option .no").classList.add("active");

  }

}
bulletsOption.forEach(bullet =>{

  bullet.addEventListener("click" ,(e)=>{
    
    if (e.target.dataset.bullet === "show"){
      bulletsContainer.style.display="block";
      localStorage.setItem("bullet-option", "block");
    }else{
      bulletsContainer.style.display="none";
      localStorage.setItem("bullet-option", "none");;
    }

    handleActive(e);

  })
  


});
////////////////////////////////
//Reset the settings

let resetButton = document.querySelector(".setting-box .reset-option");
resetButton.onclick=function(){
  
  localStorage.removeItem("color-option");
  localStorage.removeItem("bullet-option");
  localStorage.removeItem("background-option");

  window.location.reload();
};

///////////////////////////////////////////////////////////
// Toggle menu 
let toggleMenu = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");

toggleMenu.onclick=function(e){
  e.stopPropagation()
  this.classList.toggle("toggle-active");
  links.classList.toggle("open")
};

links.onclick= function(e){
  e.stopPropagation()
}

document.addEventListener("click",(e)=> {
  if (e.target !== toggleMenu && e.target !== links){
    if (links.classList.contains("open")){
      toggleMenu.classList.remove("toggle-active");
      links.classList.remove("open");
    };
  };
});