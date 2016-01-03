(function(){
  var music = $('<audio src="http://www.yuncai.la/images/pipayuls.mp3" loop="loop"></audio>')
  var ajaxs = '';
  var show = $('<div style="font-size:18px;width:300px;text-align:center;height:100px;line-height:100px;background:#850000;color:#fff;position:absolute;top:0;right:0">监控刷新中···</div>')

  String.prototype.between = function(sStart, sEnd, bIncludeSpliter) {
  	if(this.indexOf(sStart) == -1 || this.indexOf(sStart) == -1) { return ''; }
  	return this != '' ? this.replace(/[\n\r]+/gm, '').replace(new RegExp('.*(' + sStart + ')(.*?)(' + sEnd + ').*'), bIncludeSpliter ? '$1$2$3' : '$2') : '';
  };
  
    
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
          var details = './?controller=report&action=dealwithdraw&id=' + e.between('./?controller=report&action=dealwithdraw&id=','"');
          //读取详细信息
          $.ajax({
           type:'get',
           dataType: 'html',
           url:details,
           success: function(f){
             console.log(f);
             show.text('详细信息读取成功');
           },
           error: function(f){
             show.text('详细信息读取错误');
           }
          });
       }
       show.text('监控刷新中···正常运行');
     },
     error: function(e){
       show.text('监控刷新中···运行异常');
     }
    });
  }, 20000);
})();
