import $ from 'jquery';
import utils from '@bigcommerce/stencil-utils';
import 'foundation-sites/js/foundation/foundation';
import 'foundation-sites/js/foundation/foundation.reveal';
import ImageGallery from '../product/image-gallery';
import modalFactory from '../global/modal';
import _ from 'lodash';
import swal from 'sweetalert2';
import SimpleBar from '../../../js/simplebar.js';
var CDORIGINALHOST = '';
function var_dump(msg){console.log('CDx: ' + msg);}

function callProductCatalogApi(type, productId)
{
    if ($('#catalogApiUrl').length > 0) {
        return $('#catalogApiUrl').val() + 'type=' + type + '&product_id=' + productId;
    }
    return null;
}

function jsongenerate() {
    var data = {
        "@context": "http://www.schema.org",
        "@type": "product",
        "brand": "Natural Area Rugs",
        "name": "Alma Custom Sisal Rugs",
        "image": "imgurl",
        "description": "descript",
        "aggregateRating": {
            "@type": "aggregateRating",
            "ratingValue": "rating",
            "reviewCount": "ratingnumber"
        }
    };

    var script = document.createElement('script');
    script.type = "application/ld+json";
    script.innerHTML = JSON.stringify(data);
    document.getElementsByTagName('head')[0].appendChild(script);
}

function createGallery() {
    var_dump('createGallery');
    if ($(window).width() < 481) {
        $('#mainpics').remove();
        $('.productView-images').prepend('<div id="mainpics"></div>');

        $('.productView-thumbnail-link img:visible').each(function(index) {
            if ($('.productView.custom').length > 0) {
                var productimg = $(this).attr('src');
            } else {
                var productimg = $(this).parent('a').data('image-gallery-zoom-image-url');
            }
            if (productimg != '') {
                $('#mainpics').append('<div class="productView-mainpic"><img src="' + productimg + '" class="slickthumb-' + index + '" /></div>');
            }
        });

        $('#mainpics').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            infinite: true,
            responsive: [{
                    breakpoint: 767,
                    settings: {
                        dots: true
                    }
                }

            ]
        });
    } else {
        return false;
    }
}
if ($('.productView.custom').length > 0) {
    window.setInterval(function() {
        /// call your function here
        $('.productView-thumbnail-link img:hidden').each(function(index) {
            $('#mainpics').slick('slickRemove', $(this).parent('a').parent('li').index());
        });
    }, 500);
}
$('body').append('<div id="singleprice">'+$('.productView-price .price--withoutTax').text()+'</div>');


function qtyprice() {
    var_dump('Function: qtyprice');
    if ( $('#customdec').length > 0) {
        var qty = $('.form-input--incrementTotal').val();

        if ($('.customproduct.ctread').length > 0) {
            if (qty < 3) {
                qty = 3;
            }
        }

        if (qty > 0) {

            if ($('#customdec').attr('data-cprice')) {
                var gtotal = $('#customdec').data('cprice');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                $('#customdec').html(newtotal);
            } else {

                $('#customdec').attr('data-cprice', $('#customdec').text())
                var gtotal = $('#customdec').data('cprice');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                $('#customdec').html(newtotal);
            }
        }
    } else {
        var qty = $('.form-input--incrementTotal').val();
        if ($('.customproduct.ctread').length > 0) {
            if (qty < 3) {
                qty = 3;
            }
        }
        if (qty > 0) {
                var gtotal = $('#singleprice').text();
                gtotal = gtotal.replace(',', '');
                gtotal = gtotal.replace('$', '');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                var_dump('Updating Price LINE 121');
                $('.productView-price .price--withoutTax').html('$'+newtotal);
                if ($('.price-section.price-section--withoutTax').length > 0) {
                    if ($('.form-field.Color').length > 0) {
                        if ($('.form-field.Color').find('.form-radio.swatchinput').val() !== '') {
                            $('.price-section.price-section--withoutTax').show();
                            $('.pricerange').hide();
                            $('.pricerangeDiscounted').hide();
                        }
                    } else {
                        $('.price-section.price-section--withoutTax').show();
                        $('.pricerange').hide();
                        $('.pricerangeDiscounted').hide();
                    }
                }
        }
    }
}

$('.form-increment button').click(function() {
    if ( $('#customdec').length > 0) {
            if ( $(this).data('action') == 'dec') {
            var qty = +($('.form-input--incrementTotal').val()) - 1;
        }
        if ( $(this).data('action') == 'inc') {
            var qty = +($('.form-input--incrementTotal').val()) + 1;
        }

         var qty = $('.form-input--incrementTotal').val();

        if ($('.customproduct.ctread').length > 0) {
            if (qty < 3) {
                qty = 3;
            }
        }

        if (qty > 0) {

            if ($('#customdec').attr('data-cprice')) {
                var gtotal = $('#customdec').data('cprice');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                $('#customdec').html(newtotal);
            } else {

                $('#customdec').attr('data-oprice', $('#customdec').text())
                var gtotal = $('#customdec').data('cprice');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                $('#customdec').html(newtotal);
            }
        }
    } else {
        if ( $(this).data('action') == 'dec') {
            var qty = +($('.form-input--incrementTotal').val()) - 1;
        }
        if ( $(this).data('action') == 'inc') {
            var qty = +($('.form-input--incrementTotal').val()) + 1;
        }
        if ($('.customproduct.ctread').length > 0) {
            if (qty < 3) {
                qty = 3;
            }
        }
        if (qty > 0) {
                var gtotal = $('#singleprice').text();
                gtotal = gtotal.replace(',', '');
                gtotal = gtotal.replace('$', '');
                var newtotal = parseFloat(gtotal * qty).toFixed(2);
                newtotal = newtotal.toLocaleString('us');
                var_dump('Updating Price LINE 178');
                $('.productView-price .price--withoutTax').html('$'+newtotal);
        }
    }
});

$('.form-input--incrementTotal').change( function() {
   qtyprice();
});

$(window).on('resize', function() {
    var_dump('CDx: on - resize');
    $('.productView-images').css('min-height', '0px');
    $('.productView-images').css('min-height', $('.productView-images').height());
    createGallery();
});

$('.form-select').change( function() {
    var thisvalue = $(this).find("option:selected").text();
    var v = $(this).find("option:selected").val();
    $(this).prev().children('.currentselect').remove();
    if (thisvalue !== undefined
        && thisvalue !== ''
        && thisvalue !== 'Select Size'
        && thisvalue !== null) {
        $(this).prev().append('<span class="currentselect"> - '+ thisvalue +'</span>');
    }
    if(thisvalue === 'Select Size') {
        $('.productView-price .pricerange').show();
        $('.productView-price .pricerangeDiscounted').show();
        $('.productView-price .price .price--withoutTax').hide();
    }
});

function resetswatches() {
    var_dump('function createGallery');
    var csku = $('#customrugbox').data('sku');
    var_dump(csku);
    var swatchcolor = 'black';
    var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-lapped-alt1-large.jpg';
    var swatcheimgs = [];
    var i = 0;
    for (i = 0; i < 6; i++) {
        swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-lapped-alt' + i + '-large.jpg';
        $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
        $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
        $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
    }
    $('#swatchbimg').attr('src', swatchimg);
    $(".productView-thumbnail").first().children('a').trigger("click");
    $('.productView-thumbnail').show();
    $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
    createGallery();
}

