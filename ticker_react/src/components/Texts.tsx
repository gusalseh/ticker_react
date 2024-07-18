import type { FC, DetailedHTMLProps, HTMLAttributes } from "react";

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export type TitleProps = TextProps & {
  numberOfLines?: number;
};

// <Title> 태그 CSS
export const Title: FC<TitleProps> = ({
  className: _className,
  numberOfLines,
  ...props
}) => {
  const className = makeClassName(
    "font-bold text-5xl text-center whitespace-pre-line text-orange-400",
    _className,
    numberOfLines
  );
  return <p {...props} className={className} />;
};

export const makeClassName = (
  setting: string,
  _className?: string,
  numberOfLines?: number
) =>
  [
    setting,
    numberOfLines ? `line-clamp-${numberOfLines}` : "",
    _className,
  ].join(" ");
