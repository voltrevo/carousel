'use strict';

var $

var carousel

$(document).ready(function()
{
    var node = $('#carouselExample')
    node[0].style.height = $(window).height() + 'px'

    carousel.create(
        node,
        {
            center: {
                x: 0,
                y: -0.1,
                z: 0
            }
        })
})
