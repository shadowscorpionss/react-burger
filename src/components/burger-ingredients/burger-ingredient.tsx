import burgerIngredientStyles from './burger-ingredient.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { setCurrentIngredientAction } from '../../services/actions/burger-ingredients';
import { useMemo, FC, MouseEventHandler } from 'react';
import { addConstructorIngredientAction, setConstructorBunAction } from '../../services/actions/burger-constructor';
import { useDrag } from 'react-dnd';
import { INGREDIENTS_PATH } from '../../pages/pages-paths';
import { Link, useLocation } from 'react-router-dom';
import { IIngredient } from '../../types/ingredient-types';
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';

interface IBurgerIngredient {
  ingredient: IIngredient;
};

const BurgerIngredient: FC<IBurgerIngredient> = ({ ingredient }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  //store
  const { ingredients, bun } = useAppSelector(store => store.burgerConstructor);

  const [{ opacity }, drag] = useDrag({
    type: 'ingredient',
    item: { ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  //counter
  const count = useMemo<number>(() => {
    if (ingredient.type === 'bun' && bun._id == ingredient._id) {
      return 2;
    }
    const g = ingredients.filter(el => el ? el._id === ingredient._id : null);
    return g && g.length ? g.length : 0
  }, [ingredients, bun]);

  //event handlers
  const handleIngredientClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
      e.stopPropagation();
      if (ingredient.type !== 'bun')
        dispatch(addConstructorIngredientAction(ingredient));
      else
        dispatch(setConstructorBunAction(ingredient));
      return;

    }
    dispatch(setCurrentIngredientAction(ingredient));
  }

  return (

    <li className={`${burgerIngredientStyles.ingredient} mb-8 `}>
      <Link
        to={`${INGREDIENTS_PATH}/${ingredient._id}`}
        state={{ background: location }}
        className={burgerIngredientStyles.container}
      >
        <div style={{ opacity: opacity }} ref={drag} onClick={handleIngredientClick}
          title='Зажмите CTRL и кликните по ингридиенту, чтобы добавить в корзину'
          data-test-id={ingredient._id}>
          {!!count && <Counter count={count} size='default' />}
          <img src={ingredient.image} alt={ingredient.name} className='ml-4 mr-4 mb-1' />
          <div className={`${burgerIngredientStyles.currency} mb-1`}>
            <p className='text text_type_digits-default '>{ingredient.price}&nbsp;</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className='text text_type_main-small'>{ingredient.name}</p>
        </div>
      </Link>
    </li>

  )
};

export default BurgerIngredient;