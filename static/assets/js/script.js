var ww = document.body.clientWidth;
bpMini              	= ww < 420,
bpMobile            	= ww >= 420 && ww < 767,
bpTablet            	= ww >= 767 && ww < 1024,
bpDesktop           	= ww >= 1024

$(document).ready(function() {
	$(".nav li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})
	$(".nav_main li a").each(function() {
		if ($(this).next().length > 0) {
			$(this).addClass("parent");
		};
	})
	
	$(".toggleMenu").click(function(e) {
		e.preventDefault();
		$(this).toggleClass("active");
		$(".nav").toggle();
	});
	adjustMenu();	
});

$(window).bind('resize orientationchange', function() {
	ww = document.body.clientWidth;
	adjustMenu();
});

var adjustMenu = function() {
	if (ww <= 767) {
		$('.logo img').attr('src', 'img/logo_mobile.png');
		$(".toggleMenu").css("display", "inline-block");
		if (!$(".toggleMenu").hasClass("active")) {
			$(".nav").hide();
		} else {
			$(".nav").show();
		}
		$(".nav li").unbind('mouseenter mouseleave');
		$(".nav li a.parent").unbind('click').bind('click', function(e) {
			// must be attached to anchor element to prevent bubbling
			e.preventDefault();
			$(this).parent("li").toggleClass("hover");			
		});
	} 
	else if (ww > 767) {
		$('.logo img').attr('src', 'img/logo_desktop.png');
		//$('.searchbox').atr('src','img/searchmenu_icon_mobile.png');
		$(".toggleMenu").css("display", "none");
		$(".nav").show();
		$(".nav li").removeClass("hover");
		$(".nav li a").unbind('click');
		$(".nav li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
			$("#bd").click(function(e) {
									$(".nav").hide();
									});
		});
		
		
		$(".nav_main").show();
		$(".nav_main li").removeClass("hover");
		$(".nav_main li a").unbind('click');
		$(".nav_main li").unbind('mouseenter mouseleave').bind('mouseenter mouseleave', function() {
		 	// must be attached to li so that mouseleave is not triggered when hover over submenu
		 	$(this).toggleClass('hover');
		});
	}
}

