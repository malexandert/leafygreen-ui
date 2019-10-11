import React from 'react';
import { storiesOf } from '@storybook/react';
import { select, boolean, text } from '@storybook/addon-knobs';
import { Variant, Language } from '@leafygreen-ui/syntax';
import Copyable from './Copyable';

const multilineCodeSnippet = `
  function greeting(entity) {
    return \`Hello, \${entity}!\`;
  }

  console.log(greeting('World'));
`;

const singleLineCodeSnippet = `console.log('hello world')`;

storiesOf('Copyable', module)
  .add('Multiline', () => (
    <Copyable
      withText={boolean('withText', true)}
      showLineNumbers={boolean('Show line numbers', false)}
      multiline={boolean('Multiline', true)}
      chromeTitle={text('Chrome label', 'directory/fileName.js')}
      variant={select('Variant', Object.values(Variant), Variant.Light)}
      language={select('Language', Object.values(Language), Language.Auto)}
    >
      {multilineCodeSnippet}
    </Copyable>
  ))
  .add('Singleline', () => (
    <Copyable
      withText={boolean('withText', false)}
      showLineNumbers={boolean('Show line numbers', false)}
      multiline={boolean('Multiline', true)}
      chromeTitle={text('Chrome label', 'directory/fileName.js')}
      variant={select('Variant', Object.values(Variant), Variant.Dark)}
      language={select('Language', Object.values(Language), Language.Auto)}
    >
      {singleLineCodeSnippet}
    </Copyable>
  ));
