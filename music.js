(function(){
  var music = $('<audio src="http://www.yuncai.la/images/pipayuls.mp3" loop="loop"></audio>')
  var ajaxs = '';
  
  setInterval(function(){
    if(ajaxs){
      ajaxs.abort();
    }
  
    ajaxs = $.ajax({
     type:'get',
     dataType: 'html',
     url:'http://admin.devsynb.com/?controller=report&action=withdrawel&shows=1',
     success: function(e){
       if(e.indexOf('no-records') != -1){
          console.log('无提现');
       }else{
          music[0].play();
          console.log('有提现');
       }
     }
    });
  }, 20000);
})();
