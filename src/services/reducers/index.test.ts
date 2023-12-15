import { rootReducer } from ".";
import { TApplicationActions } from "../actions";

describe('test rootReducer', () => {
    it('should return combined reducer', () => {
        const result = rootReducer(undefined, {} as TApplicationActions);
        expect(result.burgerConstructor).not.toBeNull();
        expect(result.burgerIngredients).not.toBeNull();
        expect(result.currentOrder).not.toBeNull();
        expect(result.feed).not.toBeNull();
        expect(result.order).not.toBeNull();
        expect(result.profile).not.toBeNull();
        expect(result.userOrders).not.toBeNull();
    });

});