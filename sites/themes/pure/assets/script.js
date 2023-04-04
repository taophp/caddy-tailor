$(document).ready(function() {
  $("a[href^='http://']").click(function(){
    window.open(this.href);
    return false;
  });
  $("a[href^='https://']").click(function(){
    window.open(this.href);
    return false;
  });
  $('article img:even').css('float','left');
});
