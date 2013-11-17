if (typeof module !== "undefined") {
    var Polynomial = require('kld-polynomial').Polynomial,
        SqrtPolynomial = require('kld-polynomial').SqrtPolynomial,
        affine = require('kld-affine'),
        Matrix2D = affine.Matrix2D,
        Point2D = affine.Point2D,
        Rectangle2D = require('./Rectangle2D');
}

/**
 *  QuadraticBezier2D
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @returns {QuadraticBezier2D}
 */
function QuadraticBezier2D() {
    Object.defineProperties(this, {
        "p1": {
            value: p1,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "p2": {
            value: p2,
            writable: false,
            enumerable: true,
            configurable: false
        },
        "p3": {
            value: p3,
            writable: false,
            enumerable: true,
            configurable: false
        }
    });
    // this.p1 = p1;
    // this.p2 = p2;
    // this.p3 = p3;
}

/**
 *  getPointAtParameter
 *
 *  @param {Number} t
 *  @eturns {Point2D}
 */
QuadraticBezier2D.prototype.getPointAtParameter = function(t) {
    // TODO: validate t in [0,1]

    // first round of lerps
    var p4 = this.p1.lerp(this.p2, t);
    var p5 = this.p2.lerp(this.p3, t);

    return p4.lerp(p5, t);
};

/**
 *  splitAtParameter
 *
 *  @param {Number} t
 *  @returns {Array<QuadraticBezier2D>}
 */
QuadraticBezier2D.prototype.splitAtParameter = function(t) {
    // first round of lerps
    var p4 = this.p1.lerp(this.p2, t);
    var p5 = this.p2.lerp(this.p3, t);

    // second round of lerps
    var p6 = p4.lerp(p5, t);

    return [
        new QuadraticBezier2D(this.p1, p4, p6),
        new QuadraticBezier2D(p6, p5, this.p3)
    ];
};

/**
 *  getBernsteinPolynomials
 *
 *  @returns {x: Polynomial, y: Polynomial}
 */
QuadraticBezier2D.prototype.getBernsteinPolynomials = function() {
    var a, b;             // temporary variables
    var c2, c1, c0;       // coefficients of quadratic

    a = this.p2.multiply(-2);
    c2 = this.p1.add(a.add(this.p3));

    a = this.p1.multiply(-2);
    b = this.p2.multiply(2);
    c1 = a.add(b);

    c0 = this.p1;

    return {
        x: new Polynomial(c2.x, c1.x, c0.x),
        y: new Polynomial(c2.y, c1.y, c0.y)
    };
};

/**
 *  getArcLengthPolynomial
 *
 *  @returns {SqrtPolynomial}
 */
QuadraticBezier2D.prototype.getArcLengthPolynomial = function() {
    if (!this.hasOwnProperty("arcLengthPolynomial")) {
        var a, b;
        var c1, c2;

        a = this.p2.multiply(-2);
        c2 = this.p1.add(a.add(this.p3));

        a = this.p1.multiply(-2);
        b = this.p2.multiply(2);
        c1 = a.add(b);

        //  ____________
        // √ dx^2 + dy^2
        //
        this.arcLengthPolynomial = new SqrtPolynomial(
            4 * (c2.x*c2.x + c2.y*c2.y),
            4 * (c1.x*c2.x + c1.y*c2.y),
                 c1.x*c1.x + c1.y*c1.y
        );

        // this.arcLength = this.arcLengthPolynomial.romberg(0, 1);
        this.arcLength = this.arcLengthPolynomial.simpson(0, 1);
    }

    return this.arcLengthPolynomial;
};

/**
 *  getParameterFromArcLength
 *
 *  @param {Number} length
 *  @returns {Number}
 */
CubicBezier2D.prototype.getParameterFromArcLength = function(length) {
    // TODO: extract common Bezier code
    
    // make sure the arc length polynomial and arc length values have been calculated
    var arcLengthPolynomial = this.getArcLengthPolynomial();
    var result;

    if (length <= 0) {
        result = 0;
    }
    else if (length >= this.arcLength) {
        result = 1;
    }
    else {
        var TOLERANCE = 1e-9;
        var MAXITERS = 20;

        result = length / this.arcLength;

        for ( var i = 0; i <= MAXITERS; i++ ) {
            var diff = arcLengthPolynomial.romberg(0, result) - length;
            //var diff = arcLengthPolynomial.simpson(0, result) - s;

            if ( Math.abs(diff) < TOLERANCE ) {
                break;
            }

            var value = arcLengthPolynomial.eval(result);

            if ( value == 0 ) {
                break;
            }

            result -= diff / value;
        }
    }

    return result;
};

/**
 *  getBoundingBox
 *
 *  @returns {Rectangle2D}
 */
QuadraticBezier2D.prototype.getBoundingBox = function() {
    var polys = this.getBernsteinPolynomials();
    var dx = polys.x.getDerivative();
    var dy = polys.y.getDerivative();
    var roots = dx.getRootsInInterval(0, 1);
    roots = roots.concat(dy.getRootsInInterval(0, 1));
    // var roots = dx.getRoots();
    // roots = roots.concat(dy.getRoots());

    var min = this.p1.min(this.p3);
    var max = this.p1.max(this.p3);

    roots.forEach(function(t) {
        if (0 <= t && t <= 1) {
            var testPoint = new Point2D(
                polys.x.eval(t),
                polys.y.eval(t)
            );

            min = min.min(testPoint);
            max = max.max(testPoint);
        }
    });

    return new Rectangle2D(
        min.x,
        min.y,
        max.x - min.x,
        max.y - min.y
    );
};

/**
 *  getAlignedBoundingBox
 *
 *  @returns { bbox: Rectangle2D, transform: Matrix2D }
 */
QuadraticBezier2D.prototype.getAlignedBoundingBox = function() {
    return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: new Matrix2D()
            .translate(this.p1.x, this.p1.y)
            .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3))
    };
};

/**
 *  getAlignedBezier
 *
 *  @returns {QuadraticBezier2D}
 */
QuadraticBezier2D.prototype.getAlignedBezier = function() {
    var matrix = new Matrix2D();

    // move p1 to the origin
    matrix = matrix.translate(this.p1.x, this.p1.y);

    // rotate vector from p1 to p4 to x-axis
    matrix = matrix.rotateFromVector(Vector2D.fromPoints(this.p1, this.p3));

    // reverse transforms
    matrix = matrix.inverse();

    // apply to each point and create new Bezier
    return new QuadraticBezier2D(
        this.p1.transform(matrix),
        this.p2.transform(matrix),
        this.p3.transform(matrix)
    );
};

/**
 *  tesselate
 *
 *  @returns {Array<Point2D>}
 */
QuadraticBezier2D.prototype.tesselate = function() {

};

/**
 *  toString
 *
 *  @returns {String}
 */
QuadraticBezier2D.prototype.toString = function() {
    return (
        "M" + this.p1.x + "," + this.p1.y + " " +
        "Q" + this.p2.x + "," + this.p2.y +
        " " + this.p3.x + "," + this.p3.y
    );
};

if (typeof module !== "undefined") {
    module.exports = QuadraticBezier2D;
}
