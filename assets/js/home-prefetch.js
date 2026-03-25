(function () {
	function sitePath(path) {
		var b = typeof window.SITE_BASE_URL !== 'undefined' ? window.SITE_BASE_URL : '';
		if (!path) {
			return path;
		}
		if (path.charAt(0) === '/') {
			return b + path;
		}
		return b + '/' + path;
	}

	function preload(url) {
		if (!url) {
			return;
		}
		var img = new Image();
		img.src = url;
	}

	function stagger(urls, index, onDone) {
		if (index >= urls.length) {
			if (onDone) {
				onDone();
			}
			return;
		}
		preload(urls[index]);
		var next = function () {
			stagger(urls, index + 1, onDone);
		};
		if (typeof requestIdleCallback === 'function') {
			requestIdleCallback(next, { timeout: 3000 });
		} else {
			setTimeout(next, 20);
		}
	}

	function prefetchProjectThumbnails() {
		var url = sitePath('/assets/projects.json');
		var done = function (data) {
			var thumbs = [];
			if (data && data.projects) {
				data.projects.forEach(function (p) {
					if (p.thumbnail) {
						thumbs.push(sitePath(p.thumbnail));
					}
				});
			}
			stagger(thumbs, 0, null);
		};
		if (typeof fetch === 'function') {
			fetch(url)
				.then(function (r) {
					return r.json();
				})
				.then(done)
				.catch(function () {});
			return;
		}
		var x = new XMLHttpRequest();
		x.onload = function () {
			try {
				done(JSON.parse(x.responseText));
			} catch (e) {}
		};
		x.open('GET', url);
		x.send();
	}

	prefetchProjectThumbnails();
	var list = window.__PREFETCH_URLS__;
	if (list && list.length) {
		stagger(list, 0, null);
	}
})();
