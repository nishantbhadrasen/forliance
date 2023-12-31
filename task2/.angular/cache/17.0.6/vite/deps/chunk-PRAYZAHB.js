import {
  RBush
} from "./chunk-CF6XR2R4.js";
import {
  defaultFillStyle,
  defaultFont,
  defaultLineCap,
  defaultLineDash,
  defaultLineDashOffset,
  defaultLineJoin,
  defaultLineWidth,
  defaultMiterLimit,
  defaultPadding,
  defaultStrokeStyle,
  defaultTextAlign,
  defaultTextBaseline,
  drawImageOrLabel,
  getTextDimensions,
  measureAndCacheTextWidth,
  registerFont,
  shared
} from "./chunk-WHKUJ6E4.js";
import {
  Layer_default as Layer_default2,
  canvasPool
} from "./chunk-7ZGQ7WQV.js";
import {
  ImageState_default,
  decodeFallback
} from "./chunk-6FYOL5T7.js";
import {
  EventType_default as EventType_default2,
  Layer_default,
  asArray,
  asString,
  fromString,
  isStringColor,
  lchaToRgba,
  normalize,
  rgbaToLcha,
  toString as toString2,
  withAlpha
} from "./chunk-O6MS7WLI.js";
import {
  createCanvasContext2D,
  releaseCanvas,
  toSize
} from "./chunk-LNGQ7YLP.js";
import {
  lineStringLength
} from "./chunk-FNHHZFJP.js";
import {
  ViewHint_default
} from "./chunk-73PHBHWK.js";
import {
  apply,
  compose,
  create,
  inflateCoordinates,
  inflateCoordinatesArray,
  inflateMultiCoordinatesArray,
  makeInverse,
  makeScale,
  rotate,
  setFromArray,
  snap,
  toString,
  transform2D,
  transformGeom2D
} from "./chunk-DCHCFMLM.js";
import {
  EventType_default,
  Target_default,
  abstract,
  ascending,
  assert,
  equals,
  getUid,
  reverseSubArray
} from "./chunk-2JNVDRY5.js";
import {
  Relationship_default,
  buffer,
  clamp,
  clone,
  containsCoordinate,
  containsExtent,
  coordinateRelationship,
  createEmpty,
  createOrUpdate,
  extendCoordinate,
  fromUserExtent,
  getTransformFromProjections,
  getUserProjection,
  getWidth,
  intersects,
  isEmpty,
  lerp,
  toFixed,
  toUserExtent,
  toUserResolution,
  wrapX,
  wrapX2
} from "./chunk-RZIVCB3D.js";

