import {
  asString
} from "./chunk-O6MS7WLI.js";
import {
  createCanvasContext2D
} from "./chunk-LNGQ7YLP.js";
import {
  Object_default,
  WORKER_OFFSCREEN_CANVAS
} from "./chunk-2JNVDRY5.js";
import {
  clear
} from "./chunk-RZIVCB3D.js";

// node_modules/ol/css.js
var CLASS_HIDDEN = "ol-hidden";
var CLASS_SELECTABLE = "ol-selectable";
var CLASS_UNSELECTABLE = "ol-unselectable";
var CLASS_CONTROL = "ol-control";
var CLASS_COLLAPSED = "ol-collapsed";
var fontRegEx = new RegExp(
  [
    "^\\s*(?=(?:(?:[-a-z]+\\s*){0,2}(italic|oblique))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(small-caps))?)",
    "(?=(?:(?:[-a-z]+\\s*){0,2}(bold(?:er)?|lighter|[1-9]00 ))?)",
    "(?:(?:normal|\\1|\\2|\\3)\\s*){0,3}((?:xx?-)?",
    "(?:small|large)|medium|smaller|larger|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx]))",
    "(?:\\s*\\/\\s*(normal|[\\.\\d]+(?:\\%|in|[cem]m|ex|p[ctx])?))",
    `?\\s*([-,\\"\\'\\sa-z]+?)\\s*$`
  ].join(""),
  "i"
);
var fontRegExMatchIndex = [
  "style",
  "variant",
  "weight",
  "size",
  "lineHeight",
  "family"
];
var getFontParameters = function(fontSpec) {
  const match = fontSpec.match(fontRegEx);
  if (!match) {
    return null;
  }
  const style = (
    /** @type {FontParameters} */
    {
      lineHeight: "normal",
      size: "1.2em",
      style: "normal",
      weight: "normal",
      variant: "normal"
    }
  );
  for (let i = 0, ii = fontRegExMatchIndex.length; i < ii; ++i) {
    const value = match[i + 1];
    if (value !== void 0) {
      style[fontRegExMatchIndex[i]] = value;
    }
  }
  style.families = style.family.split(/,\s?/);
  return style;
};

