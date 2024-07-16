"use client"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { CartProductType } from "@/app/product/[productId]/ProductDetails";


type CartContextType={
    cartTotalQty:number
    cartTotalAmount:number,
    cartProducts:CartProductType[]|null;
    handleAddProductToCart:(product:CartProductType)=>void
    handleRemoveProductCart:(product:CartProductType)=>void
    handleCartQtyIncrease:(product:CartProductType)=>void
    handleCartQtyDecrease:(product:CartProductType)=>void
    handleClearCart:()=>void
    paymentIntent: string | null;
    handleSetPaymentIntent:(val:string | null) =>void;
}
export const CartContext=createContext<CartContextType|null>(null);
interface Props{
[propName:string]:any
}

export const CartContextProvider=(props:Props)=>{
    const [cartTotalQty,setCartTotalQty]=useState(0)
    const [cartTotalAmount,setCartTotalAmount]=useState(0);
    const [cartProducts,setCartProducts]=useState<CartProductType[] | null>(null)

    const [paymentIntent,setPaymentIntent]=useState<string |null>(null)

    useEffect(()=>{
     const cartItems:any=localStorage.getItem('eShopCartItems')
     const cProducts:CartProductType[]|null=JSON.parse(cartItems)

     const eShopPaymentIntent:any
     =localStorage.getItem('eShopPaymentIntent')

     const paymentIntent:string | null =JSON.parse(eShopPaymentIntent)

     setCartProducts(cProducts)
     setPaymentIntent(paymentIntent)
    

    
    },[])

    useEffect(() => {
        const getTotals = () => {
            if (cartProducts && cartProducts.length > 0) {
                const { total, qty } = cartProducts.reduce((acc, item) => {
                    const itemTotal = item.price * item.quantity;
    
                    acc.total += itemTotal;
                    acc.qty += item.quantity;
    
                    return acc;
                }, {
                    total: 0,
                    qty: 0
                });
    
                setCartTotalQty(qty);
                setCartTotalAmount(total);
            } else {
                // If cartProducts is empty or undefined, reset the totals
                setCartTotalQty(0);
                setCartTotalAmount(0);
            }
        };
    
        getTotals();
    }, [cartProducts]);

    // console.log("amount",cartTotalAmount)
    // console.log("qty",cartTotalQty)

    const handleAddProductToCart=useCallback((product:CartProductType)=>{
        alert("Added Successfylly")
        setCartProducts((prev)=>{
            let updatedCart;
            if(prev){
                updatedCart=[...prev,product]

            }else{
                updatedCart=[product];
            }
            localStorage.setItem('eShopCartItems',JSON.stringify(updatedCart))
            return updatedCart;
        })

    },[])

    const handleRemoveProductCart=useCallback((product:CartProductType)=>{
        alert("Removed Successfully")
    if(cartProducts){
        const filteredProducts=cartProducts.filter((item)=>{
            
            return item.id !== product.id
        })
        setCartProducts(filteredProducts)
        localStorage.setItem('eShopCartItems',JSON.stringify(filteredProducts))
    

    }
    },[cartProducts])

    const handleCartQtyIncrease = useCallback((product: CartProductType) => {
        if (product.quantity === 99) {
            return "OOOP! Maximum Reached";
        }
    
        setCartProducts((prevCartProducts) => {
            const updatedCart = prevCartProducts.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
    
            const productExists = updatedCart.some((item) => item.id === product.id);
            if (!productExists) {
                updatedCart.push({ ...product, quantity: 1 });
            }
    
            localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, [setCartProducts]);

    const handleCartQtyDecrease = useCallback((product: CartProductType) => {
        setCartProducts((prevCartProducts) => {
            const updatedCart = prevCartProducts.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: Math.max(item.quantity - 1, 1) };
                }
                return item;
            });
    
            localStorage.setItem('eshopCartItems', JSON.stringify(updatedCart));
            return updatedCart;
        });
    }, [setCartProducts]);

    const handleClearCart=useCallback(()=>{
        setCartProducts(null)
        setCartTotalQty(0)
        localStorage.setItem('eshopCartItems', JSON.stringify(null));

    },[cartProducts])

    const handleSetPaymentIntent=useCallback((val:string | null)=>{
       setPaymentIntent(val)
       localStorage.setItem('eShopPaymentIntent',JSON.stringify(val))
    },[paymentIntent]);
    const value={
        cartTotalQty,
        cartTotalAmount,
        cartProducts,
        handleAddProductToCart,handleRemoveProductCart,handleCartQtyIncrease,handleCartQtyDecrease,handleClearCart,
        paymentIntent,
        handleSetPaymentIntent,
        
    }
    return <CartContext.Provider value={value} {...props}/>
}

export const UseCart=()=>{
   const context= useContext(CartContext);

   if(context===null) {
    throw new Error("useCart must be used within a CartContextProvider")
   }
   return context
;}
