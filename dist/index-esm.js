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

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

/**
 *  BoundingBox2D.js
 *
 *  @module BoundingBox2D
 *  @copyright 2011-2019 Kevin Lindsey
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
   *  @returns {module:kld-contours~BoundingBox2D}
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
   *  @param {module:kld-contours~BoundingBox2D} that
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
  /**
   *  @param {Array<module:kld-affine.Point2D>} points
   *  @returns {module:kld-contours~Polygon2D}
   */
  function Polygon2D(points) {
    _classCallCheck(this, Polygon2D);

    this.points = points !== undefined ? points : [];
  }
  /**
   *  getBoundingBox
   *
   *  @returns {module:kld-contours~BoundingBox2D}
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
     *  @returns {module:kld-contours~Polygon2D}
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
   *  @param {module:kld-affine.Point2D} center
   *  @param {number} radius
   *  @returns {module:kld-contours~Circle2D}
   */
  function Circle2D(center, radius) {
    _classCallCheck(this, Circle2D);

    this.center = center;
    this.radius = radius;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {module:kld-contours~BoundingBox2D}
   */


  _createClass(Circle2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.center.x - this.radius, this.center.y - this.radius, this.radius * 2.0, this.radius * 2.0);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
     */

  }, {
    key: "toPolygon2D",
    value: function toPolygon2D() {
      return new Polygon2D();
    }
  }]);

  return Circle2D;
}();

/* eslint-disable camelcase */

/**
 *  Polynomial.js
 *
 *  @module Polynomial
 *  @copyright 2002-2019 Kevin Lindsey<br>
 *  -<br>
 *  Contribution {@link http://github.com/Quazistax/kld-polynomial}<br>
 *  copyright 2015 Robert Benko (Quazistax) <quazistax@gmail.com><br>
 *  MIT license
 */

/**
 *  Sign of a number (+1, -1, +0, -0).
 *
 *  @param {number} x
 *  @returns {number}
 */
function sign(x) {
  // eslint-disable-next-line no-self-compare
  return typeof x === "number" ? x ? x < 0 ? -1 : 1 : x === x ? x : NaN : NaN;
}
/**
 *  Polynomial
 *
 *  @memberof module:kld-polynomial
 */


