import {
  Fill_default,
  Immediate_default,
  Stroke_default,
  Style_default,
  Text_default,
  Vector_default,
  getSquaredTolerance
} from "./chunk-PRAYZAHB.js";
import {
  Feature_default,
  Vector_default as Vector_default2
} from "./chunk-LR2VQ3HY.js";
import "./chunk-CF6XR2R4.js";
import {
  TileCache_default
} from "./chunk-FGNVULT7.js";
import "./chunk-7DRMGPMW.js";
import {
  Kinetic_default,
  MapBrowserEventHandler_default,
  MapBrowserEvent_default,
  MapEventType_default,
  MapEvent_default,
  Map_default,
  TileQueue_default
} from "./chunk-RTZFTOPO.js";
import {
  CLASS_SELECTABLE
} from "./chunk-WHKUJ6E4.js";
import {
  Collection_default
} from "./chunk-FF4NSUFB.js";
import "./chunk-7ZGQ7WQV.js";
import {
  ImageTile_default,
  TileRange_default,
  Tile_default
} from "./chunk-PP3BRDAG.js";
import {
  ImageState_default,
  Image_default
} from "./chunk-6FYOL5T7.js";
import {
  EventType_default
} from "./chunk-O6MS7WLI.js";
import {
  TileState_default
} from "./chunk-FNRXX6A4.js";
import {
  createCanvasContext2D,
  outerHeight,
  outerWidth,
  releaseCanvas,
  removeChildren,
  removeNode
} from "./chunk-LNGQ7YLP.js";
import {
  LineString_default
} from "./chunk-WJEHRHX5.js";
import "./chunk-FNHHZFJP.js";
import {
  View_default
} from "./chunk-73PHBHWK.js";
import "./chunk-4RPUYXPJ.js";
import {
  Point_default,
  circular,
  multiply
} from "./chunk-DCHCFMLM.js";
import {
  Disposable_default,
  Event_default,
  Object_default,
  Observable_default,
  VERSION,
  getUid,
  listen,
  unlistenByKey
} from "./chunk-2JNVDRY5.js";
import {
  applyTransform,
  approximatelyEquals,
  clamp,
  containsCoordinate,
  containsExtent,
  degreesToStringHDMS,
  equals,
  equivalent,
  get,
  getCenter,
  getIntersection,
  getTransform,
  getTransformFromProjections,
  getUserProjection,
  getWidth,
  identityTransform,
  intersects,
  isEmpty2 as isEmpty,
  squaredSegmentDistance,
  toRadians,
  wrapX
} from "./chunk-RZIVCB3D.js";
import "./chunk-STUZPFMT.js";

// node_modules/ol/Geolocation.js
var Property = {
  ACCURACY: "accuracy",
  ACCURACY_GEOMETRY: "accuracyGeometry",
  ALTITUDE: "altitude",
  ALTITUDE_ACCURACY: "altitudeAccuracy",
  HEADING: "heading",
  POSITION: "position",
  PROJECTION: "projection",
  SPEED: "speed",
  TRACKING: "tracking",
  TRACKING_OPTIONS: "trackingOptions"
};
var GeolocationErrorType = {
  /**
   * Triggered when a `GeolocationPositionError` occurs.
   * @event module:ol/Geolocation.GeolocationError#error
   * @api
   */
  ERROR: "error"
};
var GeolocationError = class extends Event_default {
  /**
   * @param {GeolocationPositionError} error error object.
   */
  constructor(error) {
    super(GeolocationErrorType.ERROR);
    this.code = error.code;
    this.message = error.message;
  }
};
var Geolocation = class extends Object_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    super();
    this.on;
    this.once;
    this.un;
    options = options || {};
    this.position_ = null;
    this.transform_ = identityTransform;
    this.watchId_ = void 0;
    this.addChangeListener(Property.PROJECTION, this.handleProjectionChanged_);
    this.addChangeListener(Property.TRACKING, this.handleTrackingChanged_);
    if (options.projection !== void 0) {
      this.setProjection(options.projection);
    }
    if (options.trackingOptions !== void 0) {
      this.setTrackingOptions(options.trackingOptions);
    }
    this.setTracking(options.tracking !== void 0 ? options.tracking : false);
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.setTracking(false);
    super.disposeInternal();
  }
  /**
   * @private
   */
  handleProjectionChanged_() {
    const projection = this.getProjection();
    if (projection) {
      this.transform_ = getTransformFromProjections(
        get("EPSG:4326"),
        projection
      );
      if (this.position_) {
        this.set(Property.POSITION, this.transform_(this.position_));
      }
    }
  }
  /**
   * @private
   */
  handleTrackingChanged_() {
    if ("geolocation" in navigator) {
      const tracking = this.getTracking();
      if (tracking && this.watchId_ === void 0) {
        this.watchId_ = navigator.geolocation.watchPosition(
          this.positionChange_.bind(this),
          this.positionError_.bind(this),
          this.getTrackingOptions()
        );
      } else if (!tracking && this.watchId_ !== void 0) {
        navigator.geolocation.clearWatch(this.watchId_);
        this.watchId_ = void 0;
      }
    }
  }
  /**
   * @private
   * @param {GeolocationPosition} position position event.
   */
  positionChange_(position) {
    const coords = position.coords;
    this.set(Property.ACCURACY, coords.accuracy);
    this.set(
      Property.ALTITUDE,
      coords.altitude === null ? void 0 : coords.altitude
    );
    this.set(
      Property.ALTITUDE_ACCURACY,
      coords.altitudeAccuracy === null ? void 0 : coords.altitudeAccuracy
    );
    this.set(
      Property.HEADING,
      coords.heading === null ? void 0 : toRadians(coords.heading)
    );
    if (!this.position_) {
      this.position_ = [coords.longitude, coords.latitude];
    } else {
      this.position_[0] = coords.longitude;
      this.position_[1] = coords.latitude;
    }
    const projectedPosition = this.transform_(this.position_);
    this.set(Property.POSITION, projectedPosition.slice());
    this.set(Property.SPEED, coords.speed === null ? void 0 : coords.speed);
    const geometry = circular(this.position_, coords.accuracy);
    geometry.applyTransform(this.transform_);
    this.set(Property.ACCURACY_GEOMETRY, geometry);
    this.changed();
  }
  /**
   * @private
   * @param {GeolocationPositionError} error error object.
   */
  positionError_(error) {
    this.dispatchEvent(new GeolocationError(error));
  }
  /**
   * Get the accuracy of the position in meters.
   * @return {number|undefined} The accuracy of the position measurement in
   *     meters.
   * @observable
   * @api
   */
  getAccuracy() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ACCURACY)
    );
  }
  /**
   * Get a geometry of the position accuracy.
   * @return {?import("./geom/Polygon.js").default} A geometry of the position accuracy.
   * @observable
   * @api
   */
  getAccuracyGeometry() {
    return (
      /** @type {?import("./geom/Polygon.js").default} */
      this.get(Property.ACCURACY_GEOMETRY) || null
    );
  }
  /**
   * Get the altitude associated with the position.
   * @return {number|undefined} The altitude of the position in meters above mean
   *     sea level.
   * @observable
   * @api
   */
  getAltitude() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ALTITUDE)
    );
  }
  /**
   * Get the altitude accuracy of the position.
   * @return {number|undefined} The accuracy of the altitude measurement in
   *     meters.
   * @observable
   * @api
   */
  getAltitudeAccuracy() {
    return (
      /** @type {number|undefined} */
      this.get(Property.ALTITUDE_ACCURACY)
    );
  }
  /**
   * Get the heading as radians clockwise from North.
   * Note: depending on the browser, the heading is only defined if the `enableHighAccuracy`
   * is set to `true` in the tracking options.
   * @return {number|undefined} The heading of the device in radians from north.
   * @observable
   * @api
   */
  getHeading() {
    return (
      /** @type {number|undefined} */
      this.get(Property.HEADING)
    );
  }
  /**
   * Get the position of the device.
   * @return {import("./coordinate.js").Coordinate|undefined} The current position of the device reported
   *     in the current projection.
   * @observable
   * @api
   */
  getPosition() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(Property.POSITION)
    );
  }
  /**
   * Get the projection associated with the position.
   * @return {import("./proj/Projection.js").default|undefined} The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  getProjection() {
    return (
      /** @type {import("./proj/Projection.js").default|undefined} */
      this.get(Property.PROJECTION)
    );
  }
  /**
   * Get the speed in meters per second.
   * @return {number|undefined} The instantaneous speed of the device in meters
   *     per second.
   * @observable
   * @api
   */
  getSpeed() {
    return (
      /** @type {number|undefined} */
      this.get(Property.SPEED)
    );
  }
  /**
   * Determine if the device location is being tracked.
   * @return {boolean} The device location is being tracked.
   * @observable
   * @api
   */
  getTracking() {
    return (
      /** @type {boolean} */
      this.get(Property.TRACKING)
    );
  }
  /**
   * Get the tracking options.
   * See https://www.w3.org/TR/geolocation-API/#position-options.
   * @return {PositionOptions|undefined} PositionOptions as defined by
   *     the [HTML5 Geolocation spec
   *     ](https://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  getTrackingOptions() {
    return (
      /** @type {PositionOptions|undefined} */
      this.get(Property.TRACKING_OPTIONS)
    );
  }
  /**
   * Set the projection to use for transforming the coordinates.
   * @param {import("./proj.js").ProjectionLike} projection The projection the position is
   *     reported in.
   * @observable
   * @api
   */
  setProjection(projection) {
    this.set(Property.PROJECTION, get(projection));
  }
  /**
   * Enable or disable tracking.
   * @param {boolean} tracking Enable tracking.
   * @observable
   * @api
   */
  setTracking(tracking) {
    this.set(Property.TRACKING, tracking);
  }
  /**
   * Set the tracking options.
   * See http://www.w3.org/TR/geolocation-API/#position-options.
   * @param {PositionOptions} options PositionOptions as defined by the
   *     [HTML5 Geolocation spec
   *     ](http://www.w3.org/TR/geolocation-API/#position_options_interface).
   * @observable
   * @api
   */
  setTrackingOptions(options) {
    this.set(Property.TRACKING_OPTIONS, options);
  }
};
var Geolocation_default = Geolocation;

