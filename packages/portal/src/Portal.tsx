import type { OneOf } from '@leafygreen-ui/lib';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

type PortalProps = {
  children?: React.ReactNode;
} & OneOf<{ container: HTMLElement }, { className?: string }>;

function createPortalContainer(className?: string): HTMLElement {
  const el = document.createElement('div');

  if (className) {
    el.className = className;
  }
  document.body.appendChild(el);

  return el;
}

function Portal(props: PortalProps) {
  const [container] = useState(
    props.container ?? createPortalContainer(props.className),
  );

  // TODO(PD-702): Investigate using `usePrevious` hook from mongo-nav
  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;
    prevPropsRef.current = props;

    if (prevProps.container !== props.container) {
      // Sending consumer console error to control how this component is used
      // eslint-disable-next-line no-console
      console.error(
        'Changing the Portal container is not supported behavior and may cause unintended side effects. Instead, create a new Portal instance.',
      );
      return;
    }

    if (prevProps.className !== props.className) {
      container.className = props.className ?? '';
    }
  });

  useEffect(
    () => () => {
      if (!props.container) {
        container.remove();
      }
    },
    [],
  );

  return createPortal(props.children, container);
}

Portal.displayName = 'Portal';

Portal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  container: PropTypes.oneOfType([PropTypes.node, PropTypes.object]),
};

export default Portal;
