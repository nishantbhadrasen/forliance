import {
  lineStringLength
} from "./chunk-FNHHZFJP.js";
import {
  Geometry_default,
  Point_default,
  Polygon_default,
  SimpleGeometry_default,
  arrayMaxSquaredDelta,
  assignClosestArrayPoint,
  assignClosestMultiArrayPoint,
  assignClosestPoint,
  deflateCoordinate,
  deflateCoordinates,
  deflateCoordinatesArray,
  deflateMultiCoordinatesArray,
  douglasPeucker,
  douglasPeuckerArray,
  getInteriorPointsOfMultiArray,
  inflateCoordinates,
  inflateCoordinatesArray,
  inflateMultiCoordinatesArray,
  linearRingss,
  linearRingssAreOriented,
  maxSquaredDelta,
  multiArrayMaxSquaredDelta,
  orientLinearRingsArray,
  quantizeMultiArray,
  rotate
} from "./chunk-DCHCFMLM.js";
import {
  EventType_default,
  binarySearch,
  extend,
  forEach,
  intersectsLineString,
  intersectsLineStringArray,
  intersectsLinearRingMultiArray,
  linearRingssContainsXY,
  listen,
  unlistenByKey
} from "./chunk-2JNVDRY5.js";
import {
  closestSquaredDistanceXY,
  containsXY,
  createEmpty,
  createOrUpdate,
  createOrUpdateEmpty,
  createOrUpdateFromFlatCoordinates,
  extend as extend2,
  forEachCorner,
  getCenter,
  intersects,
  lerp,
  squaredDistance
} from "./chunk-RZIVCB3D.js";

