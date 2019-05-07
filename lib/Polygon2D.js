/**
 *  Polygon2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module Polygon2D
 */
import BoundingBox2D from "./BoundingBox2D.js";

/**
 *  Polygon2D
 */
class Polygon2D {
    /**
     *  @param {Array<module:kld-affine.Point2D>} points
     *  @returns {module:kld-contours~Polygon2D}
     */
    constructor(points) {
        this.points = (points !== undefined) ? points : [];
    }

    /**
     *  getBoundingBox
     *
     *  @returns {module:kld-contours~BoundingBox2D}
     */
    getBoundingBox() {
        if (this.points.length > 0) {
            let min = this.points[0];
            let max = this.points[0];

            for (let i = 1; i < this.points.length; i++) {
                const point = this.points[i];

                min = min.min(point);
                max = max.max(point);
            }

            return new BoundingBox2D(
                min.x,
                min.y,
                max.x - min.x,
                max.y - max.y
            );
        }

        return new BoundingBox2D(0, 0, 0, 0);
    }

    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
     */
    toPolygon2D() {
        return this;
    }

    /**
     *  toString
     *
     *  @returns {string}
     */
    toString() {
        return this.points.map(p => {
            return `${p.x}, ${p.y}`;
        }).join(" ");
    }
}

export default Polygon2D;
