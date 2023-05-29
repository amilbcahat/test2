$(window).scroll(function() {
		var cur_st 	= $(document).scrollTop(),
			shVal	= 579,
			classes = ["ha-header-large","ha-header-small"],
			header	= $("#Header");
		if(cur_st >= shVal) {
			if(!header.hasClass(classes[1])) {
				header.removeClass(classes[0]).addClass(classes[1]);
			}
		} else {
			if(!header.hasClass(classes[0])) {
				header.removeClass(classes[1]).addClass(classes[0]);
			}
		}
	})

$(document).ready(function() {


    $('.bxslider').bxSlider({
        auto: true,
        autoControls: true,
        infiniteLoop: false,
        hideControlOnEnd: true,
        pause: 6000
    }); 

   $('.bxsliderbottom').bxSlider({
   		auto: true,
   		mode: 'fade',
   		pause: 80000
    });

   $(".local-scroll").click(function(e) {
	 e.preventDefault();
	 var target = $(this).attr("href");
	 $('html, body').animate({
	  scrollTop: ($(target).offset().top - $(this).outerHeight())
	 }, 1000);
	})


    });