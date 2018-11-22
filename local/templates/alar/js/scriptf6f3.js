$(document).ready(function() {
    $('header .logo').click(function(){
        var shift = 100;
        $('header .menu li').removeClass('active');
        $('html, body').animate({scrollTop: $('body').offset().top - shift}, 1000);
        return false;
    });

    var intervalSlider;
    var width = $(document).width();

    $('#slider .bg div').css('width', width);

    // Слайдер
    var count = $('#slider .list .item').length - 1;
    $('#slider .list .navigation').css('width', 22*(count+1));
    $('.arrow_prev').click(function(){
        clearInterval(intervalSlider);
        var indexPrev = $('#slider .list .item.active').index();
        var indexNext = indexPrev - 1;

        if(indexPrev < 0) { indexNext = count; indexPrev = 0; }

        $('#slider .list .item').removeClass('active');
        $('#slider .list .item').eq(indexNext).addClass('active');

        $('#slider .list .navigation .point').removeClass('active');
        $('#slider .list .navigation .point').eq(indexNext).addClass('active');

        $('#slider .bg div').eq(indexPrev).fadeOut(1500);
        $('#slider .bg div').eq(indexNext).fadeIn(1500);

        return false;
    });
    $('.arrow_next').click(function(){
        clearInterval(intervalSlider);
        var indexPrev = $('#slider .list .item.active').index();
        var indexNext = indexPrev + 1;

        if(indexNext > count) { indexNext = 0; indexPrev = count; }

        $('#slider .list .item').removeClass('active');
        $('#slider .list .item').eq(indexNext).addClass('active');

        $('#slider .list .navigation .point').removeClass('active');
        $('#slider .list .navigation .point').eq(indexNext).addClass('active');

        $('#slider .bg div').eq(indexPrev).fadeOut(1500);
        $('#slider .bg div').eq(indexNext).fadeIn(1500);

        return false;
    });
    // Автоматический запуск
    clearInterval(intervalSlider);
    intervalSlider = setInterval(function(){ changeSlider(); }, 14000);

    google.maps.event.addDomListener(window, 'load', function() {map_initialize('map');});
});
// Слайдер
function changeSlider() {
    var count = $('#slider .list .item').length - 1;
    var indexPrev = $('#slider .list .item.active').index();
    var indexNext = indexPrev + 1;

    if(indexNext > count) { indexNext = 0; indexPrev = count; }

    $('#slider .list .item').removeClass('active');
    $('#slider .list .item').eq(indexNext).addClass('active');

    $('#slider .list .navigation .point').removeClass('active');
    $('#slider .list .navigation .point').eq(indexNext).addClass('active');

    $('#slider .bg div').eq(indexPrev).fadeOut(1500);
    $('#slider .bg div').eq(indexNext).fadeIn(1500);
}
// MAP
function map_initialize(event) {
    var pinkParksStyles = [
        {
            featureType: "all",
            stylers: [
                { saturation: -100 },
                /*{ invert_lightness: true },*/
                { visibility: "on" }
            ]
        }
    ];
    var pinkMapType = new google.maps.StyledMapType(pinkParksStyles,
        {name: "Pink Parks"});
    var mapOptions = {
        zoom: 16,
        center: new google.maps.LatLng(59.982140, 30.342550),
        disableDefaultUI: true,
        scrollwheel: false,
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'pink_parks']
        }
    };
    var map = new google.maps.Map(document.getElementById(event),
        mapOptions);
    var marker1 = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(59.982140, 30.342550),
        icon: '/images/point.png'
    });
    map.mapTypes.set('pink_parks', pinkMapType);
    map.setMapTypeId('pink_parks');
}
//------------------------------------------------------------------------
// Формы
//------------------------------------------------------------------------
function setCenter(item) {
    windowHeight = document.documentElement.clientHeight;
    currentOffset = document.documentElement.scrollTop || document.body.scrollTop;
    currentOffset = currentOffset + parseInt((windowHeight - $(item).outerHeight()) / 2);
    currentOffset = (currentOffset < 10) ? 10 : currentOffset;
    pLeft = parseInt(($(window).width() - item.outerWidth()) / 2);
    item.css({top:currentOffset,left:pLeft}).show();
}
function showPopup(popup) {
    popup = $('#'+popup);
    setCenter(popup);
    createBlind(popup);
    popup.find('.popup-close').click(function(){ closePopup(popup); });
};
function createBlind(popup) {
    var blind = $('<div id="blind"></div>');
    blind.height($(document).height()).appendTo('body');
    blind.click(function(){ closePopup(popup); });
};
function closePopup(popup) {
    $('#blind').remove();
    popup.hide();
    return false;
};