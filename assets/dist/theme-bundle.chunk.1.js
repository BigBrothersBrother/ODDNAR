webpackJsonp([1],{167:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function r(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=n(1),c=n.n(s),l=n(67),d=n(436),h=n(69),m=n(166),u=n(437),p=n(104),v=function(e){function t(i){o(this,t);var n=a(this,e.call(this,i));return n.url=window.location.href,n.$reviewLink=c()('[data-reveal-id="modal-review-form"]'),n}return r(t,e),t.prototype.before=function(e){function t(){c()(window).width()>=940&&!c()(".one.content").hasClass("active")&&(c()(".one.content").addClass("active"),c()(".mb-one").addClass("active"),c()(".mb-two").removeClass("active"),c()(".mb-three").removeClass("active"),c()(".mb-four").removeClass("active")),c()(window).width()<940&&c()(".two.content").hasClass("active")&&c()(".two.content").removeClass("active"),c()(window).width()<940&&c()(".three.content").hasClass("active")&&c()(".three.content").removeClass("active"),c()(window).width()<940&&c()(".four.content").hasClass("active")&&c()(".four.content").removeClass("active")}var i=this;c()(".customproduct.ctread").length>0&&c()(".form-input.form-input--incrementTotal").val(3),c()(document).on("close.fndtn.reveal",function(){-1!==i.url.indexOf("#write_review")&&"function"==typeof window.history.replaceState&&window.history.replaceState(null,document.title,window.location.pathname)}),c()("body").addClass("product-page"),c()(".Length").length>0&&c()(".Width").length>0?(c()("#customrugbox").show(),c()("#tooltip-shape").appendTo(".form-field.Shape"),c()("#tooltip-binding").appendTo(".form-field.Binding"),c()("#tooltip-corner").appendTo(".form-field.Corner"),c()("#tooltip-color").appendTo(".form-field.Color"),c()("#tooltip-cbind").appendTo(".form-field.Binding"),c()("#form-action-addToCart").click(function(){/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)&&(""!=c()(".form-input--small.Width").val()&&""!=c()(".form-input--small.Width").val()||alert("Please Enter Custom Width and Length"))})):c()("#customrugbox").remove(),c()("div.content2").length&&(c()("#tab-1 div.content2").appendTo("#tab-2"),c()(".vid-head").removeClass("hidden"),c()(".mb-two").removeClass("hidden")),c()("div.content3").length&&(c()("#tab-1 div.content3").appendTo("#tab-3"),c()(".care-head").removeClass("hidden"),c()(".mb-three").removeClass("hidden")),c()("div.content4").length&&(c()("#tab-1 div.content4").appendTo("#tab-4"),c()(".shipping-returns-head").removeClass("hidden"),c()(".mb-four").removeClass("hidden")),c()(".tab1").length&&(c()(".details-head").html(c()(".tab1").text()),c()(".mb-one").html(c()(".tab1").text()+'<i class="far fa-chevron-down"></i>')),c()(".tab2").length&&(c()(".vid-head").html(c()(".tab2").text()),c()(".mb-two").html(c()(".tab2").text()+'<i class="far fa-chevron-down"></i>'),c()(".content2").appendTo("#tab-2")),c()(".tab3").length&&(c()(".care-head").html(c()(".tab3").text()),c()(".mb-three").html(c()(".tab3").text()+'<i class="far fa-chevron-down"></i>'),c()(".content3").appendTo("#tab-3")),c()(".tab4").length&&(c()(".shipping-returns-head").html(c()(".tab4").text()),c()(".mb-four").html(c()(".tab4").text()+'<i class="far fa-chevron-down"></i>'),c()(".content4").appendTo("#tab-4")),c()(".content .tab1").remove(),c()(".content .tab2").remove(),c()(".content .tab3").remove(),c()(".content .tab4").remove(),c.a.trim(c()("#tab-2").html()).length&&c.a.trim(c()("#tab-2 .content2").html()).length||(c()(".vid-head").remove(),c()(".mb-two").remove(),c()("#tab-2").remove()),c.a.trim(c()("#tab-3").html()).length&&c.a.trim(c()("#tab-3 .content3").html()).length||(c()(".care-head").remove(),c()(".mb-three").remove(),c()("#tab-3").remove()),c.a.trim(c()("#tab-4").html()).length&&c.a.trim(c()("#tab-4 .content4").html()).length||(c()(".shipping-returns-head").remove(),c()(".mb-four").remove(),c()("#tab-4").remove()),c()(document).ready(t),c()(".mob-head").on("click",function(){c()(window).width()<940&&(c()(this).is(".active")?(c()(this).removeClass("active"),c()(this).next(".content").removeClass("active")):(c()(".mob-head.active").removeClass("active"),c()(this).addClass("active"),c()(".content.active").removeClass("active"),c()(this).next(".content").addClass("active")))}),c()(".desktabs li").on("click",function(){if(c()(window).width()>=940){c()(".desktabs li.active").removeClass("active"),c()(this).addClass("active"),c()(".content.active").removeClass("active");var e=c()(this).data("tab");c()(".content").not("#"+e).removeClass("active"),c()("#"+e).addClass("active")}}),c()(".form-field.Size label .form-option-variant").click(function(){console.log(c()(this).text())}),c()(".productView-info-value.Coupon").length>0&&c()('<div id="couponc">'+c()(".productView-info-value.Coupon").html()+"</div>").insertBefore("#productLinktoDetails"),c()(".tooltip-right").click(function(e){e.stopPropagation()}),c()(".tooltip-right").click(function(){c()(".tooltip-right").not(this).each(function(){c()(this).removeClass("open")}),c()(this).toggleClass("open")}),c()("body").click(function(){c()(".tooltip-right").removeClass("open")}),e()},t.prototype.loaded=function(e){var t=this,n=void 0;Object(h.b)(),this.productDetails=new m.a(c()(".productView"),this.context,window.BCData.product_attributes),Object(u.a)();var o=Object(p.b)(".writeReview-form"),a=new d.a(o);c()("body").on("click",'[data-reveal-id="modal-review-form"]',function(){n=a.registerValidation(t.context)}),o.on("submit",function(){return!!n&&(n.performCheck(),n.areAll("valid"))}),c()(document).ready(function(){if(-1===document.location.href.indexOf("size")&&-1===document.location.href.indexOf("color")){var e=c()(".Price.Array.Price").text(),t=c()(".Price.Array.Quantity").text(),n=e.split("~"),o=t.split("~"),a=n.length,r=99999,s=0;if(""!=e){for(i=0;i<a;i++)+o[i]>0&&(+n[i]<r&&(r=n[i]),+n[i]>s&&(s=n[i]));var l=Math.floor(r/.8),d=Math.floor(s/.8)}if(c()(".form-field.Color").length>0&&c()(".form-field.Size").length>0)""!=e&&r!=s&&void 0!==r&&99999!=r&&(c()(".productView-price").append('<span class="pricerangeDiscounted">$'+Number(l).toLocaleString("en-US",{minimumFractionDigits:2})+" - $"+Number(d).toLocaleString("en-US",{minimumFractionDigits:2})+'</span><br><span class="pricerange">$'+Number(r).toLocaleString("en-US",{minimumFractionDigits:2})+" - $"+Number(s).toLocaleString("en-US",{minimumFractionDigits:2})+"</span>"),c()(".productView-price .price-section--withoutTax").hide()),c()("#cornerswatch").addClass("hideswatch");else if(c()(".form-field.Binding.Color").length>0)c()(".form-field.Binding.Color .form-option span:visible").first().trigger("click"),c()(".form-field.Binding.Color .form-option").addClass("selected"),c()("#cornerswatch").addClass("hideswatch");else if(c()(".form-field.Color").length>0)""!=e&&r!=s&&void 0!==r&&99999!=r&&(c()(".productView-price").append('<span class="pricerangeDiscounted">$'+Number(l).toLocaleString("en-US",{minimumFractionDigits:2})+" - $"+Number(d).toLocaleString("en-US",{minimumFractionDigits:2})+'</span><br><span class="pricerange">$'+Number(r).toLocaleString("en-US",{minimumFractionDigits:2})+" - $"+Number(s).toLocaleString("en-US",{minimumFractionDigits:2})+"</span>"),c()(".productView-price .price-section--withoutTax").hide()),c()("#cornerswatch").addClass("hideswatch");else{if(void 0!==BCData&&void 0!==BCData.product_attributes.price.price_range&&0!==BCData.product_attributes.price.price_range.length){var h=BCData.product_attributes.price.price_range.min.without_tax.value,m=BCData.product_attributes.price.price_range.max.without_tax.value,u=Math.floor(h/.8),p=Math.floor(m/.8);h="$"+Number(h).toLocaleString("en-US",{minimumFractionDigits:2}),m="$"+Number(m).toLocaleString("en-US",{minimumFractionDigits:2}),u="$"+Number(u).toLocaleString("en-US",{minimumFractionDigits:2}),p="$"+Number(p).toLocaleString("en-US",{minimumFractionDigits:2}),c()(".productView-price").append('<span class="pricerangeDiscounted">'+u+" - "+p+'</span><span class="pricerange"> '+h+" - "+m+"</span>"),c()(".productView-price .price-section--withoutTax").hide()}c()("#cornerswatch").addClass("hideswatch")}}"0"==c()("#shiptime").text()&&c()("#shiptime").hide()});var r=document.getElementsByClassName("up-paddle"),s=document.getElementsByClassName("down-paddle"),l=c()(".itemRecent").length,v=c()(".itemRecent").outerHeight(!0),f=function(){return c()(".menu-wrapperRecents").outerHeight()},w=f();c()(window).on("resize",function(){w=f()});var b=function(){return l*v}(),g=b-w,C=function(){return c()(".menuRecents").scrollTop()};l>=4&&c()(s).removeClass("hidden"),c()(".menuRecents").on("scroll",function(){g=b-w;var e=C(),t=g-20;e<=20?(c()(r).addClass("hidden"),c()(s).removeClass("hidden")):e<t?(c()(r).removeClass("hidden"),c()(s).removeClass("hidden")):e>=t&&(c()(r).removeClass("hidden"),c()(s).addClass("hidden"))}),c()(s).on("click",function(){c()(".menuRecents").animate({scrollTop:g},300)}),c()(r).on("click",function(){c()(".menuRecents").animate({scrollTop:"0"},300)});var y=document.getElementsByClassName("left-paddle"),x=document.getElementsByClassName("right-paddle"),k=c()(".itemThumb").length,T=c()(".itemThumb").outerWidth(!0),S=function(){return c()(".menu-wrapperThumbs").outerWidth()},$=S();c()(window).on("resize",function(){$=S()});var D=function(){return k*T}(),L=D-$,V=function(){return c()(".menuThumbs").scrollLeft()};k>=5&&c()(x).removeClass("hidden");var O=function(){L=D-$;var e=V(),t=L-20;e<=20?(c()(y).addClass("hidden"),c()(x).removeClass("hidden")):e<t?(c()(y).removeClass("hidden"),c()(x).removeClass("hidden")):e>=t&&(c()(y).removeClass("hidden"),c()(x).addClass("hidden"))};c()(".menuThumbs").on("scroll",O),c()(x).on("click",function(){c()(".menuThumbs").animate({scrollLeft:L},600)}),c()(y).on("click",function(){c()(".menuThumbs").animate({scrollLeft:"0"},600)}),c()(".description-text").length<1&&c()(".features-list").length<1&&(c()(".details-head").hide(),c()(".shipping-returns-head").addClass("active"),c()(".one.content").removeClass("active"),c()(".mob-head.mb-one").hide(),c()(".mob-head.mb-four").addClass("active"),c()(".four.content").addClass("active")),c()("#defaulttemplate").length>0&&("YES"==c()(".productView-info-value.Earth.Friendly").text()&&c()("#icon-earth").show(),"YES"==c()(".productView-info-value.Handmade").text()&&c()("#icon-hand").show()),"cr-eco-hold"==c()("#psku").text()&&(c()("#icon-hand").hide(),c()("#icon-earth").hide(),c()("#icon-usa").hide()),c()("#productLinktoDetails").append('\n        <a href="#stwrapper" style="display:block;font-weight:bold;margin-bottom:10px;margin-top:10px;text-decoration:none;">\n            View Product Details and Specifications\n            <i class="icon"><svg><use xlink:href="#icon-keyboard-arrow-down"></use></svg></i> </a> &nbsp;&nbsp;\n        ');var _=(c()("#atcwrap").offset().top,c()("#atcwrap").outerHeight(),c()("#atcwrap").outerHeight());c()("#atchold").css("height",_);c()(window).scroll(function(e){c()(window).scrollTop(),c()(window).scrollTop(),window.innerHeight,c()(this).scrollTop();c()(this).scrollTop()>500?screen.width<768&&c()("#cornerswatch:hidden").fadeIn("fast"):c()("#cornerswatch:visible").fadeOut("fast")}),c()("#cornerswatch").click(function(){c()("#cornerswatch").prependTo("body"),c()(this).hasClass("zoomed")?(c()("#zoomoverlay").fadeOut(200),c()("#zoomoverlay").delay(200).remove(),c()(this).removeClass("zoomed"),c()(this).animate({width:100},50,"swing")):(c()(this).addClass("zoomed"),c()(this).animate({width:c()(window).width()-20},200,"swing"),c()("body").prepend('<div id="zoomoverlay"></div>'),c()("#zoomoverlay").fadeIn(600),c()("#zoomoverlay").click(function(){c()("#zoomoverlay").fadeOut(200),c()("#zoomoverlay").delay(200).remove(),c()("#cornerswatch").removeClass("zoomed"),c()("#cornerswatch").animate({width:100},50,"swing")}))}),c()(window).load(function(){c()("#customdimbox input").val("")}),e()},t.prototype.after=function(e){this.productReviewHandler(),e()},t.prototype.productReviewHandler=function(){-1!==this.url.indexOf("#write_review")&&this.$reviewLink.click()},t}(l.a);t.default=v},436:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=i(1),a=i.n(o),r=i(68),s=i(69),c=i(163),l=function(){function e(t){n(this,e),this.validator=Object(r.a)({submit:t.find('input[type="submit"]')}),this.$reviewsContent=a()("#product-reviews"),this.$collapsible=a()("[data-collapsible]",this.$reviewsContent),this.initLinkBind(),this.injectPaginationLink(),this.collapseReviews()}return e.prototype.initLinkBind=function(){var e=this,t=a()("#productReviews-content",this.$reviewsContent);a()(".productView-reviewLink").click(function(){t.hasClass("is-open")||e.$collapsible.trigger(s.a.click)})},e.prototype.collapseReviews=function(){window.location.hash&&0===window.location.hash.indexOf("#product-reviews")||this.$collapsible.trigger(s.a.click)},e.prototype.injectPaginationLink=function(){var e=a()(".pagination-item--next .pagination-link",this.$reviewsContent),t=a()(".pagination-item--previous .pagination-link",this.$reviewsContent);e.length&&e.attr("href",e.attr("href")+" #product-reviews"),t.length&&t.attr("href",t.attr("href")+" #product-reviews")},e.prototype.registerValidation=function(e){return this.context=e,this.validator.add([{selector:'[name="revrating"]',validate:"presence",errorMessage:this.context.reviewRating},{selector:'[name="revtitle"]',validate:"min-length:2",errorMessage:this.context.reviewSubject},{selector:'[name="revtext"]',validate:"min-length:2",errorMessage:this.context.reviewComment},{selector:'[name="email"]',validate:function(e,t){e(c.a.email(t))},errorMessage:this.context.reviewEmail}]),this.validator},e.prototype.validate=function(){return this.validator.performCheck()},e}();t.a=l},437:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(){r()("[data-video-gallery]").each(function(e,t){var i=r()(t);i.data("video-gallery")instanceof s||i.data("video-gallery",new s(i))})}t.a=o;var a=i(1),r=i.n(a),s=function(){function e(t){n(this,e),this.$player=t.find("[data-video-player]"),this.$videos=t.find("[data-video-item]"),this.currentVideo={},this.bindEvents()}return e.prototype.selectNewVideo=function(e){e.preventDefault();var t=r()(e.currentTarget);this.currentVideo={id:t.data("video-id"),$selectedThumb:t},this.setMainVideo(),this.setActiveThumb()},e.prototype.setMainVideo=function(){this.$player.attr("src","//www.youtube.com/embed/"+this.currentVideo.id)},e.prototype.setActiveThumb=function(){this.$videos.removeClass("is-active"),this.currentVideo.$selectedThumb.addClass("is-active")},e.prototype.bindEvents=function(){this.$videos.on("click",this.selectNewVideo.bind(this))},e}()}});
