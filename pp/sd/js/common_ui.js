/* 전역 변수 */
var ua = navigator.userAgent;
var windowWidth = $(window).width();
var windowHeight = $(window).height();
var isMobile;

/* useagent check */
function userAgentChk(){
	if(ua.match(/iPhone|iPod|LG|Android|SAMSUNG|Samsung/i) != null){
		if (windowWidth > 720){
			$("body").addClass("device").addClass("tablet");
			switch(window.orientation){ 
				case -90:
				$("body").addClass("tablet_landscape");
				$("body").addClass("pc").removeClass("tablet");
				break;
				case 90:
				$("body").addClass("tablet_landscape");
				$("body").addClass("pc").removeClass("tablet");
				break;
				case 0:
				$("body").addClass("tablet_portrait");
				$("body").removeClass("pc").removeClass("normal").addClass("tablet");
				break;
				case 180:
				$("body").addClass("tablet_portrait");
				$("body").removeClass("pc").removeClass("normal").addClass("tablet");
				break;
			 }
		}else{
			$("body").addClass("mobile").addClass("device");
			switch(window.orientation){  
				case -90:
				$("body").addClass("mobile_landscape")
				break;
				case 90:
				$("body").addClass("mobile_landscape");
				break;
				case 0:
				$("body").addClass("mobile_portrait");
				break;
				case 180:
				$("body").addClass("mobile_portrait");
				break;
			 }
		}
		//isMobile = true;
	}else if (ua.match(/iPad|GallaxyTab/i) != null){
		$("body").addClass("device").addClass("tablet");
		switch(window.orientation){ 
			case -90:
			$("body").addClass("tablet_landscape");
			$("body").addClass("pc").removeClass("tablet");
			break;
			case 90:
			$("body").addClass("tablet_landscape");
			$("body").addClass("pc").removeClass("tablet");
			break;
			case 0:
			$("body").addClass("tablet_portrait");
			$("body").removeClass("pc").removeClass("normal").addClass("tablet");
			break;
			case 180:
			$("body").addClass("tablet_portrait");
			$("body").removeClass("pc").removeClass("normal").addClass("tablet");
			break;
		 }
		//isMobile = true;
	}else{
		
		if(ua.indexOf("MSIE 8.0") > -1 || ua.indexOf("Trident/4.0") > -1){ //IE8 이하일 경우
			$("body").addClass("pc").addClass("pc_ie8");
			if(ua.indexOf("Windows NT 6.2") > -1){
			}else if (ua.indexOf("Windows NT 6.1") > -1){			
				$("body").addClass("pc").addClass("pc_ie8").addClass("w7"); //window7, IE8
			}else if (ua.indexOf("Windows NT 5.1") > -1){
				$("body").addClass("pc").addClass("pc_ie8").addClass("xp"); //windowXP, IE8
			}
		}else if(ua.indexOf("MSIE 7.0") > -1 || ua.indexOf("MSIE 6.0") > -1){
			$("body").addClass("pc").addClass("pc_ie8");
		}else if(ua.indexOf("Trident") > -1){
			$("body").addClass("pc").addClass("ie");
		}else{ //IE9 PC 
			if (ua.indexOf("Chrome") > -1){
				$("body").addClass("pc").addClass("chrome");
			}else if(ua.indexOf("Mac") > -1){
				$("body").addClass("mac");
			}else{
				$("body").addClass("pc");
			}
		}
		//isMobile = false;
	}

	bodyClassChange();	
}
userAgentChk();

function bodyClassChange(){
	
	if (windowWidth > 1201){
		isMobile = false;
		$("body").removeClass("mobile_portrait").removeClass("mobile").removeClass("tablet").removeClass("smallbrowser").addClass("normal");
	}else if (windowWidth <= 1200 && windowWidth > 1024){
		isMobile = false;
		$("body").removeClass("mobile_portrait").removeClass("normal").removeClass("mobile").removeClass("tablet").addClass("smallbrowser");
	}else if (windowWidth <= 1024 && windowWidth > 768){
		if($("body").is(".device")){
			isMobile = true;
		}else{
			if(windowWidth <= 1007){
				isMobile = true;
			}else{
				isMobile = false;
			}
			
		}
		$("body").removeClass("mobile_portrait").removeClass("normal").removeClass("mobile").removeClass("smallbrowser").addClass("tablet");
	}else if (windowWidth <= 768){
		isMobile = true;
		$("body").removeClass("mobile_portrait").removeClass("normal").removeClass("tablet").removeClass("smallbrowser").addClass("mobile");
		if (windowWidth < 481) {
			$("body").addClass("mobile_portrait");
		}
	}
}


/* 첫 로딩시 */
function firstLoad(){
	setTimeout(function(){
		$("#wrap").animate({opacity:1}, 500); 
	}, 200);
}

