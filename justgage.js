/**
 * JustGage - this is work-in-progress, unreleased, unofficial code, so it might not work top-notch :) 
 * Check http://www.justgage.com for official releases
 * Licensed under MIT.
 * @author Bojan Djuricic  (@Toorshia)
 * 
 * LATEST UPDATES
 * -----------------------------
 * November 25, 2012.
 * -----------------------------
 * Option to define custom rendering function for displayed value
 * ----------------------------- 
 * November 19, 2012.
 * -----------------------------
 * Config.value is now updated after gauge refresh
 * -----------------------------
 * November 13, 2012.
 * -----------------------------
 * Donut display mode added
 * Option to hide value label
 * Option to enable responsive gauge size
 * Removed default title attribute
 * Option to accept min and max defined as string values
 * Option to configure value symbol
 * Fixed bad aspect ratio calculations
 * Option to configure minimum font size for all texts
 * Option to show shorthand big numbers (human friendly)
 */

JustGage = function(config) { 
  
  if (!config.id) {alert("Missing id parameter for gauge!"); return false;} 
  if (!document.getElementById(config.id)) {alert("No element with id: \""+config.id+"\" found!"); return false;} 
  
  // configurable parameters
  this.config = 
  {
    // id : string 
    // this is container element id
    id : config.id,
    
    // title : string
    // gauge title 
    title : (config.title) ? config.title : "",
    
    // titleFontColor : string
    // color of gauge title 
    titleFontColor : (config.titleFontColor) ? config.titleFontColor : "#999999",
    
    // value : int
    // value gauge is showing 
    value : (config.value) ? config.value : 0,
    
    // symbol : string
    // special symbol to show next to value 
    symbol : (config.symbol) ? config.symbol : "",
    
    // valueFontColor : string
    // color of label showing current value
    valueFontColor : (config.valueFontColor) ? config.valueFontColor : "#010101",
    
    // showValue : bool
    // hide or display value text
    showValue : (config.showValue != null) ? config.showValue : true,
    
    // min : int
    // min value
    min : (config.min) ? parseFloat(config.min) : 0,
    
    // max : int
    // max value
    max : (config.max) ? parseFloat(config.max) : 100,
    
    // showMinMax : bool
    // hide or display min and max values
    showMinMax : (config.showMinMax != null) ? config.showMinMax : true,
    
    // humanFriendly : bool
    // convert large numbers for min, max, value to human friendly (e.g. 1234567 -> 1.23M)
    humanFriendly : (config.humanFriendly) ? config.humanFriendly : false,
    
    // humanFriendlyDecimal : int
    // number of decimal places for our human friendly number to contain
    humanFriendlyDecimal : (config.humanFriendlyDecimal) ? config.humanFriendlyDecimal : 0,
    
    // textRenderer: func
    // function applied before rendering text
    textRenderer  : (config.textRenderer) ? config.textRenderer : null,

    // gaugeWidthScale : float
    // width of the gauge element
    gaugeWidthScale : (config.gaugeWidthScale) ? config.gaugeWidthScale : 1.0,
    
    // gaugeColor : string
    // background color of gauge element 
    gaugeColor : (config.gaugeColor) ? config.gaugeColor : "#edebeb",
    
    // label : string
    // text to show below value
    label : (config.label) ? config.label : "",
    
    // showInnerShadow : bool
    // give gauge element small amount of inner shadow 
    showInnerShadow : (config.showInnerShadow != null) ? config.showInnerShadow : true,
    
    // shadowOpacity : int
    // 0 ~ 1
    shadowOpacity : (config.shadowOpacity) ? config.shadowOpacity : 0.2,
    
    // shadowSize: int
    // inner shadow size
    shadowSize : (config.shadowSize) ? config.shadowSize : 5,
    
    // shadowVerticalOffset : int
    // how much shadow is offset from top 
    shadowVerticalOffset : (config.shadowVerticalOffset) ? config.shadowVerticalOffset : 3,
    
    // levelColors : string[]
    // colors of indicator, from lower to upper, in RGB format 
    levelColors : (config.levelColors) ? config.levelColors : [
      "#a9d70b",
      "#f9c802",
      "#ff0000"
    ],
    
    // levelColorsGradient : bool
    // whether to use gradual color change for value, or sector-based
    levelColorsGradient : (config.levelColorsGradient != null) ? config.levelColorsGradient : true,
    
    // labelFontColor : string
    // color of label showing label under value
    labelFontColor : (config.labelFontColor) ? config.labelFontColor : "#b3b3b3",
    
    // startAnimationTime : int
    // length of initial animation 
    startAnimationTime : (config.startAnimationTime) ? config.startAnimationTime : 700,
    
    // startAnimationType : string
    // type of initial animation (linear, >, <,  <>, bounce) 
    startAnimationType : (config.startAnimationType) ? config.startAnimationType : ">",
    
    // refreshAnimationTime : int
    // length of refresh animation 
    refreshAnimationTime : (config.refreshAnimationTime) ? config.refreshAnimationTime : 700,
    
    // refreshAnimationType : string
    // type of refresh animation (linear, >, <,  <>, bounce) 
    refreshAnimationType : (config.refreshAnimationType) ? config.refreshAnimationType : ">",

    // donut : bool
    // show full donut gauge 
    donut : (config.donut != null) ? config.donut : false,
    
    // valueMinFontSize : int
    // absolute minimum font size for the value
    valueMinFontSize : config.valueMinFontSize || 16,
	
    // titleMinFontSize
    // absolute minimum font size for the title
    titleMinFontSize : config.titleMinFontSize || 10,
	
    // labelMinFontSize
    // absolute minimum font size for the label
    labelMinFontSize : config.labelMinFontSize || 10,
	
    // minLabelMinFontSize
    // absolute minimum font size for the minimum label
    minLabelMinFontSize : config.minLabelMinFontSize || 10,
	
    // maxLabelMinFontSize
    // absolute minimum font size for the maximum label
    maxLabelMinFontSize : config.maxLabelMinFontSize || 10,
    
    // relativeGaugeSize : bool
    // whether gauge size should follow changes in container element size
    relativeGaugeSize : (config.relativeGaugeSize != null) ? config.relativeGaugeSize : false,
  };
  
  // overflow values
  if (config.value > this.config.max) this.config.value = this.config.max; 
  if (config.value < this.config.min) this.config.value = this.config.min;
  this.originalValue = config.value;
  
  // canvas
  this.canvas = Raphael(this.config.id, "100%", "100%");
  if (this.config.relativeGaugeSize) {
    this.canvas.setViewBox(0, 0, 200, 150, true);
  }
  
  // canvas dimensions
  var canvasW, canvasH;
  if (this.config.relativeGaugeSize) {
    canvasW = 200;
    canvasH = 150;
  } else {
    canvasW = getStyle(document.getElementById(this.config.id), "width").slice(0, -2) * 1;
    canvasH = getStyle(document.getElementById(this.config.id), "height").slice(0, -2) * 1;
  }
  
  // widget dimensions
  var widgetW, widgetH, aspect;
  
  if (this.config.donut) {
    
    // DONUT ******************************* 

    // width more than height
    if(canvasW > canvasH) {
      widgetH = canvasH;
      widgetW = widgetH;
    // width less than height
    } else if (canvasW < canvasH) {
      widgetW = canvasW;
      widgetH = widgetW;
      // if height don't fit, rescale both
      if(widgetH > canvasH) {
        aspect = widgetH / canvasH;
        widgetH = widgetH / aspect;
        widgetW = widgetH / aspect;
      }
    // equal
    } else {
      widgetW = canvasW;
      widgetH = widgetW;
    }
    
    // delta 
    var dx = (canvasW - widgetW)/2;
    var dy = (canvasH - widgetH)/2;
    
    // title 
    var titleFontSize = ((widgetH / 8) > 10) ? (widgetH / 10) : 10;
    var titleX = dx + widgetW / 2;
    var titleY = dy + widgetH / 15;
    
    // value 
    var valueFontSize = ((widgetH / 6.4) > 16) ? (widgetH / 5.4) : 18;
    var valueX = dx + widgetW / 2;
    var valueY = dy + widgetH / 1.95;
    
    // label 
    var labelFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    var labelX = dx + widgetW / 2;
    var labelY = valueY + valueFontSize / 2 + 6;
    
    // min 
    var minFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    var minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * this.config.gaugeWidthScale) / 2 ;
    var minY = dy + widgetH / 2;
    
    // max 
    var maxFontSize = ((widgetH / 16) > 10) ? (widgetH / 16) : 10;
    var maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * this.config.gaugeWidthScale) / 2 ;
    var maxY = dy + widgetH / 2;
    
  } else {
    // HALF ******************************* 
    
    // width more than height
    if(canvasW > canvasH) {
      widgetH = canvasH;
      widgetW = widgetH * 1.25;
      //if width doesn't fit, rescale both
      if(widgetW > canvasW) {
          aspect = widgetW / canvasW;
          widgetW = widgetW / aspect;
          widgetH = widgetH / aspect;
      }
    // width less than height
    } else if (canvasW < canvasH) {
      widgetW = canvasW;
      widgetH = widgetW / 1.25;
      // if height don't fit, rescale both
      if(widgetH > canvasH) {
        aspect = widgetH / canvasH;
        widgetH = widgetH / aspect;
        widgetW = widgetH / aspect;
      }
    // equal
    } else {
      widgetW = canvasW;
      widgetH = widgetW * 0.75;
    }
  
    // delta 
    var dx = (canvasW - widgetW)/2;
    var dy = (canvasH - widgetH)/2;
    
    // title 
    var titleFontSize = ((widgetH / 8) > this.config.titleMinFontSize) ? (widgetH / 10) : this.config.titleMinFontSize;
    var titleX = dx + widgetW / 2;
    var titleY = dy + widgetH / 6.5;
    
    // value 
    var valueFontSize = ((widgetH / 6.4) > this.config.valueMinFontSize) ? (widgetH / 6.4) : this.config.valueMinFontSize;
    var valueX = dx + widgetW / 2;
    var valueY = dy + widgetH / 1.4;
    
    // label 
    var labelFontSize = ((widgetH / 16) > this.config.labelMinFontSize) ? (widgetH / 16) : this.config.labelMinFontSize;
    var labelX = dx + widgetW / 2;
    //var labelY = dy + widgetH / 1.126760563380282;
    var labelY = valueY + valueFontSize / 2 + 6;
    
    // min 
    var minFontSize = ((widgetH / 16) > this.config.minLabelMinFontSize) ? (widgetH / 16) : this.config.minLabelMinFontSize;
    var minX = dx + (widgetW / 10) + (widgetW / 6.666666666666667 * this.config.gaugeWidthScale) / 2 ;
    var minY = dy + widgetH / 1.126760563380282;
    
    // max 
    var maxFontSize = ((widgetH / 16) > this.config.maxLabelMinFontSize) ? (widgetH / 16) : this.config.maxLabelMinFontSize;
    var maxX = dx + widgetW - (widgetW / 10) - (widgetW / 6.666666666666667 * this.config.gaugeWidthScale) / 2 ;
    var maxY = dy + widgetH / 1.126760563380282;
  }
  // parameters
  this.params  = {
    canvasW : canvasW,
    canvasH : canvasH,
    widgetW : widgetW,
    widgetH : widgetH,
    dx : dx,
    dy : dy,
    titleFontSize : titleFontSize,
    titleX : titleX,
    titleY : titleY,
    valueFontSize : valueFontSize,
    valueX : valueX,
    valueY : valueY,
    labelFontSize : labelFontSize,
    labelX : labelX,
    labelY : labelY,
    minFontSize : minFontSize,
    minX : minX,
    minY : minY,
    maxFontSize : maxFontSize,
    maxX : maxX,
    maxY : maxY
  };
  
  // pki - custom attribute for generating gauge paths
  this.canvas.customAttributes.pki = function (value, min, max, w, h, dx, dy, gws, donut) {
    
       if (donut) {
         var 
            alpha = (1 - 2 * (value - min) / (max - min)) * Math.PI,
            Ro = w / 2 - w / 7,
            Ri = Ro - w / 6.666666666666667 * gws,
            
            Cx = w / 2 + dx,
            Cy = h / 1.95 + dy,
            
            Xo = w / 2 + dx + Ro * Math.cos(alpha),
            Yo = h - (h - Cy) + 0 - Ro * Math.sin(alpha),
            Xi = w / 2 + dx + Ri * Math.cos(alpha),
            Yi = h - (h - Cy) + 0 - Ri * Math.sin(alpha),
            path = "";
      
          path += "M" + (Cx - Ri) + "," + Cy + " ";
          path += "L" + (Cx - Ro) + "," + Cy + " ";
          if (value > ((max - min) / 2)) {
            path += "A" + Ro + "," + Ro + " 0 0 1 " + (Cx + Ro) + "," + Cy + " ";
          }
          path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
          path += "L" + Xi + "," + Yi + " ";
          if (value > ((max - min) / 2)) {
            path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx + Ri) + "," + Cy + " ";
          }
          path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
          path += "Z ";
          return { path: path };
        
      } else {
        var 
            alpha = (1 - (value - min) / (max - min)) * Math.PI,

            Ro = w / 2 - w / 10,
            Ri = Ro - w / 6.666666666666667 * gws,
            
            Cx = w / 2 + dx,
            Cy = h / 1.25 + dy,
            
            Xo = w / 2 + dx + Ro * Math.cos(alpha),
            Yo = h - (h - Cy) + 0 - Ro * Math.sin(alpha),
            Xi = w / 2 + dx + Ri * Math.cos(alpha),
            Yi = h - (h - Cy) + 0 - Ri * Math.sin(alpha),
            path = "";
      
        path += "M" + (Cx - Ri) + "," + Cy + " ";
        path += "L" + (Cx - Ro) + "," + Cy + " ";
        path += "A" + Ro + "," + Ro + " 0 0 1 " + Xo + "," + Yo + " ";
        path += "L" + Xi + "," + Yi + " ";
        path += "A" + Ri + "," + Ri + " 0 0 0 " + (Cx - Ri) + "," + Cy + " ";
        path += "Z ";
        return { path: path };
      }
  }  
  
  // gauge
  this.gauge = this.canvas.path().attr({
    "stroke": "none",
    "fill": this.config.gaugeColor,   
    pki: [this.config.max, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH,  this.params.dx, this.params.dy, this.config.gaugeWidthScale, this.config.donut]
  });
  this.gauge.id = this.config.id+"-gauge";
  
  // level
  this.level = this.canvas.path().attr({
    "stroke": "none",
    "fill": getColorForPercentage((this.config.value - this.config.min) / (this.config.max - this.config.min), this.config.levelColors, this.config.levelColorsGradient),  
    pki: [this.config.min, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH,  this.params.dx, this.params.dy, this.config.gaugeWidthScale, this.config.donut]
  });
  this.level.id = this.config.id+"-level";
  
  // title
  this.txtTitle = this.canvas.text(this.params.titleX, this.params.titleY, this.config.title);
  this.txtTitle. attr({
    "font-size":this.params.titleFontSize,
    "font-weight":"bold",
    "font-family":"Arial",
    "fill":this.config.titleFontColor,
    "fill-opacity":"1"         
  });
  this.txtTitle.id = this.config.id+"-txttitle";
  
  // value
  if(this.config.textRenderer)
    this.originalValue = this.config.textRenderer(this.originalValue);
  else if( this.config.humanFriendly ) 
    this.originalValue = humanFriendlyNumber( this.originalValue, this.config.humanFriendlyDecimal ) + this.config.symbol;

  this.txtValue = this.canvas.text(this.params.valueX, this.params.valueY, this.originalValue);
  this.txtValue. attr({
    "font-size":this.params.valueFontSize,
    "font-weight":"bold",
    "font-family":"Arial",
    "fill":this.config.valueFontColor,
    "fill-opacity":"0"          
  });
  this.txtValue.id = this.config.id+"-txtvalue";
  
  // label
  this.txtLabel = this.canvas.text(this.params.labelX, this.params.labelY, this.config.label);
  this.txtLabel. attr({
    "font-size":this.params.labelFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":this.config.labelFontColor,   
    "fill-opacity":"0"
  });
  this.txtLabel.id = this.config.id+"-txtlabel";
  
  // min
  this.txtMinimum = this.config.min;
  if( this.config.humanFriendly ) this.txtMinimum = humanFriendlyNumber( this.config.min, this.config.humanFriendlyDecimal );
  this.txtMin = this.canvas.text(this.params.minX, this.params.minY, this.txtMinimum);
  this.txtMin. attr({
    "font-size":this.params.minFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":this.config.labelFontColor,   
    "fill-opacity": (this.config.showMinMax == true)? "1" : "0"
  });
  this.txtMin.id = this.config.id+"-txtmin";
  
  // max
  this.txtMaximum = this.config.max;
  if( this.config.humanFriendly ) this.txtMaximum = humanFriendlyNumber( this.config.max, this.config.humanFriendlyDecimal );
  this.txtMax = this.canvas.text(this.params.maxX, this.params.maxY, this.txtMaximum);
  this.txtMax. attr({
    "font-size":this.params.maxFontSize,
    "font-weight":"normal",
    "font-family":"Arial",
    "fill":this.config.labelFontColor,   
    "fill-opacity": (this.config.showMinMax == true)? "1" : "0"
  });
  this.txtMax.id = this.config.id+"-txtmax";
  
  var defs = this.canvas.canvas.childNodes[1];
  var svg = "http://www.w3.org/2000/svg";
  
  if (ie < 9) {
    onCreateElementNsReady(function() {
      this.generateShadow();
    });  
  } else {
    this.generateShadow(svg, defs);
    defs = null;
    svg = null;
  }
  
  // animate 
  this.level.animate({pki: [this.config.value, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH,  this.params.dx, this.params.dy, this.config.gaugeWidthScale, this.config.donut]},  this.config.startAnimationTime, this.config.startAnimationType);
  
  if (this.config.showValue) {
    this.txtValue.animate({"fill-opacity":"1"}, this.config.startAnimationTime, this.config.startAnimationType); 
  }
  this.txtLabel.animate({"fill-opacity":"1"}, this.config.startAnimationTime, this.config.startAnimationType);  
};

