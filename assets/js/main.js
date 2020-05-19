!(function($) {
    "use strict";
  
    // Preloader
    $(window).on('load', function() {
      if ($('#preloader').length) {
        $('#preloader').delay(100).fadeOut('slow', function() {
          $(this).remove();
        });
      }
    });
  
    // Smooth scroll for the navigation menu and links with .scrollto classes
    $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        e.preventDefault();
        var target = $(this.hash);
        if (target.length) {
  
          var scrollto = target.offset().top;
  
          if ($('#header').length) {
            scrollto -= $('#header').outerHeight();
          }
  
          if ($(this).attr("href") == '#header') {
            scrollto = 0;
          }
  
          $('html, body').animate({
            scrollTop: scrollto
          }, 1500, 'easeInOutExpo');
  
          if ($(this).parents('.nav-menu, .mobile-nav').length) {
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $(this).closest('li').addClass('active');
          }
  
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
          return false;
        }
      }
    });
  
    // Mobile Navigation
    if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
        class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');
  
      $(document).on('click', '.mobile-nav-toggle', function(e) {
        $('body').toggleClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        $('.mobile-nav-overly').toggle();
      });
  
      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
        e.preventDefault();
        $(this).next().slideToggle(300);
        $(this).parent().toggleClass('active');
      });
  
      $(document).click(function(e) {
        var container = $(".mobile-nav, .mobile-nav-toggle");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
          if ($('body').hasClass('mobile-nav-active')) {
            $('body').removeClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').fadeOut();
          }
        }
      });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
    }
  
    // Navigation active state on scroll
    var nav_sections = $('section');
    var main_nav = $('.nav-menu, #mobile-nav');
  
    $(window).on('scroll', function() {
      var cur_pos = $(this).scrollTop() + 200;
  
      nav_sections.each(function() {
        var top = $(this).offset().top,
          bottom = top + $(this).outerHeight();
  
        if (cur_pos >= top && cur_pos <= bottom) {
          if (cur_pos <= bottom) {
            main_nav.find('li').removeClass('active');
          }
          main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
        }
        if (cur_pos < 300) {
          $(".nav-menu ul:first li:first").addClass('active');
        }
      });
    });
  
    // Toggle .header-scrolled class to #header when page is scrolled
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('#header').addClass('header-scrolled');
      } else {
        $('#header').removeClass('header-scrolled');
      }
    });
  
    if ($(window).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');
    }
  
    // Intro carousel
    var newsCarousel = $("#newsCarousel");
    var newsCarouselIndicators = $("#news-carousel-indicators");
    newsCarousel.find(".carousel-inner").children(".carousel-item").each(function(index) {
      (index === 0) ?
      newsCarouselIndicators.append("<li data-target='#newsCarousel' data-slide-to='" + index + "' class='active'></li>"):
        newsCarouselIndicators.append("<li data-target='#newsCarousel' data-slide-to='" + index + "'></li>");
    });
  
    newsCarousel.on('slid.bs.carousel', function(e) {
      $(this).find('h2').addClass('animated fadeInDown');
      $(this).find('p').addClass('animated fadeInUp');
      $(this).find('.btn-get-started').addClass('animated fadeInUp');
    });
  
      // Matches carousel (uses the Owl Carousel library)
    $(".matches-carousel").owlCarousel({
      autoplay: false,
      dots: true,
      loop: false,
      startPosition: 0,
      responsive: {
        0: {
          items: 1
        },
        576: {
          items: 2
        },
        768: {
          items: 3
        },
        992: {
          items: 4
        }
      }
    });

    // Back to top button
    $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn('slow');
      } else {
        $('.back-to-top').fadeOut('slow');
      }
    });
  
    $('.back-to-top').click(function() {
      $('html, body').animate({
        scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
    });
  
    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  
    // Skills section
    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, {
      offset: '80%'
    });
  
    // Teams isotope and filter
    $(window).on('load', function() {
      var teamsIsotope = $('.teams-container').isotope({
        itemSelector: '.teams-item'
      });
  
      $('#teams-flters li').on('click', function() {
        $("#teams-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');
  
        teamsIsotope.isotope({
          filter: $(this).data('filter')
        });
      });
  
      // Initiate venobox (lightbox feature used in portofilo)
      $(document).ready(function() {
        $('.venobox').venobox();
      });
  
    });
  
    // teams details carousel
    $(".teams-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
    });

  // Stadiums isotope and filter
  $(window).on('load', function() {
    var stadiumsIsotope = $('.stadiums-container').isotope({
      itemSelector: '.stadiums-item'
    });

    $('#stadiums-flters li').on('click', function() {
      $("#stadiums-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      stadiumsIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // stadiums details carousel
  $(".stadiums-details-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  })(jQuery);