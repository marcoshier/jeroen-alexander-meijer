export const useRandomPosition = (x: number, y: number, width: number, height: number) => {
    return {
        x: Math.random() * width + x,
        y: Math.random() * height + y
    }
};