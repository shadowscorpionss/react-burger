import React from 'react';
import AppHeader from '../app-header/app-header';
import './app.css';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import utdata from '../../utils/data'

class App extends React.Component{  
  constructor(props){
    super(props);
    this.state = {ingdata: utdata}
  }

  render () {
    return (
      <div className="App">
        <AppHeader />
        <BurgerIngredients ingdata={this.state.ingdata}/>
        
      </div>
    );
  }
}

export default App;