// node_modules/ol/render.js
function getVectorContext(event) {
  if (!(event.context instanceof CanvasRenderingContext2D)) {
    throw new Error("Only works for render events from Canvas 2D layers");
  }
  const a = event.inversePixelTransform[0];
  const b = event.inversePixelTransform[1];
  const canvasPixelRatio = Math.sqrt(a * a + b * b);
  const frameState = event.frameState;
  const transform = multiply(
    event.inversePixelTransform.slice(),
    frameState.coordinateToPixelTransform
  );
  const squaredTolerance = getSquaredTolerance(
    frameState.viewState.resolution,
    canvasPixelRatio
  );
  let userTransform;
  const userProjection = getUserProjection();
  if (userProjection) {
    userTransform = getTransformFromProjections(
      userProjection,
      frameState.viewState.projection
    );
  }
  return new Immediate_default(
    event.context,
    canvasPixelRatio,
    frameState.extent,
    transform,
    frameState.viewState.rotation,
    squaredTolerance,
    userTransform
  );
}

// node_modules/ol/geom/flat/geodesic.js
function line(interpolate, transform, squaredTolerance) {
  const flatCoordinates = [];
  let geoA = interpolate(0);
  let geoB = interpolate(1);
  let a = transform(geoA);
  let b = transform(geoB);
  const geoStack = [geoB, geoA];
  const stack = [b, a];
  const fractionStack = [1, 0];
  const fractions = {};
  let maxIterations = 1e5;
  let geoM, m, fracA, fracB, fracM, key;
  while (--maxIterations > 0 && fractionStack.length > 0) {
    fracA = fractionStack.pop();
    geoA = geoStack.pop();
    a = stack.pop();
    key = fracA.toString();
    if (!(key in fractions)) {
      flatCoordinates.push(a[0], a[1]);
      fractions[key] = true;
    }
    fracB = fractionStack.pop();
    geoB = geoStack.pop();
    b = stack.pop();
    fracM = (fracA + fracB) / 2;
    geoM = interpolate(fracM);
    m = transform(geoM);
    if (squaredSegmentDistance(m[0], m[1], a[0], a[1], b[0], b[1]) < squaredTolerance) {
      flatCoordinates.push(b[0], b[1]);
      key = fracB.toString();
      fractions[key] = true;
    } else {
      fractionStack.push(fracB, fracM, fracM, fracA);
      stack.push(b, m, m, a);
      geoStack.push(geoB, geoM, geoM, geoA);
    }
  }
  return flatCoordinates;
}
function meridian(lon, lat1, lat2, projection, squaredTolerance) {
  const epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon, lat1 + (lat2 - lat1) * frac];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}
function parallel(lat, lon1, lon2, projection, squaredTolerance) {
  const epsg4326Projection = get("EPSG:4326");
  return line(
    /**
     * @param {number} frac Fraction.
     * @return {import("../../coordinate.js").Coordinate} Coordinate.
     */
    function(frac) {
      return [lon1 + (lon2 - lon1) * frac, lat];
    },
    getTransform(epsg4326Projection, projection),
    squaredTolerance
  );
}

