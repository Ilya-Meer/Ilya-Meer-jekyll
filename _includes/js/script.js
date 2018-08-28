

var hamburger = document.querySelector('.hamburger');
var sidebar = document.querySelector('.sidebar');
var close = document.querySelector('.close-icon');
var items = Array.from(document.querySelectorAll('.item'));

hamburger.addEventListener('click', function(){
  sidebar.classList.toggle('open');
  hamburger.classList.toggle('faded');
})
close.addEventListener('click', function(){
  sidebar.classList.toggle('open');
  hamburger.classList.toggle('faded');
})

items.forEach(function(item){
  item.addEventListener('mouseenter', function(){
    item.classList.add('hover');
  })
  item.addEventListener('mouseleave', function(){
    item.classList.remove('hover');
  })
})


