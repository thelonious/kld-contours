import {Point2D} from "kld-affine";
import CubicBezier2D from "../lib/CubicBezier2D.js";

describe("Test", () => {
    it("tests", () => {
        // TODO:
        const p1 = new Point2D(0, 0);
        const p2 = new Point2D(100, 0);
        const p3 = new Point2D(100, 100);
        const p4 = new Point2D(0, 100);
        const bezier = new CubicBezier2D(p1, p2, p3, p4);

        bezier.getPointAtParameter(0);
    });
});