/** Refresh gauge level */
JustGage.prototype.refresh = function(val) {
  // overflow values
  var originalVal = val;
  var displayVal = val;
  if (val > this.config.max) {val = this.config.max;}
  if (val < this.config.min) {val = this.config.min;}
    
  var color = getColorForPercentage((val - this.config.min) / (this.config.max - this.config.min), this.config.levelColors, this.config.levelColorsGradient);
  
  if(this.config.textRenderer)
    displayVal = this.config.textRenderer(displayVal);
  else if( this.config.humanFriendly ) 
    displayVal = humanFriendlyNumber( displayVal, this.config.humanFriendlyDecimal ) + this.config.symbol;

  this.canvas.getById(this.config.id+"-txtvalue").attr({"text":displayVal});
  this.canvas.getById(this.config.id+"-level").animate({pki: [val, this.config.min, this.config.max, this.params.widgetW, this.params.widgetH,  this.params.dx, this.params.dy, this.config.gaugeWidthScale, this.config.donut], "fill":color},  this.config.refreshAnimationTime, this.config.refreshAnimationType);
  this.config.value = val;
  originalVal = null;
  displayVal = null;
};

/** Generate shadow */
JustGage.prototype.generateShadow = function(svg, defs) {
    // FILTER
    var gaussFilter=document.createElementNS(svg,"filter");
    gaussFilter.setAttribute("id", this.config.id + "-inner-shadow");
    defs.appendChild(gaussFilter);
    
    // offset
    var feOffset = document.createElementNS(svg,"feOffset");
    feOffset.setAttribute("dx", 0);
    feOffset.setAttribute("dy", this.config.shadowVerticalOffset);
    gaussFilter.appendChild(feOffset);
    feOffset = null;
    
    // blur
    var feGaussianBlur = document.createElementNS(svg,"feGaussianBlur");
    feGaussianBlur.setAttribute("result","offset-blur");
    feGaussianBlur.setAttribute("stdDeviation", this.config.shadowSize);
    gaussFilter.appendChild(feGaussianBlur);
    feGaussianBlur = null;
    
    // composite 1
    var feComposite1 = document.createElementNS(svg,"feComposite");
    feComposite1.setAttribute("operator","out");
    feComposite1.setAttribute("in", "SourceGraphic");
    feComposite1.setAttribute("in2","offset-blur");
    feComposite1.setAttribute("result","inverse");
    gaussFilter.appendChild(feComposite1);
    feComposite1 = null;
    
    // flood
    var feFlood = document.createElementNS(svg,"feFlood");
    feFlood.setAttribute("flood-color","black");
    feFlood.setAttribute("flood-opacity", this.config.shadowOpacity);
    feFlood.setAttribute("result","color");
    gaussFilter.appendChild(feFlood);
    feFlood = null;
    
    // composite 2
    var feComposite2 = document.createElementNS(svg,"feComposite");
    feComposite2.setAttribute("operator","in");
    feComposite2.setAttribute("in", "color");
    feComposite2.setAttribute("in2","inverse");
    feComposite2.setAttribute("result","shadow");
    gaussFilter.appendChild(feComposite2);
    feComposite2 = null;
    
    // composite 3
    var feComposite3 = document.createElementNS(svg,"feComposite");
    feComposite3.setAttribute("operator","over");
    feComposite3.setAttribute("in", "shadow");
    feComposite3.setAttribute("in2","SourceGraphic");
    gaussFilter.appendChild(feComposite3);
    feComposite3 = null;

    // set shadow
    if (this.config.showInnerShadow == true) {
      this.canvas.canvas.childNodes[2].setAttribute("filter", "url(#" + this.config.id + "-inner-shadow)");
      this.canvas.canvas.childNodes[3].setAttribute("filter", "url(#" + this.config.id + "-inner-shadow)");
    }
    
    // clear vars
    gaussFilter = null;
    
}

