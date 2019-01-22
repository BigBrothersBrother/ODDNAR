__webpack_public_path__ = window.__webpack_public_path__; // eslint-disable-line

import 'babel-polyfill';
import $ from 'jquery';
import Global from './theme/global';
import mmenu from './jquery.mmenu.all.min.js';

const getAccount = () => import('./theme/account');
const getLogin = () => import('./theme/auth');
const pageClasses = {
    account_orderstatus: getAccount,
    account_order: getAccount,
    account_addressbook: getAccount,
    shippingaddressform: getAccount,
    account_new_return: getAccount,
    'add-wishlist': () => import('./theme/wishlist'),
    account_recentitems: getAccount,
    account_downloaditem: getAccount,
    editaccount: getAccount,
    account_inbox: getAccount,
    account_saved_return: getAccount,
    account_returns: getAccount,
    login: getLogin,
    createaccount_thanks: getLogin,
    createaccount: getLogin,
    getnewpassword: getLogin,
    forgotpassword: getLogin,
    blog: () => import('./theme/blog'),
    blog_post: () => import('./theme/blog-post'),
    brand: () => import('./theme/brand'),
    brands: () => import('./theme/brands'),
    cart: () => import('./theme/cart'),
    category: () => import('./theme/category'),
    compare: () => import('./theme/compare'),
    page_contact_form: () => import('./theme/contact-us'),
    error: () => import('./theme/errors'),
    404: () => import('./theme/404-error'),
    giftcertificates: () => import('./theme/gift-certificate'),
    giftcertificates_balance: () => import('./theme/gift-certificate'),
    giftcertificates_redeem: () => import('./theme/gift-certificate'),
    default: () => import('./theme/home'),
    page: () => import('./theme/page'),
    product: () => import('./theme/product'),
    amp_product_options: () => import('./theme/product'),
    search: () => import('./theme/search'),
    rss: () => import('./theme/rss'),
    sitemap: () => import('./theme/sitemap'),
    newsletter_subscribe: () => import('./theme/subscribe'),
    wishlist: () => import('./theme/wishlist'),
    wishlists: () => import('./theme/wishlist'),
};



// Close Banner
$('.close-banner').on('click', () => {
    $('#ctb').css('display', 'none');
    $('#blackout').css('display', 'none');
});

$('.navUser-item--connect').on('click', () => {
    $('.navUser-item--connect').toggleClass('dd-vis');
});

$('.navUser-item--account').on('click', () => {
    $('.navUser-item--account').toggleClass('dd-vis');
});

$('.navPages-list > li > a.navPages-action').click( function() {
    if ($(window).width() > 979) {
        document.location.href = $(this).attr('href');
    }
});

$('#con-toggle').click( function(){
    $(this).addClass('active');
    $('.con-dd').slideToggle();
    $('.con-dd').addClass('active');
});

$(document).click(function() {
    $('#con-toggle.active').removeClass('active');
    $('.con-dd.active').hide();
    $('.con-dd.active').removeClass('active');
});

$(".con-dd").click(function(e) {
    e.stopPropagation();
});
$("#con-toggle").click(function(e) {
    e.stopPropagation();
});

var lastScrollTop = 0;
$(window).scroll(function(event){
   var st = $(this).scrollTop();
   if ($(this).scrollTop()>40) {
       $('body').removeClass('topofscroll');
       if (st > lastScrollTop){
           $('body').addClass('mobscroll');
           $('body').removeClass('header-show');

       } else {
          // upscroll code
          $('.header').addClass('showscroll');
          $('body').addClass('header-show');
          $('body').removeClass('mobscroll');
       }
     lastScrollTop = st;
   } else {
        $('.header').removeClass('showscroll');
        $('body').removeClass('header-show');
        $('body').removeClass('mobscroll');
        $('body').addClass('topofscroll');
     }
});

$(document).mouseup((e) => {
    const container = $('#ctb');
    const container2 = $('.navUser-item--connect');
    const container3 = $('.navUser-item--account');
    const container4 = $('#blackout');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.hide();
        container4.hide();
    }
    if (!container2.is(e.target) && container2.has(e.target).length === 0) {
        container2.removeClass('dd-vis');
    }
    if (!container3.is(e.target) && container3.has(e.target).length === 0) {
        container3.removeClass('dd-vis');
    }
});

// Dynamic margin-bottom on mobile sub-banner
const resize = () => {
    if ($(window).width() < 768) {
        $('.sub-banner-text-wrapper').each(function () {
            const textHeight = $(this).height();
            const responiveMargin = (textHeight - 62) + 25;
            $(this).closest('.sub-banner').css('margin-bottom', responiveMargin);
        });
    }
};
$(window).on('resize', resize);

const tabFunct = () => {
    $('.tab-wrapper .mobile-accordion').on('click', function () {
        if ($(window).width() < 768) {
            if ($(this).is('.active')) {
                $(this).removeClass('active');
                $(this).next('.tab-content').removeClass('is-active');
            } else {
                $('.tab-wrapper .mobile-accordion.active').removeClass('active');
                $(this).addClass('active');
                $('div.tabs-contents .tab-wrapper .tab-content.is-active').removeClass('is-active');
                $(this).next('.tab-content').addClass('is-active');
            }
        }
    });
};
tabFunct();

$(document).ready(() => {

  $('#simplenav').mmenu({
    "extensions": [
        "pagedim-black"
    ]
  });

  var API = $("#simplenav").data( "mmenu" );

  $(".mobileMenu-toggle").click(function() {
     API.open();
  });

  if( $('.facetLabel').length < 1  && $(window).width() < 768) {
  	$('#fselected').hide();
  }
  if($('.pagination-list li').length < 1) {
    $('.pagination-list').hide();
  }

    $('#search_toggle').on('click', function () {

         $('#searchbox').slideToggle();
         $('body').toggleClass('showsearch');
    });

    $('#mm-1 .mm-navbar').prepend('<div id="closemenu"></div>');
    $('#closemenu').click( function() {
        API.close();
    });
});

// Randomize Testimonials
var whichToShow = Math.floor(Math.random() * $('.quote-wrap').length);
$('.quote-wrap').hide().eq(whichToShow).fadeIn(1000);

/**
 * This function gets added to the global window and then called
 * on page load with the current template loaded and JS Context passed in
 * @param pageType String
 * @param contextJSON
 * @returns {*}
 */
window.stencilBootstrap = function stencilBootstrap(pageType, contextJSON = null, loadGlobal = true) {
    const context = JSON.parse(contextJSON || '{}');

    return {
        load() {
            $(async () => {
                let globalClass;
                let pageClass;
                let PageClass;

                // Finds the appropriate class from the pageType.
                const pageClassImporter = pageClasses[pageType];
                if (typeof pageClassImporter === 'function') {
                    PageClass = (await pageClassImporter()).default;
                }

                if (loadGlobal) {
                    globalClass = new Global();
                    globalClass.context = context;
                }

                if (PageClass) {
                    pageClass = new PageClass(context);
                    pageClass.context = context;
                }

                if (globalClass) {
                    globalClass.load();
                }

                if (pageClass) {
                    pageClass.load();
                }
            });
        },
    };
};
