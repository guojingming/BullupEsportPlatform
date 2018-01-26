;(function(window) {

	'use strict';

	// taken from mo.js demos
	function isIOSSafari() {
		var userAgent;
		userAgent = window.navigator.userAgent;
		return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
	};

	// taken from mo.js demos
	function isTouch() {
		var isIETouch;
		isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
		return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
	};
	
	// taken from mo.js demos
	var isIOS = isIOSSafari(),
		clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function Animocon(el, options) {
		this.el = el;
		this.options = extend( {}, this.options );
		extend( this.options, options );

		this.checked = false;

		this.timeline = new mojs.Timeline();
		
		for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
			this.timeline.add(this.options.tweens[i]);
		}

		var self = this;
		this.el.addEventListener(clickHandler, function() {
			if( self.checked ) {
				self.options.onUnCheck();
			}
			else {
				self.options.onCheck();
				self.timeline.start();
			}
			self.checked = !self.checked;
		});
	}

	Animocon.prototype.options = {
		tweens : [
			new mojs.Burst({
				shape : 'circle',
				isRunLess: true
			})
		],
		onCheck : function() { return false; },
		onUnCheck : function() { return false; }
	};

	// grid items:
	var items = [].slice.call(document.querySelectorAll('ul.grid > .grid__item'));

	function init() {
		var el8 = items[0].querySelector('button.icobutton'), el8span = el8.querySelector('span');
		var scaleCurve8 = mojs.easing.path('M0,100 L25,99.9999983 C26.2328835,75.0708847 19.7847843,0 100,0');
		new Animocon(el8, {
			tweens : [
				// burst animation
				new mojs.Burst({
					parent: el8,
					duration: 1600,
					shape : 'circle',
					fill: '#f3ba52',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { radius: {'rand(20,5)':0} },
					radius: {50:110},
					count: 28,
					isSwirl: true,
					swirlSize: 15,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// burst animation
				new mojs.Burst({
					parent: el8,
					duration: 1800,
					delay: 300,
					shape : 'circle',
					fill: '#f3ba52',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { 
						radius: {'rand(20,5)':0},
						type: 'line',
						stroke: '#f3ba52',
						strokeWidth: 2
					},
					angle: {0:10},
					radius: {140:200},
					count: 18,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// burst animation
				new mojs.Burst({
					parent: el8,
					duration: 2000,
					delay: 500,
					shape : 'circle',
					fill: '#f3ba52',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { radius: {'rand(20,5)':0} },
					radius: {40:80},
					count: 18,
					isSwirl: true,
					swirlSize: 15,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// burst animation
				new mojs.Burst({
					parent: el8,
					duration: 3000,
					delay: 750,
					shape : 'circle',
					fill: '#f3ba52',
					x: '50%',
					y: '50%',
					opacity: 0.6,
					childOptions: { 
						radius: {'rand(20,10)':0}
					},
					angle: {0:-10},
					radius: {90:130},
					count: 20,
					isRunLess: true,
					easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
				}),
				// icon scale animation
				new mojs.Tween({
					duration : 400,
					easing: mojs.easing.back.out,
					onUpdate: function(progress) {
						var scaleProgress = scaleCurve8(progress);
						el8span.style.WebkitTransform = el8span.style.transform = 'scale3d(' + progress + ',' + progress + ',1)';
					}
				})
			],
			onCheck : function() {
				el8.style.color = '#f3ba52';
			},
			onUnCheck : function() {
				el8.style.color = '#C0C1C3';	
			}
		});
	}	
	init();

})(window);