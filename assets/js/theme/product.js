/*
 Import all product specific js
 */
import $ from 'jquery';
import PageManager from './page-manager';
import Review from './product/reviews';
import collapsibleFactory from './common/collapsible';
import ProductDetails from './common/product-details';
import videoGallery from './product/video-gallery';
import {
    classifyForm
} from './common/form-utils';


export default class Product extends PageManager {
    constructor(context) {
        super(context);
        this.url = window.location.href;
        this.$reviewLink = $('[data-reveal-id="modal-review-form"]');
    }

    before(next) {
        if ($('.customproduct.ctread').length > 0) {
            $('.form-input.form-input--incrementTotal').val(3);
        }




        // Listen for foundation modal close events to sanitize URL after review.
        $(document).on('close.fndtn.reveal', () => {
            if (this.url.indexOf('#write_review') !== -1 && typeof window.history.replaceState === 'function') {
                window.history.replaceState(null, document.title, window.location.pathname);
            }
        });
        $('body').addClass('product-page');
        if ($('.Length').length > 0 && $('.Width').length > 0) {
            $('#customrugbox').show();
            $('#tooltip-shape').appendTo('.form-field.Shape');
            $('#tooltip-binding').appendTo('.form-field.Binding');
            $('#tooltip-corner').appendTo('.form-field.Corner');
            $('#tooltip-color').appendTo('.form-field.Color');
            $('#tooltip-cbind').appendTo('.form-field.Binding');
            $('#form-action-addToCart').click( function() {
                if( /Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent) ) {
                    if ( $('.form-input--small.Width').val() == '' || $('.form-input--small.Width').val() == '') {
                        alert('Please Enter Custom Width and Length')
                    }
                }
            });
        } else {
            $('#customrugbox').remove();
        }

        if ($('div.content2').length) {
            $('#tab-1 div.content2').appendTo('#tab-2');
            $('.vid-head').removeClass('hidden');
            $('.mb-two').removeClass('hidden');
        }

        if ($('div.content3').length) {
            $('#tab-1 div.content3').appendTo('#tab-3');
            $('.care-head').removeClass('hidden');
            $('.mb-three').removeClass('hidden');
        }

        if ($('div.content4').length) {
            $('#tab-1 div.content4').appendTo('#tab-4');
            $('.shipping-returns-head').removeClass('hidden');
            $('.mb-four').removeClass('hidden');
        }

        // Dynamic Tabs Functionality
        if ($('.tab1').length) {
            $('.details-head').html($('.tab1').text());
            $('.mb-one').html($('.tab1').text() + '<i class="far fa-chevron-down"></i>');
        }

        if ($('.tab2').length) {
            $('.vid-head').html($('.tab2').text());
            $('.mb-two').html($('.tab2').text() + '<i class="far fa-chevron-down"></i>');
            $('.content2').appendTo('#tab-2');
        }

        if ($('.tab3').length) {
            $('.care-head').html($('.tab3').text());
            $('.mb-three').html($('.tab3').text() + '<i class="far fa-chevron-down"></i>');
            $('.content3').appendTo('#tab-3');
        }

        if ($('.tab4').length) {
            $('.shipping-returns-head').html($('.tab4').text());
            $('.mb-four').html($('.tab4').text() + '<i class="far fa-chevron-down"></i>');
            $('.content4').appendTo('#tab-4');
        }

        $('.content .tab1').remove();
        $('.content .tab2').remove();
        $('.content .tab3').remove();
        $('.content .tab4').remove();

        if (!$.trim($('#tab-2').html()).length || !$.trim($('#tab-2 .content2').html()).length) {
            $('.vid-head').remove();
            $('.mb-two').remove();
            $('#tab-2').remove();
        }
        if (!$.trim($('#tab-3').html()).length || !$.trim($('#tab-3 .content3').html()).length) {
            $('.care-head').remove();
            $('.mb-three').remove();
            $('#tab-3').remove();
        }
        if (!$.trim($('#tab-4').html()).length || !$.trim($('#tab-4 .content4').html()).length) {
            $('.shipping-returns-head').remove();
            $('.mb-four').remove();
            $('#tab-4').remove();
        }

        // Takes Care of resizing issues with product tabs
        $(document).ready(larg);

