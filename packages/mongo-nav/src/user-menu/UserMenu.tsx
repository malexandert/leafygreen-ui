import React, { useState } from 'react';
import PropTypes from 'prop-types';
import defaultsDeep from 'lodash/defaultsDeep';
import Badge from '@leafygreen-ui/badge';
import Button from '@leafygreen-ui/button';
import ArrowRightIcon from '@leafygreen-ui/icon/dist/ArrowRight';
import { LogoMark } from '@leafygreen-ui/logo';
import {
  Menu,
  SubMenu,
  MenuItem,
  MenuSeparator,
  FocusableMenuItem,
} from '@leafygreen-ui/menu';
import { createDataProp } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';
import UserMenuTrigger from './UserMenuTrigger';
import {
  AccountInterface,
  ActiveNavElement,
  URLSInterface,
  HostsInterface,
  NavElement,
  Platform,
} from '../types';
import { hostDefaults } from '../data';
import { useOnElementClick } from '../on-element-click-provider';
import {
  CloudIcon,
  SupportIcon,
  UniversityIcon,
  MegaphoneIcon,
} from '../helpers/Icons';

const subMenuContainer = createDataProp('sub-menu-container');
const menuItemContainer = createDataProp('menu-item-container');

const triggerWrapper = css`
  display: inline-block;
  position: relative;
  z-index: 0;
  font-family: 'Akzidenz', Helvetica, Arial, sans-serif;
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const menuStyle = css`
  width: 300px;
  font-weight: normal;
`;

const headerStyle = css`
  padding: 24px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${uiColors.gray.dark3};
  color: ${uiColors.white};
  max-width: 100%;
`;

const logoMarkBackground = css`
  background-color: white;
  width: 43px;
  height: 43px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
`;

const nameStyle = css`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
  margin: 0px;
  max-width: 100%;
`;

const subMenuContainerStyle = css`
  pointer-events: inherit;
`;

const subMenuActiveContainerStyle = css`
  pointer-events: none;
`;

const productLinkStyle = css`
  font-size: 12px;
  color: ${uiColors.blue.base};
  display: flex;
  align-items: center;
  ${subMenuContainer.selector}:hover &,
  ${menuItemContainer.selector}:hover & {
    color: ${uiColors.blue.dark2};
  }
`;

const activePlatformLinkStyle = css`
  color: ${uiColors.gray.light1};
`;

const productLinkIconStyle = css`
  height: 10px;
  width: 10px;
  opacity: 0;
  transform: translate3d(-3px, 0, 0px);
  transition: all 100ms ease-in;
  ${subMenuContainer.selector}:hover &,
  ${menuItemContainer.selector}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0px);
  }
`;

const subMenuItemStyle = css`
  display: flex;
  justify-content: space-between;
`;

const descriptionStyle = css`
  font-size: 12px;
  line-height: 14px;
  text-decoration: none;
  margin-top: 0px;
  margin-bottom: 16px;
  max-width: 100%;
`;

interface DescriptionProps {
  isActive: boolean;
  product: 'cloud' | 'university' | 'support';
}

function Description({ isActive, product }: DescriptionProps) {
  return (
    <div
      className={cx(productLinkStyle, {
        [activePlatformLinkStyle]: isActive,
      })}
    >
      {`${product}.mongodb.com`}
      <ArrowRightIcon size="small" className={productLinkIconStyle} />
    </div>
  );
}

interface UserMenuProps {
  /**
   * Object that contains information about the active user.
   * {firstName: 'string', lastName: 'string', email: 'string'}
   */
  account?: AccountInterface;

  /**
   * Determines what nav item is currently active.
   */
  activeNav?: NavElement;

  /**
   * Callback invoked after the user clicks log out.
   */
  onLogout?: React.MouseEventHandler;

  /**
   * Callback invoked after the user clicks a product.
   */
  onProductChange?: React.MouseEventHandler;

  /**
   * Object that supplies URL overrides to UserMenu component.
   * Shape: { userMenu:{ cloud: { userPreferences, organizations, invitations, mfa }, university: { universityPreferences }, support: { userPreferences }, account: { homepage } }}
   */
  urls?: URLSInterface;

  /**
   * Object that supplies host overrides to UserMenu component.
   * Shape: { cloud, realm, charts, account, university, support }
   * Defaults to the production homepages of each product
   */
  hosts?: HostsInterface;

  /**
   * MongoDB platform that is currently active.
   * Possible values: ['account', 'cloud',  'support', 'university']
   */
  activePlatform?: Platform;
}

/**
 * # UserMenu
 *
 * UserMenu component
 *
 * ```