var Polynomial =
/*#__PURE__*/
function () {
  /**
   *  Polynomial
   *
   *  @param {Array<number>} coefs
   *  @returns {module:kld-polynomial.Polynomial}
   */
  function Polynomial() {
    _classCallCheck(this, Polynomial);

    this.coefs = [];

    for (var i = arguments.length - 1; i >= 0; i--) {
      this.coefs.push(i < 0 || arguments.length <= i ? undefined : arguments[i]);
    }

    this._variable = "t";
    this._s = 0;
  }
  /**
   *  Based on polint in "Numerical Recipes in C, 2nd Edition", pages 109-110
   *
   *  @param {Array<number>} xs
   *  @param {Array<number>} ys
   *  @param {number} n
   *  @param {number} offset
   *  @param {number} x
   *
   *  @returns {{y: number, dy: number}}
   */


  _createClass(Polynomial, [{
    key: "clone",

    /**
     *  Clones this polynomial and return the clone.
     *
     *  @returns {module:kld-polynomial.Polynomial}
     */
    value: function clone() {
      var poly = new Polynomial();
      poly.coefs = this.coefs.slice();
      return poly;
    }
    /**
     *  eval
     *
     *  @param {number} x
     */

  }, {
    key: "eval",
    value: function _eval(x) {
      if (isNaN(x)) {
        throw new TypeError("Parameter must be a number. Found '".concat(x, "'"));
      }

      var result = 0;

      for (var i = this.coefs.length - 1; i >= 0; i--) {
        result = result * x + this.coefs[i];
      }

      return result;
    }
    /**
     *  add
     *
     *  @param {module:kld-polynomial.Polynomial} that
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "add",
    value: function add(that) {
      var result = new Polynomial();
      var d1 = this.getDegree();
      var d2 = that.getDegree();
      var dmax = Math.max(d1, d2);

      for (var i = 0; i <= dmax; i++) {
        var v1 = i <= d1 ? this.coefs[i] : 0;
        var v2 = i <= d2 ? that.coefs[i] : 0;
        result.coefs[i] = v1 + v2;
      }

      return result;
    }
    /**
     *  multiply
     *
     *  @param {module:kld-polynomial.Polynomial} that
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "multiply",
    value: function multiply(that) {
      var result = new Polynomial();

      for (var i = 0; i <= this.getDegree() + that.getDegree(); i++) {
        result.coefs.push(0);
      }

      for (var _i = 0; _i <= this.getDegree(); _i++) {
        for (var j = 0; j <= that.getDegree(); j++) {
          result.coefs[_i + j] += this.coefs[_i] * that.coefs[j];
        }
      }

      return result;
    }
    /**
     *  divideEqualsScalar
     *
     *  @deprecated To be replaced by divideScalar
     *  @param {number} scalar
     */

  }, {
    key: "divideEqualsScalar",
    value: function divideEqualsScalar(scalar) {
      for (var i = 0; i < this.coefs.length; i++) {
        this.coefs[i] /= scalar;
      }
    }
    /**
     *  simplifyEquals
     *
     *  @deprecated To be replaced by simplify
     *  @param {number} TOLERANCE
     */

  }, {
    key: "simplifyEquals",
    value: function simplifyEquals() {
      var TOLERANCE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e-12;

      for (var i = this.getDegree(); i >= 0; i--) {
        if (Math.abs(this.coefs[i]) <= TOLERANCE) {
          this.coefs.pop();
        } else {
          break;
        }
      }
    }
    /**
     *  Sets small coefficients to zero.
     *
     *  @deprecated To be replaced by removeZeros
     *  @param {number} TOLERANCE
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "removeZerosEquals",
    value: function removeZerosEquals() {
      var TOLERANCE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1e-15;
      var c = this.coefs;
      var err = 10 * TOLERANCE * Math.abs(c.reduce(function (pv, cv) {
        return Math.abs(cv) > Math.abs(pv) ? cv : pv;
      }));

      for (var i = 0; i < c.length - 1; i++) {
        if (Math.abs(c[i]) < err) {
          c[i] = 0;
        }
      }

      return this;
    }
    /**
     *  Scales polynomial so that leading coefficient becomes 1.
     *
     *  @deprecated To be replaced by getMonic
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "monicEquals",
    value: function monicEquals() {
      var c = this.coefs;

      if (c[c.length - 1] !== 1) {
        this.divideEqualsScalar(c[c.length - 1]);
      }

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
      var coefs = [];
      var signs = [];

      for (var i = this.coefs.length - 1; i >= 0; i--) {
        var value = Math.round(this.coefs[i] * 1000) / 1000;

        if (value !== 0) {
          var signString = value < 0 ? " - " : " + ";
          value = Math.abs(value);

          if (i > 0) {
            if (value === 1) {
              value = this._variable;
            } else {
              value += this._variable;
            }
          }

          if (i > 1) {
            value += "^" + i;
          }

          signs.push(signString);
          coefs.push(value);
        }
      }

      signs[0] = signs[0] === " + " ? "" : "-";
      var result = "";

      for (var _i2 = 0; _i2 < coefs.length; _i2++) {
        result += signs[_i2] + coefs[_i2];
      }

      return result;
    }
    /**
     *  bisection
     *
     *  @param {number} min
     *  @param {number} max
     *  @param {number} [TOLERANCE]
     *  @param {number} [ACCURACY]
     *  @returns {number}
     */

  }, {
    key: "bisection",
    value: function bisection(min, max) {
      var TOLERANCE = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1e-6;
      var ACCURACY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 15;
      var minValue = this.eval(min);
      var maxValue = this.eval(max);
      var result;

      if (Math.abs(minValue) <= TOLERANCE) {
        result = min;
      } else if (Math.abs(maxValue) <= TOLERANCE) {
        result = max;
      } else if (minValue * maxValue <= 0) {
        var tmp1 = Math.log(max - min);
        var tmp2 = Math.LN10 * ACCURACY;
        var maxIterations = Math.ceil((tmp1 + tmp2) / Math.LN2);

        for (var i = 0; i < maxIterations; i++) {
          result = 0.5 * (min + max);
          var value = this.eval(result);

          if (Math.abs(value) <= TOLERANCE) {
            break;
          }

          if (value * minValue < 0) {
            max = result;
            maxValue = value;
          } else {
            min = result;
            minValue = value;
          }
        }
      }

      return result;
    }
    /**
     *  Based on trapzd in "Numerical Recipes in C, 2nd Edition", page 137
     *
     *  @param {number} min
     *  @param {number} max
     *  @param {number} n
     *  @returns {number}
     */

  }, {
    key: "trapezoid",
    value: function trapezoid(min, max, n) {
      if (isNaN(min) || isNaN(max) || isNaN(n)) {
        throw new TypeError("Parameters must be numbers");
      }

      var range = max - min;

      if (n === 1) {
        var minValue = this.eval(min);
        var maxValue = this.eval(max);
        this._s = 0.5 * range * (minValue + maxValue);
      } else {
        var iter = 1 << n - 2;
        var delta = range / iter;
        var x = min + 0.5 * delta;
        var sum = 0;

        for (var i = 0; i < iter; i++) {
          sum += this.eval(x);
          x += delta;
        }

        this._s = 0.5 * (this._s + range * sum / iter);
      }

      if (isNaN(this._s)) {
        throw new TypeError("this._s is NaN");
      }

      return this._s;
    }
    /**
     *  Based on trapzd in "Numerical Recipes in C, 2nd Edition", page 139
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {number}
     */

  }, {
    key: "simpson",
    value: function simpson(min, max) {
      if (isNaN(min) || isNaN(max)) {
        throw new TypeError("Parameters must be numbers");
      }

      var range = max - min;
      var st = 0.5 * range * (this.eval(min) + this.eval(max));
      var t = st;
      var s = 4.0 * st / 3.0;
      var os = s;
      var ost = st;
      var TOLERANCE = 1e-7;
      var iter = 1;

      for (var n = 2; n <= 20; n++) {
        var delta = range / iter;
        var x = min + 0.5 * delta;
        var sum = 0;

        for (var i = 1; i <= iter; i++) {
          sum += this.eval(x);
          x += delta;
        }

        t = 0.5 * (t + range * sum / iter);
        st = t;
        s = (4.0 * st - ost) / 3.0;

        if (Math.abs(s - os) < TOLERANCE * Math.abs(os)) {
          break;
        }

        os = s;
        ost = st;
        iter <<= 1;
      }

      return s;
    }
    /**
     *  romberg
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {number}
     */

  }, {
    key: "romberg",
    value: function romberg(min, max) {
      if (isNaN(min) || isNaN(max)) {
        throw new TypeError("Parameters must be numbers");
      }

      var MAX = 20;
      var K = 3;
      var TOLERANCE = 1e-6;
      var s = new Array(MAX + 1);
      var h = new Array(MAX + 1);
      var result = {
        y: 0,
        dy: 0
      };
      h[0] = 1.0;

      for (var j = 1; j <= MAX; j++) {
        s[j - 1] = this.trapezoid(min, max, j);

        if (j >= K) {
          result = Polynomial.interpolate(h, s, K, j - K, 0.0);

          if (Math.abs(result.dy) <= TOLERANCE * result.y) {
            break;
          }
        }

        s[j] = s[j - 1];
        h[j] = 0.25 * h[j - 1];
      }

      return result.y;
    }
    /**
     *  Estimate what is the maximum polynomial evaluation error value under which polynomial evaluation could be in fact 0.
     *
     *  @param {number} maxAbsX
     *  @returns {number}
     */

  }, {
    key: "zeroErrorEstimate",
    value: function zeroErrorEstimate(maxAbsX) {
      var poly = this;
      var ERRF = 1e-15;

      if (typeof maxAbsX === "undefined") {
        var rb = poly.bounds();
        maxAbsX = Math.max(Math.abs(rb.minX), Math.abs(rb.maxX));
      }

      if (maxAbsX < 0.001) {
        return 2 * Math.abs(poly.eval(ERRF));
      }

      var n = poly.coefs.length - 1;
      var an = poly.coefs[n];
      return 10 * ERRF * poly.coefs.reduce(function (m, v, i) {
        var nm = v / an * Math.pow(maxAbsX, i);
        return nm > m ? nm : m;
      }, 0);
    }
    /**
     *  Calculates upper Real roots bounds. <br/>
     *  Real roots are in interval [negX, posX]. Determined by Fujiwara method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ negX: number, posX: number }}
     */

  }, {
    key: "boundsUpperRealFujiwara",
    value: function boundsUpperRealFujiwara() {
      var a = this.coefs;
      var n = a.length - 1;
      var an = a[n];

      if (an !== 1) {
        a = this.coefs.map(function (v) {
          return v / an;
        });
      }

      var b = a.map(function (v, i) {
        return i < n ? Math.pow(Math.abs(i === 0 ? v / 2 : v), 1 / (n - i)) : v;
      });
      var coefSelectionFunc;

      var find2Max = function find2Max(acc, bi, i) {
        if (coefSelectionFunc(i)) {
          if (acc.max < bi) {
            acc.nearmax = acc.max;
            acc.max = bi;
          } else if (acc.nearmax < bi) {
            acc.nearmax = bi;
          }
        }

        return acc;
      };

      coefSelectionFunc = function coefSelectionFunc(i) {
        return i < n && a[i] < 0;
      }; // eslint-disable-next-line unicorn/no-fn-reference-in-iterator


      var max_nearmax_pos = b.reduce(find2Max, {
        max: 0,
        nearmax: 0
      });

      coefSelectionFunc = function coefSelectionFunc(i) {
        return i < n && (n % 2 === i % 2 ? a[i] < 0 : a[i] > 0);
      }; // eslint-disable-next-line unicorn/no-fn-reference-in-iterator


      var max_nearmax_neg = b.reduce(find2Max, {
        max: 0,
        nearmax: 0
      });
      return {
        negX: -2 * max_nearmax_neg.max,
        posX: 2 * max_nearmax_pos.max
      };
    }
    /**
     *  Calculates lower Real roots bounds. <br/>
     *  There are no Real roots in interval <negX, posX>. Determined by Fujiwara method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ negX: number, posX: number }}
     */

  }, {
    key: "boundsLowerRealFujiwara",
    value: function boundsLowerRealFujiwara() {
      var poly = new Polynomial();
      poly.coefs = this.coefs.slice().reverse();
      var res = poly.boundsUpperRealFujiwara();
      res.negX = 1 / res.negX;
      res.posX = 1 / res.posX;
      return res;
    }
    /**
     *  Calculates left and right Real roots bounds. <br/>
     *  Real roots are in interval [minX, maxX]. Combines Fujiwara lower and upper bounds to get minimal interval.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ minX: number, maxX: number }}
    */

  }, {
    key: "bounds",
    value: function bounds() {
      var urb = this.boundsUpperRealFujiwara();
      var rb = {
        minX: urb.negX,
        maxX: urb.posX
      };

      if (urb.negX === 0 && urb.posX === 0) {
        return rb;
      }

      if (urb.negX === 0) {
        rb.minX = this.boundsLowerRealFujiwara().posX;
      } else if (urb.posX === 0) {
        rb.maxX = this.boundsLowerRealFujiwara().negX;
      }

      if (rb.minX > rb.maxX) {
        rb.minX = rb.maxX = 0;
      }

      return rb; // TODO: if sure that there are no complex roots
      // (maybe by using Sturm's theorem) use:
      // return this.boundsRealLaguerre();
    }
    /**
     *  Calculates absolute upper roots bound. <br/>
     *  All (Complex and Real) roots magnitudes are &lt;= result. Determined by Rouche method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {number}
     */

  }, {
    key: "boundUpperAbsRouche",
    value: function boundUpperAbsRouche() {
      var a = this.coefs;
      var n = a.length - 1;
      var max = a.reduce(function (prev, curr, i) {
        if (i !== n) {
          curr = Math.abs(curr);
          return prev < curr ? curr : prev;
        }

        return prev;
      }, 0);
      return 1 + max / Math.abs(a[n]);
    }
    /**
     *  Calculates absolute lower roots bound. <br/>
     *  All (Complex and Real) roots magnitudes are &gt;= result. Determined by Rouche method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {number}
     */

  }, {
    key: "boundLowerAbsRouche",
    value: function boundLowerAbsRouche() {
      var a = this.coefs;
      var max = a.reduce(function (prev, curr, i) {
        if (i !== 0) {
          curr = Math.abs(curr);
          return prev < curr ? curr : prev;
        }

        return prev;
      }, 0);
      return Math.abs(a[0]) / (Math.abs(a[0]) + max);
    }
    /**
     *  Calculates left and right Real roots bounds.<br/>
     *  WORKS ONLY if all polynomial roots are Real.
     *  Real roots are in interval [minX, maxX]. Determined by Laguerre method.
     *  @see {@link http://en.wikipedia.org/wiki/Properties_of_polynomial_roots}
     *
     *  @returns {{ minX: number, maxX: number }}
     */

  }, {
    key: "boundsRealLaguerre",
    value: function boundsRealLaguerre() {
      var a = this.coefs;
      var n = a.length - 1;
      var p1 = -a[n - 1] / (n * a[n]);
      var undersqrt = a[n - 1] * a[n - 1] - 2 * n / (n - 1) * a[n] * a[n - 2];
      var p2 = (n - 1) / (n * a[n]) * Math.sqrt(undersqrt);

      if (p2 < 0) {
        p2 = -p2;
      }

      return {
        minX: p1 - p2,
        maxX: p1 + p2
      };
    }
    /**
     *  Root count by Descartes rule of signs. <br/>
     *  Returns maximum number of positive and negative real roots and minimum number of complex roots.
     *  @see {@link http://en.wikipedia.org/wiki/Descartes%27_rule_of_signs}
     *
     *  @returns {{maxRealPos: number, maxRealNeg: number, minComplex: number}}
     */

  }, {
    key: "countRootsDescartes",
    value: function countRootsDescartes() {
      var a = this.coefs;
      var n = a.length - 1;
      var accum = a.reduce(function (acc, ai, i) {
        if (acc.prev_a !== 0 && ai !== 0) {
          if (acc.prev_a < 0 === ai > 0) {
            acc.pos++;
          }

          if (i % 2 === 0 !== acc.prev_a < 0 === (i % 2 === 1 !== ai > 0)) {
            acc.neg++;
          }
        }

        acc.prev_a = ai;
        return acc;
      }, {
        pos: 0,
        neg: 0,
        prev_a: 0
      });
      return {
        maxRealPos: accum.pos,
        maxRealNeg: accum.neg,
        minComplex: n - (accum.pos + accum.neg)
      };
    } // getters and setters

    /**
     *  get degree
     *
     *  @returns {number}
     */

  }, {
    key: "getDegree",
    value: function getDegree() {
      return this.coefs.length - 1;
    }
    /**
     *  getDerivative
     *
     *  @returns {module:kld-polynomial.Polynomial}
     */

  }, {
    key: "getDerivative",
    value: function getDerivative() {
      var derivative = new Polynomial();

      for (var i = 1; i < this.coefs.length; i++) {
        derivative.coefs.push(i * this.coefs[i]);
      }

      return derivative;
    }
    /**
     *  getRoots
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getRoots",
    value: function getRoots() {
      var result;
      this.simplifyEquals();

      switch (this.getDegree()) {
        case 0:
          result = [];
          break;

        case 1:
          result = this.getLinearRoot();
          break;

        case 2:
          result = this.getQuadraticRoots();
          break;

        case 3:
          result = this.getCubicRoots();
          break;

        case 4:
          result = this.getQuarticRoots();
          break;

        default:
          result = [];
      }

      return result;
    }
    /**
     *  getRootsInInterval
     *
     *  @param {number} min
     *  @param {number} max
     *  @returns {Array<number>}
     */

  }, {
    key: "getRootsInInterval",
    value: function getRootsInInterval(min, max) {
      var roots = [];
      /**
       *  @param {number} value
       */

      function push(value) {
        if (typeof value === "number") {
          roots.push(value);
        }
      }

      if (this.getDegree() === 0) {
        throw new RangeError("Unexpected empty polynomial");
      } else if (this.getDegree() === 1) {
        push(this.bisection(min, max));
      } else {
        // get roots of derivative
        var deriv = this.getDerivative();
        var droots = deriv.getRootsInInterval(min, max);

        if (droots.length > 0) {
          // find root on [min, droots[0]]
          push(this.bisection(min, droots[0])); // find root on [droots[i],droots[i+1]] for 0 <= i <= count-2

          for (var i = 0; i <= droots.length - 2; i++) {
            push(this.bisection(droots[i], droots[i + 1]));
          } // find root on [droots[count-1],xmax]


          push(this.bisection(droots[droots.length - 1], max));
        } else {
          // polynomial is monotone on [min,max], has at most one root
          push(this.bisection(min, max));
        }
      }

      return roots;
    }
    /**
     *  getLinearRoot
     *
     *  @returns {number}
     */

  }, {
    key: "getLinearRoot",
    value: function getLinearRoot() {
      var result = [];
      var a = this.coefs[1];

      if (a !== 0) {
        result.push(-this.coefs[0] / a);
      }

      return result;
    }
    /**
     *  getQuadraticRoots
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getQuadraticRoots",
    value: function getQuadraticRoots() {
      var results = [];

      if (this.getDegree() === 2) {
        var a = this.coefs[2];
        var b = this.coefs[1] / a;
        var c = this.coefs[0] / a;
        var d = b * b - 4 * c;

        if (d > 0) {
          var e = Math.sqrt(d);
          results.push(0.5 * (-b + e));
          results.push(0.5 * (-b - e));
        } else if (d === 0) {
          // really two roots with same value, but we only return one
          results.push(0.5 * -b);
        } // else imaginary results

      }

      return results;
    }
    /**
     *  getCubicRoots
     *
     *  This code is based on MgcPolynomial.cpp written by David Eberly.  His
     *  code along with many other excellent examples are avaiable at his site:
     *  http://www.geometrictools.com
     *
     *  @returns {Array<number>}
     */

  }, {
    key: "getCubicRoots",
    value: function getCubicRoots() {
      var results = [];

      if (this.getDegree() === 3) {
        var c3 = this.coefs[3];
        var c2 = this.coefs[2] / c3;
        var c1 = this.coefs[1] / c3;
        var c0 = this.coefs[0] / c3;
        var a = (3 * c1 - c2 * c2) / 3;
        var b = (2 * c2 * c2 * c2 - 9 * c1 * c2 + 27 * c0) / 27;
        var offset = c2 / 3;
        var discrim = b * b / 4 + a * a * a / 27;
        var halfB = b / 2;
        var ZEROepsilon = this.zeroErrorEstimate();

        if (Math.abs(discrim) <= ZEROepsilon) {
          discrim = 0;
        }

        if (discrim > 0) {
          var e = Math.sqrt(discrim);
          var root; // eslint-disable-line no-shadow

          var tmp = -halfB + e;

          if (tmp >= 0) {
            root = Math.pow(tmp, 1 / 3);
          } else {
            root = -Math.pow(-tmp, 1 / 3);
          }

          tmp = -halfB - e;

          if (tmp >= 0) {
            root += Math.pow(tmp, 1 / 3);
          } else {
            root -= Math.pow(-tmp, 1 / 3);
          }

          results.push(root - offset);
        } else if (discrim < 0) {
          var distance = Math.sqrt(-a / 3);
          var angle = Math.atan2(Math.sqrt(-discrim), -halfB) / 3;
          var cos = Math.cos(angle);
          var sin = Math.sin(angle);
          var sqrt3 = Math.sqrt(3);
          results.push(2 * distance * cos - offset);
          results.push(-distance * (cos + sqrt3 * sin) - offset);
          results.push(-distance * (cos - sqrt3 * sin) - offset);
        } else {
          var _tmp;

          if (halfB >= 0) {
            _tmp = -Math.pow(halfB, 1 / 3);
          } else {
            _tmp = Math.pow(-halfB, 1 / 3);
          }

          results.push(2 * _tmp - offset); // really should return next root twice, but we return only one

          results.push(-_tmp - offset);
        }
      }

      return results;
    }
    /**
     *  Calculates roots of quartic polynomial. <br/>
     *  First, derivative roots are found, then used to split quartic polynomial
     *  into segments, each containing one root of quartic polynomial.
     *  Segments are then passed to newton's method to find roots.
     *
     *  @returns {Array<number>} roots
     */

  }, {
    key: "getQuarticRoots",
    value: function getQuarticRoots() {
      var results = [];
      var n = this.getDegree();

      if (n === 4) {
        var poly = new Polynomial();
        poly.coefs = this.coefs.slice();
        poly.divideEqualsScalar(poly.coefs[n]);
        var ERRF = 1e-15;

        if (Math.abs(poly.coefs[0]) < 10 * ERRF * Math.abs(poly.coefs[3])) {
          poly.coefs[0] = 0;
        }

        var poly_d = poly.getDerivative();
        var derrt = poly_d.getRoots().sort(function (a, b) {
          return a - b;
        });
        var dery = [];
        var nr = derrt.length - 1;
        var rb = this.bounds();
        var maxabsX = Math.max(Math.abs(rb.minX), Math.abs(rb.maxX));
        var ZEROepsilon = this.zeroErrorEstimate(maxabsX);

        for (var _i3 = 0; _i3 <= nr; _i3++) {
          dery.push(poly.eval(derrt[_i3]));
        }

        for (var _i4 = 0; _i4 <= nr; _i4++) {
          if (Math.abs(dery[_i4]) < ZEROepsilon) {
            dery[_i4] = 0;
          }
        }

        var i = 0;
        var dx = Math.max(0.1 * (rb.maxX - rb.minX) / n, ERRF);
        var guesses = [];
        var minmax = [];

        if (nr > -1) {
          if (dery[0] !== 0) {
            if (sign(dery[0]) !== sign(poly.eval(derrt[0] - dx) - dery[0])) {
              guesses.push(derrt[0] - dx);
              minmax.push([rb.minX, derrt[0]]);
            }
          } else {
            results.push(derrt[0], derrt[0]);
            i++;
          }

          for (; i < nr; i++) {
            if (dery[i + 1] === 0) {
              results.push(derrt[i + 1], derrt[i + 1]);
              i++;
            } else if (sign(dery[i]) !== sign(dery[i + 1])) {
              guesses.push((derrt[i] + derrt[i + 1]) / 2);
              minmax.push([derrt[i], derrt[i + 1]]);
            }
          }

          if (dery[nr] !== 0 && sign(dery[nr]) !== sign(poly.eval(derrt[nr] + dx) - dery[nr])) {
            guesses.push(derrt[nr] + dx);
            minmax.push([derrt[nr], rb.maxX]);
          }
        }
        /**
         *  @param {number} x
         *  @returns {number}
         */


        var f = function f(x) {
          return poly.eval(x);
        };
        /**
         *  @param {number} x
         *  @returns {number}
         */


        var df = function df(x) {
          return poly_d.eval(x);
        };

        if (guesses.length > 0) {
          for (i = 0; i < guesses.length; i++) {
            guesses[i] = Polynomial.newtonSecantBisection(guesses[i], f, df, 32, minmax[i][0], minmax[i][1]);
          }
        }

        results = results.concat(guesses);
      }

      return results;
    }
  }], [{
    key: "interpolate",
    value: function interpolate(xs, ys, n, offset, x) {
      if (xs.constructor !== Array || ys.constructor !== Array) {
        throw new TypeError("xs and ys must be arrays");
      }

      if (isNaN(n) || isNaN(offset) || isNaN(x)) {
        throw new TypeError("n, offset, and x must be numbers");
      }

      var i, y;
      var dy = 0;
      var c = new Array(n);
      var d = new Array(n);
      var ns = 0;
      var diff = Math.abs(x - xs[offset]);

      for (i = 0; i < n; i++) {
        var dift = Math.abs(x - xs[offset + i]);

        if (dift < diff) {
          ns = i;
          diff = dift;
        }

        c[i] = d[i] = ys[offset + i];
      }

      y = ys[offset + ns];
      ns--;

      for (var m = 1; m < n; m++) {
        for (i = 0; i < n - m; i++) {
          var ho = xs[offset + i] - x;
          var hp = xs[offset + i + m] - x;
          var w = c[i + 1] - d[i];
          var den = ho - hp;

          if (den === 0.0) {
            throw new RangeError("Unable to interpolate polynomial. Two numbers in n were identical (to within roundoff)");
          }

          den = w / den;
          d[i] = hp * den;
          c[i] = ho * den;
        }

        dy = 2 * (ns + 1) < n - m ? c[ns + 1] : d[ns--];
        y += dy;
      }

      return {
        y: y,
        dy: dy
      };
    }
    /**
     *  Newton's (Newton-Raphson) method for finding Real roots on univariate function. <br/>
     *  When using bounds, algorithm falls back to secant if newton goes out of range.
     *  Bisection is fallback for secant when determined secant is not efficient enough.
     *  @see {@link http://en.wikipedia.org/wiki/Newton%27s_method}
     *  @see {@link http://en.wikipedia.org/wiki/Secant_method}
     *  @see {@link http://en.wikipedia.org/wiki/Bisection_method}
     *
     *  @param {number} x0 - Initial root guess
     *  @param {Function} f - Function which root we are trying to find
     *  @param {Function} df - Derivative of function f
     *  @param {number} max_iterations - Maximum number of algorithm iterations
     *  @param {number} [min] - Left bound value
     *  @param {number} [max] - Right bound value
     *  @returns {number} root
     */

  }, {
    key: "newtonSecantBisection",
    value: function newtonSecantBisection(x0, f, df, max_iterations, min, max) {
      var x,
          prev_dfx = 0,
          dfx,
          prev_x_ef_correction = 0,
          x_correction,
          x_new;
      var y, y_atmin, y_atmax;
      x = x0;
      var ACCURACY = 14;
      var min_correction_factor = Math.pow(10, -ACCURACY);
      var isBounded = typeof min === "number" && typeof max === "number";

      if (isBounded) {
        if (min > max) {
          throw new RangeError("Min must be greater than max");
        }

        y_atmin = f(min);
        y_atmax = f(max);

        if (sign(y_atmin) === sign(y_atmax)) {
          throw new RangeError("Y values of bounds must be of opposite sign");
        }
      }

      var isEnoughCorrection = function isEnoughCorrection() {
        // stop if correction is too small or if correction is in simple loop
        return Math.abs(x_correction) <= min_correction_factor * Math.abs(x) || prev_x_ef_correction === x - x_correction - x;
      };

      for (var i = 0; i < max_iterations; i++) {
        dfx = df(x);

        if (dfx === 0) {
          if (prev_dfx === 0) {
            // error
            throw new RangeError("df(x) is zero");
          } else {
            // use previous derivation value
            dfx = prev_dfx;
          } // or move x a little?
          // dfx = df(x != 0 ? x + x * 1e-15 : 1e-15);

        }

        prev_dfx = dfx;
        y = f(x);
        x_correction = y / dfx;
        x_new = x - x_correction;

        if (isEnoughCorrection()) {
          break;
        }

        if (isBounded) {
          if (sign(y) === sign(y_atmax)) {
            max = x;
            y_atmax = y;
          } else if (sign(y) === sign(y_atmin)) {
            min = x;
            y_atmin = y;
          } else {
            x = x_new;
            break;
          }

          if (x_new < min || x_new > max) {
            if (sign(y_atmin) === sign(y_atmax)) {
              break;
            }

            var RATIO_LIMIT = 50;
            var AIMED_BISECT_OFFSET = 0.25; // [0, 0.5)

            var dy = y_atmax - y_atmin;
            var dx = max - min;

            if (dy === 0) {
              x_correction = x - (min + dx * 0.5);
            } else if (Math.abs(dy / Math.min(y_atmin, y_atmax)) > RATIO_LIMIT) {
              x_correction = x - (min + dx * (0.5 + (Math.abs(y_atmin) < Math.abs(y_atmax) ? -AIMED_BISECT_OFFSET : AIMED_BISECT_OFFSET)));
            } else {
              x_correction = x - (min - y_atmin / dy * dx);
            }

            x_new = x - x_correction;

            if (isEnoughCorrection()) {
              break;
            }
          }
        }

        prev_x_ef_correction = x - x_new;
        x = x_new;
      }

      return x;
    }
  }]);

  return Polynomial;
}();

