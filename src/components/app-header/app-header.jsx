import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { NavLink } from "react-router-dom";
import { FEED_PATH, HOME_PATH, PROFILE_PATH } from "../../pages";

function AppHeader() {
  return (
    <header>
      <nav className={appHeaderStyles.panel}>
        <div className={appHeaderStyles.wrapper}>
          <div className={appHeaderStyles.col}>
            <NavLink to={HOME_PATH} className={appHeaderStyles.linkBlock}>
              <BurgerIcon type="primary" />
              <p className="pl-2 text text_type_main-default">Конструктор</p>
            </NavLink>
            <NavLink to={FEED_PATH} className={appHeaderStyles.linkBlock}>
              <ListIcon type="primary" />
              <p className="pl-2 text text_type_main-default">Лента заказов</p>
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
              <ProfileIcon type="primary" />
              <p className="pl-2 text text_type_main-default">Личный кабинет</p>
            </NavLink>
          </div>

        </div>

      </nav>
    </header>
  );

}

export default AppHeader;