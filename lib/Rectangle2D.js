/**
 *  Rectangle2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module Rectangle2D
 */
import {Point2D} from "kld-affine";
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  Rectangle2D
 */
class Rectangle2D {
    /**
     *  @param {number} x
     *  @param {number} y
     *  @param {number} width
     *  @param {number} height
     *  @returns {module:kld-contours~Rectangle2D}
     */
    constructor(x, y, width, height) {
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
    getBoundingBox() {
        return new BoundingBox2D(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours~Polygon2D}
     */
    toPolygon2D() {
        return new Polygon2D([
            new Point2D(this.x, this.y),
            new Point2D(this.x + this.width, this.y),
            new Point2D(this.x + this.width, this.y + this.height),
            new Point2D(this.x, this.y + this.height)
        ]);
    }
}

export default Rectangle2D;
