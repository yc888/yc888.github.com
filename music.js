(function(){
  var music = $('<audio src="http://www.yuncai.la/images/pipayuls.mp3" loop="loop"></audio>')
  var ajaxs = '';
  var show = $('<div style="width:200px;text-align:center;height:50px;line-height:50px;background:#850000;color:#fff;position:absolute;top:0;right:0">监控刷新中···</div>')
    
  //监控提示
  $('body').append(show);
  //轮询开始
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
          music[0].pause()
       }else{
          music[0].play();
       }
     }
    });
  }, 20000);
})();
