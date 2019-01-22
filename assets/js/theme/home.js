import $ from 'jquery';
import 'slick-carousel';
import PageManager from './page-manager';

export default class Home extends PageManager {
    constructor() {
        // ACTIVE MAIN SLIDER HOMEPAGE
        $('.main-slider').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });

        // ACTIVE TESTIMONIALS SLIDER HOMEPAGE
        $('.testimonials-slider').slick({
            dots: true,
            autoplay: true,
            autoplaySpeed: 5000,
        });

        var findrug = '/c/rug-finder/?_bc_fsnf=1';
        $('.rdbutton').click(function() {
          if ($('#selmaterial').val() != 0) {
            findrug = findrug + '&Material='+$('#selmaterial').val();
          }
          if ($('#selcolor').val() != 0) {
            findrug = findrug + '&Color='+$('#selcolor').val();
          }
          if ($('#selsize').val() != 0) {
            findrug = findrug + $('#selsize').val();
          }
          window.location.href=findrug;
        });



        super();
    }

    before(next) {
        next();
    }

    loaded(next) {



        next();
    }
}
