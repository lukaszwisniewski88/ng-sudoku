export interface Coordinates {
    x: number
    y: number
}

export interface Field {
    value: number | null
    coordinates: { x: number, y: number }
    selected: boolean
    valid: boolean
    fixed: boolean
}
export interface Fields {
    [index: number]: Field
}
export interface FieldState {
    ids: number[]
    entities: Fields
}