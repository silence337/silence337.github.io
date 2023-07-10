(function ($) {
    "use strict";

    // Main JS
    // ************************************************
    // PC ver LAYOUT - fullpage Scrolling  
    // Mobile ver LAYOUT - Slick Slide JS
    //
    // 예외처리 ( PC버전 <-> M 버전으로 전환될때 이벤트s. )
    // - fullpage 이벤트 제거 및 재 바인딩 or 모바일 Slick slide 제거 및 재 바인딩
    // - 우측 레이어 호출시 fullpage scrolling STOP, START 핸들링
    // - 우측 레이어 호출시 slick JS reinit
    // - 우측 레이어 버튼 액션 핸들링 ( PC, M 서로 다른 방식으로 호출 : 호출하는 마크업은 동일 )
    // - 기타 인터랙션 효과의 리셋 및 바인딩 
    // ************************************************

    var mainSettings = function () {
        var me = this;
        this.main = $('#main');
        this.mainContents = $('.maincontents');
        this.section = this.mainContents.find('.section');
        this.titleGroup = $('.titleGroup dt i');
        this.buttonMore = $('.btnMain-more');
        this.buttonMoreClose = $('.btnMore-close');
        this.icoMouse = $('.icoMouse'); // 2019-09-19 추가
        this.openActionEl = $('#main .header, #main .container, #main .footer');// 2019-09-19 추가

        $(window).on('resize load', function() {
            me.screenWidth = $(window).width();

            if(me.isMobile()) {
                
                me.MOBILE_START();

                // fullpage flag
                if(!me.mainContents.hasClass('fullpage-wrapper')) {
                    return;
                }

                $.fn.fullpage.destroy('all'); //fullpage delete
                me.mainContents.removeClass('fullpage-wrapper');
                me.isFull = false;

            } else {
                
                if (me.mainContents.hasClass('slick-initialized')) {
                    me.mainContents.slick('unslick');
                }

                me.DESK_START();
                me.DESK_Fullpage(); //fullpage init
                me.DESK_MouseMove(); // 2019-09-19 추가
                $('#slickNews').slick('reinit');
                me.isFull = true;
            }
        });
        this.CompanyNotice();
        this.PrcenterSlick();

     }
     mainSettings.prototype = {

        isMobile : function () {
            return (this.screenWidth < 1024 || navigator.userAgent.match(/Android|Mobile|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/));
        },
        isMobileView : function () {
            return (this.main.hasClass('isMobile'));
        },
        isDeskView : function () {
            return (this.main.hasClass('isDesk'));
        },
        // ****************** DESK ********************* //
        DESK_START : function () {
            var me = this;

            if (me.isDeskView()) {
                return;
            }
            
            // 처음 로드시 액션
            me.main.removeClass('isMobile');
            me.titleGroup.removeClass('on');
            me.main.find('.doAnimate').removeClass('doAnimate');
            me.main.find('.header').animate({"top" : "0"});
            me.main.find('.mainNotice').animate({"left" : "0"}, 600);

            me.main.addClass('isDesk');
            me.openActionEl.removeClass('side-open'); /* 2019-09-19 수정추가 */
            $('.sideAreaWrap').removeClass('on'); // 2019-09-19 BUG 수정추가
            me.DESK_Append();

            setTimeout(function (){
                me.section.eq(0).addClass('doAnimate');
                me.DESK_Text(0);
            }, 800);

        },

        // 2019-09-23 Video 추가 수정 START
        DESK_Append : function () {
            var me = this;
            var video1 = '<video class="video" id="video1" muted preload="auto"><source src="images/bg_movie1.mp4" type="video/mp4"></video>';
            var video2 = '<video class="video" id="video2" muted loop preload="auto"><source src="images/bg_movie2.mp4" type="video/mp4"></video>';
            var video3 = '<video class="video" id="video3" muted loop preload="auto"><source src="images/bg_movie3.mp4" type="video/mp4"></video>';
            var video4 = '<video class="video" id="video4" muted loop preload="auto"><source src="images/bg_movie4.mp4" type="video/mp4"></video>';
            var footerArea = '<div class="section fp-auto-height"><div class="footerCloneArea"></div></div>';
            var footerElement = $('.footer').clone();

            $('.video1').append(video1);
            $('.video2').append(video2);
            $('.video3').append(video3);
            $('.video4').append(video4);

            if ($('.section.fp-auto-height').length === 0) {
                me.mainContents.append(footerArea);
            }
            setTimeout(function (){
                $('.footerCloneArea').append(footerElement);
            },100);
        },
        // 2019-09-23 Video 추가 수정 END

        DESK_Video : function (s,n) {
            if (s === 'play') {
                $('#video' + n).get(0).play();
                return;
            }
            // 2019-09-23 수정 START
            $('.video video').each(function (idx) {
                $(this).get(0).pause();
                if (!idx === 3) { // 2019-09-24 수정
                    $(this).get(0).currentTime = 0;
                }
            });
            // 2019-09-23 수정 END
        },
        DESK_Fullpage : function () {
            var me = this;
            if (this.isFull) {
                return;
            }
            me.mainContents.fullpage({
                scrollingSpeed: 1000,
                resize: true,
                anchors:['COMPANY', 'BUSINESS', 'PRCENTER', 'RECRUIT',''],
                menu: '#menu',
                onLeave: function(index, nextIndex, direction){
                    var idx = (nextIndex - 1);
                    me.isAnimate = true;

                    clearTimeout(me.textTimer);
                    clearTimeout(timer);

                    me.titleGroup.removeClass('on');
                    me.section.removeClass('doAnimate');

                    var timer = setTimeout(function () {
                        me.section.eq(idx).addClass('doAnimate');
                        me.DESK_Text(idx);
                    },600);

                    $('.moreWrap').addClass('isMove');
                    me.icoMouse.removeClass('mouseHide'); // 2019-09-19 수정
                    if (nextIndex === 5) {
                        me.icoMouse.addClass('mouseHide');// 2019-09-19 수정
                    }
                },
                afterLoad: function(anchorLink, index){
                    me.isAnimate = false;
                    me.idx = index; // 2019-09-19 추가

                    // 2019-09-23 수정 START
                    me.DESK_Video('stop');
                    if (index === 5) {
                        return;
                    }
                    me.DESK_Video('play', index);
                    // 2019-09-23 수정 END

                    $('.moreWrap').removeClass('isMove');
                    me.buttonMore.attr('data-name',anchorLink);
                    me.buttonMore.removeClass('COMPANY BUSINESS PRCENTER RECRUIT').addClass(anchorLink);
                    
                    me.DESK_layerButtom(anchorLink);
                }
            });
        },
        DESK_Text : function (i) {
            var me = this;
            var maxDelay = 1000;
            var minSpeed = 500;
            var maxSpeed = 1000;
            var $text = this.section.eq(i).find(me.titleGroup);
         
            clearTimeout(me.textTimer);

            setTimeout(function (){
                $text.each(function () {
                    var el = $(this);
                    var delay = Math.ceil(Math.random() * maxDelay);
                    var speed = maxSpeed + Math.ceil(Math.random() * (minSpeed - maxSpeed));

                    me.textTimer = setTimeout(function () {
                        el.delay(delay).addClass('on');
                    }, speed);
                });	
            },100);
        },
        DESK_layerButtom : function (data) {
            var me = this;
            //me.openActionEl = $('#main .header, #main .container, #main .footer'); /* 2019-09-19 상위로 이동 */
            
            me.buttonMore.on('click', function () {
                if (me.isAnimate) {
                    return;
                }
                var dataName = $(this).attr('data-name');              
                $('#' + dataName + '_view').addClass('on');

                me.openActionEl.addClass('side-open'); /* 2019-09-19 수정 */
                $.fn.fullpage.setAllowScrolling(false); // fullpage wheel stop

                if (data === 'PRCENTER') {
                    $('.slick-slider').slick('slickGoTo', 0);
                }
            });

            me.buttonMoreClose.on('click', function () {
                $(this).parents('.sideAreaWrap').removeClass('on');
                me.openActionEl.removeClass('side-open'); /* 2019-09-19 수정 */
                $.fn.fullpage.setAllowScrolling(true); // fullpage wheel start
            });
        },
        /* 2019-09-19 마우스 이벤트 추가 */
        DESK_MouseMove : function () {
            var me = this;
            me.icoMouse.find('i').off('click'); // 이미 저장된 PC버전의 클릭 이벤트 제거
            me.icoMouse.find('i').on('click', function () {
                if (me.idx === 4) {
                    return $.fn.fullpage.moveTo(1);
                }
                $.fn.fullpage.moveSectionDown();
            });
        },
        /* 2019-09-19 마우스 이벤트 추가 */

        // ****************** MOBILE ********************* //
        MOBILE_START : function () {
            var me = this;
            
            if (me.mainContents.hasClass('slick-initialized')) {
                return;
            }

            window.location.hash = '';

            // RESET
            me.titleGroup.removeClass('on');
            me.main.removeClass('isDesk');
            
            me.main.find('.header').removeAttr('style');
            me.main.find('.doAnimate').removeClass('doAnimate');
            
            $('.videoGroup video, .fp-auto-height').remove();
            $('.sideAreaWrap').removeClass('on'); // 2019-09-19 BUG 수정추가
            me.buttonMore.attr('data-name', 'COMPANY'); // 2019-09-19 BUG 수정추가
            me.buttonMore.find('span').text('COMPANY MORE'); // 2019-09-19 BUG 수정추가
            // RESET

            me.main.addClass('isMobile');

            me.mainContents.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: false,
            });
            
            setTimeout(function () {
                me.mainContents.find('.mCompany').addClass('doAnimate');
            }, 100); 
            
            me.mainContents.on('afterChange', function() {
                var activeSection = $('.slick-current.slick-active .section');
                var dataName = activeSection.data('name');
                var dataText = activeSection.data('text');
                
                if (me.isMobileView()) {
                    $('#main').find('.doAnimate').removeClass('doAnimate');
                }
                activeSection.addClass('doAnimate');

                me.buttonMore.find('span').text(dataText);
                me.buttonMore.attr('data-name',dataName);

            });
            $('#slickNews').slick('reinit');

            me.MOBILE_layerButtom();
        },
        MOBILE_layerButtom : function () {   
            var me = this;        
            me.buttonMore.off('click'); // 이미 저장된 PC버전의 클릭 이벤트 제거
            me.buttonMore.on('click', function () {
                var dataName = $(this).attr('data-name');              
                $('#' + dataName + '_view').addClass('on');
            });

            me.buttonMoreClose.on('click', function () {
                $(this).parents('.sideAreaWrap').removeClass('on');
            });
        },

        // ****************** COMMON SLICK ********************* //
        CompanyNotice : function () {
            $('#slickNews').slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 2000,
                arrows: false,
                vertical: true,
                dots: false,
            });
        },
        PrcenterSlick : function () {
            var me = this;
            $('.slickList1, .slickList2').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true,
            });
        },

    }

    var UCOMP_DS = new mainSettings();

    
})(jQuery);