function cpricechange() {
    var_dump('function cpricechange');
    $('.selectprox.Standard').show();
    if ($('#customdimbox').length > 0) {

        if ($('#inchesl').val() > 11) {
            var inches = $('#inchesl').val();
            var feet = Math.floor($('#inchesl').val() / 12);
            inches = inches - (feet * 12);
            $('#inchesl').val(inches);
            $('#feetl').val(feet);
        }
        if ($('#inchesw').val() > 11) {
            var inches = $('#inchesw').val();
            var feet = Math.floor($('#inchesw').val() / 12);
            inches = inches - (feet * 12);
            $('#inchesw').val(inches);
            $('#feetw').val(feet);
        }
        var setLength = ($('#feetl').val() * 12) + $('#inchesl').val();
        var setWidth = ($('#feetw').val() * 12) + $('#inchesw').val();
        var sqPrice = $('.productView-info-value.Square.Foot.Price').text();
        var bindingCost = 0;
        var shippingCost = 0;
        var customTotal = 0;
        var customLength = 0;
        var customWidth = 0;
        $(".form-field.Corner select option:nth-child(2)").prop('disabled', false);
        $(".form-field.Corner select option:nth-child(2)").show();

        if ($('#feetw').val() == 13 && $('#inchesw').val() > 0) {
            $('#inchesw').val(0);
            alert("Please input dimensions with a Maximum width 13' and Maximum length 98'");
        };
        if ($('#feetl').val() == 98 && $('#inchesl').val() > 0) {
            $('#inchesl').val(0);
            alert("Please input dimensions with a Maximum width 13' and Maximum length 98'");
        };

        sqPrice = parseFloat(sqPrice).toFixed(2);

        var feetl = parseInt($('#feetl').val(), 10);
        var feetw = parseInt($('#feetw').val(), 10);
        var inchesl = parseInt($('#inchesl').val(), 10);
        var inchesw = parseInt($('#inchesw').val(), 10);
        var finalprice = 0;

        if (feetl !== feetl) {
            feetl = 0;
        }
        if (feetw !== feetw) {
            feetw = 0;
        }
        if (inchesl !== inchesl) {
            inchesl = 0;
        }
        if (inchesw !== inchesw) {
            inchesw = 0;
        }
        $('.Length').val("L " + feetl + "' " + inchesl + "''");
        $('.Width').val("W " + feetw + "' " + inchesw + "''");
        customLength = (feetl + (inchesl / 12));
        customWidth = (feetw + (inchesw / 12));
        var area = customLength * customWidth;
        var totald = customLength + customWidth;
        if (area > 80 && area <= 108) {
            finalprice += 150.0;
        }
        if (area > 109 && area <= 180) {
            finalprice += 290.0;
        }
        if (area > 181 && area <= 350) {
            finalprice += 350.0;
        }

        if (area > 350) {
            finalprice += 750.0;
        }

        var selectedshape = $(".Shape select option:selected").text().replace(' ', '');
        var selectedbinding = $(".Binding select option:selected").text().replace(' ', '');

        if (selectedbinding === 'Wide Canvas/Cotton (1 1/4")') {
            if (area <= 20) {
                bindingCost = 2.00;
            }
            if (area > 20) {
                bindingCost = 4.50;
            }
            $('.swatchselect').show();
            $('.swatchselect').removeClass('swatchhide');
            $(".swatchselect[data-swatch='Navy']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Natural']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Brown']").addClass('swatchhide');
            $('.form-field.Corner').show();
            if ($('.Natural.selected').length > 0) {
                $('.Natural').removeClass('selected')
                $('.Natural').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Brown.selected').length > 0) {
                $('.Brown').removeClass('selected')
                $('.Brown').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Navy.selected').length > 0) {
                $('.Navy').removeClass('selected')
                $('.Navy').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
        }

        if (selectedbinding === 'Extra Wide Canvas (2 1/4")') {
            if (area <= 20) {
                bindingCost = 3.00;
            }
            if (area > 20) {
                bindingCost = 5.50;
            }
            $('.swatchselect').show();
            $(".swatchselect[data-swatch='Green']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Sand']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Green']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Moss']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Wheat']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Squirrel']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Doe']").addClass('swatchhide');
            $('.form-field.Corner').show();

            if ($('.Green.selected').length > 0) {
                $('.Green').removeClass('selected')
                $('.Green').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Sand.selected').length > 0) {
                $('.Sand').removeClass('selected')
                $('.Sand').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Moss.selected').length > 0) {
                $('.Moss').removeClass('selected')
                $('.Moss').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Wheat.selected').length > 0) {
                $('.Wheat').removeClass('selected')
                $('.Wheat').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Squirrel.selected').length > 0) {
                $('.Squirrel').removeClass('selected')
                $('.Squirrel').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Doe.selected').length > 0) {
                $('.Doe').removeClass('selected')
                $('.Doe').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
        }

        if (selectedbinding === 'Blind Stitch Canvas (2")') {
            if (area <= 20) {
                bindingCost = 10.50;
            }
            if (area > 20) {
                bindingCost = 21.50;
            }
            $('.swatchselect').show();
            $(".swatchselect[data-swatch='Green']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Sand']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Natural']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Brown']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Moss']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Wheat']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Squirrel ']").addClass('swatchhide');
            $(".swatchselect[data-swatch='Doe']").addClass('swatchhide');
            $(".form-field.Corner select").val($(".form-field.Corner select option:nth-child(2)").val());

            $('.selectprox.Mitered').addClass('selected');
            $('.selectprox.Standard').removeClass('selected').hide();

            if ($('.Green.selected').length > 0) {
                $('.Green').removeClass('selected')
                $('.Green').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Sand.selected').length > 0) {
                $('.Sand').removeClass('selected')
                $('.Sand').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Natural.selected').length > 0) {
                $('.Natural').removeClass('selected')
                $('.Natural').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
            if ($('.Brown.selected').length > 0) {
                $('.Brown').removeClass('selected')
                $('.Brown').attr('checked', false);
                $('#swatchname').remove();
                resetswatches();
            }
        }

        if (selectedshape === "Round" || selectedshape === "Oval" || selectedshape === "Octagon") {
            if ((totald) / 2 >= 8) {
                finalprice += 150.0;
            } else if ((totald) / 2 >= 6) {
                finalprice += 110.0;
            } else {
                finalprice += 75.0;
            }

            if (selectedshape === "Round" || selectedshape === "Oval") {
                $(".form-field.Corner select").val($(".form-field.Corner select option:first").val());

                $('.Corner .selectprox').removeClass('selected');
                $('.selectprox.Standard').addClass('selected');

                $(".form-field.Corner select option:nth-child(2)").prop('disabled', true);
                $(".form-field.Corner select option:nth-child(2)").hide();
                $('.form-field.Corner').hide();
                $('.selectprox.Blind.Stitch').hide();
                if (selectedbinding === 'Extra Wide Canvas (2 1/4")') {
                    $('.Binding .selected').removeClass('selected');
                    $('.selectprox.Wide:nth-child(2)').addClass('selected');
                    $(".form-field.Binding select").val($(".form-field.Binding select option:nth-child(2)").val());
                } else {
                    $('.Binding .selected').removeClass('selected');
                    $('.selectprox.Wide:nth-child(1)').addClass('selected');
                    $(".form-field.Binding select").val($(".form-field.Binding select option:first").val());
                }
            } else {
                $('.form-field.Corner').show();
                $('.selectprox.Blind.Stitch').show();
            }
        } else {
            $('.selectprox.Blind.Stitch').show();
        }
        var areaprice = area * sqPrice;
        customTotal = (((+customLength * +customWidth) * +sqPrice) + (+totald * +bindingCost * 2)) + +shippingCost + +finalprice;
        var formatctotal = parseFloat(customTotal).toFixed(2);
        if (area >= 2) {
            $('#customPrice').html('$<span id="customdec" data-cprice="'+formatctotal+'">' + formatctotal + '</span>');
            $('.productView-price').hide();
            $('#customrugbox').data('price', parseFloat(customTotal).toFixed(2));
        } else {
            $('#customPrice').html('Build rug for price');
        }
    } else {
        $('#customPrice').html('Build rug for price');
    }
    qtyprice();

}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function productParams() {
    var_dump('function productParams');
    var curl = document.location.href;
    var pcolor = getParameterByName('color');
    var psize = getParameterByName('size');
    var colorsku = '';

    if (pcolor == 'black') {
        colorsku = 'a'
    }
    if (pcolor == 'brown') {
        colorsku = 'b'
    }
    if (pcolor == 'fossil') {
        colorsku = 'c'
    }
    if (pcolor == 'fudge') {
        colorsku = 'd'
    }
    if (pcolor == 'green') {
        colorsku = 'e'
    }
    if (pcolor == 'khaki') {
        colorsku = 'f'
    }
    if (pcolor == 'malt') {
        colorsku = 'g'
    }
    if (pcolor == 'marine') {
        colorsku = 'h'
    }
    if (pcolor == 'metal') {
        colorsku = 'i'
    }
    if (pcolor == 'midnight_blue') {
        colorsku = 'j';
        pcolor = 'Midnight Blue'
    }
    if (pcolor == 'moss') {
        colorsku = 'k'
    }
    if (pcolor == 'natural') {
        colorsku = 'l'
    }
    if (pcolor == 'onyx') {
        colorsku = 'm'
    }
    if (pcolor == 'red') {
        colorsku = 'n'
    }
    if (pcolor == 'sage') {
        colorsku = 'o'
    }
    if (pcolor == 'sand') {
        colorsku = p
    }
    if (pcolor == 'sienna') {
        colorsku = 'q'
    }
    if (pcolor == 'stone') {
        colorsku = 'r'
    }
    if (pcolor == 'tan') {
        colorsku = 's'
    }

    if (pcolor && psize) {
        if ($('#customdimbox').length > 0) {

            if ($('#inchesw').val() > 11) {
                $('#inchesw').val(11);
            };
            if ($('#inchesl').val() > 11) {
                $('#inchesl').val(11);
            };

            $('.form-option-swatch[data-swatch*="' + pcolor + '"').trigger('click');
            pcolor = pcolor.charAt(0).toUpperCase() + pcolor.slice(1);
            $('.form-option-swatch[data-swatch*="' + pcolor + '"').trigger('click');
            psize = psize.replace(/_/g, '');
            psize = psize.split('x');
            var basesku = $('#psku').text();

            if (psize[0].indexOf('"') < 1) {
                var cwidth = psize[0].split("'");
                var clength = psize[1].split("'");
                $('#feetw').val(cwidth[0]);
                $('#inchesw').val(0);
                if (cwidth[0] < 10) {
                    basesku = basesku + '0' + cwidth[0] + '0x' + clength[0];
                } else {
                    basesku = basesku + cwidth[0] + '0x' + clength[0];
                }
            } else {
                var cwidth = psize[0].split("'");
                var clength = psize[1].split("'");
                $('#feetw').val(cwidth[0]);
                $('#inchesw').val(cwidth[1].replace('"', ''));
                if (cwidth[0] < 10) {
                    basesku = basesku + '0' + cwidth[0] + cwidth[1].replace('"', '') + 'x' + clength[0];
                } else {
                    basesku = basesku + cwidth[0] + cwidth[1].replace('"', '') + 'x' + clength[0];
                }
            }

            $('#feetl').val(clength[0]);
            $('#inchesl').val(0);


            cpricechange();
            $('#psku').text(basesku + colorsku);


        } else {
            psize = psize.replace(/_/g, ' ');
            $('.form-option-swatch[data-swatch*="' + pcolor + '"').trigger('click');
            pcolor = pcolor.charAt(0).toUpperCase() + pcolor.slice(1);
            $('.form-option-swatch[data-swatch*="' + pcolor + '"').trigger('click');

            var sel = ".form-option[data-text*='" + psize.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1') + "']";
            $(sel).trigger('click');
        }
    } else if (psize) {
        psize = psize.replace(/_/g, ' ');
        var sel = ".form-option[data-text*='" + psize.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g, '\\$1') + "']";
        $(sel).trigger('click');
    }
    $('.Shape .prescroll .selectprox').first().trigger('click');
}

//return an array of objects according to key, value, or key and value matching
function getObjects(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
            //if key matches and value matches or if key matches and value is not passed (eliminating the case where key matches but passed value does not)
            if (i == key && obj[i] == val || i == key && val == '') { //
                objects.push(obj);
            } else if (obj[i] == val && key == '') {
            //only add if the object is not already in the array
            if (objects.lastIndexOf(obj) == -1) {
                objects.push(obj);
            }
        }
    }
    return objects;
}

