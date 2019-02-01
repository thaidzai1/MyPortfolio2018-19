//cv

var potrait = document.getElementById('potrait');
var about = document.getElementById('about');
var skill= document.getElementById('skill');
console.log(potrait.offsetHeight);
console.log(about.offsetHeight);
console.log(skill.offsetHeight);
var favor = document.getElementById('favor');
favor.style.height = skill.offsetHeight+'px';

window.addEventListener('resize',function(){
    favor.style.height = 0+'px';
    favor.style.height = skill.offsetHeight+'px';
},false);
