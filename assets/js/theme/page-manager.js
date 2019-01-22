import async from 'async';

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

$('.faqs h3').click( function() {
    $(this).next().slideToggle();
    $(this).next().toggleClass('open');
    $(this).toggleClass('active');
});

export default class PageManager {
    constructor(context) {
        this.context = context;
    }

    before(next) {
        $(() => {
            $('html').on('click', '#sort-box > li', function () {
                const sort = $(this).data('sort');
                $('select[name=\'sort\']').val(sort).trigger('change');
            });

            if ($('.form-field--increments p').hasClass('out-of-stock')) {
                $('#form-action-addToCart').css('pointer-events', 'none');
            }
        });
        $( "#loadpromotext" ).load( "/content/promotext.html" );
        next();
    }

    loaded(next) {


        next();
    }

    after(next) {

            var $window = $(window);
            function add_menu() {
              var window_top_position = $window.scrollTop();

                if (window_top_position >= 300) {
            		$(".header").addClass("shrunk");
            	} else {
            		$(".header").removeClass("shrunk");
            	}
            };

            $window.on('scroll resize', add_menu);
            $window.trigger('scroll');

        next();
    }

    type() {
        return this.constructor.name;
    }

    load() {
        async.series([
            this.before.bind(this), // Executed first after constructor()
            this.loaded.bind(this), // Main module logic
            this.after.bind(this), // Clean up method that can be overridden for cleanup.
        ], (err) => {
            if (err) {
                throw new Error(err);
            }
        });
        var nlpop = getCookie('ctb');
        if(nlpop != 'TRUE') {
            $('#ctb').show();
            $('#blackout').show();
            setCookie("ctb", "TRUE", 30)
        }
    }
}
