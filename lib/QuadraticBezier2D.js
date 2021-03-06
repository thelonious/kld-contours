/**
 *  QuadraticBezier2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module QuadraticBezier2D
 */
import {Polynomial, SqrtPolynomial} from "kld-polynomial";
import {Matrix2D, Point2D, Vector2D} from "kld-affine";
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  QuadraticBezier2D
 */
class QuadraticBezier2D {
    /**
     *  @param {module:kld-affine.Point2D} p1
     *  @param {module:kld-affine.Point2D} p2
     *  @param {module:kld-affine.Point2D} p3
     *  @returns {module:kld-contours~QuadraticBezier2D}
     */
    constructor(p1, p2, p3) {
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
    getPointAtParameter(t) {
        // TODO: validate t in [0,1]

        // first round of lerps
        const p4 = this.p1.lerp(this.p2, t);
        const p5 = this.p2.lerp(this.p3, t);

        return p4.lerp(p5, t);
    }

    /**
     *  splitAtParameter
     *
     *  @param {number} t
     *  @returns {Array<module:kld-contours~QuadraticBezier2D>}
     */
    splitAtParameter(t) {
        // first round of lerps
        const p4 = this.p1.lerp(this.p2, t);
        const p5 = this.p2.lerp(this.p3, t);

        // second round of lerps
        const p6 = p4.lerp(p5, t);

        return [
            new QuadraticBezier2D(this.p1, p4, p6),
            new QuadraticBezier2D(p6, p5, this.p3)
        ];
    }

    /**
     *  getBernsteinPolynomials
     *
     *  @returns {{x: module:kld-polynomial.Polynomial, y: module:kld-polynomial.Polynomial}}
     */
    getBernsteinPolynomials() {
        let a; // temporary variables

        a = this.p2.multiply(-2);
        const c2 = this.p1.add(a.add(this.p3));

        a = this.p1.multiply(-2);
        const b = this.p2.multiply(2);
        const c1 = a.add(b);

        const c0 = this.p1;

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
    getArcLengthPolynomial() {
        /* eslint-disable-next-line no-prototype-builtins */
        if (!this.hasOwnProperty("arcLengthPolynomial")) {
            let a;

            a = this.p2.multiply(-2);
            const c2 = this.p1.add(a.add(this.p3));

            a = this.p1.multiply(-2);
            const b = this.p2.multiply(2);
            const c1 = a.add(b);

            //  ____________
            // √ dx^2 + dy^2
            //
            this.arcLengthPolynomial = new SqrtPolynomial(
                4 * (c2.x * c2.x + c2.y * c2.y),
                4 * (c1.x * c2.x + c1.y * c2.y),
                c1.x * c1.x + c1.y * c1.y
            );

            // this.arcLength = this.arcLengthPolynomial.romberg(0, 1);
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

        let min = this.p1.min(this.p3);
        let max = this.p1.max(this.p3);

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
            transform: Matrix2D
                .translation(this.p1.x, this.p1.y)
                .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3))
        };
    }

    /**
     *  getAlignedBezier
     *
     *  @returns {module:kld-contours~QuadraticBezier2D}
     */
    getAlignedBezier() {
        const matrix = Matrix2D
            .translation(this.p1.x, this.p1.y) // move p1 to the origin
            .rotateFromVector(Vector2D.fromPoints(this.p1, this.p3)) // rotate vector from p1 to p4 to x-axis
            .inverse(); // reverse transforms

        // apply to each point and create new Bezier
        return new QuadraticBezier2D(
            this.p1.transform(matrix),
            this.p2.transform(matrix),
            this.p3.transform(matrix)
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
         */
        function tesselateInterior(p1, p2, p3) {
            // round 1
            const p4 = p1.lerp(p2, 0.5);
            const p5 = p2.lerp(p3, 0.5);

            // round 2
            const p6 = p4.lerp(p5, 0.5);

            const baseline = Vector2D.fromPoints(p1, p3);
            const tangent = Vector2D.fromPoints(p1, p2);
            let dmax = 0;

            if (zeroVector.equals(tangent) === false) {
                const perpendicular = baseline.perpendicular(tangent);

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
    }

    /**
     *  toString
     *
     *  @returns {string}
     */
    toString() {
        return (
            "M" + this.p1.x + "," + this.p1.y + " " +
            "Q" + this.p2.x + "," + this.p2.y +
            " " + this.p3.x + "," + this.p3.y
        );
    }
}

export default QuadraticBezier2D;
