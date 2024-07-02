export function useMap(
    beforeLeft: number, beforeRight: number,
    afterLeft: number, afterRight: number,
    value: number,
    clamp: Boolean = false): number {

    const db = (beforeRight - beforeLeft)
    const da = (afterRight - afterLeft)

    if (db != 0.0) {
        const n = (value - beforeLeft) / db
        return afterLeft + (clamp ? useSaturate(n) : n) * da
    } else {
        const n = value - beforeLeft
        return afterLeft + (clamp ? useSaturate(n) : n) * da
    }
}


export function useSaturate(x: number): number {
    return Math.max(0.0, Math.min(1.0, x))
}