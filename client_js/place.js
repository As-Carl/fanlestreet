$(function(){
  $('.twcitylist').on('click', 'li',function(){
    // console.log(this);
    var place  = $(this).find('a').html()
  $('.get').find('em').html($(this).find('a').html());

  document.location.href = '#top'
  // console.log(111);place=+place

   localStorage.setItem("place",place);
   var a =localStorage.getItem("place")
console.log(a)
    document.location.href = "http://localhost:555/html/index.html?" ;

})

})
