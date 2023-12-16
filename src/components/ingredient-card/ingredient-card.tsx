//styles
import IngredientDetailsStyles from './ingredient-card.module.css';
//react
import { FC } from 'react';

//types
import { IIngredient } from '../../types/ingredient-types';

interface IIngredientCard{
    currentIngredient: IIngredient;
}

const IngredientCard:FC<IIngredientCard> = ({ currentIngredient }) => {
    return (
        <div className={IngredientDetailsStyles.ingredientCard} >
            <div className={IngredientDetailsStyles.c1}>
                <img src={currentIngredient.image_large ?? currentIngredient.image} alt={currentIngredient.name} data-test={'ingredient-details-image'}/>
            </div>
            <div className={IngredientDetailsStyles.c2}>
                <p className="text_type_main-medium text" data-test={'ingredient-details-name'}>{currentIngredient.name}</p>
            </div>
            <div className={IngredientDetailsStyles.c3}>
                <p className="text text_color_inactive text_type_main-small">Калории, ккал
                </p>
            </div>
            <div className={IngredientDetailsStyles.c4}>
                <p className="text_type_digits-default text_color_inactive" data-test={'ingredient-details-calories'}>{currentIngredient.calories}</p>
            </div>
            <div className={IngredientDetailsStyles.c5}>
                <p className="text_color_inactive text_type_main-small">Белки, г</p>
            </div>
            <div className={IngredientDetailsStyles.c6}>
                <p className="text_type_digits-default text_color_inactive" data-test={'ingredient-details-proteins'}>{currentIngredient.proteins}</p>
            </div>
            <div className={IngredientDetailsStyles.c7}>
                <p className="text_color_inactive text_type_main-small">Жиры, г</p>
            </div>
            <div className={IngredientDetailsStyles.c8}>
                <p className="text_type_digits-default text_color_inactive" data-test={'ingredient-details-fat'}>{currentIngredient.fat}</p>
            </div>
            <div className={IngredientDetailsStyles.c9}>
                <p className="text_color_inactive text_type_main-small">Углеводы, г</p>
            </div>
            <div className={IngredientDetailsStyles.c10}>
                <p className="text_type_digits-default text_color_inactive" data-test={'ingredient-details-carbohydrates'}>{currentIngredient.carbohydrates}</p>
            </div>
        </div>
    );
};

export default IngredientCard;