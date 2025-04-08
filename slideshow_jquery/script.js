$(document).ready(function () {
    let currentIndex = 0;
    const $images = $('.slider img');
    const totalImages = $images.length;

    $images.css({ position: 'absolute', top: 0 }).eq(currentIndex).css({ left: 0, display: 'block' });
    const indicators = $('.indicators');
    for (let i = 0; i < totalImages; i++) {
        indicators.append(`<a class="indicator" data-index="${i}"></a>`);
    }
    $('.indicator').first().addClass('active');

    const updateIndicators = () => {
        $('.indicator').removeClass('active');
        $('.indicator').eq(currentIndex).addClass('active');
    };

    function goToSlide(newIndex, direction) {
        if (newIndex === currentIndex) return;

        const $current = $images.eq(currentIndex);
        const $next = $images.eq(newIndex);
        const slideWidth = $current.width();

        let startLeft = direction === 'next' ? slideWidth : -slideWidth;
        let endLeft = direction === 'next' ? -slideWidth : slideWidth;

        $next.css({
            display: 'block',
            left: startLeft
        });

        $current.animate({ left: endLeft }, 500);
        $next.animate({ left: 0 }, 500, function () {
            $current.css('display', 'none');
        });

        currentIndex = newIndex;
        updateIndicators();
    }

    $('.next').on('click', function () {
        const nextIndex = (currentIndex + 1) % totalImages;
        goToSlide(nextIndex, 'next');
    });

    $('.prev').on('click', function () {
        const prevIndex = (currentIndex - 1 + totalImages) % totalImages;
        goToSlide(prevIndex, 'prev');
    });

    $('.indicators').on('click', '.indicator', function () {
        const index = $(this).data('index');
        const direction = index > currentIndex ? 'next' : 'prev';
        goToSlide(index, direction);
    });
});