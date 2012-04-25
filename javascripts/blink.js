/* Copyright (C) 2011 by Samuel Bailey
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


/* Sam's jQuery Blink Plugin
 *  
 *  Uses the jQuery animation queue to make an element blink (similar to the old <blink> tag).
 *  
 *  Usage:
 *   $('#blink').blink('fast');       blink quickly
 *   $('#blink').blink(300);          fade out for 300ms then back in for 300ms...
 *   $('#blink').blink(100,500);      fade out for 100ms then back in for 500ms...
 *  
 *   $('#blink').blink();             stop blinking now
 *   $('#blink').removeClass('blink') stop blinking after fading back in
 *  
 */
(function ($, undefined) {
    "use strict";
    var blink = function (obj, durationOut, durationIn) {
        $(obj).animate({ opacity: 0.1 }, durationOut, 'linear', function () {
            $(obj).animate({ opacity: 1 }, durationIn, 'linear', function () {
                if ($(this).hasClass('blink')) { blink(obj, durationOut, durationIn); }
            });
        });
    };
    $.fn.blink = function (durationOut, durationIn) {
        if (durationOut !== undefined) {
            if (durationIn === undefined) { durationIn = durationOut; }
            return this.each(function () {
                $(this).addClass('blink');
                blink(this, durationOut, durationIn);
            });
        } else {
            return this.each(function () {
                $(this).removeClass('blink').stop(true).css('opacity', 1);
            });
        }
    };
}(jQuery));