<UserMenu
  account={account}
  activePlatform="cloud"
  onLogout={onLogout}
  onProductChange={onProductChange}
  urls={urls}
  hosts={hosts}
/>
```
 * @param props.account Object that contains information about the active user.
*   {firstName: 'string', lastName: 'string', email: 'string'}
 * @param props.activeNav Determines what nav item is currently active.
 * @param props.onLogout Callback fired when a user logs out.
 * @param props.onProductChange Callback invoked after the user clicks a product.
 * @param props.hosts Object where keys are MDB products and values are the desired hostURL override for that product, to enable `<UserMenu />` to work across all environments.
 * @param props.urls Object to enable custom overrides for every `href` used in `<UserMenu />`.
 * @param props.activePlatform MongoDB platform that is currently active.
 */
function UserMenu({
  account,
  activeNav,
  onLogout: onLogoutProp,
  onProductChange = () => {},
  urls: urlsProp,
  hosts: hostsProp,
  activePlatform,
}: UserMenuProps) {
  const hosts = defaultsDeep(hostsProp, hostDefaults);
  const onElementClick = useOnElementClick();

  const onLogout = (e: React.MouseEvent) => {
    if (onLogoutProp) {
      return onLogoutProp(e);
    } else {
      return onElementClick(NavElement.Logout)(e);
    }
  };

  type UserMenuURLSInterface = Pick<URLSInterface, 'userMenu'>;

  const defaultURLs: UserMenuURLSInterface = {
    userMenu: {
      cloud: {
        userPreferences: `${hosts.cloud}/v2#/preferences/personalization`,
        organizations: `${hosts.cloud}/v2#/preferences/organizations`,
        invitations: `${hosts.cloud}/v2#/preferences/invitations`,
        mfa: `${hosts.cloud}/v2#/preferences/2fa`,
      },
      university: {
        universityPreferences: `${hosts.university}/edit_profile`,
      },
      support: {
        userPreferences: `${hosts.support}/profile`,
      },
      account: {
        homepage: `${hosts.account}/account/profile/overview`,
      },
      logout: `${hosts.account}/account/login?signedOut=true`,
    },
  };

  const urls: URLSInterface = defaultsDeep(urlsProp, defaultURLs);
  const userMenu = urls.userMenu ?? {};

  const [open, setOpen] = useState(false);

  const name = account
    ? `${account.firstName ?? ''} ${account.lastName ?? ''}`
    : '';

  const isAccount = activePlatform === Platform.Account;
  const isCloud = activePlatform === Platform.Cloud;
  const isSupport = activePlatform === Platform.Support;
  const isUniversity = activePlatform === Platform.University;

  const sharedProps = {
    target: '_blank',
    rel: 'noopener noreferrer',
    onClick: (e: React.MouseEvent) => {
      onProductChange(e);
      setOpen(false);
    },
  };

  const feedbackAnchorProps = {
    href: 'https://feedback.mongodb.com/',
    target: '_blank',
    rel: 'noopener noreferrer',
  };

  return (
    <div className={triggerWrapper}>
      <UserMenuTrigger
        open={open}
        name={account?.firstName ?? ''}
        setOpen={setOpen}
        data-testid="user-menu-trigger"
      />
      <Menu
        open={open}
        setOpen={setOpen}
        className={menuStyle}
        usePortal={false}
      >
        <li role="none" className={headerStyle}>
          <div className={logoMarkBackground}>
            <LogoMark height={30} />
          </div>

          <h3 className={cx(nameStyle, truncate)}>{name}</h3>

          <p className={cx(descriptionStyle, truncate)}>
            {account?.email ?? ''}
          </p>

          <FocusableMenuItem>
            <Button
              href={isAccount ? undefined : userMenu.account?.homepage}
              disabled={isAccount}
              as={isAccount ? 'button' : 'a'}
            >
              Manage your MongoDB Account
            </Button>
          </FocusableMenuItem>
        </li>
        <MenuSeparator />

        {isCloud || isAccount ? (
          <SubMenu
            {...subMenuContainer.prop}
            {...sharedProps}
            active={isCloud}
            disabled={!account}
            href={hosts.cloud}
            description={<Description isActive={isCloud} product="cloud" />}
            title="Cloud"
            glyph={<CloudIcon />}
            className={cx(subMenuContainerStyle, {
              [subMenuActiveContainerStyle]: isCloud,
            })}
          >
            <MenuItem
              href={userMenu.cloud?.userPreferences}
              active={
                activeNav === ActiveNavElement.UserMenuCloudUserPreferences
              }
              data-testid="user-menuitem-cloud-user-preferences"
              onClick={onElementClick(NavElement.UserMenuCloudUserPreferences)}
            >
              User Preferences
            </MenuItem>
            <MenuItem
              href={userMenu.cloud?.invitations}
              active={activeNav === ActiveNavElement.UserMenuCloudInvitations}
              data-testid="user-menuitem-cloud-invitations"
              onClick={onElementClick(NavElement.UserMenuCloudInvitations)}
            >
              <span className={subMenuItemStyle}>
                Invitations
                {(account?.openInvitations ?? 0) > 0 && (
                  <Badge variant="blue">{account?.openInvitations}</Badge>
                )}
              </span>
            </MenuItem>
            <MenuItem
              href={userMenu.cloud?.organizations}
              active={activeNav === ActiveNavElement.UserMenuCloudOrganizations}
              data-testid="user-menuitem-cloud-organizations"
              onClick={onElementClick(NavElement.UserMenuCloudOrganizations)}
            >
              Organizations
            </MenuItem>
            <MenuItem
              href={userMenu.cloud?.mfa}
              active={activeNav === ActiveNavElement.UserMenuCloudMFA}
              data-testid="user-menuitem-cloud-mfa"
              onClick={onElementClick(NavElement.UserMenuCloudMFA)}
            >
              Two-Factor Authentication
            </MenuItem>
          </SubMenu>
        ) : (
          <MenuItem
            {...menuItemContainer.prop}
            size="large"
            glyph={<CloudIcon />}
            href={hosts.cloud}
            description={<Description isActive={false} product="cloud" />}
          >
            Cloud
          </MenuItem>
        )}

        <SubMenu
          {...subMenuContainer.prop}
          {...sharedProps}
          active={isUniversity}
          disabled={!account}
          href={hosts.university}
          title="University"
          glyph={<UniversityIcon />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isUniversity,
          })}
          description={
            <Description isActive={isUniversity} product="university" />
          }
        >
          <MenuItem
            href={userMenu.university?.universityPreferences}
            data-testid="user-menuitem-university-preferences"
          >
            University Preferences
          </MenuItem>
        </SubMenu>

        <SubMenu
          {...subMenuContainer.prop}
          {...sharedProps}
          active={isSupport}
          disabled={!account}
          href={hosts.support}
          title="Support"
          glyph={<SupportIcon />}
          description={<Description isActive={isSupport} product="support" />}
          className={cx(subMenuContainerStyle, {
            [subMenuActiveContainerStyle]: isSupport,
          })}
        >
          <MenuItem
            href={userMenu.support?.userPreferences}
            data-testid="user-menuitem-support-user-preferences"
          >
            User Preferences
          </MenuItem>
        </SubMenu>

        <MenuSeparator />

        <MenuItem
          {...feedbackAnchorProps}
          size="large"
          glyph={<MegaphoneIcon />}
          data-testid="user-menuitem-feedback"
          onClick={onElementClick(NavElement.UserMenuFeedback)}
        >
          Give us feedback
        </MenuItem>

        <MenuSeparator />

        <MenuItem
          onClick={onLogout}
          href={userMenu.logout}
          size="large"
          data-testid="user-menuitem-logout"
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}

UserMenu.displayName = 'UserMenu';

UserMenu.propTypes = {
  user: PropTypes.objectOf(PropTypes.string),
  activePlatform: PropTypes.oneOf([
    'account',
    'cloud',
    'support',
    'university',
  ]),
  onLogout: PropTypes.func,
  onProductChange: PropTypes.func,
  onAccountClick: PropTypes.func,
};

export default UserMenu;
