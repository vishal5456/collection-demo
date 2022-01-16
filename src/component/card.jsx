import React from "react";
import styles from "../style/card.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Index(props) {
  console.log("props",props);
  const initialState = {}
  const [cart,setCart] = React.useState(initialState);

  React.useEffect(()=>{
   let cart = JSON.parse(localStorage.getItem("cart"));
   if(cart){
    setCart({...cart});
   }
  },[])

  //plus button functionality
  const handlePlus = ()=>{
   let newAddedCart = {};
   let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart){
     if(cart[props.data.category]){
        let presentInCart = cart[props.data.category].filter((item)=>item.id==props.data.id);

       if(presentInCart.length==1){
         let updatedcart =  cart[props.data.category].map((item)=>{
            if(item.id==presentInCart[0].id){
              item.count += 1;
              
            }
            return item;
          })

        newAddedCart = {...cart,[props.data.category]:[...updatedcart] }

       }else{
         newAddedCart = {...cart,[props.data.category]:[...cart[props.data.category],{...props.data,count:1}] }
       }
      }else{
        newAddedCart = {...cart,[props.data.category]:[{...props.data,count:1}] }
      }
    }else{
    newAddedCart = {[props.data.category]:[{...props.data,count:1}] }
    }
    localStorage.setItem("cart",JSON.stringify(newAddedCart))
    
    setCart({...newAddedCart})
  }

  //minus button functionality
  const handleMinus = ()=>{
    let newSubtractedCart = {}
    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart){
      if(cart[props.data.category]){
        let presentInCart = cart[props.data.category].filter((item)=>item.id==props.data.id)[0];
        if(presentInCart.count>1){
          let updatedcart =  cart[props.data.category].map((item)=>{
            if(item.id==presentInCart.id){
              item.count = item.count - 1;
              
            }
            return item;
          })
        newSubtractedCart = {...cart,[props.data.category]:[...updatedcart] }
        }else if(presentInCart.count==1){
          if(cart[props.data.category].length==1){
            let reall = cart;
            delete cart[props.data.category]
            newSubtractedCart = {...reall}
          }else{
          let updatedcart =  cart[props.data.category].filter((item)=>item.id!=presentInCart.id)
          newSubtractedCart = {...cart,[props.data.category]:[...updatedcart] }  
          }
        }else{
          newSubtractedCart = {...cart}
        }
      }else{
        return ;
      }
    }else{
      return
    }
    localStorage.setItem("cart",JSON.stringify(newSubtractedCart));
    setCart({...newSubtractedCart});
 

  }

  return (
    <div className={styles.cardComponent}>
      <div className={styles.myCard}>
        <div className={styles.like}>
        <FontAwesomeIcon icon="heart"/>
        </div>
        <div className={`${styles.card} card`}>
          <div className={styles.image}>
            <img src={props.data.imageURL} alt="" />
          </div>
          <div className={styles.heading}>
            <span>{props.data.name}</span>
          </div>
          <div className={styles.rating}>
            <div className={styles.star}>
              <FontAwesomeIcon icon="star"/>
              <FontAwesomeIcon icon="star"/>
              <FontAwesomeIcon icon="star"/>
              <FontAwesomeIcon icon="star"/>
              <FontAwesomeIcon icon="star"/>
            </div>
            <div className={styles.cost}>{`$${props.data.price}`}</div>
          </div>
          <div className={styles.whiteBox}>
            <div className={styles.quantityBox}>
            <FontAwesomeIcon icon="minus" onClick={()=>handleMinus()}/>
              
              {
                cart ? 
                cart[props.data.category] ? 
                cart[props.data.category].filter((item)=>item.id==props.data.id).length > 0 ?
                cart[props.data.category].map((item,index)=>
                      item.id==props.data.id ?
                      <span key={index}>
                        {item.count}
                      </span>
                        :  
                        null  
                     ):
                     <span>
                     0
                   </span>
                   :
                       <span>
                       0
                     </span>:
                      <span>
                      0
                    </span>        
                
              }
             
              <FontAwesomeIcon icon="plus" onClick={()=>handlePlus()}/>
            </div>
            <div className={styles.cartBox}>
              <FontAwesomeIcon icon="shopping-cart"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}