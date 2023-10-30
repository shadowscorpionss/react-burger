import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import { FEED_PATH, HOME_PATH, PROFILE_PATH } from "../../pages";
import { useMemo } from "react";

function AppHeader() {
  const location = useLocation();
  const activePage = useMemo(() => {
    switch (location.pathname) {
      case HOME_PATH:
        return 1;
      case FEED_PATH:
        return 2;
      default:
        return 3;
    }
  }, [location]);

  const burgerIconType = useMemo(() => activePage === 1 ? "primary" : "secondary", [activePage]);
  const listIconType = useMemo(() => activePage === 2 ? "primary" : "secondary", [activePage]);
  const profileIconType = useMemo(() => activePage === 3 ? "primary" : "secondary", [activePage]);

  return (
    <header>
      <nav className={appHeaderStyles.panel}>
        <div className={appHeaderStyles.wrapper}>
          <div className={appHeaderStyles.col}>
            <NavLink to={HOME_PATH} className={appHeaderStyles.linkBlock}>
              <BurgerIcon type={burgerIconType} />
              <p className={`pl-2 text text_type_main-default ${activePage===1 ?'':'text_color_inactive'}`}>Конструктор</p>
            </NavLink>
            <NavLink to={FEED_PATH} className={appHeaderStyles.linkBlock}>
              <ListIcon type={listIconType} />
              <p className={`pl-2 text text_type_main-default ${activePage===2 ?'':'text_color_inactive'}`}>Лента заказов</p>
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
              <p className={`pl-2 text text_type_main-default ${activePage===3 ?'':'text_color_inactive'}`}>Личный кабинет</p>
            </NavLink>
          </div>

        </div>

      </nav>
    </header>
  );

}

export default AppHeader;