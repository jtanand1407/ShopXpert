
export const initialState = {
    basket: [],
    user: null,
};

export const subBasketTotal = (basket) => 
    basket?.reduce((amount, item) => item.price + amount, 0);


const reducer= (state, action) => {
    console.log(action)
    switch (action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        
        case "Remove_From_Basket":
            const index=state.basket.findIndex(
                (basketItem) => basketItem.id === action.id
            );

            let newBasket= [...state.basket];

            if(index >= 0)
            {
              newBasket.splice(index,1);
            }
            else{
            console.warm(`Can't remove the product (id: ${action.id}) as it is not present in the basket!!`)
            }

            return {
                ...state,
                basket: newBasket,
            };

        case "SET__USER":
            return{
                ...state,
                user: action.user,
            }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }

        default:
            return state;
    }
};

export default reducer;