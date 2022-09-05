nf.namespace("Slide.Action");
nf.Slide.Action = Class.extend({
	init:function() {
		var me = this;
		me.idx = 1;
		me.wrap = $("#content");
		me.copyArea = $("#blindContent");

		me.isAnimate = false;
		me.bindScroll();
		me.resize();
		me.navigation();
		me.mainAction = new nf.Main.Action();
		me.characterAction = new nf.Character.Action();
		me.util = new nf.SlideUtil();
		me.util.agree();
		me.util.movieFrame();

		me.mTimer = setTimeout(function(){
			me.mainAction.mCharacter();
		}, 300);
	},
	navigation : function(){
		var me = this;
		var navi = $(".pagination a"),
			Home = $(".btn_home"),
			testerApp = ".btn_tester_app";

		navi.on("click", function(e){
			var contentIdx = me.wrap.find("> div").data("area");
			me.idx = $(this).parent().index() + 1;
			if(contentIdx === me.idx){
				return;
			}
			if(contentIdx > me.idx){
				me.up();
			}else{
				me.down();
			}
		});

		Home.on("click", function(e){
			$(".pagination li:eq(0) a").click();
		});

		$("body").off("click", testerApp);
		$("body").on("click", testerApp, function(e){
			$(".pagination li:eq(1) a").click();
		});
	},
	bindScroll : function(){
		var me = this;
		$('html, body').on('mousewheel DOMMouseScroll', function(e){
			var delta = e.originalEvent.wheelDelta || e.originalEvent.detail*-1;

			if($(".setFloatLayer").is(":visible")){
				return;
			}
			if (me.wrap.find("> .section").length < 2 && !me.isAnimate) {			
				if (delta > 0){
					if (me.idx === 1) {
						return;
					}
					me.idx--;

					me.up();
				} else {
					if (me.idx === me.copyArea.find("> div").length) {
						return;
					}
					me.idx++;

					me.down();
				}
			}
			//inner Div scroll
			if (me.isAnimate) {
				if (delta > 0){
					me.isAnimate = true;
					if(me.scrolltop === 0){
						me.isAnimate = false;
					}
				}
			}
		});
	},
	cloneElement : function(){
		var me  = this;
		me.winH = $(window).height();
		me.prevSection = me.wrap.find(".section");
		var clone = me.copyArea.find("[data-area=" + me.idx +"]").clone();
		me.wrap.append(clone);
		me.section = me.wrap.find("[data-area=" + me.idx +"]");

		if(me.section.find("> div").hasClass("subSection")){
			var subClone = me.copyArea.find("[data-area=" + me.idx +"] .subSection > [data-sub=1]").clone();
			me.section.find(".subSection > .subContent").remove();
			me.section.find(".subSection").append(subClone);
		}
	},
	up : function(){
		var me = this;
		me.isAnimate = true;

		me.cloneElement();

		TweenMax.to(me.prevSection, 1, { opacity: 0, scale: 1.5 , onComplete: function(){
			me.prevSection.remove();
		}},0);

		me.section.addClass("up");
		TweenMax.to(me.section, 0.8, {opacity: 1, scale: 1, onComplete : function(){
			me.changeAction();
		}},0);

	},
	down : function(){
		var me = this;
		me.isAnimate = true;

		me.cloneElement();

		TweenMax.to(me.prevSection, 0.8, {opacity: 0, scale: 0.9, onComplete: function(){
			 me.prevSection.remove();
		}},0);

		TweenMax.to(me.section, 0.7, {opacity: 1, scale: 1, onComplete : function(){
			me.changeAction();
		}},0);
		me.section.addClass("down");
	},
	prevElement : function(el){
		var me = this;
		me.prevSection.addClass(el).removeAttr('style');
		me.prevSection.transitionend('opacity transform', function() {
			this.remove();
		});
	},
	changeAction : function(el){
		var me = this;

		if (me.idx === 1) {
			clearTimeout(me.mTimer);
			me.mainAction.mCharacter();
		} 
		if (me.idx === 4) {
			me.isAnimate = true;
			
			me.characterAction.setup();
			me.util.screenShot();

			me.section.addClass("scrBar");
			me.section.find(".subSection").addClass("scrBarWidth");
			me.section.find(".subContent").addClass("scrBarWidth");
			
			me.scrolltop = 0;
			me.section.on("scroll", function(){
				me.scrolltop = $(this).scrollTop();
				me.scrollDown = me.section.height() + me.scrolltop;
				me.isAnimate = true;
			});

			return;
		}
		me.isAnimate = false;

	},
	isScrollbar : function(){
		var me = this;

		if(me.idx === 4){
			me.isAnimate = true;
		}
		me.content = me.section.find("> div").height();

		if(me.content > $(window).height()){
			me.isAnimate = true;
			me.section.css({ overflowY : "scroll"});
			me.section.scrollTop(1);
			me.section.on("scroll", function(){
				me.scrolltop = $(this).scrollTop();
				me.scrollDown = me.section.height() + me.scrolltop;
			});
			return;
		}
		me.isAnimate = false;
	},
	load : function(idx){
		var me = this;
		me.contentH = $(".section" + idx).height($(window).height());
		$(window).scrollTop(0);
	},
	resize : function(){
		var me = this;

		$(window).on("resize", function(){
			me.wrap.find("> div").height($(window).height());
		});
	}
});

