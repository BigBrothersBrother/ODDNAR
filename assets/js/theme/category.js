import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import $ from 'jquery';
import FacetedSearch from './common/faceted-search';






function checkswipe(x, index) {
    let touchstartX = 0;
    let touchstartY = 0;
    let touchendX = 0;
    let touchendY = 0;

    const gestureZone = x;

    gestureZone.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
        touchstartY = event.changedTouches[0].screenY;
    }, false);

    gestureZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        touchendY = event.changedTouches[0].screenY;
        handleGesture();
    }, false); 

    function handleGesture() {
        if (touchendX <= touchstartX - 30 || touchendX >= touchstartX + 30) {
            console.log('Swiped' +index );
            console.log(touchstartX + ' ' + touchendX );
            $(x).toggleClass('swap');
        }        
    }    
}

$('li.product').each( function(index) {
    checkswipe(this, index);
});

        function formatActiveSort(){
            $("#sort-box > li.active-sort").removeClass("active-sort");
            var current = $("#product-listing-container #sort").find("option[selected]").data("sort");
            console.log("current = " + current);
            $("#sort-box").find("li[data-sort='" + current + "']").addClass("active-sort");
        }

        function saleflags() {
          $.each($('.card'), function(){
              if($('.nonsale-p').length) {
                let salePText = Number($(this).find(".sale-p").text());
                let nonsalePText = Number($(this).find(".nonsale-p").text());
                let exactPercent = 100 -((salePText / nonsalePText) * 100);
                let roundPercent = Math.round(exactPercent);
                $(this).find(".percent-flag").text(`${roundPercent}% OFF`);
                console.log('test');
              }
          });
        }

        function handleSaleItemsListPage(){

                $(".product").each(function(){
                    if( $(this).find(".price.price--rrp").length ){
                        var retailPrice = $(this).find(".price.price--rrp").text().trim().replace("$","");
                        var salePrice = $(this).find(".price.price--withoutTax").text().trim().replace("$","");
                        var percOff = (retailPrice - salePrice) / retailPrice * 100;
                        console.log(percOff);
                        if(percOff > '10'){
                            $(this).find(".percent-flag").html("<span class='calc-perc-off'>You Save " + Math.round(percOff) + "%</span>");
                        } else {
                            $(this).find(".price.price--rrp.retail-price").hide();
                        }
                    }
                    if( $(this).find('.gridsku:contains("bcs")').length > 0) {
                        $(this).find('.price.price--withoutTax').text('$17.00 - $25.00');
                    }
                });
            }
            
        function hidePage() {
            if ($('.pagination-list li').length < 1) {
                $('.pagination').hide();
            } else {
                $('.pagination').show();
            }
        }
export default class Category extends CatalogPage {

    before(next) {

        next();
    }

    loaded(next) {


        $('.bottom-description-text').appendTo('.cat-desc-wrapper');
        var descHeadHeight = $('.cat-desc-wrapper h2').height();
        var descParaHeight = $('.cat-desc-wrapper').find('p:first-of-type').height();
        var descHeight = descHeadHeight + descParaHeight + 55;
        if ($(window).width() < 768) {
          $('.cat-desc-wrapper').css('max-height', descHeight);
          $('.cat-desc-wrapper').after('<div id="cat-showmore">Read More</div>');
        }
        $('#cat-showmore').click( function() {
          $('.cat-desc-wrapper').css('max-height', 'none');
          $('#cat-showmore').remove();
        });

        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }
        handleSaleItemsListPage();

        if ($('.pagination-list li').length < 1) {
            $('.pagination').hide();
        }
        formatActiveSort();
        
        next();
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container');
        const $facetedSearchContainer = $('#faceted-search-container');
        const productsPerPage = this.context.categoryProductsPerPage;
        const requestOptions = {
            config: {
                category: {
                    shop_by_price: true,
                    products: {
                        limit: productsPerPage,
                    },
                },
            },
            template: {
                productListing: 'category/product-listing',
                sidebar: 'category/sidebar',
            },
            showMore: 'category/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $productListingContainer.html(content.productListing);
            $facetedSearchContainer.html(content.sidebar);

            $('html, body').animate({
                scrollTop: 0,
            }, 100);

            handleSaleItemsListPage();
            formatActiveSort();
            $('#resultnum').html($('#resultnum2').text());
        });

        $('#filtertoggle').on('click', function () {
            $('#sort-box').removeClass('is-open');
            $('#sorttoggle').removeClass('is-open');
            $('#filtertoggle').toggleClass('is-open');
            $('#facetedSearch').toggleClass('is-open');
          });

          $('#sorttoggle').on('click', function () {
            $('#filtertoggle').removeClass('is-open');
            $('#facetedSearch').removeClass('is-open');
            $('#sort-box').toggleClass('is-open');
            $('#sorttoggle').toggleClass('is-open');
        });

        $('#mlayoutswap').click( function() {
            $(this).toggleClass('square');
            $('body').toggleClass('square');
        });

        hidePage();

    }
}