function windowLeftScoll(){
    var winScroll = $(window).scrollLeft();
    $('.pagenavi.topFixed').css('left',-winScroll);
}

/* 모달팝업 보이기 */ 
function modalView(modalName, parentName){
	var modalWidth;
	var modalHeight;

	if (!parentName) {
		$(".transparents-layer").remove();	
		$(".popupwrap").removeClass("active").css("left", "-99999rem").css("top", "-99999rem").css("opacity", "0");
		$(".modalpop").show().css({"top": 0, "left":0});
	}
	
	modalWidth = $(".popupwrap."+modalName).innerWidth()/2;
	modalHeight = $(".popupwrap." + modalName).innerWidth()/2;
	
	
	if (($("." + modalName).outerHeight() + $(window).height()*0.1)  > $(window).height()) {
		$("." + modalName + " .popcontents").css({ maxHeight: $(window).height() * 0.85-120 , overflowY: 'auto' });			
	}

	if(isMobile) modalWidth = ($(window).width()*0.9)/2;
	
	if (parentName){
		$(".popupwrap." + modalName).css({ top: "50%", left: "50%", marginTop: -modalHeight + "px", marginLeft: -modalWidth + "px" }).animate({ opacity: 1 }, 500).addClass("active");
		$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"', '"+parentName+"')");
	}else{
		$("body").append("<div class='transparents-layer'></div>");
		$(".popupwrap." + modalName).css({ top: "50%", left: "50%", marginTop: -modalHeight + "px", marginLeft: -modalWidth + "px" }).animate({ opacity: 1 }, 500).addClass("active");
		if(isMobile) $(".popupwrap." + modalName).css({ top: "10%", marginTop:0});
		$(".transparents-layer").attr("onclick", "modalHide('"+modalName+"')");
	}

	$(".transparents-layer").on('scroll touchmove mousewheel', function(e) { //배경 스크롤 방지
		e.preventDefault();
	});

	$(".popupwrap."+modalName).addClass("active");
	
	$("body").css({overflow:"hidden"});

			
}

/* 모달팝업 숨기기 */ 
function modalHide(modalName, parentName){
	$(".popupwrap."+modalName).animate({opacity:0}, 400, function(){
		$(".popupwrap."+modalName).css("top", "-99999rem").css("left","-99999rem");
		if (!parentName) {
			$(".modalpop").css({"top" : "-99999rem", "left": "-99999rem"});
			$(".transparents-layer").animate({opacity:0}, 400, function(){
				$(this).remove();
			});
			$("body").css({overflow:"auto"});
			console.log(1)
		}else{
			$(".transparents-layer").attr("onclick", "modalHide('"+parentName+"')");
		}
		$(".popupwrap."+modalName).removeClass("active");
	});
}

/* tabbox 탭 화면전환 */ 
function commonTab(tabParent, tabName){
	$("."+tabParent+" ul.tabbox li."+tabName).siblings("li").removeClass("on");
	$("."+tabParent+" ul.tabbox li."+tabName).addClass("on");
	$("."+tabParent+" .tab_hiddencontents."+tabName).siblings(".tab_hiddencontents").removeClass("on");
	$("."+tabParent+" .tab_hiddencontents."+tabName).addClass("on");
}

/* stickyMenu */
function stickyMenu() {
	if (isMobile){
		var stickyPoint = $(".header").innerHeight();
		if($(window).scrollTop() >= 10){
			$(".header").addClass("topFixed");
		}else{
			$(".header").removeClass("topFixed");
		}
		$(".contentsarea").css("margin-top", 0);
	}else{
		var stickyPoint = $(".subvisual").innerHeight();
		if($(window).scrollTop() > stickyPoint){
			$(".pagenavi").addClass("topFixed");
			$(".contentsarea").css("margin-top", $(".pagenavi").innerHeight()+"px");
		}else{
			$(".pagenavi").removeClass("topFixed");
			$(".contentsarea").css("margin-top", 0);
		}
	}
}

/* familysite */
function familyToggle() {
	if($(".familysite").is(".on")){
		$(".familysite").removeClass("on").children("ul").hide();
	}else{
		$(".familysite").addClass("on").children("ul").show();

	}
}

