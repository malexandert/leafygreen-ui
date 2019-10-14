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

  const codeRoot = (containerRoot as HTMLElement).lastChild;

  if (!codeRoot || !typeIs.element(codeRoot)) {
    throw new Error('Multiline code element not found');
  }

  test('root element renders as a <pre> tag', () => {
    expect(codeRoot.tagName).toBe('PRE');
  });

  test(`renders "${className}" in the root element's classList`, () => {
    expect(codeRoot.classList.contains(className)).toBe(true);
  });
});
