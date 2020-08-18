export interface Coordinates {
    x: number
    y: number
}
export interface ValidationErrors {
    row: boolean
    col: boolean
    square: boolean
}

export interface Field {
    value: number | null
    coordinates: { x: number, y: number }
    selected: boolean
    valid: boolean
    conflicts: number[]
    conflicted: boolean
    fixed: boolean
}
export interface CoordsMapping {
    [index: string]: number
}
export interface Fields {
    [index: number]: Field
}
export interface SelectedStore {
    coords: Coordinates | null,
    index: number | null
}

export interface FieldState {
    ids: number[]
    entities: Fields,
    coordsMap: CoordsMapping,
    loadingIndicator: boolean,
    fieldsToSolve: number,
    actuallySelected: SelectedStore
}