import {BurgerIcon, ListIcon, Logo, ProfileIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";

function AppHeader() {
  return (
    <header>
      <nav className={appHeaderStyles.panel}>
        <div className={appHeaderStyles.wrapper}>          
          <div className={appHeaderStyles.col}>
            <a className={appHeaderStyles.linkBlock}>
              <BurgerIcon type="primary"/>
              <p className="pl-2 text text_type_main-default">Конструктор</p>
            </a>
            <a className={appHeaderStyles.linkBlock}>
              <ListIcon type="primary"/>
              <p className="pl-2 text text_type_main-default">Лента заказов</p>
            </a>
          </div>
          <div className={appHeaderStyles.colLogo}>
            <section className={appHeaderStyles.logo}><Logo/></section>
          </div>
          <div className={appHeaderStyles.colRight}>
            <a className={`${appHeaderStyles.linkBlock}`}>
              <ProfileIcon type="primary"/>
              <p className="pl-2 text text_type_main-default">Личный кабинет</p>
            </a>
          </div>

        </div>

      </nav>
    </header>
  );

}

export default AppHeader;