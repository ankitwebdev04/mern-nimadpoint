import axios from "axios";
import { createContext, useEffect, useState } from "react";

// we have made a storecontext and exported it 
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    // if the user will add any item 1st time in the cart this statement will execute
    // where one entry will be created.. the keyid will be itemId 
    //and the value will be no. of quantity
    // new entry will be created
    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        // if the product item is already available and quantity is 1 we will increase that

        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        // when we logedin we have token and when we add product in cart so then product wil be added in databse cart too
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }
    // decrease the value by 1
    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
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
    // here the foodlist api created using get method  thats why we used axios.get method here 
    const fetchFoodList = async () => {
       const response = await axios.get(url+"/api/food/list");
      setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
        // here in response we will get the cart data and we will store it in a variable named cartitems
        setCartItems(response.data.cartData);
    }
    
        //localstorage data will save in token state even if we refresh the page.so we will not get logout 

    useEffect(()=>{
       async function loadData() {
        await fetchFoodList();
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"));
            // here we call the loadcartdata and token from localstorage and provide a token keyname
            await loadCartData(localStorage.getItem("token"));
       } 
       }
       loadData();
    },[])

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
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;