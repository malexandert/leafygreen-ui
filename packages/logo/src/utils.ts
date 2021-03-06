import { uiColors } from '@leafygreen-ui/palette';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { css } from '@leafygreen-ui/emotion';

/**
 * Options to determine color of Logo and LogoMark components
 * @param Dark will render a dark logo, or logo with dark type
 * @param Light will render a white logo, or logo with white type
 */
const Variant = {
  Dark: 'dark',
  Light: 'light',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

export interface LogoProps {
  /**
   * Determines the color variant of the Logo or LogoMark. Can be 'dark' or 'light'.
   *
   * default: `light`
   */
  variant?: Variant;

  /**
   * Determines if Logo or LogoMark will appear in knockout state.
   *
   * default: `false`
   */
  knockout?: boolean;

  /**
   * Determines height of the Logo or LogoMark component.
   *
   * default: 40
   */
  height?: number;
}

const Fill = {
  Dark: uiColors.gray.dark3,
  Light: uiColors.white,
};

type Fill = typeof Fill[keyof typeof Fill];

export { Fill };

export interface SVGLogoProps {
  fill: Fill;
  className: string;
}

export type ProductLogoProps = HTMLElementProps<'svg'> & {
  knockout?: boolean;
  size?: number;
};

export const getColor = (
  knockout: boolean,
  size: number,
  flat: string,
  gradient: string,
) => {
  let fill;

  if (!knockout) {
    if (size <= 10) {
      fill = flat;
    } else {
      fill = gradient;
    }
  } else {
    fill = 'currentColor';
  }

  return css`
    fill: ${fill};
  `;
};