/** Get color for value percentage */
function getColorForPercentage(pct, col, grad) {
    
    var no = col.length;
    if (no === 1) return col[0];
    var inc = (grad) ? (1 / (no - 1)) : (1 / no);
    var colors = new Array();
    for (var i = 0; i < col.length; i++) {
      var percentage = (grad) ? (inc * i) : (inc * (i + 1));
      var rval = parseInt((cutHex(col[i])).substring(0,2),16);
      var gval = parseInt((cutHex(col[i])).substring(2,4),16);
      var bval = parseInt((cutHex(col[i])).substring(4,6),16);
      colors[i] = { pct: percentage, color: { r: rval, g: gval, b: bval  } };
    }
        
    if(pct == 0) return 'rgb(' + [colors[0].color.r, colors[0].color.g, colors[0].color.b].join(',') + ')';
    
    for (var i = 0; i < colors.length; i++) {
        if (pct <= colors[i].pct) {
          if (grad == true) {
            var lower = colors[i - 1];
            var upper = colors[i];
            var range = upper.pct - lower.pct;
            var rangePct = (pct - lower.pct) / range;
            var pctLower = 1 - rangePct;
            var pctUpper = rangePct;
            var color = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
            };
            return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
          } else {
            return 'rgb(' + [colors[i].color.r, colors[i].color.g, colors[i].color.b].join(',') + ')'; 
          }
        }
    }

} 