        function larg() {
            if ($(window).width() >= 940 && !$('.one.content').hasClass('active')) {
                $('.one.content').addClass('active');
                $('.mb-one').addClass('active');
                $('.mb-two').removeClass('active');
                $('.mb-three').removeClass('active');
                $('.mb-four').removeClass('active');
            }
            if ($(window).width() < 940 && $('.two.content').hasClass('active')) {
                $('.two.content').removeClass('active');
            }
            if ($(window).width() < 940 && $('.three.content').hasClass('active')) {
                $('.three.content').removeClass('active');
            }
            if ($(window).width() < 940 && $('.four.content').hasClass('active')) {
                $('.four.content').removeClass('active');
            }
        }


        $('.mob-head').on('click', function() {
            if ($(window).width() < 940) {
                if ($(this).is('.active')) {
                    $(this).removeClass('active');
                    $(this).next('.content').removeClass('active');
                } else {
                    $('.mob-head.active').removeClass('active');
                    $(this).addClass('active');
                    $('.content.active').removeClass('active');
                    $(this).next('.content').addClass('active');
                }
            }
        });

        $('.desktabs li').on('click', function() {
            if ($(window).width() >= 940) {
                $('.desktabs li.active').removeClass('active');
                $(this).addClass('active');
                $('.content.active').removeClass('active');
                var ttab = $(this).data('tab');
                $('.content').not('#' + ttab).removeClass('active');
                $('#' + ttab).addClass('active');
            }
        });

        $('.form-field.Size label .form-option-variant').click(function() {
            console.log($(this).text());
        });

        if ($('.productView-info-value.Coupon').length > 0) {
            $('<div id="couponc">' + $('.productView-info-value.Coupon').html() + '</div>').insertBefore('#productLinktoDetails');
        }

        $('.tooltip-right').click(function(e){ e.stopPropagation() });

        $('.tooltip-right').click( function() {
            $('.tooltip-right').not(this).each(function(){
                $(this).removeClass('open');
             });
            $(this).toggleClass('open');
        });

        $('body').click( function() {
            $('.tooltip-right').removeClass('open');
        });

