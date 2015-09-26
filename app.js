    /*$('.dropdown-toggle').click(function() {
        $('.dropdown-menu').toggle();
    });
    
    $('.like-button').click(function() {
        $(this).toggleClass('active');
    });
    
    $(document).keypress(function() {
        $('.dropdown-menu').toggle();
    });*/
    
var main = function() {
    $('.article').click(function() {
        $('.article').removeClass('current');
        $(this).siblings().children('.description').hide();
        $(this).addClass('current');
        $(this).children('.description').toggle();
    });
    $(document).keypress(function(event) {
        if (event.which === 111) { /* letter o */
            $('.current').siblings().children('.description').hide();
            $('.current').children('.description').toggle();
        } else if (event.which === 110 || event.which === 102) { /* letter n or f */
            var currentArticle = $('.current');
            var nextArticle = currentArticle.next();
            currentArticle.removeClass('current');
            nextArticle.addClass('current');
        } else if (event.which === 98 || event.which === 112) { /* letter b */
            var currentArticle = $('.current');
            var prevArticle = currentArticle.prev();
            currentArticle.removeClass('current');
            prevArticle.addClass('current');
        }
    });
};

$(document).ready(main);