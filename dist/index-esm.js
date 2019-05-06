import { Polynomial, SqrtPolynomial } from 'kld-polynomial';
import { Point2D, Matrix2D, Vector2D } from 'kld-affine';

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 *  BoundingBox2D
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module BoundingBox2D
 */

/**
 *  BoundingBox2D
 */
var BoundingBox2D =
/*#__PURE__*/
function () {
  /**
   *  @param {number} x
   *  @param {number} y
   *  @param {number} width
   *  @param {number} height
   *  @returns {BoundingBox2D}
   */
  function BoundingBox2D(x, y, width, height) {
    _classCallCheck(this, BoundingBox2D);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
   *  overlaps
   *
   *  @param {BoundingBox2D} that
   *  @returns {boolean}
   */


  _createClass(BoundingBox2D, [{
    key: "overlaps",
    value: function overlaps(that) {
      return this.x < that.x + that.width && this.x + this.width > that.x && this.y < that.y + that.height && this.y + this.height > that.y;
    }
    /**
     *  isEmpty
     *
     *  @returns {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this.width !== 0 && this.height !== 0;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "bbox(" + this.x + "," + this.y + "," + this.width + "," + this.height + ")";
    }
  }]);

  return BoundingBox2D;
}();

/**
 *  Polygon2D
 */

var Polygon2D =
/*#__PURE__*/
function () {
  /*
   *  @param {Array<Point2D>} points
   *  @returns {Polygon2D}
   */
  function Polygon2D(points) {
    _classCallCheck(this, Polygon2D);

    this.points = points !== undefined ? points : [];
  }
  /**
   *  getBoundingBox
   *
   *  @returns {BoundingBox2D}
   */


  _createClass(Polygon2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      if (this.points.length > 0) {
        var min = this.points[0];
        var max = this.points[0];

        for (var i = 1; i < this.points.length; i++) {
          var point = this.points[i];
          min = min.min(point);
          max = max.max(point);
        }

        return new BoundingBox2D(min.x, min.y, max.x - min.x, max.y - max.y);
      }

      return new BoundingBox2D(0, 0, 0, 0);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return this;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return this.points.map(function (p) {
        return "".concat(p.x, ", ").concat(p.y);
      }).join(" ");
    }
  }]);

  return Polygon2D;
}();

/**
 *  Circle2D
 */

var Circle2D =
/*#__PURE__*/
function () {
  /**
   *  @class
   *  @param {Point2D} center
   *  @param {number} radius
   *  @returns {Circle2D}
   */
  function Circle2D(center, radius) {
    _classCallCheck(this, Circle2D);

    this.center = center;
    this.radius = radius;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {BoundingBox2D}
   */


  _createClass(Circle2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.center.x - this.radius, this.center.y - this.radius, this.radius * 2.0, this.radius * 2.0);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return new Polygon2D();
    }
  }]);

  return Circle2D;
}();

/**
 *  CubicBezier2D
 */

