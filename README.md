![justGage](https://dl.dropbox.com/u/6211055/IMG/justgage_logo.png)

JustGage is a handy JavaScript plugin for generating and animating nice &amp; clean dashboard gauges. It is based on Raphaël library for vector drawing.

Checkout http://justgage.com for details, demos, current release and more.

###Update log

######March 26, 2013.
 * **customSectors** - define one or many value ranges with custom gauge color - check demo at http://bit.ly/15RBkKe

######March 23, 2013.
 * **counter** - option to animate value in counting fashion - check demo at http://bit.ly/15Hw5i1

######March 19, 2013.
 * **refresh()** - added optional 'max' parameter to use when you need to update max value - check demo at http://bit.ly/10cdlSR

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
