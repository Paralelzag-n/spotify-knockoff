export enum EBaseButtonType{
    outlined = "outlined",
    filled = "filled"
}

export interface IClickCirclePosition{
    top: number,
    left: number
}

export interface IBaseButtonProps{
    type?: EBaseButtonType
}