// node_modules/ol/render/canvas.js
var defaultFont = "10px sans-serif";
var defaultFillStyle = "#000";
var defaultLineCap = "round";
var defaultLineDash = [];
var defaultLineDashOffset = 0;
var defaultLineJoin = "round";
var defaultMiterLimit = 10;
var defaultStrokeStyle = "#000";
var defaultTextAlign = "center";
var defaultTextBaseline = "middle";
var defaultPadding = [0, 0, 0, 0];
var defaultLineWidth = 1;
var checkedFonts = new Object_default();
var measureContext = null;
var measureFont;
var textHeights = {};
var registerFont = function() {
  const retries = 100;
  const size = "32px ";
  const referenceFonts = ["monospace", "serif"];
  const len = referenceFonts.length;
  const text = "wmytzilWMYTZIL@#/&?$%10";
  let interval, referenceWidth;
  function isAvailable(fontStyle, fontWeight, fontFamily) {
    let available = true;
    for (let i = 0; i < len; ++i) {
      const referenceFont = referenceFonts[i];
      referenceWidth = measureTextWidth(
        fontStyle + " " + fontWeight + " " + size + referenceFont,
        text
      );
      if (fontFamily != referenceFont) {
        const width = measureTextWidth(
          fontStyle + " " + fontWeight + " " + size + fontFamily + "," + referenceFont,
          text
        );
        available = available && width != referenceWidth;
      }
    }
    if (available) {
      return true;
    }
    return false;
  }
  function check() {
    let done = true;
    const fonts = checkedFonts.getKeys();
    for (let i = 0, ii = fonts.length; i < ii; ++i) {
      const font = fonts[i];
      if (checkedFonts.get(font) < retries) {
        if (isAvailable.apply(this, font.split("\n"))) {
          clear(textHeights);
          measureContext = null;
          measureFont = void 0;
          checkedFonts.set(font, retries);
        } else {
          checkedFonts.set(font, checkedFonts.get(font) + 1, true);
          done = false;
        }
      }
    }
    if (done) {
      clearInterval(interval);
      interval = void 0;
    }
  }
  return function(fontSpec) {
    const font = getFontParameters(fontSpec);
    if (!font) {
      return;
    }
    const families = font.families;
    for (let i = 0, ii = families.length; i < ii; ++i) {
      const family = families[i];
      const key = font.style + "\n" + font.weight + "\n" + family;
      if (checkedFonts.get(key) === void 0) {
        checkedFonts.set(key, retries, true);
        if (!isAvailable(font.style, font.weight, family)) {
          checkedFonts.set(key, 0, true);
          if (interval === void 0) {
            interval = setInterval(check, 32);
          }
        }
      }
    }
  };
}();
var measureTextHeight = function() {
  let measureElement;
  return function(fontSpec) {
    let height = textHeights[fontSpec];
    if (height == void 0) {
      if (WORKER_OFFSCREEN_CANVAS) {
        const font = getFontParameters(fontSpec);
        const metrics = measureText(fontSpec, "Žg");
        const lineHeight = isNaN(Number(font.lineHeight)) ? 1.2 : Number(font.lineHeight);
        height = lineHeight * (metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent);
      } else {
        if (!measureElement) {
          measureElement = document.createElement("div");
          measureElement.innerHTML = "M";
          measureElement.style.minHeight = "0";
          measureElement.style.maxHeight = "none";
          measureElement.style.height = "auto";
          measureElement.style.padding = "0";
          measureElement.style.border = "none";
          measureElement.style.position = "absolute";
          measureElement.style.display = "block";
          measureElement.style.left = "-99999px";
        }
        measureElement.style.font = fontSpec;
        document.body.appendChild(measureElement);
        height = measureElement.offsetHeight;
        document.body.removeChild(measureElement);
      }
      textHeights[fontSpec] = height;
    }
    return height;
  };
}();
function measureText(font, text) {
  if (!measureContext) {
    measureContext = createCanvasContext2D(1, 1);
  }
  if (font != measureFont) {
    measureContext.font = font;
    measureFont = measureContext.font;
  }
  return measureContext.measureText(text);
}
function measureTextWidth(font, text) {
  return measureText(font, text).width;
}
function measureAndCacheTextWidth(font, text, cache) {
  if (text in cache) {
    return cache[text];
  }
  const width = text.split("\n").reduce((prev, curr) => Math.max(prev, measureTextWidth(font, curr)), 0);
  cache[text] = width;
  return width;
}
function getTextDimensions(baseStyle, chunks) {
  const widths = [];
  const heights = [];
  const lineWidths = [];
  let width = 0;
  let lineWidth = 0;
  let height = 0;
  let lineHeight = 0;
  for (let i = 0, ii = chunks.length; i <= ii; i += 2) {
    const text = chunks[i];
    if (text === "\n" || i === ii) {
      width = Math.max(width, lineWidth);
      lineWidths.push(lineWidth);
      lineWidth = 0;
      height += lineHeight;
      continue;
    }
    const font = chunks[i + 1] || baseStyle.font;
    const currentWidth = measureTextWidth(font, text);
    widths.push(currentWidth);
    lineWidth += currentWidth;
    const currentHeight = measureTextHeight(font);
    heights.push(currentHeight);
    lineHeight = Math.max(lineHeight, currentHeight);
  }
  return { width, height, widths, heights, lineWidths };
}
function drawImageOrLabel(context, transform, opacity, labelOrImage, originX, originY, w, h, x, y, scale) {
  context.save();
  if (opacity !== 1) {
    context.globalAlpha *= opacity;
  }
  if (transform) {
    context.transform.apply(context, transform);
  }
  if (
    /** @type {*} */
    labelOrImage.contextInstructions
  ) {
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    executeLabelInstructions(
      /** @type {Label} */
      labelOrImage,
      context
    );
  } else if (scale[0] < 0 || scale[1] < 0) {
    context.translate(x, y);
    context.scale(scale[0], scale[1]);
    context.drawImage(
      /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
      labelOrImage,
      originX,
      originY,
      w,
      h,
      0,
      0,
      w,
      h
    );
  } else {
    context.drawImage(
      /** @type {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} */
      labelOrImage,
      originX,
      originY,
      w,
      h,
      x,
      y,
      w * scale[0],
      h * scale[1]
    );
  }
  context.restore();
}
function executeLabelInstructions(label, context) {
  const contextInstructions = label.contextInstructions;
  for (let i = 0, ii = contextInstructions.length; i < ii; i += 2) {
    if (Array.isArray(contextInstructions[i + 1])) {
      context[contextInstructions[i]].apply(
        context,
        contextInstructions[i + 1]
      );
    } else {
      context[contextInstructions[i]] = contextInstructions[i + 1];
    }
  }
}

