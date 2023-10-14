import {useState, useEffect, useContext, useReducer} from "react";
import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {getIngredients} from "../../utils/api";
import { DataContext, ConstructorContext, OrderContext } from "../../utils/context";
import { ADD_CONSTRUCTOR_INGREDIENT, CLEAR_CONSTRUCTOR_DATA, GENERATE_CONSTRUCTOR_DATA, REMOVE_CONSTRUCTOR_INGREDIENT } from "../../services/actions/burger-constructor";
import {v4 as uuid4} from "uuid";

function addUniqueId(item){
  return {...item, uniqueId:uuid4()};
}

function constructorReducer(state, action){
    console.log(action.type);
    switch(action.type){
      case GENERATE_CONSTRUCTOR_DATA:
          const data= action.payload;
         //random random elements (not bun)  
          const randomShuffledIngredients = [...data.filter(el => el.type !== "bun")].sort(() => 0.5 - Math.random())
          const minCount = 1;
          const randomIngredientsLength = Math.floor((randomShuffledIngredients.length-minCount) * Math.random())+minCount;
          const ingredients=randomShuffledIngredients.slice(0, randomIngredientsLength).map(el=> addUniqueId(el) );

          //buns
          const bunsArr = data.filter(el => el.type === "bun");

          //random bun
          const randomBun = bunsArr[Math.floor(bunsArr.length * Math.random())];
          randomBun.uniqueId=uuid4();
          return {data: [randomBun,...ingredients,randomBun]};
      case REMOVE_CONSTRUCTOR_INGREDIENT:
          const removeItem = action.item;
          return {data: state.data.filter(el=> el!==removeItem)};
      case ADD_CONSTRUCTOR_INGREDIENT:
          const item = addUniqueId(action.item);
          let exIngredients=state.data.filter(el=>el.type!=="bun");
          let exBun = state.data.find(el=>el.type==="bun");
          if (item.type==="bun"){
            exBun=item;            
          } else {
            exIngredients.push(item);
          }
          return {data: [exBun,...exIngredients,exBun]};
      case CLEAR_CONSTRUCTOR_DATA:
          return constructorDataInitialState;


      default:
        throw Error('Unknown action: ' + action.type);
    }

}

const constructorDataInitialState = {data: []};

function App() {
  
  
  const [ingredientsData, setIngredientsData]= useState([]);
  const [orderId, setOrderId]= useState(0);

  const [constructorData, constructorDispatcher]= useReducer(constructorReducer,constructorDataInitialState);

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

      setIngredientsData([]);
      console.log("I've caught it! ", err);
    }
    
    function gotData(obj){
      setState({
        ...state,        
        hasError: !obj.success,
        isLoading: false
      });
      setIngredientsData(obj.data);      

      constructorDispatcher({ 
        type:GENERATE_CONSTRUCTOR_DATA,
        payload: obj.data
      })

    }

    setState({
      ...state,
      hasError: false,
      isLoading: true
    });

    getIngredients().then(gotData).catch(catchError);
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
          <DataContext.Provider value={ingredientsData}>
            <ConstructorContext.Provider value={{constructorData, constructorDispatcher}}>
              <OrderContext.Provider value= {{orderId,setOrderId}}>
                <div className={appStyles.grid}>
                  <section className={appStyles.column}>
                    <h2 className="text text_type_main-large">Соберите бургер</h2>
                    <div className={appStyles.cellContent}>
                      {ingredientsData && ingredientsData.length && (<BurgerIngredients />)}                      
                    </div>
                  </section>                  
                  <section className={appStyles.column}>
                    <div className={appStyles.cellContent}>
                      {ingredientsData && ingredientsData.length && (<BurgerConstructor />)}
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
    </div>
  );
}

export default App;
