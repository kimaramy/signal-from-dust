import React from 'react';

import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';

const Menu = React.memo(function Menu() {
  return (
    <>
      <DesktopMenu />
      <MobileMenu />
    </>
  );
});

export default Menu;
