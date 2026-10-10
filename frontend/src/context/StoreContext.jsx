import axios from 'axios';
import { useEffect } from 'react';
import { useState } from "react";
import { createContext } from "react";

export const StoreContext = createContext();

const StoreContextProvider = (props) => {

    const [cartItems, setCartItem] = useState({});
    const url = import.meta.env.VITE_API_URL
    const [token, setToken] = useState(() => localStorage.getItem("token") || "");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId)=> {
        if(!cartItems[itemId]){
            setCartItem((prev) => ({...prev, [itemId]: 1}) )
        }
        else{
            setCartItem((prev) => ({...prev, [itemId] : prev[itemId] + 1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItem((prev) => ({...prev, [itemId]: prev[itemId] -1}))
        if(token){
            await axios.post(url+"/api/cart/remove", {itemId}, {headers: {token}})
        }
    }

    const getTotalCartAmount = ()=>
    {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] >0){
                let itemInfo = food_list.find((product)=> product._id === item );
                if (itemInfo) totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
            
    }

    useEffect(()=> {
        const fetchFoodList = async () => {
            try {
                const response = await axios.get(`${url}/api/food/list`);
                if (response.data.success) setFoodList(response.data.data);
            } catch (error) {
                console.error("Failed to load food list:", error);
            }
        };

        fetchFoodList();
    }, [url]);


    const contextValue = {
        cartItems,
        setCartItem,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        food_list,
        url,
        token,
        setToken
    }
    return(
        <StoreContext.Provider value = {contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;