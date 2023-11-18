import { FC, PropsWithChildren } from "react";
import { setCurrentTabActionCreator } from "../../services/actions/burger-ingredients";
import { useDispatch, useSelector } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { IIngredientsStorage } from "../../types/ingredient-types";

interface IBurgerIngredientsScrollTab extends PropsWithChildren {
    type: string;
}

//tab with scrolling
const BurgerIngredientsScrollTab: FC<IBurgerIngredientsScrollTab> = (props) => {
    const {currentTab} = useSelector<any,IIngredientsStorage> (store=> store.burgerIngredients);
    const dispatch = useDispatch();
    
    const setActiveTab = (tabName: string): void => {
        dispatch(setCurrentTabActionCreator(tabName));
    };

    return (
        <Tab value={props.type} active={currentTab === `${props.type}`} onClick={setActiveTab}>
            {props.children}
        </Tab>);
}

export default BurgerIngredientsScrollTab;