// node_modules/ol/layer/Graticule.js
var DEFAULT_STROKE_STYLE = new Stroke_default({
  color: "rgba(0,0,0,0.2)"
});
var INTERVALS = [
  90,
  45,
  30,
  20,
  10,
  5,
  2,
  1,
  30 / 60,
  20 / 60,
  10 / 60,
  5 / 60,
  2 / 60,
  1 / 60,
  30 / 3600,
  20 / 3600,
  10 / 3600,
  5 / 3600,
  2 / 3600,
  1 / 3600
];
var Graticule = class extends Vector_default {
  /**
   * @param {Options} [options] Options.
   */
  constructor(options) {
    options = options ? options : {};
    const baseOptions = Object.assign(
      {
        updateWhileAnimating: true,
        updateWhileInteracting: true,
        renderBuffer: 0
      },
      options
    );
    delete baseOptions.maxLines;
    delete baseOptions.strokeStyle;
    delete baseOptions.targetSize;
    delete baseOptions.showLabels;
    delete baseOptions.lonLabelFormatter;
    delete baseOptions.latLabelFormatter;
    delete baseOptions.lonLabelPosition;
    delete baseOptions.latLabelPosition;
    delete baseOptions.lonLabelStyle;
    delete baseOptions.latLabelStyle;
    delete baseOptions.intervals;
    super(baseOptions);
    this.projection_ = null;
    this.maxLat_ = Infinity;
    this.maxLon_ = Infinity;
    this.minLat_ = -Infinity;
    this.minLon_ = -Infinity;
    this.maxX_ = Infinity;
    this.maxY_ = Infinity;
    this.minX_ = -Infinity;
    this.minY_ = -Infinity;
    this.targetSize_ = options.targetSize !== void 0 ? options.targetSize : 100;
    this.maxLines_ = options.maxLines !== void 0 ? options.maxLines : 100;
    this.meridians_ = [];
    this.parallels_ = [];
    this.strokeStyle_ = options.strokeStyle !== void 0 ? options.strokeStyle : DEFAULT_STROKE_STYLE;
    this.fromLonLatTransform_ = void 0;
    this.toLonLatTransform_ = void 0;
    this.projectionCenterLonLat_ = null;
    this.bottomLeft_ = null;
    this.bottomRight_ = null;
    this.topLeft_ = null;
    this.topRight_ = null;
    this.meridiansLabels_ = null;
    this.parallelsLabels_ = null;
    if (options.showLabels) {
      this.lonLabelFormatter_ = options.lonLabelFormatter == void 0 ? degreesToStringHDMS.bind(this, "EW") : options.lonLabelFormatter;
      this.latLabelFormatter_ = options.latLabelFormatter == void 0 ? degreesToStringHDMS.bind(this, "NS") : options.latLabelFormatter;
      this.lonLabelPosition_ = options.lonLabelPosition == void 0 ? 0 : options.lonLabelPosition;
      this.latLabelPosition_ = options.latLabelPosition == void 0 ? 1 : options.latLabelPosition;
      this.lonLabelStyleBase_ = new Style_default({
        text: options.lonLabelStyle !== void 0 ? options.lonLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textBaseline: "bottom",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      this.lonLabelStyle_ = (feature) => {
        const label = feature.get("graticule_label");
        this.lonLabelStyleBase_.getText().setText(label);
        return this.lonLabelStyleBase_;
      };
      this.latLabelStyleBase_ = new Style_default({
        text: options.latLabelStyle !== void 0 ? options.latLabelStyle.clone() : new Text_default({
          font: "12px Calibri,sans-serif",
          textAlign: "right",
          fill: new Fill_default({
            color: "rgba(0,0,0,1)"
          }),
          stroke: new Stroke_default({
            color: "rgba(255,255,255,1)",
            width: 3
          })
        })
      });
      this.latLabelStyle_ = (feature) => {
        const label = feature.get("graticule_label");
        this.latLabelStyleBase_.getText().setText(label);
        return this.latLabelStyleBase_;
      };
      this.meridiansLabels_ = [];
      this.parallelsLabels_ = [];
      this.addEventListener(EventType_default.POSTRENDER, this.drawLabels_.bind(this));
    }
    this.intervals_ = options.intervals !== void 0 ? options.intervals : INTERVALS;
    this.setSource(
      new Vector_default2({
        loader: this.loaderFunction.bind(this),
        strategy: this.strategyFunction.bind(this),
        features: new Collection_default(),
        overlaps: false,
        useSpatialIndex: false,
        wrapX: options.wrapX
      })
    );
    this.featurePool_ = [];
    this.lineStyle_ = new Style_default({
      stroke: this.strokeStyle_
    });
    this.loadedExtent_ = null;
    this.renderedExtent_ = null;
    this.renderedResolution_ = null;
    this.setRenderOrder(null);
  }
  /**
   * Strategy function for loading features based on the view's extent and
   * resolution.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @return {Array<import("../extent.js").Extent>} Extents.
   */
  strategyFunction(extent, resolution) {
    let realWorldExtent = extent.slice();
    if (this.projection_ && this.getSource().getWrapX()) {
      wrapX(realWorldExtent, this.projection_);
    }
    if (this.loadedExtent_) {
      if (approximatelyEquals(this.loadedExtent_, realWorldExtent, resolution)) {
        realWorldExtent = this.loadedExtent_.slice();
      } else {
        this.getSource().removeLoadedExtent(this.loadedExtent_);
      }
    }
    return [realWorldExtent];
  }
  /**
   * Update geometries in the source based on current view
   * @param {import("../extent").Extent} extent Extent
   * @param {number} resolution Resolution
   * @param {import("../proj/Projection.js").default} projection Projection
   */
  loaderFunction(extent, resolution, projection) {
    this.loadedExtent_ = extent;
    const source = this.getSource();
    const layerExtent = this.getExtent() || [
      -Infinity,
      -Infinity,
      Infinity,
      Infinity
    ];
    const renderExtent = getIntersection(layerExtent, extent);
    if (this.renderedExtent_ && equals(this.renderedExtent_, renderExtent) && this.renderedResolution_ === resolution) {
      return;
    }
    this.renderedExtent_ = renderExtent;
    this.renderedResolution_ = resolution;
    if (isEmpty(renderExtent)) {
      return;
    }
    const center = getCenter(renderExtent);
    const squaredTolerance = resolution * resolution / 4;
    const updateProjectionInfo = !this.projection_ || !equivalent(this.projection_, projection);
    if (updateProjectionInfo) {
      this.updateProjectionInfo_(projection);
    }
    this.createGraticule_(renderExtent, center, resolution, squaredTolerance);
    let featureCount = this.meridians_.length + this.parallels_.length;
    if (this.meridiansLabels_) {
      featureCount += this.meridians_.length;
    }
    if (this.parallelsLabels_) {
      featureCount += this.parallels_.length;
    }
    let feature;
    while (featureCount > this.featurePool_.length) {
      feature = new Feature_default();
      this.featurePool_.push(feature);
    }
    const featuresColl = source.getFeaturesCollection();
    featuresColl.clear();
    let poolIndex = 0;
    let i, l;
    for (i = 0, l = this.meridians_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.meridians_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
    for (i = 0, l = this.parallels_.length; i < l; ++i) {
      feature = this.featurePool_[poolIndex++];
      feature.setGeometry(this.parallels_[i]);
      feature.setStyle(this.lineStyle_);
      featuresColl.push(feature);
    }
  }
  /**
   * @param {number} lon Longitude.
   * @param {number} minLat Minimal latitude.
   * @param {number} maxLat Maximal latitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {number} Index.
   * @private
   */
  addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, index) {
    const lineString = this.getMeridian_(
      lon,
      minLat,
      maxLat,
      squaredTolerance,
      index
    );
    if (intersects(lineString.getExtent(), extent)) {
      if (this.meridiansLabels_) {
        const text = this.lonLabelFormatter_(lon);
        if (index in this.meridiansLabels_) {
          this.meridiansLabels_[index].text = text;
        } else {
          this.meridiansLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.meridians_[index++] = lineString;
    }
    return index;
  }
  /**
   * @param {number} lat Latitude.
   * @param {number} minLon Minimal longitude.
   * @param {number} maxLon Maximal longitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {number} Index.
   * @private
   */
  addParallel_(lat, minLon, maxLon, squaredTolerance, extent, index) {
    const lineString = this.getParallel_(
      lat,
      minLon,
      maxLon,
      squaredTolerance,
      index
    );
    if (intersects(lineString.getExtent(), extent)) {
      if (this.parallelsLabels_) {
        const text = this.latLabelFormatter_(lat);
        if (index in this.parallelsLabels_) {
          this.parallelsLabels_[index].text = text;
        } else {
          this.parallelsLabels_[index] = {
            geom: new Point_default([]),
            text
          };
        }
      }
      this.parallels_[index++] = lineString;
    }
    return index;
  }
  /**
   * @param {import("../render/Event.js").default} event Render event.
   * @private
   */
  drawLabels_(event) {
    const rotation = event.frameState.viewState.rotation;
    const resolution = event.frameState.viewState.resolution;
    const size = event.frameState.size;
    const extent = event.frameState.extent;
    const rotationCenter = getCenter(extent);
    let rotationExtent = extent;
    if (rotation) {
      const unrotatedWidth = size[0] * resolution;
      const unrotatedHeight = size[1] * resolution;
      rotationExtent = [
        rotationCenter[0] - unrotatedWidth / 2,
        rotationCenter[1] - unrotatedHeight / 2,
        rotationCenter[0] + unrotatedWidth / 2,
        rotationCenter[1] + unrotatedHeight / 2
      ];
    }
    let startWorld = 0;
    let endWorld = 0;
    let labelsAtStart = this.latLabelPosition_ < 0.5;
    const projectionExtent = this.projection_.getExtent();
    const worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      startWorld = Math.floor((extent[0] - projectionExtent[0]) / worldWidth);
      endWorld = Math.ceil((extent[2] - projectionExtent[2]) / worldWidth);
      const inverted = Math.abs(rotation) > Math.PI / 2;
      labelsAtStart = labelsAtStart !== inverted;
    }
    const vectorContext = getVectorContext(event);
    for (let world = startWorld; world <= endWorld; ++world) {
      let poolIndex = this.meridians_.length + this.parallels_.length;
      let feature, index, l, textPoint;
      if (this.meridiansLabels_) {
        for (index = 0, l = this.meridiansLabels_.length; index < l; ++index) {
          const lineString = this.meridians_[index];
          if (!rotation && world === 0) {
            textPoint = this.getMeridianPoint_(lineString, extent, index);
          } else {
            const clone = lineString.clone();
            clone.translate(world * worldWidth, 0);
            clone.rotate(-rotation, rotationCenter);
            textPoint = this.getMeridianPoint_(clone, rotationExtent, index);
            textPoint.rotate(rotation, rotationCenter);
          }
          feature = this.featurePool_[poolIndex++];
          feature.setGeometry(textPoint);
          feature.set("graticule_label", this.meridiansLabels_[index].text);
          vectorContext.drawFeature(feature, this.lonLabelStyle_(feature));
        }
      }
      if (this.parallelsLabels_) {
        if (world === startWorld && labelsAtStart || world === endWorld && !labelsAtStart) {
          for (index = 0, l = this.parallels_.length; index < l; ++index) {
            const lineString = this.parallels_[index];
            if (!rotation && world === 0) {
              textPoint = this.getParallelPoint_(lineString, extent, index);
            } else {
              const clone = lineString.clone();
              clone.translate(world * worldWidth, 0);
              clone.rotate(-rotation, rotationCenter);
              textPoint = this.getParallelPoint_(clone, rotationExtent, index);
              textPoint.rotate(rotation, rotationCenter);
            }
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(textPoint);
            feature.set("graticule_label", this.parallelsLabels_[index].text);
            vectorContext.drawFeature(feature, this.latLabelStyle_(feature));
          }
        }
      }
    }
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @param {number} resolution Resolution.
   * @param {number} squaredTolerance Squared tolerance.
   * @private
   */
  createGraticule_(extent, center, resolution, squaredTolerance) {
    const interval = this.getInterval_(resolution);
    if (interval == -1) {
      this.meridians_.length = 0;
      this.parallels_.length = 0;
      if (this.meridiansLabels_) {
        this.meridiansLabels_.length = 0;
      }
      if (this.parallelsLabels_) {
        this.parallelsLabels_.length = 0;
      }
      return;
    }
    let wrapX2 = false;
    const projectionExtent = this.projection_.getExtent();
    const worldWidth = getWidth(projectionExtent);
    if (this.getSource().getWrapX() && this.projection_.canWrapX() && !containsExtent(projectionExtent, extent)) {
      if (getWidth(extent) >= worldWidth) {
        extent[0] = projectionExtent[0];
        extent[2] = projectionExtent[2];
      } else {
        wrapX2 = true;
      }
    }
    const validCenterP = [
      clamp(center[0], this.minX_, this.maxX_),
      clamp(center[1], this.minY_, this.maxY_)
    ];
    const centerLonLat = this.toLonLatTransform_(validCenterP);
    if (isNaN(centerLonLat[1])) {
      centerLonLat[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    let centerLon = clamp(centerLonLat[0], this.minLon_, this.maxLon_);
    let centerLat = clamp(centerLonLat[1], this.minLat_, this.maxLat_);
    const maxLines = this.maxLines_;
    let cnt, idx, lat, lon;
    let validExtentP = extent;
    if (!wrapX2) {
      validExtentP = [
        clamp(extent[0], this.minX_, this.maxX_),
        clamp(extent[1], this.minY_, this.maxY_),
        clamp(extent[2], this.minX_, this.maxX_),
        clamp(extent[3], this.minY_, this.maxY_)
      ];
    }
    const validExtent = applyTransform(
      validExtentP,
      this.toLonLatTransform_,
      void 0,
      8
    );
    let maxLat = validExtent[3];
    let maxLon = validExtent[2];
    let minLat = validExtent[1];
    let minLon = validExtent[0];
    if (!wrapX2) {
      if (containsCoordinate(validExtentP, this.bottomLeft_)) {
        minLon = this.minLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.bottomRight_)) {
        maxLon = this.maxLon_;
        minLat = this.minLat_;
      }
      if (containsCoordinate(validExtentP, this.topLeft_)) {
        minLon = this.minLon_;
        maxLat = this.maxLat_;
      }
      if (containsCoordinate(validExtentP, this.topRight_)) {
        maxLon = this.maxLon_;
        maxLat = this.maxLat_;
      }
      maxLat = clamp(maxLat, centerLat, this.maxLat_);
      maxLon = clamp(maxLon, centerLon, this.maxLon_);
      minLat = clamp(minLat, this.minLat_, centerLat);
      minLon = clamp(minLon, this.minLon_, centerLon);
    }
    centerLon = Math.floor(centerLon / interval) * interval;
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    idx = this.addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, 0);
    cnt = 0;
    if (wrapX2) {
      while ((lon -= interval) >= minLon && cnt++ < maxLines) {
        idx = this.addMeridian_(
          lon,
          minLat,
          maxLat,
          squaredTolerance,
          extent,
          idx
        );
      }
    } else {
      while (lon != this.minLon_ && cnt++ < maxLines) {
        lon = Math.max(lon - interval, this.minLon_);
        idx = this.addMeridian_(
          lon,
          minLat,
          maxLat,
          squaredTolerance,
          extent,
          idx
        );
      }
    }
    lon = clamp(centerLon, this.minLon_, this.maxLon_);
    cnt = 0;
    if (wrapX2) {
      while ((lon += interval) <= maxLon && cnt++ < maxLines) {
        idx = this.addMeridian_(
          lon,
          minLat,
          maxLat,
          squaredTolerance,
          extent,
          idx
        );
      }
    } else {
      while (lon != this.maxLon_ && cnt++ < maxLines) {
        lon = Math.min(lon + interval, this.maxLon_);
        idx = this.addMeridian_(
          lon,
          minLat,
          maxLat,
          squaredTolerance,
          extent,
          idx
        );
      }
    }
    this.meridians_.length = idx;
    if (this.meridiansLabels_) {
      this.meridiansLabels_.length = idx;
    }
    centerLat = Math.floor(centerLat / interval) * interval;
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    idx = this.addParallel_(lat, minLon, maxLon, squaredTolerance, extent, 0);
    cnt = 0;
    while (lat != this.minLat_ && cnt++ < maxLines) {
      lat = Math.max(lat - interval, this.minLat_);
      idx = this.addParallel_(
        lat,
        minLon,
        maxLon,
        squaredTolerance,
        extent,
        idx
      );
    }
    lat = clamp(centerLat, this.minLat_, this.maxLat_);
    cnt = 0;
    while (lat != this.maxLat_ && cnt++ < maxLines) {
      lat = Math.min(lat + interval, this.maxLat_);
      idx = this.addParallel_(
        lat,
        minLon,
        maxLon,
        squaredTolerance,
        extent,
        idx
      );
    }
    this.parallels_.length = idx;
    if (this.parallelsLabels_) {
      this.parallelsLabels_.length = idx;
    }
  }
  /**
   * @param {number} resolution Resolution.
   * @return {number} The interval in degrees.
   * @private
   */
  getInterval_(resolution) {
    const centerLon = this.projectionCenterLonLat_[0];
    const centerLat = this.projectionCenterLonLat_[1];
    let interval = -1;
    const target = Math.pow(this.targetSize_ * resolution, 2);
    const p1 = [];
    const p2 = [];
    for (let i = 0, ii = this.intervals_.length; i < ii; ++i) {
      const delta = clamp(this.intervals_[i] / 2, 0, 90);
      const clampedLat = clamp(centerLat, -90 + delta, 90 - delta);
      p1[0] = centerLon - delta;
      p1[1] = clampedLat - delta;
      p2[0] = centerLon + delta;
      p2[1] = clampedLat + delta;
      this.fromLonLatTransform_(p1, p1);
      this.fromLonLatTransform_(p2, p2);
      const dist = Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2);
      if (dist <= target) {
        break;
      }
      interval = this.intervals_[i];
    }
    return interval;
  }
  /**
   * @param {number} lon Longitude.
   * @param {number} minLat Minimal latitude.
   * @param {number} maxLat Maximal latitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} The meridian line string.
   * @param {number} index Index.
   * @private
   */
  getMeridian_(lon, minLat, maxLat, squaredTolerance, index) {
    const flatCoordinates = meridian(
      lon,
      minLat,
      maxLat,
      this.projection_,
      squaredTolerance
    );
    let lineString = this.meridians_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, "XY");
      this.meridians_[index] = lineString;
    } else {
      lineString.setFlatCoordinates("XY", flatCoordinates);
      lineString.changed();
    }
    return lineString;
  }
  /**
   * @param {LineString} lineString Meridian
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {Point} Meridian point.
   * @private
   */
  getMeridianPoint_(lineString, extent, index) {
    const flatCoordinates = lineString.getFlatCoordinates();
    let bottom = 1;
    let top = flatCoordinates.length - 1;
    if (flatCoordinates[bottom] > flatCoordinates[top]) {
      bottom = top;
      top = 1;
    }
    const clampedBottom = Math.max(extent[1], flatCoordinates[bottom]);
    const clampedTop = Math.min(extent[3], flatCoordinates[top]);
    const lat = clamp(
      extent[1] + Math.abs(extent[1] - extent[3]) * this.lonLabelPosition_,
      clampedBottom,
      clampedTop
    );
    const coordinate0 = flatCoordinates[bottom - 1] + (flatCoordinates[top - 1] - flatCoordinates[bottom - 1]) * (lat - flatCoordinates[bottom]) / (flatCoordinates[top] - flatCoordinates[bottom]);
    const coordinate = [coordinate0, lat];
    const point = this.meridiansLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  }
  /**
   * Get the list of meridians.  Meridians are lines of equal longitude.
   * @return {Array<LineString>} The meridians.
   * @api
   */
  getMeridians() {
    return this.meridians_;
  }
  /**
   * @param {number} lat Latitude.
   * @param {number} minLon Minimal longitude.
   * @param {number} maxLon Maximal longitude.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} The parallel line string.
   * @param {number} index Index.
   * @private
   */
  getParallel_(lat, minLon, maxLon, squaredTolerance, index) {
    const flatCoordinates = parallel(
      lat,
      minLon,
      maxLon,
      this.projection_,
      squaredTolerance
    );
    let lineString = this.parallels_[index];
    if (!lineString) {
      lineString = new LineString_default(flatCoordinates, "XY");
    } else {
      lineString.setFlatCoordinates("XY", flatCoordinates);
      lineString.changed();
    }
    return lineString;
  }
  /**
   * @param {LineString} lineString Parallels.
   * @param {import("../extent.js").Extent} extent Extent.
   * @param {number} index Index.
   * @return {Point} Parallel point.
   * @private
   */
  getParallelPoint_(lineString, extent, index) {
    const flatCoordinates = lineString.getFlatCoordinates();
    let left = 0;
    let right = flatCoordinates.length - 2;
    if (flatCoordinates[left] > flatCoordinates[right]) {
      left = right;
      right = 0;
    }
    const clampedLeft = Math.max(extent[0], flatCoordinates[left]);
    const clampedRight = Math.min(extent[2], flatCoordinates[right]);
    const lon = clamp(
      extent[0] + Math.abs(extent[0] - extent[2]) * this.latLabelPosition_,
      clampedLeft,
      clampedRight
    );
    const coordinate1 = flatCoordinates[left + 1] + (flatCoordinates[right + 1] - flatCoordinates[left + 1]) * (lon - flatCoordinates[left]) / (flatCoordinates[right] - flatCoordinates[left]);
    const coordinate = [lon, coordinate1];
    const point = this.parallelsLabels_[index].geom;
    point.setCoordinates(coordinate);
    return point;
  }
  /**
   * Get the list of parallels.  Parallels are lines of equal latitude.
   * @return {Array<LineString>} The parallels.
   * @api
   */
  getParallels() {
    return this.parallels_;
  }
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @private
   */
  updateProjectionInfo_(projection) {
    const epsg4326Projection = get("EPSG:4326");
    const worldExtent = projection.getWorldExtent();
    this.maxLat_ = worldExtent[3];
    this.maxLon_ = worldExtent[2];
    this.minLat_ = worldExtent[1];
    this.minLon_ = worldExtent[0];
    const toLonLatTransform = getTransform(projection, epsg4326Projection);
    if (this.minLon_ < this.maxLon_) {
      this.toLonLatTransform_ = toLonLatTransform;
    } else {
      const split = this.minLon_ + this.maxLon_ / 2;
      this.maxLon_ += 360;
      this.toLonLatTransform_ = function(coordinates, output, dimension) {
        dimension = dimension || 2;
        const lonLatCoordinates = toLonLatTransform(
          coordinates,
          output,
          dimension
        );
        for (let i = 0, l = lonLatCoordinates.length; i < l; i += dimension) {
          if (lonLatCoordinates[i] < split) {
            lonLatCoordinates[i] += 360;
          }
        }
        return lonLatCoordinates;
      };
    }
    this.fromLonLatTransform_ = getTransform(epsg4326Projection, projection);
    const worldExtentP = applyTransform(
      [this.minLon_, this.minLat_, this.maxLon_, this.maxLat_],
      this.fromLonLatTransform_,
      void 0,
      8
    );
    this.minX_ = worldExtentP[0];
    this.maxX_ = worldExtentP[2];
    this.minY_ = worldExtentP[1];
    this.maxY_ = worldExtentP[3];
    this.bottomLeft_ = this.fromLonLatTransform_([this.minLon_, this.minLat_]);
    this.bottomRight_ = this.fromLonLatTransform_([this.maxLon_, this.minLat_]);
    this.topLeft_ = this.fromLonLatTransform_([this.minLon_, this.maxLat_]);
    this.topRight_ = this.fromLonLatTransform_([this.maxLon_, this.maxLat_]);
    this.projectionCenterLonLat_ = this.toLonLatTransform_(
      getCenter(projection.getExtent())
    );
    if (isNaN(this.projectionCenterLonLat_[1])) {
      this.projectionCenterLonLat_[1] = Math.abs(this.maxLat_) >= Math.abs(this.minLat_) ? this.maxLat_ : this.minLat_;
    }
    this.projection_ = projection;
  }
};
var Graticule_default = Graticule;

// node_modules/ol/ImageCanvas.js
var ImageCanvas = class extends Image_default {
  /**
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {number} resolution Resolution.
   * @param {number} pixelRatio Pixel ratio.
   * @param {HTMLCanvasElement} canvas Canvas.
   * @param {Loader} [loader] Optional loader function to
   *     support asynchronous canvas drawing.
   */
  constructor(extent, resolution, pixelRatio, canvas, loader) {
    const state = loader !== void 0 ? ImageState_default.IDLE : ImageState_default.LOADED;
    super(extent, resolution, pixelRatio, state);
    this.loader_ = loader !== void 0 ? loader : null;
    this.canvas_ = canvas;
    this.error_ = null;
  }
  /**
   * Get any error associated with asynchronous rendering.
   * @return {?Error} Any error that occurred during rendering.
   */
  getError() {
    return this.error_;
  }
  /**
   * Handle async drawing complete.
   * @param {Error} [err] Any error during drawing.
   * @private
   */
  handleLoad_(err) {
    if (err) {
      this.error_ = err;
      this.state = ImageState_default.ERROR;
    } else {
      this.state = ImageState_default.LOADED;
    }
    this.changed();
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.state == ImageState_default.IDLE) {
      this.state = ImageState_default.LOADING;
      this.changed();
      this.loader_(this.handleLoad_.bind(this));
    }
  }
  /**
   * @return {HTMLCanvasElement} Canvas element.
   */
  getImage() {
    return this.canvas_;
  }
};
var ImageCanvas_default = ImageCanvas;

