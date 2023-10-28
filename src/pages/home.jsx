import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import homeStyles from "./home.module.css";

export function HomePage() {
    return (
        <main>
            <div className={homeStyles.grid}>
                <DndProvider backend={HTML5Backend}>
                    <section className={homeStyles.column}>
                        <h2 className="text text_type_main-large">Соберите бургер</h2>
                        <div className={homeStyles.cellContent}>
                            <BurgerIngredients />
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