//return an array of values that match on a certain key
function getValues(obj, key) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getValues(obj[i], key));
        } else if (i == key) {
            objects.push(obj[i]);
        }
    }
    return objects;
}

//return an array of keys that match on a certain value
function getKeys(obj, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getKeys(obj[i], val));
        } else if (obj[i] == val) {
            objects.push(i);
        }
    }
    return objects;
}


export default class ProductDetails {
    constructor($scope, context, productAttributesData = {}) {
        this.$overlay = $('[data-cart-item-add] .loadingOverlay');
        this.$scope = $scope;
        this.context = context;
        this.imageGallery = new ImageGallery($('[data-image-gallery]', this.$scope));
        this.imageGallery.init();
        this.listenQuantityChange();
        this.initRadioAttributes();

        const $form = $('form[data-cart-item-add]', $scope);
        const $productOptionsElement = $('[data-product-option-change]', $form);
        const hasOptions = $productOptionsElement.html().trim().length;

        $(document).ready(function() {
            // bcs- custom stair traids rug; bcm - custom-rug
            var_dump('ProductDetails onLoad');
            var basesku = $('#productsku').text();
            if ($('#customrugbox').length > 0) {
                basesku = $('#customrugbox').data('sku');
            }
            var_dump('BaseSKU: ' + basesku);
            if (basesku.indexOf("cr-") > -1) {
                $('#icon-usa').show();
            }
            if ($('#psku').text() == 'cr-eco-hold') {
                $('#cminmax').text("Maximum width 12'. Maximum length 150'.");
            }
            $('.form-select').each( function() {
                var thisvalue = $(this).find("option:first").text();
                var v = $(this).find("option:selected").val();
                if (v !== '' && v !== undefined) {
                    $(this).prev().append('<span class="currentselect"> - '+ thisvalue +'</span>');
                }
            });
            if (basesku !== null && basesku !== undefined && basesku.indexOf("cr-") === -1 && basesku.indexOf("bcm-") === -1) {
                var_dump('Adding Sizes Prices on DropDown');
                var_dump('PricePerAttributeID CustomField');
                if (productAttributesData.in_stock_attributes !== undefined ) {
                    var productId = $('[name="product_id"]', $form).val();
                    var catalogsUrl = callProductCatalogApi('product-options-prices',productId);
                    if (catalogsUrl !== null) {
                        $.ajax({
                            dataType: "json",
                            url: catalogsUrl,
                            success: function(catalogs){
                                if (catalogs !== undefined) {
                                    $.each(catalogs, function (i, catalog) {
                                        if (catalog.option_size_id !== undefined) {
                                            var optionId = catalog.option_size_id;
                                            var optionPrice = catalog.price;
                                            var optionEle = $('[data-product-attribute-value="'+optionId+'"]');
                                            if (optionEle.length > 0) {
                                                optionEle.text(optionEle.text() + ' - $' + optionPrice);
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            }
            createGallery();
        });

        $productOptionsElement.change(event => {
            this.productOptionsChanged(event);
        });

        $form.submit(event => {
            this.addProductToCart(event, $form[0]);
        });

        // Update product attributes. If we're in quick view and the product has options,
        // then also update the initial view in case items are oos
        if (_.isEmpty(productAttributesData) && hasOptions) {
            const $productId = $('[name="product_id"]', $form).val();

            utils.api.productAttributes.optionChange($productId, $form.serialize(), (err, response) => {
                const attributesData = response.data || {};

                this.updateProductAttributes(attributesData);
                this.updateView(attributesData);
            });
        } else {
            this.updateProductAttributes(productAttributesData);
        }

        $productOptionsElement.show();

        this.previewModal = modalFactory('#previewModal')[0];

        $('#customdimbox input').bind('keyup mouseup', function() {
            var_dump('#customdimbox input on keyup mouseup');
            cpricechange();
        });

        $('#customdimbox select').change( function() {
            var_dump('#customdimbox select');
            cpricechange();
        });

        $('.form-select').change( function() {
            var_dump('.form-select on change');
            cpricechange();
        });

        $('#stairtread .Binding select').change(function() {
            var_dump('#stairtread .Binding select on change');
            var selectedbinding = $(".Binding select option:selected").text();
            if (selectedbinding === 'Wide Cotton') {
                $('.swatchselect').show();
                $(".swatchselect[data-swatch='Champagne']").hide();
                $(".swatchselect[data-swatch='Chocolate']").hide();
            }
            if (selectedbinding === 'Serged Cotton') {
                $('.swatchselect').hide();
                $(".swatchselect[data-swatch='Black']").show();
                $(".swatchselect[data-swatch='Champagne']").show();
                $(".swatchselect[data-swatch='Chocolate']").show();
            }
        });

        if ($('.customproduct.walltowall').length > 0) {
            var_dump('.customproduct.walltowall is present');
            var csku = $('#customrugbox').data('sku');
            var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-alt1-large.jpg';
            var swatcheimgs = [];
            var i = 0;
            $('.productView-thumbnail').show();
            $('.productView-thumbnail img').show();
            for (i = 0; i < 6; i++) {
                swatcheimgs[i] = 'https://www.naturalarearugs.com/product_images/import/' + csku + '-alt' + i + '-large.jpg';
                $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
            }
            $('#swatchbimg').attr('src', swatchimg);
            $('.productView-thumbnail:first-child a').trigger('click');
            createGallery();
        }

        if ($('.form-field.Color').length > 0) {
            var_dump('.form-field.Color is present');
            $('.productView-thumbnail').hide();
            $("button.slick-arrow").remove();
            $('.swatchselect').click(function() {
                var_dump('.swatchselect on click');
                $('.swatchselect').removeClass('selected');
                $(this).addClass('selected');
                $('.productView-images').css('min-height', $('.productView-images').height());
                var swatchcolor = $(this).data('swatch');
                swatchcolor = swatchcolor.replace(/[^a-zA-Z ]/g, "");
                var labelID = $(this).attr('for');
                $('#' + labelID).trigger('click');


                if ($('#customdimbox').length > 0) {
                    var_dump('#customdimbox is present');
                    $('.productView-thumbnail img').show();
                    var swatchcolor = '';
                    swatchcolor = $(this).data('swatch').toLowerCase();
                    swatchcolor = swatchcolor.replace(" ", "-");
                    if ($('#swatchname').length > 0) {
                        $('#swatchname').html(' - ' + swatchcolor + '');
                    } else {
                        $(".Color > .form-label.form-label--alternate.form-label--inlineSmall").append('<span id="swatchname"> - ' + swatchcolor + '</span>');
                    }
                    if ($('.swatchtest').length > 0) {
                        var_dump('#customdimbox is clicked; .swatchtest is present;');
                        var shape = 'rectangle';
                        var binding = 'wide';
                        var corner = 'lapped';
                        var shapex = $('.Shape .form-select option:selected').text();
                        var bindingx = $('.Binding .form-select option:selected').text();
                        var cornerx = $('.Corner .form-select option:selected').text();
                        var_dump('Shapex: ' + shapex + ' Bindingx:' + bindingx +' Cornerx: ' +cornerx);

                        if (shapex == ' Rectangle or Square') {
                            shape = 'rectangle';
                        } else if (shapex == ' Oval') {
                            shape = 'oval';
                        } else if (shapex == ' Round') {
                            shape = 'round';
                        } else if (shapex == ' Octagon') {
                            shape = 'octagon';
                        }

                        // if (bindingx == ' Wide Canvas/Cotton (1 1/4")') {
                        //     binding = 'wide';
                        // } else if (bindingx == ' Extra Wide Canvas (2 1/4")') {
                        //     binding = 'extrawide';
                        // } else if (bindingx == ' Blind Stitch Canvas (2")') {
                        //     binding = 'blind';
                        // }

                        if (cornerx == ' Standard / Lapped') {
                            corner = 'lapped';
                        } else if (cornerx == ' Mitered') {
                            corner = 'mitered';
                        }

                        if (shape == ' oval' || shape == ' round') {
                            corner = 'default';
                        }

                        var_dump('Shape: ' + shape + ' Binding:' + binding +' Corner: ' +corner);
                        var csku = $('#customrugbox').data('sku');
                        if (shape == 'oval' || shape == 'round') {
                            var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-default-' + shape + '-alt1-large.jpg';
                        } else {
                            var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-' + corner + '-' + shape + '-alt1-large.jpg';
                        }
                        var swatcheimgs = [];
                        for (var i = 0; i < 6; i++) {
                            if (shape == 'oval' || shape == 'round') {
                                swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-default-' + shape + '-alt' + i + '-large.jpg';
                            } else {
                                swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-' +  corner + '-' + shape + '-alt' + i + '-large.jpg';
                            }
                            $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                        }
                    } else {
                        var_dump('.swatchtest IS NOT present');
                        var csku = $('#customrugbox').data('sku');
                        var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-lapped-alt1-large.jpg';
                        var swatcheimgs = [];
                        var i = 0;
                        for (i = 0; i < 6; i++) {
                            swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-lapped-alt' + i + '-large.jpg';
                            $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                            $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                        }
                    }
                    $('#swatchbimg').attr('src', swatchimg);
                    $(".productView-thumbnail").first().children('a').trigger("click");
                    $('.productView-thumbnail').show();
                    $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
                    createGallery();
                } else if ($('#stairtread').length > 0) {
                    var_dump('#stairtread is present');
                    $('.productView-thumbnail').hide();
                    var swatchcolor = '';
                    swatchcolor = $(this).data('swatch').toLowerCase();
                    swatchcolor = swatchcolor.replace(" ", "-");
                    if ($('#swatchname').length > 0) {
                        $('#swatchname').html(' - ' + swatchcolor + '');
                    } else {
                        $(".Color > .form-label.form-label--alternate.form-label--inlineSmall").append('<span id="swatchname"> - ' + swatchcolor + '</span>');
                    }
                    var csku = $('#productsku').data('product-sku');
                    var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-alt1-large.jpg';
                    var swatcheimgs = [];
                    var i = 0;
                    $('.productView-thumbnail img').show();
                    for (i = 0; i < 6; i++) {
                        swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-wide-cotton-alt' + i + '-large.jpg';
                        $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').parent('.productView-thumbnail').show();
                        $('.productView-thumbnail:nth-child(' + i + ') a img').show();
                    }
                    $('#swatchbimg').attr('src', swatchimg);
                    $(".productView-thumbnail").first().children('a').trigger("click");
                    $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
                    $('.productView-thumbnail a img').each(function(i, val) {});
                    createGallery();

                } else {
                    var_dump('#stairtread NOT present #customdimbox NOT present');
                    $('.productView-thumbnail').hide();
                    var swatchcolor = '';
                    swatchcolor = $(this).data('swatch').toLowerCase();
                    swatchcolor = swatchcolor.replace(" ", "-");
                    if ($('#swatchname').length > 0) {
                        $('#swatchname').html(' - ' + swatchcolor + '');
                    } else {
                        $(".Color > .form-label.form-label--alternate.form-label--inlineSmall").append('<span id="swatchname"> - ' + swatchcolor + '</span>');
                    }
                    var csku = $('#productsku').data('product-sku');
                    var_dump('Product SKU: ' + csku);
                    var shape = '';
                    var binding = '';
                    var corner = '';
                    if (csku.indexOf('bcs-') !== -1) {
                        var_dump('Custom Stair Tread product');
                        binding = '-wide';
                        corner = '-cotton';
                    }
                    if (csku.indexOf('bcm-') !== -1) {
                        var_dump('Custom Sisal Rug');
                        shape = '-rectangle';
                        binding = '-wide';
                        corner = '-lapped';
                    }
                    var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + binding + corner + shape + '-alt1-large.jpg';
                    var swatcheimgs = [];
                    var i = 0;
                    for (i = 0; i < 6; i++) {
                        swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + binding + corner + shape + '-alt' + i + '-large.jpg';
                        $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').parent('.productView-thumbnail').show();
                        $('.productView-thumbnail:nth-child(' + i + ') a img').show();
                    }
                    $('#swatchbimg').attr('src', swatchimg);
                    $(".productView-thumbnail").first().children('a').trigger("click");
                    $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
                    $('.productView-thumbnail a img').each(function(i, val) {});
                    createGallery();

                }
                $('#cornerswatch').removeClass('hideswatch');
            });
        }
        productParams();
        if ($('.form-field.Color').length > 0 && $('.form-field.Size').length > 0) {
            var swatchcolor = $('.swatchselect ').first().data('swatch');
            swatchcolor = swatchcolor.toLowerCase();
            swatchcolor = swatchcolor.replace(" ", "-");
            swatchcolor = swatchcolor.replace(/[^a-zA-Z ]/g, "");
            var csku = $('#productsku').data('product-sku');
            var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-alt1-large.jpg';
            var swatcheimgs = [];
            var i = 0;
            for (i = 0; i < 6; i++) {
                swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-alt' + i + '-large.jpg';
                $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                $('.productView-thumbnail:nth-child(' + i + ') a').parent('.productView-thumbnail').show();
                $('.productView-thumbnail:nth-child(' + i + ') a img').show();
            }
            $('#swatchbimg').attr('src', swatchimg);
            $(".productView-thumbnail").first().children('a').trigger("click");
            $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
            $('.productView-thumbnail a img').each(function(i, val) {});
        }
        if ($('.form-option:visible').length == 1) {
            $('.form-option:visible').trigger('click');
        }

        if ($('.form-field.Shape').length > 0 && $('.form-field.Binding').length > 0 && $('.form-field.Corner').length > 0)  {
            $('.form-select').parent('.form-field').append('<div class="swipeleft">Swipe Left For More</div>');
            $('.form-select').parent('.form-field').append('<div class="prescroll"></div>');
            $('.form-select.form-select--small option').each( function() {
                $(this).parent('.form-select').parent('.form-field').children('.prescroll').append('<span class="selectprox '+$(this).text()+'">'+$(this).text()+'</span>');
            });
            $('.selectprox').each( function() {
                $(this).css('min-width', ($(this).width() + 40) +'px');
            });
            $('.prescroll').addClass('optionscroll');
            $('.selectprox').click( function() {
                var_dump('selectprox is clicked');
                $('.productView-thumbnail').show();
                $('.productView-thumbnail img').show();
                var targettext = $(this).html();
                var targetoption = $('option:contains('+targettext+')');
                var targetval = $('option:contains('+targettext+')').val();
                /*$(targetoption).parent('select').children('option').attr('selected', false);
                $(targetoption).attr('selected', true);*/
                $(targetoption).parent('select').val(targetval).change();
                $(this).parent('.prescroll').children('.selectprox').removeClass('selected');
                $(this).addClass('selected');

                if ($('.swatchtest').length > 0) {
                    var_dump('selectprox is clicked; .swatchtest is present;');
                    var shape = 'rectangle';
                    var binding = 'wide';
                    var corner = 'lapped';
                    var shapex = $('.Shape .form-select option:selected').text();
                    var bindingx = $('.Binding .form-select option:selected').text();
                    var cornerx = $('.Corner .form-select option:selected').text();
                    var_dump('Shapex: ' + shape + ' Bindingx:' + binding +' Cornerx: ' +corner);
                    var swatchcolor = $('.swatchselect.selected').data('swatch');
                    if ($('#swatchname').text().length > 0) {
                        swatchcolor = $('#swatchname').html();
                        swatchcolor = swatchcolor.replace(' - ', '');
                    } else {
                        swatchcolor = 'black';
                    }
                    if (shapex == ' Rectangle or Square') {
                        shape = 'rectangle';
                    } else if (shapex == ' Oval') {
                        shape = 'oval';
                    } else if (shapex == ' Round') {
                        shape = 'round';
                    } else if (shapex == ' Octagon') {
                        shape = 'octagon';
                    }

                    // if (bindingx == ' Wide Canvas/Cotton (1 1/4")') {
                    //     binding = 'wide';
                    // } else if (bindingx == ' Extra Wide Canvas (2 1/4")') {
                    //     binding = 'extrawide';
                    // } else if (bindingx == ' Blind Stitch Canvas (2")') {
                    //     binding = 'blind';
                    // }

                    if (cornerx == ' Standard / Lapped') {
                        corner = 'lapped';
                    } else if (cornerx == ' Mitered') {
                        corner = 'mitered';
                    }

                    if (binding == 'blind') {
                        corner = 'mitered';
                    }
                    var_dump('Shape: ' + shape + ' Binding:' + binding +' Corner: ' +corner);
                    var csku = $('#customrugbox').data('sku');
                    if (shape == 'oval' || shape == 'round') {
                        var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-default-' + shape + '-alt1-large.jpg';
                    } else {
                        var swatchimg = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-' + corner + '-' + shape + '-alt1-large.jpg';
                    }
                    var swatcheimgs = [];
                    var i = 0;
                    for (i = 0; i < 6; i++) {
                        if (shape == 'oval' || shape == 'round') {
                            swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-default-' + shape + '-alt' + i + '-large.jpg';
                        } else {
                            swatcheimgs[i] = CDORIGINALHOST + '/product_images/import/' + csku + '-' + swatchcolor + '-' + binding + '-' +  corner + '-' + shape + '-alt' + i + '-large.jpg';
                        }
                        $('.productView-thumbnail:nth-child(' + i + ')').data('imgurl', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('href', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a img').attr('src', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-item', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-new-image-url', swatcheimgs[i]);
                        $('.productView-thumbnail:nth-child(' + i + ') a').attr('data-image-gallery-zoom-image-url', swatcheimgs[i]);
                    }
                    $('#swatchbimg').attr('src', swatchimg);
                    $(".productView-thumbnail").first().children('a').trigger("click");
                    $('.productView-thumbnail').show();
                    $('.productView-thumbnail a[href*="Default"]').parent('.productView-thumbnail').hide();
                    createGallery();
                }
            });
            $('.productView-options .form-select').addClass('hideselect');
            $('.selectprox:first-child').addClass('selected');
        }

        /*new SimpleBar(document.getElementById('optionscroll'));*/
        $('#customdimbox input').val('');
    }



    /**
     * Since $productView can be dynamically inserted using render_with,
     * We have to retrieve the respective elements
     *
     * @param $scope
     */
    getViewModel($scope) {
        return {
            $priceWithTax: $('[data-product-price-with-tax]', $scope),
            $rrpWithTax: $('[data-product-rrp-with-tax]', $scope),
            $priceWithoutTax: $('[data-product-price-without-tax]', $scope),
            $rrpWithoutTax: $('[data-product-rrp-without-tax]', $scope),
            $weight: $('.productView-info [data-product-weight]', $scope),
            $increments: $('.form-field--increments :input', $scope),
            $addToCart: $('#form-action-addToCart', $scope),
            $wishlistVariation: $('[data-wishlist-add] [name="variation_id"]', $scope),
            stock: {
                $container: $('.form-field--stock', $scope),
                $input: $('[data-product-stock]', $scope),
            },
            $sku: $('[data-product-sku]'),
            $upc: $('[data-product-upc]'),
            quantity: {
                $text: $('.incrementTotal', $scope),
                $input: $('[name=qty\\[\\]]', $scope),
            },
        };
    }

    /**
     * Checks if the current window is being run inside an iframe
     * @returns {boolean}
     */
    isRunningInIframe() {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    }

    /**
     *
     * Handle product options changes
     *
     */
    productOptionsChanged(event) {
        const $changedOption = $(event.target);
        const $form = $changedOption.parents('form');
        const productId = $('[name="product_id"]', $form).val();

        if ($changedOption.hasClass('swatchinput') == false) {
            var choosetext = $changedOption.next().children('span').text();
            $('.currenttext').remove();
            $('.Size .form-label').append('<span class="currenttext"> - ' + choosetext + '</span>');
        }

        // Do not trigger an ajax request if it's a file or if the browser doesn't support FormData
        if ($changedOption.attr('type') === 'file' || window.FormData === undefined) {
            return;
        }

        utils.api.productAttributes.optionChange(productId, $form.serialize(), (err, response) => {
            const productAttributesData = response.data || {};

            this.updateProductAttributes(productAttributesData);
            this.updateView(productAttributesData);
        });
        if ($('.form-field.Color').length > 0 && $('.form-field.Size').length) {
            if ($('.Size .form-radio:checked, .Color .form-radio:checked').length > 1) {
                $('.pricerange').hide();
                $('.pricerangeDiscounted').hide();
                $('.productView-price .price-section--withoutTax').show();
            }
        } else {
            $('.pricerange').hide();
            $('.pricerangeDiscounted').hide();
            $('.productView-price .price-section--withoutTax').show();
        }
        if($('.Size .form-select').val() === ''){
            $('.pricerange').show();
            $('.pricerangeDiscounted').show();
            $('.productView-price .price-section--withoutTax').hide();
        }
    }

    showProductImage(image) {
        if (_.isPlainObject(image)) {
            const zoomImageUrl = utils.tools.image.getSrc(
                image.data,
                this.context.themeSettings.zoom_size,
            );

            const mainImageUrl = utils.tools.image.getSrc(
                image.data,
                this.context.themeSettings.product_size,
            );

            this.imageGallery.setAlternateImage({
                mainImageUrl,
                zoomImageUrl,
            });
        } else {
            this.imageGallery.restoreImage();
        }
    }

    /**
     *
     * Handle action when the shopper clicks on + / - for quantity
     *
     */
    listenQuantityChange() {
        this.$scope.on('click', '[data-quantity-change] button', (event) => {
            event.preventDefault();
            const $target = $(event.currentTarget);
            const viewModel = this.getViewModel(this.$scope);
            const $input = viewModel.quantity.$input;
            const quantityMin = parseInt($input.data('quantity-min'), 10);
            const quantityMax = parseInt($input.data('quantity-max'), 10);

            let qty = parseInt($input.val(), 10);

            // If action is incrementing
            if ($target.data('action') === 'inc') {
                // If quantity max option is set
                if (quantityMax > 0) {
                    // Check quantity does not exceed max
                    if ((qty + 1) <= quantityMax) {
                        qty++;
                    }
                } else {
                    qty++;
                }
            } else if (qty > 1) {
                // If quantity min option is set
                if (quantityMin > 0) {
                    // Check quantity does not fall below min
                    if ((qty - 1) >= quantityMin) {
                        qty--;
                    }
                } else {
                    qty--;
                }
            }

            if ($('.customproduct.ctread').length > 0) {
                if (qty < 3) {
                    alert('Minimum quantity of Custom Stair Treads is 3 per Order');
                    qty = 3;
                }
            }
            // update hidden input
            viewModel.quantity.$input.val(qty);
            // update text
            viewModel.quantity.$text.text(qty);


        });
    }

    /**
     *
     * Add a product to cart
     *
     */
    addProductToCart(event, form) {
        const $addToCartBtn = $('#form-action-addToCart', $(event.target));
        const originalBtnVal = $addToCartBtn.val();
        const waitMessage = $addToCartBtn.data('waitMessage');

        $('.cornerswatch').hide();

        // Do not do AJAX if browser doesn't support FormData
        if (window.FormData === undefined) {
            return;
        }

        // Prevent default
        event.preventDefault();

        $addToCartBtn
            .val(waitMessage)
            .prop('disabled', true);

        this.$overlay.show();

        var feetl = parseInt($('#feetl').val(), 10);
        var feetw = parseInt($('#feetw').val(), 10);
        var inchesl = parseInt($('#inchesl').val(), 10);
        var inchesw = parseInt($('#inchesw').val(), 10);

        if (feetl !== feetl) {
            feetl = 0;
        }
        if (feetw !== feetw) {
            feetw = 0;
        }
        if (inchesl !== inchesl) {
            inchesl = 0;
        }
        if (inchesw !== inchesw) {
            inchesw = 0;
        }

        var customLength = (feetl + (inchesl / 12));
        var customWidth = (feetw + (inchesw / 12));

        var area = customLength * customWidth;

        if ($('.Length').length > 0 && $('.Width').length > 0) {

            var customWidtMax = 30,customLenthMax = 30;
            if (customWidth > customWidtMax || customLength > customLenthMax) {
                if ($('#psku').text() == 'cr-eco-hold') {
                    if (customWidth > 12) {
                        $('#feetw').val(0);
                        $('#inchesw').val(0);
                        $('.form-input.Width').val(0);
                        alert("Please input dimensions with a Maximum width 12' and Maximum length 150'");
                    };

                    if (customLength > 150) {
                        $('#feetl').val(0);
                        $('#inchesl').val(0);
                        $('.form-input.Length').val(0);
                        alert("Please input dimensions with a Maximum width 12' and Maximum length 150'");
                    };


                    if (customLength < 2) {
                        $('#feetl').val(0);
                        $('#inchesl').val(0);
                        $('.form-input.Length').val(0);
                        alert("Please input dimensions with a Minimum width 1' and Maximum length 2'");
                    };
                    if (customWidth < 1) {
                        $('#feetw').val(0);
                        $('#inchesw').val(0);
                        $('.form-input.Width').val(0);
                        alert("Please input dimensions with a Minimum width 1' and Maximum length 2'");
                    };
                } else {
                    if (customWidth > 13) {
                        $('#feetw').val(0);
                        $('#inchesw').val(0);
                        $('.form-input.Width').val(0);
                        alert("Please input dimensions with a Maximum width 13' and Maximum length 98'");
                    };

                    if (customLength > 98) {
                        $('#feetl').val(0);
                        $('#inchesl').val(0);
                        $('.form-input.Length').val(0);
                        alert("Please input dimensions with a Maximum width 13' and Maximum length 98'");
                    };

                }
                return false;
            } else if (customWidth < 1 || customLength < 2) {
                alert("Please input dimensions with a Minimum width 1' and Minimum length 2'");
                return false;
            } else {
                // Add item to cart
                utils.api.cart.itemAdd(new FormData(form), (err, response) => {
                    const errorMessage = err || response.data.error;

                    $addToCartBtn
                        .val(originalBtnVal)
                        .prop('disabled', false);

                    this.$overlay.hide();

                    // Guard statement
                    if (errorMessage) {
                        // Strip the HTML from the error message
                        const tmp = document.createElement('DIV');
                        tmp.innerHTML = errorMessage;

                        return swal({
                            text: tmp.textContent || tmp.innerText,
                            type: 'error',
                        });
                    }
                    var feetl = parseInt($('#feetl').val(), 10);
                    var feetw = parseInt($('#feetw').val(), 10);
                    var inchesl = parseInt($('#inchesl').val(), 10);
                    var inchesw = parseInt($('#inchesw').val(), 10);

                    if (feetl !== feetl) {
                        feetl = 0;
                    }
                    if (feetw !== feetw) {
                        feetw = 0;
                    }
                    if (inchesl !== inchesl) {
                        inchesl = 0;
                    }
                    if (inchesw !== inchesw) {
                        inchesw = 0;
                    }

                    var customLength = (feetl + (inchesl / 12));
                    var customWidth = (feetw + (inchesw / 12));

                    var area = customLength * customWidth;

                    if ($('.Length').length > 0 && $('.Width').length > 0) {

                        var itemid = response.data.cart_item.id;
                        var product_id = response.data.cart_item.product_id;


                        var cart = {
                            "url": "/api/storefront/carts",
                            "method": "GET",
                            "headers": {
                                "Accept": "application/json",
                                "cache-control": "no-cache",
                                'Content-Type': 'application/json'
                            },
                            'dataType': 'json',
                        }
                        $.ajax(cart).done(function(response) {
                            var cartid = response[0].id;


                            var returnedData = $.grep((response[0].lineItems.physicalItems), function(element, index) {
                                return element.id == itemid;
                            });
                            var variant_id = returnedData[0].variantId;

                            var qty = $('.form-input--incrementTotal').val();
                            var newcustomprice = $('#customdec').data('cprice');

                            $.ajax({
                                'url': 'https://www.natural-fiber-rugs.com/customrugqty.php?cartid=' + cartid + '&itemid=' + itemid + '&product_id=' + product_id + '&qty=' + qty + '&variant_id=' + variant_id + '&price=' + newcustomprice + '',
                                'type': 'POST',
                                success: function(data) {
                                    console.log(response);
                                }
                            });
                        });
                        this.previewModal.open();
                        this.updateCartContent(this.previewModal, response.data.cart_item.hash);
                        $('.modal-content').addClass('nototal');

                    } else {


                        // Open preview modal and update content
                        if (this.previewModal) {
                            this.previewModal.open();

                            this.updateCartContent(this.previewModal, response.data.cart_item.hash);
                            $('.modal-content').addClass('nototal');
                        } else {
                            this.$overlay.show();
                            // if no modal, redirect to the cart page
                            this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
                        }
                    }
                });

            }

        } else {
            // Add item to cart
            utils.api.cart.itemAdd(new FormData(form), (err, response) => {
                const errorMessage = err || response.data.error;

                $addToCartBtn
                    .val(originalBtnVal)
                    .prop('disabled', false);

                this.$overlay.hide();

                // Guard statement
                if (errorMessage) {
                    // Strip the HTML from the error message
                    const tmp = document.createElement('DIV');
                    tmp.innerHTML = errorMessage;

                    return swal({
                        text: tmp.textContent || tmp.innerText,
                        type: 'error',
                    });
                }



                // Open preview modal and update content
                if (this.previewModal) {
                    this.previewModal.open();

                    this.updateCartContent(this.previewModal, response.data.cart_item.hash);
                    $('.modal-content').addClass('nototal');
                } else {
                    this.$overlay.show();
                    // if no modal, redirect to the cart page
                    this.redirectTo(response.data.cart_item.cart_url || this.context.urls.cart);
                }

            });
        }

    }

    /**
     * Get cart contents
     *
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    getCartContent(cartItemHash, onComplete) {
        const options = {
            template: 'cart/preview',
            params: {
                suggest: cartItemHash,
            },
            config: {
                cart: {
                    suggestions: {
                        limit: 4,
                    },
                },
            },
        };

        utils.api.cart.getContent(options, onComplete);
    }

    /**
     * Redirect to url
     *
     * @param {String} url
     */
    redirectTo(url) {
        if (this.isRunningInIframe() && !window.iframeSdk) {
            window.top.location = url;
        } else {
            window.location = url;
        }
    }

    /**
     * Update cart content
     *
     * @param {Modal} modal
     * @param {String} cartItemHash
     * @param {Function} onComplete
     */
    updateCartContent(modal, cartItemHash, onComplete) {
        this.getCartContent(cartItemHash, (err, response) => {
            if (err) {
                return;
            }

            modal.updateContent(response);

            // Update cart counter
            const $body = $('body');
            const $cartQuantity = $('[data-cart-quantity]', modal.$content);
            const $cartCounter = $('.navUser-action .cart-count');
            const quantity = $cartQuantity.data('cart-quantity') || 0;

            $cartCounter.addClass('cart-count--positive');
            $body.trigger('cart-quantity-update', quantity);

            if (onComplete) {
                onComplete(response);
            }
        });
    }

    /**
     * Show an message box if a message is passed
     * Hide the box if the message is empty
     * @param  {String} message
     */
    showMessageBox(message) {
        const $messageBox = $('.productAttributes-message');

        if (message) {
            $('.alertBox-message', $messageBox).text(message);
            $messageBox.show();
        } else {
            $messageBox.hide();
        }
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updatePriceView(viewModel, price) {
        if (price.with_tax) {
            $('#singleprice').html(price.with_tax.formatted);
            var qty = $('.form-input--incrementTotal').val();
            var newtotal = parseFloat(price.with_tax.value * qty).toFixed(2);
             newtotal = newtotal.toLocaleString('us');
            viewModel.$priceTax.html('$'+newtotal);
        }

        if (price.without_tax) {
            $('#singleprice').html(price.without_tax.formatted);
            var qty = $('.form-input--incrementTotal').val();
            var newtotal = parseFloat(price.without_tax.value * qty).toFixed(2);
             newtotal = newtotal.toLocaleString('us');
            viewModel.$priceWithoutTax.html('$'+newtotal);
        }

        if (price.rrp_with_tax) {
            viewModel.$rrpWithTax.html(price.rrp_with_tax.formatted);
        }

        if (price.rrp_without_tax) {
            viewModel.$rrpWithoutTax.html(price.rrp_without_tax.formatted);
        }
    }

    /**
     * Update the view of price, messages, SKU and stock options when a product option changes
     * @param  {Object} data Product attribute data
     */
    updateView(data) {
        const viewModel = this.getViewModel(this.$scope);

        this.showMessageBox(data.stock_message || data.purchasing_message);

        if (_.isObject(data.price)) {
            this.updatePriceView(viewModel, data.price);
        }

        if (_.isObject(data.weight)) {
            viewModel.$weight.html(data.weight.formatted);
        }

        // Set variation_id if it exists for adding to wishlist
        if (data.variantId) {
            viewModel.$wishlistVariation.val(data.variantId);
        }

        // If SKU is available
        if (data.sku) {
            if ($('#customdimbox').length > 0) {

            } else {
                viewModel.$sku.text(data.sku);
            }
        }

        // If UPC is available
        if (data.upc) {
            viewModel.$upc.text(data.upc);
        }

        // if stock view is on (CP settings)
        if (viewModel.stock.$container.length && _.isNumber(data.stock)) {
            // if the stock container is hidden, show
            viewModel.stock.$container.removeClass('u-hiddenVisually');

            viewModel.stock.$input.text(data.stock);
        }

        if (!data.purchasable || !data.instock) {
            viewModel.$addToCart.prop('disabled', true);
            viewModel.$increments.prop('disabled', true);
        } else {
            viewModel.$addToCart.prop('disabled', false);
            viewModel.$increments.prop('disabled', false);
        }


  // NEW ADDED CONTENT ODD

        if ($('.price--withoutTax').length > 0) {
          $('.priceDiscountedODD').html('');
          var priceUpdate = $('.price--withoutTax').text();
          var priceUpdateNum = priceUpdate.substring(1);
          priceUpdateNum = parseInt(priceUpdateNum);
          var priceUpdateDiscounted = Math.floor(priceUpdateNum / .8);
          priceUpdateDiscounted = '$'+Number(priceUpdateDiscounted).toLocaleString('en-US', {minimumFractionDigits: 2});
          $('.price-section--withoutTax').prepend('<span class="priceDiscountedODD">' + priceUpdateDiscounted + '</span>');
        }

  // END NEW ADDED CONTENT ODD

    }

    /**
     * Hide or mark as unavailable out of stock attributes if enabled
     * @param  {Object} data Product attribute data
     */
    updateProductAttributes(data) {
        const behavior = data.out_of_stock_behavior;
        const inStockIds = data.in_stock_attributes;
        const outOfStockMessage = ` (${data.out_of_stock_message})`;
        $('.productView-options').addClass('pricechanged');

        this.showProductImage(data.image);

        if (behavior !== 'hide_option' && behavior !== 'label_option') {
            return;
        }

        $('[data-product-attribute-value]', this.$scope).each((i, attribute) => {
            const $attribute = $(attribute);
            const attrId = parseInt($attribute.data('product-attribute-value'), 10);


            if (inStockIds.indexOf(attrId) !== -1) {
                this.enableAttribute($attribute, behavior, outOfStockMessage);
            } else {
                this.disableAttribute($attribute, behavior, outOfStockMessage);
            }

        });


    }

    disableAttribute($attribute, behavior, outOfStockMessage) {
        /*if (this.getAttributeType($attribute) === 'set-select') {
            return this.disableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.remove();
            $attribute.addClass('unavailable');
        } else {
            $attribute.addClass('unavailable');
        }*/
        $attribute.hide();
    }

    disableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        const $select = $attribute.parent();

        if (behavior === 'hide_option') {
            $attribute.toggleOption(false);
            // If the attribute is the selected option in a select dropdown, select the first option (MERC-639)
            if ($attribute.parent().val() === $attribute.attr('value')) {
                $select[0].selectedIndex = 0;
            }
        } else {
            $attribute.attr('disabled', 'disabled');
            $attribute.html($attribute.html().replace(outOfStockMessage, '') + outOfStockMessage);
        }
    }

    enableAttribute($attribute, behavior, outOfStockMessage) {
        /*if (this.getAttributeType($attribute) === 'set-select') {
            return this.enableSelectOptionAttribute($attribute, behavior, outOfStockMessage);
        }

        if (behavior === 'hide_option') {
            $attribute.show();
        } else {
            $attribute.removeClass('unavailable');
        }*/
        $attribute.show();
    }

    enableSelectOptionAttribute($attribute, behavior, outOfStockMessage) {
        if (behavior === 'hide_option') {
            $attribute.toggleOption(true);
        } else {
            $attribute.removeAttr('disabled');
            $attribute.html($attribute.html().replace(outOfStockMessage, ''));
        }
    }

    getAttributeType($attribute) {
        const $parent = $attribute.closest('[data-product-attribute]');

        return $parent ? $parent.data('product-attribute') : null;
    }

    /**
     * Allow radio buttons to get deselected
     */
    initRadioAttributes() {
        $('[data-product-attribute] input[type="radio"]', this.$scope).each((i, radio) => {
            const $radio = $(radio);

            // Only bind to click once
            if ($radio.attr('data-state') !== undefined) {
                $radio.click(() => {
                    if ($radio.data('state') === true) {
                        $radio.prop('checked', false);
                        $radio.data('state', false);

                        $radio.change();
                    } else {
                        $radio.data('state', true);
                    }

                    this.initRadioAttributes();
                });
            }

            $radio.attr('data-state', $radio.prop('checked'));
        });
    }



}

$('.form-field.Size .oinput').each( function() {
   var nsplit = $(this).find('.form-option-variant').text().split("'");
   var sizenum = nsplit[0];

   $(this).attr('data-number', sizenum)
});

var $wrapper = $('.Size #optionscroll');

$wrapper.find('.oinput').sort(function(a, b) {
    return +a.dataset.number - +b.dataset.number;
})
.appendTo($wrapper);
