import { FC, PropsWithChildren } from "react";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

interface IBurgerIngredientsScrollTab extends PropsWithChildren {
    tabName: string;
    onClick?: ((tabName: string) => void);
    activeTab?: string;
}

//tab with scrolling
const BurgerIngredientsScrollTab: FC<IBurgerIngredientsScrollTab> = ({ tabName, onClick, activeTab, children }) => {
    const activeTabName = activeTab;

    const setCurrentTab = (tabName: string): void => {
        if (typeof onClick === 'function') {
            onClick(tabName);
            return;
        }
    };

    return (
        <Tab value={tabName} active={activeTabName === `${tabName}`} onClick={setCurrentTab}>
            {children}
        </Tab>);
}

export default BurgerIngredientsScrollTab;