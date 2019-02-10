function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
  
  while (el) {
    if (el.tagName == "menu") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
  
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
  
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}

var navbar = document.getElementById('menu');
var about = document.getElementById('about');
var about_name = document.getElementById('about-name');
var about_summary = document.getElementById('summary');
var about_skill_sum = document.getElementById('skill-sum');
//get margin of element
// var test = about_name.currentStyle || window.getComputedStyle(about_name);
// console.log('margin ' + test.marginTop);
var old_menu_position = getPosition(navbar).y;

window.addEventListener("scroll", updatePosition, false);

function updatePosition(){
    position = getPosition(navbar);
    var about_position = getPosition(about);
    // console.log('menu ' + position.y);
    // console.log('scroll ' + document.documentElement.scrollTop);
    if(position.y <= document.documentElement.scrollTop && position.y > 0) {
        
        if(navbar.className.search('menu-fixed') == -1){
          navbar.className += navbar.className ? ' menu-fixed' : ' menu-fixed';
          // navbar.setAttribute('style','background-color:white');
        }
    }
    else if(position.y == 0 && document.documentElement.scrollTop < old_menu_position){
      if(navbar.className.search('menu-fixed') != -1){
        navbar.classList.remove('menu-fixed');
      }
    }
    // console.log('screen ' + screen.height);
    // console.log(about_position.y);
    if(about_position.y + about.offsetHeight/4 <= document.documentElement.scrollTop + screen.height){
      if(about_name.className.search('appear-right') == -1) {
        about_name.className += about_name.className ? 'appear-right' : 'appear-right';
      }
      
      if(!about_summary.classList.contains('appear-right')) {
        for(let i = 0; i < about_summary.childElementCount; i++) {
          setTimeout(function() {
            about_summary.children[i].style.opacity = '1';
            about_summary.children[i].classList.add('appear-right');
          }, 500*i);
        }
      }
      
      if(!about_skill_sum.classList.contains('appear-right')) {
        for(let i = 0; i < about_skill_sum.childElementCount; i++) {
          setTimeout(function() {
            about_skill_sum.children[i].style.opacity = '1';
            about_skill_sum.children[i].classList.add('appear-right');
          }, 500*i);
        }
      }
    }
}

//hover change background favorite
var bg_fav = document.getElementById('bg-fav');
var gaming = document.getElementById('gaming');
var music = document.getElementById('music');
var film = document.getElementById('film');
var soccer = document.getElementById('soccer');
var code = document.getElementById('code');
var travel = document.getElementById('travel');
var read = document.getElementById('read');
var research = document.getElementById('research');
gaming.addEventListener('mouseover',changeBackground,false);
gaming.addEventListener('mouseout',changeDefaultBg,false);
music.addEventListener('mouseover',changeBackground,false);
music.addEventListener('mouseout',changeDefaultBg,false);
film.addEventListener('mouseover',changeBackground,false);
film.addEventListener('mouseout',changeDefaultBg,false);
soccer.addEventListener('mouseover',changeBackground,false);
soccer.addEventListener('mouseout',changeDefaultBg,false);
code.addEventListener('mouseover',changeBackground,false);
code.addEventListener('mouseout',changeDefaultBg,false);
travel.addEventListener('mouseover',changeBackground,false);
travel.addEventListener('mouseout',changeDefaultBg,false);
read.addEventListener('mouseover',changeBackground,false);
read.addEventListener('mouseout',changeDefaultBg,false);
research.addEventListener('mouseover',changeBackground,false);
research.addEventListener('mouseout',changeDefaultBg,false);
function changeBackground(){
  var image = this.getAttribute('value') + '.jpg';
  // console.log(image);
  bg_fav.setAttribute('style','background-image: url(images/'+image+')');
  // console.log(this.getAttribute('style'));
}

function changeDefaultBg(){
  bg_fav.setAttribute('style','background-image: url(images/fav_bg.jpg);');
}


