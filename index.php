<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" version="-//W3C//DTD XHTML 1.1//EN" xml:lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="imagetoolbar" content="no" />
    <title>5min</title>
    <meta name="description" content="Her har du 5min. Men så er det også det!" />
    <style type="text/css" media="screen">
      @import url(/stylesheets/reset.css);
      @import url(/stylesheets/5min.css);
    </style>
    <script src="/javascripts/jquery.js" type="text/javascript" charset="utf-8"></script>
    <script src="/javascripts/jquery.cornerz.js" type="text/javascript" charset="utf-8"></script>
    <script src="/javascripts/jquery.livequery.pack.js" type="text/javascript" charset="utf-8"></script>
    <script src="/javascripts/soundmanager2-nodebug-jsmin.js" type="text/javascript" charset="utf-8"></script>
    <script type="text/javascript" charset="utf-8">
      var minutes = <?= isset($_GET['minutes']) ? $_GET['minutes'] : "null" ?>
    </script>
    <script src="/javascripts/5min.js" type="text/javascript" charset="utf-8"></script>
  </head>
  <body>
    
    <div id="container">
      <h1 class="time"></h1>
      <p><a href="#" class="open"><span>Indstil</span></a></p>
    </div>

    <div id="templates">
      <a href="#" class="close"><img src="/images/closebox.png" alt="" /></a>
      <ul>
        <li class="aeg"><a href="/?minutes=5">Blødkogt æg</a> <span>5min</span></li>
        <li class="aeg"><a href="/?minutes=7">Smilende æg</a> <span>7min</span></li>
        <li class="aeg"><a href="/?minutes=9">Hårdkogt æg</a> <span>9min</span></li>
        <li class="zzz"><a href="/?minutes=15">Power Nap</a> <span>15min</span></li>
        <li class="kartoffel"><a href="/?minutes=20">Kartofler</a> <span>20min</span></li>
      </ul>
      <form action="/" method="get">
        <p class="fright">
          <input type="submit" class="submit" id="custom_submit" value="Genstart"/>
        </p>
        <p>
          <input type="text" class="text" name="minutes" value="<?= isset($_GET['minutes']) ? $_GET['minutes'] : "5" ?>" id="minutes" size="3" /> minutter
        </p>
      </form>
    </div>

    <div id="detersmart">
      <a href="http://detersmart.dk" title="Det Er Smart">DetErSmart.dk</a>
    </div>
    
    <script type="text/javascript">
      var gaJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
      document.write(unescape("%3Cscript src='" + gaJsHost + "google-analytics.com/ga.js' type='text/javascript'%3E%3C/script%3E"));
    </script>
    <script type="text/javascript">
      var pageTracker = _gat._getTracker("UA-267999-10");
      pageTracker._trackPageview();
    </script>
  </body>
</html>
<!-- 5min er ingen bondegård -->