'use strict';

var $

var carousel = {}

;(function(){
	function make3dPlacer(parentNode, frontScale, backScale)
	{
		var left = 0
		var right = $(parentNode).width();
		var top = 0
		var bottom = $(parentNode).height()

		return function(node, originalDim, x, y, z)
		{
			var scale = backScale + (z + 1) / 2 * (frontScale - backScale)
			node.style.width = scale * originalDim.width + 'px'
			node.style.height = scale * originalDim.height + 'px'
			node.style.left = left + (x + 1) / 2 * (right - left) - scale * originalDim.width / 2 + 'px'
			node.style.top = top + (y + 1) / 2 * (bottom - top) - scale * originalDim.height / 2 + 'px'
		}
	}

	carousel.create = function(carousel, options)
	{
		// defaults
		var opt = {
			width: 0.7,
			height: 0.15,
			frontScale: 1,
			backScale: 0.4,
			opacity: {
				min: 0.3,
				max: 1,
				threshold: -0.3
			}
		}

		for (var key in options)
		{
			opt[key] = options[key]
		}

		var offset = 0
		var originalDims = []
		var mouseX = 0

		$(carousel).mousemove(function(evt)
		{
			mouseX = 2 * evt.pageX / $(carousel).width() - 1
		})

		$(carousel).children().each(function(index3, child)
		{
			originalDims.push(
				{
					width: $(child).width(),
					height: $(child).height()
				})
		})

		setInterval(
			function()
			{
				offset -= 0.03 * mouseX * mouseX * mouseX

				var placer = make3dPlacer(carousel, opt.frontScale, opt.backScale)
				var children = $(carousel).children()
				var childrenWithZ = []
				$(carousel).children().each(function(index2, child)
				{
					var angle = index2 / children.length * 2 * Math.PI + offset

					var sin = Math.sin(angle)
					var cos = Math.cos(angle)

					var zPos = cos
					placer(child, originalDims[index2], opt.width * sin, opt.height * cos, zPos)

					childrenWithZ.push(
						{
							child: child,
							z: zPos
						})

					var op = opt.opacity
					child.style.opacity = op.min + (op.max - op.min) * (zPos > op.threshold ? 1 : (zPos + 1) / (op.threshold + 1))
				})

				childrenWithZ.sort(function(a, b) {return a.z - b.z})

				for (var i in childrenWithZ)
				{
					childrenWithZ[i].child.style.zIndex = i
				}
			},
			16)
	}

	$(document).ready(function()
	{
		$('.carousel.auto').each(function(i, node)
		{
			carousel.create(node)
		})
	})
})()
