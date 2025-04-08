$(document).ready(function () {
    let slides = $('.slider_slide');
    let indicatorsContainer = $('.slider_indicators');
    let currentIndex = 0;

    slides.each(function (index) {
        let dot = $('<div class="slider_indicator"></div>');
        if (index === 0) dot.addClass('active');
        dot.click(() => goToSlide(index));
        indicatorsContainer.append(dot);
    });

    let indicators = $('.slider_indicator');

    function showSlide(index) {
        slides.removeClass('active');
        indicators.removeClass('active');

        slides.eq(index).addClass('active');
        indicators.eq(index).addClass('active');
    }

    $('.slider_control-prev').click(function () {
        currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
        showSlide(currentIndex);
    });

    $('.slider_control-next').click(function () {
        currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
        showSlide(currentIndex);
    });

    function goToSlide(index) {
        currentIndex = index;
        showSlide(currentIndex);
    }
});