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
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    // creating an arrow function which will return the cart total
    // added a variable with totalamount and initialised it with 0
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        // we are using the for in loop because the cartItems is an object
        // so this for loop will iterate over the object and it will provide items 1 by 1
        // items will be the key value of cartItems

        for (const item in cartItems) {
            // agar productid se item match hota h to mtlb cart me item available hoga
            // ye iteminfo.price 1 product ki price btayega jisko multiply krenge 
            //quantity se jisse totalAmount miljayega
            if (cartItems[item] > 0)
            {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return  totalAmount;
    }
    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])

    // IF we have any element in this object we can access that element in any component using the context.
    {/*Using this context we can access the food_list array anywhere */ }
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;