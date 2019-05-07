/* eslint-disable class-methods-use-this */
/**
 *  Circle2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module Circle2D
 */
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  Circle2D
 */
class Circle2D {
    /**
     *  @param {module:kld-affine.Point2D} center
     *  @param {number} radius
     *  @returns {module:kld-contours~Circle2D}
     */
    constructor(center, radius) {
        this.center = center;
        this.radius = radius;
    }

    /**
     *  getBoundingBox
     *
     *  @returns {module:kld-contours~BoundingBox2D}
     */
    getBoundingBox() {
        return new BoundingBox2D(
            this.center.x - this.radius,
            this.center.y - this.radius,
            this.radius * 2.0,
            this.radius * 2.0
        );
    }

    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
     */
    toPolygon2D() {
        return new Polygon2D();
    }
}

export default Circle2D;
