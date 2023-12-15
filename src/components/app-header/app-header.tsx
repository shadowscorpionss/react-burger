//styles
import appHeaderStyles from './app-header.module.css';
//react, router
import { FC, useMemo } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
//components
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
//constants
import { FEED_PATH, HOME_PATH, PROFILE_PATH } from '../../pages';
const paths = [HOME_PATH,FEED_PATH];

const AppHeader: FC = () => {
  const location = useLocation();
  const activePage = useMemo(() => paths.findIndex(el=> el===location.pathname), [location]);

  const burgerIconType = useMemo(() => activePage === 0 ? 'primary' : 'secondary', [activePage]);
  const listIconType = useMemo(() => activePage === 1 ? 'primary' : 'secondary', [activePage]);
  const profileIconType = useMemo(() => activePage === -1 ? 'primary' : 'secondary', [activePage]);

  const constructorTextStyle = useMemo(()=> activePage===0 ?'':'text_color_inactive', [activePage]);
  const feedTextStyle = useMemo(()=> activePage===1 ?'':'text_color_inactive', [activePage]);
  const profileTextStyle = useMemo(()=> activePage===-1 ?'':'text_color_inactive', [activePage]);

  return (
    <header>
      <nav className={appHeaderStyles.panel}>
        <div className={appHeaderStyles.wrapper}>
          <div className={appHeaderStyles.col}>
            <NavLink to={HOME_PATH} className={appHeaderStyles.linkBlock}>
              <BurgerIcon type={burgerIconType} />
              <p className={`pl-2 text text_type_main-default ${constructorTextStyle}`}>Конструктор</p>
            </NavLink>
            <NavLink to={FEED_PATH} className={appHeaderStyles.linkBlock}>
              <ListIcon type={listIconType} />
              <p className={`pl-2 text text_type_main-default ${feedTextStyle}`}>Лента заказов</p>
            </NavLink>
          </div>
          <div className={appHeaderStyles.colLogo}>
            <section className={appHeaderStyles.logo}>
              <NavLink to={HOME_PATH} className={appHeaderStyles.linkBlock}>
                <Logo />
              </NavLink>
            </section>
          </div>
          <div className={appHeaderStyles.colRight}>
            <NavLink to={PROFILE_PATH} className={`${appHeaderStyles.linkBlock}`}>
              <ProfileIcon type={profileIconType} />
              <p className={`pl-2 text text_type_main-default ${profileTextStyle}`}>Личный кабинет</p>
            </NavLink>
          </div>

        </div>

      </nav>
    </header>
  );

}

export default AppHeader;