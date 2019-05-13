/* Преобразование меню в зависимости от ширины 
* menu - ul меню
*/
function AdaptiveMenu(menu) {
    var winwidth = $(window).width();
    var navwidth = 0;
    var morewidth = 0;
    var availablespace = $(menu).parent().width() - 20;
    if ($(menu).children('.more').length > 0) {
        morewidth = $(menu).children('.more').outerWidth(true);
        availablespace = availablespace - morewidth;
    }
    $(menu).children('li:not(.more)').each(function () {
        navwidth += $(this).outerWidth(true);
    });

    if (navwidth > availablespace) {
        if ($(menu).children('li:not(.more)').length > 0) {
            var lastItem = $(menu).children('li:not(.more)').last();
            if ($(menu).children('li.more').length == 0) {
                $(menu).append('<li class="more"><a href="#">...</a><ul></ul></li>');
            }
            lastItem.attr('data-width', lastItem.outerWidth(true));
            $(menu).children('li.more').children('ul').prepend(lastItem);

            AdaptiveMenu(menu);
        }
    } else {
        var firstMoreElement = $(menu).children('.more').children('ul').children('li').first();
        navwidth += firstMoreElement.data('width');
        while ((navwidth <= availablespace) && ($(menu).children('.more').children('ul').children('li').length > 0)) {
            firstMoreElement.insertBefore($(menu).children('.more'));
            firstMoreElement = $(menu).children('.more').children('ul').children('li').first();
            navwidth += firstMoreElement.attr('data-width');
            if ($(menu).children('.more').children('ul').children('li').length == 1) {
                availablespace += morewidth;
            }
        }
    }

    if ($(menu).children('.more').children('ul').children('li').length > 0) {
    } else {
        $(menu).children('.more').remove();
    }
};

$(document).ready(function () {
    AdaptiveMenu($('.mainmenu .desktop ul.menu'));
});

$(window).resize(function () {
    AdaptiveMenu($('.mainmenu .desktop ul.menu'));
});
