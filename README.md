JustGage is a handy JavaScript plugin for generating and animating nice &amp; clean dashboard gauges. It is based on Raphaël library for vector drawing.

###Update log

######November 26, 2018. - release 1.2.10
* Fixed error with **customSectors** now represent de custom colors

######September 26, 2016. - release 1.2.9
* **customSectors** receives structural update + additional "percents" feature (define ranges in %).
```javascript
customSectors: {
  percents: true,
  ranges: [{
    color : "#43bf58",
    lo : 0,
    hi : 50
  },{
    color : "#ff3b30",
    lo : 51,
    hi : 100
  }]
}
```
Example: http://justgage.com/examples/custom-sectors.html

######September 24, 2016. - release 1.2.7
 * **hideInnerShadow** replaced with **showInnerShadow** due to performance issues with shadows turned on by default
 * relative sizing fixed (it was not working due to wrong canvas size calculations)

######September 23, 2016.
 * **Title feature removed** - after many years, it's finally here :)

######September 22, 2016.
 * **JustGage.prototype.destroy()** - added method to remove gauge node from DOM
 * fixed https://github.com/toorshia/justgage/issues/146

######September 20, 2016.
Fixing filter paths trying to fetch invalid URLs https://github.com/toorshia/justgage/issues/245

######March 25, 2016.
 * **onAnimationEnd** - callback function after gauge animation ends
 - demo at http://justgage.com/examples/animation-events-hooks.html

######February 3, 2016.
 * **minTxt & maxTxt** - Show custom min and max text - https://github.com/toorshia/justgage/issues/193

######January 31, 2016.
 * fix - https://github.com/toorshia/justgage/issues/194

######January 27, 2016.
 * **titlePosition** - 'above' or 'below'
 * **titleFontFamily** - customize font-family for the title
 * **valueFontFamily** - customize font-family for the value
 - demo at http://justgage.com/examples/font-options.html


######January 5, 2016.
 * **donut pointer** - render configurable triangle pointer in donut mode - demo at http://justgage.com/examples/pointer.html

######November 10, 2015.
 * **reverse** - reverse the gauge direction - demo at http://justgage.com/examples/reverse.html
 * **pointer** - render triangular value pointer - demo at http://justgage.com/examples/pointer.html


######November 08, 2015.
 * **defaults** - option to define common config object when you're creating multiple gauges - demo at http://justgage.com/examples/defaults.html

######August 19, 2015.
 * fixed shadow id issue (same ids were being generated)

######February 16, 2014.
 * fix - https://github.com/toorshia/justgage/issues/102

######October 28, 2013.
 * use HTML5 'data' attributes of the DOM Element to render the gauge. (Note: data attributes override the constructor options, if present.)

######April 18, 2013.
 * **parentNode** - use instead of id, attaches gauge to node which is outside of DOM tree - demo at http://justgage.com/examples/custom-node.html
 * **width** - force gauge width
 * **height** - force gauge height

######April 17, 2013.
 * fix - https://github.com/toorshia/justgage/issues/49

######April 01, 2013.
 * fix - https://github.com/toorshia/justgage/issues/46

######March 26, 2013.
 * **customSectors** - define one or many value ranges with custom gauge color - demo at http://justgage.com/examples/custom-sectors.html

######March 23, 2013.
 * **counter** - option to animate value in counting fashion - check demo at http://justgage.com/examples/counter.html

######March 19, 2013.
 * **refresh()** - added optional 'max' parameter to use when you need to update max value - demo at http://justgage.com/examples/refresh-maximum.html

######February 26, 2013.
 * **decimals** - option to define/limit number of decimals when not using humanFriendly or customRenderer to display value
 * fixed a missing parameters bug when calling generateShadow()  for IE < 9

######December 31, 2012.

 * fixed text y-position for hidden divs - workaround for Raphael <tspan> 'dy' bug - https://github.com/DmitryBaranovskiy/raphael/issues/491
 * 'show' parameters, like showMinMax are now 'hide' because I am lame developer - please update these in your setups
 * Min and Max labels are now auto-off when in donut mode
 * Start angle in donut mode is now 90
 * donutStartAngle - option to define start angle for donut

######November 25, 2012.

 * Option to define custom rendering function for displayed value

######November 19, 2012.

 * Fix for human friendly option when refreshing
 * Config.value is now updated after gauge refresh

######November 13, 2012.

 * Donut display mode added
 * Option to hide value label
 * Option to enable responsive gauge size
 * Removed default title attribute
 * Option to accept min and max defined as string values
 * Option to configure value symbol
 * Fixed bad aspect ratio calculations
 * Option to configure minimum font size for all texts
 * Option to show shorthand big numbers (human friendly)
