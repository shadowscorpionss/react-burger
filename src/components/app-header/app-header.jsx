import React from "react";
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from './app-header.module.css'


class AppHeader extends React.Component{
    render () {
        return (
            <nav className={appHeaderStyles.panel}>
                <div className={appHeaderStyles.wrapper}>
                    
                    <div>
                        <a className={`${appHeaderStyles.linkBlock} `}>
                            <BurgerIcon type="primary"/>                        
                            <p className="pl-2 text text_type_main-default">Конструктор</p>
                        </a>                    
                        <a className={`${appHeaderStyles.linkBlock} `}>
                            <ListIcon type="primary"/>                       
                            <p className="pl-2 text text_type_main-default">Лента заказов</p>
                        </a>
                    
                    </div>
                    <div></div>
                    <div><div className={appHeaderStyles.logo}><Logo /></div></div>
                    <div></div>
                    <div>
                        <a className={`${appHeaderStyles.linkBlock}`}>
                            <ProfileIcon type="primary"/>                       
                            <p className="pl-2 text text_type_main-default">Личный кабинет</p>
                        </a>
                    </div>           
                    
                    
                </div>

            </nav>
        );
    }
}

export default AppHeader;