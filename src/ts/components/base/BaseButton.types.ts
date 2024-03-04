export enum EBaseButtonType {
  outlined = "outlined",
  filled = "filled",
}

export interface IBaseButtonProps {
  type?: EBaseButtonType;
  icon?: boolean;
}
