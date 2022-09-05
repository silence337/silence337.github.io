nf.namespace("SlideUtil");
nf.SlideUtil = Class.extend({
	screenShot : function(url){
		var me = this;
		var $screenShot = "#content .subContent .thum a";	

		me.bindSetFloat($screenShot);
	},
	agree : function(){
		var me = this;
		var $agree = "#content .agree dl a",
			$agreeView = "#content .agree_view",
			$infoView = "#content .info_view";

		$("body").off($agree);
		$("body").on("click", $agree, function(){
			var label = $(this).prev("label"),
				input = label.find("input"),
				all = $($agree).parents(".agree").find("dl");

			if ($(this).hasClass("agreeAll")) {
				if (input.is(':checked')) {
					all.find("input").prop('checked', false);
					all.find("label").removeClass('check');
				} else {
					all.find("input").prop('checked', true);
					all.find("label").addClass('check');
				}
			} else {
				if (input.is(':checked')) {
					label.removeClass('check');
					input.prop('checked', false);
				} else {
					label.addClass('check');
					input.prop('checked', true);
				}	
			}
			//console.log('dd');
		});

		me.bindSetFloat($agreeView);
		me.bindSetFloat($infoView);

	},
	bindSetFloat : function(obj){
		$("body").off(obj);
		$("body").on("click", obj, function(e){
			e.preventDefault();
			var id = $(this).attr("href").split("#")[1];
			
			nf.setFloat(id);
		});
	},
	movieFrame : function(){
		var movieTab = "#content .movieTab a",
			moviePlay = "#content .btn_moviePlay",
			movieBox = "#content .movieBox";

		$("body").off(movieTab);
		$("body").on("click", movieTab, function(e){
			e.preventDefault();
			var id = $(this).attr("href");

			$(movieTab).removeClass("on");
			$(this).addClass("on");
			
			$(movieBox).hide();
			$(movieBox).find("iframe").remove();
			$(id).show().find("a").show();

		});

		$("body").off("click", moviePlay);
		$("body").on("click", moviePlay, function(){
			var url = $(this).data("url"),
				movieCreate = '<iframe id="youtubePlayer" frameborder="0" allowfullscreen="1" title="YouTube video player" width="800" height="450" src="https://www.youtube.com/embed/'+url+'?rel=0&amp;showinfo=0&amp;wmode=transparent&amp;autohide=1&amp;enablejsapi=1&amp;autoplay=1&amp;vq=hd1080"></iframe>';		
			$(this).parent().append(movieCreate);
			$(this).hide();
		});
	}
});

