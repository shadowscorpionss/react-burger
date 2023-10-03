import {useState, useEffect} from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import utdata from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients} from "../../utils/api";

function App() {
  const [state,
    setState] = useState({
    ingdata: utdata, //default data from file
    isLoading: null,
    hasError: false,
    error: ""
  });

  //call api and fetch data
  function getData() {
    setState({
      ...state,
      hasError: false,
      isLoading: true
    });

    getIngredients().then(obj => {
      setState({
        ...state,
        ingdata: obj.data,
        hasError: !obj.success,
        isLoading: false
      })
    }).catch(err => {
      setState({
        ...state,
        hasError: true,
        error: err,
        isLoading: false
      });
      console.log("I've caught it! ", err);
    })
  }

  //loading data on mount
  useEffect(getData, []);  

  return (
    <div className="App">
      <AppHeader/>
      <main>
        {state.isLoading && ( 
          <> 
            <div className="loader"  />
            <div className="loader-text">Загрузка ...</div> 
          </>
        )}
        {!state.hasError && !state.isLoading && (
          <div className={appStyles.grid}>
            <section className={appStyles.column}>
              <h2 className="text text_type_main-large">Соберите бургер</h2>
              <div className={appStyles.cellContent}>
                {state.ingdata && state.ingdata.length && (<BurgerIngredients ingdata={state.ingdata}/>)}
                
              </div>
            </section>
            <section className={appStyles.column}>
              <div className={appStyles.cellContent}>
              {state.ingdata && state.ingdata.length && (<BurgerConstructor ingdata={state.ingdata}/>)}
              </div>
            </section>
          </div>
        )}
        {!state.isLoading && state.hasError && ( 
          <> 
            <div>Ошибка</div> 
            <div> {state.error} </div>
            <div>Попробуйте перезагрузить страницу.</div > 
          </>
        )}
      </main>
      <footer/>
    </div>
  );
}

export default App;
