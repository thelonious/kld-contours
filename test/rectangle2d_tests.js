import assert from "assert";
import {Point2D} from "kld-affine";
import CubicBezier2D from "../lib/CubicBezier2D.js";

describe("Test", () => {
    describe("Evaluate Cubic Bezier", () => {
        it("Point at start", () => {
            const p1 = new Point2D(0, 0);
            const p2 = new Point2D(100, 0);
            const p3 = new Point2D(100, 100);
            const p4 = new Point2D(0, 100);
            const bezier = new CubicBezier2D(p1, p2, p3, p4);

            const r = bezier.getPointAtParameter(0);
            assert.strictEqual(0.0, r.x);
            assert.strictEqual(0.0, r.y);
        });
        it("Point at end", () => {
            const p1 = new Point2D(0, 0);
            const p2 = new Point2D(100, 0);
            const p3 = new Point2D(100, 100);
            const p4 = new Point2D(0, 100);
            const bezier = new CubicBezier2D(p1, p2, p3, p4);

            const r = bezier.getPointAtParameter(1);
            assert.strictEqual(0.0, r.x);
            assert.strictEqual(100.0, r.y);
        });
    });
});
