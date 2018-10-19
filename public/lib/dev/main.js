// Define main class

class Main {

    /**
     *  Init owl carousel
     *  @param elem
     *  @param items
     *  @param dots
     */
    makeSlier = (elem, items = [1, 1, 1], dots = true, nav = false, loop = false, margin = 10) => {
        if (elem.length > 0) {
            elem.owlCarousel({
                loop: loop,
                nav: nav,
                navText: [
                    '<a href="javascript:;" class="control-prev"><i class="fa fa-angle-left control-slider"></i></a>', 
                    '<a href="javascript:;" class="control-next"><i class="fa fa-angle-right control-slider"></i></a>'
                ],
                animateOut: 'fadeOut',
                dots: dots,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                autoplaySpeed: 1500,
                smartSpeed:1000,
                margin: margin,
                responsive : {
                    0 : {
                        items : items[2],
                    },
                    768 : {
                        items : items[1],
                    },
                    992 : {
                        items: items[0],
                    }
                }
            })
        }
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
}
