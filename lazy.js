document.addEventListener("DOMContentLoaded", function () {

    if ('IntersectionObserver' in window) {

        var lazyImages = [].slice.call(document.querySelectorAll('img'));

        lazyImages.forEach(function (image) {
            image.classList.add('lazy');
            image.dataset.src = image.src;
            image.src = 'data:image/svg+xml;utf8,<svg version="1.1" width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"></svg>';
        });

        var lazyImageObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var lazyImage = entry.target;
                    lazyImage.onload = function () {
                        lazyImage.classList.remove('lazy');
                    };
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });

        lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
        });
    }
});
