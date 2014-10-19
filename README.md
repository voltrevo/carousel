# carousel.js

*Create a rotating display using the elements of any div.*

## Instructions

Jquery needs to be available, for example:

    <script src='https://code.jquery.com/jquery-2.1.1.min.js'></script>

Add carousel.js and carousel.css:

    <script src='carousel.js'></script>
    <link rel='stylesheet' href='carousel.css'/>

Add the carousel and auto classes to your div:

    <div id='foobar' class='carousel auto'> (Elements to be rotated) </div>

## Changing the default options

Using the auto class creates your carousel on `$(document).ready`. This gives you the default options. If you'd like to specify things like speed and changing or disabling vertical movement, don't use the auto class and instead use `carousel.create`:


    $(document).ready(function()
    {
        carousel.create(
            $('#foobar'),
            {
                width: 0.5, // The distance from the centre of the left-most child
                            // to the right-most child is 50% of the carousel div
    
                speed: 1.5  // 1.5 revolutions per second when the mouse is on the
                            // left or right edge
            })
    })

Here's the full list of available options:

    {
        width: 0.7,
        height: 0.15,
        frontScale: 1,
        backScale: 0.4,
        speed: 0.3,
        opacity: {
            min: 0.3,
            max: 1,
            threshold: -0.3
        },
        center: {
            x: 0,
            y: 0,
            z: 0
        }
    }

## License

carousel.js is available under the [MIT license](http://opensource.org/licenses/MIT).
