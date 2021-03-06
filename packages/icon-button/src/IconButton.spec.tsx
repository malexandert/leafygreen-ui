import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IconButton from './IconButton';
import EllipsisIcon from '@leafygreen-ui/icon/dist/Ellipsis';

const onClick = jest.fn();
const className = 'test-icon-button-class';
const iconChild = <EllipsisIcon data-testid="icon-test-id" />;
const titleText = 'My title';

function renderIconButton(props = {}) {
  const utils = render(
    <IconButton
      {...props}
      aria-label="Ellipsis"
      data-testid="icon-button-test"
    />,
  );
  const iconButton = utils.getByTestId('icon-button-test');
  const icon = utils.getByTestId('icon-test-id');
  return { ...utils, iconButton, icon };
}

describe('packages/icon-button', () => {
  test(`renders ${className} in the classList`, () => {
    const { iconButton } = renderIconButton({ className, children: iconChild });
    expect(iconButton.classList.contains(className)).toBe(true);
  });

  test('fires the onClick handler when the IconButton is clicked', () => {
    const { iconButton } = renderIconButton({ onClick, children: iconChild });
    fireEvent.click(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('renders inside a button tag by default', () => {
    const { iconButton } = renderIconButton({ children: iconChild });
    expect(iconButton.tagName.toLocaleLowerCase()).toBe('button');
  });

  test('renders icon as button content', () => {
    const { iconButton, icon } = renderIconButton({ children: iconChild });
    expect(iconButton.contains(icon)).toBe(true);
  });

  test("the rendered icon doesn't include a title tag", () => {
    const { icon } = renderIconButton({ children: iconChild });
    expect(icon.getElementsByTagName('title').length === 0).toBeTruthy();
  });

  test('renders inside an anchor tag when the href prop is set', () => {
    const { iconButton } = renderIconButton({
      href: 'http://mongodb.design',
      children: iconChild,
    });
    expect(iconButton.tagName.toLowerCase()).toBe('a');
  });

  test(`when '${titleText}' is set directly as the title child icon, the rendered icon includes a title tag with the text content, '${titleText}'`, () => {
    const iconWithTitle = (
      <EllipsisIcon data-testid="icon-test-id" title={titleText} />
    );
    const { icon } = renderIconButton({ children: iconWithTitle });

    expect(icon.getElementsByTagName('title')[0].textContent).toBe(titleText);
  });
});
