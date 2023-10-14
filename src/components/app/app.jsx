import { useState, useEffect, useContext, useReducer } from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App() {
  const [orderId, setOrderId] = useState(0);
  return (
    <div className="App">
      <AppHeader />
      <main>
          <div className={appStyles.grid}>
            <section className={appStyles.column}>
              <h2 className="text text_type_main-large">Соберите бургер</h2>
              <div className={appStyles.cellContent}>
                <BurgerIngredients />
              </div>
            </section>
            <section className={appStyles.column}>
              <div className={appStyles.cellContent}>
                <BurgerConstructor />
              </div>
            </section>
          </div>       
      </main>
    </div>
  );
}

export default App;