/**
 *  SqrtPolynomial
 *
 *  @deprecated
 *  @memberof module:kld-polynomial
 */

var SqrtPolynomial =
/*#__PURE__*/
function (_Polynomial) {
  _inherits(SqrtPolynomial, _Polynomial);

  function SqrtPolynomial() {
    _classCallCheck(this, SqrtPolynomial);

    return _possibleConstructorReturn(this, _getPrototypeOf(SqrtPolynomial).apply(this, arguments));
  }

  _createClass(SqrtPolynomial, [{
    key: "eval",

    /**
     *  eval
     *
     *  @param {number} x
     *  @returns {number}
     */
    value: function _eval(x) {
      var TOLERANCE = 1e-7;

      var result = _get(_getPrototypeOf(SqrtPolynomial.prototype), "eval", this).call(this, x); // NOTE: May need to change the following.  I added these to capture
      // some really small negative values that were being generated by one
      // of my Bezier arcLength functions


      if (Math.abs(result) < TOLERANCE) {
        result = 0;
      }

      if (result < 0) {
        throw new RangeError("Cannot take square root of negative number");
      }

      return Math.sqrt(result);
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      var result = _get(_getPrototypeOf(SqrtPolynomial.prototype), "toString", this).call(this);

      return "sqrt(" + result + ")";
    }
  }]);

  return SqrtPolynomial;
}(Polynomial);

