import burgerIngredientStyles from "./burger-ingredient.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ ingredient }) => {    
    const { name, image, price, } = ingredient

    return (

        <li className={`${burgerIngredientStyles.ingredient} mb-8 `}  >
            <div >

                <Counter count={1} size="default" />
                <img src={image} alt={name} className="ml-4 mr-4 mb-1" />
                <div className={`${burgerIngredientStyles.currency} mb-1`}>
                    <p className="text text_type_digits-default ">{price}&nbsp;</p>
                    <CurrencyIcon />
                </div>
                <p className="text text_type_main-small">{name}</p>
            </div>           

        </li>

    )
}

export default BurgerIngredient;