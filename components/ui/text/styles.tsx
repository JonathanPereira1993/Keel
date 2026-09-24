import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';

const baseStyle = isWeb
  ? 'font-sans tracking-sm my-0 bg-transparent border-0 box-border display-inline list-none margin-0 padding-0 position-relative text-start no-underline whitespace-pre-wrap word-wrap-break-word'
  : '';

// Type scale. Weight comes from the font family (one Inter file per weight),
// never from font-weight, which Android ignores/fakes for custom fonts.
// Arbitrary values are used on purpose: tailwind-merge recognises them as
// font-size / line-height / letter-spacing, so they merge correctly with
// color classes like text-muted-foreground.
const variants = {
  display: 'font-inter-bold text-[44px] leading-[48px] tracking-[-1px]',
  h1: 'font-inter-bold text-[26px] leading-[32px] tracking-[-0.4px]',
  h2: 'font-inter-semibold text-[19px] leading-[24px] tracking-[-0.2px]',
  h3: 'font-inter-semibold text-[16px] leading-[22px]',
  'body-medium': 'font-inter-medium text-[15px] leading-[22px]',
  body: 'font-inter text-[15px] leading-[22px]',
  meta: 'font-inter-medium text-[13px] leading-[18px]',
  caption:
    'font-inter-semibold text-[11.5px] leading-[14px] tracking-[0.9px] uppercase',
};

export const textStyle = tva({
  base: `text-foreground ${baseStyle}`,

  variants: {
    variant: variants,
    isTruncated: {
      true: 'web:truncate',
    },
    bold: {
      true: 'font-inter-bold',
    },
    underline: {
      true: 'underline',
    },
    strikeThrough: {
      true: 'line-through',
    },
    size: {
      '2xs': 'text-2xs',
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
    sub: {
      true: 'text-xs',
    },
    italic: {
      true: 'italic',
    },
    highlight: {
      true: 'bg-yellow-500',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
});
