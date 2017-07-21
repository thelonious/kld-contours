if (typeof module !== "undefined") {
    var Polynomial     = require('kld-polynomial').Polynomial,
        SqrtPolynomial = require('kld-polynomial').SqrtPolynomial,
        affine         = require('kld-affine'),
        Matrix2D       = affine.Matrix2D,
        Point2D        = affine.Point2D,
        Vector2D       = affine.Vector2D,
        BoundingBox2D  = require('./BoundingBox2D'),
        Polygon2D      = require('./Polygon2D');
}

/**
 *  CubicBezier2D
 *
 *  @param {Point2D} p1
 *  @param {Point2D} p2
 *  @param {Point2D} p3
 *  @param {Point2D} p3
 *  @returns {CubicBezier2D}
 */
function CubicBezier2D(p1, p2, p3, p4) {
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
        },
        "p4": {
            value: p4,
            writable: false,
            enumerable: true,
            configurable: false
        }
    });
}

/**
 *  getPointAtParameter
 *
 *  @param {Number} t
 *  @eturns {Point2D}
 */
CubicBezier2D.prototype.getPointAtParameter = function(t) {
    // TODO: validate t in [0,1]

    // first round of lerps
    var p5 = this.p1.lerp(this.p2, t);
    var p6 = this.p2.lerp(this.p3, t);
    var p7 = this.p3.lerp(this.p4, t);

    // second round of lerps
    var p8 = p5.lerp(p6, t);
    var p9 = p6.lerp(p7, t);

    return p8.lerp(p9, t);
};

/**
 *  splitAtParameter
 *
 *  @param {Number} t
 *  @returns {Array<CubicBezier2D>}
 */
CubicBezier2D.prototype.splitAtParameter = function(t) {
    // first round of lerps
    var p5 = this.p1.lerp(this.p2, t);
    var p6 = this.p2.lerp(this.p3, t);
    var p7 = this.p3.lerp(this.p4, t);

    // second round of lerps
    var p8 = p5.lerp(p6, t);
    var p9 = p6.lerp(p7, t);

    // third round of lerps
    var p10 = p8.lerp(p9, t);

    return [
        new CubicBezier2D(this.p1, p5, p8, p10),
        new CubicBezier2D(p10, p9, p7, this.p4)
    ];
};

/**
 *  getBernsteinPolynomials
 *
 *  @returns {x: Polynomial, y: Polynomial}
 */
CubicBezier2D.prototype.getBernsteinPolynomials = function() {
    var a, b, c;        // temporary variables
    var c3, c2, c1, c0; // coefficients of cubic

    // Start with Bezier using Bernstein polynomials for weighting functions:
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
    c3 = a.add(b.add(c.add(this.p4)));

    a = this.p1.multiply(3);
    b = this.p2.multiply(-6);
    c = this.p3.multiply(3);
    c2 = a.add(b.add(c));

    a = this.p1.multiply(-3);
    b = this.p2.multiply(3);
    c1 = a.add(b);

    c0 = this.p1;

    return {
        x: new Polynomial(c3.x, c2.x, c1.x, c0.x),
        y: new Polynomial(c3.y, c2.y, c1.y, c0.y)
    };
};

/**
 *  getArcLengthPolynomial
 *
 *  @returns {SqrtPolynomial}
 */
