import React from 'react';
import AppHeader from '../app-header/app-header';
import './app.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import data from '../../utils/data'

class App extends React.Component{  
  constructor(props){
    super(props);
    this.state = {ingdata: data}
  }

  render () {
    return (
      <div className="App">
        <AppHeader />
        <BurgerIngredients />
      </div>
    );
  }
}

export default App;
