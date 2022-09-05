nf.namespace("Main.Action");
nf.Main.Action = Class.extend({
	mCharacter : function(){
		var me = this;
		me.wrap = $("#content");
		me.character = me.wrap.find(".mCharacter div");
		me.typo1 = me.wrap.find(".typo1");
		me.typo2 = me.wrap.find(".typo2");
		me.typo3 = me.wrap.find(".typo3");
		me.typoSlice = me.wrap.find(".typo2 .t3");
		me.typoLight = me.wrap.find(".main_typo_light");

		TweenLite.set(me.character, {opacity:0 , y: 100, scale: 0.8});
		TweenLite.set(me.typo1, {opacity:0 , x: -100, scale: 0.8});
		TweenLite.set(me.typo2, {opacity:0 , x: -80, scale: 1});
		TweenLite.set(me.typoLight, {opacity:0, x: -100, y: 50});

		var mainMotion = new TimelineLite();

		mainMotion.to( me.character , 0.85, {opacity: 1, y: 0, scale: 1})
		.to( me.typo1 , 0.4, {opacity: 1, x: 0, scale: 1, 
			onComplete : function(){
				
				TweenLite.to( me.typo2 , 0.3, {opacity: 1, x: 0, scale: 1, 
					onComplete : function(){
						me.LightMotion();
					}
				},0);	
			}
		},0.8);

		me.pos();
	},
	LightMotion : function(){
		var me = this;
		var	lMotion = new TimelineLite();

		lMotion.to(me.typoLight, 0.1, {opacity: 1, x: 370, y: -108})
		.to(me.typoLight, 0.1, {opacity: 0, x: 530, y: -154, 
			onComplete : function(){
				TweenMax.to(me.typoSlice, 0.7, {opacity: 1 , 
					onComplete : function(){
						me.typoSlice.prev().hide();
						//slice Light
						TweenLite.set( me.typoLight , {opacity:0, x: 187, y: -52});
						lMotion.to( me.typoLight , 0.5, {opacity: 1},0).to( me.typoLight , 0.5, {opacity: 0});
						TweenLite.to( me.typoSlice , 0.7, {x: 3 , y: 2 ,
							onComplete : function(){
								me.typo3.addClass("on");
							}
						});
					}
				});
			}
		},0.05);
	},
	pos : function(){
		var me = this;
		$(window).on("resize", function(){
			if ($(this).height() > 980) {
				me.character.css({ bottom : "0" });
			} else {
				me.character.css({ bottom : "auto" });
			}
		});
		$(window).resize();
	}
});

