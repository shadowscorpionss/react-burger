import {useState, useEffect, useContext} from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients} from "../../utils/api";
import { DataContext, ConstructorContext, OrderContext } from "../../utils/context";

function App() {
  const [data, setData]= useState([]);
  const [constructorData, setConstructorData]= useState([]);
  const [orderId, setOrderId]= useState(0);

  const [state, setState] = useState({
    hasError:false,
    error:undefined,
    isLoading:false
  });

  //call api and fetch data
  function getData() {
    
    function catchError(err){
      setState({
        ...state,
        hasError: true,
        error: err,
        isLoading: false
      });

      setData([]);
      console.log("I've caught it! ", err);
    }
    
    function gotData(obj){
      setState({
        ...state,        
        hasError: !obj.success,
        isLoading: false
      });
      setData(obj.data);      
      generateConstructorItems(obj.data);
    }

    setState({
      ...state,
      hasError: false,
      isLoading: true
    });

    getIngredients().then(gotData).catch(catchError);
  }


  function generateConstructorItems(data){
      //random random elements (not bun)  
      const notBunFiltered = [...data.filter(el => el.type !== "bun")].sort(() => 0.5 - Math.random())
      const minCount = 1;
      const randomLength = Math.floor((notBunFiltered.length-minCount) * Math.random())+minCount;
      const notBunArr=notBunFiltered.slice(0, randomLength);

      //buns
      const bunsArr = data.filter(el => el.type === "bun");

      //random bun
      const randomBun = bunsArr[Math.floor(bunsArr.length * Math.random())];

      setConstructorData([randomBun, ...notBunArr, randomBun]);

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
          <DataContext.Provider value={data}>
            <ConstructorContext.Provider value={{constructorData, setConstructorData}}>
              <OrderContext.Provider value= {{orderId,setOrderId}}>
                <div className={appStyles.grid}>
                  <section className={appStyles.column}>
                    <h2 className="text text_type_main-large">Соберите бургер</h2>
                    <div className={appStyles.cellContent}>
                      {data && data.length && (<BurgerIngredients />)}                      
                    </div>
                  </section>                  
                  <section className={appStyles.column}>
                    <div className={appStyles.cellContent}>
                      {data && data.length && (<BurgerConstructor />)}
                    </div>
                  </section>                  
                </div>
              </OrderContext.Provider>
            </ConstructorContext.Provider>
          </DataContext.Provider>
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
