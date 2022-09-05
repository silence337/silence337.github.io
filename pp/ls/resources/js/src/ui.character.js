nf.namespace("Character.Action");
nf.Character.Action = Class.extend({
	setup : function(){
		var me = this;
		me.copySubSection = $("#blindContent .character");
		me.subSection =  $("#content .character");
		me.idx = me.subSection.find(".subContent").data("sub");	

		me.isAnimate = false;
		me.bindNavigation();
		me.bindButton();
	},
	bindNavigation : function(){
		var me = this;
		
		me.naviButton = "#content .character .nav a";

		$("body").off("click", me.naviButton);
		$("body").on("click", me.naviButton, function(e){
			var navIndex = $(this).parent().index() + 1;

			if (!me.isAnimate){
				$(me.naviButton).removeClass("on");
				$(this).addClass("on");

				if (me.idx === navIndex) {
					return;
				}
				if (me.idx < navIndex) {
					me.idx = navIndex;
					me.characterAction("next");
				} else {
					me.idx = navIndex;
					me.characterAction("prev");
				}
				me.hidePointer(me.idx);
			}
		});
	},
	bindButton : function(){
		var me = this;
		me.pointButton = "#content .btnPointer a";

		$("body").off("click", me.pointButton);
		$("body").on("click", me.pointButton, function(e){
			if (!me.isAnimate){
				if ($(this).hasClass("btn_char_prev")) {
					if (me.idx === 1) {
						return;
					}
					me.idx--;
					me.characterAction("prev");
				} else {
					if (me.idx > me.copySubSection.find(".subContent").length - 1) {
						return;
					}
					me.idx++;
					me.characterAction("next");
				}
				//navigation change
				$(me.naviButton).removeClass("on");
				$(me.naviButton).parents(".nav").find("li:eq(" + (me.idx - 1) + ") a").addClass("on");
			}
		});
	},
	characterAction : function(type){
		var me = this;
		me.isAnimate = true;
		me.nextIndex = me.idx;

		me.bindClone();
		me.flagAction(type);
		me.textAction(type);
		me.character(type);
		me.hidePointer(me.idx);
	},
	bindClone : function(){  // 요소 복사
		var me = this;
		var cloneTitle = me.subSection.find(".title > div").clone();
		var cloneCnt = me.copySubSection.find("[data-sub=" + me.nextIndex +"]").clone();
		me.removeIndex = me.subSection.find(".subContent").data("sub");

		//console.log(me.removeIndex);
		me.subSection.find(".title > div").before(cloneTitle).attr("class","t" + me.nextIndex);
		me.subSection.append(cloneCnt);
		me.subSection.find(".subContent").addClass("scrBarWidth");

	},
	flagAction : function(type){ // 깃발
		var me = this;
		var rotateY = (type == "next") ? -180 : 180,
			prevFlag = me.subSection.find(".title > .t" + me.removeIndex),
			nextFlag = me.subSection.find(".title > .t" + me.nextIndex);
		
		TweenMax.to(prevFlag, 0.9, {css:{ opacity: 0, rotationY: rotateY }, 
			onComplete: function(){
				prevFlag.remove();
			}
		},1);
		TweenMax.set(nextFlag, {opacity:0,rotationY:rotateY});
		TweenMax.to(nextFlag, 1, {css:{opacity: 1, rotationY: 0}},1);
	},
	textAction : function(type){ // 텍스트
		var me = this;
		me.prevSubCnt = me.subSection.find("[data-sub=" + me.removeIndex +"]");
		me.nextSubCnt = me.subSection.find("[data-sub=" + me.nextIndex +"]");

		var prevWrap = me.prevSubCnt.find(".text"),	
			nextWrap = me.nextSubCnt.find(".text");

		var nextSubj = nextWrap.find("strong"),	
			nextTxt = nextWrap.find(".stxt"), 
			nextImg = nextWrap.find(".thum");

		var posY = (type == "next") ? 30 : 30;

		TweenLite.set(nextSubj, {opacity:0, y: posY});
		TweenLite.set(nextTxt, {opacity:0, y: posY});
		TweenLite.set(nextImg, {opacity:0, y: posY});

		var nextMotion = new TimelineLite(), 
			prevMotion = new TimelineLite(), 
			imageMotion = new TimelineLite();

		prevMotion.to(prevWrap, 0.2, {opacity: 0, y: posY});
		nextMotion.to(nextSubj, 1, {opacity: 1, y: 0}).to(nextTxt, 1, {opacity: 1, y: 0}, "0.20");
		imageMotion.to(nextImg, 1.5, {opacity: 1, y: 0});

	},
	character : function(type){ // 캐릭터
		var me = this;
		var prevX = (type == "next") ? -300 : 300,
			nextX = (type == "next") ? 300 : -300,
			prevChar = me.prevSubCnt.find(".char"),
			nextChar = me.nextSubCnt.find(".char");

		TweenMax.to(prevChar, 0.5, {css:{ opacity: 0, x: prevX , y: 100, scale: 0.75 }, 
			onComplete: function(){
				me.prevSubCnt.remove();
			}
		},1);

		TweenMax.set(nextChar, {opacity:0 , x : nextX, y: 100, scale: 0.75});
		TweenMax.to(nextChar, 1, {css:{opacity: 1, x : 0, y: 0, scale: 1}, 
			onComplete : function(){
				me.isAnimate = false;
			}
		},1);
	},
	hidePointer : function(idx){
		var me = this;
		var prev = $(me.pointButton).parent().find(".btn_char_prev"),
			next = $(me.pointButton).parent().find(".btn_char_next");

		if (idx == 1){
			prev.hide();
			next.show();
		} else if (idx == 4) {
			prev.show();
			next.hide();
		} else {
			prev.show();
			next.show();
		}
	}
});

