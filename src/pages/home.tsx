//styles
import homeStyles from "./home.module.css";
//react, dnd
import { FC } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//components
import BurgerIngredientsContainer from "../components/burger-ingredients/burger-ingredients-container";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";

export const HomePage: FC = () => {
    return (
        <main>
            <div className={homeStyles.grid}>
                <DndProvider backend={HTML5Backend}>
                    <section className={homeStyles.column}>
                        <h2 className="text text_type_main-large">Соберите бургер</h2>
                        <div className={homeStyles.cellContent}>
                            <BurgerIngredientsContainer />
                        </div>
                    </section>
                    <section className={homeStyles.column}>
                        <div className={homeStyles.cellContent}>
                            <BurgerConstructor />
                        </div>
                    </section>
                </DndProvider>
            </div>
        </main>);
}