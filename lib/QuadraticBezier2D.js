if (typeof module !== "undefined") {
    var Polynomial = require('kld-polynomial').Polynomial,
        SqrtPolynomial = require('kld-polynomial').SqrtPolynomial,
        affine = require('kld-affine'),
        Matrix2D = affine.Matrix2D,
        Point2D = affine.Point2D,
        BoundingBox2D = require('./BoundingBox2D');
}

/**
 *  QuadraticBezier2D
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @returns {QuadraticBezier2D}
 */
function QuadraticBezier2D(p1, p2, p3) {
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
    this.flatness = 1;
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
QuadraticBezier2D.prototype.getParameterFromArcLength = function(length) {
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
 *  @returns {BoundingBox2D}
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

    return new BoundingBox2D(
        min.x,
        min.y,
        max.x - min.x,
        max.y - min.y
    );
};

/**
 *  getAlignedBoundingBox
 *
 *  @returns { bbox: BoundingBox2D, transform: Matrix2D }
 */
QuadraticBezier2D.prototype.getAlignedBoundingBox = function() {
    return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: Matrix2D
            .translation(this.p1.x, this.p1.y)
            .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3))
    };
};

/**
 *  getAlignedBezier
 *
 *  @returns {QuadraticBezier2D}
 */
QuadraticBezier2D.prototype.getAlignedBezier = function() {
    let matrix = Matrix2D
        .translation(this.p1.x, this.p1.y)                          // move p1 to the origin
        .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3))    // rotate vector from p1 to p4 to x-axis
        .inverse();                                                 // reverse transforms

    // apply to each point and create new Bezier
    return new QuadraticBezier2D(
        this.p1.transform(matrix),
        this.p2.transform(matrix),
        this.p3.transform(matrix)
    );
};

/**
 *  toPolygon2D
 *
 *  @returns {Polygon2D}
 */
QuadraticBezier2D.prototype.toPolygon2D = function() {
    let points = [];
    let zeroVector = new Vector2D(0, 0);
    let flatness = this.flatness;

    // add first point
    points.push(this.p1);

    // add middle points
    function tesselateInterior(p1, p2, p3) {
        // round 1
        var p4 = p1.lerp(p2, 0.5);
        var p5 = p2.lerp(p3, 0.5);
        
        // round 2
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
        }
        else {
            points.push(new Point2D(p6.x, p6.y));
        }
    }
    
    // add interior points
    tesselateInterior(this.p1, this.p2, this.p3);

    // add last point
    points.push(this.p3);

    return new Polygon2D(points);
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
