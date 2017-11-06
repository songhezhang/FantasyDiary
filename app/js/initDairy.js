(function($) {
  $.diary = $.diary || {};
  $.diary.goingHome = function(bgcolor) {
		$('#screen').css('display', 'none');
		$('article a').css('color', bgcolor);
    $('body').queryLoader2({
      barColor: '#000',
      backgroundColor: '#000',
      percentage: true,
      barHeight: 30,
      completeAnimation: 'grow'
    });

    if($(document).width() >= 600) {
      $('body').addClass('.homeActive');
      $('header a').css('background', 'none');
      $('nav ul li a').removeClass('.activeLink');
      $('nav').css('display', 'none');
      $('nav ul li a').css('background', bgcolor);
      $('#screen').animate({left: '-1380px', top: '-1030px', rotate: '0deg', scale: '0.4'}, 0);
      $('body').css('background-color', '#000');
      $('body').css('line-height', 1);
      $('body').animate({
        backgroundColor: bgcolor
      }, 2000, function () {
        $('body').delay(1000).animate({
          backgroundColor: bgcolor
        }, 2000, function () {
          $('nav').fadeIn(2000, function () {
            $('header a').css('background', bgcolor);
            $('nav ul li a').css('background-color', bgcolor);
          });
        });
        $('#screen').delay(1000).fadeIn(2000, function () {
          $('#screen').animate({left: '-1700px', top: '-2100px', rotate: '-30deg', scale: '1.0'}, 2000);
        });
      });
    }
  };
  $.diary.initLink = function(bgcolor) {
    $('nav ul li a').click(function () {
      $('nav ul li a').css('color', '#000');
      $('nav ul li a').removeClass('.activeLink');
      $(this).addClass('.activeLink');
      $(this).addClass('.activeLink');
      if ($(this).hasClass('.activeLink')) {
        $(this).animate({
          color: bgcolor
        }, 500);
      } else {
        $(this).animate({
          color: '#000'
        }, 500);
      }
      if ($('body').hasClass('.homeActive')) {
        $('header a').css('background', 'none');
        $('nav ul li a').css('background', 'none');
        $('body').animate({
          backgroundColor: '#fff'
        }, 2000, function () {
          $('nav ul li a').css('background', '#fff');
          $('header a').css('background', '#fff');
        });
        $('body').removeClass('.homeActive');
        $('body').addClass('.subActive');
      } else {
      }
    });
  };
})(jQuery);
