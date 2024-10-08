import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

// we have made a storecontext and exported it 
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});

    // if the user will add any item 1st time in the cart this statement will execute
    // where one entry will be created.. the keyid will be itemId 
    //and the value will be no. of quantity
    // new entry will be created
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        // if the product item is already available and quantity is 1 we will increase that

        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }
    // decrease the value by 1
    const removeFromCart = () => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    // IF we have any element in this object we can access that element in any component using the context.
    {/*Using this context we can access the food_list array anywhere */ }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;