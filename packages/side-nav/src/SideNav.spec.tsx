import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { SideNav, SideNavGroup, SideNavItem } from './index';
import { SideNavItemProps } from './SideNavItem';

type renderedElement = HTMLElement | null;
type header = React.ReactNode;

interface RenderedElements {
  navEl?: renderedElement;
  groupEl?: renderedElement;
  headerContentEl?: renderedElement;
  defaultHeaderEl?: renderedElement;
  itemEl?: renderedElement;
  childEl?: renderedElement;
}

describe('packages/side-nav', () => {
  const testIds = {
    sideNav: 'side-nav',
    sideNavGroup: 'side-nav-group',
    sideNavHeader: 'side-nav-header',
    sideNavItem: 'side-nav-item',
    sideNavLink: 'side-nav-link',
  };
  let renderedEls: RenderedElements = {};

  const className = 'test-class-name';
  const headerText = 'test-header-text';
  const headerContent = (
    <div data-testid={testIds.sideNavHeader}>Header As Content</div>
  );

  afterEach(() => {
    document.body.innerHTML = '';
    renderedEls = {};
    cleanup();
  });

  describe('SideNavItem', () => {
    function renderSideNavItem(props: SideNavItemProps = {}) {
      const { sideNavItem, sideNavLink } = testIds;
      const { children, ...rest } = props;
      const { getByTestId, queryByTestId } = render(
        <SideNavItem data-testid={sideNavItem} {...rest}>
          {children}
        </SideNavItem>,
      );

      renderedEls.itemEl = getByTestId(sideNavItem);
      renderedEls.childEl = queryByTestId(sideNavLink);
    }

    describe('when rendered with a custom class name', () => {
      beforeEach(() => {
        renderSideNavItem({ className });
      });

      test('it renders the item as a button', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('BUTTON');
      });

      test('it sets the correct role for the item', () => {
        expect(renderedEls.itemEl).toHaveAttribute('role', 'menuitem');
        expect(renderedEls.itemEl?.parentNode).toHaveAttribute('role', 'none');
      });

      test('it renders with the provided class name', () => {
        expect(renderedEls.itemEl).toHaveClass(className);
      });
    });

    describe('when rendered as active', () => {
      beforeEach(() => {
        renderSideNavItem({ active: true });
      });

      test('it sets the aria attribute for the active item', () => {
        expect(renderedEls.itemEl).toHaveAttribute('aria-current', 'page');
      });
    });

    describe('when rendered as disabled', () => {
      beforeEach(() => {
        renderSideNavItem({ disabled: true });
      });

      test('it sets the aria attribute for the disabled item', () => {
        expect(renderedEls.itemEl).toHaveAttribute('aria-disabled', 'true');
      });
    });

    describe('when rendered as a link', () => {
      beforeEach(() => {
        renderSideNavItem({ href: '/v2#' });
      });

      test('it renders as an link menu item', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('A');
        expect(renderedEls.itemEl).toHaveAttribute('href', '/v2#');
      });
    });

    describe('when rendered with children', () => {
      beforeEach(() => {
        const { sideNavLink } = testIds;
        const children = (
          <a href="#clusters" data-testid={sideNavLink}>
            Clusters
          </a>
        );

        renderSideNavItem({ children });
      });

      test('it renders the children', () => {
        expect(renderedEls.childEl).toBeInTheDocument();
        expect(renderedEls.childEl?.tagName).toEqual('A');
        expect(renderedEls.childEl).toHaveAttribute('href', '#clusters');
      });
    });

    describe('when rendered as a custom component', () => {
      beforeEach(() => {
        interface ImageFigureProps {
          imageUrl: string;
          imageAlt: string;
          caption: string;
        }

        function ImageFigure({
          imageUrl,
          imageAlt,
          caption,
          ...rest
        }: ImageFigureProps) {
          return (
            <figure {...rest}>
              <img src={imageUrl} alt={imageAlt} />
              <figcaption>{caption}</figcaption>
            </figure>
          );
        }

        const { sideNavItem } = testIds;
        const props = {
          as: ImageFigure,
          imageUrl: '/dogeSelfPortrait',
          imageAlt: 'such wow',
          caption: 'such art',
        };

        const { getByTestId } = render(
          <SideNavItem data-testid={sideNavItem} {...props} />,
        );

        renderedEls.itemEl = getByTestId(sideNavItem);
      });

      test('it renders as the custom component', () => {
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.itemEl?.tagName).toEqual('FIGURE');

        const imgEl = renderedEls.itemEl?.querySelector('img');
        expect(imgEl).toBeInTheDocument();
        expect(imgEl).toHaveAttribute('src', '/dogeSelfPortrait');
        expect(imgEl).toHaveAttribute('alt', 'such wow');

        const figcaptionEl = renderedEls.itemEl?.querySelector('figcaption');
        expect(figcaptionEl).toBeInTheDocument();
        expect(figcaptionEl).toHaveTextContent('such art');
      });
    });
  });

  describe('SideNavGroup', () => {
    const renderGroup = (header?: header) => {
      const { sideNavGroup, sideNavHeader, sideNavLink } = testIds;
      const { getByTestId, queryByText, queryByTestId } = render(
        <SideNavGroup
          className={className}
          header={header}
          data-testid={sideNavGroup}
        >
          <SideNavItem>
            <a href="#clusters" data-testid={sideNavLink}>
              Clusters
            </a>
          </SideNavItem>
        </SideNavGroup>,
      );

      renderedEls.groupEl = getByTestId(sideNavGroup);
      renderedEls.defaultHeaderEl = queryByText(headerText);
      renderedEls.headerContentEl = queryByTestId(sideNavHeader);
      renderedEls.childEl = getByTestId(sideNavLink);
    };

    describe('when the group includes a string header', () => {
      beforeEach(() => {
        renderGroup(headerText);
      });

      test('renders the side nav group with a default header', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.defaultHeaderEl).toBeInTheDocument();
        expect(renderedEls.headerContentEl).toBeNull();
      });

      test('sets the role of the list as a menu', () => {
        const listEl = renderedEls.groupEl?.querySelector('ul');
        expect(listEl).toBeInTheDocument();
        expect(listEl).toHaveAttribute('role', 'menu');
      });

      test('it displays the header text in a header', () => {
        expect(renderedEls.defaultHeaderEl?.tagName).toEqual('H4');
      });

      test('renders the children of the side nav group', () => {
        expect(renderedEls.childEl).toBeInTheDocument();
      });

      test('it renders with the provided class name', () => {
        expect(renderedEls.groupEl).toHaveClass(className);
      });
    });

    describe('when the group includes header content', () => {
      beforeEach(() => {
        renderGroup(headerContent);
      });

      test('renders the side nav group with the header content', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.defaultHeaderEl).toBeNull();
        expect(renderedEls.headerContentEl).toBeInTheDocument();
      });
    });

    describe('when the group does not include a header', () => {
      beforeEach(() => {
        renderGroup();
      });

      test('renders the side nav group without a header', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.defaultHeaderEl).toBeNull();
        expect(renderedEls.headerContentEl).toBeNull();
      });
    });
  });

  describe('SideNav', () => {
    describe('when rendered to the dom', () => {
      beforeEach(() => {
        const { sideNav, sideNavGroup, sideNavItem, sideNavLink } = testIds;
        const { getByTestId } = render(
          <SideNav className={className} data-testid={sideNav}>
            <SideNavGroup data-testid={sideNavGroup}>
              <SideNavItem data-testid={sideNavItem}>
                <a href="#clusters" data-testid={sideNavLink}>
                  Clusters
                </a>
              </SideNavItem>
            </SideNavGroup>
          </SideNav>,
        );

        renderedEls.navEl = getByTestId(sideNav);
        renderedEls.groupEl = getByTestId(sideNavGroup);
        renderedEls.itemEl = getByTestId(sideNavItem);
        renderedEls.childEl = getByTestId(sideNavLink);
      });

      test('renders the side nav to the dom', () => {
        expect(renderedEls.navEl).toBeInTheDocument();
      });

      test('it provides an aria label for the nav', () => {
        expect(renderedEls.navEl).toHaveAttribute('aria-label', 'side-nav');
      });

      test('renders the children of the side nav', () => {
        expect(renderedEls.groupEl).toBeInTheDocument();
        expect(renderedEls.itemEl).toBeInTheDocument();
        expect(renderedEls.childEl).toBeInTheDocument();
      });

      test('it renders with the provided class name', () => {
        expect(renderedEls.navEl).toHaveClass(className);
      });
    });
  });
});
