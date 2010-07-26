var Egg = {
  seconds: null,
  steps: null,
  step: null,
  settings: {
    fps: 4,
    onUpdate: function(timer){},
    onFinish: function(){}
  },

  update: function(step){
    this.step = step
    this.seconds = Math.round(step/this.settings.fps)
    if (this.seconds >= 0) {
      this.settings.onUpdate(this)
      var timer = this
      setTimeout(function(){
        timer.update(step-1)
      },1000/this.settings.fps);
    } else {
      this.settings.onFinish()
    }
  },

  timer: function(seconds, settings){
    this.settings = $.extend(this.settings, settings)
    this.steps = seconds*this.settings.fps
    this.update(this.steps)
    return this
  }
}

$(function(){

  var minutes = window.location.search.length > 1 ?
    parseFloat(window.location.search.split("?")[1]) : 5

  Egg.timer(minutes*60, {
    onUpdate: function(timer) {
      $(".time").html(secondsToMinutes(timer.seconds))
      $("#inverted_wrap").width((document.width-(document.width/timer.steps)*timer.step));
    },
    onFinish: function(timer) {
      var message = "<p>Så' det tilbage til noget fornuftigt</p>"
      $(".time").html("nul").addClass("greyed").after(message)
      if ($("#sound_off").attr("checked") != 1) honk()
    }
  })

  $("#container").after("<div id=\"inverted_wrap\"> \
    <div id=\"inverted\">"+$("#container").html()+"</div> \
  </div>");
  $("#inverted").width(document.width)

  $("a.close").live("click", function(){
    $(this).parent("div").fadeOut("fast")
    return false
  })
  $("a.open").live("click", function(){
    $("#templates").slideDown("fast")
    return false
  })

  $("form#custom").bind('submit',function(e){
    e.preventDefault()
    window.location = '/?'+$("input#minutes").attr("value")
  })

  $("#sound_check").live("click", function(){
    var cb = $("#sound_off");
    if (cb.attr("checked") != 1) {
      $(this).addClass("off");
      cb.attr("checked", 1);
    } else {
      $(this).removeClass("off");
      cb.removeAttr("checked");
    }
    return false;
  })

})

function secondsToMinutes(seconds) {
  m = Math.floor(seconds/60)
  s = ""+(seconds-(m*60))
  s.length == 1 ? s = "0"+s : s
  return ""+m+":"+s
}

function honk() {
  soundManager.createSound({
    id: 'honk', url:'/honk.mp3'
  }).play()
}

soundManager.url = "/";
soundManager.debugMode = false;
// soundManager.onload = function() {}
