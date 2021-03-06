import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@leafygreen-ui/tooltip';
import Badge, { Variant } from '@leafygreen-ui/badge';
import CaretUpIcon from '@leafygreen-ui/icon/dist/CaretUp';
import CaretDownIcon from '@leafygreen-ui/icon/dist/CaretDown';
import UserMenu from '../user-menu';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { LogoMark } from '@leafygreen-ui/logo';
import { useViewportSize } from '@leafygreen-ui/hooks';
import { Menu, MenuItem } from '@leafygreen-ui/menu';
import { OrgNavLink, OnPremUserMenu } from '../helpers';
import { breakpoints, mq } from '../breakpoints';
import { OrgSelect } from '../mongo-select';
import { useOnElementClick } from '../on-element-click-provider';
import {
  AccountInterface,
  OrganizationInterface,
  NavElement,
  CurrentOrganizationInterface,
  OrgPaymentLabel,
  ActiveNavElement,
  MongoNavInterface,
} from '../types';

export const orgNavHeight = 60;

const navContainer = css`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  height: ${orgNavHeight}px;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 13px;
  line-height: 15px;
  background-color: white;
  border-bottom: 1px solid ${uiColors.gray.light2};
  color: ${uiColors.gray.dark3};
`;

const supportContainer = css`
  ${mq({
    marginRight: ['16px', '16px', '24px'],
    marginLeft: ['16px', '16px', '24px'],
  })}
`;

const rightLinkMargin = css`
  ${mq({
    marginRight: ['16px', '16px', '24px'],
  })}
`;

const versionStyle = css`
  position: relative;
  display: inline-block;
  font-size: 10px;
  color: ${uiColors.green.base};

  ${mq({
    marginRight: ['16px', '16px', '16px'],
  })}
`;

const productTourColor = css`
  color: ${uiColors.blue.base};

  &:hover {
    cursor: pointer;
  }
`;

const paymentStatusMap: {
  [K in Partial<Variant>]?: ReadonlyArray<OrgPaymentLabel>;
} = {
  [Variant.LightGray]: [
    OrgPaymentLabel.Embargoed,
    OrgPaymentLabel.EmbargoConfirmed,
  ],
  [Variant.Green]: [OrgPaymentLabel.Ok],
  [Variant.Yellow]: [
    OrgPaymentLabel.Warning,
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Closing,
  ],
  [Variant.Red]: [
    OrgPaymentLabel.Dead,
    OrgPaymentLabel.AdminSuspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.Closed,
  ],
} as const;

const userMenuActiveNavItems = [
  ActiveNavElement.UserMenuCloudInvitations,
  ActiveNavElement.UserMenuCloudMFA,
  ActiveNavElement.UserMenuCloudOrganizations,
  ActiveNavElement.UserMenuCloudUserPreferences,
  ActiveNavElement.UserMenuCloudOther,
  ActiveNavElement.UserMenuOnPremInvitations,
  ActiveNavElement.UserMenuOnPremOrganizations,
  ActiveNavElement.UserMenuOnPremPersonalization,
  ActiveNavElement.UserMenuOnPremProfile,
  ActiveNavElement.UserMenuOnPremPublicApiAccess,
  ActiveNavElement.UserMenuOnPremTwoFactorAuth,
  ActiveNavElement.UserMenuOnPremOther,
  ActiveNavElement.OrgNavAllClusters,
];

type OrgNavProps = Pick<
  MongoNavInterface,
  'onOrganizationChange' | 'activeNav' | 'admin' | 'mode' | 'activePlatform'
> & {
  account?: AccountInterface;
  current?: CurrentOrganizationInterface;
  data?: Array<OrganizationInterface>;
  currentProjectName?: string;
  currentProjectId?: string;
  onPremEnabled?: boolean;
  onPremVersion?: string;
  onPremMFA?: boolean;
  constructOrganizationURL: NonNullable<
    MongoNavInterface['constructOrganizationURL']
  >;
  urls: Required<NonNullable<MongoNavInterface['urls']>>;
  hosts: Required<NonNullable<MongoNavInterface['hosts']>>;
  showProjectNav: NonNullable<MongoNavInterface['showProjectNav']>;
};

