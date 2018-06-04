document.addEventListener("DOMContentLoaded", () => {
	var lazyImages = Array.from(document.querySelectorAll("img.lazy"));
	if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
		let lazyImageObserver = new IntersectionObserver((entries, observer) => {
			console.log('entries', entries);
			entries.forEach((entrie) => {
				console.log('entries', entrie);
				if (entrie.isIntersecting) {
					let lazyImage = entrie.target;
					lazyImage.src = lazyImage.dataset.srcset;
					lazyImage.srcset = lazyImage.dataset.srcset;
					lazyImage.classList.remove('laze');
					lazyImageObsersver.unobserve(lazyImage);
				}
			})
		},{
		    rootMargin:"100px"  //距离100px触发
		});
		lazyImages.forEach((lazyImage) => {
			lazyImageObserver.observe(lazyImage);
		});
	}
});