/** Random integer  */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}    

/**  Cut hex  */
function cutHex(str) {return (str.charAt(0)=="#") ? str.substring(1,7):str}

/**  Human friendly number suffix */
// From: http://stackoverflow.com/questions/2692323/code-golf-friendly-number-abbreviator
function humanFriendlyNumber( n, d ) {
	var p = Math.pow;
	var d = p(10,d);
	var i = 7
	while( i ) {
		s = p(10,i--*3)
		if( s <= n ) {
			n = Math.round(n*d/s)/d+"kMGTPE"[i];
		}
	}
	return n;
}

/**  Get style  */
function getStyle(oElm, strCssRule){
	var strValue = "";
	if(document.defaultView && document.defaultView.getComputedStyle){
		strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
	}
	else if(oElm.currentStyle){
		strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
			return p1.toUpperCase();
		});
		strValue = oElm.currentStyle[strCssRule];
	}
	return strValue;
}

/**  Create Element NS Ready  */
 function onCreateElementNsReady(func) {
  if (document.createElementNS != undefined) {
    func();
  } else {
    setTimeout(function() { onCreateElementNsReady(func); }, 100);
  }
}

/**  Get IE version  */
// ----------------------------------------------------------
// A short snippet for detecting versions of IE in JavaScript
// without resorting to user-agent sniffing
// ----------------------------------------------------------
// If you're not in IE (or IE version is less than 5) then:
// ie === undefined
// If you're in IE (>=5) then you can determine which version:
// ie === 7; // IE7
// Thus, to detect IE:
// if (ie) {}
// And to detect the version:
// ie === 6 // IE6
// ie > 7 // IE8, IE9 ...
// ie < 9 // Anything less than IE9
// ----------------------------------------------------------
// UPDATE: Now using Live NodeList idea from @jdalton
var ie = (function(){

    var undef,
        v = 3,
        div = document.createElement('div'),
        all = div.getElementsByTagName('i');

    while (
        div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
        all[0]
    );

    return v > 4 ? v : undef;

}());
