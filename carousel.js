'use strict';

var $

var foo

;(function(){
	function make3dPlacer(parentNode, frontMultiplier, backMultiplier)
	{
		var left = $(parentNode).width() / 7
		var right = 6 * left;
		var top = $(parentNode).height() / 4
		var bottom = 3 * top

		return function(node, originalDim, x, y, z)
		{
			var scale = frontMultiplier + (z + 1) / 2 * (backMultiplier - frontMultiplier)
			node.style.width = scale * originalDim.width + 'px'
			node.style.height = scale * originalDim.height + 'px'
			node.style.left = left + (x + 1) / 2 * (right - left) - scale * originalDim.width / 2 + 'px'
			node.style.top = top + (y + 1) / 2 * (bottom - top) - scale * originalDim.height / 2 + 'px'
		}
	}

	$(document).ready(function()
	{
		$('#carouselExample')[0].style.height = $(window).height() + 'px'

		setTimeout(
			function()
			{

				$('.carousel').each(function(index, carousel)
				{
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
							offset += 0.03 * mouseX * mouseX * mouseX

							var placer = make3dPlacer(carousel, 1, 0.2)
							var children = $(carousel).children()
							var childrenWithZ = []
							foo = $(carousel).children().each(function(index2, child)
							{
								var angle = index2 / children.length * 2 * Math.PI + offset

								var zPos = Math.cos(angle)
								placer(child, originalDims[index2], Math.sin(angle), 0, zPos)
								childrenWithZ.push(
									{
										child: child,
										z: zPos
									})
								//placer(child, 0, 0, 0)
							})

							childrenWithZ.sort(function(a, b) {return b.z - a.z})

							for (var i in childrenWithZ)
							{
								childrenWithZ[i].child.style.zIndex = i
							}
						},
						16)
				})
			},
			0)
	})
})()
