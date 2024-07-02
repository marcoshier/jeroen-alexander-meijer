export const useRectangleFromUV = (uvx: number, uvy: number, rx: number, ry: number, rw: number, rh: number, srw: number, srh: number) => {
    return {
        x: rx + rw * uvx - srw * uvx,
        y: ry + rh * uvy - srh * uvy
    }
};

