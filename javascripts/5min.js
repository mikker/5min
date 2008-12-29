// Hvor lang timer
var multiplier = 4
if (minutes == null) { var minutes = 5 }
var steps = minutes*60*multiplier

// Initialiser soundManager-klassen
soundManager.url = "/"
soundManager.debugMode = false
soundManager.onload = function() {}

// Spark første runde i gang, når DOM er klar
$(document).ready(function(){
  init_inverted()
  update(steps)

  $("#templates").wrap($("<div id=\"template_wrap\"></div>"))
  $("a.close").livequery("click", function(){
    $(this).parent("div").fadeOut("fast")
    return false
  })
  $("a.open").livequery("click", function(){
    $("#templates").slideDown("fast")
    return false
  })
  
  $("#sound_check").livequery("click", function(){
    var cb = $("#sound_off")
    if (cb.attr("checked") != 1) {
      $(this).addClass("off")
      cb.attr("checked", 1)
    } else {
      $(this).removeClass("off")
      cb.removeAttr("checked")
    }
    return false
  })
  
  replace_submits()
})

var update = function(step) {
  // Hvis der er mere end 0 tilbage
  var seconds = Math.round(step/multiplier)
  if (seconds >= 0) {
    // Tekst-format
    clock = format(seconds)
    $(".time").html(clock)
    document.title = clock
    // Opdater inverted
    inverted(step+multiplier/2)
    // Forfra om ét sek
    setTimeout(function(){
      update(step-1)
    },1000/multiplier)
  } else {
    var message = $("<p>Så' det tilbage til noget fornuftigt</p>")
    // Skriv "nul" med grå og sæt ovenstående tekst ind under
    $(".time").html("nul").addClass("greyed").after(message)
    // Afspil dyttet, hvis det er slået til
    if ($("#sound_off").attr("checked") != 1) {
     playSound()
    }
  }
}

var playSound = function() {
  var aHonk = soundManager.createSound({
    id: 'honk',
    url:'/honk.mp3'
  })
  aHonk.play();
}

// Formatterer antallet af sekunder som x:xx
var format = function(seconds) {
  m = Math.floor(seconds/60) // Rund ned
  s = ""+(seconds-(m*60)) // Resterende sekunder
  s.length == 1 ? s = "0"+s : s  // Force 2 digits
  return ""+m+":"+s
}

var human_time = function(seconds) {
  m = Math.floor(seconds/60) // Rund ned
  s = (seconds-(m*60)) // Resterende sekunder
  var minutter = ["et","to","tre","fire","fem","seks","syv","otte","ni","ti"]
  var enere = []
}

var init_inverted = function(){
  $("#container").after("<div id=\"inverted_wrap\"></div>")
  $("#inverted_wrap").html("<div id=\"inverted\"></div>")
  $("#inverted").html($("#container").html())
}

var inverted = function(step){
  $("#inverted").html($("#container").html()).width(document.width)
  $("#inverted_wrap").width((document.width-(document.width/steps)*step))
}

var replace_submits = function() {
  $('input.submit').each(function() {
    var fstext = $(this).val()
    var fsid = $(this).attr("id")
    var new_button = $('<a href="" rel="'+$(this).attr("id")+'" class="submit button ">'+fstext+'</a>')
    $(this).after(new_button)
    $(this).hide()
  });

  $('a.submit').livequery("click", function() {
    var fsref = $(this).attr("rel")
    $('input#'+fsref).trigger('click')
    return false
  });
  
  $("a.button").cornerz({
    radius: 5,
    background: "#eee"
  })
}

