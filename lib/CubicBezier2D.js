/**
 *  CubicBezier2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module CubicBezier2D
 */
import {Polynomial, SqrtPolynomial} from "kld-polynomial";
import {Matrix2D, Point2D, Vector2D} from "kld-affine";
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  CubicBezier2D
 */
class CubicBezier2D {
    /**
     *  @param {module:kld-affine.Point2D} p1
     *  @param {module:kld-affine.Point2D} p2
     *  @param {module:kld-affine.Point2D} p3
     *  @param {module:kld-affine.Point2D} p4
     *  @returns {module:kld-contours~CubicBezier2D}
     */
    constructor(p1, p2, p3, p4) {
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
    getPointAtParameter(t) {
        // TODO: validate t in [0,1]

        // first round of lerps
        const p5 = this.p1.lerp(this.p2, t);
        const p6 = this.p2.lerp(this.p3, t);
        const p7 = this.p3.lerp(this.p4, t);

        // second round of lerps
        const p8 = p5.lerp(p6, t);
        const p9 = p6.lerp(p7, t);

        return p8.lerp(p9, t);
    }

    /**
     *  splitAtParameter
     *
     *  @param {number} t
     *  @returns {Array<module:kld-contours~CubicBezier2D>}
     */
    splitAtParameter(t) {
        // first round of lerps
        const p5 = this.p1.lerp(this.p2, t);
        const p6 = this.p2.lerp(this.p3, t);
        const p7 = this.p3.lerp(this.p4, t);

        // second round of lerps
        const p8 = p5.lerp(p6, t);
        const p9 = p6.lerp(p7, t);

        // third round of lerps
        const p10 = p8.lerp(p9, t);

        return [
            new CubicBezier2D(this.p1, p5, p8, p10),
            new CubicBezier2D(p10, p9, p7, this.p4)
        ];
    }

    /**
     *  getBernsteinPolynomials
     *
     *  @returns {{x: module:kld-polynomial.Polynomial, y: module:kld-polynomial.Polynomial}}
     */
    getBernsteinPolynomials() {
        let a, b, c;

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
        const c3 = a.add(b.add(c.add(this.p4)));

        a = this.p1.multiply(3);
        b = this.p2.multiply(-6);
        c = this.p3.multiply(3);
        const c2 = a.add(b.add(c));

        a = this.p1.multiply(-3);
        b = this.p2.multiply(3);
        const c1 = a.add(b);

        const c0 = this.p1;

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
    getArcLengthPolynomial() {
        // TODO: use Object.defineProperty
        // TODO: use results from getBernsteinPolynomials but need getCoeficent in
        // Polynomial first

        /* eslint-disable-next-line no-prototype-builtins */
        if (!this.hasOwnProperty("arcLengthPolynomial")) {
            let a, b, c;

            // convert to Bernstein polynomials
            a = this.p1.multiply(-1);
            b = this.p2.multiply(3);
            c = this.p3.multiply(-3);
            const c3 = a.add(b.add(c.add(this.p4)));

            a = this.p1.multiply(3);
            b = this.p2.multiply(-6);
            c = this.p3.multiply(3);
            const c2 = a.add(b.add(c));

            a = this.p1.multiply(-3);
            b = this.p2.multiply(3);
            const c1 = a.add(b);

            //  ____________
            // √ dx^2 + dy^2
            //
            this.arcLengthPolynomial = new SqrtPolynomial(
                9 * (c3.x * c3.x + c3.y * c3.y),
                12 * (c2.x * c3.x + c2.y * c3.y),
                4 * (c2.x * c2.x + c2.y * c2.y) + 6 * (c1.x * c3.x + c1.y * c3.y),
                4 * (c1.x * c2.x + c1.y * c2.y),
                c1.x * c1.x + c1.y * c1.y
            );

            this.arcLength = this.arcLengthPolynomial.romberg(0, 1);
            // this.arcLength = this.arcLengthPolynomial.simpson(0, 1);
        }

        return this.arcLengthPolynomial;
    }

    /**
     *  getParameterFromArcLength
     *
     *  @param {number} arcLength
     *  @returns {number}
     */
    getParameterFromArcLength(arcLength) {
        // TODO: extract common Bezier code

        // make sure the arc length polynomial and arc length values have been calculated
        const arcLengthPolynomial = this.getArcLengthPolynomial();
        let result;

        if (arcLength <= 0) {
            result = 0;
        }
        else if (arcLength >= this.arcLength) {
            result = 1;
        }
        else {
            const TOLERANCE = 1e-9;
            const MAXITERS = 20;

            result = arcLength / this.arcLength;

            for (let i = 0; i <= MAXITERS; i++) {
                const diff = arcLengthPolynomial.romberg(0, result) - arcLength;

                if (Math.abs(diff) < TOLERANCE) {
                    break;
                }

                const value = arcLengthPolynomial.eval(result);

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
    getBoundingBox() {
        const polys = this.getBernsteinPolynomials();
        const dx = polys.x.getDerivative();
        const dy = polys.y.getDerivative();
        let roots = dx.getRootsInInterval(0, 1);

        roots = roots.concat(dy.getRootsInInterval(0, 1));

        // initialize min/max using the first and last points on the curve
        let min = this.p1.min(this.p4);
        let max = this.p1.max(this.p4);

        // and now update min/max with points between p1 and p4
        roots.forEach(function(t) {
            if (0 <= t && t <= 1) {
                const testPoint = new Point2D(
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
    }

    /**
     *  getAlignedBoundingBox
     *
     *  @returns {{ bbox: module:kld-contours~BoundingBox2D, transform: module:kld-affine.Matrix2D }}
     */
    getAlignedBoundingBox() {
        return {
            bbox: this.getAlignedBezier().getBoundingBox(),
            transform: new Matrix2D()
                .translation(this.p1.x, this.p1.y)
                .rotateFromVector(Vector2D.fromPoints(this.p1, this.p4))
        };
    }

    /**
     *  getAlignedBezier
     *
     *  @returns {module:kld-contours~CubicBezier2D}
     */
    getAlignedBezier() {
        const matrix = Matrix2D
            .translation(this.p1.x, this.p1.y) // move p1 to the origin
            .rotateFromVector(Vector2D.fromPoints(this.p1, this.p4)) // rotate vector from p1 to p4 to x-axis
            .inverse(); // reverse transforms

        // apply to each point and create new Bezier
        return new CubicBezier2D(
            this.p1.transform(matrix),
            this.p2.transform(matrix),
            this.p3.transform(matrix),
            this.p4.transform(matrix)
        );
    }

    /**
     *  toPolygon2D
     *
     *  @param {number} [flatness]
     *  @returns {module:kld-contours~Polygon2D}
     */
    toPolygon2D(flatness) {
        const points = [];
        const zeroVector = new Vector2D(0, 0);

        flatness = flatness !== undefined ? flatness : 1.0;

        // add first point
        points.push(this.p1);

        // add middle points
        /**
         *  @param {number} p1
         *  @param {number} p2
         *  @param {number} p3
         *  @param {number} p4
         */
        function tesselateInterior(p1, p2, p3, p4) {
            // round 1
            const p5 = p1.lerp(p2, 0.5);
            const p6 = p2.lerp(p3, 0.5);
            const p7 = p3.lerp(p4, 0.5);

            // round 2
            const p8 = p5.lerp(p6, 0.5);
            const p9 = p6.lerp(p7, 0.5);

            // round 3
            const p10 = p8.lerp(p9, 0.5);

            const baseline = Vector2D.fromPoints(p1, p4);
            const tangent1 = Vector2D.fromPoints(p1, p2);
            const tangent2 = Vector2D.fromPoints(p4, p3);
            let dmax = 0;

            if (zeroVector.equals(tangent1) === false) {
                const perpendicular = baseline.perpendicular(tangent1);

                dmax = perpendicular.length();
            }
            if (zeroVector.equals(tangent2) === false) {
                const perpendicular = baseline.perpendicular(tangent2);

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
    }

    /**
     *  toString
     *
     *  @returns {string}
     */
    toString() {
        return (
            "M" + this.p1.x + "," + this.p1.y + " " +
            "C" + this.p2.x + "," + this.p2.y +
            " " + this.p3.x + "," + this.p3.y +
            " " + this.p4.x + "," + this.p4.y
        );
    }
}

export default CubicBezier2D;