/**
 *  @module kld-polynomial
 */

/**
 *  Point2D.js
 *  @module Point2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Point2D
 *
 *  @memberof module:kld-affine
 */
var Point2D =
/*#__PURE__*/
function () {
  /**
   *  Point2D
   *
   *  @param {number} x
   *  @param {number} y
   *  @returns {module:kld-affine.Point2D}
   */
  function Point2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Point2D);

    this.x = x;
    this.y = y;
  }
  /**
   *  clone
   *
   *  @returns {module:kld-affine.Point2D}
   */


  _createClass(Point2D, [{
    key: "clone",
    value: function clone() {
      return new this.constructor(this.x, this.y);
    }
    /**
     *  add
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "add",
    value: function add(that) {
      return new this.constructor(this.x + that.x, this.y + that.y);
    }
    /**
     *  subtract
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "subtract",
    value: function subtract(that) {
      return new this.constructor(this.x - that.x, this.y - that.y);
    }
    /**
     *  multiply
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "multiply",
    value: function multiply(scalar) {
      return new this.constructor(this.x * scalar, this.y * scalar);
    }
    /**
     *  divide
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "divide",
    value: function divide(scalar) {
      return new this.constructor(this.x / scalar, this.y / scalar);
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.x === that.x && this.y === that.y;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Point2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.x - that.x) < precision && Math.abs(this.y - that.y) < precision;
    } // utility methods

    /**
     *  lerp
     *
     *  @param {module:kld-affine.Point2D} that
     *  @param {number} t
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "lerp",
    value: function lerp(that, t) {
      var omt = 1.0 - t;
      return new this.constructor(this.x * omt + that.x * t, this.y * omt + that.y * t);
    }
    /**
     *  distanceFrom
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "distanceFrom",
    value: function distanceFrom(that) {
      var dx = this.x - that.x;
      var dy = this.y - that.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
    /**
     *  min
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "min",
    value: function min(that) {
      return new this.constructor(Math.min(this.x, that.x), Math.min(this.y, that.y));
    }
    /**
     *  max
     *
     *  @param {module:kld-affine.Point2D} that
     *  @returns {number}
     */

  }, {
    key: "max",
    value: function max(that) {
      return new this.constructor(Math.max(this.x, that.x), Math.max(this.y, that.y));
    }
    /**
     *  transform
     *
     *  @param {module:kld-affine.Matrix2D} matrix
     *  @returns {module:kld-affine.Point2D}
     */

  }, {
    key: "transform",
    value: function transform(matrix) {
      return new this.constructor(matrix.a * this.x + matrix.c * this.y + matrix.e, matrix.b * this.x + matrix.d * this.y + matrix.f);
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "point(".concat(this.x, ",").concat(this.y, ")");
    }
  }]);

  return Point2D;
}();