//SKill bar charge
var bar = document.getElementById('bar0');
var tab_click = document.getElementsByClassName('tab-click');
var res_tab_click = document.getElementsByClassName('res-tab-click');
var myskill = document.getElementsByClassName('myskill');
// console.log(tab_click);
window.addEventListener("scroll", barCharge, false);
window.addEventListener('scroll',MySkillRun,false);
for( var i = 0; i < tab_click.length; i++){
  // console.log(tab_click[i].getAttribute('href'));
  (function(i){
    tab_click[i].addEventListener('click',function(event){ChargeBar(i,event)},false);
  })(i)
}


function MySkillRun(){
  var bottom_screen = document.documentElement.scrollTop + screen.height - 50;
  var myskill_position = getPosition(myskill[0]);
  var delayInMilliseconds = 100;
  // console.log(bottom_screen);
  // console.log(myskill_position);
  if(myskill_position.y <= bottom_screen){
    var i = 0;
    while(i < myskill.length){
      myskill[i].setAttribute('style','transform:translateX(40px); opacity:1; display: inline-block');
      // setTimeout(function() {
      //   console.log(i);
      //   i++;
      // }, delayInMilliseconds);
      i++;
    }
  }
}

function DelayRun(i){
  var delayInMilliseconds = 2000;
  setTimeout(function() {
    console.log(i);
    myskill[1].setAttribute('style','transform:translateX(40px)');
  }, delayInMilliseconds);
}

function barCharge(){
  var bar_position = getPosition(bar);
  var bottom_screen = document.documentElement.scrollTop + screen.height -73;
  // console.log('scroll ' + bottom_screen);
  // console.log(bar_position.y + bar.offsetHeight)
  if(bar_position.y + bar.offsetHeight <= bottom_screen - 100 && bar.className.search('activated') == -1){
    bar.setAttribute('style','width:'+bar.getAttribute('value')+'%');
    bar.className += bar.className ? ' activated' : ' activated';
    bar.innerHTML = bar.getAttribute('value')+'%';
  }
}

var pre_bar_charge = 0;

function ChargeBar(i,e){
  // console.log(this.innerHTML);
  console.log(i);
  var bar_charge = document.getElementById('bar'+i);
  var delayInMilliseconds = 200;
  setTimeout(function() {
    //code to be executed after 1 second
    bar_charge.setAttribute('style','width:'+bar_charge.getAttribute('value')+'%');
    bar_charge.innerHTML = bar_charge.getAttribute('value')+'%';
  }, delayInMilliseconds);
  DeChargeBar(pre_bar_charge);
  pre_bar_charge = i;
}


document.querySelector('body').addEventListener('click', function(event) {
  var bar_id = event.target.getAttribute('href');
  for(var i = 0; i < tab_click.length; i++){
    if(bar_id === tab_click[i].getAttribute('href')){
      console.log(i);
      ChargeBar(i);
      break;
    }
  }
});

function DeChargeBar(id){
  var de_charge = document.getElementById('bar'+id);
  de_charge.setAttribute('style','width:0%');
  de_charge.innerHTML = '0%';
  // console.log('de-charge', id);
}

//Education

var edu_detail = document.getElementsByClassName('edu-detail');

var edu_line = document.getElementsByClassName('line');

var edu_thumb_parent = document.getElementsByClassName('edu-thumb-parent');

var edu_thumb_time = document.getElementsByClassName('edu-thumb-time');

var edu_thumb_detail = document.getElementsByClassName('edu-thumb-detail');

var edu_line_process = document.getElementsByClassName('line-process');
// console.log(edu_detail.offsetHeight);

document.addEventListener("DOMContentLoaded", function(event) { 
  for(var i = 0; i < edu_detail.length; i++){
    var edu_line_height = edu_detail[i].offsetHeight;
    edu_line[i].setAttribute('style','height:'+ edu_line_height+'px');
    // console.log(edu_line_height);
    if(i === edu_detail.length - 2) break;
  }
});

window.addEventListener('resize',eduLineAdjust,false);

function eduLineAdjust(){
  for(var i = 0 ; i < edu_detail.length; i++){
    edu_line[0].style.height = 0;
    var edu_line_height = edu_detail[0].offsetHeight;
    console.log('resize' + edu_line_height);
    edu_line[0].style.height = edu_line_height+'px';
  }
}

