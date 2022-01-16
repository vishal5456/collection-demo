import React from 'react';
import style from "../style/cart.module.scss";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Index() {

    const [cart,setCart] = React.useState({});
    const [totalItem,setTotalItem]  =React.useState("");
    const [totalPrice,setTotalPrice]  =React.useState("");


    React.useEffect(()=>{
        let auth = JSON.parse(localStorage.getItem("credential"));
        if(!(auth)){
            history.push("/login")
        }else{
            let cartValue = JSON.parse(localStorage.getItem("cart"));
            if(cart){
            setCart(cartValue);
            getTotalPrice(cartValue);
            }
           
        }
       
    },[]);

    React.useEffect(()=>{
        if(cart){
        let cartValue = JSON.parse(localStorage.getItem("cart"));
        getTotalPrice(cartValue);
        }
    },[cart]);

   

    const handlePlus = (product)=>{

        let cartValue = cart;
        for(let key in cartValue){
            cartValue[key].map((item)=>{
                if(item.id==product.id){
                    item.count += 1;
                }
               
            })
        }
        localStorage.setItem("cart",JSON.stringify(cartValue));
        setCart({...cartValue});
    }

    const handleMinus = (product)=>{
        let cartValue = cart;
        for(let key in cartValue){
            cartValue[key].map((item)=>{
                if(item.id==product.id){
                    if(item.count>1){
                    item.count = item.count - 1;
                     }else if(item.count==1){
                         if( cartValue[product.category].length==1){
                             let reall = cart;
                             delete reall[product.category]
                             cartValue = {...reall}
                         }else{
                       let newSubtractedCart = cartValue[product.category].filter((item)=>item.id != product.id);

                       cartValue = {...cart,[product.category]:[...newSubtractedCart]}
                      }
                     }
                 }
               
            })
        }
        localStorage.setItem("cart",JSON.stringify(cartValue));
        setCart({...cartValue});
    }



    const history = useHistory();

    const getTotalPrice = (cartValue)=>{
        let count = 0;
        let price = 0;
        for(let key in cartValue){
            cartValue[key].map((item)=>{

                count += item.count;
                price = price + (item.price*item.count);
            })
        }
        setTotalItem(count);
        setTotalPrice(price);
    }
   

    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.back}>
                    <FontAwesomeIcon icon="arrow-left" onClick={()=>history.push("/")}/>
                </div>
                <div className={style.bag}>
                    <h1>My Bag</h1>
                    <h4>{`Total ${totalItem} Items`}</h4>
                </div>
            </div>
            <div className={style.cartContainer}>
                {
                    cart ? Object.keys(cart).length != 0 ?

                    Object.keys(cart).map((item)=>
                   
                        cart[item].map((product,index)=>
                            
                        <div className={style.itemContainer} key={index}>
                            <div className={style.image}>
                                <img src={product.imageURL} alt="man"/>
                            </div>
                            <div className={style.quantity}>
                                <div className={style.name}>
                                   {product.name}
                                </div>
                                <div className={style.price}>
                                    {`$${product.price}`}
                                </div>
                                <div className={style.icon}>
                                    <div className={style.iconbox} onClick={()=>handleMinus(product)}>
                                    <FontAwesomeIcon icon="minus"/>
                                    </div>
                                    <span>{product.count}</span>
                                    <div className={style.iconbox} onClick={()=>handlePlus(product)}>
                                    <FontAwesomeIcon  icon="plus"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    )
                    :
                    <div className={style.noItemContainer}>
                        <div className={style.noItem}>No Items </div>
                        <div className={style.addProduct} onClick={()=>history.push("/")}>Add Product</div>
                    </div>
                    :
                    <div className={style.noItemContainer}>
                        <div className={style.noItem}>No Items </div>
                        <div className={style.addProduct} onClick={()=>history.push("/")}>Add Product</div>
                    </div>
                }
            </div>
            <div className={style.totalContainer}>
                <h2>TOTAL</h2>
                <h4>{`$${totalPrice}`}</h4>
            </div>
            <div className={style.button}>
                <div className={style.next}>NEXT</div>
            </div>
        </div>
    )
}