/**
 *  Vector2D.js
 *  @module Vector2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Vector2D
 *
 *  @memberof module:kld-affine
 */
var Vector2D =
/*#__PURE__*/
function () {
  /**
   *  Vector2D
   *
   *  @param {number} x
   *  @param {number} y
   *  @returns {module:kld-affine.Vector2D}
   */
  function Vector2D() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector2D);

    this.x = x;
    this.y = y;
  }
  /**
   *  fromPoints
   *
   *  @param {module:kld-affine.Point2D} p1
   *  @param {module:kld-affine.Point2D} p2
   *  @returns {module:kld-affine.Vector2D}
   */


  _createClass(Vector2D, [{
    key: "length",

    /**
     *  length
     *
     *  @returns {number}
     */
    value: function length() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     *  magnitude
     *
     *  @returns {number}
     */

  }, {
    key: "magnitude",
    value: function magnitude() {
      return this.x * this.x + this.y * this.y;
    }
    /**
     *  dot
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "dot",
    value: function dot(that) {
      return this.x * that.x + this.y * that.y;
    }
    /**
     *  cross
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "cross",
    value: function cross(that) {
      return this.x * that.y - this.y * that.x;
    }
    /**
     *  determinant
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "determinant",
    value: function determinant(that) {
      return this.x * that.y - this.y * that.x;
    }
    /**
     *  unit
     *
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "unit",
    value: function unit() {
      return this.divide(this.length());
    }
    /**
     *  add
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "add",
    value: function add(that) {
      return new this.constructor(this.x + that.x, this.y + that.y);
    }
    /**
     *  subtract
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "subtract",
    value: function subtract(that) {
      return new this.constructor(this.x - that.x, this.y - that.y);
    }
    /**
     *  multiply
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "multiply",
    value: function multiply(scalar) {
      return new this.constructor(this.x * scalar, this.y * scalar);
    }
    /**
     *  divide
     *
     *  @param {number} scalar
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "divide",
    value: function divide(scalar) {
      return new this.constructor(this.x / scalar, this.y / scalar);
    }
    /**
     *  angleBetween
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {number}
     */

  }, {
    key: "angleBetween",
    value: function angleBetween(that) {
      var cos = this.dot(that) / (this.length() * that.length());
      cos = Math.max(-1, Math.min(cos, 1));
      var radians = Math.acos(cos);
      return this.cross(that) < 0.0 ? -radians : radians;
    }
    /**
     *  Find a vector is that is perpendicular to this vector
     *
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "perp",
    value: function perp() {
      return new this.constructor(-this.y, this.x);
    }
    /**
     *  Find the component of the specified vector that is perpendicular to
     *  this vector
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "perpendicular",
    value: function perpendicular(that) {
      return this.subtract(this.project(that));
    }
    /**
     *  project
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "project",
    value: function project(that) {
      var percent = this.dot(that) / that.dot(that);
      return that.multiply(percent);
    }
    /**
     *  transform
     *
     *  @param {module:kld-affine.Matrix2D} matrix
     *  @returns {module:kld-affine.Vector2D}
     */

  }, {
    key: "transform",
    value: function transform(matrix) {
      return new this.constructor(matrix.a * this.x + matrix.c * this.y, matrix.b * this.x + matrix.d * this.y);
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.x === that.x && this.y === that.y;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Vector2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.x - that.x) < precision && Math.abs(this.y - that.y) < precision;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "vector(".concat(this.x, ",").concat(this.y, ")");
    }
  }], [{
    key: "fromPoints",
    value: function fromPoints(p1, p2) {
      return new Vector2D(p2.x - p1.x, p2.y - p1.y);
    }
  }]);

  return Vector2D;
}();

