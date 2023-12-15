import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerConstructorStyles from './burger-constructor.module.css';
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { addConstructorIngredientAction, setConstructorBunAction, sortConstructorDataAction } from '../../services/actions/burger-constructor';
import { makeOrderThunk } from '../../services/actions/order';
import BurgerConstructorElement from './burger-constructor-element';
import { useDrop } from 'react-dnd';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_PATH, ORDER_PATH } from '../../pages';
import { ITheIngredient } from '../../types/constructor-types';
import { IIngredient } from '../../types/ingredient-types';
import { useAppDispatch, useAppSelector } from '../../types/app-redux-thunk';

const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector(store => store.profile);
  //states and context
  const { ingredients, bun } = useAppSelector(store => store.burgerConstructor);
  const lref = useRef<HTMLLIElement>({} as HTMLLIElement);
  const [isDragging, setIsDragging] = useState(false);

  const dispatch = useAppDispatch();

  //structured data
  const ingredientsIds = useMemo(() => [bun._id, ...ingredients.map(el => el ? el._id : null), bun._id] as Array<string>, [ingredients, bun]);

  //total
  const total = useMemo(() =>
    ingredients.reduce((acc, el) => el ? acc + el.price : acc, 0) + (bun && bun.price ? bun.price * 2 : 0)
    , [ingredients, bun]);

  //methods
  const callMakeOrder = () => {
    if (!user.email) {
      navigate(LOGIN_PATH, { replace: true });
      return;
    }
    dispatch(makeOrderThunk(ingredientsIds));
    navigate(ORDER_PATH, { state: { background: location } });
  };

  const moveIngredient = (dragIndex: number, hoverIndex: number) => {
    // Получаем перетаскиваемый ингредиент
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients];
    // Удаляем перетаскиваемый элемент из массива
    newCards.splice(dragIndex, 1);
    // Вставляем элемент на место того элемента, над которым мы навели мышку с 'перетаскиванием'
    // создается новый массив, в котором изменен порядок элементов
    newCards.splice(hoverIndex, 0, dragCard);
    dispatch(sortConstructorDataAction(newCards));
  };


  //drop ingredients
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop: (item: { ingredient: IIngredient }) => {
      const dropItem = item.ingredient;
      if (dropItem.type !== 'bun')
        dispatch(addConstructorIngredientAction(dropItem));
      else
        dispatch(setConstructorBunAction(dropItem));
    },

  });

  //render
  const renderConstructorElement = useCallback((item: ITheIngredient, index: number) => {
    return (
      (
        <li ref={lref} key={item.uniqueId} className={`${burgerConstructorStyles.listItem} `}>
          <BurgerConstructorElement ingredient={item} index={index} moveIngredient={moveIngredient} setIsDragging={setIsDragging} />
        </li>
      )
    )
  }, [ingredients]);

  //scroll into the end after adding (not when dragging)
  useEffect(() => {
    if (lref.current && !isDragging && typeof lref.current.scrollIntoView === 'function')
      lref.current.scrollIntoView({
        behavior: 'smooth',
      });
  }, [ingredients]);

  return (
    <section className={burgerConstructorStyles.bconstructor} ref={dropTarget}>
      <div>
        <div >
          <div><ConstructorElement
            type='top'
            isLocked={true}
            text={bun.name ? `${bun.name} (верх)` : 'Выберете булку'}
            price={bun.price}
            thumbnail={bun.image}
          /></div>
        </div>
        <ul className={`${burgerConstructorStyles.blist} custom-scroll`}>
          {ingredients && ingredients.length ?
            (
              ingredients.map((item, index) => renderConstructorElement(item, index))
            ) : ''}
        </ul>
        <div>
          <div><ConstructorElement
            type='bottom'
            isLocked={true}
            text={bun.name ? `${bun.name} (низ)` : 'Выберете булку'}
            price={bun.price}
            thumbnail={bun.image} /></div>
        </div>
      </div>
      <div className={burgerConstructorStyles.currency}>
        <div className={burgerConstructorStyles.orderButton}>
          <span
            className={`${burgerConstructorStyles.currency} text text_type_digits-medium `}>{total}&nbsp;<CurrencyIcon type='primary' />
            &nbsp;
          </span>
          <Button disabled={!bun || !bun.price} type='primary' size='large' htmlType='button' onClick={callMakeOrder}>Оформить заказ</Button>
        </div>
      </div>

    </section>

  );
}


export default BurgerConstructor;
