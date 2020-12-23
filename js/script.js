var myMap;
$(document).ready(function() {

  $('.menu-desktop .menu li').hover(function(){
    $(this).toggleClass('active');
  },
  function() {
    $(this).toggleClass('active');
  });
  
  var topHeaderHeight = $('.header').innerHeight();
  $('.menu-desktop .menu .dropdown_menu').css({'top':  topHeaderHeight + 'px'});

  $('.popular_product_wrap').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    fade: false,
    dots: true,
    autoplay: false,
    centerMode: false,
    infinite: false,
    prevArrow: $('.slider_prev_popular'),
    nextArrow: $('.slider_next_popular'),
    responsive: [
      {
        breakpoint: 1145,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  });

  $('.actual_info_wrap').slick({
    slidesToShow: 3,
    slidesToScroll: 2,
    arrows: true,
    fade: false,
    dots: true,
    autoplay: false,
    centerMode: false,
    infinite: false,
    prevArrow: $('.slider_prev_actual'),
    nextArrow: $('.slider_next_actual'),
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ]
  });
  console.log($('#map'))
  if($('#map').length)
  {
    ymaps.ready(function () {
      myMap = new ymaps.Map('map', {
              center: [55.820834, 37.806879],
              zoom: 15,
              controls: ['smallMapDefaultSet'],
              behaviors: ['drag', 'zoom']
          }, {
              searchControlProvider: 'yandex#search'
          }),
  
          myPlacemark = new ymaps.Placemark([55.819611, 37.791226], {
              hintContent: 'Каприоль',
              balloonContent: '107241, г. Москва, Черницынский проезд, д. 3 стр. 2'
          }, {
              // Опции.
              // Необходимо указать данный тип макета.
              iconLayout: 'default#image',
              // Своё изображение иконки метки.
              iconImageHref: '../img/maps_flag.svg',
              // Размеры метки.
              iconImageSize: [74, 91],
              // Смещение левого верхнего угла иконки относительно
              // её "ножки" (точки привязки).
              iconImageOffset: [-50, -80]
          });
          
  
      myMap.geoObjects
          .add(myPlacemark);
  
      let windowWidth = window.innerWidth;
      console.log(windowWidth);
      if(windowWidth <= 800)
      {
        myMap.controls.add('zoomControl');
        myMap.behaviors.disable('drag')
      }
      if(windowWidth == 768)
      {
        myMap.setCenter([55.81940851175554, 37.80069919042966])
      }
      if(windowWidth < 768)
      {
       // myMap.container.getElement().style.height = '503px'
        myMap.setCenter([55.819611, 37.791226]);
        let heightPopup = $('#map > .container').innerHeight(),
           parent = $('#map').parent();
        parent.height(heightPopup + 503);
      }
    });
    $(window).resize(function() {
      let heightPopup = $('#map > .container').innerHeight(),
        parent = $('#map').parent();
      if(window.innerWidth < 768)
      {
          parent.height(heightPopup + 503);
      }
      else 
      {
          parent.height('auto');
      }
    })
  }
  

  $(document).on('click', '.order_button', function(e){
    e.preventDefault();
    let src = $(this).attr('href');
    $.fancybox.open({
      src  : src,
      type : 'inline',
      opts : {
        smallBtn: false,
        showCloseButton: false,
        animationEffect   : 'slide-in-out',
        touch: false,
        buttons: false,
        autoFocus: false,
        animationDuration: 50,
        baseClass: 'order_fancybox',
        beforeShow: function () {
          $("body > .wrapper").addClass("blur");
        },
        afterClose: function () {
          $("body > .wrapper").removeClass("blur");
        }
      }
    });
  });

  $(".thanks_button").fancybox({
    smallBtn: false,
    showCloseButton: false,
    animationEffect   : 'slide-in-out',
    touch: false,
    buttons: false,
    autoFocus: false,
    animationDuration: 50,
    baseClass: 'thanks_fancybox',
    beforeShow: function () {
      $("body > .wrapper").addClass("blur");
    },
    afterClose: function () {
      $("body > .wrapper").removeClass("blur");
    }
  });

  $(".search_button").fancybox({
    smallBtn: false,
    showCloseButton: false,
    animationEffect   : 'slide-in-out',
    touch: false,
    buttons: false,
    autoFocus: false,
    animationDuration: 50,
    baseClass: 'search_fancybox',
    beforeShow: function () {
      $("body > .wrapper").addClass("blur");
    },
    afterClose: function () {
      $("body > .wrapper").removeClass("blur");
    }
  });

  $(document).on('click', '.zoom_img', function(e){
    e.preventDefault();
    let src = $(this).attr('href');
    $.fancybox.open({
      src  : src,
      type : 'image',
      opts : {
        smallBtn: "auto",
        showCloseButton: true,
        touch: false,
        autoFocus: false,
        animationDuration: 50,
        beforeShow: function () {
          $("body > .wrapper").addClass("blur");
        },
        afterClose: function () {
          $("body > .wrapper").removeClass("blur");
        }
      }
    });
  });

  // $('[data-fancybox="zoom_product_img"]').fancybox({
  //   smallBtn: "auto",
  //   showCloseButton: true,
  //   touch: false,
  //   autoFocus: false,
  //   animationDuration: 50,
  //   beforeShow: function () {
  //     $("body > .wrapper").addClass("blur");
  //   },
  //   afterClose: function () {
  //     $("body > .wrapper").removeClass("blur");
  //   }
  // });

  $(".burger_open").fancybox({
    smallBtn: false,
    showCloseButton: false,
    touch: false,
    buttons: false,
    autoFocus: false,
    baseClass: 'burger_fancybox',
    animationEffect: "fade",
    animationDuration: 50,
  });

  $('.input_phone').inputmask({"mask": "+7(999) 999-9999", clearMaskOnLostFocus: false});
  
  function tog(v){return v ? "addClass" : "removeClass";} 
    $(document).on("input", ".clearable", function(){
        $(this)[tog(this.value)]("x");
    }).on("mousemove", ".x", function( e ){
        $(this)[tog(this.offsetWidth-40 < e.clientX-this.getBoundingClientRect().left)]("onX");
    }).on("touchstart click", ".onX", function( ev ){
        ev.preventDefault();
        $(this).removeClass("x onX").val("").change();
  });
  $('.clearable').trigger("input")

  $('.product_slider__for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '.product_slider__nav',
    responsive: [
      {
        breakpoint: 901,
        settings: {
          arrows: true,
          dots: true,
          infinite: false,
        }
      },
    ]
  });
  $('.product_slider__nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.product_slider__for',
    dots: false,
    centerMode: false,
    focusOnSelect: true,
    arrows: false
  });

  $('.open_dropdown').click(function(){
    let parent = $(this).parent(),
        child = parent.children('.dropdown_menu');
    if(!parent.hasClass('active'))
    {
      parent.addClass('active');
      child.slideDown();
    }
    else
    {
      parent.removeClass('active');
      child.slideUp();
    }
    
  });
 

});