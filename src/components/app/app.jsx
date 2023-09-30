import {useState, useEffect} from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import utdata from "../../utils/data";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function App (){
  const [state, setState] = useState({
    ingdata: utdata, //default data from file
    isLoading: false,
    hasError: false,
  });
  
  //call api and fetch data  
  function getData() {
    setState({ ...state, hasError: false, isLoading: true });

    fetch("https://norma.nomoreparties.space/api/ingredients")
      .then(response => response.json())
      .then(obj => setState({ ...state, ingdata: obj.data, hasError: !obj.success,  isLoading: false }))
      .catch(err => {
        setState({ ...state, hasError: true, isLoading: false });
        console.log("I've caught it! ",err);
      })
  }

  //loading data on mount
  useEffect (()=>{
    return getData()    
  },[]);


  return (
    <div className="App">
      <AppHeader/>
      <main>
        <div className={appStyles.grid}>
          <section className={appStyles.column}>
            <h2 className="text text_type_main-large">Соберите бургер</h2>
            <div className={appStyles.cellContent}>
              <BurgerIngredients ingdata={state.ingdata}/>
            </div>
          </section>
          <section className={appStyles.column}>
            <div className={appStyles.cellContent}>
              <BurgerConstructor ingdata={state.ingdata}/>
            </div>
          </section>
        </div>
      </main>
      <footer/>
    </div>
  );
}

export default App;