        next();
    }

    loaded(next) {
        let validator;

        // Init collapsible
        collapsibleFactory();

        this.productDetails = new ProductDetails($('.productView'), this.context, window.BCData.product_attributes);

        videoGallery();

        const $reviewForm = classifyForm('.writeReview-form');
        const review = new Review($reviewForm);

        $('body').on('click', '[data-reveal-id="modal-review-form"]', () => {
            validator = review.registerValidation(this.context);
        });

        $reviewForm.on('submit', () => {
            if (validator) {
                validator.performCheck();
                return validator.areAll('valid');
            }
            return false;
        });


        $(document).ready(function() {

            if (document.location.href.indexOf('size') === -1 && document.location.href.indexOf('color') === -1) {
                var parray = $('.Price.Array.Price').text();
                var parrayq = $('.Price.Array.Quantity').text();
                var prprice = parray.split('~');
                var prinv = parrayq.split('~');

                var arrtotal = prprice.length;
                var mintotal = 99999;
                var maxtotal = 0;
                if (parray != '') {
                    for (i = 0; i < arrtotal; i++) {

                        if (+prinv[i] > 0) {

                            if (+prprice[i] < mintotal) {
                                mintotal = prprice[i];
                            }

                            if (+prprice[i] > maxtotal) {
                                maxtotal = prprice[i];
                            }

                        }
                    }
                    var mintotalDiscounted = Math.floor(mintotal / .8);
                    var maxtotalDiscounted = Math.floor(maxtotal / .8);
                }

                if ($('.form-field.Color').length > 0 && $('.form-field.Size').length > 0) {

                    if (parray != '') {
                        if (mintotal != maxtotal && typeof mintotal !== "undefined" && mintotal != 99999) {
                            $('.productView-price').append(
                              '<span class="pricerangeDiscounted">$' + Number(mintotalDiscounted).toLocaleString('en-US', {
                                  minimumFractionDigits: 2
                              }) + ' - $' + Number(maxtotalDiscounted).toLocaleString('en-US', {
                                  minimumFractionDigits: 2
                              }) + '</span><br><span class="pricerange">$' + Number(mintotal).toLocaleString('en-US', {
                                minimumFractionDigits: 2
                            }) + ' - $' + Number(maxtotal).toLocaleString('en-US', {
                                minimumFractionDigits: 2
                            }) + '</span>');
                            $('.productView-price .price-section--withoutTax').hide();
                        }
                    }
                    $('#cornerswatch').addClass("hideswatch");
                } else if ($('.form-field.Binding.Color').length > 0) {
                    $('.form-field.Binding.Color .form-option span:visible').first().trigger("click");
                    $('.form-field.Binding.Color .form-option').addClass('selected');
                    $('#cornerswatch').addClass("hideswatch");
                } else if ($('.form-field.Color').length > 0) {
                    /*
                    $('.form-field.Color .form-option span:visible').first().trigger("click");
                    $('.form-field.Color .form-option').addClass('selected');
                    */

                    if (parray != '') {
                        if (mintotal != maxtotal && typeof mintotal !== "undefined" && mintotal != 99999) {
                            $('.productView-price').append(
                              '<span class="pricerangeDiscounted">$' + Number(mintotalDiscounted).toLocaleString('en-US', {
                                  minimumFractionDigits: 2
                              }) + ' - $' + Number(maxtotalDiscounted).toLocaleString('en-US', {
                                  minimumFractionDigits: 2
                              }) + '</span><br><span class="pricerange">$' + Number(mintotal).toLocaleString('en-US', {
                                minimumFractionDigits: 2
                            }) + ' - $' + Number(maxtotal).toLocaleString('en-US', {
                                minimumFractionDigits: 2
                            }) + '</span>');
                            $('.productView-price .price-section--withoutTax').hide();
                        }
                    }
                    $('#cornerswatch').addClass("hideswatch");
                } else {
                    /*
                    $('.form-field.Size .form-option').first().trigger("click");
                    */

                    // if (parray != '') {
                    //     if (mintotal != maxtotal && typeof mintotal !== "undefined" && mintotal != 99999) {
                    //         $('.productView-price').append('<span class="pricerange">$' + Number(mintotal).toLocaleString('en-US', {
                    //             minimumFractionDigits: 2
                    //         }) + ' - $' + Number(maxtotal).toLocaleString('en-US', {
                    //             minimumFractionDigits: 2
                    //         }) + '</span>');
                    //         $('.productView-price .price-section--withoutTax').hide();
                    //     }
                    // }
                    if (BCData !== undefined && BCData.product_attributes.price.price_range !== undefined) {
                        if (BCData.product_attributes.price.price_range.length !== 0) {
                            var minPrice = BCData.product_attributes.price.price_range.min.without_tax.value;
                            var maxPrice = BCData.product_attributes.price.price_range.max.without_tax.value;
                            var minPriceDiscounted = Math.floor(minPrice / .8);
                            var maxPriceDiscounted = Math.floor(maxPrice / .8);
                            minPrice = '$'+Number(minPrice).toLocaleString('en-US', {minimumFractionDigits: 2});
                            maxPrice = '$'+Number(maxPrice).toLocaleString('en-US', {minimumFractionDigits: 2});
                            minPriceDiscounted = '$'+Number(minPriceDiscounted).toLocaleString('en-US', {minimumFractionDigits: 2});
                            maxPriceDiscounted = '$'+Number(maxPriceDiscounted).toLocaleString('en-US', {minimumFractionDigits: 2});
                            $('.productView-price').append('<span class="pricerangeDiscounted">' + minPriceDiscounted + ' - ' + maxPriceDiscounted +  '</span><span class="pricerange"> ' + minPrice + ' - ' + maxPrice + '</span>');
                            $('.productView-price .price-section--withoutTax').hide();
                        }
                    }
                    $('#cornerswatch').addClass("hideswatch");
                }
            }

            if ($('#shiptime').text() == '0') {
                $('#shiptime').hide();
            }


        });

        // NEW ADDED CONTENT ODD




            // VERTICAL SCROLL

                // duration of scroll animation
                var scrollDuration = 300;
                // paddles
                var upPaddle = document.getElementsByClassName("up-paddle");
                var downPaddle = document.getElementsByClassName("down-paddle");
                // get items dimensions
                var itemsLength = $(".itemRecent").length;
                var itemSize = $(".itemRecent").outerHeight(true);
                // get some relevant size for the paddle triggering point
                var paddleMargin = 20;

                // get wrapper width
                var getMenuWrapperSize = function() {
                	return $(".menu-wrapperRecents").outerHeight();
                };
                var menuWrapperSize = getMenuWrapperSize();
                // the wrapper is responsive
                $(window).on("resize", function() {
                	menuWrapperSize = getMenuWrapperSize();
                });
                // size of the visible part of the menu is equal as the wrapper size
                var menuVisibleSize = menuWrapperSize;

                // get total width of all menu items
                var getMenuSize = function() {
                	return itemsLength * itemSize;
                };
                var menuSize = getMenuSize();
                // get how much of menu is invisible
                var menuInvisibleSize = menuSize - menuWrapperSize;

                // get how much have we scrolled to the left
                var getMenuPosition = function() {
                	return $(".menuRecents").scrollTop();
                };

                if (itemsLength >= 4) {
                  $(downPaddle).removeClass('hidden');
                }

                // finally, what happens when we are actually scrolling the menu
                $(".menuRecents").on("scroll", function() {
                	// get how much of menu is invisible
                	menuInvisibleSize = menuSize - menuWrapperSize;
                	// get how much have we scrolled so far
                	var menuPosition = getMenuPosition();

                	var menuEndOffset = menuInvisibleSize - paddleMargin;

                	// show & hide the paddles
                	// depending on scroll position
                	if (menuPosition <= paddleMargin) {
                		$(upPaddle).addClass("hidden");
                		$(downPaddle).removeClass("hidden");
                	} else if (menuPosition < menuEndOffset) {
                		// show both paddles in the middle
                		$(upPaddle).removeClass("hidden");
                		$(downPaddle).removeClass("hidden");
                	} else if (menuPosition >= menuEndOffset) {
                		$(upPaddle).removeClass("hidden");
                		$(downPaddle).addClass("hidden");
                	}

                	// print important values
                	// $("#print-wrapper-size span").text(menuWrapperSize);
                	// $("#print-menu-size span").text(menuSize);
                	// $("#print-menu-invisible-size span").text(menuInvisibleSize);
                	// $("#print-menu-position span").text(menuPosition);
                });

                // scroll up
                $(downPaddle).on("click", function() {
                	$(".menuRecents").animate({ scrollTop: menuInvisibleSize }, scrollDuration);
                });

                // scroll down
                $(upPaddle).on("click", function() {
                	$(".menuRecents").animate({ scrollTop: "0" }, scrollDuration);
                });

            // END VERTICAL SCROLL

            // HORIZONTAL SCROLL

                // duration of scroll animation
                var scrollDurationThumb = 600;
                // paddles
                var leftPaddle = document.getElementsByClassName('left-paddle');
                var rightPaddle = document.getElementsByClassName('right-paddle');
                // get items dimensions
                var itemsLengthThumb = $('.itemThumb').length;
                var itemSizeThumb = $('.itemThumb').outerWidth(true);
                // get some relevant size for the paddle triggering point
                var paddleMarginThumb = 20;

                // get wrapper width
                var getMenuWrapperSizeThumb = function() {
                  return $('.menu-wrapperThumbs').outerWidth();
                }
                var menuWrapperSizeThumb = getMenuWrapperSizeThumb();
                // the wrapper is responsive
                $(window).on('resize', function() {
                  menuWrapperSizeThumb = getMenuWrapperSizeThumb();
                });
                // size of the visible part of the menu is equal as the wrapper size
                var menuVisibleSizeThumb = menuWrapperSizeThumb;

                // get total width of all menu items
                var getMenuSizeThumb = function() {
                  return itemsLengthThumb * itemSizeThumb;
                };
                var menuSizeThumb = getMenuSizeThumb();
                // get how much of menu is invisible
                var menuInvisibleSizeThumb = menuSizeThumb - menuWrapperSizeThumb;

                // get how much have we scrolled to the left
                var getMenuPositionThumb = function() {
                  return $('.menuThumbs').scrollLeft();
                };

                if (itemsLengthThumb >= 5) {
                  $(rightPaddle).removeClass('hidden');
                }

                // finally, what happens when we are actually scrolling the menu

                var thumbsArrowsVisible = function() {
                  // get how much of menu is invisible
                  menuInvisibleSizeThumb = menuSizeThumb - menuWrapperSizeThumb;
                  // get how much have we scrolled so far
                  var menuPositionThumb = getMenuPositionThumb();

                  var menuEndOffsetThumb = menuInvisibleSizeThumb - paddleMarginThumb;

                  // show & hide the paddles
                  // depending on scroll position
                  if (menuPositionThumb <= paddleMarginThumb) {
                    $(leftPaddle).addClass('hidden');
                    $(rightPaddle).removeClass('hidden');
                  } else if (menuPositionThumb < menuEndOffsetThumb) {
                  // show both paddles in the middle
                    $(leftPaddle).removeClass('hidden');
                    $(rightPaddle).removeClass('hidden');
                  } else if (menuPositionThumb >= menuEndOffsetThumb) {
                    $(leftPaddle).removeClass('hidden');
                    $(rightPaddle).addClass('hidden');
                  }

                  // print important values
                  // $('#print-wrapper-size span').text(menuWrapperSize);
                  // $('#print-menu-size span').text(menuSize);
                  // $('#print-menu-invisible-size span').text(menuInvisibleSize);
                  // $('#print-menu-position span').text(menuPosition);

                };

                $('.menuThumbs').on('scroll', thumbsArrowsVisible);

                // scroll to left
                $(rightPaddle).on('click', function() {
                $('.menuThumbs').animate( { scrollLeft: menuInvisibleSizeThumb}, scrollDurationThumb);
                });

                // scroll to right
                $(leftPaddle).on('click', function() {
                $('.menuThumbs').animate( { scrollLeft: '0' }, scrollDurationThumb);
                });


            // END HORIZONTAL SCROLL


        // END NEW ADDED CONTENT ODD



        if ($('.description-text').length < 1 && $('.features-list').length < 1) {
            $('.details-head').hide();
            $('.shipping-returns-head').addClass('active');
            $('.one.content').removeClass('active');
            $('.mob-head.mb-one').hide();
            $('.mob-head.mb-four').addClass('active');
            $('.four.content').addClass('active');
        }
        // Removed oneicon class , it affects resizing of the image.
        if ($('#defaulttemplate').length > 0) {
            if ($('.productView-info-value.Earth.Friendly').text() == 'YES') {
                $('#icon-earth').show();
            }
            if ($('.productView-info-value.Handmade').text() == 'YES') {
                $('#icon-hand').show();
            }
            // if ($('.productView-info-value.Handmade').text() != 'YES' && $('.productView-info-value.Earth.Friendly').text() != 'YES') {
            //     $('#product-icons').addClass('oneicon');
            // }
        }

        if ($('#psku').text() == 'cr-eco-hold') {
            $('#icon-hand').hide();
            $('#icon-earth').hide();
            $('#icon-usa').hide();
            // $('#product-icons').addClass('oneicon');
        }
        //

        // 042018 Added a Link to Product Detail on the Top
        // moved AnchorDetailandSpecs on top of productView-description
        $('#productLinktoDetails').append(`
        <a href="#stwrapper" style="display:block;font-weight:bold;margin-bottom:10px;margin-top:10px;text-decoration:none;">
            View Product Details and Specifications
            <i class="icon"><svg><use xlink:href="#icon-keyboard-arrow-down"></use></svg></i> </a> &nbsp;&nbsp;
        `);
        //

        var btm_of_atc = $('#atcwrap').offset().top + $('#atcwrap').outerHeight();
        var atc_height = $('#atcwrap').outerHeight();

        $('#atchold').css('height', atc_height);

        var lastScrollTop = 0;
        $(window).scroll(function(event) {
            var scrollPos = $(window).scrollTop();
            var bottom_of_screen = $(window).scrollTop() + window.innerHeight;
            var st = $(this).scrollTop();

            if ($(this).scrollTop() > 500) {
                if (screen.width < 768) {
                    $('#cornerswatch:hidden').fadeIn('fast');
                }
            } else {
                $('#cornerswatch:visible').fadeOut('fast');
            }

        });

        $("#cornerswatch").click(function() {
            $('#cornerswatch').prependTo('body');
            if ($(this).hasClass('zoomed')) {
                $('#zoomoverlay').fadeOut(200);
                $('#zoomoverlay').delay(200).remove();
                $(this).removeClass('zoomed');
                $(this).animate({
                    width: 100
                }, 50, 'swing');
            } else {
                $(this).addClass('zoomed');
                $(this).animate({
                    width: $(window).width() - 20
                }, 200, 'swing');
                $('body').prepend('<div id="zoomoverlay"></div>');
                $('#zoomoverlay').fadeIn(600);
                $('#zoomoverlay').click(function() {
                    $('#zoomoverlay').fadeOut(200);
                    $('#zoomoverlay').delay(200).remove();
                    $('#cornerswatch').removeClass('zoomed');
                    $('#cornerswatch').animate({
                        width: 100
                    }, 50, 'swing');
                });
            }
        });

        $(window).load(function() {
            $('#customdimbox input').val('');
        });
        next();
    }

    after(next) {
        this.productReviewHandler();
        next();
    }

    productReviewHandler() {
        if (this.url.indexOf('#write_review') !== -1) {
            this.$reviewLink.click();
        }
    }
}
