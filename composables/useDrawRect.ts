import type {GraphicsInst} from "vue3-pixi";
import {useClamp} from "~/composables/useClamp";

export function useDrawRect(isMobile: boolean, pointerX: number, pointerY: number, sw: number, sh: number, rw: number, rh: number, graphics: GraphicsInst) {

    const uvpos = {
        x: isMobile ? useMap(-0.75, 0.75, 0.0, 1.0, pointerX, true) : useClamp(pointerX / sw, 0.0, 1.0),
        y: isMobile ? useMap(-0.65, 0.65, 0.0, 1.0, pointerY, true) : useClamp(pointerY / sh, 0.0, 1.0)
    }

    const rect = useRectangleFromUV(1.0 - uvpos.x, 1.0 - uvpos.y, 0.0, 0.0, sw, sh, rw, rh)

    graphics.clear()
    graphics.lineStyle(1, 0x00000, 1)
    graphics.beginFill("#FFFFFF")
    graphics.drawRect(0.0, 0.0, rw, rh)
    graphics.endFill()

    return {
        x: rect.x,
        y: rect.y,
        w: rw,
        h: rh
    }

}

