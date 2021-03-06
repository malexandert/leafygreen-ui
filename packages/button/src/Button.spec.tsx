import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

const onClick = jest.fn();
const className = 'test-button-class';
const title = 'Test button title';
const child = 'Button child';

function renderButton(props = {}) {
  const utils = render(<Button {...props} data-testid="button-id" />);
  const button = utils.getByTestId('button-id');
  return { ...utils, button };
}

describe('packages/button', () => {
  test(`renders "${className}" in the button's classList`, () => {
    const { button } = renderButton({ className });
    expect(button.classList.contains(className)).toBe(true);
  });

  test(`renders "${child}" as the button's textContent`, () => {
    const { button } = renderButton({ children: child });
    expect(button.textContent).toBe(child);
  });

  test(`renders "${title}" as the button title`, () => {
    const { button } = renderButton({ title });
    expect(button.title).toBe(title);
  });

  test('fires the onClick handler once when clicked', () => {
    const { button } = renderButton({ onClick });
    fireEvent.click(button);
    expect(onClick.mock.calls.length).toBe(1);
  });

  test(`renders the disabled and aria-disabled attributes when disabled is set`, () => {
    const { button } = renderButton({ disabled: true });
    expect((button as HTMLButtonElement).disabled).toBe(true);
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders inside of a button tag by default`, () => {
    const { button } = renderButton();
    expect(button.tagName.toLowerCase()).toBe('button');
  });

  test(`renders a button with the "button" type by default`, () => {
    const { button } = renderButton();
    expect((button as HTMLButtonElement).type).toBe('button');
  });

  test(`renders a button with the given type when one is set`, () => {
    const { button } = renderButton({ type: 'submit' });
    expect((button as HTMLButtonElement).type).toBe('submit');
  });

  test(`renders component inside of a tag when "href" prop is set`, () => {
    const { button } = renderButton({ href: 'http://mongodb.design' });
    expect(button.tagName.toLowerCase()).toBe('a');
  });

  test(`does not renders the disabled attributes when disabled is set and it's an anchor`, () => {
    const { button } = renderButton({
      href: 'http://mongodb.design',
      disabled: true,
    });
    expect(button.getAttribute('disabled')).toBeNull();
    expect(button.getAttribute('aria-disabled')).toBe('true');
  });

  test(`renders component inside of a React Element/HTML tag based on as prop`, () => {
    const { button } = renderButton({ as: 'div' });
    expect(button.tagName.toLowerCase()).toBe('div');
  });

  test(`renders a button with an arbitrary element passed in glyph prop`, () => {
    const { button } = renderButton({ glyph: <svg /> });
    expect(button.innerHTML).toContain('svg');
  });
});