CubicBezier2D.prototype.getArcLengthPolynomial = function() {
    // TODO: use Object.defineProperty
    // TODO: use results from getBernsteinPolynomials but need getCoeficent in
    // Polynomial first

    if (!this.hasOwnProperty("arcLengthPolynomial")) {
        var a, b, c;
        var c1, c2, c3;

        // convert to Bernstein polynomials
        a = this.p1.multiply(-1);
        b = this.p2.multiply(3);
        c = this.p3.multiply(-3);
        c3 = a.add(b.add(c.add(this.p4)));

        a = this.p1.multiply(3);
        b = this.p2.multiply(-6);
        c = this.p3.multiply(3);
        c2 = a.add(b.add(c));

        a = this.p1.multiply(-3);
        b = this.p2.multiply(3);
        c1 = a.add(b);

        //  ____________
        // √ dx^2 + dy^2
        //
        this.arcLengthPolynomial = new SqrtPolynomial(
             9 * (c3.x*c3.x + c3.y*c3.y),
            12 * (c2.x*c3.x + c2.y*c3.y),
             4 * (c2.x*c2.x + c2.y*c2.y) + 6 * (c1.x*c3.x + c1.y*c3.y),
             4 * (c1.x*c2.x + c1.y*c2.y),
                  c1.x*c1.x + c1.y*c1.y
        );

        this.arcLength = this.arcLengthPolynomial.romberg(0, 1);
        // this.arcLength = this.arcLengthPolynomial.simpson(0, 1);
    }

    return this.arcLengthPolynomial
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
 *  @returns {BoundingBox2D}
 */
CubicBezier2D.prototype.getBoundingBox = function() {
    var polys = this.getBernsteinPolynomials();
    var dx = polys.x.getDerivative();
    var dy = polys.y.getDerivative();
    var roots = dx.getRootsInInterval(0, 1);
    roots = roots.concat(dy.getRootsInInterval(0, 1));
    // var roots = dx.getRoots();
    // roots = roots.concat(dy.getRoots());

    // initialize min/max using the first and last points on the curve
    var min = this.p1.min(this.p4);
    var max = this.p1.max(this.p4);

    // and now update min/max with points between p1 and p4
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
CubicBezier2D.prototype.getAlignedBoundingBox = function() {
    return {
        bbox: this.getAlignedBezier().getBoundingBox(),
        transform: new Matrix2D
            .translation(this.p1.x, this.p1.y)
            .rotateFromVector(Vector2D.fromPoints(this.p1, this.p4))
    };
};

/**
 *  getAlignedBezier
 *
 *  @returns {CubicBezier2D}
 */
CubicBezier2D.prototype.getAlignedBezier = function() {
    let matrix = Matrix2D
        .translation(this.p1.x, this.p1.y)                          // move p1 to the origin
        .rotateFromVector(Vector2D.fromPoints(this.p1, this.p4))    // rotate vector from p1 to p4 to x-axis
        .inverse();                                                 // reverse transforms

    // apply to each point and create new Bezier
    return new CubicBezier2D(
        this.p1.transform(matrix),
        this.p2.transform(matrix),
        this.p3.transform(matrix),
        this.p4.transform(matrix)
    );
};

/**
 *  toPolygon2D
 *
 *  @param {Number} [flatness]
 *  @returns {Polygon2D}
 */
CubicBezier2D.prototype.toPolygon2D = function(flatness) {
    let points = [];
    let zeroVector = new Vector2D(0, 0);
    
    flatness = flatness !== undefined ? flatness : 1.0;

    // add first point
    points.push(this.p1);

    // add middle points
    function tesselateInterior(p1, p2, p3, p4) {
        // round 1
        var p5 = p1.lerp(p2, 0.5);
        var p6 = p2.lerp(p3, 0.5);
        var p7 = p3.lerp(p4, 0.5);
        
        // round 2
        var p8 = p5.lerp(p6, 0.5);
        var p9 = p6.lerp(p7, 0.5);
        
        // round 3
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
            var perpendicular = baseline.perpendicular(tangent2);
            
            dmax = Math.max(dmax, perpendicular.length());
        }
        
        if (dmax > flatness) {
            tesselateInterior(p1, p5, p8, p10);
            points.push(new Point2D(p10.x, p10.y));
            tesselateInterior(p10, p9, p7, p4);
        }
        else {
            points.push(new Point2D(p10.x, p10.y));
        }
    }
    
    // add interior points
    tesselateInterior(this.p1, this.p2, this.p3, this.p4);

    // add last point
    points.push(this.p4);

    return new Polygon2D(points);
};

/**
 *  toString
 *
 *  @returns {String}
 */
CubicBezier2D.prototype.toString = function() {
    return (
        "M" + this.p1.x + "," + this.p1.y + " " +
        "C" + this.p2.x + "," + this.p2.y +
        " " + this.p3.x + "," + this.p3.y +
        " " + this.p4.x + "," + this.p4.y
    );
};

if (typeof module !== "undefined") {
    module.exports = CubicBezier2D;
}
