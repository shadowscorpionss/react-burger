import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { removeConstructorIngredientAction, addConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDrop } from "react-dnd";
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";

const BurgerConstructorElement = ({ ingredient, isOnTheTop }) => {
    const dispatch = useDispatch();
    //calculate fields
    const bunType = ingredient.type === "bun";
    let text = ingredient.name;
    let elType = "";
    if (bunType) {
        elType = isOnTheTop ? "top" : "bottom";
        text = `${text}${bunType && (isOnTheTop ? " (верх)" : " (низ)")}`;
        if (!ingredient.name)
            text = "Выберете булку";
    }

    //event handlers
    const handleClose = () => {
        if (bunType)
            return;
        dispatch(removeConstructorIngredientAction(ingredient.uniqueId));
    };

    const SortItem = (targetItem, dropItem) => {
        console.log('sort ', targetItem, dropItem);
    };

    const AddItem = (dropItem) => {        
        dispatch(addConstructorIngredientAction(dropItem));
    }


    const [{ isHover }, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            const dropItem=item.ingredient;
            if (dropItem.uniqueId)
                SortItem(ingredient, dropItem);
            else
                AddItem(dropItem);

        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        <>
            {!bunType && (<DragIcon />)}
            <div className={`${!bunType ? "mr-2" : ""} `} />
            <div className={burgerConstructorElementStyles.constructorElementContainer} ref={dropTarget}>
                <ConstructorElement                    
                    type={elType}
                    text={text}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    isLocked={bunType}
                    handleClose={handleClose} />
            </div>
        </>
    );
}

export default BurgerConstructorElement;