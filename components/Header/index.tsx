import Breakpoints from 'constants/breakpoints';
import { HEADER_MENUS } from 'constants/headerMenus';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { YappLogo } from 'public/assets/icons';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import media from 'styles/media';

function Header(): ReactElement {
  const { asPath } = useRouter();

  return (
    <HeaderBlock>
      <HeaderInner>
        <YappLogo />
        <HeaderMenu>
          {HEADER_MENUS.map(({ name, path }) => (
            <Link key={`${name}_${path}`} href={path}>
              <MenuText active={asPath === path}>{name}</MenuText>
            </Link>
          ))}
        </HeaderMenu>
        <MobileHeaderMenu />
      </HeaderInner>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey_900};
  color: ${({ theme }) => theme.palette.white};
`;

const HeaderInner = styled.div`
  width: ${Breakpoints.large}px;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${media.tablet} {
    width: auto;
    padding: 0 81px;
  }
  ${media.mobile} {
    padding: 0 20px;
  }
`;

const HeaderMenu = styled.div`
  width: 470px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${media.mobile} {
    display: none;
  }
`;

const MenuText = styled.a<{ active: boolean }>`
  cursor: pointer;
  color: ${({ theme, active }) =>
    active ? theme.palette.orange_400 : theme.palette.white};
  ${({ theme }) => theme.textStyle.web.Category};
`;

const MobileHeaderMenu = styled.div`
  width: 32px;
  height: 32px;
  background-color: #999; /* @Todo 임시컬러 */
  border-radius: 50%;
  display: none;
  ${media.mobile} {
    display: block;
  }
`;

export default Header;
