import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/shoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingCartProviderProps={
    children:ReactNode
}
type ShoppingCartCOntext={
    openCart:()=>void
    closeCart:()=>void
    cartQuantity: number
    cartItems:CartItem[]

    getItemQuantity:(id:number)=>number
    increaseItemQuantity:(id:number)=>void
    decreaseItemQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
}
type CartItem={
    id:number
    quantity: number
}

const ShoppingCartContext=createContext({}as ShoppingCartCOntext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}
export function ShoppingCartProvider({ children }:ShoppingCartProviderProps){
    // const [cartItems, setCartItems]= useState<CartItem[]>([])
    const [isOpen, setIsOpen]= useState(false)
    const [cartItems, setCartItems]= useLocalStorage<CartItem[]>("shopping-cart",[])

    const cartQuantity= cartItems.reduce((quantity, item)=> item.quantity + quantity, 0)
    
    const openCart=()=> setIsOpen(true)
    const closeCart=()=>setIsOpen(false)

    function getItemQuantity(id:number){//find the item w/ current id, if the id matches (item exists) -> return the quantity of the current item ...else return 0
     return  cartItems.find(item=>item.id===id)?.quantity || 0   
    }
    
    function increaseItemQuantity(id:number){
        setCartItems(currItems=>{
            if(currItems.find(item=>item.id ===id)==null){//if we dont find the item
                return [...currItems,{id, quantity:1}]//return all of current items and add in a new item w/ id and quantity of 1
            }else{
                return currItems.map(item=>{
                    if(item.id===id){
                        return {...item, quantity:item.quantity+1} //if we find the right item, we increment the quantity
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function decreaseItemQuantity(id:number){
        setCartItems(currItems=>{
            if(currItems.find(item=>item.id ===id)?.quantity===1){
                return currItems.filter(item=>item.id !==id)
            }else{
                return currItems.map(item=>{
                    if(item.id===id){
                        return {...item, quantity:item.quantity-1}
                    }else{
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id:number){
        setCartItems(currItems=>{
            return currItems.filter(item=>item.id !==id) //filters out and returns items where the id is not equal to the input id
        })
    }
    return(
        <ShoppingCartContext.Provider 
        value={{
            getItemQuantity, 
            increaseItemQuantity, 
            decreaseItemQuantity, 
            removeFromCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity
            }}>
            {children}
            <ShoppingCart isOpen={isOpen}/>
        </ShoppingCartContext.Provider>
    )
}

