import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { typeIs } from '@leafygreen-ui/lib';
import Code from './Code';

afterAll(cleanup);

const codeSnippet = 'const greeting = "Hello, world!";';
const className = 'test-class';

describe('packages/Syntax', () => {
  const {
    container: { firstChild: containerRoot },
  } = render(<Code className={className}>{codeSnippet}</Code>);

  const codeRoot = (containerRoot as HTMLElement).firstChild;
  const copyableRoot = (containerRoot as HTMLElement).lastChild;

  if (!codeRoot || !typeIs.element(codeRoot)) {
    throw new Error('Code element not found');
  }

  if (!copyableRoot || !typeIs.element(copyableRoot)) {
    throw new Error('Copyable button is not found');
  }

  test('root element renders as a <pre> tag', () => {
    expect(codeRoot.tagName).toBe('PRE');
  });
  test(`renders "${className}" in the root element's classList`, () => {
    expect(codeRoot.classList.contains(className)).toBe(true);
  });

  test('renders copyable button by default', () => {
    expect(copyableRoot.tagName).toBe('BUTTON');
    expect(copyableRoot.innerHTML.includes('Copy')).toBe(true);
  });

  describe('when copyable is false', () => {
    const {
      container: { firstChild: containerRoot },
    } = render(<Code copyable={false}>{codeSnippet}</Code>);

    if (!containerRoot || !typeIs.element(containerRoot)) {
      throw new Error('Code component is not found');
    }

    test('does not render copyable button', () => {
      expect(containerRoot.innerHTML.includes('<button')).toBe(false);
    });
  });
});