var CubicBezier2D =
/*#__PURE__*/
function () {
  /**
   *  @param {Point2D} p1
   *  @param {Point2D} p2
   *  @param {Point2D} p3
   *  @param {Point2D} p4
   *  @returns {CubicBezier2D}
   */
  function CubicBezier2D(p1, p2, p3, p4) {
    _classCallCheck(this, CubicBezier2D);

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
    this.p4 = p4;
  }
  /**
   *  getPointAtParameter
   *
   *  @param {number} t
   *  @returns {Point2D}
   */


  _createClass(CubicBezier2D, [{
    key: "getPointAtParameter",
    value: function getPointAtParameter(t) {
      // TODO: validate t in [0,1]
      // first round of lerps
      var p5 = this.p1.lerp(this.p2, t);
      var p6 = this.p2.lerp(this.p3, t);
      var p7 = this.p3.lerp(this.p4, t); // second round of lerps

      var p8 = p5.lerp(p6, t);
      var p9 = p6.lerp(p7, t);
      return p8.lerp(p9, t);
    }
    /**
     *  splitAtParameter
     *
     *  @param {number} t
     *  @returns {Array<CubicBezier2D>}
     */

  }, {
    key: "splitAtParameter",
    value: function splitAtParameter(t) {
      // first round of lerps
      var p5 = this.p1.lerp(this.p2, t);
      var p6 = this.p2.lerp(this.p3, t);
      var p7 = this.p3.lerp(this.p4, t); // second round of lerps

      var p8 = p5.lerp(p6, t);
      var p9 = p6.lerp(p7, t); // third round of lerps

      var p10 = p8.lerp(p9, t);
      return [new CubicBezier2D(this.p1, p5, p8, p10), new CubicBezier2D(p10, p9, p7, this.p4)];
    }
    /**
     *  getBernsteinPolynomials
     *
     *  @returns {{x: Polynomial, y: Polynomial}}
     */

  }, {
    key: "getBernsteinPolynomials",
    value: function getBernsteinPolynomials() {
      var a, b, c; // Start with Bezier using Bernstein polynomials for weighting functions:
      //     (1-t^3)P1 + 3t(1-t)^2P2 + 3t^2(1-t)P3 + t^3P4
      //
      // Expand and collect terms to form linear combinations of original Bezier
      // controls.  This ends up with a vector cubic in t:
      //     (-P1+3P2-3P3+P4)t^3 + (3P1-6P2+3P3)t^2 + (-3P1+3P2)t + P1
      //             /\                  /\                /\       /\
      //             ||                  ||                ||       ||
      //             c3                  c2                c1       c0
      // Calculate the coefficients

      a = this.p1.multiply(-1);
      b = this.p2.multiply(3);
      c = this.p3.multiply(-3);
      var c3 = a.add(b.add(c.add(this.p4)));
      a = this.p1.multiply(3);
      b = this.p2.multiply(-6);
      c = this.p3.multiply(3);
      var c2 = a.add(b.add(c));
      a = this.p1.multiply(-3);
      b = this.p2.multiply(3);
      var c1 = a.add(b);
      var c0 = this.p1;
      return {
        x: new Polynomial(c3.x, c2.x, c1.x, c0.x),
        y: new Polynomial(c3.y, c2.y, c1.y, c0.y)
      };
    }
    /**
     *  getArcLengthPolynomial
     *
     *  @returns {SqrtPolynomial}
     */

  }, {
    key: "getArcLengthPolynomial",
    value: function getArcLengthPolynomial() {
      // TODO: use Object.defineProperty
      // TODO: use results from getBernsteinPolynomials but need getCoeficent in
      // Polynomial first

      /* eslint-disable-next-line no-prototype-builtins */
      if (!this.hasOwnProperty("arcLengthPolynomial")) {
        var a, b, c; // convert to Bernstein polynomials

        a = this.p1.multiply(-1);
        b = this.p2.multiply(3);
        c = this.p3.multiply(-3);
        var c3 = a.add(b.add(c.add(this.p4)));
        a = this.p1.multiply(3);
        b = this.p2.multiply(-6);
        c = this.p3.multiply(3);
        var c2 = a.add(b.add(c));
        a = this.p1.multiply(-3);
        b = this.p2.multiply(3);
        var c1 = a.add(b); //  ____________
        // √ dx^2 + dy^2
        //

        this.arcLengthPolynomial = new SqrtPolynomial(9 * (c3.x * c3.x + c3.y * c3.y), 12 * (c2.x * c3.x + c2.y * c3.y), 4 * (c2.x * c2.x + c2.y * c2.y) + 6 * (c1.x * c3.x + c1.y * c3.y), 4 * (c1.x * c2.x + c1.y * c2.y), c1.x * c1.x + c1.y * c1.y);
        this.arcLength = this.arcLengthPolynomial.romberg(0, 1); // this.arcLength = this.arcLengthPolynomial.simpson(0, 1);
      }

      return this.arcLengthPolynomial;
    }
    /**
     *  getParameterFromArcLength
     *
     *  @param {number} arcLength
     *  @returns {number}
     */

  }, {
    key: "getParameterFromArcLength",
    value: function getParameterFromArcLength(arcLength) {
      // TODO: extract common Bezier code
      // make sure the arc length polynomial and arc length values have been calculated
      var arcLengthPolynomial = this.getArcLengthPolynomial();
      var result;

      if (arcLength <= 0) {
        result = 0;
      } else if (arcLength >= this.arcLength) {
        result = 1;
      } else {
        var TOLERANCE = 1e-9;
        var MAXITERS = 20;
        result = arcLength / this.arcLength;

        for (var i = 0; i <= MAXITERS; i++) {
          var diff = arcLengthPolynomial.romberg(0, result) - arcLength;

          if (Math.abs(diff) < TOLERANCE) {
            break;
          }

          var value = arcLengthPolynomial.eval(result);

          if (value === 0) {
            break;
          }

          result -= diff / value;
        }
      }

      return result;
    }
    /**
     *  getBoundingBox
     *
     *  @returns {BoundingBox2D}
     */

  }, {
    key: "getBoundingBox",
    value: function getBoundingBox() {
      var polys = this.getBernsteinPolynomials();
      var dx = polys.x.getDerivative();
      var dy = polys.y.getDerivative();
      var roots = dx.getRootsInInterval(0, 1);
      roots = roots.concat(dy.getRootsInInterval(0, 1)); // initialize min/max using the first and last points on the curve

      var min = this.p1.min(this.p4);
      var max = this.p1.max(this.p4); // and now update min/max with points between p1 and p4

      roots.forEach(function (t) {
        if (0 <= t && t <= 1) {
          var testPoint = new Point2D(polys.x.eval(t), polys.y.eval(t));
          min = min.min(testPoint);
          max = max.max(testPoint);
        }
      });
      return new BoundingBox2D(min.x, min.y, max.x - min.x, max.y - min.y);
    }
    /**
     *  getAlignedBoundingBox
     *
     *  @returns {{ bbox: BoundingBox2D, transform: Matrix2D }}
     */

  }, {
    key: "getAlignedBoundingBox",
    value: function getAlignedBoundingBox() {
      return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: new Matrix2D().translation(this.p1.x, this.p1.y).rotateFromVector(Vector2D.fromPoints(this.p1, this.p4))
      };
    }
    /**
     *  getAlignedBezier
     *
     *  @returns {CubicBezier2D}
     */

  }, {
    key: "getAlignedBezier",
    value: function getAlignedBezier() {
      var matrix = Matrix2D.translation(this.p1.x, this.p1.y) // move p1 to the origin
      .rotateFromVector(Vector2D.fromPoints(this.p1, this.p4)) // rotate vector from p1 to p4 to x-axis
      .inverse(); // reverse transforms
      // apply to each point and create new Bezier

      return new CubicBezier2D(this.p1.transform(matrix), this.p2.transform(matrix), this.p3.transform(matrix), this.p4.transform(matrix));
    }
    /**
     *  toPolygon2D
     *
     *  @param {number} [flatness]
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D(flatness) {
      var points = [];
      var zeroVector = new Vector2D(0, 0);
      flatness = flatness !== undefined ? flatness : 1.0; // add first point

      points.push(this.p1); // add middle points

      /**
       *  @param {number} p1
       *  @param {number} p2
       *  @param {number} p3
       *  @param {number} p4
       */

      function tesselateInterior(p1, p2, p3, p4) {
        // round 1
        var p5 = p1.lerp(p2, 0.5);
        var p6 = p2.lerp(p3, 0.5);
        var p7 = p3.lerp(p4, 0.5); // round 2

        var p8 = p5.lerp(p6, 0.5);
        var p9 = p6.lerp(p7, 0.5); // round 3

        var p10 = p8.lerp(p9, 0.5);
        var baseline = Vector2D.fromPoints(p1, p4);
        var tangent1 = Vector2D.fromPoints(p1, p2);
        var tangent2 = Vector2D.fromPoints(p4, p3);
        var dmax = 0;

        if (zeroVector.equals(tangent1) === false) {
          var perpendicular = baseline.perpendicular(tangent1);
          dmax = perpendicular.length();
        }

        if (zeroVector.equals(tangent2) === false) {
          var _perpendicular = baseline.perpendicular(tangent2);

          dmax = Math.max(dmax, _perpendicular.length());
        }

        if (dmax > flatness) {
          tesselateInterior(p1, p5, p8, p10);
          points.push(new Point2D(p10.x, p10.y));
          tesselateInterior(p10, p9, p7, p4);
        } else {
          points.push(new Point2D(p10.x, p10.y));
        }
      } // add interior points


      tesselateInterior(this.p1, this.p2, this.p3, this.p4); // add last point

      points.push(this.p4);
      return new Polygon2D(points);
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "M" + this.p1.x + "," + this.p1.y + " " + "C" + this.p2.x + "," + this.p2.y + " " + this.p3.x + "," + this.p3.y + " " + this.p4.x + "," + this.p4.y;
    }
  }]);

  return CubicBezier2D;
}();