// node_modules/ol/geom/Circle.js
var Circle = class _Circle extends SimpleGeometry_default {
  /**
   * @param {!import("../coordinate.js").Coordinate} center Center.
   *     For internal use, flat coordinates in combination with `layout` and no
   *     `radius` are also accepted.
   * @param {number} [radius] Radius in units of the projection.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(center, radius, layout) {
    super();
    if (layout !== void 0 && radius === void 0) {
      this.setFlatCoordinates(layout, center);
    } else {
      radius = radius ? radius : 0;
      this.setCenterAndRadius(center, radius, layout);
    }
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!Circle} Clone.
   * @api
   */
  clone() {
    const circle = new _Circle(
      this.flatCoordinates.slice(),
      void 0,
      this.layout
    );
    circle.applyProperties(this);
    return circle;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    const flatCoordinates = this.flatCoordinates;
    const dx = x - flatCoordinates[0];
    const dy = y - flatCoordinates[1];
    const squaredDistance2 = dx * dx + dy * dy;
    if (squaredDistance2 < minSquaredDistance) {
      if (squaredDistance2 === 0) {
        for (let i = 0; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      } else {
        const delta = this.getRadius() / Math.sqrt(squaredDistance2);
        closestPoint[0] = flatCoordinates[0] + delta * dx;
        closestPoint[1] = flatCoordinates[1] + delta * dy;
        for (let i = 2; i < this.stride; ++i) {
          closestPoint[i] = flatCoordinates[i];
        }
      }
      closestPoint.length = this.stride;
      return squaredDistance2;
    }
    return minSquaredDistance;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    const flatCoordinates = this.flatCoordinates;
    const dx = x - flatCoordinates[0];
    const dy = y - flatCoordinates[1];
    return dx * dx + dy * dy <= this.getRadiusSquared_();
  }
  /**
   * Return the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @return {import("../coordinate.js").Coordinate} Center.
   * @api
   */
  getCenter() {
    return this.flatCoordinates.slice(0, this.stride);
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    const flatCoordinates = this.flatCoordinates;
    const radius = flatCoordinates[this.stride] - flatCoordinates[0];
    return createOrUpdate(
      flatCoordinates[0] - radius,
      flatCoordinates[1] - radius,
      flatCoordinates[0] + radius,
      flatCoordinates[1] + radius,
      extent
    );
  }
  /**
   * Return the radius of the circle.
   * @return {number} Radius.
   * @api
   */
  getRadius() {
    return Math.sqrt(this.getRadiusSquared_());
  }
  /**
   * @private
   * @return {number} Radius squared.
   */
  getRadiusSquared_() {
    const dx = this.flatCoordinates[this.stride] - this.flatCoordinates[0];
    const dy = this.flatCoordinates[this.stride + 1] - this.flatCoordinates[1];
    return dx * dx + dy * dy;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "Circle";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    const circleExtent = this.getExtent();
    if (intersects(extent, circleExtent)) {
      const center = this.getCenter();
      if (extent[0] <= center[0] && extent[2] >= center[0]) {
        return true;
      }
      if (extent[1] <= center[1] && extent[3] >= center[1]) {
        return true;
      }
      return forEachCorner(extent, this.intersectsCoordinate.bind(this));
    }
    return false;
  }
  /**
   * Set the center of the circle as {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} center Center.
   * @api
   */
  setCenter(center) {
    const stride = this.stride;
    const radius = this.flatCoordinates[stride] - this.flatCoordinates[0];
    const flatCoordinates = center.slice();
    flatCoordinates[stride] = flatCoordinates[0] + radius;
    for (let i = 1; i < stride; ++i) {
      flatCoordinates[stride + i] = center[i];
    }
    this.setFlatCoordinates(this.layout, flatCoordinates);
    this.changed();
  }
  /**
   * Set the center (as {@link module:ol/coordinate~Coordinate coordinate}) and the radius (as
   * number) of the circle.
   * @param {!import("../coordinate.js").Coordinate} center Center.
   * @param {number} radius Radius.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCenterAndRadius(center, radius, layout) {
    this.setLayout(layout, center, 0);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const flatCoordinates = this.flatCoordinates;
    let offset = deflateCoordinate(flatCoordinates, 0, center, this.stride);
    flatCoordinates[offset++] = flatCoordinates[0] + radius;
    for (let i = 1, ii = this.stride; i < ii; ++i) {
      flatCoordinates[offset++] = flatCoordinates[i];
    }
    flatCoordinates.length = offset;
    this.changed();
  }
  getCoordinates() {
    return null;
  }
  setCoordinates(coordinates, layout) {
  }
  /**
   * Set the radius of the circle. The radius is in the units of the projection.
   * @param {number} radius Radius.
   * @api
   */
  setRadius(radius) {
    this.flatCoordinates[this.stride] = this.flatCoordinates[0] + radius;
    this.changed();
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in counter-clockwise radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(angle, anchor) {
    const center = this.getCenter();
    const stride = this.getStride();
    this.setCenter(
      rotate(center, 0, center.length, stride, angle, anchor, center)
    );
    this.changed();
  }
};
Circle.prototype.transform;
var Circle_default = Circle;

// node_modules/ol/geom/GeometryCollection.js
var GeometryCollection = class _GeometryCollection extends Geometry_default {
  /**
   * @param {Array<Geometry>} [geometries] Geometries.
   */
  constructor(geometries) {
    super();
    this.geometries_ = geometries ? geometries : null;
    this.changeEventsKeys_ = [];
    this.listenGeometriesChange_();
  }
  /**
   * @private
   */
  unlistenGeometriesChange_() {
    this.changeEventsKeys_.forEach(unlistenByKey);
    this.changeEventsKeys_.length = 0;
  }
  /**
   * @private
   */
  listenGeometriesChange_() {
    if (!this.geometries_) {
      return;
    }
    for (let i = 0, ii = this.geometries_.length; i < ii; ++i) {
      this.changeEventsKeys_.push(
        listen(this.geometries_[i], EventType_default.CHANGE, this.changed, this)
      );
    }
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!GeometryCollection} Clone.
   * @api
   */
  clone() {
    const geometryCollection = new _GeometryCollection(null);
    geometryCollection.setGeometries(this.geometries_);
    geometryCollection.applyProperties(this);
    return geometryCollection;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      minSquaredDistance = geometries[i].closestPointXY(
        x,
        y,
        closestPoint,
        minSquaredDistance
      );
    }
    return minSquaredDistance;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].containsXY(x, y)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */
  computeExtent(extent) {
    createOrUpdateEmpty(extent);
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      extend2(extent, geometries[i].getExtent());
    }
    return extent;
  }
  /**
   * Return the geometries that make up this geometry collection.
   * @return {Array<Geometry>} Geometries.
   * @api
   */
  getGeometries() {
    return cloneGeometries(this.geometries_);
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArray() {
    return this.geometries_;
  }
  /**
   * @return {Array<Geometry>} Geometries.
   */
  getGeometriesArrayRecursive() {
    let geometriesArray = [];
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].getType() === this.getType()) {
        geometriesArray = geometriesArray.concat(
          /** @type {GeometryCollection} */
          geometries[i].getGeometriesArrayRecursive()
        );
      } else {
        geometriesArray.push(geometries[i]);
      }
    }
    return geometriesArray;
  }
  /**
   * Create a simplified version of this geometry using the Douglas Peucker algorithm.
   * @param {number} squaredTolerance Squared tolerance.
   * @return {GeometryCollection} Simplified GeometryCollection.
   */
  getSimplifiedGeometry(squaredTolerance) {
    if (this.simplifiedGeometryRevision !== this.getRevision()) {
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    }
    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance < this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }
    const simplifiedGeometries = [];
    const geometries = this.geometries_;
    let simplified = false;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      const geometry = geometries[i];
      const simplifiedGeometry = geometry.getSimplifiedGeometry(squaredTolerance);
      simplifiedGeometries.push(simplifiedGeometry);
      if (simplifiedGeometry !== geometry) {
        simplified = true;
      }
    }
    if (simplified) {
      const simplifiedGeometryCollection = new _GeometryCollection(null);
      simplifiedGeometryCollection.setGeometriesArray(simplifiedGeometries);
      return simplifiedGeometryCollection;
    }
    this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
    return this;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "GeometryCollection";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      if (geometries[i].intersectsExtent(extent)) {
        return true;
      }
    }
    return false;
  }
  /**
   * @return {boolean} Is empty.
   */
  isEmpty() {
    return this.geometries_.length === 0;
  }
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */
  rotate(angle, anchor) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].rotate(angle, anchor);
    }
    this.changed();
  }
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number} [sy] The scaling factor in the y-direction (defaults to sx).
   * @param {import("../coordinate.js").Coordinate} [anchor] The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */
  scale(sx, sy, anchor) {
    if (!anchor) {
      anchor = getCenter(this.getExtent());
    }
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].scale(sx, sy, anchor);
    }
    this.changed();
  }
  /**
   * Set the geometries that make up this geometry collection.
   * @param {Array<Geometry>} geometries Geometries.
   * @api
   */
  setGeometries(geometries) {
    this.setGeometriesArray(cloneGeometries(geometries));
  }
  /**
   * @param {Array<Geometry>} geometries Geometries.
   */
  setGeometriesArray(geometries) {
    this.unlistenGeometriesChange_();
    this.geometries_ = geometries;
    this.listenGeometriesChange_();
    this.changed();
  }
  /**
   * Apply a transform function to the coordinates of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @param {import("../proj.js").TransformFunction} transformFn Transform function.
   * Called with a flat array of geometry coordinates.
   * @api
   */
  applyTransform(transformFn) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].applyTransform(transformFn);
    }
    this.changed();
  }
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */
  translate(deltaX, deltaY) {
    const geometries = this.geometries_;
    for (let i = 0, ii = geometries.length; i < ii; ++i) {
      geometries[i].translate(deltaX, deltaY);
    }
    this.changed();
  }
  /**
   * Clean up.
   */
  disposeInternal() {
    this.unlistenGeometriesChange_();
    super.disposeInternal();
  }
};
function cloneGeometries(geometries) {
  const clonedGeometries = [];
  for (let i = 0, ii = geometries.length; i < ii; ++i) {
    clonedGeometries.push(geometries[i].clone());
  }
  return clonedGeometries;
}
var GeometryCollection_default = GeometryCollection;

