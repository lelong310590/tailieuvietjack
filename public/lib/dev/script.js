jQuery(document).ready(function($) {

	(function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10&appId=866137396894798";
        fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));


    var _token = $('meta[name=csrf-token]').attr("content");
    var main = new Main();

	main.makeSlier($('.main-slider'), [1, 1, 1], true, false, false, 80);

})