/**
 *  Ellipse2D
 */

var Ellipse2D =
/*#__PURE__*/
function () {
  /**
   *  @param {Point2D} center
   *  @param {number} radiusX
   *  @param {number} radiusY
   *  @returns {Ellipse2D}
   */
  function Ellipse2D(center, radiusX, radiusY) {
    _classCallCheck(this, Ellipse2D);

    this.center = center;
    this.radiusX = radiusX;
    this.radiusY = radiusY;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {BoundingBox2D}
   */


  _createClass(Ellipse2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.center.x - this.radiusX, this.center.y - this.radiusY, this.radiusX * 2.0, this.radiusY * 2.0);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return new Polygon2D();
    }
  }]);

  return Ellipse2D;
}();

/**
 *  Line2D
 */

var Line2D =
/*#__PURE__*/
function () {
  /**
   *  @param {Point2D} p1
   *  @param {Point2D} p2
   *  @returns {Line2D}
   */
  function Line2D(p1, p2) {
    _classCallCheck(this, Line2D);

    this.p1 = p1;
    this.p2 = p2;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {BoundingBox2D}
   */


  _createClass(Line2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      var min = this.p1.min(this.p2);
      var max = this.p1.max(this.p2);
      return new BoundingBox2D(min.x, min.y, max.x - min.x, max.y - min.y);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return new Polygon2D([this.p1, this.p2]);
    }
  }]);

  return Line2D;
}();