/**
 *  Matrix2D.js
 *  @module Matrix2D
 *  @copyright 2001-2019 Kevin Lindsey
 */

/**
 *  Matrix2D
 *
 *  @memberof module:kld-affine
 */
var Matrix2D =
/*#__PURE__*/
function () {
  /**
   *  A 2D Matrix of the form:<br>
   *  [a c e]<br>
   *  [b d f]<br>
   *  [0 0 1]<br>
   *
   *  @param {number} a
   *  @param {number} b
   *  @param {number} c
   *  @param {number} d
   *  @param {number} e
   *  @param {number} f
   *  @returns {module:kld-affine.Matrix2D}
   */
  function Matrix2D() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var e = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var f = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    _classCallCheck(this, Matrix2D);

    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
  }
  /**
   *  translation
   *
   *  @param {number} tx
   *  @param {number} ty
   *  @returns {module:kld-affine.Matrix2D}
   */


  _createClass(Matrix2D, [{
    key: "multiply",

    /**
     *  multiply
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @returns {module:kld-affine.Matrix2D}
     */
    value: function multiply(that) {
      if (this.isIdentity()) {
        return that;
      }

      if (that.isIdentity()) {
        return this;
      }

      return new this.constructor(this.a * that.a + this.c * that.b, this.b * that.a + this.d * that.b, this.a * that.c + this.c * that.d, this.b * that.c + this.d * that.d, this.a * that.e + this.c * that.f + this.e, this.b * that.e + this.d * that.f + this.f);
    }
    /**
     *  inverse
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "inverse",
    value: function inverse() {
      if (this.isIdentity()) {
        return this;
      }

      var det1 = this.a * this.d - this.b * this.c;

      if (det1 === 0.0) {
        throw new Error("Matrix is not invertible");
      }

      var idet = 1.0 / det1;
      var det2 = this.f * this.c - this.e * this.d;
      var det3 = this.e * this.b - this.f * this.a;
      return new this.constructor(this.d * idet, -this.b * idet, -this.c * idet, this.a * idet, det2 * idet, det3 * idet);
    }
    /**
     *  translate
     *
     *  @param {number} tx
     *  @param {number} ty
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "translate",
    value: function translate(tx, ty) {
      return new this.constructor(this.a, this.b, this.c, this.d, this.a * tx + this.c * ty + this.e, this.b * tx + this.d * ty + this.f);
    }
    /**
     *  scale
     *
     *  @param {number} scale
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scale",
    value: function scale(_scale) {
      return new this.constructor(this.a * _scale, this.b * _scale, this.c * _scale, this.d * _scale, this.e, this.f);
    }
    /**
     *  scaleAt
     *
     *  @param {number} scale
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleAt",
    value: function scaleAt(scale, center) {
      var dx = center.x - scale * center.x;
      var dy = center.y - scale * center.y;
      return new this.constructor(this.a * scale, this.b * scale, this.c * scale, this.d * scale, this.a * dx + this.c * dy + this.e, this.b * dx + this.d * dy + this.f);
    }
    /**
     *  scaleNonUniform
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleNonUniform",
    value: function scaleNonUniform(scaleX, scaleY) {
      return new this.constructor(this.a * scaleX, this.b * scaleX, this.c * scaleY, this.d * scaleY, this.e, this.f);
    }
    /**
     *  scaleNonUniformAt
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaleNonUniformAt",
    value: function scaleNonUniformAt(scaleX, scaleY, center) {
      var dx = center.x - scaleX * center.x;
      var dy = center.y - scaleY * center.y;
      return new this.constructor(this.a * scaleX, this.b * scaleX, this.c * scaleY, this.d * scaleY, this.a * dx + this.c * dy + this.e, this.b * dx + this.d * dy + this.f);
    }
    /**
     *  rotate
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotate",
    value: function rotate(radians) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new this.constructor(this.a * c + this.c * s, this.b * c + this.d * s, this.a * -s + this.c * c, this.b * -s + this.d * c, this.e, this.f);
    }
    /**
     *  rotateAt
     *
     *  @param {number} radians
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotateAt",
    value: function rotateAt(radians, center) {
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      var cx = center.x;
      var cy = center.y;
      var a = this.a * cos + this.c * sin;
      var b = this.b * cos + this.d * sin;
      var c = this.c * cos - this.a * sin;
      var d = this.d * cos - this.b * sin;
      return new this.constructor(a, b, c, d, (this.a - a) * cx + (this.c - c) * cy + this.e, (this.b - b) * cx + (this.d - d) * cy + this.f);
    }
    /**
     *  rotateFromVector
     *
     *  @param {module:kld-affine.Vector2D} vector
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotateFromVector",
    value: function rotateFromVector(vector) {
      var unit = vector.unit();
      var c = unit.x; // cos

      var s = unit.y; // sin

      return new this.constructor(this.a * c + this.c * s, this.b * c + this.d * s, this.a * -s + this.c * c, this.b * -s + this.d * c, this.e, this.f);
    }
    /**
     *  flipX
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "flipX",
    value: function flipX() {
      return new this.constructor(-this.a, -this.b, this.c, this.d, this.e, this.f);
    }
    /**
     *  flipY
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "flipY",
    value: function flipY() {
      return new this.constructor(this.a, this.b, -this.c, -this.d, this.e, this.f);
    }
    /**
     *  skewX
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "skewX",
    value: function skewX(radians) {
      var t = Math.tan(radians);
      return new this.constructor(this.a, this.b, this.c + this.a * t, this.d + this.b * t, this.e, this.f);
    } // TODO: skewXAt

    /**
     *  skewY
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "skewY",
    value: function skewY(radians) {
      var t = Math.tan(radians);
      return new this.constructor(this.a + this.c * t, this.b + this.d * t, this.c, this.d, this.e, this.f);
    } // TODO: skewYAt

    /**
     *  isIdentity
     *
     *  @returns {boolean}
     */

  }, {
    key: "isIdentity",
    value: function isIdentity() {
      return this.a === 1.0 && this.b === 0.0 && this.c === 0.0 && this.d === 1.0 && this.e === 0.0 && this.f === 0.0;
    }
    /**
     *  isInvertible
     *
     *  @returns {boolean}
     */

  }, {
    key: "isInvertible",
    value: function isInvertible() {
      return this.a * this.d - this.b * this.c !== 0.0;
    }
    /**
     *  getScale
     *
     *  @returns {{ scaleX: number, scaleY: number }}
     */

  }, {
    key: "getScale",
    value: function getScale() {
      return {
        scaleX: Math.sqrt(this.a * this.a + this.c * this.c),
        scaleY: Math.sqrt(this.b * this.b + this.d * this.d)
      };
    }
    /**
     *  Calculates matrix Singular Value Decomposition
     *
     *  The resulting matrices — translation, rotation, scale, and rotation0 — return
     *  this matrix when they are multiplied together in the listed order
     *
     *  @see Jim Blinn's article {@link http://dx.doi.org/10.1109/38.486688}
     *  @see {@link http://math.stackexchange.com/questions/861674/decompose-a-2d-arbitrary-transform-into-only-scaling-and-rotation}
     *
     *  @returns {{
     *    translation: module:kld-affine.Matrix2D,
     *    rotation: module:kld-affine.Matrix2D,
     *    scale: module:kld-affine.Matrix2D,
     *    rotation0: module:kld-affine.Matrix2D
     *  }}
     */

  }, {
    key: "getDecomposition",
    value: function getDecomposition() {
      var E = (this.a + this.d) * 0.5;
      var F = (this.a - this.d) * 0.5;
      var G = (this.b + this.c) * 0.5;
      var H = (this.b - this.c) * 0.5;
      var Q = Math.sqrt(E * E + H * H);
      var R = Math.sqrt(F * F + G * G);
      var scaleX = Q + R;
      var scaleY = Q - R;
      var a1 = Math.atan2(G, F);
      var a2 = Math.atan2(H, E);
      var theta = (a2 - a1) * 0.5;
      var phi = (a2 + a1) * 0.5;
      return {
        translation: this.constructor.translation(this.e, this.f),
        rotation: this.constructor.rotation(phi),
        scale: this.constructor.nonUniformScaling(scaleX, scaleY),
        rotation0: this.constructor.rotation(theta)
      };
    }
    /**
     *  equals
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @returns {boolean}
     */

  }, {
    key: "equals",
    value: function equals(that) {
      return this.a === that.a && this.b === that.b && this.c === that.c && this.d === that.d && this.e === that.e && this.f === that.f;
    }
    /**
     *  precisionEquals
     *
     *  @param {module:kld-affine.Matrix2D} that
     *  @param {number} precision
     *  @returns {boolean}
     */

  }, {
    key: "precisionEquals",
    value: function precisionEquals(that, precision) {
      return Math.abs(this.a - that.a) < precision && Math.abs(this.b - that.b) < precision && Math.abs(this.c - that.c) < precision && Math.abs(this.d - that.d) < precision && Math.abs(this.e - that.e) < precision && Math.abs(this.f - that.f) < precision;
    }
    /**
     *  toString
     *
     *  @returns {string}
     */

  }, {
    key: "toString",
    value: function toString() {
      return "matrix(".concat(this.a, ",").concat(this.b, ",").concat(this.c, ",").concat(this.d, ",").concat(this.e, ",").concat(this.f, ")");
    }
  }], [{
    key: "translation",
    value: function translation(tx, ty) {
      return new Matrix2D(1, 0, 0, 1, tx, ty);
    }
    /**
     *  scaling
     *
     *  @param {number} scale
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scaling",
    value: function scaling(scale) {
      return new Matrix2D(scale, 0, 0, scale, 0, 0);
    }
    /**
     *  scalingAt
     *
     *  @param {number} scale
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "scalingAt",
    value: function scalingAt(scale, center) {
      return new Matrix2D(scale, 0, 0, scale, center.x - center.x * scale, center.y - center.y * scale);
    }
    /**
     *  nonUniformScaling
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "nonUniformScaling",
    value: function nonUniformScaling(scaleX, scaleY) {
      return new Matrix2D(scaleX, 0, 0, scaleY, 0, 0);
    }
    /**
     *  nonUniformScalingAt
     *
     *  @param {number} scaleX
     *  @param {number} scaleY
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "nonUniformScalingAt",
    value: function nonUniformScalingAt(scaleX, scaleY, center) {
      return new Matrix2D(scaleX, 0, 0, scaleY, center.x - center.x * scaleX, center.y - center.y * scaleY);
    }
    /**
     *  rotation
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotation",
    value: function rotation(radians) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new Matrix2D(c, s, -s, c, 0, 0);
    }
    /**
     *  rotationAt
     *
     *  @param {number} radians
     *  @param {module:kld-affine.Point2D} center
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotationAt",
    value: function rotationAt(radians, center) {
      var c = Math.cos(radians);
      var s = Math.sin(radians);
      return new Matrix2D(c, s, -s, c, center.x - center.x * c + center.y * s, center.y - center.y * c - center.x * s);
    }
    /**
     *  rotationFromVector
     *
     *  @param {module:kld-affine.Vector2D} vector
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "rotationFromVector",
    value: function rotationFromVector(vector) {
      var unit = vector.unit();
      var c = unit.x; // cos

      var s = unit.y; // sin

      return new Matrix2D(c, s, -s, c, 0, 0);
    }
    /**
     *  xFlip
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "xFlip",
    value: function xFlip() {
      return new Matrix2D(-1, 0, 0, 1, 0, 0);
    }
    /**
     *  yFlip
     *
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "yFlip",
    value: function yFlip() {
      return new Matrix2D(1, 0, 0, -1, 0, 0);
    }
    /**
     *  xSkew
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "xSkew",
    value: function xSkew(radians) {
      var t = Math.tan(radians);
      return new Matrix2D(1, 0, t, 1, 0, 0);
    }
    /**
     *  ySkew
     *
     *  @param {number} radians
     *  @returns {module:kld-affine.Matrix2D}
     */

  }, {
    key: "ySkew",
    value: function ySkew(radians) {
      var t = Math.tan(radians);
      return new Matrix2D(1, t, 0, 1, 0, 0);
    }
  }]);

  return Matrix2D;
}();
/**
 *  Identity matrix
 *
 *  @returns {module:kld-affine.Matrix2D}
 */