// node_modules/ol/Overlay.js
var Property2 = {
  ELEMENT: "element",
  MAP: "map",
  OFFSET: "offset",
  POSITION: "position",
  POSITIONING: "positioning"
};
var Overlay = class extends Object_default {
  /**
   * @param {Options} options Overlay options.
   */
  constructor(options) {
    super();
    this.on;
    this.once;
    this.un;
    this.options = options;
    this.id = options.id;
    this.insertFirst = options.insertFirst !== void 0 ? options.insertFirst : true;
    this.stopEvent = options.stopEvent !== void 0 ? options.stopEvent : true;
    this.element = document.createElement("div");
    this.element.className = options.className !== void 0 ? options.className : "ol-overlay-container " + CLASS_SELECTABLE;
    this.element.style.position = "absolute";
    this.element.style.pointerEvents = "auto";
    this.autoPan = options.autoPan === true ? {} : options.autoPan || void 0;
    this.rendered = {
      transform_: "",
      visible: true
    };
    this.mapPostrenderListenerKey = null;
    this.addChangeListener(Property2.ELEMENT, this.handleElementChanged);
    this.addChangeListener(Property2.MAP, this.handleMapChanged);
    this.addChangeListener(Property2.OFFSET, this.handleOffsetChanged);
    this.addChangeListener(Property2.POSITION, this.handlePositionChanged);
    this.addChangeListener(Property2.POSITIONING, this.handlePositioningChanged);
    if (options.element !== void 0) {
      this.setElement(options.element);
    }
    this.setOffset(options.offset !== void 0 ? options.offset : [0, 0]);
    this.setPositioning(options.positioning || "top-left");
    if (options.position !== void 0) {
      this.setPosition(options.position);
    }
  }
  /**
   * Get the DOM element of this overlay.
   * @return {HTMLElement|undefined} The Element containing the overlay.
   * @observable
   * @api
   */
  getElement() {
    return (
      /** @type {HTMLElement|undefined} */
      this.get(Property2.ELEMENT)
    );
  }
  /**
   * Get the overlay identifier which is set on constructor.
   * @return {number|string|undefined} Id.
   * @api
   */
  getId() {
    return this.id;
  }
  /**
   * Get the map associated with this overlay.
   * @return {import("./Map.js").default|null} The map that the
   * overlay is part of.
   * @observable
   * @api
   */
  getMap() {
    return (
      /** @type {import("./Map.js").default|null} */
      this.get(Property2.MAP) || null
    );
  }
  /**
   * Get the offset of this overlay.
   * @return {Array<number>} The offset.
   * @observable
   * @api
   */
  getOffset() {
    return (
      /** @type {Array<number>} */
      this.get(Property2.OFFSET)
    );
  }
  /**
   * Get the current position of this overlay.
   * @return {import("./coordinate.js").Coordinate|undefined} The spatial point that the overlay is
   *     anchored at.
   * @observable
   * @api
   */
  getPosition() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(Property2.POSITION)
    );
  }
  /**
   * Get the current positioning of this overlay.
   * @return {Positioning} How the overlay is positioned
   *     relative to its point on the map.
   * @observable
   * @api
   */
  getPositioning() {
    return (
      /** @type {Positioning} */
      this.get(Property2.POSITIONING)
    );
  }
  /**
   * @protected
   */
  handleElementChanged() {
    removeChildren(this.element);
    const element = this.getElement();
    if (element) {
      this.element.appendChild(element);
    }
  }
  /**
   * @protected
   */
  handleMapChanged() {
    if (this.mapPostrenderListenerKey) {
      removeNode(this.element);
      unlistenByKey(this.mapPostrenderListenerKey);
      this.mapPostrenderListenerKey = null;
    }
    const map = this.getMap();
    if (map) {
      this.mapPostrenderListenerKey = listen(
        map,
        MapEventType_default.POSTRENDER,
        this.render,
        this
      );
      this.updatePixelPosition();
      const container = this.stopEvent ? map.getOverlayContainerStopEvent() : map.getOverlayContainer();
      if (this.insertFirst) {
        container.insertBefore(this.element, container.childNodes[0] || null);
      } else {
        container.appendChild(this.element);
      }
      this.performAutoPan();
    }
  }
  /**
   * @protected
   */
  render() {
    this.updatePixelPosition();
  }
  /**
   * @protected
   */
  handleOffsetChanged() {
    this.updatePixelPosition();
  }
  /**
   * @protected
   */
  handlePositionChanged() {
    this.updatePixelPosition();
    this.performAutoPan();
  }
  /**
   * @protected
   */
  handlePositioningChanged() {
    this.updatePixelPosition();
  }
  /**
   * Set the DOM element to be associated with this overlay.
   * @param {HTMLElement|undefined} element The Element containing the overlay.
   * @observable
   * @api
   */
  setElement(element) {
    this.set(Property2.ELEMENT, element);
  }
  /**
   * Set the map to be associated with this overlay.
   * @param {import("./Map.js").default|null} map The map that the
   * overlay is part of. Pass `null` to just remove the overlay from the current map.
   * @observable
   * @api
   */
  setMap(map) {
    this.set(Property2.MAP, map);
  }
  /**
   * Set the offset for this overlay.
   * @param {Array<number>} offset Offset.
   * @observable
   * @api
   */
  setOffset(offset) {
    this.set(Property2.OFFSET, offset);
  }
  /**
   * Set the position for this overlay. If the position is `undefined` the
   * overlay is hidden.
   * @param {import("./coordinate.js").Coordinate|undefined} position The spatial point that the overlay
   *     is anchored at.
   * @observable
   * @api
   */
  setPosition(position) {
    this.set(Property2.POSITION, position);
  }
  /**
   * Pan the map so that the overlay is entirely visible in the current viewport
   * (if necessary) using the configured autoPan parameters
   * @protected
   */
  performAutoPan() {
    if (this.autoPan) {
      this.panIntoView(this.autoPan);
    }
  }
  /**
   * Pan the map so that the overlay is entirely visible in the current viewport
   * (if necessary).
   * @param {PanIntoViewOptions} [panIntoViewOptions] Options for the pan action
   * @api
   */
  panIntoView(panIntoViewOptions) {
    const map = this.getMap();
    if (!map || !map.getTargetElement() || !this.get(Property2.POSITION)) {
      return;
    }
    const mapRect = this.getRect(map.getTargetElement(), map.getSize());
    const element = this.getElement();
    const overlayRect = this.getRect(element, [
      outerWidth(element),
      outerHeight(element)
    ]);
    panIntoViewOptions = panIntoViewOptions || {};
    const myMargin = panIntoViewOptions.margin === void 0 ? 20 : panIntoViewOptions.margin;
    if (!containsExtent(mapRect, overlayRect)) {
      const offsetLeft = overlayRect[0] - mapRect[0];
      const offsetRight = mapRect[2] - overlayRect[2];
      const offsetTop = overlayRect[1] - mapRect[1];
      const offsetBottom = mapRect[3] - overlayRect[3];
      const delta = [0, 0];
      if (offsetLeft < 0) {
        delta[0] = offsetLeft - myMargin;
      } else if (offsetRight < 0) {
        delta[0] = Math.abs(offsetRight) + myMargin;
      }
      if (offsetTop < 0) {
        delta[1] = offsetTop - myMargin;
      } else if (offsetBottom < 0) {
        delta[1] = Math.abs(offsetBottom) + myMargin;
      }
      if (delta[0] !== 0 || delta[1] !== 0) {
        const center = (
          /** @type {import("./coordinate.js").Coordinate} */
          map.getView().getCenterInternal()
        );
        const centerPx = map.getPixelFromCoordinateInternal(center);
        if (!centerPx) {
          return;
        }
        const newCenterPx = [centerPx[0] + delta[0], centerPx[1] + delta[1]];
        const panOptions = panIntoViewOptions.animation || {};
        map.getView().animateInternal({
          center: map.getCoordinateFromPixelInternal(newCenterPx),
          duration: panOptions.duration,
          easing: panOptions.easing
        });
      }
    }
  }
  /**
   * Get the extent of an element relative to the document
   * @param {HTMLElement} element The element.
   * @param {import("./size.js").Size} size The size of the element.
   * @return {import("./extent.js").Extent} The extent.
   * @protected
   */
  getRect(element, size) {
    const box = element.getBoundingClientRect();
    const offsetX = box.left + window.pageXOffset;
    const offsetY = box.top + window.pageYOffset;
    return [offsetX, offsetY, offsetX + size[0], offsetY + size[1]];
  }
  /**
   * Set the positioning for this overlay.
   * @param {Positioning} positioning how the overlay is
   *     positioned relative to its point on the map.
   * @observable
   * @api
   */
  setPositioning(positioning) {
    this.set(Property2.POSITIONING, positioning);
  }
  /**
   * Modify the visibility of the element.
   * @param {boolean} visible Element visibility.
   * @protected
   */
  setVisible(visible) {
    if (this.rendered.visible !== visible) {
      this.element.style.display = visible ? "" : "none";
      this.rendered.visible = visible;
    }
  }
  /**
   * Update pixel position.
   * @protected
   */
  updatePixelPosition() {
    const map = this.getMap();
    const position = this.getPosition();
    if (!map || !map.isRendered() || !position) {
      this.setVisible(false);
      return;
    }
    const pixel = map.getPixelFromCoordinate(position);
    const mapSize = map.getSize();
    this.updateRenderedPosition(pixel, mapSize);
  }
  /**
   * @param {import("./pixel.js").Pixel} pixel The pixel location.
   * @param {import("./size.js").Size|undefined} mapSize The map size.
   * @protected
   */
  updateRenderedPosition(pixel, mapSize) {
    const style = this.element.style;
    const offset = this.getOffset();
    const positioning = this.getPositioning();
    this.setVisible(true);
    const x = Math.round(pixel[0] + offset[0]) + "px";
    const y = Math.round(pixel[1] + offset[1]) + "px";
    let posX = "0%";
    let posY = "0%";
    if (positioning == "bottom-right" || positioning == "center-right" || positioning == "top-right") {
      posX = "-100%";
    } else if (positioning == "bottom-center" || positioning == "center-center" || positioning == "top-center") {
      posX = "-50%";
    }
    if (positioning == "bottom-left" || positioning == "bottom-center" || positioning == "bottom-right") {
      posY = "-100%";
    } else if (positioning == "center-left" || positioning == "center-center" || positioning == "center-right") {
      posY = "-50%";
    }
    const transform = `translate(${posX}, ${posY}) translate(${x}, ${y})`;
    if (this.rendered.transform_ != transform) {
      this.rendered.transform_ = transform;
      style.transform = transform;
    }
  }
  /**
   * returns the options this Overlay has been created with
   * @return {Options} overlay options
   */
  getOptions() {
    return this.options;
  }
};
var Overlay_default = Overlay;

