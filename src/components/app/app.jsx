import React from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import utdata from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ingdata: utdata
    }
  }

  render() {
    return (
      <div className="App">
        <AppHeader/>
        <main>
          <div className={appStyles.grid}>
            <section className={appStyles.column}>
              <h2 className="text text_type_main-large">Соберите бургер</h2>
              <div className={appStyles.cellContent}>
                <BurgerIngredients ingdata={this.state.ingdata}/>
              </div>
            </section>
            <section className={appStyles.column}>
              <div className={appStyles.cellContent}>
                <BurgerConstructor ingdata={this.state.ingdata}/>
              </div>            
            </section>
          </div>
        </main>
        <footer />
      </div>
    );
  }
}

export default App;
