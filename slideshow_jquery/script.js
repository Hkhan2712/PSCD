$(document).ready(() => {
    let index = 0;
    const slideTime = 500;
    const slider = $('.slider');
    const images = $('.slider img');
    const totalImages = images.length;
    const indicators = $('.indicators');
    
    // fix loi chen anh 
    const slideWidth = images.width();

    const firstClone = images.first().clone();
    const lastClone = images.last().clone();

    slider.append(firstClone);
    slider.prepend(lastClone);

    const updatedImages = $('.slider img');
    let updatedTotal = updatedImages.length;

    slider.css('transform', `translateX(-${slideWidth}px)`);

    for (let i = 0; i < totalImages; i++) {
        indicators.append(`<a class="indicator" data-index="${i}"></a>`);
    }
    $('.indicator').first().addClass('active');

    const updateIndicators = () => {
        $('.indicator').removeClass('active');
        $('.indicator').eq(index % totalImages).addClass('active');
    };

    const showImage = () => {
        slider.css('transition', `transform ${slideTime}ms ease-in-out`);
        slider.css('transform', `translateX(-${slideWidth * (index + 1)}px)`);
        updateIndicators();
    };

    const nextImage = () => {
        if (index >= totalImages - 1) {
            index++;
            showImage();
            setTimeout(() => {
                slider.css('transition', 'none');
                slider.css('transform', `translateX(-${slideWidth}px)`);
                index = 0;
            }, slideTime);
        } else {
            index++;
            showImage();
        }
    };

    const prevImage = () => {
        if (index <= 0) {
            index--;
            showImage();
            setTimeout(() => {
                slider.css('transition', 'none');
                slider.css('transform', `translateX(-${slideWidth * totalImages}px)`);
                index = totalImages - 1;
            }, slideTime);
        } else {
            index--;
            showImage();
        }
    };

    $('.next').click(nextImage);
    $('.prev').click(prevImage);
    $('.indicator').click(function () {
        index = $(this).data('index');
        showImage();
    });
});