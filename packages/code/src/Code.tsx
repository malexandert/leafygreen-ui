import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Syntax, {
  SyntaxProps,
  Variant,
  Language,
  variantColors,
} from '@leafygreen-ui/syntax';
import LineNumbers from './LineNumbers';
import WindowChrome from './WindowChrome';
import Clipboard from 'react-clipboard.js';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Popover from '@leafygreen-ui/popover';
import { uiColors } from '@leafygreen-ui/palette';

function stringFragmentIsBlank(str: string): str is '' | ' ' {
  return str === '' || str === ' ';
}

interface ProcessedCodeSnippet {
  /**
   * A processed string where any line breaks at the beginning or end
   * of the string are trimmed.
   */
  content: string;

  /**
   * A count of the number of separate lines in a given string.
   */
  lineCount: number;
}

function useProcessedCodeSnippet(snippet: string): ProcessedCodeSnippet {
  return useMemo(() => {
    const splitString = snippet.split(/\r|\n/);

    // If first line is blank, remove the first line.
    // This is likely to be common when someone assigns a template literal
    // string to a variable, and doesn't add an '\' escape character after
    // breaking to a new line before the first line of code.
    while (stringFragmentIsBlank(splitString[0])) {
      splitString.shift();
    }

    // If the last line is blank, remove the last line of code.
    // This is a similar issue to the one above.
    while (stringFragmentIsBlank(splitString[splitString.length - 1])) {
      splitString.pop();
    }

    return {
      content: splitString.join('\n'),
      lineCount: splitString.length,
    };
  }, [snippet]);
}

const whiteSpace = 24;

const codeWrapperStyle = css`
  overflow-x: auto;
  border-left: 2px solid;
  padding: ${whiteSpace}px;
  margin: 0;
  position: relative;
`;

const codeWrapperStyleWithLineNumbers = css`
  padding-left: ${whiteSpace * 1.75}px;
`;

const codeWrapperStyleWithWindowChrome = css`
  border-left: 0;
`;

const buttonStyle = css`
  position: absolute;
  top: 0;
  right: 0;
`;

const clipboardStyle = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: none;
  border: none;
  cursor: pointer;
`;

const buttonTextStyle = css`
  display: flex;
  justify-content: center;
`;

const spanMargin = css`
  margin-left: 2px;
  margin-right: 2px;
`;

const successMessage = css`
  font-size: 12px;
  background-color: ${uiColors.gray.dark3};
  color: ${uiColors.gray.light3};
  padding: 8px 12px 8px 10px;
  display: flex;
  align-items: center;
  line-height: 12px;
  border-radius: 3px;
  box-shadow: 0px 3px 2px -2px rgba(0, 0, 0, 0.3);
`;

function getWrapperVariantStyle(variant: Variant): string {
  const colors = variantColors[variant];

  return css`
    border-color: ${colors[1]};
    background-color: ${colors[0]};
    color: ${colors[3]};
  `;
}

export interface CodeProps extends SyntaxProps {
  /**
   * Shows line numbers in preformatted code blocks.
   *
   * default: `false`
   */
  showLineNumbers?: boolean;

  /**
   * Shows window chrome for code block;
   *
   * default: `false`
   */
  showWindowChrome?: boolean;

  /**
   * Renders a file name or other descriptor for a block of code
   */
  chromeTitle?: string;

  /**
   * Determines if copyable button will appear next to code block.
   *
   * default: `true`
   * */
  copyable?: boolean;

  /**
   * Determines if copyable button has text next to the copyable `Icon`.
   *
   * default: `true`
   * */
  withText?: boolean;
}

type DetailedElementProps<T> = React.DetailedHTMLProps<
  React.HTMLAttributes<T>,
  T
>;

/**
 * # Code
 *
 * React Component that outputs code blocks.
 *
 * ```
<Code>Hello world!</Code>
	```
 * ---
 * @param props.children The string to be formatted.
 * @param props.className An additional CSS class added to the root element of Code.
 * @param props.lang The language used for syntax highlighing. Default: `auto`
 * @param props.variant Determines if the code block is rendered with a dark or light background. Default: 'light'
 * @param props.showLineNumbers When true, shows line numbers in preformatted code blocks. Default: `false`
 * @param props.copyable Determines if copyable button will appear next to code block. Default: `true`
 * @param props.withText Determines if copyable button has text next to the copyable `Icon`.
 */
function Code({
  children = '',
  className,
  language = Language.Auto,
  variant = Variant.Light,
  showLineNumbers = false,
  showWindowChrome = false,
  chromeTitle = '',
  copyable = true,
  withText = true,
  ...rest
}: CodeProps) {
  const [success, setSuccess] = useState(false);

  const onSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  const wrapperStyle = css`
    display: inline-block;
    border: 1px solid ${variantColors[variant][1]};
    border-radius: 4px;
    overflow: hidden;
    position: relative;
  `;

  const wrapperClassName = cx(
    codeWrapperStyle,
    getWrapperVariantStyle(variant),
    {
      [codeWrapperStyleWithLineNumbers]: showLineNumbers,
      [codeWrapperStyleWithWindowChrome]: showWindowChrome,
    },
    className,
  );

  const { content, lineCount } = useProcessedCodeSnippet(children);

  const renderedWindowChrome = showWindowChrome && (
    <WindowChrome chromeTitle={chromeTitle} variant={variant} />
  );

  const renderedSyntaxComponent = (
    <Syntax variant={variant} language={language}>
      {content}
    </Syntax>
  );

  return (
    <div className={wrapperStyle}>
      {renderedWindowChrome}

      <pre
        {...(rest as DetailedElementProps<HTMLPreElement>)}
        className={wrapperClassName}
      >
        {showLineNumbers && (
          <LineNumbers variant={variant} lineCount={lineCount} />
        )}

        {renderedSyntaxComponent}
      </pre>
      {copyable && (
        <Button className={buttonStyle} size="small">
          <Clipboard
            className={clipboardStyle}
            data-clipboard-text={children}
            onSuccess={onSuccess}
            title="copy button"
            component="span"
          />
          <div
            className={buttonTextStyle}
            aria-hidden="true"
            role="presentation"
          >
            <Icon glyph="Copy" size="small" />
            {withText && <span className={spanMargin}>Copy</span>}
          </div>
          <Popover active={success} align="top" justify="end">
            <div className={successMessage}>
              <Icon
                glyph="CheckmarkWithCircle"
                size="small"
                className={css`
                  margin-right: 0.35em;
                `}
                color={uiColors.green.base}
              />
              Copied
            </div>
          </Popover>
        </Button>
      )}
    </div>
  );
}

Code.displayName = 'Code';

Code.propTypes = {
  children: PropTypes.string.isRequired,
  language: PropTypes.oneOf(Object.values(Language)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
  copyable: PropTypes.bool,
  withText: PropTypes.bool,
};

export default Code;