// node_modules/ol/style/Image.js
var ImageStyle = class _ImageStyle {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    this.opacity_ = options.opacity;
    this.rotateWithView_ = options.rotateWithView;
    this.rotation_ = options.rotation;
    this.scale_ = options.scale;
    this.scaleArray_ = toSize(options.scale);
    this.displacement_ = options.displacement;
    this.declutterMode_ = options.declutterMode;
  }
  /**
   * Clones the style.
   * @return {ImageStyle} The cloned style.
   * @api
   */
  clone() {
    const scale = this.getScale();
    return new _ImageStyle({
      opacity: this.getOpacity(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the symbolizer opacity.
   * @return {number} Opacity.
   * @api
   */
  getOpacity() {
    return this.opacity_;
  }
  /**
   * Determine whether the symbolizer rotates with the map.
   * @return {boolean} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the symoblizer rotation.
   * @return {number} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the symbolizer scale.
   * @return {number|import("../size.js").Size} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the displacement of the shape
   * @return {Array<number>} Shape's center displacement
   * @api
   */
  getDisplacement() {
    return this.displacement_;
  }
  /**
   * Get the declutter mode of the shape
   * @return {"declutter"|"obstacle"|"none"|undefined} Shape's declutter mode
   * @api
   */
  getDeclutterMode() {
    return this.declutterMode_;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @abstract
   * @return {Array<number>} Anchor.
   */
  getAnchor() {
    return abstract();
  }
  /**
   * Get the image element for the symbolizer.
   * @abstract
   * @param {number} pixelRatio Pixel ratio.
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getImage(pixelRatio) {
    return abstract();
  }
  /**
   * @abstract
   * @return {import('../DataTile.js').ImageLike} Image element.
   */
  getHitDetectionImage() {
    return abstract();
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(pixelRatio) {
    return 1;
  }
  /**
   * @abstract
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return abstract();
  }
  /**
   * @abstract
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return abstract();
  }
  /**
   * Get the origin of the symbolizer.
   * @abstract
   * @return {Array<number>} Origin.
   */
  getOrigin() {
    return abstract();
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @abstract
   * @return {import("../size.js").Size} Size.
   */
  getSize() {
    return abstract();
  }
  /**
   * Set the displacement.
   *
   * @param {Array<number>} displacement Displacement.
   * @api
   */
  setDisplacement(displacement) {
    this.displacement_ = displacement;
  }
  /**
   * Set the opacity.
   *
   * @param {number} opacity Opacity.
   * @api
   */
  setOpacity(opacity) {
    this.opacity_ = opacity;
  }
  /**
   * Set whether to rotate the style with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  }
  /**
   * Set the rotation.
   *
   * @param {number} rotation Rotation.
   * @api
   */
  setRotation(rotation) {
    this.rotation_ = rotation;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(scale) {
    this.scale_ = scale;
    this.scaleArray_ = toSize(scale);
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(listener) {
    abstract();
  }
  /**
   * Load not yet loaded URI.
   * @abstract
   */
  load() {
    abstract();
  }
  /**
   * @abstract
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(listener) {
    abstract();
  }
};
var Image_default = ImageStyle;

// node_modules/ol/colorlike.js
function asColorLike(color) {
  if (Array.isArray(color)) {
    return toString2(color);
  }
  return color;
}

// node_modules/ol/style/RegularShape.js
var RegularShape = class _RegularShape extends Image_default {
  /**
   * @param {Options} options Options.
   */
  constructor(options) {
    const rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
    super({
      opacity: 1,
      rotateWithView,
      rotation: options.rotation !== void 0 ? options.rotation : 0,
      scale: options.scale !== void 0 ? options.scale : 1,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
      declutterMode: options.declutterMode
    });
    this.canvases_;
    this.hitDetectionCanvas_ = null;
    this.fill_ = options.fill !== void 0 ? options.fill : null;
    this.origin_ = [0, 0];
    this.points_ = options.points;
    this.radius_ = options.radius !== void 0 ? options.radius : options.radius1;
    this.radius2_ = options.radius2;
    this.angle_ = options.angle !== void 0 ? options.angle : 0;
    this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    this.size_;
    this.renderOptions_;
    this.render();
  }
  /**
   * Clones the style.
   * @return {RegularShape} The cloned style.
   * @api
   */
  clone() {
    const scale = this.getScale();
    const style = new _RegularShape({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      points: this.getPoints(),
      radius: this.getRadius(),
      radius2: this.getRadius2(),
      angle: this.getAngle(),
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    style.setOpacity(this.getOpacity());
    return style;
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */
  getAnchor() {
    const size = this.size_;
    const displacement = this.getDisplacement();
    const scale = this.getScaleArray();
    return [
      size[0] / 2 - displacement[0] / scale[0],
      size[1] / 2 + displacement[1] / scale[1]
    ];
  }
  /**
   * Get the angle used in generating the shape.
   * @return {number} Shape's rotation in radians.
   * @api
   */
  getAngle() {
    return this.angle_;
  }
  /**
   * Get the fill style for the shape.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(fill) {
    this.fill_ = fill;
    this.render();
  }
  /**
   * @return {HTMLCanvasElement} Image element.
   */
  getHitDetectionImage() {
    if (!this.hitDetectionCanvas_) {
      this.hitDetectionCanvas_ = this.createHitDetectionCanvas_(
        this.renderOptions_
      );
    }
    return this.hitDetectionCanvas_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLCanvasElement} Image or Canvas element.
   * @api
   */
  getImage(pixelRatio) {
    let image = this.canvases_[pixelRatio];
    if (!image) {
      const renderOptions = this.renderOptions_;
      const context = createCanvasContext2D(
        renderOptions.size * pixelRatio,
        renderOptions.size * pixelRatio
      );
      this.draw_(renderOptions, context, pixelRatio);
      image = context.canvas;
      this.canvases_[pixelRatio] = image;
    }
    return image;
  }
  /**
   * Get the image pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Pixel ratio.
   */
  getPixelRatio(pixelRatio) {
    return pixelRatio;
  }
  /**
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return this.size_;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return ImageState_default.LOADED;
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */
  getOrigin() {
    return this.origin_;
  }
  /**
   * Get the number of points for generating the shape.
   * @return {number} Number of points for stars and regular polygons.
   * @api
   */
  getPoints() {
    return this.points_;
  }
  /**
   * Get the (primary) radius for the shape.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return this.radius_;
  }
  /**
   * Get the secondary radius for the shape.
   * @return {number|undefined} Radius2.
   * @api
   */
  getRadius2() {
    return this.radius2_;
  }
  /**
   * Get the size of the symbolizer (in pixels).
   * @return {import("../size.js").Size} Size.
   * @api
   */
  getSize() {
    return this.size_;
  }
  /**
   * Get the stroke style for the shape.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(stroke) {
    this.stroke_ = stroke;
    this.render();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(listener) {
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(listener) {
  }
  /**
   * Calculate additional canvas size needed for the miter.
   * @param {string} lineJoin Line join
   * @param {number} strokeWidth Stroke width
   * @param {number} miterLimit Miter limit
   * @return {number} Additional canvas size needed
   * @private
   */
  calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit) {
    if (strokeWidth === 0 || this.points_ === Infinity || lineJoin !== "bevel" && lineJoin !== "miter") {
      return strokeWidth;
    }
    let r1 = this.radius_;
    let r2 = this.radius2_ === void 0 ? r1 : this.radius2_;
    if (r1 < r2) {
      const tmp = r1;
      r1 = r2;
      r2 = tmp;
    }
    const points = this.radius2_ === void 0 ? this.points_ : this.points_ * 2;
    const alpha = 2 * Math.PI / points;
    const a = r2 * Math.sin(alpha);
    const b = Math.sqrt(r2 * r2 - a * a);
    const d = r1 - b;
    const e = Math.sqrt(a * a + d * d);
    const miterRatio = e / a;
    if (lineJoin === "miter" && miterRatio <= miterLimit) {
      return miterRatio * strokeWidth;
    }
    const k = strokeWidth / 2 / miterRatio;
    const l = strokeWidth / 2 * (d / e);
    const maxr = Math.sqrt((r1 + k) * (r1 + k) + l * l);
    const bevelAdd = maxr - r1;
    if (this.radius2_ === void 0 || lineJoin === "bevel") {
      return bevelAdd * 2;
    }
    const aa = r1 * Math.sin(alpha);
    const bb = Math.sqrt(r1 * r1 - aa * aa);
    const dd = r2 - bb;
    const ee = Math.sqrt(aa * aa + dd * dd);
    const innerMiterRatio = ee / aa;
    if (innerMiterRatio <= miterLimit) {
      const innerLength = innerMiterRatio * strokeWidth / 2 - r2 - r1;
      return 2 * Math.max(bevelAdd, innerLength);
    }
    return bevelAdd * 2;
  }
  /**
   * @return {RenderOptions}  The render options
   * @protected
   */
  createRenderOptions() {
    let lineCap = defaultLineCap;
    let lineJoin = defaultLineJoin;
    let miterLimit = 0;
    let lineDash = null;
    let lineDashOffset = 0;
    let strokeStyle;
    let strokeWidth = 0;
    if (this.stroke_) {
      strokeStyle = asColorLike(this.stroke_.getColor() ?? defaultStrokeStyle);
      strokeWidth = this.stroke_.getWidth() ?? defaultLineWidth;
      lineDash = this.stroke_.getLineDash();
      lineDashOffset = this.stroke_.getLineDashOffset() ?? 0;
      lineJoin = this.stroke_.getLineJoin() ?? defaultLineJoin;
      lineCap = this.stroke_.getLineCap() ?? defaultLineCap;
      miterLimit = this.stroke_.getMiterLimit() ?? defaultMiterLimit;
    }
    const add = this.calculateLineJoinSize_(lineJoin, strokeWidth, miterLimit);
    const maxRadius = Math.max(this.radius_, this.radius2_ || 0);
    const size = Math.ceil(2 * maxRadius + add);
    return {
      strokeStyle,
      strokeWidth,
      size,
      lineCap,
      lineDash,
      lineDashOffset,
      lineJoin,
      miterLimit
    };
  }
  /**
   * @protected
   */
  render() {
    this.renderOptions_ = this.createRenderOptions();
    const size = this.renderOptions_.size;
    this.canvases_ = {};
    this.hitDetectionCanvas_ = null;
    this.size_ = [size, size];
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The rendering context.
   * @param {number} pixelRatio The pixel ratio.
   */
  draw_(renderOptions, context, pixelRatio) {
    context.scale(pixelRatio, pixelRatio);
    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);
    if (this.fill_) {
      let color = this.fill_.getColor();
      if (color === null) {
        color = defaultFillStyle;
      }
      context.fillStyle = asColorLike(color);
      context.fill();
    }
    if (renderOptions.strokeStyle) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;
      if (renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }
      context.lineCap = renderOptions.lineCap;
      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @return {HTMLCanvasElement} Canvas containing the icon
   */
  createHitDetectionCanvas_(renderOptions) {
    let context;
    if (this.fill_) {
      let color = this.fill_.getColor();
      let opacity = 0;
      if (typeof color === "string") {
        color = asArray(color);
      }
      if (color === null) {
        opacity = 1;
      } else if (Array.isArray(color)) {
        opacity = color.length === 4 ? color[3] : 1;
      }
      if (opacity === 0) {
        context = createCanvasContext2D(renderOptions.size, renderOptions.size);
        this.drawHitDetectionCanvas_(renderOptions, context);
      }
    }
    return context ? context.canvas : this.getImage(1);
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context The context to draw in.
   */
  createPath_(context) {
    let points = this.points_;
    const radius = this.radius_;
    if (points === Infinity) {
      context.arc(0, 0, radius, 0, 2 * Math.PI);
    } else {
      const radius2 = this.radius2_ === void 0 ? radius : this.radius2_;
      if (this.radius2_ !== void 0) {
        points *= 2;
      }
      const startAngle = this.angle_ - Math.PI / 2;
      const step = 2 * Math.PI / points;
      for (let i = 0; i < points; i++) {
        const angle0 = startAngle + i * step;
        const radiusC = i % 2 === 0 ? radius : radius2;
        context.lineTo(radiusC * Math.cos(angle0), radiusC * Math.sin(angle0));
      }
      context.closePath();
    }
  }
  /**
   * @private
   * @param {RenderOptions} renderOptions Render options.
   * @param {CanvasRenderingContext2D} context The context.
   */
  drawHitDetectionCanvas_(renderOptions, context) {
    context.translate(renderOptions.size / 2, renderOptions.size / 2);
    this.createPath_(context);
    context.fillStyle = defaultFillStyle;
    context.fill();
    if (renderOptions.strokeStyle) {
      context.strokeStyle = renderOptions.strokeStyle;
      context.lineWidth = renderOptions.strokeWidth;
      if (renderOptions.lineDash) {
        context.setLineDash(renderOptions.lineDash);
        context.lineDashOffset = renderOptions.lineDashOffset;
      }
      context.lineJoin = renderOptions.lineJoin;
      context.miterLimit = renderOptions.miterLimit;
      context.stroke();
    }
  }
};
var RegularShape_default = RegularShape;

// node_modules/ol/style/Circle.js
var CircleStyle = class _CircleStyle extends RegularShape_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : { radius: 5 };
    super({
      points: Infinity,
      fill: options.fill,
      radius: options.radius,
      stroke: options.stroke,
      scale: options.scale !== void 0 ? options.scale : 1,
      rotation: options.rotation !== void 0 ? options.rotation : 0,
      rotateWithView: options.rotateWithView !== void 0 ? options.rotateWithView : false,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
      declutterMode: options.declutterMode
    });
  }
  /**
   * Clones the style.
   * @return {CircleStyle} The cloned style.
   * @api
   */
  clone() {
    const scale = this.getScale();
    const style = new _CircleStyle({
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      radius: this.getRadius(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
    style.setOpacity(this.getOpacity());
    return style;
  }
  /**
   * Set the circle radius.
   *
   * @param {number} radius Circle radius.
   * @api
   */
  setRadius(radius) {
    this.radius_ = radius;
    this.render();
  }
};
var Circle_default = CircleStyle;

// node_modules/ol/style/Fill.js
var Fill = class _Fill {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options || {};
    this.color_ = options.color !== void 0 ? options.color : null;
  }
  /**
   * Clones the style. The color is not cloned if it is an {@link module:ol/colorlike~ColorLike}.
   * @return {Fill} The cloned style.
   * @api
   */
  clone() {
    const color = this.getColor();
    return new _Fill({
      color: Array.isArray(color) ? color.slice() : color || void 0
    });
  }
  /**
   * Get the fill color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike|null} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike|null} color Color.
   * @api
   */
  setColor(color) {
    this.color_ = color;
  }
};
var Fill_default = Fill;

// node_modules/ol/style/Stroke.js
var Stroke = class _Stroke {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options || {};
    this.color_ = options.color !== void 0 ? options.color : null;
    this.lineCap_ = options.lineCap;
    this.lineDash_ = options.lineDash !== void 0 ? options.lineDash : null;
    this.lineDashOffset_ = options.lineDashOffset;
    this.lineJoin_ = options.lineJoin;
    this.miterLimit_ = options.miterLimit;
    this.width_ = options.width;
  }
  /**
   * Clones the style.
   * @return {Stroke} The cloned style.
   * @api
   */
  clone() {
    const color = this.getColor();
    return new _Stroke({
      color: Array.isArray(color) ? color.slice() : color || void 0,
      lineCap: this.getLineCap(),
      lineDash: this.getLineDash() ? this.getLineDash().slice() : void 0,
      lineDashOffset: this.getLineDashOffset(),
      lineJoin: this.getLineJoin(),
      miterLimit: this.getMiterLimit(),
      width: this.getWidth()
    });
  }
  /**
   * Get the stroke color.
   * @return {import("../color.js").Color|import("../colorlike.js").ColorLike} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the line cap type for the stroke.
   * @return {CanvasLineCap|undefined} Line cap.
   * @api
   */
  getLineCap() {
    return this.lineCap_;
  }
  /**
   * Get the line dash style for the stroke.
   * @return {Array<number>|null} Line dash.
   * @api
   */
  getLineDash() {
    return this.lineDash_;
  }
  /**
   * Get the line dash offset for the stroke.
   * @return {number|undefined} Line dash offset.
   * @api
   */
  getLineDashOffset() {
    return this.lineDashOffset_;
  }
  /**
   * Get the line join type for the stroke.
   * @return {CanvasLineJoin|undefined} Line join.
   * @api
   */
  getLineJoin() {
    return this.lineJoin_;
  }
  /**
   * Get the miter limit for the stroke.
   * @return {number|undefined} Miter limit.
   * @api
   */
  getMiterLimit() {
    return this.miterLimit_;
  }
  /**
   * Get the stroke width.
   * @return {number|undefined} Width.
   * @api
   */
  getWidth() {
    return this.width_;
  }
  /**
   * Set the color.
   *
   * @param {import("../color.js").Color|import("../colorlike.js").ColorLike} color Color.
   * @api
   */
  setColor(color) {
    this.color_ = color;
  }
  /**
   * Set the line cap.
   *
   * @param {CanvasLineCap|undefined} lineCap Line cap.
   * @api
   */
  setLineCap(lineCap) {
    this.lineCap_ = lineCap;
  }
  /**
   * Set the line dash.
   *
   * @param {Array<number>|null} lineDash Line dash.
   * @api
   */
  setLineDash(lineDash) {
    this.lineDash_ = lineDash;
  }
  /**
   * Set the line dash offset.
   *
   * @param {number|undefined} lineDashOffset Line dash offset.
   * @api
   */
  setLineDashOffset(lineDashOffset) {
    this.lineDashOffset_ = lineDashOffset;
  }
  /**
   * Set the line join.
   *
   * @param {CanvasLineJoin|undefined} lineJoin Line join.
   * @api
   */
  setLineJoin(lineJoin) {
    this.lineJoin_ = lineJoin;
  }
  /**
   * Set the miter limit.
   *
   * @param {number|undefined} miterLimit Miter limit.
   * @api
   */
  setMiterLimit(miterLimit) {
    this.miterLimit_ = miterLimit;
  }
  /**
   * Set the width.
   *
   * @param {number|undefined} width Width.
   * @api
   */
  setWidth(width) {
    this.width_ = width;
  }
};
var Stroke_default = Stroke;

// node_modules/ol/style/Style.js
var Style = class _Style {
  /**
   * @param {Options} [options] Style options.
   */
  constructor(options) {
    options = options || {};
    this.geometry_ = null;
    this.geometryFunction_ = defaultGeometryFunction;
    if (options.geometry !== void 0) {
      this.setGeometry(options.geometry);
    }
    this.fill_ = options.fill !== void 0 ? options.fill : null;
    this.image_ = options.image !== void 0 ? options.image : null;
    this.renderer_ = options.renderer !== void 0 ? options.renderer : null;
    this.hitDetectionRenderer_ = options.hitDetectionRenderer !== void 0 ? options.hitDetectionRenderer : null;
    this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    this.text_ = options.text !== void 0 ? options.text : null;
    this.zIndex_ = options.zIndex;
  }
  /**
   * Clones the style.
   * @return {Style} The cloned style.
   * @api
   */
  clone() {
    let geometry = this.getGeometry();
    if (geometry && typeof geometry === "object") {
      geometry = /** @type {import("../geom/Geometry.js").default} */
      geometry.clone();
    }
    return new _Style({
      geometry: geometry ?? void 0,
      fill: this.getFill() ? this.getFill().clone() : void 0,
      image: this.getImage() ? this.getImage().clone() : void 0,
      renderer: this.getRenderer() ?? void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      text: this.getText() ? this.getText().clone() : void 0,
      zIndex: this.getZIndex()
    });
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setRenderer} or the `renderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getRenderer() {
    return this.renderer_;
  }
  /**
   * Sets a custom renderer function for this style. When set, `fill`, `stroke`
   * and `image` options of the style will be ignored.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setRenderer(renderer) {
    this.renderer_ = renderer;
  }
  /**
   * Sets a custom renderer function for this style used
   * in hit detection.
   * @param {RenderFunction|null} renderer Custom renderer function.
   * @api
   */
  setHitDetectionRenderer(renderer) {
    this.hitDetectionRenderer_ = renderer;
  }
  /**
   * Get the custom renderer function that was configured with
   * {@link #setHitDetectionRenderer} or the `hitDetectionRenderer` constructor option.
   * @return {RenderFunction|null} Custom renderer function.
   * @api
   */
  getHitDetectionRenderer() {
    return this.hitDetectionRenderer_;
  }
  /**
   * Get the geometry to be rendered.
   * @return {string|import("../geom/Geometry.js").default|GeometryFunction|null}
   * Feature property or geometry or function that returns the geometry that will
   * be rendered with this style.
   * @api
   */
  getGeometry() {
    return this.geometry_;
  }
  /**
   * Get the function used to generate a geometry for rendering.
   * @return {!GeometryFunction} Function that is called with a feature
   * and returns the geometry to render instead of the feature's geometry.
   * @api
   */
  getGeometryFunction() {
    return this.geometryFunction_;
  }
  /**
   * Get the fill style.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Set the fill style.
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(fill) {
    this.fill_ = fill;
  }
  /**
   * Get the image style.
   * @return {import("./Image.js").default|null} Image style.
   * @api
   */
  getImage() {
    return this.image_;
  }
  /**
   * Set the image style.
   * @param {import("./Image.js").default} image Image style.
   * @api
   */
  setImage(image) {
    this.image_ = image;
  }
  /**
   * Get the stroke style.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Set the stroke style.
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(stroke) {
    this.stroke_ = stroke;
  }
  /**
   * Get the text style.
   * @return {import("./Text.js").default|null} Text style.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Set the text style.
   * @param {import("./Text.js").default} text Text style.
   * @api
   */
  setText(text) {
    this.text_ = text;
  }
  /**
   * Get the z-index for the style.
   * @return {number|undefined} ZIndex.
   * @api
   */
  getZIndex() {
    return this.zIndex_;
  }
  /**
   * Set a geometry that is rendered instead of the feature's geometry.
   *
   * @param {string|import("../geom/Geometry.js").default|GeometryFunction} geometry
   *     Feature property or geometry or function returning a geometry to render
   *     for this style.
   * @api
   */
  setGeometry(geometry) {
    if (typeof geometry === "function") {
      this.geometryFunction_ = geometry;
    } else if (typeof geometry === "string") {
      this.geometryFunction_ = function(feature) {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          feature.get(geometry)
        );
      };
    } else if (!geometry) {
      this.geometryFunction_ = defaultGeometryFunction;
    } else if (geometry !== void 0) {
      this.geometryFunction_ = function() {
        return (
          /** @type {import("../geom/Geometry.js").default} */
          geometry
        );
      };
    }
    this.geometry_ = geometry;
  }
  /**
   * Set the z-index.
   *
   * @param {number|undefined} zIndex ZIndex.
   * @api
   */
  setZIndex(zIndex) {
    this.zIndex_ = zIndex;
  }
};
function toFunction(obj) {
  let styleFunction;
  if (typeof obj === "function") {
    styleFunction = obj;
  } else {
    let styles;
    if (Array.isArray(obj)) {
      styles = obj;
    } else {
      assert(
        typeof /** @type {?} */
        obj.getZIndex === "function",
        "Expected an `Style` or an array of `Style`"
      );
      const style = (
        /** @type {Style} */
        obj
      );
      styles = [style];
    }
    styleFunction = function() {
      return styles;
    };
  }
  return styleFunction;
}
var defaultStyles = null;
function createDefaultStyle(feature, resolution) {
  if (!defaultStyles) {
    const fill = new Fill_default({
      color: "rgba(255,255,255,0.4)"
    });
    const stroke = new Stroke_default({
      color: "#3399CC",
      width: 1.25
    });
    defaultStyles = [
      new Style({
        image: new Circle_default({
          fill,
          stroke,
          radius: 5
        }),
        fill,
        stroke
      })
    ];
  }
  return defaultStyles;
}
function defaultGeometryFunction(feature) {
  return feature.getGeometry();
}
var Style_default = Style;

// node_modules/ol/style/IconImage.js
var taintedTestContext = null;
var IconImage = class extends Target_default {
  /**
   * @param {HTMLImageElement|HTMLCanvasElement|ImageBitmap} image Image.
   * @param {string|undefined} src Src.
   * @param {?string} crossOrigin Cross origin.
   * @param {import("../ImageState.js").default} imageState Image state.
   * @param {import("../color.js").Color} color Color.
   */
  constructor(image, src, crossOrigin, imageState, color) {
    super();
    this.hitDetectionImage_ = null;
    this.image_ = image;
    this.crossOrigin_ = crossOrigin;
    this.canvas_ = {};
    this.color_ = color;
    this.imageState_ = imageState === void 0 ? ImageState_default.IDLE : imageState;
    this.size_ = image && image.width && image.height ? [image.width, image.height] : null;
    this.src_ = src;
    this.tainted_;
  }
  /**
   * @private
   */
  initializeImage_() {
    this.image_ = new Image();
    if (this.crossOrigin_ !== null) {
      this.image_.crossOrigin = this.crossOrigin_;
    }
  }
  /**
   * @private
   * @return {boolean} The image canvas is tainted.
   */
  isTainted_() {
    if (this.tainted_ === void 0 && this.imageState_ === ImageState_default.LOADED) {
      if (!taintedTestContext) {
        taintedTestContext = createCanvasContext2D(1, 1, void 0, {
          willReadFrequently: true
        });
      }
      taintedTestContext.drawImage(this.image_, 0, 0);
      try {
        taintedTestContext.getImageData(0, 0, 1, 1);
        this.tainted_ = false;
      } catch (e) {
        taintedTestContext = null;
        this.tainted_ = true;
      }
    }
    return this.tainted_ === true;
  }
  /**
   * @private
   */
  dispatchChangeEvent_() {
    this.dispatchEvent(EventType_default.CHANGE);
  }
  /**
   * @private
   */
  handleImageError_() {
    this.imageState_ = ImageState_default.ERROR;
    this.dispatchChangeEvent_();
  }
  /**
   * @private
   */
  handleImageLoad_() {
    this.imageState_ = ImageState_default.LOADED;
    this.size_ = [this.image_.width, this.image_.height];
    this.dispatchChangeEvent_();
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element or image bitmap.
   */
  getImage(pixelRatio) {
    if (!this.image_) {
      this.initializeImage_();
    }
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? this.canvas_[pixelRatio] : this.image_;
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Image or Canvas element.
   */
  getPixelRatio(pixelRatio) {
    this.replaceColor_(pixelRatio);
    return this.canvas_[pixelRatio] ? pixelRatio : 1;
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.imageState_;
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    if (!this.image_) {
      this.initializeImage_();
    }
    if (!this.hitDetectionImage_) {
      if (this.isTainted_()) {
        const width = this.size_[0];
        const height = this.size_[1];
        const context = createCanvasContext2D(width, height);
        context.fillRect(0, 0, width, height);
        this.hitDetectionImage_ = context.canvas;
      } else {
        this.hitDetectionImage_ = this.image_;
      }
    }
    return this.hitDetectionImage_;
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   */
  getSize() {
    return this.size_;
  }
  /**
   * @return {string|undefined} Image src.
   */
  getSrc() {
    return this.src_;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.imageState_ !== ImageState_default.IDLE) {
      return;
    }
    if (!this.image_) {
      this.initializeImage_();
    }
    this.imageState_ = ImageState_default.LOADING;
    try {
      if (this.src_ !== void 0) {
        this.image_.src = this.src_;
      }
    } catch (e) {
      this.handleImageError_();
    }
    if (this.image_ instanceof HTMLImageElement) {
      decodeFallback(this.image_, this.src_).then((image) => {
        this.image_ = image;
        this.handleImageLoad_();
      }).catch(this.handleImageError_.bind(this));
    }
  }
  /**
   * @param {number} pixelRatio Pixel ratio.
   * @private
   */
  replaceColor_(pixelRatio) {
    if (!this.color_ || this.canvas_[pixelRatio] || this.imageState_ !== ImageState_default.LOADED) {
      return;
    }
    const image = this.image_;
    const canvas = document.createElement("canvas");
    canvas.width = Math.ceil(image.width * pixelRatio);
    canvas.height = Math.ceil(image.height * pixelRatio);
    const ctx = canvas.getContext("2d");
    ctx.scale(pixelRatio, pixelRatio);
    ctx.drawImage(image, 0, 0);
    ctx.globalCompositeOperation = "multiply";
    ctx.fillStyle = asString(this.color_);
    ctx.fillRect(0, 0, canvas.width / pixelRatio, canvas.height / pixelRatio);
    ctx.globalCompositeOperation = "destination-in";
    ctx.drawImage(image, 0, 0);
    this.canvas_[pixelRatio] = canvas;
  }
};
function get(image, cacheKey, crossOrigin, imageState, color) {
  let iconImage = cacheKey === void 0 ? void 0 : shared.get(cacheKey, crossOrigin, color);
  if (!iconImage) {
    iconImage = new IconImage(
      image,
      image instanceof HTMLImageElement ? image.src || void 0 : cacheKey,
      crossOrigin,
      imageState,
      color
    );
    shared.set(cacheKey, crossOrigin, color, iconImage);
  }
  return iconImage;
}

// node_modules/ol/style/Icon.js
function calculateScale(width, height, wantedWidth, wantedHeight) {
  if (wantedWidth !== void 0 && wantedHeight !== void 0) {
    return [wantedWidth / width, wantedHeight / height];
  }
  if (wantedWidth !== void 0) {
    return wantedWidth / width;
  }
  if (wantedHeight !== void 0) {
    return wantedHeight / height;
  }
  return 1;
}
var Icon = class _Icon extends Image_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options || {};
    const opacity = options.opacity !== void 0 ? options.opacity : 1;
    const rotation = options.rotation !== void 0 ? options.rotation : 0;
    const scale = options.scale !== void 0 ? options.scale : 1;
    const rotateWithView = options.rotateWithView !== void 0 ? options.rotateWithView : false;
    super({
      opacity,
      rotation,
      scale,
      displacement: options.displacement !== void 0 ? options.displacement : [0, 0],
      rotateWithView,
      declutterMode: options.declutterMode
    });
    this.anchor_ = options.anchor !== void 0 ? options.anchor : [0.5, 0.5];
    this.normalizedAnchor_ = null;
    this.anchorOrigin_ = options.anchorOrigin !== void 0 ? options.anchorOrigin : "top-left";
    this.anchorXUnits_ = options.anchorXUnits !== void 0 ? options.anchorXUnits : "fraction";
    this.anchorYUnits_ = options.anchorYUnits !== void 0 ? options.anchorYUnits : "fraction";
    this.crossOrigin_ = options.crossOrigin !== void 0 ? options.crossOrigin : null;
    const image = options.img !== void 0 ? options.img : null;
    let cacheKey = options.src;
    assert(
      !(cacheKey !== void 0 && image),
      "`image` and `src` cannot be provided at the same time"
    );
    if ((cacheKey === void 0 || cacheKey.length === 0) && image) {
      cacheKey = /** @type {HTMLImageElement} */
      image.src || getUid(image);
    }
    assert(
      cacheKey !== void 0 && cacheKey.length > 0,
      "A defined and non-empty `src` or `image` must be provided"
    );
    assert(
      !((options.width !== void 0 || options.height !== void 0) && options.scale !== void 0),
      "`width` or `height` cannot be provided together with `scale`"
    );
    let imageState;
    if (options.src !== void 0) {
      imageState = ImageState_default.IDLE;
    } else if (image !== void 0) {
      if (image instanceof HTMLImageElement) {
        if (image.complete) {
          imageState = image.src ? ImageState_default.LOADED : ImageState_default.IDLE;
        } else {
          imageState = ImageState_default.LOADING;
        }
      } else {
        imageState = ImageState_default.LOADED;
      }
    }
    this.color_ = options.color !== void 0 ? asArray(options.color) : null;
    this.iconImage_ = get(
      image,
      /** @type {string} */
      cacheKey,
      this.crossOrigin_,
      imageState,
      this.color_
    );
    this.offset_ = options.offset !== void 0 ? options.offset : [0, 0];
    this.offsetOrigin_ = options.offsetOrigin !== void 0 ? options.offsetOrigin : "top-left";
    this.origin_ = null;
    this.size_ = options.size !== void 0 ? options.size : null;
    if (options.width !== void 0 || options.height !== void 0) {
      let width, height;
      if (options.size) {
        [width, height] = options.size;
      } else {
        const image2 = this.getImage(1);
        if (image2.width && image2.height) {
          width = image2.width;
          height = image2.height;
        } else if (image2 instanceof HTMLImageElement) {
          this.initialOptions_ = options;
          const onload = () => {
            this.unlistenImageChange(onload);
            if (!this.initialOptions_) {
              return;
            }
            const imageSize = this.iconImage_.getSize();
            this.setScale(
              calculateScale(
                imageSize[0],
                imageSize[1],
                options.width,
                options.height
              )
            );
          };
          this.listenImageChange(onload);
          return;
        }
      }
      if (width !== void 0) {
        this.setScale(
          calculateScale(width, height, options.width, options.height)
        );
      }
    }
  }
  /**
   * Clones the style. The underlying Image/HTMLCanvasElement is not cloned.
   * @return {Icon} The cloned style.
   * @api
   */
  clone() {
    let scale, width, height;
    if (this.initialOptions_) {
      width = this.initialOptions_.width;
      height = this.initialOptions_.height;
    } else {
      scale = this.getScale();
      scale = Array.isArray(scale) ? scale.slice() : scale;
    }
    return new _Icon({
      anchor: this.anchor_.slice(),
      anchorOrigin: this.anchorOrigin_,
      anchorXUnits: this.anchorXUnits_,
      anchorYUnits: this.anchorYUnits_,
      color: this.color_ && this.color_.slice ? this.color_.slice() : this.color_ || void 0,
      crossOrigin: this.crossOrigin_,
      offset: this.offset_.slice(),
      offsetOrigin: this.offsetOrigin_,
      opacity: this.getOpacity(),
      rotateWithView: this.getRotateWithView(),
      rotation: this.getRotation(),
      scale,
      width,
      height,
      size: this.size_ !== null ? this.size_.slice() : void 0,
      src: this.getSrc(),
      displacement: this.getDisplacement().slice(),
      declutterMode: this.getDeclutterMode()
    });
  }
  /**
   * Get the anchor point in pixels. The anchor determines the center point for the
   * symbolizer.
   * @return {Array<number>} Anchor.
   * @api
   */
  getAnchor() {
    let anchor = this.normalizedAnchor_;
    if (!anchor) {
      anchor = this.anchor_;
      const size = this.getSize();
      if (this.anchorXUnits_ == "fraction" || this.anchorYUnits_ == "fraction") {
        if (!size) {
          return null;
        }
        anchor = this.anchor_.slice();
        if (this.anchorXUnits_ == "fraction") {
          anchor[0] *= size[0];
        }
        if (this.anchorYUnits_ == "fraction") {
          anchor[1] *= size[1];
        }
      }
      if (this.anchorOrigin_ != "top-left") {
        if (!size) {
          return null;
        }
        if (anchor === this.anchor_) {
          anchor = this.anchor_.slice();
        }
        if (this.anchorOrigin_ == "top-right" || this.anchorOrigin_ == "bottom-right") {
          anchor[0] = -anchor[0] + size[0];
        }
        if (this.anchorOrigin_ == "bottom-left" || this.anchorOrigin_ == "bottom-right") {
          anchor[1] = -anchor[1] + size[1];
        }
      }
      this.normalizedAnchor_ = anchor;
    }
    const displacement = this.getDisplacement();
    const scale = this.getScaleArray();
    return [
      anchor[0] - displacement[0] / scale[0],
      anchor[1] + displacement[1] / scale[1]
    ];
  }
  /**
   * Set the anchor point. The anchor determines the center point for the
   * symbolizer.
   *
   * @param {Array<number>} anchor Anchor.
   * @api
   */
  setAnchor(anchor) {
    this.anchor_ = anchor;
    this.normalizedAnchor_ = null;
  }
  /**
   * Get the icon color.
   * @return {import("../color.js").Color} Color.
   * @api
   */
  getColor() {
    return this.color_;
  }
  /**
   * Get the image icon.
   * @param {number} pixelRatio Pixel ratio.
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image or Canvas element. If the Icon
   * style was configured with `src` or with a not let loaded `img`, an `ImageBitmap` will be returned.
   * @api
   */
  getImage(pixelRatio) {
    return this.iconImage_.getImage(pixelRatio);
  }
  /**
   * Get the pixel ratio.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} The pixel ratio of the image.
   * @api
   */
  getPixelRatio(pixelRatio) {
    return this.iconImage_.getPixelRatio(pixelRatio);
  }
  /**
   * @return {import("../size.js").Size} Image size.
   */
  getImageSize() {
    return this.iconImage_.getSize();
  }
  /**
   * @return {import("../ImageState.js").default} Image state.
   */
  getImageState() {
    return this.iconImage_.getImageState();
  }
  /**
   * @return {HTMLImageElement|HTMLCanvasElement|ImageBitmap} Image element.
   */
  getHitDetectionImage() {
    return this.iconImage_.getHitDetectionImage();
  }
  /**
   * Get the origin of the symbolizer.
   * @return {Array<number>} Origin.
   * @api
   */
  getOrigin() {
    if (this.origin_) {
      return this.origin_;
    }
    let offset = this.offset_;
    if (this.offsetOrigin_ != "top-left") {
      const size = this.getSize();
      const iconImageSize = this.iconImage_.getSize();
      if (!size || !iconImageSize) {
        return null;
      }
      offset = offset.slice();
      if (this.offsetOrigin_ == "top-right" || this.offsetOrigin_ == "bottom-right") {
        offset[0] = iconImageSize[0] - size[0] - offset[0];
      }
      if (this.offsetOrigin_ == "bottom-left" || this.offsetOrigin_ == "bottom-right") {
        offset[1] = iconImageSize[1] - size[1] - offset[1];
      }
    }
    this.origin_ = offset;
    return this.origin_;
  }
  /**
   * Get the image URL.
   * @return {string|undefined} Image src.
   * @api
   */
  getSrc() {
    return this.iconImage_.getSrc();
  }
  /**
   * Get the size of the icon (in pixels).
   * @return {import("../size.js").Size} Image size.
   * @api
   */
  getSize() {
    return !this.size_ ? this.iconImage_.getSize() : this.size_;
  }
  /**
   * Get the width of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon width (in pixels).
   * @api
   */
  getWidth() {
    const scale = this.getScaleArray();
    if (this.size_) {
      return this.size_[0] * scale[0];
    }
    if (this.iconImage_.getImageState() == ImageState_default.LOADED) {
      return this.iconImage_.getSize()[0] * scale[0];
    }
    return void 0;
  }
  /**
   * Get the height of the icon (in pixels). Will return undefined when the icon image is not yet loaded.
   * @return {number} Icon height (in pixels).
   * @api
   */
  getHeight() {
    const scale = this.getScaleArray();
    if (this.size_) {
      return this.size_[1] * scale[1];
    }
    if (this.iconImage_.getImageState() == ImageState_default.LOADED) {
      return this.iconImage_.getSize()[1] * scale[1];
    }
    return void 0;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size} scale Scale.
   * @api
   */
  setScale(scale) {
    delete this.initialOptions_;
    super.setScale(scale);
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  listenImageChange(listener) {
    this.iconImage_.addEventListener(EventType_default.CHANGE, listener);
  }
  /**
   * Load not yet loaded URI.
   * When rendering a feature with an icon style, the vector renderer will
   * automatically call this method. However, you might want to call this
   * method yourself for preloading or other purposes.
   * @api
   */
  load() {
    this.iconImage_.load();
  }
  /**
   * @param {function(import("../events/Event.js").default): void} listener Listener function.
   */
  unlistenImageChange(listener) {
    this.iconImage_.removeEventListener(EventType_default.CHANGE, listener);
  }
};
var Icon_default = Icon;

// node_modules/ol/style/Text.js
var DEFAULT_FILL_COLOR = "#333";
var Text = class _Text {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options || {};
    this.font_ = options.font;
    this.rotation_ = options.rotation;
    this.rotateWithView_ = options.rotateWithView;
    this.scale_ = options.scale;
    this.scaleArray_ = toSize(options.scale !== void 0 ? options.scale : 1);
    this.text_ = options.text;
    this.textAlign_ = options.textAlign;
    this.justify_ = options.justify;
    this.repeat_ = options.repeat;
    this.textBaseline_ = options.textBaseline;
    this.fill_ = options.fill !== void 0 ? options.fill : new Fill_default({ color: DEFAULT_FILL_COLOR });
    this.maxAngle_ = options.maxAngle !== void 0 ? options.maxAngle : Math.PI / 4;
    this.placement_ = options.placement !== void 0 ? options.placement : "point";
    this.overflow_ = !!options.overflow;
    this.stroke_ = options.stroke !== void 0 ? options.stroke : null;
    this.offsetX_ = options.offsetX !== void 0 ? options.offsetX : 0;
    this.offsetY_ = options.offsetY !== void 0 ? options.offsetY : 0;
    this.backgroundFill_ = options.backgroundFill ? options.backgroundFill : null;
    this.backgroundStroke_ = options.backgroundStroke ? options.backgroundStroke : null;
    this.padding_ = options.padding === void 0 ? null : options.padding;
  }
  /**
   * Clones the style.
   * @return {Text} The cloned style.
   * @api
   */
  clone() {
    const scale = this.getScale();
    return new _Text({
      font: this.getFont(),
      placement: this.getPlacement(),
      repeat: this.getRepeat(),
      maxAngle: this.getMaxAngle(),
      overflow: this.getOverflow(),
      rotation: this.getRotation(),
      rotateWithView: this.getRotateWithView(),
      scale: Array.isArray(scale) ? scale.slice() : scale,
      text: this.getText(),
      textAlign: this.getTextAlign(),
      justify: this.getJustify(),
      textBaseline: this.getTextBaseline(),
      fill: this.getFill() ? this.getFill().clone() : void 0,
      stroke: this.getStroke() ? this.getStroke().clone() : void 0,
      offsetX: this.getOffsetX(),
      offsetY: this.getOffsetY(),
      backgroundFill: this.getBackgroundFill() ? this.getBackgroundFill().clone() : void 0,
      backgroundStroke: this.getBackgroundStroke() ? this.getBackgroundStroke().clone() : void 0,
      padding: this.getPadding() || void 0
    });
  }
  /**
   * Get the `overflow` configuration.
   * @return {boolean} Let text overflow the length of the path they follow.
   * @api
   */
  getOverflow() {
    return this.overflow_;
  }
  /**
   * Get the font name.
   * @return {string|undefined} Font.
   * @api
   */
  getFont() {
    return this.font_;
  }
  /**
   * Get the maximum angle between adjacent characters.
   * @return {number} Angle in radians.
   * @api
   */
  getMaxAngle() {
    return this.maxAngle_;
  }
  /**
   * Get the label placement.
   * @return {TextPlacement} Text placement.
   * @api
   */
  getPlacement() {
    return this.placement_;
  }
  /**
   * Get the repeat interval of the text.
   * @return {number|undefined} Repeat interval in pixels.
   * @api
   */
  getRepeat() {
    return this.repeat_;
  }
  /**
   * Get the x-offset for the text.
   * @return {number} Horizontal text offset.
   * @api
   */
  getOffsetX() {
    return this.offsetX_;
  }
  /**
   * Get the y-offset for the text.
   * @return {number} Vertical text offset.
   * @api
   */
  getOffsetY() {
    return this.offsetY_;
  }
  /**
   * Get the fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getFill() {
    return this.fill_;
  }
  /**
   * Determine whether the text rotates with the map.
   * @return {boolean|undefined} Rotate with map.
   * @api
   */
  getRotateWithView() {
    return this.rotateWithView_;
  }
  /**
   * Get the text rotation.
   * @return {number|undefined} Rotation.
   * @api
   */
  getRotation() {
    return this.rotation_;
  }
  /**
   * Get the text scale.
   * @return {number|import("../size.js").Size|undefined} Scale.
   * @api
   */
  getScale() {
    return this.scale_;
  }
  /**
   * Get the symbolizer scale array.
   * @return {import("../size.js").Size} Scale array.
   */
  getScaleArray() {
    return this.scaleArray_;
  }
  /**
   * Get the stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getStroke() {
    return this.stroke_;
  }
  /**
   * Get the text to be rendered.
   * @return {string|Array<string>|undefined} Text.
   * @api
   */
  getText() {
    return this.text_;
  }
  /**
   * Get the text alignment.
   * @return {CanvasTextAlign|undefined} Text align.
   * @api
   */
  getTextAlign() {
    return this.textAlign_;
  }
  /**
   * Get the justification.
   * @return {TextJustify|undefined} Justification.
   * @api
   */
  getJustify() {
    return this.justify_;
  }
  /**
   * Get the text baseline.
   * @return {CanvasTextBaseline|undefined} Text baseline.
   * @api
   */
  getTextBaseline() {
    return this.textBaseline_;
  }
  /**
   * Get the background fill style for the text.
   * @return {import("./Fill.js").default|null} Fill style.
   * @api
   */
  getBackgroundFill() {
    return this.backgroundFill_;
  }
  /**
   * Get the background stroke style for the text.
   * @return {import("./Stroke.js").default|null} Stroke style.
   * @api
   */
  getBackgroundStroke() {
    return this.backgroundStroke_;
  }
  /**
   * Get the padding for the text.
   * @return {Array<number>|null} Padding.
   * @api
   */
  getPadding() {
    return this.padding_;
  }
  /**
   * Set the `overflow` property.
   *
   * @param {boolean} overflow Let text overflow the path that it follows.
   * @api
   */
  setOverflow(overflow) {
    this.overflow_ = overflow;
  }
  /**
   * Set the font.
   *
   * @param {string|undefined} font Font.
   * @api
   */
  setFont(font) {
    this.font_ = font;
  }
  /**
   * Set the maximum angle between adjacent characters.
   *
   * @param {number} maxAngle Angle in radians.
   * @api
   */
  setMaxAngle(maxAngle) {
    this.maxAngle_ = maxAngle;
  }
  /**
   * Set the x offset.
   *
   * @param {number} offsetX Horizontal text offset.
   * @api
   */
  setOffsetX(offsetX) {
    this.offsetX_ = offsetX;
  }
  /**
   * Set the y offset.
   *
   * @param {number} offsetY Vertical text offset.
   * @api
   */
  setOffsetY(offsetY) {
    this.offsetY_ = offsetY;
  }
  /**
   * Set the text placement.
   *
   * @param {TextPlacement} placement Placement.
   * @api
   */
  setPlacement(placement) {
    this.placement_ = placement;
  }
  /**
   * Set the repeat interval of the text.
   * @param {number|undefined} [repeat] Repeat interval in pixels.
   * @api
   */
  setRepeat(repeat) {
    this.repeat_ = repeat;
  }
  /**
   * Set whether to rotate the text with the view.
   *
   * @param {boolean} rotateWithView Rotate with map.
   * @api
   */
  setRotateWithView(rotateWithView) {
    this.rotateWithView_ = rotateWithView;
  }
  /**
   * Set the fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setFill(fill) {
    this.fill_ = fill;
  }
  /**
   * Set the rotation.
   *
   * @param {number|undefined} rotation Rotation.
   * @api
   */
  setRotation(rotation) {
    this.rotation_ = rotation;
  }
  /**
   * Set the scale.
   *
   * @param {number|import("../size.js").Size|undefined} scale Scale.
   * @api
   */
  setScale(scale) {
    this.scale_ = scale;
    this.scaleArray_ = toSize(scale !== void 0 ? scale : 1);
  }
  /**
   * Set the stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setStroke(stroke) {
    this.stroke_ = stroke;
  }
  /**
   * Set the text.
   *
   * @param {string|Array<string>|undefined} text Text.
   * @api
   */
  setText(text) {
    this.text_ = text;
  }
  /**
   * Set the text alignment.
   *
   * @param {CanvasTextAlign|undefined} textAlign Text align.
   * @api
   */
  setTextAlign(textAlign) {
    this.textAlign_ = textAlign;
  }
  /**
   * Set the justification.
   *
   * @param {TextJustify|undefined} justify Justification.
   * @api
   */
  setJustify(justify) {
    this.justify_ = justify;
  }
  /**
   * Set the text baseline.
   *
   * @param {CanvasTextBaseline|undefined} textBaseline Text baseline.
   * @api
   */
  setTextBaseline(textBaseline) {
    this.textBaseline_ = textBaseline;
  }
  /**
   * Set the background fill.
   *
   * @param {import("./Fill.js").default|null} fill Fill style.
   * @api
   */
  setBackgroundFill(fill) {
    this.backgroundFill_ = fill;
  }
  /**
   * Set the background stroke.
   *
   * @param {import("./Stroke.js").default|null} stroke Stroke style.
   * @api
   */
  setBackgroundStroke(stroke) {
    this.backgroundStroke_ = stroke;
  }
  /**
   * Set the padding (`[top, right, bottom, left]`).
   *
   * @param {Array<number>|null} padding Padding.
   * @api
   */
  setPadding(padding) {
    this.padding_ = padding;
  }
};
var Text_default = Text;

// node_modules/ol/expr/expression.js
var numTypes = 0;
var NoneType = 0;
var BooleanType = 1 << numTypes++;
var NumberType = 1 << numTypes++;
var StringType = 1 << numTypes++;
var ColorType = 1 << numTypes++;
var NumberArrayType = 1 << numTypes++;
var AnyType = Math.pow(2, numTypes) - 1;
var typeNames = {
  [BooleanType]: "boolean",
  [NumberType]: "number",
  [StringType]: "string",
  [ColorType]: "color",
  [NumberArrayType]: "number[]"
};
var namedTypes = Object.keys(typeNames).map(Number).sort(ascending);
function typeName(type) {
  const names = [];
  for (const namedType of namedTypes) {
    if (includesType(type, namedType)) {
      names.push(typeNames[namedType]);
    }
  }
  if (names.length === 0) {
    return "untyped";
  }
  if (names.length < 3) {
    return names.join(" or ");
  }
  return names.slice(0, -1).join(", ") + ", or " + names[names.length - 1];
}
function includesType(broad, specific) {
  return (broad & specific) === specific;
}
function overlapsType(oneType, otherType) {
  return !!(oneType & otherType);
}
function isType(type, expected) {
  return type === expected;
}
var LiteralExpression = class {
  /**
   * @param {number} type The value type.
   * @param {LiteralValue} value The literal value.
   */
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
};
var CallExpression = class {
  /**
   * @param {number} type The return type.
   * @param {string} operator The operator.
   * @param {...Expression} args The arguments.
   */
  constructor(type, operator, ...args) {
    this.type = type;
    this.operator = operator;
    this.args = args;
  }
};
function newParsingContext() {
  return {
    variables: /* @__PURE__ */ new Set(),
    properties: /* @__PURE__ */ new Set(),
    featureId: false,
    style: {}
  };
}
function getTypeFromHint(typeHint) {
  switch (typeHint) {
    case "string":
      return StringType;
    case "color":
      return ColorType;
    case "number":
      return NumberType;
    case "boolean":
      return BooleanType;
    case "number[]":
      return NumberArrayType;
    default:
      throw new Error(`Unrecognized type hint: ${typeHint}`);
  }
}
function parse(encoded, context, typeHint) {
  switch (typeof encoded) {
    case "boolean": {
      return new LiteralExpression(BooleanType, encoded);
    }
    case "number": {
      return new LiteralExpression(NumberType, encoded);
    }
    case "string": {
      let type2 = StringType;
      if (isStringColor(encoded)) {
        type2 |= ColorType;
      }
      if (!isType(type2 & typeHint, NoneType)) {
        type2 &= typeHint;
      }
      return new LiteralExpression(type2, encoded);
    }
    default: {
    }
  }
  if (!Array.isArray(encoded)) {
    throw new Error("Expression must be an array or a primitive value");
  }
  if (encoded.length === 0) {
    throw new Error("Empty expression");
  }
  if (typeof encoded[0] === "string") {
    return parseCallExpression(encoded, context, typeHint);
  }
  for (const item of encoded) {
    if (typeof item !== "number") {
      throw new Error("Expected an array of numbers");
    }
  }
  let type = NumberArrayType;
  if (encoded.length === 3 || encoded.length === 4) {
    type |= ColorType;
  }
  if (typeHint) {
    type &= typeHint;
  }
  return new LiteralExpression(type, encoded);
}
var Ops = {
  Get: "get",
  Var: "var",
  Concat: "concat",
  GeometryType: "geometry-type",
  Any: "any",
  All: "all",
  Not: "!",
  Resolution: "resolution",
  Zoom: "zoom",
  Time: "time",
  Equal: "==",
  NotEqual: "!=",
  GreaterThan: ">",
  GreaterThanOrEqualTo: ">=",
  LessThan: "<",
  LessThanOrEqualTo: "<=",
  Multiply: "*",
  Divide: "/",
  Add: "+",
  Subtract: "-",
  Clamp: "clamp",
  Mod: "%",
  Pow: "^",
  Abs: "abs",
  Floor: "floor",
  Ceil: "ceil",
  Round: "round",
  Sin: "sin",
  Cos: "cos",
  Atan: "atan",
  Sqrt: "sqrt",
  Match: "match",
  Between: "between",
  Interpolate: "interpolate",
  Case: "case",
  In: "in",
  Number: "number",
  String: "string",
  Array: "array",
  Color: "color",
  Id: "id",
  Band: "band",
  Palette: "palette"
};
var parsers = {
  [Ops.Get]: createParser(
    ([_, typeHint]) => {
      if (typeHint !== void 0) {
        return getTypeFromHint(
          /** @type {string} */
          /** @type {LiteralExpression} */
          typeHint.value
        );
      }
      return AnyType;
    },
    withArgsCount(1, 2),
    withGetArgs
  ),
  [Ops.Var]: createParser(
    ([firstArg]) => firstArg.type,
    withArgsCount(1, 1),
    withVarArgs
  ),
  [Ops.Id]: createParser(NumberType | StringType, withNoArgs, usesFeatureId),
  [Ops.Concat]: createParser(
    StringType,
    withArgsCount(2, Infinity),
    parseArgsOfType(AnyType)
  ),
  [Ops.GeometryType]: createParser(StringType, withNoArgs),
  [Ops.Resolution]: createParser(NumberType, withNoArgs),
  [Ops.Zoom]: createParser(NumberType, withNoArgs),
  [Ops.Time]: createParser(NumberType, withNoArgs),
  [Ops.Any]: createParser(
    BooleanType,
    withArgsCount(2, Infinity),
    parseArgsOfType(BooleanType)
  ),
  [Ops.All]: createParser(
    BooleanType,
    withArgsCount(2, Infinity),
    parseArgsOfType(BooleanType)
  ),
  [Ops.Not]: createParser(
    BooleanType,
    withArgsCount(1, 1),
    parseArgsOfType(BooleanType)
  ),
  [Ops.Equal]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.NotEqual]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.GreaterThan]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.GreaterThanOrEqualTo]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.LessThan]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.LessThanOrEqualTo]: createParser(
    BooleanType,
    withArgsCount(2, 2),
    parseArgsOfType(AnyType),
    narrowArgsType
  ),
  [Ops.Multiply]: createParser(
    (parsedArgs) => {
      let outputType = NumberType | ColorType;
      for (let i = 0; i < parsedArgs.length; i++) {
        outputType &= parsedArgs[i].type;
      }
      return outputType;
    },
    withArgsCount(2, Infinity),
    parseArgsOfType(NumberType | ColorType),
    narrowArgsType
  ),
  [Ops.Divide]: createParser(
    NumberType,
    withArgsCount(2, 2),
    parseArgsOfType(NumberType)
  ),
  [Ops.Add]: createParser(
    NumberType,
    withArgsCount(2, Infinity),
    parseArgsOfType(NumberType)
  ),
  [Ops.Subtract]: createParser(
    NumberType,
    withArgsCount(2, 2),
    parseArgsOfType(NumberType)
  ),
  [Ops.Clamp]: createParser(
    NumberType,
    withArgsCount(3, 3),
    parseArgsOfType(NumberType)
  ),
  [Ops.Mod]: createParser(
    NumberType,
    withArgsCount(2, 2),
    parseArgsOfType(NumberType)
  ),
  [Ops.Pow]: createParser(
    NumberType,
    withArgsCount(2, 2),
    parseArgsOfType(NumberType)
  ),
  [Ops.Abs]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Floor]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Ceil]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Round]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Sin]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Cos]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Atan]: createParser(
    NumberType,
    withArgsCount(1, 2),
    parseArgsOfType(NumberType)
  ),
  [Ops.Sqrt]: createParser(
    NumberType,
    withArgsCount(1, 1),
    parseArgsOfType(NumberType)
  ),
  [Ops.Match]: createParser(
    (parsedArgs) => {
      let type = AnyType;
      for (let i = 2; i < parsedArgs.length; i += 2) {
        type &= parsedArgs[i].type;
      }
      type &= parsedArgs[parsedArgs.length - 1].type;
      return type;
    },
    withArgsCount(4, Infinity),
    withEvenArgs,
    parseMatchArgs
  ),
  [Ops.Between]: createParser(
    BooleanType,
    withArgsCount(3, 3),
    parseArgsOfType(NumberType)
  ),
  [Ops.Interpolate]: createParser(
    (parsedArgs) => {
      let type = ColorType | NumberType;
      for (let i = 3; i < parsedArgs.length; i += 2) {
        type &= parsedArgs[i].type;
      }
      return type;
    },
    withArgsCount(6, Infinity),
    withEvenArgs,
    parseInterpolateArgs
  ),
  [Ops.Case]: createParser(
    (parsedArgs) => {
      let type = AnyType;
      for (let i = 1; i < parsedArgs.length; i += 2) {
        type &= parsedArgs[i].type;
      }
      type &= parsedArgs[parsedArgs.length - 1].type;
      return type;
    },
    withArgsCount(3, Infinity),
    withOddArgs,
    parseCaseArgs
  ),
  [Ops.In]: createParser(BooleanType, withArgsCount(2, 2), parseInArgs),
  [Ops.Number]: createParser(
    NumberType,
    withArgsCount(1, Infinity),
    parseArgsOfType(AnyType)
  ),
  [Ops.String]: createParser(
    StringType,
    withArgsCount(1, Infinity),
    parseArgsOfType(AnyType)
  ),
  [Ops.Array]: createParser(
    (parsedArgs) => {
      return parsedArgs.length === 3 || parsedArgs.length === 4 ? NumberArrayType | ColorType : NumberArrayType;
    },
    withArgsCount(1, Infinity),
    parseArgsOfType(NumberType)
  ),
  [Ops.Color]: createParser(
    ColorType,
    withArgsCount(3, 4),
    parseArgsOfType(NumberType)
  ),
  [Ops.Band]: createParser(
    NumberType,
    withArgsCount(1, 3),
    parseArgsOfType(NumberType)
  ),
  [Ops.Palette]: createParser(ColorType, withArgsCount(2, 2), parsePaletteArgs)
};
function withGetArgs(encoded, context) {
  const arg = parse(encoded[1], context);
  if (!(arg instanceof LiteralExpression)) {
    throw new Error("Expected a literal argument for get operation");
  }
  if (typeof arg.value !== "string") {
    throw new Error("Expected a string argument for get operation");
  }
  context.properties.add(arg.value);
  if (encoded.length === 3) {
    const hint = parse(encoded[2], context);
    return [arg, hint];
  }
  return [arg];
}
function withVarArgs(encoded, context, parsedArgs, typeHint) {
  const varName = encoded[1];
  if (typeof varName !== "string") {
    throw new Error("Expected a string argument for var operation");
  }
  context.variables.add(varName);
  if (!("variables" in context.style) || context.style.variables[varName] === void 0) {
    return [new LiteralExpression(AnyType, varName)];
  }
  const initialValue = context.style.variables[varName];
  const arg = (
    /** @type {LiteralExpression} */
    parse(initialValue, context)
  );
  arg.value = varName;
  if (typeHint && !overlapsType(typeHint, arg.type)) {
    throw new Error(
      `The variable ${varName} has type ${typeName(
        arg.type
      )} but the following type was expected: ${typeName(typeHint)}`
    );
  }
  return [arg];
}
function usesFeatureId(encoded, context) {
  context.featureId = true;
}
function withNoArgs(encoded, context) {
  const operation = encoded[0];
  if (encoded.length !== 1) {
    throw new Error(`Expected no arguments for ${operation} operation`);
  }
  return [];
}
function withArgsCount(minArgs, maxArgs) {
  return function(encoded, context) {
    const operation = encoded[0];
    const argCount = encoded.length - 1;
    if (minArgs === maxArgs) {
      if (argCount !== minArgs) {
        const plural = minArgs === 1 ? "" : "s";
        throw new Error(
          `Expected ${minArgs} argument${plural} for ${operation}, got ${argCount}`
        );
      }
    } else if (argCount < minArgs || argCount > maxArgs) {
      const range = maxArgs === Infinity ? `${minArgs} or more` : `${minArgs} to ${maxArgs}`;
      throw new Error(
        `Expected ${range} arguments for ${operation}, got ${argCount}`
      );
    }
  };
}
function parseArgsOfType(argType) {
  return function(encoded, context) {
    const operation = encoded[0];
    const argCount = encoded.length - 1;
    const args = new Array(argCount);
    for (let i = 0; i < argCount; ++i) {
      const expression = parse(encoded[i + 1], context);
      if (!overlapsType(argType, expression.type)) {
        const gotType = typeName(argType);
        const expectedType = typeName(expression.type);
        throw new Error(
          `Unexpected type for argument ${i} of ${operation} operation, got ${gotType} but expected ${expectedType}`
        );
      }
      expression.type &= argType;
      args[i] = expression;
    }
    return args;
  };
}
function narrowArgsType(encoded, context, parsedArgs) {
  const operation = encoded[0];
  const argCount = encoded.length - 1;
  let sameType = AnyType;
  for (let i = 0; i < parsedArgs.length; ++i) {
    sameType &= parsedArgs[i].type;
  }
  if (sameType === NoneType) {
    throw new Error(
      `No common type could be found for arguments of ${operation} operation`
    );
  }
  const args = new Array(argCount);
  for (let i = 0; i < argCount; ++i) {
    args[i] = parse(encoded[i + 1], context, sameType);
  }
  return args;
}
function withOddArgs(encoded, context) {
  const operation = encoded[0];
  const argCount = encoded.length - 1;
  if (argCount % 2 === 0) {
    throw new Error(
      `An odd amount of arguments was expected for operation ${operation}, got ${JSON.stringify(
        argCount
      )} instead`
    );
  }
}
function withEvenArgs(encoded, context) {
  const operation = encoded[0];
  const argCount = encoded.length - 1;
  if (argCount % 2 === 1) {
    throw new Error(
      `An even amount of arguments was expected for operation ${operation}, got ${JSON.stringify(
        argCount
      )} instead`
    );
  }
}
function parseMatchArgs(encoded, context, parsedArgs, typeHint) {
  const argsCount = encoded.length - 1;
  const input = parse(encoded[1], context);
  let inputType = input.type;
  const fallback = parse(encoded[encoded.length - 1], context);
  let outputType = typeHint !== void 0 ? typeHint & fallback.type : fallback.type;
  const args = new Array(argsCount - 2);
  for (let i = 0; i < argsCount - 2; i += 2) {
    const match = parse(encoded[i + 2], context);
    const output = parse(encoded[i + 3], context);
    inputType &= match.type;
    outputType &= output.type;
    args[i] = match;
    args[i + 1] = output;
  }
  const expectedInputType = StringType | NumberType | BooleanType;
  if (!overlapsType(expectedInputType, inputType)) {
    throw new Error(
      `Expected an input of type ${typeName(
        expectedInputType
      )} for the interpolate operation, got ${typeName(inputType)} instead`
    );
  }
  if (isType(outputType, NoneType)) {
    throw new Error(
      `Could not find a common output type for the following match operation: ` + JSON.stringify(encoded)
    );
  }
  for (let i = 0; i < argsCount - 2; i += 2) {
    const match = parse(encoded[i + 2], context, inputType);
    const output = parse(encoded[i + 3], context, outputType);
    args[i] = match;
    args[i + 1] = output;
  }
  return [
    parse(encoded[1], context, inputType),
    ...args,
    parse(encoded[encoded.length - 1], context, outputType)
  ];
}
function parseInterpolateArgs(encoded, context, parsedArgs, typeHint) {
  const interpolationType = encoded[1];
  let interpolation;
  switch (interpolationType[0]) {
    case "linear":
      interpolation = 1;
      break;
    case "exponential":
      interpolation = interpolationType[1];
      if (typeof interpolation !== "number") {
        throw new Error(
          `Expected a number base for exponential interpolation, got ${JSON.stringify(interpolation)} instead`
        );
      }
      break;
    default:
      interpolation = null;
  }
  if (!interpolation) {
    throw new Error(
      `Invalid interpolation type: ${JSON.stringify(interpolationType)}`
    );
  }
  interpolation = parse(interpolation, context);
  let input = parse(encoded[2], context);
  if (!overlapsType(NumberType, input.type)) {
    throw new Error(
      `Expected an input of type number for the interpolate operation, got ${typeName(input.type)} instead`
    );
  }
  input = parse(encoded[2], context, NumberType);
  const args = new Array(encoded.length - 3);
  for (let i = 0; i < args.length; i += 2) {
    let stop = parse(encoded[i + 3], context);
    if (!overlapsType(NumberType, stop.type)) {
      throw new Error(
        `Expected all stop input values in the interpolate operation to be of type number, got ${typeName(stop.type)} at position ${i + 2} instead`
      );
    }
    let output = parse(encoded[i + 4], context);
    if (!overlapsType(NumberType | ColorType, output.type)) {
      throw new Error(
        `Expected all stop output values in the interpolate operation to be a number or color, got ${typeName(output.type)} at position ${i + 3} instead`
      );
    }
    stop = parse(encoded[i + 3], context, NumberType);
    output = parse(encoded[i + 4], context, NumberType | ColorType);
    args[i] = stop;
    args[i + 1] = output;
  }
  return [interpolation, input, ...args];
}
function parseCaseArgs(encoded, context, parsedArgs, typeHint) {
  const fallback = parse(encoded[encoded.length - 1], context);
  let outputType = typeHint !== void 0 ? typeHint & fallback.type : fallback.type;
  const args = new Array(encoded.length - 1);
  for (let i = 0; i < args.length - 1; i += 2) {
    const condition = parse(encoded[i + 1], context);
    const output = parse(encoded[i + 2], context);
    if (!overlapsType(BooleanType, condition.type)) {
      throw new Error(
        `Expected all conditions in the case operation to be of type boolean, got ${typeName(condition.type)} at position ${i} instead`
      );
    }
    outputType &= output.type;
    args[i] = condition;
    args[i + 1] = output;
  }
  if (isType(outputType, NoneType)) {
    throw new Error(
      `Could not find a common output type for the following case operation: ` + JSON.stringify(encoded)
    );
  }
  for (let i = 0; i < args.length - 1; i += 2) {
    args[i + 1] = parse(encoded[i + 2], context, outputType);
  }
  args[args.length - 1] = parse(
    encoded[encoded.length - 1],
    context,
    outputType
  );
  return args;
}
function parseInArgs(encoded, context) {
  let haystack = (
    /** @type {any} */
    encoded[2]
  );
  if (!Array.isArray(haystack)) {
    throw new Error(
      `The "in" operator was provided a literal value which was not an array as second argument.`
    );
  }
  if (typeof haystack[0] === "string") {
    if (haystack[0] !== "literal") {
      throw new Error(
        `For the "in" operator, a string array should be wrapped in a "literal" operator to disambiguate from expressions.`
      );
    }
    if (!Array.isArray(haystack[1])) {
      throw new Error(
        `The "in" operator was provided a literal value which was not an array as second argument.`
      );
    }
    haystack = haystack[1];
  }
  let needleType = StringType | NumberType;
  const args = new Array(haystack.length);
  for (let i = 0; i < args.length; i++) {
    const arg = parse(haystack[i], context);
    needleType &= arg.type;
    args[i] = arg;
  }
  if (isType(needleType, NoneType)) {
    throw new Error(
      `Could not find a common type for the following in operation: ` + JSON.stringify(encoded)
    );
  }
  const needle = parse(encoded[1], context, needleType);
  return [needle, ...args];
}
function parsePaletteArgs(encoded, context) {
  const index = parse(encoded[1], context, NumberType);
  if (index.type !== NumberType) {
    throw new Error(
      `The first argument of palette must be an number, got ${typeName(
        index.type
      )} instead`
    );
  }
  const colors = encoded[2];
  if (!Array.isArray(colors)) {
    throw new Error("The second argument of palette must be an array");
  }
  const parsedColors = new Array(colors.length);
  for (let i = 0; i < parsedColors.length; i++) {
    const color = parse(colors[i], context, ColorType);
    if (!(color instanceof LiteralExpression)) {
      throw new Error(
        `The palette color at index ${i} must be a literal value`
      );
    }
    if (!overlapsType(color.type, ColorType)) {
      throw new Error(
        `The palette color at index ${i} should be of type color, got ${typeName(
          color.type
        )} instead`
      );
    }
    parsedColors[i] = color;
  }
  return [index, ...parsedColors];
}
function createParser(returnType, ...argValidators) {
  return function(encoded, context, typeHint) {
    const operator = encoded[0];
    let parsedArgs = [];
    for (let i = 0; i < argValidators.length; i++) {
      parsedArgs = argValidators[i](encoded, context, parsedArgs, typeHint) || parsedArgs;
    }
    let actualType = typeof returnType === "function" ? returnType(parsedArgs) : returnType;
    if (typeHint !== void 0) {
      if (!overlapsType(actualType, typeHint)) {
        throw new Error(
          `The following expression was expected to return ${typeName(
            typeHint
          )}, but returns ${typeName(actualType)} instead: ${JSON.stringify(
            encoded
          )}`
        );
      }
      actualType &= typeHint;
    }
    if (actualType === NoneType) {
      throw new Error(
        `No matching type was found for the following expression: ${JSON.stringify(
          encoded
        )}`
      );
    }
    return new CallExpression(actualType, operator, ...parsedArgs);
  };
}
function parseCallExpression(encoded, context, typeHint) {
  const operator = encoded[0];
  const parser = parsers[operator];
  if (!parser) {
    throw new Error(`Unknown operator: ${operator}`);
  }
  return parser(encoded, context, typeHint);
}

// node_modules/ol/expr/cpu.js
function newEvaluationContext() {
  return {
    variables: {},
    properties: {},
    resolution: NaN,
    featureId: null
  };
}
function buildExpression(encoded, type, context) {
  const expression = parse(encoded, context);
  if (!overlapsType(type, expression.type)) {
    const expected = typeName(type);
    const actual = typeName(expression.type);
    throw new Error(
      `Expected expression to be of type ${expected}, got ${actual}`
    );
  }
  return compileExpression(expression, context);
}
function compileExpression(expression, context) {
  if (expression instanceof LiteralExpression) {
    if (expression.type === ColorType && typeof expression.value === "string") {
      const colorValue = fromString(expression.value);
      return function() {
        return colorValue;
      };
    }
    return function() {
      return expression.value;
    };
  }
  const operator = expression.operator;
  switch (operator) {
    case Ops.Number:
    case Ops.String: {
      return compileAssertionExpression(expression, context);
    }
    case Ops.Get:
    case Ops.Var: {
      return compileAccessorExpression(expression, context);
    }
    case Ops.Id: {
      return (expression2) => expression2.featureId;
    }
    case Ops.Concat: {
      const args = expression.args.map((e) => compileExpression(e, context));
      return (context2) => "".concat(...args.map((arg) => arg(context2).toString()));
    }
    case Ops.Resolution: {
      return (context2) => context2.resolution;
    }
    case Ops.Any:
    case Ops.All:
    case Ops.Not: {
      return compileLogicalExpression(expression, context);
    }
    case Ops.Equal:
    case Ops.NotEqual:
    case Ops.LessThan:
    case Ops.LessThanOrEqualTo:
    case Ops.GreaterThan:
    case Ops.GreaterThanOrEqualTo: {
      return compileComparisonExpression(expression, context);
    }
    case Ops.Multiply:
    case Ops.Divide:
    case Ops.Add:
    case Ops.Subtract:
    case Ops.Clamp:
    case Ops.Mod:
    case Ops.Pow:
    case Ops.Abs:
    case Ops.Floor:
    case Ops.Ceil:
    case Ops.Round:
    case Ops.Sin:
    case Ops.Cos:
    case Ops.Atan:
    case Ops.Sqrt: {
      return compileNumericExpression(expression, context);
    }
    case Ops.Match: {
      return compileMatchExpression(expression, context);
    }
    case Ops.Interpolate: {
      return compileInterpolateExpression(expression, context);
    }
    default: {
      throw new Error(`Unsupported operator ${operator}`);
    }
  }
}
function compileAssertionExpression(expression, context) {
  const type = expression.operator;
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  switch (type) {
    case Ops.Number:
    case Ops.String: {
      return (context2) => {
        for (let i = 0; i < length; ++i) {
          const value = args[i](context2);
          if (typeof value === type) {
            return value;
          }
        }
        throw new Error(`Expected one of the values to be a ${type}`);
      };
    }
    default: {
      throw new Error(`Unsupported assertion operator ${type}`);
    }
  }
}
function compileAccessorExpression(expression, context) {
  const nameExpression = (
    /** @type {LiteralExpression} */
    expression.args[0]
  );
  const name = (
    /** @type {string} */
    nameExpression.value
  );
  switch (expression.operator) {
    case Ops.Get: {
      return (context2) => context2.properties[name];
    }
    case Ops.Var: {
      return (context2) => context2.variables[name];
    }
    default: {
      throw new Error(`Unsupported accessor operator ${expression.operator}`);
    }
  }
}
function compileComparisonExpression(expression, context) {
  const op = expression.operator;
  const left = compileExpression(expression.args[0], context);
  const right = compileExpression(expression.args[1], context);
  switch (op) {
    case Ops.Equal: {
      return (context2) => left(context2) === right(context2);
    }
    case Ops.NotEqual: {
      return (context2) => left(context2) !== right(context2);
    }
    case Ops.LessThan: {
      return (context2) => left(context2) < right(context2);
    }
    case Ops.LessThanOrEqualTo: {
      return (context2) => left(context2) <= right(context2);
    }
    case Ops.GreaterThan: {
      return (context2) => left(context2) > right(context2);
    }
    case Ops.GreaterThanOrEqualTo: {
      return (context2) => left(context2) >= right(context2);
    }
    default: {
      throw new Error(`Unsupported comparison operator ${op}`);
    }
  }
}
function compileLogicalExpression(expression, context) {
  const op = expression.operator;
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  switch (op) {
    case Ops.Any: {
      return (context2) => {
        for (let i = 0; i < length; ++i) {
          if (args[i](context2)) {
            return true;
          }
        }
        return false;
      };
    }
    case Ops.All: {
      return (context2) => {
        for (let i = 0; i < length; ++i) {
          if (!args[i](context2)) {
            return false;
          }
        }
        return true;
      };
    }
    case Ops.Not: {
      return (context2) => !args[0](context2);
    }
    default: {
      throw new Error(`Unsupported logical operator ${op}`);
    }
  }
}
function compileNumericExpression(expression, context) {
  const op = expression.operator;
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  switch (op) {
    case Ops.Multiply: {
      return (context2) => {
        let value = 1;
        for (let i = 0; i < length; ++i) {
          value *= args[i](context2);
        }
        return value;
      };
    }
    case Ops.Divide: {
      return (context2) => args[0](context2) / args[1](context2);
    }
    case Ops.Add: {
      return (context2) => {
        let value = 0;
        for (let i = 0; i < length; ++i) {
          value += args[i](context2);
        }
        return value;
      };
    }
    case Ops.Subtract: {
      return (context2) => args[0](context2) - args[1](context2);
    }
    case Ops.Clamp: {
      return (context2) => {
        const value = args[0](context2);
        const min = args[1](context2);
        if (value < min) {
          return min;
        }
        const max = args[2](context2);
        if (value > max) {
          return max;
        }
        return value;
      };
    }
    case Ops.Mod: {
      return (context2) => args[0](context2) % args[1](context2);
    }
    case Ops.Pow: {
      return (context2) => Math.pow(args[0](context2), args[1](context2));
    }
    case Ops.Abs: {
      return (context2) => Math.abs(args[0](context2));
    }
    case Ops.Floor: {
      return (context2) => Math.floor(args[0](context2));
    }
    case Ops.Ceil: {
      return (context2) => Math.ceil(args[0](context2));
    }
    case Ops.Round: {
      return (context2) => Math.round(args[0](context2));
    }
    case Ops.Sin: {
      return (context2) => Math.sin(args[0](context2));
    }
    case Ops.Cos: {
      return (context2) => Math.cos(args[0](context2));
    }
    case Ops.Atan: {
      if (length === 2) {
        return (context2) => Math.atan2(args[0](context2), args[1](context2));
      }
      return (context2) => Math.atan(args[0](context2));
    }
    case Ops.Sqrt: {
      return (context2) => Math.sqrt(args[0](context2));
    }
    default: {
      throw new Error(`Unsupported numeric operator ${op}`);
    }
  }
}
function compileMatchExpression(expression, context) {
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  return (context2) => {
    const value = args[0](context2);
    for (let i = 1; i < length; i += 2) {
      if (value === args[i](context2)) {
        return args[i + 1](context2);
      }
    }
    return args[length - 1](context2);
  };
}
function compileInterpolateExpression(expression, context) {
  const length = expression.args.length;
  const args = new Array(length);
  for (let i = 0; i < length; ++i) {
    args[i] = compileExpression(expression.args[i], context);
  }
  return (context2) => {
    const base = args[0](context2);
    const value = args[1](context2);
    let previousInput;
    let previousOutput;
    for (let i = 2; i < length; i += 2) {
      const input = args[i](context2);
      let output = args[i + 1](context2);
      const isColor = Array.isArray(output);
      if (isColor) {
        output = withAlpha(output);
      }
      if (input >= value) {
        if (i === 2) {
          return output;
        }
        if (isColor) {
          return interpolateColor(
            base,
            value,
            previousInput,
            previousOutput,
            input,
            output
          );
        }
        return interpolateNumber(
          base,
          value,
          previousInput,
          previousOutput,
          input,
          output
        );
      }
      previousInput = input;
      previousOutput = output;
    }
    return previousOutput;
  };
}
function interpolateNumber(base, value, input1, output1, input2, output2) {
  const delta = input2 - input1;
  if (delta === 0) {
    return output1;
  }
  const along = value - input1;
  const factor = base === 1 ? along / delta : (Math.pow(base, along) - 1) / (Math.pow(base, delta) - 1);
  return output1 + factor * (output2 - output1);
}
function interpolateColor(base, value, input1, rgba1, input2, rgba2) {
  const delta = input2 - input1;
  if (delta === 0) {
    return rgba1;
  }
  const lcha1 = rgbaToLcha(rgba1);
  const lcha2 = rgbaToLcha(rgba2);
  let deltaHue = lcha2[2] - lcha1[2];
  if (deltaHue > 180) {
    deltaHue -= 360;
  } else if (deltaHue < -180) {
    deltaHue += 360;
  }
  const lcha = [
    interpolateNumber(base, value, input1, lcha1[0], input2, lcha2[0]),
    interpolateNumber(base, value, input1, lcha1[1], input2, lcha2[1]),
    lcha1[2] + interpolateNumber(base, value, input1, 0, input2, deltaHue),
    interpolateNumber(base, value, input1, rgba1[3], input2, rgba2[3])
  ];
  return normalize(lchaToRgba(lcha));
}

// node_modules/ol/render/canvas/style.js
function always(context) {
  return true;
}
function rulesToStyleFunction(rules) {
  const parsingContext = newParsingContext();
  const evaluator = buildRuleSet(rules, parsingContext);
  const evaluationContext = newEvaluationContext();
  return function(feature, resolution) {
    evaluationContext.properties = feature.getPropertiesInternal();
    evaluationContext.resolution = resolution;
    if (parsingContext.featureId) {
      const id = feature.getId();
      if (id !== void 0) {
        evaluationContext.featureId = id;
      } else {
        evaluationContext.featureId = null;
      }
    }
    return evaluator(evaluationContext);
  };
}
function flatStylesToStyleFunction(flatStyles) {
  const parsingContext = newParsingContext();
  const length = flatStyles.length;
  const evaluators = new Array(length);
  for (let i = 0; i < length; ++i) {
    evaluators[i] = buildStyle(flatStyles[i], parsingContext);
  }
  const evaluationContext = newEvaluationContext();
  const styles = new Array(length);
  return function(feature, resolution) {
    evaluationContext.properties = feature.getPropertiesInternal();
    evaluationContext.resolution = resolution;
    if (parsingContext.featureId) {
      const id = feature.getId();
      if (id !== void 0) {
        evaluationContext.featureId = id;
      } else {
        evaluationContext.featureId = null;
      }
    }
    let nonNullCount = 0;
    for (let i = 0; i < length; ++i) {
      const style = evaluators[i](evaluationContext);
      if (style) {
        styles[nonNullCount] = style;
        nonNullCount += 1;
      }
    }
    styles.length = nonNullCount;
    return styles;
  };
}
function buildRuleSet(rules, context) {
  const length = rules.length;
  const compiledRules = new Array(length);
  for (let i = 0; i < length; ++i) {
    const rule = rules[i];
    const filter = "filter" in rule ? buildExpression(rule.filter, BooleanType, context) : always;
    let styles;
    if (Array.isArray(rule.style)) {
      const styleLength = rule.style.length;
      styles = new Array(styleLength);
      for (let j = 0; j < styleLength; ++j) {
        styles[j] = buildStyle(rule.style[j], context);
      }
    } else {
      styles = [buildStyle(rule.style, context)];
    }
    compiledRules[i] = { filter, styles };
  }
  return function(context2) {
    const styles = [];
    let someMatched = false;
    for (let i = 0; i < length; ++i) {
      const filterEvaluator = compiledRules[i].filter;
      if (!filterEvaluator(context2)) {
        continue;
      }
      if (rules[i].else && someMatched) {
        continue;
      }
      someMatched = true;
      for (const styleEvaluator of compiledRules[i].styles) {
        const style = styleEvaluator(context2);
        if (!style) {
          continue;
        }
        styles.push(style);
      }
    }
    return styles;
  };
}
function buildStyle(flatStyle, context) {
  const evaluateFill = buildFill(flatStyle, "", context);
  const evaluateStroke = buildStroke(flatStyle, "", context);
  const evaluateText = buildText(flatStyle, context);
  const evaluateImage = buildImage(flatStyle, context);
  const evaluateZIndex = numberEvaluator(flatStyle, "z-index", context);
  if (!evaluateFill && !evaluateStroke && !evaluateText && !evaluateImage && !isEmpty(flatStyle)) {
    throw new Error(
      "No fill, stroke, point, or text symbolizer properties in style: " + JSON.stringify(flatStyle)
    );
  }
  const style = new Style_default();
  return function(context2) {
    let empty = true;
    if (evaluateFill) {
      const fill = evaluateFill(context2);
      if (fill) {
        empty = false;
      }
      style.setFill(fill);
    }
    if (evaluateStroke) {
      const stroke = evaluateStroke(context2);
      if (stroke) {
        empty = false;
      }
      style.setStroke(stroke);
    }
    if (evaluateText) {
      const text = evaluateText(context2);
      if (text) {
        empty = false;
      }
      style.setText(text);
    }
    if (evaluateImage) {
      const image = evaluateImage(context2);
      if (image) {
        empty = false;
      }
      style.setImage(image);
    }
    if (evaluateZIndex) {
      style.setZIndex(evaluateZIndex(context2));
    }
    if (empty) {
      return null;
    }
    return style;
  };
}
function buildFill(flatStyle, prefix, context) {
  const evaluateColor = colorLikeEvaluator(
    flatStyle,
    prefix + "fill-color",
    context
  );
  if (!evaluateColor) {
    return null;
  }
  const fill = new Fill_default();
  return function(context2) {
    const color = evaluateColor(context2);
    if (color === "none") {
      return null;
    }
    fill.setColor(color);
    return fill;
  };
}
function buildStroke(flatStyle, prefix, context) {
  const evaluateWidth = numberEvaluator(
    flatStyle,
    prefix + "stroke-width",
    context
  );
  const evaluateColor = colorLikeEvaluator(
    flatStyle,
    prefix + "stroke-color",
    context
  );
  if (!evaluateWidth && !evaluateColor) {
    return null;
  }
  const evaluateLineCap = stringEvaluator(
    flatStyle,
    prefix + "stroke-line-cap",
    context
  );
  const evaluateLineJoin = stringEvaluator(
    flatStyle,
    prefix + "stroke-line-join",
    context
  );
  const evaluateLineDash = numberArrayEvaluator(
    flatStyle,
    prefix + "stroke-line-dash",
    context
  );
  const evaluateLineDashOffset = numberEvaluator(
    flatStyle,
    prefix + "stroke-line-dash-offset",
    context
  );
  const evaluateMiterLimit = numberEvaluator(
    flatStyle,
    prefix + "stroke-miter-limit",
    context
  );
  const stroke = new Stroke_default();
  return function(context2) {
    if (evaluateColor) {
      const color = evaluateColor(context2);
      if (color === "none") {
        return null;
      }
      stroke.setColor(color);
    }
    if (evaluateWidth) {
      stroke.setWidth(evaluateWidth(context2));
    }
    if (evaluateLineCap) {
      const lineCap = evaluateLineCap(context2);
      if (lineCap !== "butt" && lineCap !== "round" && lineCap !== "square") {
        throw new Error("Expected butt, round, or square line cap");
      }
      stroke.setLineCap(lineCap);
    }
    if (evaluateLineJoin) {
      const lineJoin = evaluateLineJoin(context2);
      if (lineJoin !== "bevel" && lineJoin !== "round" && lineJoin !== "miter") {
        throw new Error("Expected bevel, round, or miter line join");
      }
      stroke.setLineJoin(lineJoin);
    }
    if (evaluateLineDash) {
      stroke.setLineDash(evaluateLineDash(context2));
    }
    if (evaluateLineDashOffset) {
      stroke.setLineDashOffset(evaluateLineDashOffset(context2));
    }
    if (evaluateMiterLimit) {
      stroke.setMiterLimit(evaluateMiterLimit(context2));
    }
    return stroke;
  };
}
function buildText(flatStyle, context) {
  const prefix = "text-";
  const evaluateValue = stringEvaluator(flatStyle, prefix + "value", context);
  if (!evaluateValue) {
    return null;
  }
  const evaluateFill = buildFill(flatStyle, prefix, context);
  const evaluateBackgroundFill = buildFill(
    flatStyle,
    prefix + "background-",
    context
  );
  const evaluateStroke = buildStroke(flatStyle, prefix, context);
  const evaluateBackgroundStroke = buildStroke(
    flatStyle,
    prefix + "background-",
    context
  );
  const evaluateFont = stringEvaluator(flatStyle, prefix + "font", context);
  const evaluateMaxAngle = numberEvaluator(
    flatStyle,
    prefix + "max-angle",
    context
  );
  const evaluateOffsetX = numberEvaluator(
    flatStyle,
    prefix + "offset-x",
    context
  );
  const evaluateOffsetY = numberEvaluator(
    flatStyle,
    prefix + "offset-y",
    context
  );
  const evaluateOverflow = booleanEvaluator(
    flatStyle,
    prefix + "overflow",
    context
  );
  const evaluatePlacement = stringEvaluator(
    flatStyle,
    prefix + "placement",
    context
  );
  const evaluateRepeat = numberEvaluator(flatStyle, prefix + "repeat", context);
  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + "scale", context);
  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + "rotate-with-view",
    context
  );
  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + "rotation",
    context
  );
  const evaluateAlign = stringEvaluator(flatStyle, prefix + "align", context);
  const evaluateJustify = stringEvaluator(
    flatStyle,
    prefix + "justify",
    context
  );
  const evaluateBaseline = stringEvaluator(
    flatStyle,
    prefix + "baseline",
    context
  );
  const evaluatePadding = numberArrayEvaluator(
    flatStyle,
    prefix + "padding",
    context
  );
  const text = new Text_default({});
  return function(context2) {
    text.setText(evaluateValue(context2));
    if (evaluateFill) {
      text.setFill(evaluateFill(context2));
    }
    if (evaluateBackgroundFill) {
      text.setBackgroundFill(evaluateBackgroundFill(context2));
    }
    if (evaluateStroke) {
      text.setStroke(evaluateStroke(context2));
    }
    if (evaluateBackgroundStroke) {
      text.setBackgroundStroke(evaluateBackgroundStroke(context2));
    }
    if (evaluateFont) {
      text.setFont(evaluateFont(context2));
    }
    if (evaluateMaxAngle) {
      text.setMaxAngle(evaluateMaxAngle(context2));
    }
    if (evaluateOffsetX) {
      text.setOffsetX(evaluateOffsetX(context2));
    }
    if (evaluateOffsetY) {
      text.setOffsetY(evaluateOffsetY(context2));
    }
    if (evaluateOverflow) {
      text.setOverflow(evaluateOverflow(context2));
    }
    if (evaluatePlacement) {
      const placement = evaluatePlacement(context2);
      if (placement !== "point" && placement !== "line") {
        throw new Error("Expected point or line for text-placement");
      }
      text.setPlacement(placement);
    }
    if (evaluateRepeat) {
      text.setRepeat(evaluateRepeat(context2));
    }
    if (evaluateScale) {
      text.setScale(evaluateScale(context2));
    }
    if (evaluateRotateWithView) {
      text.setRotateWithView(evaluateRotateWithView(context2));
    }
    if (evaluateRotation) {
      text.setRotation(evaluateRotation(context2));
    }
    if (evaluateAlign) {
      const textAlign = evaluateAlign(context2);
      if (textAlign !== "left" && textAlign !== "center" && textAlign !== "right" && textAlign !== "end" && textAlign !== "start") {
        throw new Error(
          "Expected left, right, center, start, or end for text-align"
        );
      }
      text.setTextAlign(textAlign);
    }
    if (evaluateJustify) {
      const justify = evaluateJustify(context2);
      if (justify !== "left" && justify !== "right" && justify !== "center") {
        throw new Error("Expected left, right, or center for text-justify");
      }
      text.setJustify(justify);
    }
    if (evaluateBaseline) {
      const textBaseline = evaluateBaseline(context2);
      if (textBaseline !== "bottom" && textBaseline !== "top" && textBaseline !== "middle" && textBaseline !== "alphabetic" && textBaseline !== "hanging") {
        throw new Error(
          "Expected bottom, top, middle, alphabetic, or hanging for text-baseline"
        );
      }
      text.setTextBaseline(textBaseline);
    }
    if (evaluatePadding) {
      text.setPadding(evaluatePadding(context2));
    }
    return text;
  };
}
function buildImage(flatStyle, context) {
  if ("icon-src" in flatStyle) {
    return buildIcon(flatStyle, context);
  }
  if ("shape-points" in flatStyle) {
    return buildShape(flatStyle, context);
  }
  if ("circle-radius" in flatStyle) {
    return buildCircle(flatStyle, context);
  }
  return null;
}
function buildIcon(flatStyle, context) {
  const prefix = "icon-";
  const srcName = prefix + "src";
  const src = requireString(flatStyle[srcName], srcName);
  const evaluateAnchor = coordinateEvaluator(
    flatStyle,
    prefix + "anchor",
    context
  );
  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + "scale", context);
  const evaluateOpacity = numberEvaluator(
    flatStyle,
    prefix + "opacity",
    context
  );
  const evaluateDisplacement = coordinateEvaluator(
    flatStyle,
    prefix + "displacement",
    context
  );
  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + "rotation",
    context
  );
  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + "rotate-with-view",
    context
  );
  const anchorOrigin = optionalIconOrigin(flatStyle, prefix + "anchor-origin");
  const anchorXUnits = optionalIconAnchorUnits(
    flatStyle,
    prefix + "anchor-x-units"
  );
  const anchorYUnits = optionalIconAnchorUnits(
    flatStyle,
    prefix + "anchor-y-units"
  );
  const color = optionalColorLike(flatStyle, prefix + "color");
  const crossOrigin = optionalString(flatStyle, prefix + "cross-origin");
  const offset = optionalNumberArray(flatStyle, prefix + "offset");
  const offsetOrigin = optionalIconOrigin(flatStyle, prefix + "offset-origin");
  const width = optionalNumber(flatStyle, prefix + "width");
  const height = optionalNumber(flatStyle, prefix + "height");
  const size = optionalSize(flatStyle, prefix + "size");
  const declutterMode = optionalDeclutterMode(flatStyle, prefix + "declutter");
  const icon = new Icon_default({
    src,
    anchorOrigin,
    anchorXUnits,
    anchorYUnits,
    color,
    crossOrigin,
    offset,
    offsetOrigin,
    height,
    width,
    size,
    declutterMode
  });
  return function(context2) {
    if (evaluateOpacity) {
      icon.setOpacity(evaluateOpacity(context2));
    }
    if (evaluateDisplacement) {
      icon.setDisplacement(evaluateDisplacement(context2));
    }
    if (evaluateRotation) {
      icon.setRotation(evaluateRotation(context2));
    }
    if (evaluateRotateWithView) {
      icon.setRotateWithView(evaluateRotateWithView(context2));
    }
    if (evaluateScale) {
      icon.setScale(evaluateScale(context2));
    }
    if (evaluateAnchor) {
      icon.setAnchor(evaluateAnchor(context2));
    }
    return icon;
  };
}
function buildShape(flatStyle, context) {
  const prefix = "shape-";
  const pointsName = prefix + "points";
  const points = requireNumber(flatStyle[pointsName], pointsName);
  const evaluateFill = buildFill(flatStyle, prefix, context);
  const evaluateStroke = buildStroke(flatStyle, prefix, context);
  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + "scale", context);
  const evaluateDisplacement = coordinateEvaluator(
    flatStyle,
    prefix + "displacement",
    context
  );
  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + "rotation",
    context
  );
  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + "rotate-with-view",
    context
  );
  const radius = optionalNumber(flatStyle, prefix + "radius");
  const radius1 = optionalNumber(flatStyle, prefix + "radius1");
  const radius2 = optionalNumber(flatStyle, prefix + "radius2");
  const angle = optionalNumber(flatStyle, prefix + "angle");
  const declutterMode = optionalDeclutterMode(
    flatStyle,
    prefix + "declutter-mode"
  );
  const shape = new RegularShape_default({
    points,
    radius,
    radius1,
    radius2,
    angle,
    declutterMode
  });
  return function(context2) {
    if (evaluateFill) {
      shape.setFill(evaluateFill(context2));
    }
    if (evaluateStroke) {
      shape.setStroke(evaluateStroke(context2));
    }
    if (evaluateDisplacement) {
      shape.setDisplacement(evaluateDisplacement(context2));
    }
    if (evaluateRotation) {
      shape.setRotation(evaluateRotation(context2));
    }
    if (evaluateRotateWithView) {
      shape.setRotateWithView(evaluateRotateWithView(context2));
    }
    if (evaluateScale) {
      shape.setScale(evaluateScale(context2));
    }
    return shape;
  };
}
function buildCircle(flatStyle, context) {
  const prefix = "circle-";
  const evaluateFill = buildFill(flatStyle, prefix, context);
  const evaluateStroke = buildStroke(flatStyle, prefix, context);
  const evaluateRadius = numberEvaluator(flatStyle, prefix + "radius", context);
  const evaluateScale = sizeLikeEvaluator(flatStyle, prefix + "scale", context);
  const evaluateDisplacement = coordinateEvaluator(
    flatStyle,
    prefix + "displacement",
    context
  );
  const evaluateRotation = numberEvaluator(
    flatStyle,
    prefix + "rotation",
    context
  );
  const evaluateRotateWithView = booleanEvaluator(
    flatStyle,
    prefix + "rotate-with-view",
    context
  );
  const declutterMode = optionalDeclutterMode(
    flatStyle,
    prefix + "declutter-mode"
  );
  const circle = new Circle_default({
    radius: 5,
    // this is arbitrary, but required - the evaluated radius is used below
    declutterMode
  });
  return function(context2) {
    if (evaluateRadius) {
      circle.setRadius(evaluateRadius(context2));
    }
    if (evaluateFill) {
      circle.setFill(evaluateFill(context2));
    }
    if (evaluateStroke) {
      circle.setStroke(evaluateStroke(context2));
    }
    if (evaluateDisplacement) {
      circle.setDisplacement(evaluateDisplacement(context2));
    }
    if (evaluateRotation) {
      circle.setRotation(evaluateRotation(context2));
    }
    if (evaluateRotateWithView) {
      circle.setRotateWithView(evaluateRotateWithView(context2));
    }
    if (evaluateScale) {
      circle.setScale(evaluateScale(context2));
    }
    return circle;
  };
}
function numberEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return void 0;
  }
  const evaluator = buildExpression(flatStyle[name], NumberType, context);
  return function(context2) {
    return requireNumber(evaluator(context2), name);
  };
}
function stringEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(flatStyle[name], StringType, context);
  return function(context2) {
    return requireString(evaluator(context2), name);
  };
}
function booleanEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(flatStyle[name], BooleanType, context);
  return function(context2) {
    const value = evaluator(context2);
    if (typeof value !== "boolean") {
      throw new Error(`Expected a boolean for ${name}`);
    }
    return value;
  };
}
function colorLikeEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(
    flatStyle[name],
    ColorType | StringType,
    context
  );
  return function(context2) {
    return requireColorLike(evaluator(context2), name);
  };
}
function numberArrayEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(flatStyle[name], NumberArrayType, context);
  return function(context2) {
    return requireNumberArray(evaluator(context2), name);
  };
}
function coordinateEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(flatStyle[name], NumberArrayType, context);
  return function(context2) {
    const array = requireNumberArray(evaluator(context2), name);
    if (array.length !== 2) {
      throw new Error(`Expected two numbers for ${name}`);
    }
    return array;
  };
}
function sizeLikeEvaluator(flatStyle, name, context) {
  if (!(name in flatStyle)) {
    return null;
  }
  const evaluator = buildExpression(
    flatStyle[name],
    NumberArrayType | NumberType,
    context
  );
  return function(context2) {
    return requireSizeLike(evaluator(context2), name);
  };
}
function optionalNumber(flatStyle, property) {
  const value = flatStyle[property];
  if (value === void 0) {
    return void 0;
  }
  if (typeof value !== "number") {
    throw new Error(`Expected a number for ${property}`);
  }
  return value;
}
function optionalSize(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  if (typeof encoded === "number") {
    return toSize(encoded);
  }
  if (!Array.isArray(encoded)) {
    throw new Error(`Expected a number or size array for ${property}`);
  }
  if (encoded.length !== 2 || typeof encoded[0] !== "number" || typeof encoded[1] !== "number") {
    throw new Error(`Expected a number or size array for ${property}`);
  }
  return encoded;
}
function optionalString(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  if (typeof encoded !== "string") {
    throw new Error(`Expected a string for ${property}`);
  }
  return encoded;
}
function optionalIconOrigin(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  if (encoded !== "bottom-left" && encoded !== "bottom-right" && encoded !== "top-left" && encoded !== "top-right") {
    throw new Error(
      `Expected bottom-left, bottom-right, top-left, or top-right for ${property}`
    );
  }
  return encoded;
}
function optionalIconAnchorUnits(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  if (encoded !== "pixels" && encoded !== "fraction") {
    throw new Error(`Expected pixels or fraction for ${property}`);
  }
  return encoded;
}
function optionalNumberArray(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  return requireNumberArray(encoded, property);
}
function optionalDeclutterMode(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  if (typeof encoded !== "string") {
    throw new Error(`Expected a string for ${property}`);
  }
  if (encoded !== "declutter" && encoded !== "obstacle" && encoded !== "none") {
    throw new Error(`Expected declutter, obstacle, or none for ${property}`);
  }
  return encoded;
}
function optionalColorLike(flatStyle, property) {
  const encoded = flatStyle[property];
  if (encoded === void 0) {
    return void 0;
  }
  return requireColorLike(encoded, property);
}
function requireNumberArray(value, property) {
  if (!Array.isArray(value)) {
    throw new Error(`Expected an array for ${property}`);
  }
  const length = value.length;
  for (let i = 0; i < length; ++i) {
    if (typeof value[i] !== "number") {
      throw new Error(`Expected an array of numbers for ${property}`);
    }
  }
  return value;
}
function requireString(value, property) {
  if (typeof value !== "string") {
    throw new Error(`Expected a string for ${property}`);
  }
  return value;
}
function requireNumber(value, property) {
  if (typeof value !== "number") {
    throw new Error(`Expected a number for ${property}`);
  }
  return value;
}
function requireColorLike(value, property) {
  if (typeof value === "string") {
    return value;
  }
  const array = requireNumberArray(value, property);
  const length = array.length;
  if (length < 3 || length > 4) {
    throw new Error(`Expected a color with 3 or 4 values for ${property}`);
  }
  return array;
}
function requireSizeLike(value, property) {
  if (typeof value === "number") {
    return value;
  }
  const size = requireNumberArray(value, property);
  if (size.length !== 2) {
    throw new Error(`Expected an array of two numbers for ${property}`);
  }
  return size;
}

// node_modules/ol/layer/BaseVector.js
var Property = {
  RENDER_ORDER: "renderOrder"
};
var BaseVectorLayer = class extends Layer_default {
  /**
   * @param {Options<VectorSourceType>} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign({}, options);
    delete baseOptions.style;
    delete baseOptions.renderBuffer;
    delete baseOptions.updateWhileAnimating;
    delete baseOptions.updateWhileInteracting;
    super(baseOptions);
    this.declutter_ = options.declutter !== void 0 ? options.declutter : false;
    this.renderBuffer_ = options.renderBuffer !== void 0 ? options.renderBuffer : 100;
    this.style_ = null;
    this.styleFunction_ = void 0;
    this.setStyle(options.style);
    this.updateWhileAnimating_ = options.updateWhileAnimating !== void 0 ? options.updateWhileAnimating : false;
    this.updateWhileInteracting_ = options.updateWhileInteracting !== void 0 ? options.updateWhileInteracting : false;
  }
  /**
   * @return {boolean} Declutter.
   */
  getDeclutter() {
    return this.declutter_;
  }
  /**
   * Get the topmost feature that intersects the given pixel on the viewport. Returns a promise
   * that resolves with an array of features. The array will either contain the topmost feature
   * when a hit was detected, or it will be empty.
   *
   * The hit detection algorithm used for this method is optimized for performance, but is less
   * accurate than the one used in [map.getFeaturesAtPixel()]{@link import("../Map.js").default#getFeaturesAtPixel}.
   * Text is not considered, and icons are only represented by their bounding box instead of the exact
   * image.
   *
   * @param {import("../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../Feature").FeatureLike>>} Promise that resolves with an array of features.
   * @api
   */
  getFeatures(pixel) {
    return super.getFeatures(pixel);
  }
  /**
   * @return {number|undefined} Render buffer.
   */
  getRenderBuffer() {
    return this.renderBuffer_;
  }
  /**
   * @return {function(import("../Feature.js").default, import("../Feature.js").default): number|null|undefined} Render
   *     order.
   */
  getRenderOrder() {
    return (
      /** @type {import("../render.js").OrderFunction|null|undefined} */
      this.get(Property.RENDER_ORDER)
    );
  }
  /**
   * Get the style for features.  This returns whatever was passed to the `style`
   * option at construction or to the `setStyle` method.
   * @return {import("../style/Style.js").StyleLike|null|undefined} Layer style.
   * @api
   */
  getStyle() {
    return this.style_;
  }
  /**
   * Get the style function.
   * @return {import("../style/Style.js").StyleFunction|undefined} Layer style function.
   * @api
   */
  getStyleFunction() {
    return this.styleFunction_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     animating.
   */
  getUpdateWhileAnimating() {
    return this.updateWhileAnimating_;
  }
  /**
   * @return {boolean} Whether the rendered layer should be updated while
   *     interacting.
   */
  getUpdateWhileInteracting() {
    return this.updateWhileInteracting_;
  }
  /**
   * Render declutter items for this layer
   * @param {import("../Map.js").FrameState} frameState Frame state.
   */
  renderDeclutter(frameState) {
    if (!frameState.declutterTree) {
      frameState.declutterTree = new RBush(9);
    }
    this.getRenderer().renderDeclutter(frameState);
  }
  /**
   * @param {import("../render.js").OrderFunction|null|undefined} renderOrder
   *     Render order.
   */
  setRenderOrder(renderOrder) {
    this.set(Property.RENDER_ORDER, renderOrder);
  }
  /**
   * Set the style for features.  This can be a single style object, an array
   * of styles, or a function that takes a feature and resolution and returns
   * an array of styles. If set to `null`, the layer has no style (a `null` style),
   * so only features that have their own styles will be rendered in the layer. Call
   * `setStyle()` without arguments to reset to the default style. See
   * [the ol/style/Style module]{@link module:ol/style/Style~Style} for information on the default style.
   *
   * If your layer has a static style, you can use [flat style]{@link module:ol/style/flat~FlatStyle} object
   * literals instead of using the `Style` and symbolizer constructors (`Fill`, `Stroke`, etc.):
   * ```js
   * vectorLayer.setStyle({
   *   "fill-color": "yellow",
   *   "stroke-color": "black",
   *   "stroke-width": 4
   * })
   * ```
   *
   * @param {import("../style/Style.js").StyleLike|import("../style/flat.js").FlatStyleLike|null} [style] Layer style.
   * @api
   */
  setStyle(style) {
    this.style_ = toStyleLike(style);
    this.styleFunction_ = style === null ? void 0 : toFunction(this.style_);
    this.changed();
  }
};
function toStyleLike(style) {
  if (style === void 0) {
    return createDefaultStyle;
  }
  if (!style) {
    return null;
  }
  if (typeof style === "function") {
    return style;
  }
  if (style instanceof Style_default) {
    return style;
  }
  if (!Array.isArray(style)) {
    return flatStylesToStyleFunction([style]);
  }
  if (style.length === 0) {
    return [];
  }
  const length = style.length;
  const first = style[0];
  if (first instanceof Style_default) {
    const styles = new Array(length);
    for (let i = 0; i < length; ++i) {
      const candidate = style[i];
      if (!(candidate instanceof Style_default)) {
        throw new Error("Expected a list of style instances");
      }
      styles[i] = candidate;
    }
    return styles;
  }
  if ("style" in first) {
    const rules = new Array(length);
    for (let i = 0; i < length; ++i) {
      const candidate = style[i];
      if (!("style" in candidate)) {
        throw new Error("Expected a list of rules with a style property");
      }
      rules[i] = candidate;
    }
    return rulesToStyleFunction(rules);
  }
  const flatStyles = (
    /** @type {Array<import("../style/flat.js").FlatStyle>} */
    style
  );
  return flatStylesToStyleFunction(flatStyles);
}
var BaseVector_default = BaseVectorLayer;

// node_modules/ol/render/canvas/Instruction.js
var Instruction = {
  BEGIN_GEOMETRY: 0,
  BEGIN_PATH: 1,
  CIRCLE: 2,
  CLOSE_PATH: 3,
  CUSTOM: 4,
  DRAW_CHARS: 5,
  DRAW_IMAGE: 6,
  END_GEOMETRY: 7,
  FILL: 8,
  MOVE_TO_LINE_TO: 9,
  SET_FILL_STYLE: 10,
  SET_STROKE_STYLE: 11,
  STROKE: 12
};
var fillInstruction = [Instruction.FILL];
var strokeInstruction = [Instruction.STROKE];
var beginPathInstruction = [Instruction.BEGIN_PATH];
var closePathInstruction = [Instruction.CLOSE_PATH];
var Instruction_default = Instruction;

// node_modules/ol/render/VectorContext.js
var VectorContext = class {
  /**
   * Render a geometry with a custom renderer.
   *
   * @param {import("../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */
  drawCustom(geometry, feature, renderer, hitDetectionRenderer) {
  }
  /**
   * Render a geometry.
   *
   * @param {import("../geom/Geometry.js").default} geometry The geometry to render.
   */
  drawGeometry(geometry) {
  }
  /**
   * Set the rendering style.
   *
   * @param {import("../style/Style.js").default} style The rendering style.
   */
  setStyle(style) {
  }
  /**
   * @param {import("../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../Feature.js").default} feature Feature.
   */
  drawCircle(circleGeometry, feature) {
  }
  /**
   * @param {import("../Feature.js").default} feature Feature.
   * @param {import("../style/Style.js").default} style Style.
   */
  drawFeature(feature, style) {
  }
  /**
   * @param {import("../geom/GeometryCollection.js").default} geometryCollectionGeometry Geometry collection.
   * @param {import("../Feature.js").default} feature Feature.
   */
  drawGeometryCollection(geometryCollectionGeometry, feature) {
  }
  /**
   * @param {import("../geom/LineString.js").default|import("./Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawLineString(lineStringGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiLineString.js").default|import("./Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiLineString(multiLineStringGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiPoint.js").default|import("./Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPoint(multiPointGeometry, feature) {
  }
  /**
   * @param {import("../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPolygon(multiPolygonGeometry, feature) {
  }
  /**
   * @param {import("../geom/Point.js").default|import("./Feature.js").default} pointGeometry Point geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawPoint(pointGeometry, feature) {
  }
  /**
   * @param {import("../geom/Polygon.js").default|import("./Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawPolygon(polygonGeometry, feature) {
  }
  /**
   * @param {import("../geom/SimpleGeometry.js").default|import("./Feature.js").default} geometry Geometry.
   * @param {import("../Feature.js").FeatureLike} feature Feature.
   */
  drawText(geometry, feature) {
  }
  /**
   * @param {import("../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(fillStyle, strokeStyle) {
  }
  /**
   * @param {import("../style/Image.js").default} imageStyle Image style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with a text style.
   */
  setImageStyle(imageStyle, declutterImageWithText) {
  }
  /**
   * @param {import("../style/Text.js").default} textStyle Text style.
   * @param {import("../render/canvas.js").DeclutterImageWithText} [declutterImageWithText] Shared data for combined decluttering with an image style.
   */
  setTextStyle(textStyle, declutterImageWithText) {
  }
};
var VectorContext_default = VectorContext;

// node_modules/ol/render/canvas/Builder.js
var CanvasBuilder = class extends VectorContext_default {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    super();
    this.tolerance = tolerance;
    this.maxExtent = maxExtent;
    this.pixelRatio = pixelRatio;
    this.maxLineWidth = 0;
    this.resolution = resolution;
    this.beginGeometryInstruction1_ = null;
    this.beginGeometryInstruction2_ = null;
    this.bufferedMaxExtent_ = null;
    this.instructions = [];
    this.coordinates = [];
    this.tmpCoordinate_ = [];
    this.hitDetectionInstructions = [];
    this.state = /** @type {import("../canvas.js").FillStrokeState} */
    {};
  }
  /**
   * @protected
   * @param {Array<number>} dashArray Dash array.
   * @return {Array<number>} Dash array with pixel ratio applied
   */
  applyPixelRatio(dashArray) {
    const pixelRatio = this.pixelRatio;
    return pixelRatio == 1 ? dashArray : dashArray.map(function(dash) {
      return dash * pixelRatio;
    });
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} stride Stride.
   * @protected
   * @return {number} My end
   */
  appendFlatPointCoordinates(flatCoordinates, stride) {
    const extent = this.getBufferedMaxExtent();
    const tmpCoord = this.tmpCoordinate_;
    const coordinates = this.coordinates;
    let myEnd = coordinates.length;
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      tmpCoord[0] = flatCoordinates[i];
      tmpCoord[1] = flatCoordinates[i + 1];
      if (containsCoordinate(extent, tmpCoord)) {
        coordinates[myEnd++] = tmpCoord[0];
        coordinates[myEnd++] = tmpCoord[1];
      }
    }
    return myEnd;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} closed Last input coordinate equals first.
   * @param {boolean} skipFirst Skip first coordinate.
   * @protected
   * @return {number} My end.
   */
  appendFlatLineCoordinates(flatCoordinates, offset, end, stride, closed, skipFirst) {
    const coordinates = this.coordinates;
    let myEnd = coordinates.length;
    const extent = this.getBufferedMaxExtent();
    if (skipFirst) {
      offset += stride;
    }
    let lastXCoord = flatCoordinates[offset];
    let lastYCoord = flatCoordinates[offset + 1];
    const nextCoord = this.tmpCoordinate_;
    let skipped = true;
    let i, lastRel, nextRel;
    for (i = offset + stride; i < end; i += stride) {
      nextCoord[0] = flatCoordinates[i];
      nextCoord[1] = flatCoordinates[i + 1];
      nextRel = coordinateRelationship(extent, nextCoord);
      if (nextRel !== lastRel) {
        if (skipped) {
          coordinates[myEnd++] = lastXCoord;
          coordinates[myEnd++] = lastYCoord;
          skipped = false;
        }
        coordinates[myEnd++] = nextCoord[0];
        coordinates[myEnd++] = nextCoord[1];
      } else if (nextRel === Relationship_default.INTERSECTING) {
        coordinates[myEnd++] = nextCoord[0];
        coordinates[myEnd++] = nextCoord[1];
        skipped = false;
      } else {
        skipped = true;
      }
      lastXCoord = nextCoord[0];
      lastYCoord = nextCoord[1];
      lastRel = nextRel;
    }
    if (closed && skipped || i === offset + stride) {
      coordinates[myEnd++] = lastXCoord;
      coordinates[myEnd++] = lastYCoord;
    }
    return myEnd;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @param {Array<number>} builderEnds Builder ends.
   * @return {number} Offset.
   */
  drawCustomCoordinates_(flatCoordinates, offset, ends, stride, builderEnds) {
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const builderEnd = this.appendFlatLineCoordinates(
        flatCoordinates,
        offset,
        end,
        stride,
        false,
        false
      );
      builderEnds.push(builderEnd);
      offset = end;
    }
    return offset;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @param {Function} renderer Renderer.
   * @param {Function} hitDetectionRenderer Renderer.
   */
  drawCustom(geometry, feature, renderer, hitDetectionRenderer) {
    this.beginGeometry(geometry, feature);
    const type = geometry.getType();
    const stride = geometry.getStride();
    const builderBegin = this.coordinates.length;
    let flatCoordinates, builderEnd, builderEnds, builderEndss;
    let offset;
    switch (type) {
      case "MultiPolygon":
        flatCoordinates = /** @type {import("../../geom/MultiPolygon.js").default} */
        geometry.getOrientedFlatCoordinates();
        builderEndss = [];
        const endss = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry.getEndss()
        );
        offset = 0;
        for (let i = 0, ii = endss.length; i < ii; ++i) {
          const myEnds = [];
          offset = this.drawCustomCoordinates_(
            flatCoordinates,
            offset,
            endss[i],
            stride,
            myEnds
          );
          builderEndss.push(myEnds);
        }
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEndss,
          geometry,
          renderer,
          inflateMultiCoordinatesArray
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEndss,
          geometry,
          hitDetectionRenderer || renderer,
          inflateMultiCoordinatesArray
        ]);
        break;
      case "Polygon":
      case "MultiLineString":
        builderEnds = [];
        flatCoordinates = type == "Polygon" ? (
          /** @type {import("../../geom/Polygon.js").default} */
          geometry.getOrientedFlatCoordinates()
        ) : geometry.getFlatCoordinates();
        offset = this.drawCustomCoordinates_(
          flatCoordinates,
          0,
          /** @type {import("../../geom/Polygon.js").default|import("../../geom/MultiLineString.js").default} */
          geometry.getEnds(),
          stride,
          builderEnds
        );
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnds,
          geometry,
          renderer,
          inflateCoordinatesArray
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnds,
          geometry,
          hitDetectionRenderer || renderer,
          inflateCoordinatesArray
        ]);
        break;
      case "LineString":
      case "Circle":
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatLineCoordinates(
          flatCoordinates,
          0,
          flatCoordinates.length,
          stride,
          false,
          false
        );
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          renderer,
          inflateCoordinates
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          hitDetectionRenderer || renderer,
          inflateCoordinates
        ]);
        break;
      case "MultiPoint":
        flatCoordinates = geometry.getFlatCoordinates();
        builderEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
        if (builderEnd > builderBegin) {
          this.instructions.push([
            Instruction_default.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            renderer,
            inflateCoordinates
          ]);
          this.hitDetectionInstructions.push([
            Instruction_default.CUSTOM,
            builderBegin,
            builderEnd,
            geometry,
            hitDetectionRenderer || renderer,
            inflateCoordinates
          ]);
        }
        break;
      case "Point":
        flatCoordinates = geometry.getFlatCoordinates();
        this.coordinates.push(flatCoordinates[0], flatCoordinates[1]);
        builderEnd = this.coordinates.length;
        this.instructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          renderer
        ]);
        this.hitDetectionInstructions.push([
          Instruction_default.CUSTOM,
          builderBegin,
          builderEnd,
          geometry,
          hitDetectionRenderer || renderer
        ]);
        break;
      default:
    }
    this.endGeometry(feature);
  }
  /**
   * @protected
   * @param {import("../../geom/Geometry").default|import("../Feature.js").default} geometry The geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  beginGeometry(geometry, feature) {
    this.beginGeometryInstruction1_ = [
      Instruction_default.BEGIN_GEOMETRY,
      feature,
      0,
      geometry
    ];
    this.instructions.push(this.beginGeometryInstruction1_);
    this.beginGeometryInstruction2_ = [
      Instruction_default.BEGIN_GEOMETRY,
      feature,
      0,
      geometry
    ];
    this.hitDetectionInstructions.push(this.beginGeometryInstruction2_);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    return {
      instructions: this.instructions,
      hitDetectionInstructions: this.hitDetectionInstructions,
      coordinates: this.coordinates
    };
  }
  /**
   * Reverse the hit detection instructions.
   */
  reverseHitDetectionInstructions() {
    const hitDetectionInstructions = this.hitDetectionInstructions;
    hitDetectionInstructions.reverse();
    let i;
    const n = hitDetectionInstructions.length;
    let instruction;
    let type;
    let begin = -1;
    for (i = 0; i < n; ++i) {
      instruction = hitDetectionInstructions[i];
      type = /** @type {import("./Instruction.js").default} */
      instruction[0];
      if (type == Instruction_default.END_GEOMETRY) {
        begin = i;
      } else if (type == Instruction_default.BEGIN_GEOMETRY) {
        instruction[2] = i;
        reverseSubArray(this.hitDetectionInstructions, begin, i);
        begin = -1;
      }
    }
  }
  /**
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(fillStyle, strokeStyle) {
    const state = this.state;
    if (fillStyle) {
      const fillStyleColor = fillStyle.getColor();
      state.fillStyle = asColorLike(
        fillStyleColor ? fillStyleColor : defaultFillStyle
      );
    } else {
      state.fillStyle = void 0;
    }
    if (strokeStyle) {
      const strokeStyleColor = strokeStyle.getColor();
      state.strokeStyle = asColorLike(
        strokeStyleColor ? strokeStyleColor : defaultStrokeStyle
      );
      const strokeStyleLineCap = strokeStyle.getLineCap();
      state.lineCap = strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap;
      const strokeStyleLineDash = strokeStyle.getLineDash();
      state.lineDash = strokeStyleLineDash ? strokeStyleLineDash.slice() : defaultLineDash;
      const strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      state.lineDashOffset = strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset;
      const strokeStyleLineJoin = strokeStyle.getLineJoin();
      state.lineJoin = strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin;
      const strokeStyleWidth = strokeStyle.getWidth();
      state.lineWidth = strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth;
      const strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      state.miterLimit = strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit;
      if (state.lineWidth > this.maxLineWidth) {
        this.maxLineWidth = state.lineWidth;
        this.bufferedMaxExtent_ = null;
      }
    } else {
      state.strokeStyle = void 0;
      state.lineCap = void 0;
      state.lineDash = null;
      state.lineDashOffset = void 0;
      state.lineJoin = void 0;
      state.lineWidth = void 0;
      state.miterLimit = void 0;
    }
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Fill instruction.
   */
  createFill(state) {
    const fillStyle = state.fillStyle;
    const fillInstruction2 = [Instruction_default.SET_FILL_STYLE, fillStyle];
    if (typeof fillStyle !== "string") {
      fillInstruction2.push(true);
    }
    return fillInstruction2;
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(state) {
    this.instructions.push(this.createStroke(state));
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @return {Array<*>} Stroke instruction.
   */
  createStroke(state) {
    return [
      Instruction_default.SET_STROKE_STYLE,
      state.strokeStyle,
      state.lineWidth * this.pixelRatio,
      state.lineCap,
      state.lineJoin,
      state.miterLimit,
      this.applyPixelRatio(state.lineDash),
      state.lineDashOffset * this.pixelRatio
    ];
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState):Array<*>} createFill Create fill.
   */
  updateFillStyle(state, createFill) {
    const fillStyle = state.fillStyle;
    if (typeof fillStyle !== "string" || state.currentFillStyle != fillStyle) {
      if (fillStyle !== void 0) {
        this.instructions.push(createFill.call(this, state));
      }
      state.currentFillStyle = fillStyle;
    }
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   * @param {function(this:CanvasBuilder, import("../canvas.js").FillStrokeState): void} applyStroke Apply stroke.
   */
  updateStrokeStyle(state, applyStroke) {
    const strokeStyle = state.strokeStyle;
    const lineCap = state.lineCap;
    const lineDash = state.lineDash;
    const lineDashOffset = state.lineDashOffset;
    const lineJoin = state.lineJoin;
    const lineWidth = state.lineWidth;
    const miterLimit = state.miterLimit;
    if (state.currentStrokeStyle != strokeStyle || state.currentLineCap != lineCap || lineDash != state.currentLineDash && !equals(state.currentLineDash, lineDash) || state.currentLineDashOffset != lineDashOffset || state.currentLineJoin != lineJoin || state.currentLineWidth != lineWidth || state.currentMiterLimit != miterLimit) {
      if (strokeStyle !== void 0) {
        applyStroke.call(this, state);
      }
      state.currentStrokeStyle = strokeStyle;
      state.currentLineCap = lineCap;
      state.currentLineDash = lineDash;
      state.currentLineDashOffset = lineDashOffset;
      state.currentLineJoin = lineJoin;
      state.currentLineWidth = lineWidth;
      state.currentMiterLimit = miterLimit;
    }
  }
  /**
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  endGeometry(feature) {
    this.beginGeometryInstruction1_[2] = this.instructions.length;
    this.beginGeometryInstruction1_ = null;
    this.beginGeometryInstruction2_[2] = this.hitDetectionInstructions.length;
    this.beginGeometryInstruction2_ = null;
    const endGeometryInstruction = [Instruction_default.END_GEOMETRY, feature];
    this.instructions.push(endGeometryInstruction);
    this.hitDetectionInstructions.push(endGeometryInstruction);
  }
  /**
   * Get the buffered rendering extent.  Rendering will be clipped to the extent
   * provided to the constructor.  To account for symbolizers that may intersect
   * this extent, we calculate a buffered extent (e.g. based on stroke width).
   * @return {import("../../extent.js").Extent} The buffered rendering extent.
   * @protected
   */
  getBufferedMaxExtent() {
    if (!this.bufferedMaxExtent_) {
      this.bufferedMaxExtent_ = clone(this.maxExtent);
      if (this.maxLineWidth > 0) {
        const width = this.resolution * (this.maxLineWidth + 1) / 2;
        buffer(this.bufferedMaxExtent_, width, this.bufferedMaxExtent_);
      }
    }
    return this.bufferedMaxExtent_;
  }
};
var Builder_default = CanvasBuilder;

// node_modules/ol/render/canvas/ImageBuilder.js
var CanvasImageBuilder = class extends Builder_default {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    super(tolerance, maxExtent, resolution, pixelRatio);
    this.hitDetectionImage_ = null;
    this.image_ = null;
    this.imagePixelRatio_ = void 0;
    this.anchorX_ = void 0;
    this.anchorY_ = void 0;
    this.height_ = void 0;
    this.opacity_ = void 0;
    this.originX_ = void 0;
    this.originY_ = void 0;
    this.rotateWithView_ = void 0;
    this.rotation_ = void 0;
    this.scale_ = void 0;
    this.width_ = void 0;
    this.declutterMode_ = void 0;
    this.declutterImageWithText_ = void 0;
  }
  /**
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} pointGeometry Point geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawPoint(pointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(pointGeometry, feature);
    const flatCoordinates = pointGeometry.getFlatCoordinates();
    const stride = pointGeometry.getStride();
    const myBegin = this.coordinates.length;
    const myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]);
    this.endGeometry(feature);
  }
  /**
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} multiPointGeometry MultiPoint geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPoint(multiPointGeometry, feature) {
    if (!this.image_) {
      return;
    }
    this.beginGeometry(multiPointGeometry, feature);
    const flatCoordinates = multiPointGeometry.getFlatCoordinates();
    const stride = multiPointGeometry.getStride();
    const myBegin = this.coordinates.length;
    const myEnd = this.appendFlatPointCoordinates(flatCoordinates, stride);
    this.instructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.image_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_ * this.imagePixelRatio_,
      this.anchorY_ * this.imagePixelRatio_,
      Math.ceil(this.height_ * this.imagePixelRatio_),
      this.opacity_,
      this.originX_ * this.imagePixelRatio_,
      this.originY_ * this.imagePixelRatio_,
      this.rotateWithView_,
      this.rotation_,
      [
        this.scale_[0] * this.pixelRatio / this.imagePixelRatio_,
        this.scale_[1] * this.pixelRatio / this.imagePixelRatio_
      ],
      Math.ceil(this.width_ * this.imagePixelRatio_),
      this.declutterMode_,
      this.declutterImageWithText_
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_IMAGE,
      myBegin,
      myEnd,
      this.hitDetectionImage_,
      // Remaining arguments to DRAW_IMAGE are in alphabetical order
      this.anchorX_,
      this.anchorY_,
      this.height_,
      1,
      this.originX_,
      this.originY_,
      this.rotateWithView_,
      this.rotation_,
      this.scale_,
      this.width_,
      this.declutterMode_,
      this.declutterImageWithText_
    ]);
    this.endGeometry(feature);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    this.reverseHitDetectionInstructions();
    this.anchorX_ = void 0;
    this.anchorY_ = void 0;
    this.hitDetectionImage_ = null;
    this.image_ = null;
    this.imagePixelRatio_ = void 0;
    this.height_ = void 0;
    this.scale_ = void 0;
    this.opacity_ = void 0;
    this.originX_ = void 0;
    this.originY_ = void 0;
    this.rotateWithView_ = void 0;
    this.rotation_ = void 0;
    this.width_ = void 0;
    return super.finish();
  }
  /**
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   * @param {Object} [sharedData] Shared data.
   */
  setImageStyle(imageStyle, sharedData) {
    const anchor = imageStyle.getAnchor();
    const size = imageStyle.getSize();
    const origin = imageStyle.getOrigin();
    this.imagePixelRatio_ = imageStyle.getPixelRatio(this.pixelRatio);
    this.anchorX_ = anchor[0];
    this.anchorY_ = anchor[1];
    this.hitDetectionImage_ = imageStyle.getHitDetectionImage();
    this.image_ = imageStyle.getImage(this.pixelRatio);
    this.height_ = size[1];
    this.opacity_ = imageStyle.getOpacity();
    this.originX_ = origin[0];
    this.originY_ = origin[1];
    this.rotateWithView_ = imageStyle.getRotateWithView();
    this.rotation_ = imageStyle.getRotation();
    this.scale_ = imageStyle.getScaleArray();
    this.width_ = size[0];
    this.declutterMode_ = imageStyle.getDeclutterMode();
    this.declutterImageWithText_ = sharedData;
  }
};
var ImageBuilder_default = CanvasImageBuilder;

// node_modules/ol/render/canvas/LineStringBuilder.js
var CanvasLineStringBuilder = class extends Builder_default {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    super(tolerance, maxExtent, resolution, pixelRatio);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   * @return {number} end.
   */
  drawFlatCoordinates_(flatCoordinates, offset, end, stride) {
    const myBegin = this.coordinates.length;
    const myEnd = this.appendFlatLineCoordinates(
      flatCoordinates,
      offset,
      end,
      stride,
      false,
      false
    );
    const moveToLineToInstruction = [
      Instruction_default.MOVE_TO_LINE_TO,
      myBegin,
      myEnd
    ];
    this.instructions.push(moveToLineToInstruction);
    this.hitDetectionInstructions.push(moveToLineToInstruction);
    return end;
  }
  /**
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} lineStringGeometry Line string geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawLineString(lineStringGeometry, feature) {
    const state = this.state;
    const strokeStyle = state.strokeStyle;
    const lineWidth = state.lineWidth;
    if (strokeStyle === void 0 || lineWidth === void 0) {
      return;
    }
    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(lineStringGeometry, feature);
    this.hitDetectionInstructions.push(
      [
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ],
      beginPathInstruction
    );
    const flatCoordinates = lineStringGeometry.getFlatCoordinates();
    const stride = lineStringGeometry.getStride();
    this.drawFlatCoordinates_(
      flatCoordinates,
      0,
      flatCoordinates.length,
      stride
    );
    this.hitDetectionInstructions.push(strokeInstruction);
    this.endGeometry(feature);
  }
  /**
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} multiLineStringGeometry MultiLineString geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiLineString(multiLineStringGeometry, feature) {
    const state = this.state;
    const strokeStyle = state.strokeStyle;
    const lineWidth = state.lineWidth;
    if (strokeStyle === void 0 || lineWidth === void 0) {
      return;
    }
    this.updateStrokeStyle(state, this.applyStroke);
    this.beginGeometry(multiLineStringGeometry, feature);
    this.hitDetectionInstructions.push(
      [
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ],
      beginPathInstruction
    );
    const ends = multiLineStringGeometry.getEnds();
    const flatCoordinates = multiLineStringGeometry.getFlatCoordinates();
    const stride = multiLineStringGeometry.getStride();
    let offset = 0;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.drawFlatCoordinates_(
        flatCoordinates,
        offset,
        /** @type {number} */
        ends[i],
        stride
      );
    }
    this.hitDetectionInstructions.push(strokeInstruction);
    this.endGeometry(feature);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    const state = this.state;
    if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
      this.instructions.push(strokeInstruction);
    }
    this.reverseHitDetectionInstructions();
    this.state = null;
    return super.finish();
  }
  /**
   * @param {import("../canvas.js").FillStrokeState} state State.
   */
  applyStroke(state) {
    if (state.lastStroke != void 0 && state.lastStroke != this.coordinates.length) {
      this.instructions.push(strokeInstruction);
      state.lastStroke = this.coordinates.length;
    }
    state.lastStroke = 0;
    super.applyStroke(state);
    this.instructions.push(beginPathInstruction);
  }
};
var LineStringBuilder_default = CanvasLineStringBuilder;

// node_modules/ol/render/canvas/PolygonBuilder.js
var CanvasPolygonBuilder = class extends Builder_default {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    super(tolerance, maxExtent, resolution, pixelRatio);
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawFlatCoordinatess_(flatCoordinates, offset, ends, stride) {
    const state = this.state;
    const fill = state.fillStyle !== void 0;
    const stroke = state.strokeStyle !== void 0;
    const numEnds = ends.length;
    this.instructions.push(beginPathInstruction);
    this.hitDetectionInstructions.push(beginPathInstruction);
    for (let i = 0; i < numEnds; ++i) {
      const end = ends[i];
      const myBegin = this.coordinates.length;
      const myEnd = this.appendFlatLineCoordinates(
        flatCoordinates,
        offset,
        end,
        stride,
        true,
        !stroke
      );
      const moveToLineToInstruction = [
        Instruction_default.MOVE_TO_LINE_TO,
        myBegin,
        myEnd
      ];
      this.instructions.push(moveToLineToInstruction);
      this.hitDetectionInstructions.push(moveToLineToInstruction);
      if (stroke) {
        this.instructions.push(closePathInstruction);
        this.hitDetectionInstructions.push(closePathInstruction);
      }
      offset = end;
    }
    if (fill) {
      this.instructions.push(fillInstruction);
      this.hitDetectionInstructions.push(fillInstruction);
    }
    if (stroke) {
      this.instructions.push(strokeInstruction);
      this.hitDetectionInstructions.push(strokeInstruction);
    }
    return offset;
  }
  /**
   * @param {import("../../geom/Circle.js").default} circleGeometry Circle geometry.
   * @param {import("../../Feature.js").default} feature Feature.
   */
  drawCircle(circleGeometry, feature) {
    const state = this.state;
    const fillStyle = state.fillStyle;
    const strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(circleGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ]);
    }
    const flatCoordinates = circleGeometry.getFlatCoordinates();
    const stride = circleGeometry.getStride();
    const myBegin = this.coordinates.length;
    this.appendFlatLineCoordinates(
      flatCoordinates,
      0,
      flatCoordinates.length,
      stride,
      false,
      false
    );
    const circleInstruction = [Instruction_default.CIRCLE, myBegin];
    this.instructions.push(beginPathInstruction, circleInstruction);
    this.hitDetectionInstructions.push(beginPathInstruction, circleInstruction);
    if (state.fillStyle !== void 0) {
      this.instructions.push(fillInstruction);
      this.hitDetectionInstructions.push(fillInstruction);
    }
    if (state.strokeStyle !== void 0) {
      this.instructions.push(strokeInstruction);
      this.hitDetectionInstructions.push(strokeInstruction);
    }
    this.endGeometry(feature);
  }
  /**
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} polygonGeometry Polygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawPolygon(polygonGeometry, feature) {
    const state = this.state;
    const fillStyle = state.fillStyle;
    const strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(polygonGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ]);
    }
    const ends = polygonGeometry.getEnds();
    const flatCoordinates = polygonGeometry.getOrientedFlatCoordinates();
    const stride = polygonGeometry.getStride();
    this.drawFlatCoordinatess_(
      flatCoordinates,
      0,
      /** @type {Array<number>} */
      ends,
      stride
    );
    this.endGeometry(feature);
  }
  /**
   * @param {import("../../geom/MultiPolygon.js").default} multiPolygonGeometry MultiPolygon geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawMultiPolygon(multiPolygonGeometry, feature) {
    const state = this.state;
    const fillStyle = state.fillStyle;
    const strokeStyle = state.strokeStyle;
    if (fillStyle === void 0 && strokeStyle === void 0) {
      return;
    }
    this.setFillStrokeStyles_();
    this.beginGeometry(multiPolygonGeometry, feature);
    if (state.fillStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_FILL_STYLE,
        defaultFillStyle
      ]);
    }
    if (state.strokeStyle !== void 0) {
      this.hitDetectionInstructions.push([
        Instruction_default.SET_STROKE_STYLE,
        state.strokeStyle,
        state.lineWidth,
        state.lineCap,
        state.lineJoin,
        state.miterLimit,
        defaultLineDash,
        defaultLineDashOffset
      ]);
    }
    const endss = multiPolygonGeometry.getEndss();
    const flatCoordinates = multiPolygonGeometry.getOrientedFlatCoordinates();
    const stride = multiPolygonGeometry.getStride();
    let offset = 0;
    for (let i = 0, ii = endss.length; i < ii; ++i) {
      offset = this.drawFlatCoordinatess_(
        flatCoordinates,
        offset,
        endss[i],
        stride
      );
    }
    this.endGeometry(feature);
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    this.reverseHitDetectionInstructions();
    this.state = null;
    const tolerance = this.tolerance;
    if (tolerance !== 0) {
      const coordinates = this.coordinates;
      for (let i = 0, ii = coordinates.length; i < ii; ++i) {
        coordinates[i] = snap(coordinates[i], tolerance);
      }
    }
    return super.finish();
  }
  /**
   * @private
   */
  setFillStrokeStyles_() {
    const state = this.state;
    const fillStyle = state.fillStyle;
    if (fillStyle !== void 0) {
      this.updateFillStyle(state, this.createFill);
    }
    if (state.strokeStyle !== void 0) {
      this.updateStrokeStyle(state, this.applyStroke);
    }
  }
};
var PolygonBuilder_default = CanvasPolygonBuilder;

// node_modules/ol/geom/flat/linechunk.js
function lineChunk(chunkLength, flatCoordinates, offset, end, stride) {
  const chunks = [];
  let cursor = offset;
  let chunkM = 0;
  let currentChunk = flatCoordinates.slice(offset, 2);
  while (chunkM < chunkLength && cursor + stride < end) {
    const [x1, y1] = currentChunk.slice(-2);
    const x2 = flatCoordinates[cursor + stride];
    const y2 = flatCoordinates[cursor + stride + 1];
    const segmentLength = Math.sqrt(
      (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
    );
    chunkM += segmentLength;
    if (chunkM >= chunkLength) {
      const m = (chunkLength - chunkM + segmentLength) / segmentLength;
      const x = lerp(x1, x2, m);
      const y = lerp(y1, y2, m);
      currentChunk.push(x, y);
      chunks.push(currentChunk);
      currentChunk = [x, y];
      if (chunkM == chunkLength) {
        cursor += stride;
      }
      chunkM = 0;
    } else if (chunkM < chunkLength) {
      currentChunk.push(
        flatCoordinates[cursor + stride],
        flatCoordinates[cursor + stride + 1]
      );
      cursor += stride;
    } else {
      const missing = segmentLength - chunkM;
      const x = lerp(x1, x2, missing / segmentLength);
      const y = lerp(y1, y2, missing / segmentLength);
      currentChunk.push(x, y);
      chunks.push(currentChunk);
      currentChunk = [x, y];
      chunkM = 0;
      cursor += stride;
    }
  }
  if (chunkM > 0) {
    chunks.push(currentChunk);
  }
  return chunks;
}

// node_modules/ol/geom/flat/straightchunk.js
function matchingChunk(maxAngle, flatCoordinates, offset, end, stride) {
  let chunkStart = offset;
  let chunkEnd = offset;
  let chunkM = 0;
  let m = 0;
  let start = offset;
  let acos, i, m12, m23, x1, y1, x12, y12, x23, y23;
  for (i = offset; i < end; i += stride) {
    const x2 = flatCoordinates[i];
    const y2 = flatCoordinates[i + 1];
    if (x1 !== void 0) {
      x23 = x2 - x1;
      y23 = y2 - y1;
      m23 = Math.sqrt(x23 * x23 + y23 * y23);
      if (x12 !== void 0) {
        m += m12;
        acos = Math.acos((x12 * x23 + y12 * y23) / (m12 * m23));
        if (acos > maxAngle) {
          if (m > chunkM) {
            chunkM = m;
            chunkStart = start;
            chunkEnd = i;
          }
          m = 0;
          start = i - stride;
        }
      }
      m12 = m23;
      x12 = x23;
      y12 = y23;
    }
    x1 = x2;
    y1 = y2;
  }
  m += m23;
  return m > chunkM ? [start, i] : [chunkStart, chunkEnd];
}

// node_modules/ol/render/canvas/TextBuilder.js
var TEXT_ALIGN = {
  "left": 0,
  "center": 0.5,
  "right": 1,
  "top": 0,
  "middle": 0.5,
  "hanging": 0.2,
  "alphabetic": 0.8,
  "ideographic": 0.8,
  "bottom": 1
};
var CanvasTextBuilder = class extends Builder_default {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Maximum extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    super(tolerance, maxExtent, resolution, pixelRatio);
    this.labels_ = null;
    this.text_ = "";
    this.textOffsetX_ = 0;
    this.textOffsetY_ = 0;
    this.textRotateWithView_ = void 0;
    this.textRotation_ = 0;
    this.textFillState_ = null;
    this.fillStates = {};
    this.fillStates[defaultFillStyle] = { fillStyle: defaultFillStyle };
    this.textStrokeState_ = null;
    this.strokeStates = {};
    this.textState_ = /** @type {import("../canvas.js").TextState} */
    {};
    this.textStates = {};
    this.textKey_ = "";
    this.fillKey_ = "";
    this.strokeKey_ = "";
    this.declutterImageWithText_ = void 0;
  }
  /**
   * @return {import("../canvas.js").SerializableInstructions} the serializable instructions.
   */
  finish() {
    const instructions = super.finish();
    instructions.textStates = this.textStates;
    instructions.fillStates = this.fillStates;
    instructions.strokeStates = this.strokeStates;
    return instructions;
  }
  /**
   * @param {import("../../geom/SimpleGeometry.js").default|import("../Feature.js").default} geometry Geometry.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   */
  drawText(geometry, feature) {
    const fillState = this.textFillState_;
    const strokeState = this.textStrokeState_;
    const textState = this.textState_;
    if (this.text_ === "" || !textState || !fillState && !strokeState) {
      return;
    }
    const coordinates = this.coordinates;
    let begin = coordinates.length;
    const geometryType = geometry.getType();
    let flatCoordinates = null;
    let stride = geometry.getStride();
    if (textState.placement === "line" && (geometryType == "LineString" || geometryType == "MultiLineString" || geometryType == "Polygon" || geometryType == "MultiPolygon")) {
      if (!intersects(this.getBufferedMaxExtent(), geometry.getExtent())) {
        return;
      }
      let ends;
      flatCoordinates = geometry.getFlatCoordinates();
      if (geometryType == "LineString") {
        ends = [flatCoordinates.length];
      } else if (geometryType == "MultiLineString") {
        ends = /** @type {import("../../geom/MultiLineString.js").default} */
        geometry.getEnds();
      } else if (geometryType == "Polygon") {
        ends = /** @type {import("../../geom/Polygon.js").default} */
        geometry.getEnds().slice(0, 1);
      } else if (geometryType == "MultiPolygon") {
        const endss = (
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry.getEndss()
        );
        ends = [];
        for (let i = 0, ii = endss.length; i < ii; ++i) {
          ends.push(endss[i][0]);
        }
      }
      this.beginGeometry(geometry, feature);
      const repeat = textState.repeat;
      const textAlign = repeat ? void 0 : textState.textAlign;
      let flatOffset = 0;
      for (let o = 0, oo = ends.length; o < oo; ++o) {
        let chunks;
        if (repeat) {
          chunks = lineChunk(
            repeat * this.resolution,
            flatCoordinates,
            flatOffset,
            ends[o],
            stride
          );
        } else {
          chunks = [flatCoordinates.slice(flatOffset, ends[o])];
        }
        for (let c = 0, cc = chunks.length; c < cc; ++c) {
          const chunk = chunks[c];
          let chunkBegin = 0;
          let chunkEnd = chunk.length;
          if (textAlign == void 0) {
            const range = matchingChunk(
              textState.maxAngle,
              chunk,
              0,
              chunk.length,
              2
            );
            chunkBegin = range[0];
            chunkEnd = range[1];
          }
          for (let i = chunkBegin; i < chunkEnd; i += stride) {
            coordinates.push(chunk[i], chunk[i + 1]);
          }
          const end = coordinates.length;
          flatOffset = ends[o];
          this.drawChars_(begin, end);
          begin = end;
        }
      }
      this.endGeometry(feature);
    } else {
      let geometryWidths = textState.overflow ? null : [];
      switch (geometryType) {
        case "Point":
        case "MultiPoint":
          flatCoordinates = /** @type {import("../../geom/MultiPoint.js").default} */
          geometry.getFlatCoordinates();
          break;
        case "LineString":
          flatCoordinates = /** @type {import("../../geom/LineString.js").default} */
          geometry.getFlatMidpoint();
          break;
        case "Circle":
          flatCoordinates = /** @type {import("../../geom/Circle.js").default} */
          geometry.getCenter();
          break;
        case "MultiLineString":
          flatCoordinates = /** @type {import("../../geom/MultiLineString.js").default} */
          geometry.getFlatMidpoints();
          stride = 2;
          break;
        case "Polygon":
          flatCoordinates = /** @type {import("../../geom/Polygon.js").default} */
          geometry.getFlatInteriorPoint();
          if (!textState.overflow) {
            geometryWidths.push(flatCoordinates[2] / this.resolution);
          }
          stride = 3;
          break;
        case "MultiPolygon":
          const interiorPoints = (
            /** @type {import("../../geom/MultiPolygon.js").default} */
            geometry.getFlatInteriorPoints()
          );
          flatCoordinates = [];
          for (let i = 0, ii = interiorPoints.length; i < ii; i += 3) {
            if (!textState.overflow) {
              geometryWidths.push(interiorPoints[i + 2] / this.resolution);
            }
            flatCoordinates.push(interiorPoints[i], interiorPoints[i + 1]);
          }
          if (flatCoordinates.length === 0) {
            return;
          }
          stride = 2;
          break;
        default:
      }
      const end = this.appendFlatPointCoordinates(flatCoordinates, stride);
      if (end === begin) {
        return;
      }
      if (geometryWidths && (end - begin) / 2 !== flatCoordinates.length / stride) {
        let beg = begin / 2;
        geometryWidths = geometryWidths.filter((w, i) => {
          const keep = coordinates[(beg + i) * 2] === flatCoordinates[i * stride] && coordinates[(beg + i) * 2 + 1] === flatCoordinates[i * stride + 1];
          if (!keep) {
            --beg;
          }
          return keep;
        });
      }
      this.saveTextStates_();
      if (textState.backgroundFill || textState.backgroundStroke) {
        this.setFillStrokeStyle(
          textState.backgroundFill,
          textState.backgroundStroke
        );
        if (textState.backgroundFill) {
          this.updateFillStyle(this.state, this.createFill);
        }
        if (textState.backgroundStroke) {
          this.updateStrokeStyle(this.state, this.applyStroke);
          this.hitDetectionInstructions.push(this.createStroke(this.state));
        }
      }
      this.beginGeometry(geometry, feature);
      let padding = textState.padding;
      if (padding != defaultPadding && (textState.scale[0] < 0 || textState.scale[1] < 0)) {
        let p0 = textState.padding[0];
        let p12 = textState.padding[1];
        let p22 = textState.padding[2];
        let p32 = textState.padding[3];
        if (textState.scale[0] < 0) {
          p12 = -p12;
          p32 = -p32;
        }
        if (textState.scale[1] < 0) {
          p0 = -p0;
          p22 = -p22;
        }
        padding = [p0, p12, p22, p32];
      }
      const pixelRatio = this.pixelRatio;
      this.instructions.push([
        Instruction_default.DRAW_IMAGE,
        begin,
        end,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [1, 1],
        NaN,
        void 0,
        this.declutterImageWithText_,
        padding == defaultPadding ? defaultPadding : padding.map(function(p) {
          return p * pixelRatio;
        }),
        !!textState.backgroundFill,
        !!textState.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        geometryWidths
      ]);
      const scale = 1 / pixelRatio;
      const currentFillStyle = this.state.fillStyle;
      if (textState.backgroundFill) {
        this.state.fillStyle = defaultFillStyle;
        this.hitDetectionInstructions.push(this.createFill(this.state));
      }
      this.hitDetectionInstructions.push([
        Instruction_default.DRAW_IMAGE,
        begin,
        end,
        null,
        NaN,
        NaN,
        NaN,
        1,
        0,
        0,
        this.textRotateWithView_,
        this.textRotation_,
        [scale, scale],
        NaN,
        void 0,
        this.declutterImageWithText_,
        padding,
        !!textState.backgroundFill,
        !!textState.backgroundStroke,
        this.text_,
        this.textKey_,
        this.strokeKey_,
        this.fillKey_ ? defaultFillStyle : this.fillKey_,
        this.textOffsetX_,
        this.textOffsetY_,
        geometryWidths
      ]);
      if (textState.backgroundFill) {
        this.state.fillStyle = currentFillStyle;
        this.hitDetectionInstructions.push(this.createFill(this.state));
      }
      this.endGeometry(feature);
    }
  }
  /**
   * @private
   */
  saveTextStates_() {
    const strokeState = this.textStrokeState_;
    const textState = this.textState_;
    const fillState = this.textFillState_;
    const strokeKey = this.strokeKey_;
    if (strokeState) {
      if (!(strokeKey in this.strokeStates)) {
        this.strokeStates[strokeKey] = {
          strokeStyle: strokeState.strokeStyle,
          lineCap: strokeState.lineCap,
          lineDashOffset: strokeState.lineDashOffset,
          lineWidth: strokeState.lineWidth,
          lineJoin: strokeState.lineJoin,
          miterLimit: strokeState.miterLimit,
          lineDash: strokeState.lineDash
        };
      }
    }
    const textKey = this.textKey_;
    if (!(textKey in this.textStates)) {
      this.textStates[textKey] = {
        font: textState.font,
        textAlign: textState.textAlign || defaultTextAlign,
        justify: textState.justify,
        textBaseline: textState.textBaseline || defaultTextBaseline,
        scale: textState.scale
      };
    }
    const fillKey = this.fillKey_;
    if (fillState) {
      if (!(fillKey in this.fillStates)) {
        this.fillStates[fillKey] = {
          fillStyle: fillState.fillStyle
        };
      }
    }
  }
  /**
   * @private
   * @param {number} begin Begin.
   * @param {number} end End.
   */
  drawChars_(begin, end) {
    const strokeState = this.textStrokeState_;
    const textState = this.textState_;
    const strokeKey = this.strokeKey_;
    const textKey = this.textKey_;
    const fillKey = this.fillKey_;
    this.saveTextStates_();
    const pixelRatio = this.pixelRatio;
    const baseline = TEXT_ALIGN[textState.textBaseline];
    const offsetY = this.textOffsetY_ * pixelRatio;
    const text = this.text_;
    const strokeWidth = strokeState ? strokeState.lineWidth * Math.abs(textState.scale[0]) / 2 : 0;
    this.instructions.push([
      Instruction_default.DRAW_CHARS,
      begin,
      end,
      baseline,
      textState.overflow,
      fillKey,
      textState.maxAngle,
      pixelRatio,
      offsetY,
      strokeKey,
      strokeWidth * pixelRatio,
      text,
      textKey,
      1
    ]);
    this.hitDetectionInstructions.push([
      Instruction_default.DRAW_CHARS,
      begin,
      end,
      baseline,
      textState.overflow,
      fillKey ? defaultFillStyle : fillKey,
      textState.maxAngle,
      pixelRatio,
      offsetY,
      strokeKey,
      strokeWidth * pixelRatio,
      text,
      textKey,
      1 / pixelRatio
    ]);
  }
  /**
   * @param {import("../../style/Text.js").default} textStyle Text style.
   * @param {Object} [sharedData] Shared data.
   */
  setTextStyle(textStyle, sharedData) {
    let textState, fillState, strokeState;
    if (!textStyle) {
      this.text_ = "";
    } else {
      const textFillStyle = textStyle.getFill();
      if (!textFillStyle) {
        fillState = null;
        this.textFillState_ = fillState;
      } else {
        fillState = this.textFillState_;
        if (!fillState) {
          fillState = /** @type {import("../canvas.js").FillState} */
          {};
          this.textFillState_ = fillState;
        }
        fillState.fillStyle = asColorLike(
          textFillStyle.getColor() || defaultFillStyle
        );
      }
      const textStrokeStyle = textStyle.getStroke();
      if (!textStrokeStyle) {
        strokeState = null;
        this.textStrokeState_ = strokeState;
      } else {
        strokeState = this.textStrokeState_;
        if (!strokeState) {
          strokeState = /** @type {import("../canvas.js").StrokeState} */
          {};
          this.textStrokeState_ = strokeState;
        }
        const lineDash = textStrokeStyle.getLineDash();
        const lineDashOffset = textStrokeStyle.getLineDashOffset();
        const lineWidth = textStrokeStyle.getWidth();
        const miterLimit = textStrokeStyle.getMiterLimit();
        strokeState.lineCap = textStrokeStyle.getLineCap() || defaultLineCap;
        strokeState.lineDash = lineDash ? lineDash.slice() : defaultLineDash;
        strokeState.lineDashOffset = lineDashOffset === void 0 ? defaultLineDashOffset : lineDashOffset;
        strokeState.lineJoin = textStrokeStyle.getLineJoin() || defaultLineJoin;
        strokeState.lineWidth = lineWidth === void 0 ? defaultLineWidth : lineWidth;
        strokeState.miterLimit = miterLimit === void 0 ? defaultMiterLimit : miterLimit;
        strokeState.strokeStyle = asColorLike(
          textStrokeStyle.getColor() || defaultStrokeStyle
        );
      }
      textState = this.textState_;
      const font = textStyle.getFont() || defaultFont;
      registerFont(font);
      const textScale = textStyle.getScaleArray();
      textState.overflow = textStyle.getOverflow();
      textState.font = font;
      textState.maxAngle = textStyle.getMaxAngle();
      textState.placement = textStyle.getPlacement();
      textState.textAlign = textStyle.getTextAlign();
      textState.repeat = textStyle.getRepeat();
      textState.justify = textStyle.getJustify();
      textState.textBaseline = textStyle.getTextBaseline() || defaultTextBaseline;
      textState.backgroundFill = textStyle.getBackgroundFill();
      textState.backgroundStroke = textStyle.getBackgroundStroke();
      textState.padding = textStyle.getPadding() || defaultPadding;
      textState.scale = textScale === void 0 ? [1, 1] : textScale;
      const textOffsetX = textStyle.getOffsetX();
      const textOffsetY = textStyle.getOffsetY();
      const textRotateWithView = textStyle.getRotateWithView();
      const textRotation = textStyle.getRotation();
      this.text_ = textStyle.getText() || "";
      this.textOffsetX_ = textOffsetX === void 0 ? 0 : textOffsetX;
      this.textOffsetY_ = textOffsetY === void 0 ? 0 : textOffsetY;
      this.textRotateWithView_ = textRotateWithView === void 0 ? false : textRotateWithView;
      this.textRotation_ = textRotation === void 0 ? 0 : textRotation;
      this.strokeKey_ = strokeState ? (typeof strokeState.strokeStyle == "string" ? strokeState.strokeStyle : getUid(strokeState.strokeStyle)) + strokeState.lineCap + strokeState.lineDashOffset + "|" + strokeState.lineWidth + strokeState.lineJoin + strokeState.miterLimit + "[" + strokeState.lineDash.join() + "]" : "";
      this.textKey_ = textState.font + textState.scale + (textState.textAlign || "?") + (textState.repeat || "?") + (textState.justify || "?") + (textState.textBaseline || "?");
      this.fillKey_ = fillState ? typeof fillState.fillStyle == "string" ? fillState.fillStyle : "|" + getUid(fillState.fillStyle) : "";
    }
    this.declutterImageWithText_ = sharedData;
  }
};
var TextBuilder_default = CanvasTextBuilder;

// node_modules/ol/render/canvas/BuilderGroup.js
var BATCH_CONSTRUCTORS = {
  "Circle": PolygonBuilder_default,
  "Default": Builder_default,
  "Image": ImageBuilder_default,
  "LineString": LineStringBuilder_default,
  "Polygon": PolygonBuilder_default,
  "Text": TextBuilder_default
};
var BuilderGroup = class {
  /**
   * @param {number} tolerance Tolerance.
   * @param {import("../../extent.js").Extent} maxExtent Max extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   */
  constructor(tolerance, maxExtent, resolution, pixelRatio) {
    this.tolerance_ = tolerance;
    this.maxExtent_ = maxExtent;
    this.pixelRatio_ = pixelRatio;
    this.resolution_ = resolution;
    this.buildersByZIndex_ = {};
  }
  /**
   * @return {!Object<string, !Object<import("../canvas.js").BuilderType, import("./Builder.js").SerializableInstructions>>} The serializable instructions
   */
  finish() {
    const builderInstructions = {};
    for (const zKey in this.buildersByZIndex_) {
      builderInstructions[zKey] = builderInstructions[zKey] || {};
      const builders = this.buildersByZIndex_[zKey];
      for (const builderKey in builders) {
        const builderInstruction = builders[builderKey].finish();
        builderInstructions[zKey][builderKey] = builderInstruction;
      }
    }
    return builderInstructions;
  }
  /**
   * @param {number|undefined} zIndex Z index.
   * @param {import("../canvas.js").BuilderType} builderType Replay type.
   * @return {import("../VectorContext.js").default} Replay.
   */
  getBuilder(zIndex, builderType) {
    const zIndexKey = zIndex !== void 0 ? zIndex.toString() : "0";
    let replays = this.buildersByZIndex_[zIndexKey];
    if (replays === void 0) {
      replays = {};
      this.buildersByZIndex_[zIndexKey] = replays;
    }
    let replay = replays[builderType];
    if (replay === void 0) {
      const Constructor = BATCH_CONSTRUCTORS[builderType];
      replay = new Constructor(
        this.tolerance_,
        this.maxExtent_,
        this.resolution_,
        this.pixelRatio_
      );
      replays[builderType] = replay;
    }
    return replay;
  }
};
var BuilderGroup_default = BuilderGroup;

// node_modules/ol/geom/flat/textpath.js
function drawTextOnPath(flatCoordinates, offset, end, stride, text, startM, maxAngle, scale, measureAndCacheTextWidth2, font, cache, rotation) {
  let x2 = flatCoordinates[offset];
  let y2 = flatCoordinates[offset + 1];
  let x1 = 0;
  let y1 = 0;
  let segmentLength = 0;
  let segmentM = 0;
  function advance() {
    x1 = x2;
    y1 = y2;
    offset += stride;
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];
    segmentM += segmentLength;
    segmentLength = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
  }
  do {
    advance();
  } while (offset < end - stride && segmentM + segmentLength < startM);
  let interpolate = segmentLength === 0 ? 0 : (startM - segmentM) / segmentLength;
  const beginX = lerp(x1, x2, interpolate);
  const beginY = lerp(y1, y2, interpolate);
  const startOffset = offset - stride;
  const startLength = segmentM;
  const endM = startM + scale * measureAndCacheTextWidth2(font, text, cache);
  while (offset < end - stride && segmentM + segmentLength < endM) {
    advance();
  }
  interpolate = segmentLength === 0 ? 0 : (endM - segmentM) / segmentLength;
  const endX = lerp(x1, x2, interpolate);
  const endY = lerp(y1, y2, interpolate);
  let reverse;
  if (rotation) {
    const flat = [beginX, beginY, endX, endY];
    rotate(flat, 0, 4, 2, rotation, flat, flat);
    reverse = flat[0] > flat[2];
  } else {
    reverse = beginX > endX;
  }
  const PI = Math.PI;
  const result = [];
  const singleSegment = startOffset + stride === offset;
  offset = startOffset;
  segmentLength = 0;
  segmentM = startLength;
  x2 = flatCoordinates[offset];
  y2 = flatCoordinates[offset + 1];
  let previousAngle;
  if (singleSegment) {
    advance();
    previousAngle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      previousAngle += previousAngle > 0 ? -PI : PI;
    }
    const x = (endX + beginX) / 2;
    const y = (endY + beginY) / 2;
    result[0] = [x, y, (endM - startM) / 2, previousAngle, text];
    return result;
  }
  text = text.replace(/\n/g, " ");
  for (let i = 0, ii = text.length; i < ii; ) {
    advance();
    let angle = Math.atan2(y2 - y1, x2 - x1);
    if (reverse) {
      angle += angle > 0 ? -PI : PI;
    }
    if (previousAngle !== void 0) {
      let delta = angle - previousAngle;
      delta += delta > PI ? -2 * PI : delta < -PI ? 2 * PI : 0;
      if (Math.abs(delta) > maxAngle) {
        return null;
      }
    }
    previousAngle = angle;
    const iStart = i;
    let charLength = 0;
    for (; i < ii; ++i) {
      const index = reverse ? ii - i - 1 : i;
      const len = scale * measureAndCacheTextWidth2(font, text[index], cache);
      if (offset + stride < end && segmentM + segmentLength < startM + charLength + len / 2) {
        break;
      }
      charLength += len;
    }
    if (i === iStart) {
      continue;
    }
    const chars = reverse ? text.substring(ii - iStart, ii - i) : text.substring(iStart, i);
    interpolate = segmentLength === 0 ? 0 : (startM + charLength / 2 - segmentM) / segmentLength;
    const x = lerp(x1, x2, interpolate);
    const y = lerp(y1, y2, interpolate);
    result.push([x, y, charLength / 2, angle, chars]);
    startM += charLength;
  }
  return result;
}

// node_modules/ol/render/canvas/Executor.js
var tmpExtent = createEmpty();
var p1 = [];
var p2 = [];
var p3 = [];
var p4 = [];
function getDeclutterBox(replayImageOrLabelArgs) {
  return replayImageOrLabelArgs[3].declutterBox;
}
var rtlRegEx = new RegExp(
  /* eslint-disable prettier/prettier */
  "[" + String.fromCharCode(1425) + "-" + String.fromCharCode(2303) + String.fromCharCode(64285) + "-" + String.fromCharCode(65023) + String.fromCharCode(65136) + "-" + String.fromCharCode(65276) + String.fromCharCode(67584) + "-" + String.fromCharCode(69631) + String.fromCharCode(124928) + "-" + String.fromCharCode(126975) + "]"
  /* eslint-enable prettier/prettier */
);
function horizontalTextAlign(text, align) {
  if (align === "start") {
    align = rtlRegEx.test(text) ? "right" : "left";
  } else if (align === "end") {
    align = rtlRegEx.test(text) ? "left" : "right";
  }
  return TEXT_ALIGN[align];
}
function createTextChunks(acc, line, i) {
  if (i > 0) {
    acc.push("\n", "");
  }
  acc.push(line, "");
  return acc;
}
var Executor = class {
  /**
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The replay can have overlapping geometries.
   * @param {import("../canvas.js").SerializableInstructions} instructions The serializable instructions
   */
  constructor(resolution, pixelRatio, overlaps, instructions) {
    this.overlaps = overlaps;
    this.pixelRatio = pixelRatio;
    this.resolution = resolution;
    this.alignFill_;
    this.instructions = instructions.instructions;
    this.coordinates = instructions.coordinates;
    this.coordinateCache_ = {};
    this.renderedTransform_ = create();
    this.hitDetectionInstructions = instructions.hitDetectionInstructions;
    this.pixelCoordinates_ = null;
    this.viewRotation_ = 0;
    this.fillStates = instructions.fillStates || {};
    this.strokeStates = instructions.strokeStates || {};
    this.textStates = instructions.textStates || {};
    this.widths_ = {};
    this.labels_ = {};
  }
  /**
   * @param {string|Array<string>} text Text.
   * @param {string} textKey Text style key.
   * @param {string} fillKey Fill style key.
   * @param {string} strokeKey Stroke style key.
   * @return {import("../canvas.js").Label} Label.
   */
  createLabel(text, textKey, fillKey, strokeKey) {
    const key = text + textKey + fillKey + strokeKey;
    if (this.labels_[key]) {
      return this.labels_[key];
    }
    const strokeState = strokeKey ? this.strokeStates[strokeKey] : null;
    const fillState = fillKey ? this.fillStates[fillKey] : null;
    const textState = this.textStates[textKey];
    const pixelRatio = this.pixelRatio;
    const scale = [
      textState.scale[0] * pixelRatio,
      textState.scale[1] * pixelRatio
    ];
    const textIsArray = Array.isArray(text);
    const align = textState.justify ? TEXT_ALIGN[textState.justify] : horizontalTextAlign(
      Array.isArray(text) ? text[0] : text,
      textState.textAlign || defaultTextAlign
    );
    const strokeWidth = strokeKey && strokeState.lineWidth ? strokeState.lineWidth : 0;
    const chunks = textIsArray ? text : text.split("\n").reduce(createTextChunks, []);
    const { width, height, widths, heights, lineWidths } = getTextDimensions(
      textState,
      chunks
    );
    const renderWidth = width + strokeWidth;
    const contextInstructions = [];
    const w = (renderWidth + 2) * scale[0];
    const h = (height + strokeWidth) * scale[1];
    const label = {
      width: w < 0 ? Math.floor(w) : Math.ceil(w),
      height: h < 0 ? Math.floor(h) : Math.ceil(h),
      contextInstructions
    };
    if (scale[0] != 1 || scale[1] != 1) {
      contextInstructions.push("scale", scale);
    }
    if (strokeKey) {
      contextInstructions.push("strokeStyle", strokeState.strokeStyle);
      contextInstructions.push("lineWidth", strokeWidth);
      contextInstructions.push("lineCap", strokeState.lineCap);
      contextInstructions.push("lineJoin", strokeState.lineJoin);
      contextInstructions.push("miterLimit", strokeState.miterLimit);
      contextInstructions.push("setLineDash", [strokeState.lineDash]);
      contextInstructions.push("lineDashOffset", strokeState.lineDashOffset);
    }
    if (fillKey) {
      contextInstructions.push("fillStyle", fillState.fillStyle);
    }
    contextInstructions.push("textBaseline", "middle");
    contextInstructions.push("textAlign", "center");
    const leftRight = 0.5 - align;
    let x = align * renderWidth + leftRight * strokeWidth;
    const strokeInstructions = [];
    const fillInstructions = [];
    let lineHeight = 0;
    let lineOffset = 0;
    let widthHeightIndex = 0;
    let lineWidthIndex = 0;
    let previousFont;
    for (let i = 0, ii = chunks.length; i < ii; i += 2) {
      const text2 = chunks[i];
      if (text2 === "\n") {
        lineOffset += lineHeight;
        lineHeight = 0;
        x = align * renderWidth + leftRight * strokeWidth;
        ++lineWidthIndex;
        continue;
      }
      const font = chunks[i + 1] || textState.font;
      if (font !== previousFont) {
        if (strokeKey) {
          strokeInstructions.push("font", font);
        }
        if (fillKey) {
          fillInstructions.push("font", font);
        }
        previousFont = font;
      }
      lineHeight = Math.max(lineHeight, heights[widthHeightIndex]);
      const fillStrokeArgs = [
        text2,
        x + leftRight * widths[widthHeightIndex] + align * (widths[widthHeightIndex] - lineWidths[lineWidthIndex]),
        0.5 * (strokeWidth + lineHeight) + lineOffset
      ];
      x += widths[widthHeightIndex];
      if (strokeKey) {
        strokeInstructions.push("strokeText", fillStrokeArgs);
      }
      if (fillKey) {
        fillInstructions.push("fillText", fillStrokeArgs);
      }
      ++widthHeightIndex;
    }
    Array.prototype.push.apply(contextInstructions, strokeInstructions);
    Array.prototype.push.apply(contextInstructions, fillInstructions);
    this.labels_[key] = label;
    return label;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../coordinate.js").Coordinate} p1 1st point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p2 2nd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p3 3rd point of the background box.
   * @param {import("../../coordinate.js").Coordinate} p4 4th point of the background box.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   */
  replayTextBackground_(context, p12, p22, p32, p42, fillInstruction2, strokeInstruction2) {
    context.beginPath();
    context.moveTo.apply(context, p12);
    context.lineTo.apply(context, p22);
    context.lineTo.apply(context, p32);
    context.lineTo.apply(context, p42);
    context.lineTo.apply(context, p12);
    if (fillInstruction2) {
      this.alignFill_ = /** @type {boolean} */
      fillInstruction2[2];
      this.fill_(context);
    }
    if (strokeInstruction2) {
      this.setStrokeStyle_(
        context,
        /** @type {Array<*>} */
        strokeInstruction2
      );
      context.stroke();
    }
  }
  /**
   * @private
   * @param {number} sheetWidth Width of the sprite sheet.
   * @param {number} sheetHeight Height of the sprite sheet.
   * @param {number} centerX X.
   * @param {number} centerY Y.
   * @param {number} width Width.
   * @param {number} height Height.
   * @param {number} anchorX Anchor X.
   * @param {number} anchorY Anchor Y.
   * @param {number} originX Origin X.
   * @param {number} originY Origin Y.
   * @param {number} rotation Rotation.
   * @param {import("../../size.js").Size} scale Scale.
   * @param {boolean} snapToPixel Snap to pixel.
   * @param {Array<number>} padding Padding.
   * @param {boolean} fillStroke Background fill or stroke.
   * @param {import("../../Feature.js").FeatureLike} feature Feature.
   * @return {ImageOrLabelDimensions} Dimensions for positioning and decluttering the image or label.
   */
  calculateImageOrLabelDimensions_(sheetWidth, sheetHeight, centerX, centerY, width, height, anchorX, anchorY, originX, originY, rotation, scale, snapToPixel, padding, fillStroke, feature) {
    anchorX *= scale[0];
    anchorY *= scale[1];
    let x = centerX - anchorX;
    let y = centerY - anchorY;
    const w = width + originX > sheetWidth ? sheetWidth - originX : width;
    const h = height + originY > sheetHeight ? sheetHeight - originY : height;
    const boxW = padding[3] + w * scale[0] + padding[1];
    const boxH = padding[0] + h * scale[1] + padding[2];
    const boxX = x - padding[3];
    const boxY = y - padding[0];
    if (fillStroke || rotation !== 0) {
      p1[0] = boxX;
      p4[0] = boxX;
      p1[1] = boxY;
      p2[1] = boxY;
      p2[0] = boxX + boxW;
      p3[0] = p2[0];
      p3[1] = boxY + boxH;
      p4[1] = p3[1];
    }
    let transform;
    if (rotation !== 0) {
      transform = compose(
        create(),
        centerX,
        centerY,
        1,
        1,
        rotation,
        -centerX,
        -centerY
      );
      apply(transform, p1);
      apply(transform, p2);
      apply(transform, p3);
      apply(transform, p4);
      createOrUpdate(
        Math.min(p1[0], p2[0], p3[0], p4[0]),
        Math.min(p1[1], p2[1], p3[1], p4[1]),
        Math.max(p1[0], p2[0], p3[0], p4[0]),
        Math.max(p1[1], p2[1], p3[1], p4[1]),
        tmpExtent
      );
    } else {
      createOrUpdate(
        Math.min(boxX, boxX + boxW),
        Math.min(boxY, boxY + boxH),
        Math.max(boxX, boxX + boxW),
        Math.max(boxY, boxY + boxH),
        tmpExtent
      );
    }
    if (snapToPixel) {
      x = Math.round(x);
      y = Math.round(y);
    }
    return {
      drawImageX: x,
      drawImageY: y,
      drawImageW: w,
      drawImageH: h,
      originX,
      originY,
      declutterBox: {
        minX: tmpExtent[0],
        minY: tmpExtent[1],
        maxX: tmpExtent[2],
        maxY: tmpExtent[3],
        value: feature
      },
      canvasTransform: transform,
      scale
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../canvas.js").Label|HTMLImageElement|HTMLCanvasElement|HTMLVideoElement} imageOrLabel Image.
   * @param {ImageOrLabelDimensions} dimensions Dimensions.
   * @param {number} opacity Opacity.
   * @param {Array<*>} fillInstruction Fill instruction.
   * @param {Array<*>} strokeInstruction Stroke instruction.
   * @return {boolean} The image or label was rendered.
   */
  replayImageOrLabel_(context, contextScale, imageOrLabel, dimensions, opacity, fillInstruction2, strokeInstruction2) {
    const fillStroke = !!(fillInstruction2 || strokeInstruction2);
    const box = dimensions.declutterBox;
    const canvas = context.canvas;
    const strokePadding = strokeInstruction2 ? strokeInstruction2[2] * dimensions.scale[0] / 2 : 0;
    const intersects2 = box.minX - strokePadding <= canvas.width / contextScale && box.maxX + strokePadding >= 0 && box.minY - strokePadding <= canvas.height / contextScale && box.maxY + strokePadding >= 0;
    if (intersects2) {
      if (fillStroke) {
        this.replayTextBackground_(
          context,
          p1,
          p2,
          p3,
          p4,
          /** @type {Array<*>} */
          fillInstruction2,
          /** @type {Array<*>} */
          strokeInstruction2
        );
      }
      drawImageOrLabel(
        context,
        dimensions.canvasTransform,
        opacity,
        imageOrLabel,
        dimensions.originX,
        dimensions.originY,
        dimensions.drawImageW,
        dimensions.drawImageH,
        dimensions.drawImageX,
        dimensions.drawImageY,
        dimensions.scale
      );
    }
    return true;
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   */
  fill_(context) {
    if (this.alignFill_) {
      const origin = apply(this.renderedTransform_, [0, 0]);
      const repeatSize = 512 * this.pixelRatio;
      context.save();
      context.translate(origin[0] % repeatSize, origin[1] % repeatSize);
      context.rotate(this.viewRotation_);
    }
    context.fill();
    if (this.alignFill_) {
      context.restore();
    }
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {Array<*>} instruction Instruction.
   */
  setStrokeStyle_(context, instruction) {
    context["strokeStyle"] = /** @type {import("../../colorlike.js").ColorLike} */
    instruction[1];
    context.lineWidth = /** @type {number} */
    instruction[2];
    context.lineCap = /** @type {CanvasLineCap} */
    instruction[3];
    context.lineJoin = /** @type {CanvasLineJoin} */
    instruction[4];
    context.miterLimit = /** @type {number} */
    instruction[5];
    context.lineDashOffset = /** @type {number} */
    instruction[7];
    context.setLineDash(
      /** @type {Array<number>} */
      instruction[6]
    );
  }
  /**
   * @private
   * @param {string|Array<string>} text The text to draw.
   * @param {string} textKey The key of the text state.
   * @param {string} strokeKey The key for the stroke state.
   * @param {string} fillKey The key for the fill state.
   * @return {{label: import("../canvas.js").Label, anchorX: number, anchorY: number}} The text image and its anchor.
   */
  drawLabelWithPointPlacement_(text, textKey, strokeKey, fillKey) {
    const textState = this.textStates[textKey];
    const label = this.createLabel(text, textKey, fillKey, strokeKey);
    const strokeState = this.strokeStates[strokeKey];
    const pixelRatio = this.pixelRatio;
    const align = horizontalTextAlign(
      Array.isArray(text) ? text[0] : text,
      textState.textAlign || defaultTextAlign
    );
    const baseline = TEXT_ALIGN[textState.textBaseline || defaultTextBaseline];
    const strokeWidth = strokeState && strokeState.lineWidth ? strokeState.lineWidth : 0;
    const width = label.width / pixelRatio - 2 * textState.scale[0];
    const anchorX = align * width + 2 * (0.5 - align) * strokeWidth;
    const anchorY = baseline * label.height / pixelRatio + 2 * (0.5 - baseline) * strokeWidth;
    return {
      label,
      anchorX,
      anchorY
    };
  }
  /**
   * @private
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {Array<*>} instructions Instructions array.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   * @return {T|undefined} Callback result.
   * @template T
   */
  execute_(context, contextScale, transform, instructions, snapToPixel, featureCallback, hitExtent, declutterTree) {
    let pixelCoordinates;
    if (this.pixelCoordinates_ && equals(transform, this.renderedTransform_)) {
      pixelCoordinates = this.pixelCoordinates_;
    } else {
      if (!this.pixelCoordinates_) {
        this.pixelCoordinates_ = [];
      }
      pixelCoordinates = transform2D(
        this.coordinates,
        0,
        this.coordinates.length,
        2,
        transform,
        this.pixelCoordinates_
      );
      setFromArray(this.renderedTransform_, transform);
    }
    let i = 0;
    const ii = instructions.length;
    let d = 0;
    let dd;
    let anchorX, anchorY, prevX, prevY, roundX, roundY, image, text, textKey, strokeKey, fillKey;
    let pendingFill = 0;
    let pendingStroke = 0;
    let lastFillInstruction = null;
    let lastStrokeInstruction = null;
    const coordinateCache = this.coordinateCache_;
    const viewRotation = this.viewRotation_;
    const viewRotationFromTransform = Math.round(Math.atan2(-transform[1], transform[0]) * 1e12) / 1e12;
    const state = (
      /** @type {import("../../render.js").State} */
      {
        context,
        pixelRatio: this.pixelRatio,
        resolution: this.resolution,
        rotation: viewRotation
      }
    );
    const batchSize = this.instructions != instructions || this.overlaps ? 0 : 200;
    let feature;
    let x, y, currentGeometry;
    while (i < ii) {
      const instruction = instructions[i];
      const type = (
        /** @type {import("./Instruction.js").default} */
        instruction[0]
      );
      switch (type) {
        case Instruction_default.BEGIN_GEOMETRY:
          feature = /** @type {import("../../Feature.js").FeatureLike} */
          instruction[1];
          currentGeometry = instruction[3];
          if (!feature.getGeometry()) {
            i = /** @type {number} */
            instruction[2];
          } else if (hitExtent !== void 0 && !intersects(hitExtent, currentGeometry.getExtent())) {
            i = /** @type {number} */
            instruction[2] + 1;
          } else {
            ++i;
          }
          break;
        case Instruction_default.BEGIN_PATH:
          if (pendingFill > batchSize) {
            this.fill_(context);
            pendingFill = 0;
          }
          if (pendingStroke > batchSize) {
            context.stroke();
            pendingStroke = 0;
          }
          if (!pendingFill && !pendingStroke) {
            context.beginPath();
            prevX = NaN;
            prevY = NaN;
          }
          ++i;
          break;
        case Instruction_default.CIRCLE:
          d = /** @type {number} */
          instruction[1];
          const x1 = pixelCoordinates[d];
          const y1 = pixelCoordinates[d + 1];
          const x2 = pixelCoordinates[d + 2];
          const y2 = pixelCoordinates[d + 3];
          const dx = x2 - x1;
          const dy = y2 - y1;
          const r = Math.sqrt(dx * dx + dy * dy);
          context.moveTo(x1 + r, y1);
          context.arc(x1, y1, r, 0, 2 * Math.PI, true);
          ++i;
          break;
        case Instruction_default.CLOSE_PATH:
          context.closePath();
          ++i;
          break;
        case Instruction_default.CUSTOM:
          d = /** @type {number} */
          instruction[1];
          dd = instruction[2];
          const geometry = (
            /** @type {import("../../geom/SimpleGeometry.js").default} */
            instruction[3]
          );
          const renderer = instruction[4];
          const fn = instruction.length == 6 ? instruction[5] : void 0;
          state.geometry = geometry;
          state.feature = feature;
          if (!(i in coordinateCache)) {
            coordinateCache[i] = [];
          }
          const coords = coordinateCache[i];
          if (fn) {
            fn(pixelCoordinates, d, dd, 2, coords);
          } else {
            coords[0] = pixelCoordinates[d];
            coords[1] = pixelCoordinates[d + 1];
            coords.length = 2;
          }
          renderer(coords, state);
          ++i;
          break;
        case Instruction_default.DRAW_IMAGE:
          d = /** @type {number} */
          instruction[1];
          dd = /** @type {number} */
          instruction[2];
          image = /** @type {HTMLCanvasElement|HTMLVideoElement|HTMLImageElement} */
          instruction[3];
          anchorX = /** @type {number} */
          instruction[4];
          anchorY = /** @type {number} */
          instruction[5];
          let height = (
            /** @type {number} */
            instruction[6]
          );
          const opacity = (
            /** @type {number} */
            instruction[7]
          );
          const originX = (
            /** @type {number} */
            instruction[8]
          );
          const originY = (
            /** @type {number} */
            instruction[9]
          );
          const rotateWithView = (
            /** @type {boolean} */
            instruction[10]
          );
          let rotation = (
            /** @type {number} */
            instruction[11]
          );
          const scale = (
            /** @type {import("../../size.js").Size} */
            instruction[12]
          );
          let width = (
            /** @type {number} */
            instruction[13]
          );
          const declutterMode = (
            /** @type {"declutter"|"obstacle"|"none"|undefined} */
            instruction[14]
          );
          const declutterImageWithText = (
            /** @type {import("../canvas.js").DeclutterImageWithText} */
            instruction[15]
          );
          if (!image && instruction.length >= 20) {
            text = /** @type {string} */
            instruction[19];
            textKey = /** @type {string} */
            instruction[20];
            strokeKey = /** @type {string} */
            instruction[21];
            fillKey = /** @type {string} */
            instruction[22];
            const labelWithAnchor = this.drawLabelWithPointPlacement_(
              text,
              textKey,
              strokeKey,
              fillKey
            );
            image = labelWithAnchor.label;
            instruction[3] = image;
            const textOffsetX = (
              /** @type {number} */
              instruction[23]
            );
            anchorX = (labelWithAnchor.anchorX - textOffsetX) * this.pixelRatio;
            instruction[4] = anchorX;
            const textOffsetY = (
              /** @type {number} */
              instruction[24]
            );
            anchorY = (labelWithAnchor.anchorY - textOffsetY) * this.pixelRatio;
            instruction[5] = anchorY;
            height = image.height;
            instruction[6] = height;
            width = image.width;
            instruction[13] = width;
          }
          let geometryWidths;
          if (instruction.length > 25) {
            geometryWidths = /** @type {number} */
            instruction[25];
          }
          let padding, backgroundFill, backgroundStroke;
          if (instruction.length > 17) {
            padding = /** @type {Array<number>} */
            instruction[16];
            backgroundFill = /** @type {boolean} */
            instruction[17];
            backgroundStroke = /** @type {boolean} */
            instruction[18];
          } else {
            padding = defaultPadding;
            backgroundFill = false;
            backgroundStroke = false;
          }
          if (rotateWithView && viewRotationFromTransform) {
            rotation += viewRotation;
          } else if (!rotateWithView && !viewRotationFromTransform) {
            rotation -= viewRotation;
          }
          let widthIndex = 0;
          for (; d < dd; d += 2) {
            if (geometryWidths && geometryWidths[widthIndex++] < width / this.pixelRatio) {
              continue;
            }
            const dimensions = this.calculateImageOrLabelDimensions_(
              image.width,
              image.height,
              pixelCoordinates[d],
              pixelCoordinates[d + 1],
              width,
              height,
              anchorX,
              anchorY,
              originX,
              originY,
              rotation,
              scale,
              snapToPixel,
              padding,
              backgroundFill || backgroundStroke,
              feature
            );
            const args = [
              context,
              contextScale,
              image,
              dimensions,
              opacity,
              backgroundFill ? (
                /** @type {Array<*>} */
                lastFillInstruction
              ) : null,
              backgroundStroke ? (
                /** @type {Array<*>} */
                lastStrokeInstruction
              ) : null
            ];
            if (declutterTree) {
              if (declutterMode === "none") {
                continue;
              } else if (declutterMode === "obstacle") {
                declutterTree.insert(dimensions.declutterBox);
                continue;
              } else {
                let imageArgs;
                let imageDeclutterBox;
                if (declutterImageWithText) {
                  const index = dd - d;
                  if (!declutterImageWithText[index]) {
                    declutterImageWithText[index] = args;
                    continue;
                  }
                  imageArgs = declutterImageWithText[index];
                  delete declutterImageWithText[index];
                  imageDeclutterBox = getDeclutterBox(imageArgs);
                  if (declutterTree.collides(imageDeclutterBox)) {
                    continue;
                  }
                }
                if (declutterTree.collides(dimensions.declutterBox)) {
                  continue;
                }
                if (imageArgs) {
                  declutterTree.insert(imageDeclutterBox);
                  this.replayImageOrLabel_.apply(this, imageArgs);
                }
                declutterTree.insert(dimensions.declutterBox);
              }
            }
            this.replayImageOrLabel_.apply(this, args);
          }
          ++i;
          break;
        case Instruction_default.DRAW_CHARS:
          const begin = (
            /** @type {number} */
            instruction[1]
          );
          const end = (
            /** @type {number} */
            instruction[2]
          );
          const baseline = (
            /** @type {number} */
            instruction[3]
          );
          const overflow = (
            /** @type {number} */
            instruction[4]
          );
          fillKey = /** @type {string} */
          instruction[5];
          const maxAngle = (
            /** @type {number} */
            instruction[6]
          );
          const measurePixelRatio = (
            /** @type {number} */
            instruction[7]
          );
          const offsetY = (
            /** @type {number} */
            instruction[8]
          );
          strokeKey = /** @type {string} */
          instruction[9];
          const strokeWidth = (
            /** @type {number} */
            instruction[10]
          );
          text = /** @type {string} */
          instruction[11];
          textKey = /** @type {string} */
          instruction[12];
          const pixelRatioScale = [
            /** @type {number} */
            instruction[13],
            /** @type {number} */
            instruction[13]
          ];
          const textState = this.textStates[textKey];
          const font = textState.font;
          const textScale = [
            textState.scale[0] * measurePixelRatio,
            textState.scale[1] * measurePixelRatio
          ];
          let cachedWidths;
          if (font in this.widths_) {
            cachedWidths = this.widths_[font];
          } else {
            cachedWidths = {};
            this.widths_[font] = cachedWidths;
          }
          const pathLength = lineStringLength(pixelCoordinates, begin, end, 2);
          const textLength = Math.abs(textScale[0]) * measureAndCacheTextWidth(font, text, cachedWidths);
          if (overflow || textLength <= pathLength) {
            const textAlign = this.textStates[textKey].textAlign;
            const startM = (pathLength - textLength) * horizontalTextAlign(text, textAlign);
            const parts = drawTextOnPath(
              pixelCoordinates,
              begin,
              end,
              2,
              text,
              startM,
              maxAngle,
              Math.abs(textScale[0]),
              measureAndCacheTextWidth,
              font,
              cachedWidths,
              viewRotationFromTransform ? 0 : this.viewRotation_
            );
            drawChars:
              if (parts) {
                const replayImageOrLabelArgs = [];
                let c, cc, chars, label, part;
                if (strokeKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = /** @type {string} */
                    part[4];
                    label = this.createLabel(chars, textKey, "", strokeKey);
                    anchorX = /** @type {number} */
                    part[2] + (textScale[0] < 0 ? -strokeWidth : strokeWidth);
                    anchorY = baseline * label.height + (0.5 - baseline) * 2 * strokeWidth * textScale[1] / textScale[0] - offsetY;
                    const dimensions = this.calculateImageOrLabelDimensions_(
                      label.width,
                      label.height,
                      part[0],
                      part[1],
                      label.width,
                      label.height,
                      anchorX,
                      anchorY,
                      0,
                      0,
                      part[3],
                      pixelRatioScale,
                      false,
                      defaultPadding,
                      false,
                      feature
                    );
                    if (declutterTree && declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([
                      context,
                      contextScale,
                      label,
                      dimensions,
                      1,
                      null,
                      null
                    ]);
                  }
                }
                if (fillKey) {
                  for (c = 0, cc = parts.length; c < cc; ++c) {
                    part = parts[c];
                    chars = /** @type {string} */
                    part[4];
                    label = this.createLabel(chars, textKey, fillKey, "");
                    anchorX = /** @type {number} */
                    part[2];
                    anchorY = baseline * label.height - offsetY;
                    const dimensions = this.calculateImageOrLabelDimensions_(
                      label.width,
                      label.height,
                      part[0],
                      part[1],
                      label.width,
                      label.height,
                      anchorX,
                      anchorY,
                      0,
                      0,
                      part[3],
                      pixelRatioScale,
                      false,
                      defaultPadding,
                      false,
                      feature
                    );
                    if (declutterTree && declutterTree.collides(dimensions.declutterBox)) {
                      break drawChars;
                    }
                    replayImageOrLabelArgs.push([
                      context,
                      contextScale,
                      label,
                      dimensions,
                      1,
                      null,
                      null
                    ]);
                  }
                }
                if (declutterTree) {
                  declutterTree.load(replayImageOrLabelArgs.map(getDeclutterBox));
                }
                for (let i2 = 0, ii2 = replayImageOrLabelArgs.length; i2 < ii2; ++i2) {
                  this.replayImageOrLabel_.apply(this, replayImageOrLabelArgs[i2]);
                }
              }
          }
          ++i;
          break;
        case Instruction_default.END_GEOMETRY:
          if (featureCallback !== void 0) {
            feature = /** @type {import("../../Feature.js").FeatureLike} */
            instruction[1];
            const result = featureCallback(feature, currentGeometry);
            if (result) {
              return result;
            }
          }
          ++i;
          break;
        case Instruction_default.FILL:
          if (batchSize) {
            pendingFill++;
          } else {
            this.fill_(context);
          }
          ++i;
          break;
        case Instruction_default.MOVE_TO_LINE_TO:
          d = /** @type {number} */
          instruction[1];
          dd = /** @type {number} */
          instruction[2];
          x = pixelCoordinates[d];
          y = pixelCoordinates[d + 1];
          roundX = x + 0.5 | 0;
          roundY = y + 0.5 | 0;
          if (roundX !== prevX || roundY !== prevY) {
            context.moveTo(x, y);
            prevX = roundX;
            prevY = roundY;
          }
          for (d += 2; d < dd; d += 2) {
            x = pixelCoordinates[d];
            y = pixelCoordinates[d + 1];
            roundX = x + 0.5 | 0;
            roundY = y + 0.5 | 0;
            if (d == dd - 2 || roundX !== prevX || roundY !== prevY) {
              context.lineTo(x, y);
              prevX = roundX;
              prevY = roundY;
            }
          }
          ++i;
          break;
        case Instruction_default.SET_FILL_STYLE:
          lastFillInstruction = instruction;
          this.alignFill_ = instruction[2];
          if (pendingFill) {
            this.fill_(context);
            pendingFill = 0;
            if (pendingStroke) {
              context.stroke();
              pendingStroke = 0;
            }
          }
          context.fillStyle = /** @type {import("../../colorlike.js").ColorLike} */
          instruction[1];
          ++i;
          break;
        case Instruction_default.SET_STROKE_STYLE:
          lastStrokeInstruction = instruction;
          if (pendingStroke) {
            context.stroke();
            pendingStroke = 0;
          }
          this.setStrokeStyle_(
            context,
            /** @type {Array<*>} */
            instruction
          );
          ++i;
          break;
        case Instruction_default.STROKE:
          if (batchSize) {
            pendingStroke++;
          } else {
            context.stroke();
          }
          ++i;
          break;
        default:
          ++i;
          break;
      }
    }
    if (pendingFill) {
      this.fill_(context);
    }
    if (pendingStroke) {
      context.stroke();
    }
    return void 0;
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and text to integer pixels.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */
  execute(context, contextScale, transform, viewRotation, snapToPixel, declutterTree) {
    this.viewRotation_ = viewRotation;
    this.execute_(
      context,
      contextScale,
      transform,
      this.instructions,
      snapToPixel,
      void 0,
      void 0,
      declutterTree
    );
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {FeatureCallback<T>} [featureCallback] Feature callback.
   * @param {import("../../extent.js").Extent} [hitExtent] Only check
   *     features that intersect this extent.
   * @return {T|undefined} Callback result.
   * @template T
   */
  executeHitDetection(context, transform, viewRotation, featureCallback, hitExtent) {
    this.viewRotation_ = viewRotation;
    return this.execute_(
      context,
      1,
      transform,
      this.hitDetectionInstructions,
      true,
      featureCallback,
      hitExtent
    );
  }
};
var Executor_default = Executor;

// node_modules/ol/render/canvas/ExecutorGroup.js
var ORDER = ["Polygon", "Circle", "LineString", "Image", "Text", "Default"];
var ExecutorGroup = class {
  /**
   * @param {import("../../extent.js").Extent} maxExtent Max extent for clipping. When a
   * `maxExtent` was set on the Builder for this executor group, the same `maxExtent`
   * should be set here, unless the target context does not exceed that extent (which
   * can be the case when rendering to tiles).
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {boolean} overlaps The executor group can have overlapping geometries.
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions
   * The serializable instructions.
   * @param {number} [renderBuffer] Optional rendering buffer.
   */
  constructor(maxExtent, resolution, pixelRatio, overlaps, allInstructions, renderBuffer) {
    this.maxExtent_ = maxExtent;
    this.overlaps_ = overlaps;
    this.pixelRatio_ = pixelRatio;
    this.resolution_ = resolution;
    this.renderBuffer_ = renderBuffer;
    this.executorsByZIndex_ = {};
    this.hitDetectionContext_ = null;
    this.hitDetectionTransform_ = create();
    this.createExecutors_(allInstructions);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  clip(context, transform) {
    const flatClipCoords = this.getClipCoords(transform);
    context.beginPath();
    context.moveTo(flatClipCoords[0], flatClipCoords[1]);
    context.lineTo(flatClipCoords[2], flatClipCoords[3]);
    context.lineTo(flatClipCoords[4], flatClipCoords[5]);
    context.lineTo(flatClipCoords[6], flatClipCoords[7]);
    context.clip();
  }
  /**
   * Create executors and populate them using the provided instructions.
   * @private
   * @param {!Object<string, !Object<import("../canvas.js").BuilderType, import("../canvas.js").SerializableInstructions>>} allInstructions The serializable instructions
   */
  createExecutors_(allInstructions) {
    for (const zIndex in allInstructions) {
      let executors = this.executorsByZIndex_[zIndex];
      if (executors === void 0) {
        executors = {};
        this.executorsByZIndex_[zIndex] = executors;
      }
      const instructionByZindex = allInstructions[zIndex];
      for (const builderType in instructionByZindex) {
        const instructions = instructionByZindex[builderType];
        executors[builderType] = new Executor_default(
          this.resolution_,
          this.pixelRatio_,
          this.overlaps_,
          instructions
        );
      }
    }
  }
  /**
   * @param {Array<import("../canvas.js").BuilderType>} executors Executors.
   * @return {boolean} Has executors of the provided types.
   */
  hasExecutors(executors) {
    for (const zIndex in this.executorsByZIndex_) {
      const candidates = this.executorsByZIndex_[zIndex];
      for (let i = 0, ii = executors.length; i < ii; ++i) {
        if (executors[i] in candidates) {
          return true;
        }
      }
    }
    return false;
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {number} resolution Resolution.
   * @param {number} rotation Rotation.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {function(import("../../Feature.js").FeatureLike, import("../../geom/SimpleGeometry.js").default, number): T} callback Feature callback.
   * @param {Array<import("../../Feature.js").FeatureLike>} declutteredFeatures Decluttered features.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(coordinate, resolution, rotation, hitTolerance, callback, declutteredFeatures) {
    hitTolerance = Math.round(hitTolerance);
    const contextSize = hitTolerance * 2 + 1;
    const transform = compose(
      this.hitDetectionTransform_,
      hitTolerance + 0.5,
      hitTolerance + 0.5,
      1 / resolution,
      -1 / resolution,
      -rotation,
      -coordinate[0],
      -coordinate[1]
    );
    const newContext = !this.hitDetectionContext_;
    if (newContext) {
      this.hitDetectionContext_ = createCanvasContext2D(
        contextSize,
        contextSize,
        void 0,
        { willReadFrequently: true }
      );
    }
    const context = this.hitDetectionContext_;
    if (context.canvas.width !== contextSize || context.canvas.height !== contextSize) {
      context.canvas.width = contextSize;
      context.canvas.height = contextSize;
    } else if (!newContext) {
      context.clearRect(0, 0, contextSize, contextSize);
    }
    let hitExtent;
    if (this.renderBuffer_ !== void 0) {
      hitExtent = createEmpty();
      extendCoordinate(hitExtent, coordinate);
      buffer(
        hitExtent,
        resolution * (this.renderBuffer_ + hitTolerance),
        hitExtent
      );
    }
    const indexes = getPixelIndexArray(hitTolerance);
    let builderType;
    function featureCallback(feature, geometry) {
      const imageData = context.getImageData(
        0,
        0,
        contextSize,
        contextSize
      ).data;
      for (let i2 = 0, ii = indexes.length; i2 < ii; i2++) {
        if (imageData[indexes[i2]] > 0) {
          if (!declutteredFeatures || builderType !== "Image" && builderType !== "Text" || declutteredFeatures.includes(feature)) {
            const idx = (indexes[i2] - 3) / 4;
            const x = hitTolerance - idx % contextSize;
            const y = hitTolerance - (idx / contextSize | 0);
            const result2 = callback(feature, geometry, x * x + y * y);
            if (result2) {
              return result2;
            }
          }
          context.clearRect(0, 0, contextSize, contextSize);
          break;
        }
      }
      return void 0;
    }
    const zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(ascending);
    let i, j, executors, executor, result;
    for (i = zs.length - 1; i >= 0; --i) {
      const zIndexKey = zs[i].toString();
      executors = this.executorsByZIndex_[zIndexKey];
      for (j = ORDER.length - 1; j >= 0; --j) {
        builderType = ORDER[j];
        executor = executors[builderType];
        if (executor !== void 0) {
          result = executor.executeHitDetection(
            context,
            transform,
            rotation,
            featureCallback,
            hitExtent
          );
          if (result) {
            return result;
          }
        }
      }
    }
    return void 0;
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   * @return {Array<number>|null} Clip coordinates.
   */
  getClipCoords(transform) {
    const maxExtent = this.maxExtent_;
    if (!maxExtent) {
      return null;
    }
    const minX = maxExtent[0];
    const minY = maxExtent[1];
    const maxX = maxExtent[2];
    const maxY = maxExtent[3];
    const flatClipCoords = [minX, minY, minX, maxY, maxX, maxY, maxX, minY];
    transform2D(flatClipCoords, 0, 8, 2, transform, flatClipCoords);
    return flatClipCoords;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return isEmpty(this.executorsByZIndex_);
  }
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} contextScale Scale of the context.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {boolean} snapToPixel Snap point symbols and test to integer pixel.
   * @param {Array<import("../canvas.js").BuilderType>} [builderTypes] Ordered replay types to replay.
   *     Default is {@link module:ol/render/replay~ORDER}
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */
  execute(context, contextScale, transform, viewRotation, snapToPixel, builderTypes, declutterTree) {
    const zs = Object.keys(this.executorsByZIndex_).map(Number);
    zs.sort(ascending);
    if (this.maxExtent_) {
      context.save();
      this.clip(context, transform);
    }
    builderTypes = builderTypes ? builderTypes : ORDER;
    let i, ii, j, jj, replays, replay;
    if (declutterTree) {
      zs.reverse();
    }
    for (i = 0, ii = zs.length; i < ii; ++i) {
      const zIndexKey = zs[i].toString();
      replays = this.executorsByZIndex_[zIndexKey];
      for (j = 0, jj = builderTypes.length; j < jj; ++j) {
        const builderType = builderTypes[j];
        replay = replays[builderType];
        if (replay !== void 0) {
          replay.execute(
            context,
            contextScale,
            transform,
            viewRotation,
            snapToPixel,
            declutterTree
          );
        }
      }
    }
    if (this.maxExtent_) {
      context.restore();
    }
  }
};
var circlePixelIndexArrayCache = {};
function getPixelIndexArray(radius) {
  if (circlePixelIndexArrayCache[radius] !== void 0) {
    return circlePixelIndexArrayCache[radius];
  }
  const size = radius * 2 + 1;
  const maxDistanceSq = radius * radius;
  const distances = new Array(maxDistanceSq + 1);
  for (let i = 0; i <= radius; ++i) {
    for (let j = 0; j <= radius; ++j) {
      const distanceSq = i * i + j * j;
      if (distanceSq > maxDistanceSq) {
        break;
      }
      let distance = distances[distanceSq];
      if (!distance) {
        distance = [];
        distances[distanceSq] = distance;
      }
      distance.push(((radius + i) * size + (radius + j)) * 4 + 3);
      if (i > 0) {
        distance.push(((radius - i) * size + (radius + j)) * 4 + 3);
      }
      if (j > 0) {
        distance.push(((radius + i) * size + (radius - j)) * 4 + 3);
        if (i > 0) {
          distance.push(((radius - i) * size + (radius - j)) * 4 + 3);
        }
      }
    }
  }
  const pixelIndex = [];
  for (let i = 0, ii = distances.length; i < ii; ++i) {
    if (distances[i]) {
      pixelIndex.push(...distances[i]);
    }
  }
  circlePixelIndexArrayCache[radius] = pixelIndex;
  return pixelIndex;
}
var ExecutorGroup_default = ExecutorGroup;

// node_modules/ol/render/canvas/Immediate.js
var CanvasImmediateRenderer = class extends VectorContext_default {
  /**
   * @param {CanvasRenderingContext2D} context Context.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../../extent.js").Extent} extent Extent.
   * @param {import("../../transform.js").Transform} transform Transform.
   * @param {number} viewRotation View rotation.
   * @param {number} [squaredTolerance] Optional squared tolerance for simplification.
   * @param {import("../../proj.js").TransformFunction} [userTransform] Transform from user to view projection.
   */
  constructor(context, pixelRatio, extent, transform, viewRotation, squaredTolerance, userTransform) {
    super();
    this.context_ = context;
    this.pixelRatio_ = pixelRatio;
    this.extent_ = extent;
    this.transform_ = transform;
    this.transformRotation_ = transform ? toFixed(Math.atan2(transform[1], transform[0]), 10) : 0;
    this.viewRotation_ = viewRotation;
    this.squaredTolerance_ = squaredTolerance;
    this.userTransform_ = userTransform;
    this.contextFillState_ = null;
    this.contextStrokeState_ = null;
    this.contextTextState_ = null;
    this.fillState_ = null;
    this.strokeState_ = null;
    this.image_ = null;
    this.imageAnchorX_ = 0;
    this.imageAnchorY_ = 0;
    this.imageHeight_ = 0;
    this.imageOpacity_ = 0;
    this.imageOriginX_ = 0;
    this.imageOriginY_ = 0;
    this.imageRotateWithView_ = false;
    this.imageRotation_ = 0;
    this.imageScale_ = [0, 0];
    this.imageWidth_ = 0;
    this.text_ = "";
    this.textOffsetX_ = 0;
    this.textOffsetY_ = 0;
    this.textRotateWithView_ = false;
    this.textRotation_ = 0;
    this.textScale_ = [0, 0];
    this.textFillState_ = null;
    this.textStrokeState_ = null;
    this.textState_ = null;
    this.pixelCoordinates_ = [];
    this.tmpLocalTransform_ = create();
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawImages_(flatCoordinates, offset, end, stride) {
    if (!this.image_) {
      return;
    }
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    const context = this.context_;
    const localTransform = this.tmpLocalTransform_;
    const alpha = context.globalAlpha;
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha * this.imageOpacity_;
    }
    let rotation = this.imageRotation_;
    if (this.transformRotation_ === 0) {
      rotation -= this.viewRotation_;
    }
    if (this.imageRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (let i = 0, ii = pixelCoordinates.length; i < ii; i += 2) {
      const x = pixelCoordinates[i] - this.imageAnchorX_;
      const y = pixelCoordinates[i + 1] - this.imageAnchorY_;
      if (rotation !== 0 || this.imageScale_[0] != 1 || this.imageScale_[1] != 1) {
        const centerX = x + this.imageAnchorX_;
        const centerY = y + this.imageAnchorY_;
        compose(
          localTransform,
          centerX,
          centerY,
          1,
          1,
          rotation,
          -centerX,
          -centerY
        );
        context.save();
        context.transform.apply(context, localTransform);
        context.translate(centerX, centerY);
        context.scale(this.imageScale_[0], this.imageScale_[1]);
        context.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          -this.imageAnchorX_,
          -this.imageAnchorY_,
          this.imageWidth_,
          this.imageHeight_
        );
        context.restore();
      } else {
        context.drawImage(
          this.image_,
          this.imageOriginX_,
          this.imageOriginY_,
          this.imageWidth_,
          this.imageHeight_,
          x,
          y,
          this.imageWidth_,
          this.imageHeight_
        );
      }
    }
    if (this.imageOpacity_ != 1) {
      context.globalAlpha = alpha;
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @private
   */
  drawText_(flatCoordinates, offset, end, stride) {
    if (!this.textState_ || this.text_ === "") {
      return;
    }
    if (this.textFillState_) {
      this.setContextFillState_(this.textFillState_);
    }
    if (this.textStrokeState_) {
      this.setContextStrokeState_(this.textStrokeState_);
    }
    this.setContextTextState_(this.textState_);
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    const context = this.context_;
    let rotation = this.textRotation_;
    if (this.transformRotation_ === 0) {
      rotation -= this.viewRotation_;
    }
    if (this.textRotateWithView_) {
      rotation += this.viewRotation_;
    }
    for (; offset < end; offset += stride) {
      const x = pixelCoordinates[offset] + this.textOffsetX_;
      const y = pixelCoordinates[offset + 1] + this.textOffsetY_;
      if (rotation !== 0 || this.textScale_[0] != 1 || this.textScale_[1] != 1) {
        context.save();
        context.translate(x - this.textOffsetX_, y - this.textOffsetY_);
        context.rotate(rotation);
        context.translate(this.textOffsetX_, this.textOffsetY_);
        context.scale(this.textScale_[0], this.textScale_[1]);
        if (this.textStrokeState_) {
          context.strokeText(this.text_, 0, 0);
        }
        if (this.textFillState_) {
          context.fillText(this.text_, 0, 0);
        }
        context.restore();
      } else {
        if (this.textStrokeState_) {
          context.strokeText(this.text_, x, y);
        }
        if (this.textFillState_) {
          context.fillText(this.text_, x, y);
        }
      }
    }
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {number} end End.
   * @param {number} stride Stride.
   * @param {boolean} close Close.
   * @private
   * @return {number} end End.
   */
  moveToLineTo_(flatCoordinates, offset, end, stride, close) {
    const context = this.context_;
    const pixelCoordinates = transform2D(
      flatCoordinates,
      offset,
      end,
      stride,
      this.transform_,
      this.pixelCoordinates_
    );
    context.moveTo(pixelCoordinates[0], pixelCoordinates[1]);
    let length = pixelCoordinates.length;
    if (close) {
      length -= 2;
    }
    for (let i = 2; i < length; i += 2) {
      context.lineTo(pixelCoordinates[i], pixelCoordinates[i + 1]);
    }
    if (close) {
      context.closePath();
    }
    return end;
  }
  /**
   * @param {Array<number>} flatCoordinates Flat coordinates.
   * @param {number} offset Offset.
   * @param {Array<number>} ends Ends.
   * @param {number} stride Stride.
   * @private
   * @return {number} End.
   */
  drawRings_(flatCoordinates, offset, ends, stride) {
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      offset = this.moveToLineTo_(
        flatCoordinates,
        offset,
        ends[i],
        stride,
        true
      );
    }
    return offset;
  }
  /**
   * Render a circle geometry into the canvas.  Rendering is immediate and uses
   * the current fill and stroke styles.
   *
   * @param {import("../../geom/Circle.js").default} geometry Circle geometry.
   * @api
   */
  drawCircle(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/Circle.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.fillState_ || this.strokeState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      const pixelCoordinates = transformGeom2D(
        geometry,
        this.transform_,
        this.pixelCoordinates_
      );
      const dx = pixelCoordinates[2] - pixelCoordinates[0];
      const dy = pixelCoordinates[3] - pixelCoordinates[1];
      const radius = Math.sqrt(dx * dx + dy * dy);
      const context = this.context_;
      context.beginPath();
      context.arc(
        pixelCoordinates[0],
        pixelCoordinates[1],
        radius,
        0,
        2 * Math.PI
      );
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      this.drawText_(geometry.getCenter(), 0, 2, 2);
    }
  }
  /**
   * Set the rendering style.  Note that since this is an immediate rendering API,
   * any `zIndex` on the provided style will be ignored.
   *
   * @param {import("../../style/Style.js").default} style The rendering style.
   * @api
   */
  setStyle(style) {
    this.setFillStrokeStyle(style.getFill(), style.getStroke());
    this.setImageStyle(style.getImage());
    this.setTextStyle(style.getText());
  }
  /**
   * @param {import("../../transform.js").Transform} transform Transform.
   */
  setTransform(transform) {
    this.transform_ = transform;
  }
  /**
   * Render a geometry into the canvas.  Call
   * {@link module:ol/render/canvas/Immediate~CanvasImmediateRenderer#setStyle renderer.setStyle()} first to set the rendering style.
   *
   * @param {import("../../geom/Geometry.js").default|import("../Feature.js").default} geometry The geometry to render.
   * @api
   */
  drawGeometry(geometry) {
    const type = geometry.getType();
    switch (type) {
      case "Point":
        this.drawPoint(
          /** @type {import("../../geom/Point.js").default} */
          geometry
        );
        break;
      case "LineString":
        this.drawLineString(
          /** @type {import("../../geom/LineString.js").default} */
          geometry
        );
        break;
      case "Polygon":
        this.drawPolygon(
          /** @type {import("../../geom/Polygon.js").default} */
          geometry
        );
        break;
      case "MultiPoint":
        this.drawMultiPoint(
          /** @type {import("../../geom/MultiPoint.js").default} */
          geometry
        );
        break;
      case "MultiLineString":
        this.drawMultiLineString(
          /** @type {import("../../geom/MultiLineString.js").default} */
          geometry
        );
        break;
      case "MultiPolygon":
        this.drawMultiPolygon(
          /** @type {import("../../geom/MultiPolygon.js").default} */
          geometry
        );
        break;
      case "GeometryCollection":
        this.drawGeometryCollection(
          /** @type {import("../../geom/GeometryCollection.js").default} */
          geometry
        );
        break;
      case "Circle":
        this.drawCircle(
          /** @type {import("../../geom/Circle.js").default} */
          geometry
        );
        break;
      default:
    }
  }
  /**
   * Render a feature into the canvas.  Note that any `zIndex` on the provided
   * style will be ignored - features are rendered immediately in the order that
   * this method is called.  If you need `zIndex` support, you should be using an
   * {@link module:ol/layer/Vector~VectorLayer} instead.
   *
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {import("../../style/Style.js").default} style Style.
   * @api
   */
  drawFeature(feature, style) {
    const geometry = style.getGeometryFunction()(feature);
    if (!geometry) {
      return;
    }
    this.setStyle(style);
    this.drawGeometry(geometry);
  }
  /**
   * Render a GeometryCollection to the canvas.  Rendering is immediate and
   * uses the current styles appropriate for each geometry in the collection.
   *
   * @param {import("../../geom/GeometryCollection.js").default} geometry Geometry collection.
   */
  drawGeometryCollection(geometry) {
    const geometries = geometry.getGeometriesArray();
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      this.drawGeometry(geometries[i]);
    }
  }
  /**
   * Render a Point geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Point.js").default|import("../Feature.js").default} geometry Point geometry.
   */
  drawPoint(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/Point.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  }
  /**
   * Render a MultiPoint geometry  into the canvas.  Rendering is immediate and
   * uses the current style.
   *
   * @param {import("../../geom/MultiPoint.js").default|import("../Feature.js").default} geometry MultiPoint geometry.
   */
  drawMultiPoint(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiPoint.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const flatCoordinates = geometry.getFlatCoordinates();
    const stride = geometry.getStride();
    if (this.image_) {
      this.drawImages_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
    if (this.text_ !== "") {
      this.drawText_(flatCoordinates, 0, flatCoordinates.length, stride);
    }
  }
  /**
   * Render a LineString into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/LineString.js").default|import("../Feature.js").default} geometry LineString geometry.
   */
  drawLineString(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/LineString.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      const context = this.context_;
      const flatCoordinates = geometry.getFlatCoordinates();
      context.beginPath();
      this.moveToLineTo_(
        flatCoordinates,
        0,
        flatCoordinates.length,
        geometry.getStride(),
        false
      );
      context.stroke();
    }
    if (this.text_ !== "") {
      const flatMidpoint = geometry.getFlatMidpoint();
      this.drawText_(flatMidpoint, 0, 2, 2);
    }
  }
  /**
   * Render a MultiLineString geometry into the canvas.  Rendering is immediate
   * and uses the current style.
   *
   * @param {import("../../geom/MultiLineString.js").default|import("../Feature.js").default} geometry MultiLineString geometry.
   */
  drawMultiLineString(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiLineString.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    const geometryExtent = geometry.getExtent();
    if (!intersects(this.extent_, geometryExtent)) {
      return;
    }
    if (this.strokeState_) {
      this.setContextStrokeState_(this.strokeState_);
      const context = this.context_;
      const flatCoordinates = geometry.getFlatCoordinates();
      let offset = 0;
      const ends = (
        /** @type {Array<number>} */
        geometry.getEnds()
      );
      const stride = geometry.getStride();
      context.beginPath();
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        offset = this.moveToLineTo_(
          flatCoordinates,
          offset,
          ends[i],
          stride,
          false
        );
      }
      context.stroke();
    }
    if (this.text_ !== "") {
      const flatMidpoints = geometry.getFlatMidpoints();
      this.drawText_(flatMidpoints, 0, flatMidpoints.length, 2);
    }
  }
  /**
   * Render a Polygon geometry into the canvas.  Rendering is immediate and uses
   * the current style.
   *
   * @param {import("../../geom/Polygon.js").default|import("../Feature.js").default} geometry Polygon geometry.
   */
  drawPolygon(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/Polygon.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      const context = this.context_;
      context.beginPath();
      this.drawRings_(
        geometry.getOrientedFlatCoordinates(),
        0,
        /** @type {Array<number>} */
        geometry.getEnds(),
        geometry.getStride()
      );
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      const flatInteriorPoint = geometry.getFlatInteriorPoint();
      this.drawText_(flatInteriorPoint, 0, 2, 2);
    }
  }
  /**
   * Render MultiPolygon geometry into the canvas.  Rendering is immediate and
   * uses the current style.
   * @param {import("../../geom/MultiPolygon.js").default} geometry MultiPolygon geometry.
   */
  drawMultiPolygon(geometry) {
    if (this.squaredTolerance_) {
      geometry = /** @type {import("../../geom/MultiPolygon.js").default} */
      geometry.simplifyTransformed(
        this.squaredTolerance_,
        this.userTransform_
      );
    }
    if (!intersects(this.extent_, geometry.getExtent())) {
      return;
    }
    if (this.strokeState_ || this.fillState_) {
      if (this.fillState_) {
        this.setContextFillState_(this.fillState_);
      }
      if (this.strokeState_) {
        this.setContextStrokeState_(this.strokeState_);
      }
      const context = this.context_;
      const flatCoordinates = geometry.getOrientedFlatCoordinates();
      let offset = 0;
      const endss = geometry.getEndss();
      const stride = geometry.getStride();
      context.beginPath();
      for (let i = 0, ii = endss.length; i < ii; ++i) {
        const ends = endss[i];
        offset = this.drawRings_(flatCoordinates, offset, ends, stride);
      }
      if (this.fillState_) {
        context.fill();
      }
      if (this.strokeState_) {
        context.stroke();
      }
    }
    if (this.text_ !== "") {
      const flatInteriorPoints = geometry.getFlatInteriorPoints();
      this.drawText_(flatInteriorPoints, 0, flatInteriorPoints.length, 2);
    }
  }
  /**
   * @param {import("../canvas.js").FillState} fillState Fill state.
   * @private
   */
  setContextFillState_(fillState) {
    const context = this.context_;
    const contextFillState = this.contextFillState_;
    if (!contextFillState) {
      context.fillStyle = fillState.fillStyle;
      this.contextFillState_ = {
        fillStyle: fillState.fillStyle
      };
    } else {
      if (contextFillState.fillStyle != fillState.fillStyle) {
        contextFillState.fillStyle = fillState.fillStyle;
        context.fillStyle = fillState.fillStyle;
      }
    }
  }
  /**
   * @param {import("../canvas.js").StrokeState} strokeState Stroke state.
   * @private
   */
  setContextStrokeState_(strokeState) {
    const context = this.context_;
    const contextStrokeState = this.contextStrokeState_;
    if (!contextStrokeState) {
      context.lineCap = strokeState.lineCap;
      context.setLineDash(strokeState.lineDash);
      context.lineDashOffset = strokeState.lineDashOffset;
      context.lineJoin = strokeState.lineJoin;
      context.lineWidth = strokeState.lineWidth;
      context.miterLimit = strokeState.miterLimit;
      context.strokeStyle = strokeState.strokeStyle;
      this.contextStrokeState_ = {
        lineCap: strokeState.lineCap,
        lineDash: strokeState.lineDash,
        lineDashOffset: strokeState.lineDashOffset,
        lineJoin: strokeState.lineJoin,
        lineWidth: strokeState.lineWidth,
        miterLimit: strokeState.miterLimit,
        strokeStyle: strokeState.strokeStyle
      };
    } else {
      if (contextStrokeState.lineCap != strokeState.lineCap) {
        contextStrokeState.lineCap = strokeState.lineCap;
        context.lineCap = strokeState.lineCap;
      }
      if (!equals(contextStrokeState.lineDash, strokeState.lineDash)) {
        context.setLineDash(
          contextStrokeState.lineDash = strokeState.lineDash
        );
      }
      if (contextStrokeState.lineDashOffset != strokeState.lineDashOffset) {
        contextStrokeState.lineDashOffset = strokeState.lineDashOffset;
        context.lineDashOffset = strokeState.lineDashOffset;
      }
      if (contextStrokeState.lineJoin != strokeState.lineJoin) {
        contextStrokeState.lineJoin = strokeState.lineJoin;
        context.lineJoin = strokeState.lineJoin;
      }
      if (contextStrokeState.lineWidth != strokeState.lineWidth) {
        contextStrokeState.lineWidth = strokeState.lineWidth;
        context.lineWidth = strokeState.lineWidth;
      }
      if (contextStrokeState.miterLimit != strokeState.miterLimit) {
        contextStrokeState.miterLimit = strokeState.miterLimit;
        context.miterLimit = strokeState.miterLimit;
      }
      if (contextStrokeState.strokeStyle != strokeState.strokeStyle) {
        contextStrokeState.strokeStyle = strokeState.strokeStyle;
        context.strokeStyle = strokeState.strokeStyle;
      }
    }
  }
  /**
   * @param {import("../canvas.js").TextState} textState Text state.
   * @private
   */
  setContextTextState_(textState) {
    const context = this.context_;
    const contextTextState = this.contextTextState_;
    const textAlign = textState.textAlign ? textState.textAlign : defaultTextAlign;
    if (!contextTextState) {
      context.font = textState.font;
      context.textAlign = textAlign;
      context.textBaseline = textState.textBaseline;
      this.contextTextState_ = {
        font: textState.font,
        textAlign,
        textBaseline: textState.textBaseline
      };
    } else {
      if (contextTextState.font != textState.font) {
        contextTextState.font = textState.font;
        context.font = textState.font;
      }
      if (contextTextState.textAlign != textAlign) {
        contextTextState.textAlign = textAlign;
        context.textAlign = textAlign;
      }
      if (contextTextState.textBaseline != textState.textBaseline) {
        contextTextState.textBaseline = textState.textBaseline;
        context.textBaseline = textState.textBaseline;
      }
    }
  }
  /**
   * Set the fill and stroke style for subsequent draw operations.  To clear
   * either fill or stroke styles, pass null for the appropriate parameter.
   *
   * @param {import("../../style/Fill.js").default} fillStyle Fill style.
   * @param {import("../../style/Stroke.js").default} strokeStyle Stroke style.
   */
  setFillStrokeStyle(fillStyle, strokeStyle) {
    if (!fillStyle) {
      this.fillState_ = null;
    } else {
      const fillStyleColor = fillStyle.getColor();
      this.fillState_ = {
        fillStyle: asColorLike(
          fillStyleColor ? fillStyleColor : defaultFillStyle
        )
      };
    }
    if (!strokeStyle) {
      this.strokeState_ = null;
    } else {
      const strokeStyleColor = strokeStyle.getColor();
      const strokeStyleLineCap = strokeStyle.getLineCap();
      const strokeStyleLineDash = strokeStyle.getLineDash();
      const strokeStyleLineDashOffset = strokeStyle.getLineDashOffset();
      const strokeStyleLineJoin = strokeStyle.getLineJoin();
      const strokeStyleWidth = strokeStyle.getWidth();
      const strokeStyleMiterLimit = strokeStyle.getMiterLimit();
      const lineDash = strokeStyleLineDash ? strokeStyleLineDash : defaultLineDash;
      this.strokeState_ = {
        lineCap: strokeStyleLineCap !== void 0 ? strokeStyleLineCap : defaultLineCap,
        lineDash: this.pixelRatio_ === 1 ? lineDash : lineDash.map((n) => n * this.pixelRatio_),
        lineDashOffset: (strokeStyleLineDashOffset ? strokeStyleLineDashOffset : defaultLineDashOffset) * this.pixelRatio_,
        lineJoin: strokeStyleLineJoin !== void 0 ? strokeStyleLineJoin : defaultLineJoin,
        lineWidth: (strokeStyleWidth !== void 0 ? strokeStyleWidth : defaultLineWidth) * this.pixelRatio_,
        miterLimit: strokeStyleMiterLimit !== void 0 ? strokeStyleMiterLimit : defaultMiterLimit,
        strokeStyle: asColorLike(
          strokeStyleColor ? strokeStyleColor : defaultStrokeStyle
        )
      };
    }
  }
  /**
   * Set the image style for subsequent draw operations.  Pass null to remove
   * the image style.
   *
   * @param {import("../../style/Image.js").default} imageStyle Image style.
   */
  setImageStyle(imageStyle) {
    let imageSize;
    if (!imageStyle || !(imageSize = imageStyle.getSize())) {
      this.image_ = null;
      return;
    }
    const imagePixelRatio = imageStyle.getPixelRatio(this.pixelRatio_);
    const imageAnchor = imageStyle.getAnchor();
    const imageOrigin = imageStyle.getOrigin();
    this.image_ = imageStyle.getImage(this.pixelRatio_);
    this.imageAnchorX_ = imageAnchor[0] * imagePixelRatio;
    this.imageAnchorY_ = imageAnchor[1] * imagePixelRatio;
    this.imageHeight_ = imageSize[1] * imagePixelRatio;
    this.imageOpacity_ = imageStyle.getOpacity();
    this.imageOriginX_ = imageOrigin[0];
    this.imageOriginY_ = imageOrigin[1];
    this.imageRotateWithView_ = imageStyle.getRotateWithView();
    this.imageRotation_ = imageStyle.getRotation();
    const imageScale = imageStyle.getScaleArray();
    this.imageScale_ = [
      imageScale[0] * this.pixelRatio_ / imagePixelRatio,
      imageScale[1] * this.pixelRatio_ / imagePixelRatio
    ];
    this.imageWidth_ = imageSize[0] * imagePixelRatio;
  }
  /**
   * Set the text style for subsequent draw operations.  Pass null to
   * remove the text style.
   *
   * @param {import("../../style/Text.js").default} textStyle Text style.
   */
  setTextStyle(textStyle) {
    if (!textStyle) {
      this.text_ = "";
    } else {
      const textFillStyle = textStyle.getFill();
      if (!textFillStyle) {
        this.textFillState_ = null;
      } else {
        const textFillStyleColor = textFillStyle.getColor();
        this.textFillState_ = {
          fillStyle: asColorLike(
            textFillStyleColor ? textFillStyleColor : defaultFillStyle
          )
        };
      }
      const textStrokeStyle = textStyle.getStroke();
      if (!textStrokeStyle) {
        this.textStrokeState_ = null;
      } else {
        const textStrokeStyleColor = textStrokeStyle.getColor();
        const textStrokeStyleLineCap = textStrokeStyle.getLineCap();
        const textStrokeStyleLineDash = textStrokeStyle.getLineDash();
        const textStrokeStyleLineDashOffset = textStrokeStyle.getLineDashOffset();
        const textStrokeStyleLineJoin = textStrokeStyle.getLineJoin();
        const textStrokeStyleWidth = textStrokeStyle.getWidth();
        const textStrokeStyleMiterLimit = textStrokeStyle.getMiterLimit();
        this.textStrokeState_ = {
          lineCap: textStrokeStyleLineCap !== void 0 ? textStrokeStyleLineCap : defaultLineCap,
          lineDash: textStrokeStyleLineDash ? textStrokeStyleLineDash : defaultLineDash,
          lineDashOffset: textStrokeStyleLineDashOffset ? textStrokeStyleLineDashOffset : defaultLineDashOffset,
          lineJoin: textStrokeStyleLineJoin !== void 0 ? textStrokeStyleLineJoin : defaultLineJoin,
          lineWidth: textStrokeStyleWidth !== void 0 ? textStrokeStyleWidth : defaultLineWidth,
          miterLimit: textStrokeStyleMiterLimit !== void 0 ? textStrokeStyleMiterLimit : defaultMiterLimit,
          strokeStyle: asColorLike(
            textStrokeStyleColor ? textStrokeStyleColor : defaultStrokeStyle
          )
        };
      }
      const textFont = textStyle.getFont();
      const textOffsetX = textStyle.getOffsetX();
      const textOffsetY = textStyle.getOffsetY();
      const textRotateWithView = textStyle.getRotateWithView();
      const textRotation = textStyle.getRotation();
      const textScale = textStyle.getScaleArray();
      const textText = textStyle.getText();
      const textTextAlign = textStyle.getTextAlign();
      const textTextBaseline = textStyle.getTextBaseline();
      this.textState_ = {
        font: textFont !== void 0 ? textFont : defaultFont,
        textAlign: textTextAlign !== void 0 ? textTextAlign : defaultTextAlign,
        textBaseline: textTextBaseline !== void 0 ? textTextBaseline : defaultTextBaseline
      };
      this.text_ = textText !== void 0 ? Array.isArray(textText) ? textText.reduce((acc, t, i) => acc += i % 2 ? " " : t, "") : textText : "";
      this.textOffsetX_ = textOffsetX !== void 0 ? this.pixelRatio_ * textOffsetX : 0;
      this.textOffsetY_ = textOffsetY !== void 0 ? this.pixelRatio_ * textOffsetY : 0;
      this.textRotateWithView_ = textRotateWithView !== void 0 ? textRotateWithView : false;
      this.textRotation_ = textRotation !== void 0 ? textRotation : 0;
      this.textScale_ = [
        this.pixelRatio_ * textScale[0],
        this.pixelRatio_ * textScale[1]
      ];
    }
  }
};
var Immediate_default = CanvasImmediateRenderer;

// node_modules/ol/render/canvas/hitdetect.js
var HIT_DETECT_RESOLUTION = 0.5;
function createHitDetectionImageData(size, transforms, features, styleFunction, extent, resolution, rotation) {
  const width = size[0] * HIT_DETECT_RESOLUTION;
  const height = size[1] * HIT_DETECT_RESOLUTION;
  const context = createCanvasContext2D(width, height);
  context.imageSmoothingEnabled = false;
  const canvas = context.canvas;
  const renderer = new Immediate_default(
    context,
    HIT_DETECT_RESOLUTION,
    extent,
    null,
    rotation
  );
  const featureCount = features.length;
  const indexFactor = Math.floor((256 * 256 * 256 - 1) / featureCount);
  const featuresByZIndex = {};
  for (let i = 1; i <= featureCount; ++i) {
    const feature = features[i - 1];
    const featureStyleFunction = feature.getStyleFunction() || styleFunction;
    if (!featureStyleFunction) {
      continue;
    }
    let styles = featureStyleFunction(feature, resolution);
    if (!styles) {
      continue;
    }
    if (!Array.isArray(styles)) {
      styles = [styles];
    }
    const index = i * indexFactor;
    const color = index.toString(16).padStart(7, "#00000");
    for (let j = 0, jj = styles.length; j < jj; ++j) {
      const originalStyle = styles[j];
      const geometry = originalStyle.getGeometryFunction()(feature);
      if (!geometry || !intersects(extent, geometry.getExtent())) {
        continue;
      }
      const style = originalStyle.clone();
      const fill = style.getFill();
      if (fill) {
        fill.setColor(color);
      }
      const stroke = style.getStroke();
      if (stroke) {
        stroke.setColor(color);
        stroke.setLineDash(null);
      }
      style.setText(void 0);
      const image = originalStyle.getImage();
      if (image) {
        const imgSize = image.getImageSize();
        if (!imgSize) {
          continue;
        }
        const imgContext = createCanvasContext2D(
          imgSize[0],
          imgSize[1],
          void 0,
          { alpha: false }
        );
        const img = imgContext.canvas;
        imgContext.fillStyle = color;
        imgContext.fillRect(0, 0, img.width, img.height);
        style.setImage(
          new Icon_default({
            img,
            anchor: image.getAnchor(),
            anchorXUnits: "pixels",
            anchorYUnits: "pixels",
            offset: image.getOrigin(),
            opacity: 1,
            size: image.getSize(),
            scale: image.getScale(),
            rotation: image.getRotation(),
            rotateWithView: image.getRotateWithView()
          })
        );
      }
      const zIndex = style.getZIndex() || 0;
      let byGeometryType = featuresByZIndex[zIndex];
      if (!byGeometryType) {
        byGeometryType = {};
        featuresByZIndex[zIndex] = byGeometryType;
        byGeometryType["Polygon"] = [];
        byGeometryType["Circle"] = [];
        byGeometryType["LineString"] = [];
        byGeometryType["Point"] = [];
      }
      const type = geometry.getType();
      if (type === "GeometryCollection") {
        const geometries = (
          /** @type {import("../../geom/GeometryCollection.js").default} */
          geometry.getGeometriesArrayRecursive()
        );
        for (let i2 = 0, ii = geometries.length; i2 < ii; ++i2) {
          const geometry2 = geometries[i2];
          byGeometryType[geometry2.getType().replace("Multi", "")].push(
            geometry2,
            style
          );
        }
      } else {
        byGeometryType[type.replace("Multi", "")].push(geometry, style);
      }
    }
  }
  const zIndexKeys = Object.keys(featuresByZIndex).map(Number).sort(ascending);
  for (let i = 0, ii = zIndexKeys.length; i < ii; ++i) {
    const byGeometryType = featuresByZIndex[zIndexKeys[i]];
    for (const type in byGeometryType) {
      const geomAndStyle = byGeometryType[type];
      for (let j = 0, jj = geomAndStyle.length; j < jj; j += 2) {
        renderer.setStyle(geomAndStyle[j + 1]);
        for (let k = 0, kk = transforms.length; k < kk; ++k) {
          renderer.setTransform(transforms[k]);
          renderer.drawGeometry(geomAndStyle[j]);
        }
      }
    }
  }
  return context.getImageData(0, 0, canvas.width, canvas.height);
}
function hitDetect(pixel, features, imageData) {
  const resultFeatures = [];
  if (imageData) {
    const x = Math.floor(Math.round(pixel[0]) * HIT_DETECT_RESOLUTION);
    const y = Math.floor(Math.round(pixel[1]) * HIT_DETECT_RESOLUTION);
    const index = (clamp(x, 0, imageData.width - 1) + clamp(y, 0, imageData.height - 1) * imageData.width) * 4;
    const r = imageData.data[index];
    const g = imageData.data[index + 1];
    const b = imageData.data[index + 2];
    const i = b + 256 * (g + 256 * r);
    const indexFactor = Math.floor((256 * 256 * 256 - 1) / features.length);
    if (i && i % indexFactor === 0) {
      resultFeatures.push(features[i / indexFactor - 1]);
    }
  }
  return resultFeatures;
}

// node_modules/ol/renderer/vector.js
var SIMPLIFY_TOLERANCE = 0.5;
var GEOMETRY_RENDERERS = {
  "Point": renderPointGeometry,
  "LineString": renderLineStringGeometry,
  "Polygon": renderPolygonGeometry,
  "MultiPoint": renderMultiPointGeometry,
  "MultiLineString": renderMultiLineStringGeometry,
  "MultiPolygon": renderMultiPolygonGeometry,
  "GeometryCollection": renderGeometryCollectionGeometry,
  "Circle": renderCircleGeometry
};
function defaultOrder(feature1, feature2) {
  return parseInt(getUid(feature1), 10) - parseInt(getUid(feature2), 10);
}
function getSquaredTolerance(resolution, pixelRatio) {
  const tolerance = getTolerance(resolution, pixelRatio);
  return tolerance * tolerance;
}
function getTolerance(resolution, pixelRatio) {
  return SIMPLIFY_TOLERANCE * resolution / pixelRatio;
}
function renderCircleGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const fillStyle = style.getFill();
  const strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    const circleReplay = builderGroup.getBuilder(style.getZIndex(), "Circle");
    circleReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    circleReplay.drawCircle(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      "Text"
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderFeature(replayGroup, feature, style, squaredTolerance, listener, transform, declutterBuilderGroup) {
  let loading = false;
  const imageStyle = style.getImage();
  if (imageStyle) {
    const imageState = imageStyle.getImageState();
    if (imageState == ImageState_default.LOADED || imageState == ImageState_default.ERROR) {
      imageStyle.unlistenImageChange(listener);
    } else {
      if (imageState == ImageState_default.IDLE) {
        imageStyle.load();
      }
      imageStyle.listenImageChange(listener);
      loading = true;
    }
  }
  renderFeatureInternal(
    replayGroup,
    feature,
    style,
    squaredTolerance,
    transform,
    declutterBuilderGroup
  );
  return loading;
}
function renderFeatureInternal(replayGroup, feature, style, squaredTolerance, transform, declutterBuilderGroup) {
  const geometry = style.getGeometryFunction()(feature);
  if (!geometry) {
    return;
  }
  const simplifiedGeometry = geometry.simplifyTransformed(
    squaredTolerance,
    transform
  );
  const renderer = style.getRenderer();
  if (renderer) {
    renderGeometry(replayGroup, simplifiedGeometry, style, feature);
  } else {
    const geometryRenderer = GEOMETRY_RENDERERS[simplifiedGeometry.getType()];
    geometryRenderer(
      replayGroup,
      simplifiedGeometry,
      style,
      feature,
      declutterBuilderGroup
    );
  }
}
function renderGeometry(replayGroup, geometry, style, feature) {
  if (geometry.getType() == "GeometryCollection") {
    const geometries = (
      /** @type {import("../geom/GeometryCollection.js").default} */
      geometry.getGeometries()
    );
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      renderGeometry(replayGroup, geometries[i], style, feature);
    }
    return;
  }
  const replay = replayGroup.getBuilder(style.getZIndex(), "Default");
  replay.drawCustom(
    /** @type {import("../geom/SimpleGeometry.js").default} */
    geometry,
    feature,
    style.getRenderer(),
    style.getHitDetectionRenderer()
  );
}
function renderGeometryCollectionGeometry(replayGroup, geometry, style, feature, declutterBuilderGroup) {
  const geometries = geometry.getGeometriesArray();
  let i, ii;
  for (i = 0, ii = geometries.length; i < ii; ++i) {
    const geometryRenderer = GEOMETRY_RENDERERS[geometries[i].getType()];
    geometryRenderer(
      replayGroup,
      geometries[i],
      style,
      feature,
      declutterBuilderGroup
    );
  }
}
function renderLineStringGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const strokeStyle = style.getStroke();
  if (strokeStyle) {
    const lineStringReplay = builderGroup.getBuilder(
      style.getZIndex(),
      "LineString"
    );
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawLineString(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      "Text"
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiLineStringGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const strokeStyle = style.getStroke();
  if (strokeStyle) {
    const lineStringReplay = builderGroup.getBuilder(
      style.getZIndex(),
      "LineString"
    );
    lineStringReplay.setFillStrokeStyle(null, strokeStyle);
    lineStringReplay.drawMultiLineString(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      "Text"
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPolygonGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const fillStyle = style.getFill();
  const strokeStyle = style.getStroke();
  if (strokeStyle || fillStyle) {
    const polygonReplay = builderGroup.getBuilder(style.getZIndex(), "Polygon");
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawMultiPolygon(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      "Text"
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}
function renderPointGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const imageStyle = style.getImage();
  const textStyle = style.getText();
  let declutterImageWithText;
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    let imageBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      const declutterMode = imageStyle.getDeclutterMode();
      if (declutterMode !== "none") {
        imageBuilderGroup = declutterBuilderGroup;
        if (declutterMode === "obstacle") {
          const imageReplay2 = builderGroup.getBuilder(
            style.getZIndex(),
            "Image"
          );
          imageReplay2.setImageStyle(imageStyle, declutterImageWithText);
          imageReplay2.drawPoint(geometry, feature);
        } else if (textStyle && textStyle.getText()) {
          declutterImageWithText = {};
        }
      }
    }
    const imageReplay = imageBuilderGroup.getBuilder(
      style.getZIndex(),
      "Image"
    );
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    let textBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      textBuilderGroup = declutterBuilderGroup;
    }
    const textReplay = textBuilderGroup.getBuilder(style.getZIndex(), "Text");
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderMultiPointGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const imageStyle = style.getImage();
  const textStyle = style.getText();
  let declutterImageWithText;
  if (imageStyle) {
    if (imageStyle.getImageState() != ImageState_default.LOADED) {
      return;
    }
    let imageBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      const declutterMode = imageStyle.getDeclutterMode();
      if (declutterMode !== "none") {
        imageBuilderGroup = declutterBuilderGroup;
        if (declutterMode === "obstacle") {
          const imageReplay2 = builderGroup.getBuilder(
            style.getZIndex(),
            "Image"
          );
          imageReplay2.setImageStyle(imageStyle, declutterImageWithText);
          imageReplay2.drawMultiPoint(geometry, feature);
        } else if (textStyle && textStyle.getText()) {
          declutterImageWithText = {};
        }
      }
    }
    const imageReplay = imageBuilderGroup.getBuilder(
      style.getZIndex(),
      "Image"
    );
    imageReplay.setImageStyle(imageStyle, declutterImageWithText);
    imageReplay.drawMultiPoint(geometry, feature);
  }
  if (textStyle && textStyle.getText()) {
    let textBuilderGroup = builderGroup;
    if (declutterBuilderGroup) {
      textBuilderGroup = declutterBuilderGroup;
    }
    const textReplay = textBuilderGroup.getBuilder(style.getZIndex(), "Text");
    textReplay.setTextStyle(textStyle, declutterImageWithText);
    textReplay.drawText(geometry, feature);
  }
}
function renderPolygonGeometry(builderGroup, geometry, style, feature, declutterBuilderGroup) {
  const fillStyle = style.getFill();
  const strokeStyle = style.getStroke();
  if (fillStyle || strokeStyle) {
    const polygonReplay = builderGroup.getBuilder(style.getZIndex(), "Polygon");
    polygonReplay.setFillStrokeStyle(fillStyle, strokeStyle);
    polygonReplay.drawPolygon(geometry, feature);
  }
  const textStyle = style.getText();
  if (textStyle && textStyle.getText()) {
    const textReplay = (declutterBuilderGroup || builderGroup).getBuilder(
      style.getZIndex(),
      "Text"
    );
    textReplay.setTextStyle(textStyle);
    textReplay.drawText(geometry, feature);
  }
}

// node_modules/ol/renderer/canvas/VectorLayer.js
var CanvasVectorLayerRenderer = class extends Layer_default2 {
  /**
   * @param {import("../../layer/BaseVector.js").default} vectorLayer Vector layer.
   */
  constructor(vectorLayer) {
    super(vectorLayer);
    this.boundHandleStyleImageChange_ = this.handleStyleImageChange_.bind(this);
    this.animatingOrInteracting_;
    this.hitDetectionImageData_ = null;
    this.renderedFeatures_ = null;
    this.renderedRevision_ = -1;
    this.renderedResolution_ = NaN;
    this.renderedExtent_ = createEmpty();
    this.wrappedRenderedExtent_ = createEmpty();
    this.renderedRotation_;
    this.renderedCenter_ = null;
    this.renderedProjection_ = null;
    this.renderedRenderOrder_ = null;
    this.replayGroup_ = null;
    this.replayGroupChanged = true;
    this.declutterExecutorGroup = null;
    this.clipping = true;
    this.compositionContext_ = null;
    this.opacity_ = 1;
  }
  /**
   * @param {ExecutorGroup} executorGroup Executor group.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {import("rbush").default} [declutterTree] Declutter tree.
   */
  renderWorlds(executorGroup, frameState, declutterTree) {
    const extent = frameState.extent;
    const viewState = frameState.viewState;
    const center = viewState.center;
    const resolution = viewState.resolution;
    const projection = viewState.projection;
    const rotation = viewState.rotation;
    const projectionExtent = projection.getExtent();
    const vectorSource = this.getLayer().getSource();
    const pixelRatio = frameState.pixelRatio;
    const viewHints = frameState.viewHints;
    const snapToPixel = !(viewHints[ViewHint_default.ANIMATING] || viewHints[ViewHint_default.INTERACTING]);
    const context = this.compositionContext_;
    const width = Math.round(frameState.size[0] * pixelRatio);
    const height = Math.round(frameState.size[1] * pixelRatio);
    const multiWorld = vectorSource.getWrapX() && projection.canWrapX();
    const worldWidth = multiWorld ? getWidth(projectionExtent) : null;
    const endWorld = multiWorld ? Math.ceil((extent[2] - projectionExtent[2]) / worldWidth) + 1 : 1;
    let world = multiWorld ? Math.floor((extent[0] - projectionExtent[0]) / worldWidth) : 0;
    do {
      const transform = this.getRenderTransform(
        center,
        resolution,
        rotation,
        pixelRatio,
        width,
        height,
        world * worldWidth
      );
      executorGroup.execute(
        context,
        1,
        transform,
        rotation,
        snapToPixel,
        void 0,
        declutterTree
      );
    } while (++world < endWorld);
  }
  setupCompositionContext_() {
    if (this.opacity_ !== 1) {
      const compositionContext = createCanvasContext2D(
        this.context.canvas.width,
        this.context.canvas.height,
        canvasPool
      );
      this.compositionContext_ = compositionContext;
    } else {
      this.compositionContext_ = this.context;
    }
  }
  releaseCompositionContext_() {
    if (this.opacity_ !== 1) {
      const alpha = this.context.globalAlpha;
      this.context.globalAlpha = this.opacity_;
      this.context.drawImage(this.compositionContext_.canvas, 0, 0);
      this.context.globalAlpha = alpha;
      releaseCanvas(this.compositionContext_);
      canvasPool.push(this.compositionContext_.canvas);
      this.compositionContext_ = null;
    }
  }
  /**
   * Render declutter items for this layer
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   */
  renderDeclutter(frameState) {
    if (this.declutterExecutorGroup) {
      this.setupCompositionContext_();
      this.renderWorlds(
        this.declutterExecutorGroup,
        frameState,
        frameState.declutterTree
      );
      this.releaseCompositionContext_();
    }
  }
  /**
   * Render the layer.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {HTMLElement|null} target Target that may be used to render content to.
   * @return {HTMLElement|null} The rendered element.
   */
  renderFrame(frameState, target) {
    const pixelRatio = frameState.pixelRatio;
    const layerState = frameState.layerStatesArray[frameState.layerIndex];
    makeScale(this.pixelTransform, 1 / pixelRatio, 1 / pixelRatio);
    makeInverse(this.inversePixelTransform, this.pixelTransform);
    const canvasTransform = toString(this.pixelTransform);
    this.useContainer(target, canvasTransform, this.getBackground(frameState));
    const context = this.context;
    const canvas = context.canvas;
    const replayGroup = this.replayGroup_;
    const declutterExecutorGroup = this.declutterExecutorGroup;
    let render = replayGroup && !replayGroup.isEmpty() || declutterExecutorGroup && !declutterExecutorGroup.isEmpty();
    if (!render) {
      const hasRenderListeners = this.getLayer().hasListener(EventType_default2.PRERENDER) || this.getLayer().hasListener(EventType_default2.POSTRENDER);
      if (!hasRenderListeners) {
        return null;
      }
    }
    const width = Math.round(frameState.size[0] * pixelRatio);
    const height = Math.round(frameState.size[1] * pixelRatio);
    if (canvas.width != width || canvas.height != height) {
      canvas.width = width;
      canvas.height = height;
      if (canvas.style.transform !== canvasTransform) {
        canvas.style.transform = canvasTransform;
      }
    } else if (!this.containerReused) {
      context.clearRect(0, 0, width, height);
    }
    this.preRender(context, frameState);
    const viewState = frameState.viewState;
    const projection = viewState.projection;
    this.opacity_ = layerState.opacity;
    this.setupCompositionContext_();
    let clipped = false;
    if (render && layerState.extent && this.clipping) {
      const layerExtent = fromUserExtent(layerState.extent, projection);
      render = intersects(layerExtent, frameState.extent);
      clipped = render && !containsExtent(layerExtent, frameState.extent);
      if (clipped) {
        this.clipUnrotated(this.compositionContext_, frameState, layerExtent);
      }
    }
    if (render) {
      this.renderWorlds(replayGroup, frameState);
    }
    if (clipped) {
      this.compositionContext_.restore();
    }
    this.releaseCompositionContext_();
    this.postRender(context, frameState);
    if (this.renderedRotation_ !== viewState.rotation) {
      this.renderedRotation_ = viewState.rotation;
      this.hitDetectionImageData_ = null;
    }
    return this.container;
  }
  /**
   * Asynchronous layer level hit detection.
   * @param {import("../../pixel.js").Pixel} pixel Pixel.
   * @return {Promise<Array<import("../../Feature").default>>} Promise
   * that resolves with an array of features.
   */
  getFeatures(pixel) {
    return new Promise((resolve) => {
      if (!this.hitDetectionImageData_ && !this.animatingOrInteracting_) {
        const size = [this.context.canvas.width, this.context.canvas.height];
        apply(this.pixelTransform, size);
        const center = this.renderedCenter_;
        const resolution = this.renderedResolution_;
        const rotation = this.renderedRotation_;
        const projection = this.renderedProjection_;
        const extent = this.wrappedRenderedExtent_;
        const layer = this.getLayer();
        const transforms = [];
        const width = size[0] * HIT_DETECT_RESOLUTION;
        const height = size[1] * HIT_DETECT_RESOLUTION;
        transforms.push(
          this.getRenderTransform(
            center,
            resolution,
            rotation,
            HIT_DETECT_RESOLUTION,
            width,
            height,
            0
          ).slice()
        );
        const source = layer.getSource();
        const projectionExtent = projection.getExtent();
        if (source.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, extent)) {
          let startX = extent[0];
          const worldWidth = getWidth(projectionExtent);
          let world = 0;
          let offsetX;
          while (startX < projectionExtent[0]) {
            --world;
            offsetX = worldWidth * world;
            transforms.push(
              this.getRenderTransform(
                center,
                resolution,
                rotation,
                HIT_DETECT_RESOLUTION,
                width,
                height,
                offsetX
              ).slice()
            );
            startX += worldWidth;
          }
          world = 0;
          startX = extent[2];
          while (startX > projectionExtent[2]) {
            ++world;
            offsetX = worldWidth * world;
            transforms.push(
              this.getRenderTransform(
                center,
                resolution,
                rotation,
                HIT_DETECT_RESOLUTION,
                width,
                height,
                offsetX
              ).slice()
            );
            startX -= worldWidth;
          }
        }
        this.hitDetectionImageData_ = createHitDetectionImageData(
          size,
          transforms,
          this.renderedFeatures_,
          layer.getStyleFunction(),
          extent,
          resolution,
          rotation
        );
      }
      resolve(
        hitDetect(pixel, this.renderedFeatures_, this.hitDetectionImageData_)
      );
    });
  }
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @param {number} hitTolerance Hit tolerance in pixels.
   * @param {import("../vector.js").FeatureCallback<T>} callback Feature callback.
   * @param {Array<import("../Map.js").HitMatch<T>>} matches The hit detected matches with tolerance.
   * @return {T|undefined} Callback result.
   * @template T
   */
  forEachFeatureAtCoordinate(coordinate, frameState, hitTolerance, callback, matches) {
    if (!this.replayGroup_) {
      return void 0;
    }
    const resolution = frameState.viewState.resolution;
    const rotation = frameState.viewState.rotation;
    const layer = this.getLayer();
    const features = {};
    const featureCallback = function(feature, geometry, distanceSq) {
      const key = getUid(feature);
      const match = features[key];
      if (!match) {
        if (distanceSq === 0) {
          features[key] = true;
          return callback(feature, layer, geometry);
        }
        matches.push(
          features[key] = {
            feature,
            layer,
            geometry,
            distanceSq,
            callback
          }
        );
      } else if (match !== true && distanceSq < match.distanceSq) {
        if (distanceSq === 0) {
          features[key] = true;
          matches.splice(matches.lastIndexOf(match), 1);
          return callback(feature, layer, geometry);
        }
        match.geometry = geometry;
        match.distanceSq = distanceSq;
      }
      return void 0;
    };
    let result;
    const executorGroups = [this.replayGroup_];
    if (this.declutterExecutorGroup) {
      executorGroups.push(this.declutterExecutorGroup);
    }
    executorGroups.some((executorGroup) => {
      return result = executorGroup.forEachFeatureAtCoordinate(
        coordinate,
        resolution,
        rotation,
        hitTolerance,
        featureCallback,
        executorGroup === this.declutterExecutorGroup && frameState.declutterTree ? frameState.declutterTree.all().map((item) => item.value) : null
      );
    });
    return result;
  }
  /**
   * Perform action necessary to get the layer rendered after new fonts have loaded
   */
  handleFontsChanged() {
    const layer = this.getLayer();
    if (layer.getVisible() && this.replayGroup_) {
      layer.changed();
    }
  }
  /**
   * Handle changes in image style state.
   * @param {import("../../events/Event.js").default} event Image style change event.
   * @private
   */
  handleStyleImageChange_(event) {
    this.renderIfReadyAndVisible();
  }
  /**
   * Determine whether render should be called.
   * @param {import("../../Map.js").FrameState} frameState Frame state.
   * @return {boolean} Layer is ready to be rendered.
   */
  prepareFrame(frameState) {
    const vectorLayer = this.getLayer();
    const vectorSource = vectorLayer.getSource();
    if (!vectorSource) {
      return false;
    }
    const animating = frameState.viewHints[ViewHint_default.ANIMATING];
    const interacting = frameState.viewHints[ViewHint_default.INTERACTING];
    const updateWhileAnimating = vectorLayer.getUpdateWhileAnimating();
    const updateWhileInteracting = vectorLayer.getUpdateWhileInteracting();
    if (this.ready && !updateWhileAnimating && animating || !updateWhileInteracting && interacting) {
      this.animatingOrInteracting_ = true;
      return true;
    }
    this.animatingOrInteracting_ = false;
    const frameStateExtent = frameState.extent;
    const viewState = frameState.viewState;
    const projection = viewState.projection;
    const resolution = viewState.resolution;
    const pixelRatio = frameState.pixelRatio;
    const vectorLayerRevision = vectorLayer.getRevision();
    const vectorLayerRenderBuffer = vectorLayer.getRenderBuffer();
    let vectorLayerRenderOrder = vectorLayer.getRenderOrder();
    if (vectorLayerRenderOrder === void 0) {
      vectorLayerRenderOrder = defaultOrder;
    }
    const center = viewState.center.slice();
    const extent = buffer(
      frameStateExtent,
      vectorLayerRenderBuffer * resolution
    );
    const renderedExtent = extent.slice();
    const loadExtents = [extent.slice()];
    const projectionExtent = projection.getExtent();
    if (vectorSource.getWrapX() && projection.canWrapX() && !containsExtent(projectionExtent, frameState.extent)) {
      const worldWidth = getWidth(projectionExtent);
      const gutter = Math.max(getWidth(extent) / 2, worldWidth);
      extent[0] = projectionExtent[0] - gutter;
      extent[2] = projectionExtent[2] + gutter;
      wrapX2(center, projection);
      const loadExtent = wrapX(loadExtents[0], projection);
      if (loadExtent[0] < projectionExtent[0] && loadExtent[2] < projectionExtent[2]) {
        loadExtents.push([
          loadExtent[0] + worldWidth,
          loadExtent[1],
          loadExtent[2] + worldWidth,
          loadExtent[3]
        ]);
      } else if (loadExtent[0] > projectionExtent[0] && loadExtent[2] > projectionExtent[2]) {
        loadExtents.push([
          loadExtent[0] - worldWidth,
          loadExtent[1],
          loadExtent[2] - worldWidth,
          loadExtent[3]
        ]);
      }
    }
    if (this.ready && this.renderedResolution_ == resolution && this.renderedRevision_ == vectorLayerRevision && this.renderedRenderOrder_ == vectorLayerRenderOrder && containsExtent(this.wrappedRenderedExtent_, extent)) {
      if (!equals(this.renderedExtent_, renderedExtent)) {
        this.hitDetectionImageData_ = null;
        this.renderedExtent_ = renderedExtent;
      }
      this.renderedCenter_ = center;
      this.replayGroupChanged = false;
      return true;
    }
    this.replayGroup_ = null;
    const replayGroup = new BuilderGroup_default(
      getTolerance(resolution, pixelRatio),
      extent,
      resolution,
      pixelRatio
    );
    let declutterBuilderGroup;
    if (this.getLayer().getDeclutter()) {
      declutterBuilderGroup = new BuilderGroup_default(
        getTolerance(resolution, pixelRatio),
        extent,
        resolution,
        pixelRatio
      );
    }
    const userProjection = getUserProjection();
    let userTransform;
    if (userProjection) {
      for (let i = 0, ii = loadExtents.length; i < ii; ++i) {
        const extent2 = loadExtents[i];
        const userExtent2 = toUserExtent(extent2, projection);
        vectorSource.loadFeatures(
          userExtent2,
          toUserResolution(resolution, projection),
          userProjection
        );
      }
      userTransform = getTransformFromProjections(userProjection, projection);
    } else {
      for (let i = 0, ii = loadExtents.length; i < ii; ++i) {
        vectorSource.loadFeatures(loadExtents[i], resolution, projection);
      }
    }
    const squaredTolerance = getSquaredTolerance(resolution, pixelRatio);
    let ready = true;
    const render = (
      /**
       * @param {import("../../Feature.js").default} feature Feature.
       */
      (feature) => {
        let styles;
        const styleFunction = feature.getStyleFunction() || vectorLayer.getStyleFunction();
        if (styleFunction) {
          styles = styleFunction(feature, resolution);
        }
        if (styles) {
          const dirty = this.renderFeature(
            feature,
            squaredTolerance,
            styles,
            replayGroup,
            userTransform,
            declutterBuilderGroup
          );
          ready = ready && !dirty;
        }
      }
    );
    const userExtent = toUserExtent(extent, projection);
    const features = vectorSource.getFeaturesInExtent(userExtent);
    if (vectorLayerRenderOrder) {
      features.sort(vectorLayerRenderOrder);
    }
    for (let i = 0, ii = features.length; i < ii; ++i) {
      render(features[i]);
    }
    this.renderedFeatures_ = features;
    this.ready = ready;
    const replayGroupInstructions = replayGroup.finish();
    const executorGroup = new ExecutorGroup_default(
      extent,
      resolution,
      pixelRatio,
      vectorSource.getOverlaps(),
      replayGroupInstructions,
      vectorLayer.getRenderBuffer()
    );
    if (declutterBuilderGroup) {
      this.declutterExecutorGroup = new ExecutorGroup_default(
        extent,
        resolution,
        pixelRatio,
        vectorSource.getOverlaps(),
        declutterBuilderGroup.finish(),
        vectorLayer.getRenderBuffer()
      );
    }
    this.renderedResolution_ = resolution;
    this.renderedRevision_ = vectorLayerRevision;
    this.renderedRenderOrder_ = vectorLayerRenderOrder;
    this.renderedExtent_ = renderedExtent;
    this.wrappedRenderedExtent_ = extent;
    this.renderedCenter_ = center;
    this.renderedProjection_ = projection;
    this.replayGroup_ = executorGroup;
    this.hitDetectionImageData_ = null;
    this.replayGroupChanged = true;
    return true;
  }
  /**
   * @param {import("../../Feature.js").default} feature Feature.
   * @param {number} squaredTolerance Squared render tolerance.
   * @param {import("../../style/Style.js").default|Array<import("../../style/Style.js").default>} styles The style or array of styles.
   * @param {import("../../render/canvas/BuilderGroup.js").default} builderGroup Builder group.
   * @param {import("../../proj.js").TransformFunction} [transform] Transform from user to view projection.
   * @param {import("../../render/canvas/BuilderGroup.js").default} [declutterBuilderGroup] Builder for decluttering.
   * @return {boolean} `true` if an image is loading.
   */
  renderFeature(feature, squaredTolerance, styles, builderGroup, transform, declutterBuilderGroup) {
    if (!styles) {
      return false;
    }
    let loading = false;
    if (Array.isArray(styles)) {
      for (let i = 0, ii = styles.length; i < ii; ++i) {
        loading = renderFeature(
          builderGroup,
          feature,
          styles[i],
          squaredTolerance,
          this.boundHandleStyleImageChange_,
          transform,
          declutterBuilderGroup
        ) || loading;
      }
    } else {
      loading = renderFeature(
        builderGroup,
        feature,
        styles,
        squaredTolerance,
        this.boundHandleStyleImageChange_,
        transform,
        declutterBuilderGroup
      );
    }
    return loading;
  }
};
var VectorLayer_default = CanvasVectorLayerRenderer;

// node_modules/ol/layer/Vector.js
var VectorLayer = class extends BaseVector_default {
  /**
   * @param {import("./BaseVector.js").Options<VectorSourceType>} [options] Options.
   */
  constructor(options) {
    super(options);
  }
  createRenderer() {
    return new VectorLayer_default(this);
  }
};
var Vector_default = VectorLayer;

export {
  Fill_default,
  Stroke_default,
  Style_default,
  Text_default,
  Immediate_default,
  getSquaredTolerance,
  Vector_default
};
//# sourceMappingURL=chunk-PRAYZAHB.js.map