// node_modules/ol/style/IconImageCache.js
var IconImageCache = class {
  constructor() {
    this.cache_ = {};
    this.cacheSize_ = 0;
    this.maxCacheSize_ = 32;
  }
  /**
   * FIXME empty description for jsdoc
   */
  clear() {
    this.cache_ = {};
    this.cacheSize_ = 0;
  }
  /**
   * @return {boolean} Can expire cache.
   */
  canExpireCache() {
    return this.cacheSize_ > this.maxCacheSize_;
  }
  /**
   * FIXME empty description for jsdoc
   */
  expire() {
    if (this.canExpireCache()) {
      let i = 0;
      for (const key in this.cache_) {
        const iconImage = this.cache_[key];
        if ((i++ & 3) === 0 && !iconImage.hasListener()) {
          delete this.cache_[key];
          --this.cacheSize_;
        }
      }
    }
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @return {import("./IconImage.js").default} Icon image.
   */
  get(src, crossOrigin, color) {
    const key = getKey(src, crossOrigin, color);
    return key in this.cache_ ? this.cache_[key] : null;
  }
  /**
   * @param {string} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../color.js").Color} color Color.
   * @param {import("./IconImage.js").default} iconImage Icon image.
   */
  set(src, crossOrigin, color, iconImage) {
    const key = getKey(src, crossOrigin, color);
    this.cache_[key] = iconImage;
    ++this.cacheSize_;
  }
  /**
   * Set the cache size of the icon cache. Default is `32`. Change this value when
   * your map uses more than 32 different icon images and you are not caching icon
   * styles on the application level.
   * @param {number} maxCacheSize Cache max size.
   * @api
   */
  setSize(maxCacheSize) {
    this.maxCacheSize_ = maxCacheSize;
    this.expire();
  }
};
function getKey(src, crossOrigin, color) {
  const colorString = color ? asString(color) : "null";
  return crossOrigin + ":" + src + ":" + colorString;
}
var shared = new IconImageCache();

export {
  shared,
  CLASS_HIDDEN,
  CLASS_SELECTABLE,
  CLASS_UNSELECTABLE,
  CLASS_CONTROL,
  CLASS_COLLAPSED,
  defaultFont,
  defaultFillStyle,
  defaultLineCap,
  defaultLineDash,
  defaultLineDashOffset,
  defaultLineJoin,
  defaultMiterLimit,
  defaultStrokeStyle,
  defaultTextAlign,
  defaultTextBaseline,
  defaultPadding,
  defaultLineWidth,
  checkedFonts,
  registerFont,
  measureAndCacheTextWidth,
  getTextDimensions,
  drawImageOrLabel
};
//# sourceMappingURL=chunk-WHKUJ6E4.js.map
