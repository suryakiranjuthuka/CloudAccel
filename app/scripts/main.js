$(document).ready(function() {

  // --------------- Header SLIDER ---------------
  var $slider = $('.slider'),
      $slideBGs = $('.slide__bg'),
      diff = 0,
      curSlide = 0,
      numOfSlides = $('.slide').length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 8000,
      $pagination = $('.slider-pagi');

  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $('<li class=\'slider-pagi__elem\'></li>');
      $li.addClass('slider-pagi__elem-'+i).data('page', i);
      if (!i) $li.addClass('active');
      $pagination.append($li);
    }
  };

  createBullets();

  function manageControls() {
    $('.slider-control').removeClass('inactive');
    if (!curSlide) $('.slider-control.left').addClass('inactive');
    if (curSlide === numOfSlides) $('.slider-control.right').addClass('inactive');
  };

  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };

  autoSlide();

  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass('animating');
      $slider.css('top');
      $('.slide').removeClass('active');
      $('.slide-'+curSlide).addClass('active');
      setTimeout(function() {
        $slider.removeClass('animating');
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $('.slider-pagi__elem').removeClass('active');
    $('.slider-pagi__elem-'+curSlide).addClass('active');
    $slider.css('transform', 'translate3d('+ -curSlide*100 +'%,0,0)');
    $slideBGs.css('transform', 'translate3d('+ curSlide*50 +'%,0,0)');
    diff = 0;
    autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on('mousedown touchstart', '.slider', function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;

    $(document).on('mousemove touchmove', function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css('transform', 'translate3d('+ (-curSlide*100 - diff) +'%,0,0)');
      $slideBGs.css('transform', 'translate3d('+ (curSlide*50 + diff/2) +'%,0,0)');
    });
  });

  $(document).on('mouseup touchend', function(e) {
    $(document).off('mousemove touchmove');
    if (animating) return;
    if (!diff) {
      changeSlides(true);
      return;
    }
    if (diff > -8 && diff < 8) {
      changeSlides();
      return;
    }
    if (diff <= -8) {
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });

  $(document).on('click', '.slider-control', function() {
    if ($(this).hasClass('left')) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });

  $(document).on('click', '.slider-pagi__elem', function() {
    curSlide = $(this).data('page');
    changeSlides();
  });


  // --------------- Services We Provide ---------------
  $( '#serviceButtons > div' ).on( 'click', function( e ) {
    $('#serviceButtons > div').removeClass('active');
    $(this).addClass('active');
    var serviceNumber = $(this).attr('data-service');
    // console.log(servicesData[$(this).attr('data-service')].activeBar);
    $('#activeBar > span')
    .css({ 'transform': 'translateX('+ servicesData[serviceNumber].activeBar + ')' });

    // --------------- Modify Content
    setTimeout(function(){
      // Add Title & tagLine
      $('#services #eachService')
      .html(servicesData[serviceNumber].tagLine);
      // Hide Content
      $('#services #eachService, #servicesContent .contentContainer, #servicesContent .image').css({'opacity': .3});

      // If "Cloud Optimization - option 7 is selected:"
      if(serviceNumber == 7) {
        $('#servicesContent').addClass('optimizationContent');
      } else {
        $('#servicesContent').removeClass('optimizationContent');
        // Replace the Image
        $('#servicesContent .image')
        .css({ 'background-image': 'linear-gradient(96deg, rgba(0,114,226,.4) 0%, rgba(10,72,193,.8) 100%), url('
        + servicesData[serviceNumber].imagePath + ')' });
        // , 'background-position': servicesData[serviceNumber].backgroundPosition
      }

      // Add New Content
      $('#servicesContent .contentContainer')
      .html(servicesData[serviceNumber].content);
      // Show Content
      $('#services #eachService, #servicesContent .contentContainer, #servicesContent .image').animate({opacity: 1}, 600);
    }, 400);

  });
  // On-Load Trigger
  $('#serviceButtons .onLoad').trigger('click');
  // Navigation Click Trigger
  $( '#cloudMigrationClick' ).on( 'click', function( e ) {
    setTimeout(function(){
      $('#serviceButtons .onLoad').trigger('click');
    }, 400);
  });
  // Navigation Click Trigger
  $( '#cloudOptimizationClick' ).on( 'click', function( e ) {
    setTimeout(function(){
      $('#serviceButtons .cloudOptimizationTrigger').trigger('click');
    }, 400);
  });


  // --------------- Why CloudAccel Section ---------------
  $( '#whyCloudaccelButtons > div' ).on( 'click', function( e ) {
    $('#whyCloudaccelButtons > div').removeClass('active');
    $(this).addClass('active');
    var whyNumber = $(this).attr('data-why');

    // --------------- Modify Content
      // Hide Content
      $('#whyCloudaccel .contentContainer > div').css({'opacity': .3});
      // Add New Content
      $('#whyCloudaccel .contentContainer > div')
      .html(whyData[whyNumber]);
      // Show Content
      $('#whyCloudaccel .contentContainer > div').animate({opacity: 1}, 600);
  });
  // On-Load Trigger
  $('#whyCloudaccelButtons .onLoad').trigger('click');


  // --------------- Case Studies ---------------
  $( '#caseStudies .viewAll' ).on( 'click', function( e ) {
    $('#caseStudies .hiddenCaseStudies').toggleClass('open');
    if($('#caseStudies .hiddenCaseStudies').hasClass('open')) {
      $(this).text('View Few Case Studies');
    } else {
      $(this).text('View All Case Studies');
    }
  });
  // --------------- Individual Case Studies ---------------
  var dialog = new DialogFx( $('#dialogContainer').get(0) );
  $( '.eachCaseStudy' ).on( 'click', function( e ) {
    dialog.toggle();
    var caseStudyNumber = $(this).attr('data-casestudy');

    $('#dialogContainer header .headerInfo')
    .html(caseStudiesData[caseStudyNumber].header);

    $('#dialogContainer section.contentBody')
    .html(caseStudiesData[caseStudyNumber].content);
  });

  /*=============================================>>>>>
  = Jquery Smooth Scroll =
  ===============================================>>>>>*/
  $('a[href*="#"]').on('click', function (e) {
    if(/^#/.test($(this).attr('href'))) {
        e.preventDefault();
        $('html, body').animate({
          scrollTop: $($(this).attr('href')).offset().top
        }, 300, 'linear');
    }
  });

  /*=============================================>>>>>
  = Mobile Menu =
  ===============================================>>>>>*/
  $('.menu-btn').on('click', function() {
    $('body > header').toggleClass('showMenu');
    $('body').toggleClass('dialogOpen');
  });

  $('header nav > a').on('click', function() {
    $('body > header').removeClass('showMenu');
    $('body').removeClass('dialogOpen');
  });


});
