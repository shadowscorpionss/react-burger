import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { removeConstructorIngredientAction, addConstructorIngredientAction } from "../../services/actions/burger-constructor";
import { useDrag, useDrop } from "react-dnd";
import burgerConstructorElementStyles from "./burger-constructor-element.module.css";
import { useRef } from "react";

const BurgerConstructorElement = ({ ingredient, index, moveCard }) => {   
    const dispatch = useDispatch();
    const ref = useRef(null);

    //event handlers
    const handleClose = () => {
        dispatch(removeConstructorIngredientAction(ingredient.uniqueId));
    };

    const [{ handlerId }, drop] = useDrop({
        accept: 'constructor',
        collect: monitor => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            if (typeof(moveCard)==='function')
                moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex

        },
        drop(item) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
              return;
            }
            moveCard(dragIndex, hoverIndex);
          },
    });

    const [{ opacity }, drag] = useDrag({
        type: 'constructor',
        item: () => {
            return { ingredient, index }
        },
        collect: (monitor) => ({
            opacity: monitor.isDragging()? 0:1,
        }),
    });

    drag(drop(ref));
    return (
        <div ref={ref} onDrop={e=>e.preventDefault()} style={{ opacity: {opacity} }} className={burgerConstructorElementStyles.constructorElementContainer} data-handler-id={handlerId}>
            <div className={`${'mr-2'}  ${burgerConstructorElementStyles.selfCenter}`}> <DragIcon /></div>
            <div className={burgerConstructorElementStyles.constructorElementContainer}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    handleClose={handleClose} />
            </div>
        </div>
    );
}

export default BurgerConstructorElement;