Matrix2D.IDENTITY = new Matrix2D();

Matrix2D.IDENTITY.isIdentity = function () {
  return true;
};

/**
 *  @module kld-affine
 */

/**
 *  CubicBezier2D
 */

var CubicBezier2D =
/*#__PURE__*/
function () {
  /**
   *  @param {module:kld-affine.Point2D} p1
   *  @param {module:kld-affine.Point2D} p2
   *  @param {module:kld-affine.Point2D} p3
   *  @param {module:kld-affine.Point2D} p4
   *  @returns {module:kld-contours~CubicBezier2D}
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
   *  @returns {module:kld-affine.Point2D}
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
     *  @returns {Array<module:kld-contours~CubicBezier2D>}
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
     *  @returns {{x: module:kld-polynomial.Polynomial, y: module:kld-polynomial.Polynomial}}
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
     *  @returns {module:kld-polynomial.SqrtPolynomial}
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
     *  @returns {module:kld-contours~BoundingBox2D}
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
     *  @returns {{ bbox: module:kld-contours~BoundingBox2D, transform: module:kld-affine.Matrix2D }}
     */

  }, {
    key: "getAlignedBoundingBox",
    value: function getAlignedBoundingBox() {
      return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: Matrix2D.translation(this.p1.x, this.p1.y).rotateFromVector(Vector2D.fromPoints(this.p1, this.p4))
      };
    }
    /**
     *  getAlignedBezier
     *
     *  @returns {module:kld-contours~CubicBezier2D}
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
     *  @returns {module:kld-contours~Polygon2D}
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
   *  @param {module:kld-affine.Point2D} center
   *  @param {number} radiusX
   *  @param {number} radiusY
   *  @returns {module:kld-contours~Ellipse2D}
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
   *  @returns {module:kld-contours~BoundingBox2D}
   */


  _createClass(Ellipse2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.center.x - this.radiusX, this.center.y - this.radiusY, this.radiusX * 2.0, this.radiusY * 2.0);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
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
   *  @param {module:kld-affine.Point2D} p1
   *  @param {module:kld-affine.Point2D} p2
   *  @returns {module:kld-contours~Line2D}
   */
  function Line2D(p1, p2) {
    _classCallCheck(this, Line2D);

    this.p1 = p1;
    this.p2 = p2;
  }
  /**
   *  getBoundingBox
   *
   *  @returns {module:kld-contours~BoundingBox2D}
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
     *  @returns {module:kld-contours~Polygon2D}
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
   *  @param {module:kld-affine.Point2D} p1
   *  @param {module:kld-affine.Point2D} p2
   *  @param {module:kld-affine.Point2D} p3
   *  @returns {module:kld-contours~QuadraticBezier2D}
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
   *  @returns {module:kld-affine.Point2D}
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
     *  @returns {Array<module:kld-contours~QuadraticBezier2D>}
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
     *  @returns {{x: module:kld-polynomial.Polynomial, y: module:kld-polynomial.Polynomial}}
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
     *  @returns {module:kld-polynomial.SqrtPolynomial}
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
     *  @returns {module:kld-contours~BoundingBox2D}
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
     *  @returns {{ bbox: module:kld-contours~BoundingBox2D, transform: module:kld-affine.Matrix2D }}
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
     *  @returns {module:kld-contours~QuadraticBezier2D}
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
     *  @returns {module:kld-contours~Polygon2D}
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
   *  @returns {module:kld-contours~Rectangle2D}
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
   *  @returns {module:kld-contours~BoundingBox2D}
   */


  _createClass(Rectangle2D, [{
    key: "getBoundingBox",
    value: function getBoundingBox() {
      return new BoundingBox2D(this.x, this.y, this.width, this.height);
    }
    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
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
/**
* @external Polynomial
*/

export { BoundingBox2D, Circle2D, CubicBezier2D, Ellipse2D, Line2D, Matrix2D, Point2D, Polygon2D, QuadraticBezier2D, Rectangle2D, Vector2D };
