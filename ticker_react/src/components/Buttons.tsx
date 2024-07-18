import type { FC, DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type CustomButtonProps = ButtonProps & {
  optionalStyle?: string;
};

export const makeBtnClassName = (
  setting: string,
  _className?: string,
  optionalStyle?: string
) => [setting, _className, optionalStyle].join(" ");

export const Button: FC<CustomButtonProps> = ({
  className: _className,
  optionalStyle = "",
  ...props
}) => {
  const className = makeBtnClassName(
    "btn btn-square font-sans text-white font-bold bg-orange-400",
    _className,
    optionalStyle
  );
  return <button {...props} className={className} />;
};

export default Button;