/**
 *  QuadraticBezier2D
 */

var QuadraticBezier2D =
/*#__PURE__*/
function () {
  /**
   *  @param {Point2D} p1
   *  @param {Point2D} p2
   *  @param {Point2D} p3
   *  @returns {QuadraticBezier2D}
   */
  function QuadraticBezier2D(p1, p2, p3) {
    _classCallCheck(this, QuadraticBezier2D);

    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }
  /**
   *  getPointAtParameter
   *
   *  @param {number} t
   *  @returns {Point2D}
   */


  _createClass(QuadraticBezier2D, [{
    key: "getPointAtParameter",
    value: function getPointAtParameter(t) {
      // TODO: validate t in [0,1]
      // first round of lerps
      var p4 = this.p1.lerp(this.p2, t);
      var p5 = this.p2.lerp(this.p3, t);
      return p4.lerp(p5, t);
    }
    /**
     *  splitAtParameter
     *
     *  @param {number} t
     *  @returns {Array<QuadraticBezier2D>}
     */

  }, {
    key: "splitAtParameter",
    value: function splitAtParameter(t) {
      // first round of lerps
      var p4 = this.p1.lerp(this.p2, t);
      var p5 = this.p2.lerp(this.p3, t); // second round of lerps

      var p6 = p4.lerp(p5, t);
      return [new QuadraticBezier2D(this.p1, p4, p6), new QuadraticBezier2D(p6, p5, this.p3)];
    }
    /**
     *  getBernsteinPolynomials
     *
     *  @returns {{x: Polynomial, y: Polynomial}}
     */

  }, {
    key: "getBernsteinPolynomials",
    value: function getBernsteinPolynomials() {
      var a; // temporary variables

      a = this.p2.multiply(-2);
      var c2 = this.p1.add(a.add(this.p3));
      a = this.p1.multiply(-2);
      var b = this.p2.multiply(2);
      var c1 = a.add(b);
      var c0 = this.p1;
      return {
        x: new Polynomial(c2.x, c1.x, c0.x),
        y: new Polynomial(c2.y, c1.y, c0.y)
      };
    }
    /**
     *  getArcLengthPolynomial
     *
     *  @returns {SqrtPolynomial}
     */

  }, {
    key: "getArcLengthPolynomial",
    value: function getArcLengthPolynomial() {
      /* eslint-disable-next-line no-prototype-builtins */
      if (!this.hasOwnProperty("arcLengthPolynomial")) {
        var a;
        a = this.p2.multiply(-2);
        var c2 = this.p1.add(a.add(this.p3));
        a = this.p1.multiply(-2);
        var b = this.p2.multiply(2);
        var c1 = a.add(b); //  ____________
        // √ dx^2 + dy^2
        //

        this.arcLengthPolynomial = new SqrtPolynomial(4 * (c2.x * c2.x + c2.y * c2.y), 4 * (c1.x * c2.x + c1.y * c2.y), c1.x * c1.x + c1.y * c1.y); // this.arcLength = this.arcLengthPolynomial.romberg(0, 1);

        this.arcLength = this.arcLengthPolynomial.simpson(0, 1);
      }

      return this.arcLengthPolynomial;
    }
    /**
     *  getParameterFromArcLength
     *
     *  @param {number} arcLength
     *  @returns {number}
     */

  }, {
    key: "getParameterFromArcLength",
    value: function getParameterFromArcLength(arcLength) {
      // TODO: extract common Bezier code
      // make sure the arc length polynomial and arc length values have been calculated
      var arcLengthPolynomial = this.getArcLengthPolynomial();
      var result;

      if (arcLength <= 0) {
        result = 0;
      } else if (arcLength >= this.arcLength) {
        result = 1;
      } else {
        var TOLERANCE = 1e-9;
        var MAXITERS = 20;
        result = arcLength / this.arcLength;

        for (var i = 0; i <= MAXITERS; i++) {
          var diff = arcLengthPolynomial.romberg(0, result) - arcLength;

          if (Math.abs(diff) < TOLERANCE) {
            break;
          }

          var value = arcLengthPolynomial.eval(result);

          if (value === 0) {
            break;
          }

          result -= diff / value;
        }
      }

      return result;
    }
    /**
     *  getBoundingBox
     *
     *  @returns {BoundingBox2D}
     */

  }, {
    key: "getBoundingBox",
    value: function getBoundingBox() {
      var polys = this.getBernsteinPolynomials();
      var dx = polys.x.getDerivative();
      var dy = polys.y.getDerivative();
      var roots = dx.getRootsInInterval(0, 1);
      roots = roots.concat(dy.getRootsInInterval(0, 1));
      var min = this.p1.min(this.p3);
      var max = this.p1.max(this.p3);
      roots.forEach(function (t) {
        if (0 <= t && t <= 1) {
          var testPoint = new Point2D(polys.x.eval(t), polys.y.eval(t));
          min = min.min(testPoint);
          max = max.max(testPoint);
        }
      });
      return new BoundingBox2D(min.x, min.y, max.x - min.x, max.y - min.y);
    }
    /**
     *  getAlignedBoundingBox
     *
     *  @returns {{ bbox: BoundingBox2D, transform: Matrix2D }}
     */

  }, {
    key: "getAlignedBoundingBox",
    value: function getAlignedBoundingBox() {
      return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: Matrix2D.translation(this.p1.x, this.p1.y).rotateFromVector(Vector2D.fromPoints(this.p1, this.p3))
      };
    }
    /**
     *  getAlignedBezier
     *
     *  @returns {QuadraticBezier2D}
     */

  }, {
    key: "getAlignedBezier",
    value: function getAlignedBezier() {
      var matrix = Matrix2D.translation(this.p1.x, this.p1.y) // move p1 to the origin
      .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3)) // rotate vector from p1 to p4 to x-axis
      .inverse(); // reverse transforms
      // apply to each point and create new Bezier

      return new QuadraticBezier2D(this.p1.transform(matrix), this.p2.transform(matrix), this.p3.transform(matrix));
    }
    /**
     *  toPolygon2D
     *
     *  @param {number} [flatness]
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D(flatness) {
      var points = [];
      var zeroVector = new Vector2D(0, 0);
      flatness = flatness !== undefined ? flatness : 1.0; // add first point

      points.push(this.p1); // add middle points

      /**
       *  @param {number} p1
       *  @param {number} p2
       *  @param {number} p3
       */

      function tesselateInterior(p1, p2, p3) {
        // round 1
        var p4 = p1.lerp(p2, 0.5);
        var p5 = p2.lerp(p3, 0.5); // round 2

        var p6 = p4.lerp(p5, 0.5);
        var baseline = Vector2D.fromPoints(p1, p3);
        var tangent = Vector2D.fromPoints(p1, p2);
        var dmax = 0;

        if (zeroVector.equals(tangent) === false) {
          var perpendicular = baseline.perpendicular(tangent);
          dmax = perpendicular.length();
        }

        if (dmax > flatness) {
          tesselateInterior(p1, p4, p6);
          points.push(new Point2D(p6.x, p6.y));
          tesselateInterior(p6, p5, p3);
        } else {
          points.push(new Point2D(p6.x, p6.y));
        }
      } // add interior points


      tesselateInterior(this.p1, this.p2, this.p3); // add last point

      points.push(this.p3);
      return new Polygon2D(points);
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "M" + this.p1.x + "," + this.p1.y + " " + "Q" + this.p2.x + "," + this.p2.y + " " + this.p3.x + "," + this.p3.y;
    }
  }]);

  return QuadraticBezier2D;
}();

/**
 *  Rectangle2D
 */

var Rectangle2D =
/*#__PURE__*/
function () {
  /**
   *  @param {number} x
   *  @param {number} y
   *  @param {number} width
   *  @param {number} height
   *  @returns {Rectangle2D}
   */
  function Rectangle2D(x, y, width, height) {
    _classCallCheck(this, Rectangle2D);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {BoundingBox2D}
   */


  _createClass(Rectangle2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.x, this.y, this.width, this.height);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return new Polygon2D([new Point2D(this.x, this.y), new Point2D(this.x + this.width, this.y), new Point2D(this.x + this.width, this.y + this.height), new Point2D(this.x, this.y + this.height)]);
    }
  }]);

  return Rectangle2D;
}();

/**
 *  @module kld-contours
 */

export { BoundingBox2D, Circle2D, CubicBezier2D, Ellipse2D, Line2D, Polygon2D, QuadraticBezier2D, Rectangle2D };