function gnbToggle(){
	if(isMobile){
		if($(".allmenu").is(".expend")){
			$(".allmenu").animate({left:"100%"}).removeClass("expend")
		}else{
			$(".allmenu").addClass("expend").animate({left:0})
		}
	}else{
		var headerHeight = $(".header").outerHeight();
		
		if($(".allmenu").is(".expend")){
			$(".allmenu").css({height:0}).animate({top:-windowHeight}).removeClass("expend");
			$(".header").removeClass("menuopen");	
			$("body").css("overflow", "auto");	
			if(windowWidth < 1280 && !$("body").is(".device")){
				windowHeight -= 17;
			}
		}else{
			if(windowWidth < 1280 && !$("body").is(".device")){
				windowHeight += 17;
			}
			$(".allmenu").css("height", windowHeight -headerHeight).addClass("expend").animate({top:headerHeight});
			$(".header").addClass("menuopen");
			$("body").css("overflow", "hidden");
		}		

		$(".header .submenu").hide(0, function(){
			$(".header .submenu .menu").hide(0);
			$(".header").removeClass("expend");									
		});
	}
	console.log(windowHeight)
}

function gnbReset(){
	if(isMobile){
		$(".allmenu").css({top:0, left:"100%", height:"100%"}).removeClass("expend");
		$(".header .submenu").hide(0, function(){
			$(".header .submenu .menu").hide(0);
			$(".header").removeClass("expend");
		});
		$(".header").removeClass("menuopen");
	}else{
		$(".allmenu").css({top:-windowHeight, left:0, height:0}).removeClass("expend");
		$(".header").removeClass("menuopen");
	}
}

function scrollAnimate(){	
	$('[data-animate="start"]').each(function(idx){
		var windowScroll = $(window).scrollTop();
		var windowHeight = $(window).height();
		var elHeight = $(this).outerHeight();
		var elPosition = $(this).offset().top;
		var itemLength = $('[data-animate="start"]:eq('+idx+') > [data-animate="delay"]').children().length;
		
		if(isMobile) elPosition= $(this).offset().top;
		
		if (elPosition < windowScroll + windowHeight) {
			$(this).addClass("ani-start")
		}		
		
		$('[data-animate="start"]:eq('+idx+') > [data-animate="delay"]').children().each(function(idx){
			if(itemLength < 10){
				$(this).css("animation-delay", 0.5*idx+"s")
			}else{
				$(this).css("animation-delay", 0.25*idx+"s")
			}
		})
	})	
}

function tsldieLeftScroll(){
	setTimeout(function(){
		if($(".tslide").length > 0){
			if($(".tslide li.on").index() != 0){
				var navScroll = $(".tslide li.on").offset().left;
				$(".tslide > ul").scrollLeft(navScroll);
			}
		}
	}, 200);
}


$(window).scroll(function() { 
	stickyMenu();
	windowLeftScoll();
	scrollAnimate();
});

$(window).resize(function() {
	windowWidth = $(window).width();
	windowHeight = $(window).height();
	stickyMenu();
	bodyClassChange();
	gnbReset();
});

$(function(){
	userAgentChk();
	firstLoad();
	stickyMenu();
	scrollAnimate();
	tsldieLeftScroll();
	
	/* datepicker */
	$("input.txt_date").datepicker({
		changeMonth: false,
		changeYear: false,
		dateFormat: "yy.mm.dd",
		buttonImageOnly: true,
		buttonText:"날짜선택",
		dayNames: [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesShort: [ "일", "월", "화", "수", "목", "금", "토" ],
		monthNames: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthNamesShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	});

	$(".allmenu .depthtitle > ul > li").click(function(){
		if(isMobile){
			var titleIdx = $(this).index()+1;
			$(this).siblings().removeClass("on");
			$(this).addClass("on");
			$(".secdepth > ul").removeClass("on");
			$(".secdepth > ul.menu"+titleIdx).addClass("on");
		}
	});

	$(".allmenu .secdepth ul > li > a.holder").click(function(e){
		if(isMobile){
			e.preventDefault();
			if($(this).siblings("ul")){
				if($(this).is(".on")){
					$(this).removeClass("on").siblings("ul").slideUp();					
				}else{
					$(this).closest("li").siblings().children(".holder").removeClass("on").siblings("ul").slideUp();
					$(this).addClass("on").siblings("ul").slideDown();
				}
			}
		}
	});

	/* top menu */
	$(".topmenu > ul > li").mouseover(function(){
		if(!isMobile){
			var menuIdx= $(this).index();			
			$(".header").addClass("expend");		
			if($(".header").is(".expend")){
				$(".header .submenu .menu").hide(0);
				$(".header .submenu").slideDown(300, function(){
					$(".header .submenu .menu").hide(0).eq(menuIdx).show(0);
				});	
			}
		}
	});

	$(".header").mouseleave(function(){
		if(!isMobile){
			if($(".header").is(".expend")){
				$(".header .submenu").slideUp(300, function(){
					$(".header .submenu .menu").hide(0);
					$(".header").removeClass("expend");									
				});
			}
		}
	});		

	/* top button */
	$(".btn-gotop").click(function(){
		$("html, body").animate({scrollTop:0})
	})

});

