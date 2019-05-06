/* eslint-disable class-methods-use-this */
/**
 *  Ellipse2D
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module Ellipse2D
 */
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  Ellipse2D
 */
class Ellipse2D {
    /**
     *  @param {Point2D} center
     *  @param {number} radiusX
     *  @param {number} radiusY
     *  @returns {Ellipse2D}
     */
    constructor(center, radiusX, radiusY) {
        this.center = center;
        this.radiusX = radiusX;
        this.radiusY = radiusY;
    }

    /**
     *  getBoundingBox
     *
     *  @returns {BoundingBox2D}
     */
    getBoundingBox() {
        return new BoundingBox2D(
            this.center.x - this.radiusX,
            this.center.y - this.radiusY,
            this.radiusX * 2.0,
            this.radiusY * 2.0
        );
    }

    /**
     *  toPolygon2D
     *
     *  @returns {Polygon2D}
     */
    toPolygon2D() {
        return new Polygon2D();
    }
}

export default Ellipse2D;