function OrgNav({
  account,
  activeNav,
  current,
  data,
  mode,
  constructOrganizationURL,
  onOrganizationChange,
  urls,
  admin,
  hosts,
  currentProjectName = 'None',
  activePlatform,
  currentProjectId,
  onPremEnabled,
  onPremVersion,
  onPremMFA = false,
  showProjectNav,
}: OrgNavProps) {
  const [accessManagerOpen, setAccessManagerOpen] = useState(false);
  const [onPremMenuOpen, setOnPremMenuOpen] = useState(false);
  const { width: viewportWidth } = useViewportSize();
  const onElementClick = useOnElementClick();
  const { orgNav } = urls;
  const isTablet = viewportWidth < breakpoints.medium;
  const isMobile = viewportWidth < breakpoints.small;
  const disabled = (userMenuActiveNavItems as Array<string>).includes(
    activeNav as string,
  );

  let paymentVariant: Variant | undefined;
  let key: Variant;

  for (key in paymentStatusMap) {
    const paymentStatus = current?.paymentStatus;

    if (paymentStatus && paymentStatusMap[key]?.includes(paymentStatus)) {
      paymentVariant = key;
    }
  }

  const paymentValues: Array<OrgPaymentLabel> = [
    OrgPaymentLabel.Suspended,
    OrgPaymentLabel.Locked,
    OrgPaymentLabel.AdminSuspended,
  ];

  const displayProjectAccess = onPremEnabled
    ? !!currentProjectId
    : showProjectNav;

  function renderBadgeItem() {
    if (
      disabled ||
      current?.paymentStatus == null ||
      isTablet ||
      onPremEnabled ||
      !paymentVariant ||
      (!admin && !paymentValues.includes(current.paymentStatus))
    ) {
      return null;
    }

    return (
      <Badge
        variant={paymentVariant}
        data-testid="org-nav-payment-status"
        className={css`
          margin-right: 25px;
        `}
      >
        {current.paymentStatus.split('_').join()}
      </Badge>
    );
  }

  function renderUserMenu() {
    if (onPremEnabled) {
      return (
        <OnPremUserMenu
          name={account?.firstName ?? ''}
          open={onPremMenuOpen}
          setOpen={setOnPremMenuOpen}
          urls={urls}
          mfa={onPremMFA}
          activeNav={activeNav}
        />
      );
    }

    return (
      <UserMenu
        account={account}
        activePlatform={activePlatform}
        urls={urls}
        hosts={hosts}
        activeNav={activeNav}
      />
    );
  }

  const AccessManagerIcon = accessManagerOpen ? CaretUpIcon : CaretDownIcon;

  return (
    <nav
      className={navContainer}
      aria-label="organization navigation"
      data-testid="organization-nav"
    >
      <Tooltip
        align="bottom"
        justify="start"
        variant="dark"
        className={css`
          width: 150px;
        `}
        usePortal={false}
        trigger={
          <a
            href={orgNav.leaf}
            onClick={onElementClick(NavElement.OrgNavLeaf)}
            data-testid="org-nav-leaf"
          >
            <LogoMark height={30} />
          </a>
        }
      >
        View the Organization Home
      </Tooltip>

      <OrgSelect
        data={data}
        current={current}
        mode={mode}
        constructOrganizationURL={constructOrganizationURL}
        hosts={hosts}
        urls={urls.mongoSelect}
        onChange={onOrganizationChange}
        isActive={activeNav === ActiveNavElement.OrgNavOrgSettings}
        loading={!current}
        disabled={disabled}
        admin={admin}
        isOnPrem={onPremEnabled}
      />

      {renderBadgeItem()}

      {!disabled && !isMobile && (
        <>
          <OrgNavLink
            isActive={
              activeNav === ActiveNavElement.OrgNavAccessManagerDropdown
            }
            loading={!current}
            data-testid="org-nav-access-manager-dropdown"
            onClick={onElementClick(
              NavElement.OrgNavAccessManagerDropdown,
              () => setAccessManagerOpen(curr => !curr),
            )}
            isButton={true}
          >
            Access Manager
            <AccessManagerIcon
              className={cx(
                css`
                  margin-left: 8px;
                `,
                {
                  [css`
                    color: ${uiColors.gray.dark1};
                  `]: !accessManagerOpen,
                },
              )}
            />
            {current && (
              <Menu
                open={accessManagerOpen}
                setOpen={setAccessManagerOpen}
                usePortal={false}
              >
                <MenuItem
                  href={orgNav.accessManager}
                  data-testid="org-nav-dropdown-org-access-manager"
                  description={current.orgName}
                  size="large"
                  active={
                    activeNav === ActiveNavElement.OrgNavAccessManagerDropdown
                  }
                  onClick={onElementClick(
                    NavElement.OrgNavDropdownOrgAccessManager,
                    () => setAccessManagerOpen(false),
                  )}
                >
                  Organization Access
                </MenuItem>

                <MenuItem
                  href={currentProjectName && urls.projectNav.accessManager}
                  data-testid="org-nav-dropdown-project-access-manager"
                  size="large"
                  active={
                    activeNav ===
                    ActiveNavElement.OrgNavDropdownProjectAccessManager
                  }
                  disabled={!displayProjectAccess}
                  description={
                    displayProjectAccess ? currentProjectName : 'None'
                  }
                  onClick={onElementClick(
                    NavElement.OrgNavDropdownProjectAccessManager,
                    () => setAccessManagerOpen(false),
                  )}
                >
                  Project Access
                </MenuItem>
              </Menu>
            )}
          </OrgNavLink>

          <OrgNavLink
            href={current && orgNav.support}
            isActive={activeNav === ActiveNavElement.OrgNavSupport}
            loading={!current}
            className={supportContainer}
            data-testid="org-nav-support"
            onClick={onElementClick(NavElement.OrgNavSupport)}
          >
            Support
          </OrgNavLink>

          {!onPremEnabled && (
            <OrgNavLink
              href={current && orgNav.billing}
              isActive={activeNav === ActiveNavElement.OrgNavBilling}
              loading={!current}
              data-testid="org-nav-billing"
              onClick={onElementClick(NavElement.OrgNavBilling)}
            >
              Billing
            </OrgNavLink>
          )}
        </>
      )}

      <div
        className={css`
          margin-left: auto;
        `}
      >
        {onPremEnabled && onPremVersion && (
          <Tooltip
            usePortal={false}
            variant="dark"
            align="bottom"
            justify="middle"
            className={css`
              width: 165px;
            `}
            trigger={
              <span
                className={versionStyle}
                data-testid="org-nav-on-prem-version"
              >
                {onPremVersion}
              </span>
            }
          >
            Ops Manager Version
          </Tooltip>
        )}

        {!onPremEnabled &&
          !isMobile &&
          // @ts-ignore Property 'Appcues' does not exist on type 'Window & typeof globalThis'.ts(2339)
          window.Appcues && (
            <OrgNavLink
              // @ts-ignore 'Cannot find name Appcues'
              onClick={() => Appcues.show('-M4PVbE05VI91MJihJGv')} // eslint-disable-line no-undef
              className={cx(rightLinkMargin, productTourColor)}
              data-testid="org-nav-see-product-tour"
            >
              See Product Tour
            </OrgNavLink>
          )}

        {!isMobile && (
          <OrgNavLink
            href={orgNav.allClusters}
            isActive={activeNav === ActiveNavElement.OrgNavAllClusters}
            className={rightLinkMargin}
            data-testid="org-nav-all-clusters-link"
            onClick={onElementClick(NavElement.OrgNavAllClusters)}
          >
            All Clusters
          </OrgNavLink>
        )}

        {!isTablet && admin && (
          <OrgNavLink
            href={orgNav.admin}
            isActive={activeNav === ActiveNavElement.OrgNavAdmin}
            className={rightLinkMargin}
            data-testid="org-nav-admin-link"
          >
            Admin
          </OrgNavLink>
        )}
      </div>

      {renderUserMenu()}
    </nav>
  );
}

OrgNav.displayName = 'OrgNav';

OrgNav.propTypes = {
  current: PropTypes.shape({
    paymentStatus: PropTypes.string,
  }),
};

export default OrgNav;