// node_modules/ol/geom/flat/interpolate.js
function interpolatePoint(flatCoordinates, offset, end, stride, fraction, dest, dimension) {
  let o, t;
  const n = (end - offset) / stride;
  if (n === 1) {
    o = offset;
  } else if (n === 2) {
    o = offset;
    t = fraction;
  } else if (n !== 0) {
    let x1 = flatCoordinates[offset];
    let y1 = flatCoordinates[offset + 1];
    let length = 0;
    const cumulativeLengths = [0];
    for (let i = offset + stride; i < end; i += stride) {
      const x2 = flatCoordinates[i];
      const y2 = flatCoordinates[i + 1];
      length += Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
      cumulativeLengths.push(length);
      x1 = x2;
      y1 = y2;
    }
    const target = fraction * length;
    const index = binarySearch(cumulativeLengths, target);
    if (index < 0) {
      t = (target - cumulativeLengths[-index - 2]) / (cumulativeLengths[-index - 1] - cumulativeLengths[-index - 2]);
      o = offset + (-index - 2) * stride;
    } else {
      o = offset + index * stride;
    }
  }
  dimension = dimension > 1 ? dimension : 2;
  dest = dest ? dest : new Array(dimension);
  for (let i = 0; i < dimension; ++i) {
    dest[i] = o === void 0 ? NaN : t === void 0 ? flatCoordinates[o + i] : lerp(flatCoordinates[o + i], flatCoordinates[o + stride + i], t);
  }
  return dest;
}
function lineStringCoordinateAtM(flatCoordinates, offset, end, stride, m, extrapolate) {
  if (end == offset) {
    return null;
  }
  let coordinate;
  if (m < flatCoordinates[offset + stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(offset, offset + stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (flatCoordinates[end - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(end - stride, end);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (m == flatCoordinates[offset + stride - 1]) {
    return flatCoordinates.slice(offset, offset + stride);
  }
  let lo = offset / stride;
  let hi = end / stride;
  while (lo < hi) {
    const mid = lo + hi >> 1;
    if (m < flatCoordinates[(mid + 1) * stride - 1]) {
      hi = mid;
    } else {
      lo = mid + 1;
    }
  }
  const m0 = flatCoordinates[lo * stride - 1];
  if (m == m0) {
    return flatCoordinates.slice((lo - 1) * stride, (lo - 1) * stride + stride);
  }
  const m1 = flatCoordinates[(lo + 1) * stride - 1];
  const t = (m - m0) / (m1 - m0);
  coordinate = [];
  for (let i = 0; i < stride - 1; ++i) {
    coordinate.push(
      lerp(
        flatCoordinates[(lo - 1) * stride + i],
        flatCoordinates[lo * stride + i],
        t
      )
    );
  }
  coordinate.push(m);
  return coordinate;
}
function lineStringsCoordinateAtM(flatCoordinates, offset, ends, stride, m, extrapolate, interpolate) {
  if (interpolate) {
    return lineStringCoordinateAtM(
      flatCoordinates,
      offset,
      ends[ends.length - 1],
      stride,
      m,
      extrapolate
    );
  }
  let coordinate;
  if (m < flatCoordinates[stride - 1]) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(0, stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  if (flatCoordinates[flatCoordinates.length - 1] < m) {
    if (extrapolate) {
      coordinate = flatCoordinates.slice(flatCoordinates.length - stride);
      coordinate[stride - 1] = m;
      return coordinate;
    }
    return null;
  }
  for (let i = 0, ii = ends.length; i < ii; ++i) {
    const end = ends[i];
    if (offset == end) {
      continue;
    }
    if (m < flatCoordinates[offset + stride - 1]) {
      return null;
    }
    if (m <= flatCoordinates[end - 1]) {
      return lineStringCoordinateAtM(
        flatCoordinates,
        offset,
        end,
        stride,
        m,
        false
      );
    }
    offset = end;
  }
  return null;
}

// node_modules/ol/geom/LineString.js
var LineString = class _LineString extends SimpleGeometry_default {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates, layout) {
    super();
    this.flatMidpoint_ = null;
    this.flatMidpointRevision_ = -1;
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    if (layout !== void 0 && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
    } else {
      this.setCoordinates(
        /** @type {Array<import("../coordinate.js").Coordinate>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed coordinate to the coordinates of the linestring.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @api
   */
  appendCoordinate(coordinate) {
    extend(this.flatCoordinates, coordinate);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!LineString} Clone.
   * @api
   */
  clone() {
    const lineString = new _LineString(
      this.flatCoordinates.slice(),
      this.layout
    );
    lineString.applyProperties(this);
    return lineString;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(
        maxSquaredDelta(
          this.flatCoordinates,
          0,
          this.flatCoordinates.length,
          this.stride,
          0
        )
      );
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestPoint(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      this.maxDelta_,
      false,
      x,
      y,
      closestPoint,
      minSquaredDistance
    );
  }
  /**
   * Iterate over each segment, calling the provided callback.
   * If the callback returns a truthy value the function returns that
   * value immediately. Otherwise the function returns `false`.
   *
   * @param {function(this: S, import("../coordinate.js").Coordinate, import("../coordinate.js").Coordinate): T} callback Function
   *     called for each segment. The function will receive two arguments, the start and end coordinates of the segment.
   * @return {T|boolean} Value.
   * @template T,S
   * @api
   */
  forEachSegment(callback) {
    return forEach(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      callback
    );
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(m, extrapolate) {
    if (this.layout != "XYM" && this.layout != "XYZM") {
      return null;
    }
    extrapolate = extrapolate !== void 0 ? extrapolate : false;
    return lineStringCoordinateAtM(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      m,
      extrapolate
    );
  }
  /**
   * Return the coordinates of the linestring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */
  getCoordinates() {
    return inflateCoordinates(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the coordinate at the provided fraction along the linestring.
   * The `fraction` is a number between 0 and 1, where 0 is the start of the
   * linestring and 1 is the end.
   * @param {number} fraction Fraction.
   * @param {import("../coordinate.js").Coordinate} [dest] Optional coordinate whose values will
   *     be modified. If not provided, a new coordinate will be returned.
   * @return {import("../coordinate.js").Coordinate} Coordinate of the interpolated point.
   * @api
   */
  getCoordinateAt(fraction, dest) {
    return interpolatePoint(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      fraction,
      dest,
      this.stride
    );
  }
  /**
   * Return the length of the linestring on projected plane.
   * @return {number} Length (on projected plane).
   * @api
   */
  getLength() {
    return lineStringLength(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * @return {Array<number>} Flat midpoint.
   */
  getFlatMidpoint() {
    if (this.flatMidpointRevision_ != this.getRevision()) {
      this.flatMidpoint_ = this.getCoordinateAt(
        0.5,
        this.flatMidpoint_ ?? void 0
      );
      this.flatMidpointRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.flatMidpoint_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {LineString} Simplified LineString.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = douglasPeucker(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      0
    );
    return new _LineString(simplifiedFlatCoordinates, "XY");
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "LineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return intersectsLineString(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride,
      extent
    );
  }
  /**
   * Set the coordinates of the linestring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(
      this.flatCoordinates,
      0,
      coordinates,
      this.stride
    );
    this.changed();
  }
};
var LineString_default = LineString;

// node_modules/ol/geom/MultiLineString.js
var MultiLineString = class _MultiLineString extends SimpleGeometry_default {
  /**
   * @param {Array<Array<import("../coordinate.js").Coordinate>|LineString>|Array<number>} coordinates
   *     Coordinates or LineString geometries. (For internal use, flat coordinates in
   *     combination with `layout` and `ends` are also accepted.)
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<number>} [ends] Flat coordinate ends for internal use.
   */
  constructor(coordinates, layout, ends) {
    super();
    this.ends_ = [];
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    if (Array.isArray(coordinates[0])) {
      this.setCoordinates(
        /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
        coordinates,
        layout
      );
    } else if (layout !== void 0 && ends) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
      this.ends_ = ends;
    } else {
      const lineStrings = (
        /** @type {Array<LineString>} */
        coordinates
      );
      const flatCoordinates = [];
      const ends2 = [];
      for (let i = 0, ii = lineStrings.length; i < ii; ++i) {
        const lineString = lineStrings[i];
        extend(flatCoordinates, lineString.getFlatCoordinates());
        ends2.push(flatCoordinates.length);
      }
      const layout2 = lineStrings.length === 0 ? this.getLayout() : lineStrings[0].getLayout();
      this.setFlatCoordinates(layout2, flatCoordinates);
      this.ends_ = ends2;
    }
  }
  /**
   * Append the passed linestring to the multilinestring.
   * @param {LineString} lineString LineString.
   * @api
   */
  appendLineString(lineString) {
    extend(this.flatCoordinates, lineString.getFlatCoordinates().slice());
    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiLineString} Clone.
   * @api
   */
  clone() {
    const multiLineString = new _MultiLineString(
      this.flatCoordinates.slice(),
      this.layout,
      this.ends_.slice()
    );
    multiLineString.applyProperties(this);
    return multiLineString;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(
        arrayMaxSquaredDelta(
          this.flatCoordinates,
          0,
          this.ends_,
          this.stride,
          0
        )
      );
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestArrayPoint(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      this.maxDelta_,
      false,
      x,
      y,
      closestPoint,
      minSquaredDistance
    );
  }
  /**
   * Returns the coordinate at `m` using linear interpolation, or `null` if no
   * such coordinate exists.
   *
   * `extrapolate` controls extrapolation beyond the range of Ms in the
   * MultiLineString. If `extrapolate` is `true` then Ms less than the first
   * M will return the first coordinate and Ms greater than the last M will
   * return the last coordinate.
   *
   * `interpolate` controls interpolation between consecutive LineStrings
   * within the MultiLineString. If `interpolate` is `true` the coordinates
   * will be linearly interpolated between the last coordinate of one LineString
   * and the first coordinate of the next LineString.  If `interpolate` is
   * `false` then the function will return `null` for Ms falling between
   * LineStrings.
   *
   * @param {number} m M.
   * @param {boolean} [extrapolate] Extrapolate. Default is `false`.
   * @param {boolean} [interpolate] Interpolate. Default is `false`.
   * @return {import("../coordinate.js").Coordinate|null} Coordinate.
   * @api
   */
  getCoordinateAtM(m, extrapolate, interpolate) {
    if (this.layout != "XYM" && this.layout != "XYZM" || this.flatCoordinates.length === 0) {
      return null;
    }
    extrapolate = extrapolate !== void 0 ? extrapolate : false;
    interpolate = interpolate !== void 0 ? interpolate : false;
    return lineStringsCoordinateAtM(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      m,
      extrapolate,
      interpolate
    );
  }
  /**
   * Return the coordinates of the multilinestring.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @api
   */
  getCoordinates() {
    return inflateCoordinatesArray(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride
    );
  }
  /**
   * @return {Array<number>} Ends.
   */
  getEnds() {
    return this.ends_;
  }
  /**
   * Return the linestring at the specified index.
   * @param {number} index Index.
   * @return {LineString} LineString.
   * @api
   */
  getLineString(index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }
    return new LineString_default(
      this.flatCoordinates.slice(
        index === 0 ? 0 : this.ends_[index - 1],
        this.ends_[index]
      ),
      this.layout
    );
  }
  /**
   * Return the linestrings of this multilinestring.
   * @return {Array<LineString>} LineStrings.
   * @api
   */
  getLineStrings() {
    const flatCoordinates = this.flatCoordinates;
    const ends = this.ends_;
    const layout = this.layout;
    const lineStrings = [];
    let offset = 0;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const lineString = new LineString_default(
        flatCoordinates.slice(offset, end),
        layout
      );
      lineStrings.push(lineString);
      offset = end;
    }
    return lineStrings;
  }
  /**
   * @return {Array<number>} Flat midpoints.
   */
  getFlatMidpoints() {
    const midpoints = [];
    const flatCoordinates = this.flatCoordinates;
    let offset = 0;
    const ends = this.ends_;
    const stride = this.stride;
    for (let i = 0, ii = ends.length; i < ii; ++i) {
      const end = ends[i];
      const midpoint = interpolatePoint(
        flatCoordinates,
        offset,
        end,
        stride,
        0.5
      );
      extend(midpoints, midpoint);
      offset = end;
    }
    return midpoints;
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiLineString} Simplified MultiLineString.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    const simplifiedEnds = [];
    simplifiedFlatCoordinates.length = douglasPeuckerArray(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      squaredTolerance,
      simplifiedFlatCoordinates,
      0,
      simplifiedEnds
    );
    return new _MultiLineString(simplifiedFlatCoordinates, "XY", simplifiedEnds);
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "MultiLineString";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return intersectsLineStringArray(
      this.flatCoordinates,
      0,
      this.ends_,
      this.stride,
      extent
    );
  }
  /**
   * Set the coordinates of the multilinestring.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 2);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const ends = deflateCoordinatesArray(
      this.flatCoordinates,
      0,
      coordinates,
      this.stride,
      this.ends_
    );
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  }
};
var MultiLineString_default = MultiLineString;

// node_modules/ol/geom/MultiPoint.js
var MultiPoint = class _MultiPoint extends SimpleGeometry_default {
  /**
   * @param {Array<import("../coordinate.js").Coordinate>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   */
  constructor(coordinates, layout) {
    super();
    if (layout && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
    } else {
      this.setCoordinates(
        /** @type {Array<import("../coordinate.js").Coordinate>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed point to this multipoint.
   * @param {Point} point Point.
   * @api
   */
  appendPoint(point) {
    extend(this.flatCoordinates, point.getFlatCoordinates());
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPoint} Clone.
   * @api
   */
  clone() {
    const multiPoint = new _MultiPoint(
      this.flatCoordinates.slice(),
      this.layout
    );
    multiPoint.applyProperties(this);
    return multiPoint;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    const flatCoordinates = this.flatCoordinates;
    const stride = this.stride;
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const squaredDistance2 = squaredDistance(
        x,
        y,
        flatCoordinates[i],
        flatCoordinates[i + 1]
      );
      if (squaredDistance2 < minSquaredDistance) {
        minSquaredDistance = squaredDistance2;
        for (let j = 0; j < stride; ++j) {
          closestPoint[j] = flatCoordinates[i + j];
        }
        closestPoint.length = stride;
      }
    }
    return minSquaredDistance;
  }
  /**
   * Return the coordinates of the multipoint.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @api
   */
  getCoordinates() {
    return inflateCoordinates(
      this.flatCoordinates,
      0,
      this.flatCoordinates.length,
      this.stride
    );
  }
  /**
   * Return the point at the specified index.
   * @param {number} index Index.
   * @return {Point} Point.
   * @api
   */
  getPoint(index) {
    const n = this.flatCoordinates.length / this.stride;
    if (index < 0 || n <= index) {
      return null;
    }
    return new Point_default(
      this.flatCoordinates.slice(
        index * this.stride,
        (index + 1) * this.stride
      ),
      this.layout
    );
  }
  /**
   * Return the points of this multipoint.
   * @return {Array<Point>} Points.
   * @api
   */
  getPoints() {
    const flatCoordinates = this.flatCoordinates;
    const layout = this.layout;
    const stride = this.stride;
    const points = [];
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const point = new Point_default(flatCoordinates.slice(i, i + stride), layout);
      points.push(point);
    }
    return points;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "MultiPoint";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    const flatCoordinates = this.flatCoordinates;
    const stride = this.stride;
    for (let i = 0, ii = flatCoordinates.length; i < ii; i += stride) {
      const x = flatCoordinates[i];
      const y = flatCoordinates[i + 1];
      if (containsXY(extent, x, y)) {
        return true;
      }
    }
    return false;
  }
  /**
   * Set the coordinates of the multipoint.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 1);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    this.flatCoordinates.length = deflateCoordinates(
      this.flatCoordinates,
      0,
      coordinates,
      this.stride
    );
    this.changed();
  }
};
var MultiPoint_default = MultiPoint;

// node_modules/ol/geom/flat/center.js
function linearRingss2(flatCoordinates, offset, endss, stride) {
  const flatCenters = [];
  let extent = createEmpty();
  for (let i = 0, ii = endss.length; i < ii; ++i) {
    const ends = endss[i];
    extent = createOrUpdateFromFlatCoordinates(
      flatCoordinates,
      offset,
      ends[0],
      stride
    );
    flatCenters.push((extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2);
    offset = ends[ends.length - 1];
  }
  return flatCenters;
}

// node_modules/ol/geom/MultiPolygon.js
var MultiPolygon = class _MultiPolygon extends SimpleGeometry_default {
  /**
   * @param {Array<Array<Array<import("../coordinate.js").Coordinate>>|Polygon>|Array<number>} coordinates Coordinates.
   *     For internal use, flat coordinates in combination with `layout` and `endss` are also accepted.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @param {Array<Array<number>>} [endss] Array of ends for internal use with flat coordinates.
   */
  constructor(coordinates, layout, endss) {
    super();
    this.endss_ = [];
    this.flatInteriorPointsRevision_ = -1;
    this.flatInteriorPoints_ = null;
    this.maxDelta_ = -1;
    this.maxDeltaRevision_ = -1;
    this.orientedRevision_ = -1;
    this.orientedFlatCoordinates_ = null;
    if (!endss && !Array.isArray(coordinates[0])) {
      const polygons = (
        /** @type {Array<Polygon>} */
        coordinates
      );
      const flatCoordinates = [];
      const thisEndss = [];
      for (let i = 0, ii = polygons.length; i < ii; ++i) {
        const polygon = polygons[i];
        const offset = flatCoordinates.length;
        const ends = polygon.getEnds();
        for (let j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] += offset;
        }
        extend(flatCoordinates, polygon.getFlatCoordinates());
        thisEndss.push(ends);
      }
      layout = polygons.length === 0 ? this.getLayout() : polygons[0].getLayout();
      coordinates = flatCoordinates;
      endss = thisEndss;
    }
    if (layout !== void 0 && endss) {
      this.setFlatCoordinates(
        layout,
        /** @type {Array<number>} */
        coordinates
      );
      this.endss_ = endss;
    } else {
      this.setCoordinates(
        /** @type {Array<Array<Array<import("../coordinate.js").Coordinate>>>} */
        coordinates,
        layout
      );
    }
  }
  /**
   * Append the passed polygon to this multipolygon.
   * @param {Polygon} polygon Polygon.
   * @api
   */
  appendPolygon(polygon) {
    let ends;
    if (!this.flatCoordinates) {
      this.flatCoordinates = polygon.getFlatCoordinates().slice();
      ends = polygon.getEnds().slice();
      this.endss_.push();
    } else {
      const offset = this.flatCoordinates.length;
      extend(this.flatCoordinates, polygon.getFlatCoordinates());
      ends = polygon.getEnds().slice();
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] += offset;
      }
    }
    this.endss_.push(ends);
    this.changed();
  }
  /**
   * Make a complete copy of the geometry.
   * @return {!MultiPolygon} Clone.
   * @api
   */
  clone() {
    const len = this.endss_.length;
    const newEndss = new Array(len);
    for (let i = 0; i < len; ++i) {
      newEndss[i] = this.endss_[i].slice();
    }
    const multiPolygon = new _MultiPolygon(
      this.flatCoordinates.slice(),
      this.layout,
      newEndss
    );
    multiPolygon.applyProperties(this);
    return multiPolygon;
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */
  closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < closestSquaredDistanceXY(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }
    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt(
        multiArrayMaxSquaredDelta(
          this.flatCoordinates,
          0,
          this.endss_,
          this.stride,
          0
        )
      );
      this.maxDeltaRevision_ = this.getRevision();
    }
    return assignClosestMultiArrayPoint(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      this.maxDelta_,
      true,
      x,
      y,
      closestPoint,
      minSquaredDistance
    );
  }
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */
  containsXY(x, y) {
    return linearRingssContainsXY(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      x,
      y
    );
  }
  /**
   * Return the area of the multipolygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */
  getArea() {
    return linearRingss(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride
    );
  }
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for multi-polygons.
   *
   * @param {boolean} [right] Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<Array<import("../coordinate.js").Coordinate>>>} Coordinates.
   * @api
   */
  getCoordinates(right) {
    let flatCoordinates;
    if (right !== void 0) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      orientLinearRingsArray(
        flatCoordinates,
        0,
        this.endss_,
        this.stride,
        right
      );
    } else {
      flatCoordinates = this.flatCoordinates;
    }
    return inflateMultiCoordinatesArray(
      flatCoordinates,
      0,
      this.endss_,
      this.stride
    );
  }
  /**
   * @return {Array<Array<number>>} Endss.
   */
  getEndss() {
    return this.endss_;
  }
  /**
   * @return {Array<number>} Flat interior points.
   */
  getFlatInteriorPoints() {
    if (this.flatInteriorPointsRevision_ != this.getRevision()) {
      const flatCenters = linearRingss2(
        this.flatCoordinates,
        0,
        this.endss_,
        this.stride
      );
      this.flatInteriorPoints_ = getInteriorPointsOfMultiArray(
        this.getOrientedFlatCoordinates(),
        0,
        this.endss_,
        this.stride,
        flatCenters
      );
      this.flatInteriorPointsRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.flatInteriorPoints_
    );
  }
  /**
   * Return the interior points as {@link module:ol/geom/MultiPoint~MultiPoint multipoint}.
   * @return {MultiPoint} Interior points as XYM coordinates, where M is
   * the length of the horizontal intersection that the point belongs to.
   * @api
   */
  getInteriorPoints() {
    return new MultiPoint_default(this.getFlatInteriorPoints().slice(), "XYM");
  }
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */
  getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      const flatCoordinates = this.flatCoordinates;
      if (linearRingssAreOriented(flatCoordinates, 0, this.endss_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = orientLinearRingsArray(
          this.orientedFlatCoordinates_,
          0,
          this.endss_,
          this.stride
        );
      }
      this.orientedRevision_ = this.getRevision();
    }
    return (
      /** @type {Array<number>} */
      this.orientedFlatCoordinates_
    );
  }
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {MultiPolygon} Simplified MultiPolygon.
   * @protected
   */
  getSimplifiedGeometryInternal(squaredTolerance) {
    const simplifiedFlatCoordinates = [];
    const simplifiedEndss = [];
    simplifiedFlatCoordinates.length = quantizeMultiArray(
      this.flatCoordinates,
      0,
      this.endss_,
      this.stride,
      Math.sqrt(squaredTolerance),
      simplifiedFlatCoordinates,
      0,
      simplifiedEndss
    );
    return new _MultiPolygon(simplifiedFlatCoordinates, "XY", simplifiedEndss);
  }
  /**
   * Return the polygon at the specified index.
   * @param {number} index Index.
   * @return {Polygon} Polygon.
   * @api
   */
  getPolygon(index) {
    if (index < 0 || this.endss_.length <= index) {
      return null;
    }
    let offset;
    if (index === 0) {
      offset = 0;
    } else {
      const prevEnds = this.endss_[index - 1];
      offset = prevEnds[prevEnds.length - 1];
    }
    const ends = this.endss_[index].slice();
    const end = ends[ends.length - 1];
    if (offset !== 0) {
      for (let i = 0, ii = ends.length; i < ii; ++i) {
        ends[i] -= offset;
      }
    }
    return new Polygon_default(
      this.flatCoordinates.slice(offset, end),
      this.layout,
      ends
    );
  }
  /**
   * Return the polygons of this multipolygon.
   * @return {Array<Polygon>} Polygons.
   * @api
   */
  getPolygons() {
    const layout = this.layout;
    const flatCoordinates = this.flatCoordinates;
    const endss = this.endss_;
    const polygons = [];
    let offset = 0;
    for (let i = 0, ii = endss.length; i < ii; ++i) {
      const ends = endss[i].slice();
      const end = ends[ends.length - 1];
      if (offset !== 0) {
        for (let j = 0, jj = ends.length; j < jj; ++j) {
          ends[j] -= offset;
        }
      }
      const polygon = new Polygon_default(
        flatCoordinates.slice(offset, end),
        layout,
        ends
      );
      polygons.push(polygon);
      offset = end;
    }
    return polygons;
  }
  /**
   * Get the type of this geometry.
   * @return {import("./Geometry.js").Type} Geometry type.
   * @api
   */
  getType() {
    return "MultiPolygon";
  }
  /**
   * Test if the geometry and the passed extent intersect.
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   * @api
   */
  intersectsExtent(extent) {
    return intersectsLinearRingMultiArray(
      this.getOrientedFlatCoordinates(),
      0,
      this.endss_,
      this.stride,
      extent
    );
  }
  /**
   * Set the coordinates of the multipolygon.
   * @param {!Array<Array<Array<import("../coordinate.js").Coordinate>>>} coordinates Coordinates.
   * @param {import("./Geometry.js").GeometryLayout} [layout] Layout.
   * @api
   */
  setCoordinates(coordinates, layout) {
    this.setLayout(layout, coordinates, 3);
    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }
    const endss = deflateMultiCoordinatesArray(
      this.flatCoordinates,
      0,
      coordinates,
      this.stride,
      this.endss_
    );
    if (endss.length === 0) {
      this.flatCoordinates.length = 0;
    } else {
      const lastEnds = endss[endss.length - 1];
      this.flatCoordinates.length = lastEnds.length === 0 ? 0 : lastEnds[lastEnds.length - 1];
    }
    this.changed();
  }
};
var MultiPolygon_default = MultiPolygon;

export {
  Circle_default,
  GeometryCollection_default,
  interpolatePoint,
  LineString_default,
  MultiLineString_default,
  MultiPoint_default,
  linearRingss2 as linearRingss,
  MultiPolygon_default
};
//# sourceMappingURL=chunk-WJEHRHX5.js.map