window.addEventListener('scroll',EduAppear,false);
function EduAppear(){
  for(var i = 0; i < edu_detail.length; i++){
    var edu_line_height = edu_detail[i].offsetHeight;
    var edu_position = getPosition(edu_detail[i]);
    var bottom_screen = document.documentElement.scrollTop + screen.height - 73 - edu_line_height;
    // console.log('edu ' + edu_position.y);
    // console.log(bottom_screen);
    if(edu_position.y <= bottom_screen){
      // edu_thumb_parent[0].className += edu_thumb_parent[0].className ? ' edu-parent-thumb-activate' : ' edu-parent-thumb-activate';
      // edu_thumb_time[0].className += ' edu-time-thumb-active';
      edu_thumb_parent[i].setAttribute('style','opacity:1; transform:translateX(0);');
      edu_thumb_time[i].setAttribute('style','opacity:1; transform:translateX(0)');
      edu_thumb_detail[i].setAttribute('style','opacity:1; transform:translateY(0)');
      if(i < edu_detail.length - 1 ){
        edu_line_process[i].style.height = edu_line_height+'px';
      }
    }
    else{
      // break;
    }
  }
}

//personal-edu-circle

// var personal_circle = document.getElementById('personal-cirlce');
// var pers_detail = document.getElementsByClassName('pers-cirlce-detail');

// window.addEventListener('resize',resizeCircle);

// personal_circle.addEventListener('mouseover',PopupPersonal);
// personal_circle.addEventListener('mouseout',RemovePopupPersonal);

// document.addEventListener('DOMContentLoaded',function(event){
//   // console.log(pers_detail[0].offsetWidth);
//   // console.log(parseFloat(pers_detail[1].offsetLeft));
//   personal_circle.setAttribute('style','height:'+personal_circle.offsetWidth+'px');
//   var middle_detail = personal_circle.offsetWidth/2 - pers_detail[0].offsetWidth/2;
//   for(var i = 0; i< pers_detail.length; i++){
//     pers_detail[i].setAttribute('style','height:'+pers_detail[i].offsetWidth+'px; top:'+middle_detail+'px');
//   }
// });

// function resizeCircle(){
//   personal_circle.setAttribute('style','height:'+personal_circle.offsetWidth+'px');
//   var middle_detail = personal_circle.offsetWidth/2 - pers_detail[0].offsetWidth/2;
//   for(var i = 0; i< pers_detail.length; i++){
//     pers_detail[i].setAttribute('style','height:'+pers_detail[i].offsetWidth+'px; top:'+middle_detail+'px');
//   }
// }

function PopupPersonal(){
  // console.log('work');
  var middle_detail = personal_circle.offsetWidth/2 - pers_detail[0].offsetWidth/2;
  var popup = middle_detail + pers_detail[0].offsetWidth/2;
  var popleft =  middle_detail + pers_detail[0].offsetWidth*3/2;
  pers_detail[0].style.top = -popup+'px';
  pers_detail[1].style.left = (pers_detail[1].offsetLeft - popleft)+'px';
}

function RemovePopupPersonal(){
  var middle_detail = personal_circle.offsetWidth/2 - pers_detail[0].offsetWidth/2;
  for(var i = 0; i< pers_detail.length; i++){
    pers_detail[i].style.top = middle_detail + 'px';
    pers_detail[i].style.left = 47.5+'%';
  }
}

//Project 

var project_item = document.getElementsByClassName('project-item');

window.addEventListener('scroll',MoveUpProject);

function MoveUpProject(){
  for(var i = 0; i < project_item.length; i++){
    var project_position = getPosition(project_item[i]);
    // console.log('scroll ' + document.documentElement.scrollTop)
    // console.log('project' + i + ' ' + (project_position.y - project_item[0].offsetHeight));

    if(project_position.y - project_item[i].offsetHeight <= document.documentElement.scrollTop){
      console.log('work');
      project_item[i].setAttribute('style','transform:translateY(0px); opacity:1');
    }
  }
}