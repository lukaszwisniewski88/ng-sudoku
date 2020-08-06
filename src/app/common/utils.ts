import { Coordinates } from '../store/board/field.interface'

export const indexTosquare = (index: number): number => {
    return Math.floor(index / 9)
}
export const indexToCoords = (index: number): Coordinates => {
    return {
        x: (index % 9) % 3 + (indexTosquare(index) * 3) % 9,
        y: Math.floor((index % 9) / 3) + Math.floor(indexTosquare(index) / 3) * 3,
    };
};