// node_modules/ol/VectorRenderTile.js
var canvasPool = [];
var VectorRenderTile = class extends Tile_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {import("./tilecoord.js").TileCoord} urlTileCoord Wrapped tile coordinate for source urls.
   * @param {function(VectorRenderTile):Array<import("./VectorTile").default>} getSourceTiles Function
   * to get source tiles for this tile.
   */
  constructor(tileCoord, state, urlTileCoord, getSourceTiles) {
    super(tileCoord, state, { transition: 0 });
    this.context_ = {};
    this.executorGroups = {};
    this.declutterExecutorGroups = {};
    this.loadingSourceTiles = 0;
    this.hitDetectionImageData = {};
    this.replayState_ = {};
    this.sourceTiles = [];
    this.errorTileKeys = {};
    this.wantedResolution;
    this.getSourceTiles = getSourceTiles.bind(void 0, this);
    this.wrappedTileCoord = urlTileCoord;
  }
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {CanvasRenderingContext2D} The rendering context.
   */
  getContext(layer) {
    const key = getUid(layer);
    if (!(key in this.context_)) {
      this.context_[key] = createCanvasContext2D(1, 1, canvasPool);
    }
    return this.context_[key];
  }
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {boolean} Tile has a rendering context for the given layer.
   */
  hasContext(layer) {
    return getUid(layer) in this.context_;
  }
  /**
   * Get the Canvas for this tile.
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {HTMLCanvasElement} Canvas.
   */
  getImage(layer) {
    return this.hasContext(layer) ? this.getContext(layer).canvas : null;
  }
  /**
   * @param {import("./layer/Layer.js").default} layer Layer.
   * @return {ReplayState} The replay state.
   */
  getReplayState(layer) {
    const key = getUid(layer);
    if (!(key in this.replayState_)) {
      this.replayState_[key] = {
        dirty: false,
        renderedRenderOrder: null,
        renderedResolution: NaN,
        renderedRevision: -1,
        renderedTileResolution: NaN,
        renderedTileRevision: -1,
        renderedTileZ: -1
      };
    }
    return this.replayState_[key];
  }
  /**
   * Load the tile.
   */
  load() {
    this.getSourceTiles();
  }
  /**
   * Remove from the cache due to expiry
   */
  release() {
    for (const key in this.context_) {
      const context = this.context_[key];
      releaseCanvas(context);
      canvasPool.push(context.canvas);
      delete this.context_[key];
    }
    super.release();
  }
};
var VectorRenderTile_default = VectorRenderTile;

