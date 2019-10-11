import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'react-clipboard.js';
import Code, { CodeProps, getCodeProps } from '@leafygreen-ui/code';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Popover from '@leafygreen-ui/popover';
import { Language, Variant } from '@leafygreen-ui/syntax';
import { uiColors } from '@leafygreen-ui/palette';
import { css } from '@leafygreen-ui/emotion';
import omit from 'lodash/omit';

const containerStyle = css`
  position: relative;
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

interface CopyableProps extends CodeProps {
  /**
   * Determines if Copy Button will have text or just an Icon.
   */
  withText?: boolean;
}

function Copyable({ children, withText = true, ...props }: CopyableProps) {
  const [success, setSuccess] = useState(false);

  const onSuccess = () => {
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  const codeProps = getCodeProps({ ...props });

  const rest = omit(props, Object.keys(codeProps));

  return (
    <div {...rest} className={containerStyle}>
      <Code {...codeProps} showWindowChrome={false}>
        {children}
      </Code>
      <Button className={buttonStyle} size="small">
        <Clipboard
          className={clipboardStyle}
          data-clipboard-text={children}
          onSuccess={onSuccess}
          title="copy button"
          component="span"
        />
        <div className={buttonTextStyle} aria-hidden="true" role="presentation">
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
    </div>
  );
}

Copyable.displayName = 'Copyable';

Copyable.propTypes = {
  widthText: PropTypes.bool,
  children: PropTypes.string.isRequired,
  multiline: PropTypes.bool,
  language: PropTypes.oneOf(Object.values(Language)),
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  showLineNumbers: PropTypes.bool,
  showWindowChrome: PropTypes.bool,
  chromeTitle: PropTypes.string,
};

export default Copyable;
