/**
 *  Line2D.js
 *
 *  @copyright 2011-2019 Kevin Lindsey
 *  @module Line2D
 */
import BoundingBox2D from "./BoundingBox2D.js";
import Polygon2D from "./Polygon2D.js";

/**
 *  Line2D
 */
class Line2D {
    /**
     *  @param {module:kld-affine.Point2D} p1
     *  @param {module:kld-affine.Point2D} p2
     *  @returns {module:kld-contours.Line2D}
     */
    constructor(p1, p2) {
        this.p1 = p1;
        this.p2 = p2;
    }

    /**
     *  getBoundingBox
     *
     *  @returns {module:kld-contours.BoundingBox2D}
     */
    getBoundingBox() {
        const min = this.p1.min(this.p2);
        const max = this.p1.max(this.p2);

        return new BoundingBox2D(
            min.x,
            min.y,
            max.x - min.x,
            max.y - min.y
        );
    }

    /**
     *  toPolygon2D
     *
     *  @returns {module:kld-contours.Polygon2D}
     */
    toPolygon2D() {
        return new Polygon2D([this.p1, this.p2]);
    }
}

export default Line2D;