// node_modules/ol/VectorTile.js
var VectorTile = class extends Tile_default {
  /**
   * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("./TileState.js").default} state State.
   * @param {string} src Data source url.
   * @param {import("./format/Feature.js").default} format Feature format.
   * @param {import("./Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @param {import("./Tile.js").Options} [options] Tile options.
   */
  constructor(tileCoord, state, src, format, tileLoadFunction, options) {
    super(tileCoord, state, options);
    this.extent = null;
    this.format_ = format;
    this.features_ = null;
    this.loader_;
    this.projection = null;
    this.resolution;
    this.tileLoadFunction_ = tileLoadFunction;
    this.url_ = src;
    this.key = src;
  }
  /**
   * Get the feature format assigned for reading this tile's features.
   * @return {import("./format/Feature.js").default} Feature format.
   * @api
   */
  getFormat() {
    return this.format_;
  }
  /**
   * Get the features for this tile. Geometries will be in the view projection.
   * @return {Array<import("./Feature.js").FeatureLike>} Features.
   * @api
   */
  getFeatures() {
    return this.features_;
  }
  /**
   * Load not yet loaded URI.
   */
  load() {
    if (this.state == TileState_default.IDLE) {
      this.setState(TileState_default.LOADING);
      this.tileLoadFunction_(this, this.url_);
      if (this.loader_) {
        this.loader_(this.extent, this.resolution, this.projection);
      }
    }
  }
  /**
   * Handler for successful tile load.
   * @param {Array<import("./Feature.js").default>} features The loaded features.
   * @param {import("./proj/Projection.js").default} dataProjection Data projection.
   */
  onLoad(features, dataProjection) {
    this.setFeatures(features);
  }
  /**
   * Handler for tile load errors.
   */
  onError() {
    this.setState(TileState_default.ERROR);
  }
  /**
   * Function for use in an {@link module:ol/source/VectorTile~VectorTile}'s `tileLoadFunction`.
   * Sets the features for the tile.
   * @param {Array<import("./Feature.js").FeatureLike>} features Features.
   * @api
   */
  setFeatures(features) {
    this.features_ = features;
    this.setState(TileState_default.LOADED);
  }
  /**
   * Set the feature loader for reading this tile's features.
   * @param {import("./featureloader.js").FeatureLoader} loader Feature loader.
   * @api
   */
  setLoader(loader) {
    this.loader_ = loader;
  }
};
var VectorTile_default = VectorTile;
export {
  Collection_default as Collection,
  Disposable_default as Disposable,
  Feature_default as Feature,
  Geolocation_default as Geolocation,
  Graticule_default as Graticule,
  Image_default as Image,
  ImageCanvas_default as ImageCanvas,
  ImageTile_default as ImageTile,
  Image_default as ImageWrapper,
  Kinetic_default as Kinetic,
  Map_default as Map,
  MapBrowserEvent_default as MapBrowserEvent,
  MapBrowserEventHandler_default as MapBrowserEventHandler,
  MapEvent_default as MapEvent,
  Object_default as Object,
  Observable_default as Observable,
  Overlay_default as Overlay,
  Tile_default as Tile,
  TileCache_default as TileCache,
  TileQueue_default as TileQueue,
  TileRange_default as TileRange,
  VERSION,
  VectorRenderTile_default as VectorRenderTile,
  VectorTile_default as VectorTile,
  View_default as View,
  getUid
};
//# sourceMappingURL=ol.js.map
