import React from 'react';
import style from "../style/dashboard.module.scss";
import slider from "../assets/slider.png";
import Loader from "../component/loader";
import Card from "../component/card";
import man from "../assets/man.jpg";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';


export default function Index() {
    
    const history = useHistory();
    const initialState={};
    const initialDataArray = [];

    const [state,setState] = React.useState(initialState);
    const [activeFilter,setActiveFilter] = React.useState("");
    const [dataArray,setDataArray]= React.useState(initialDataArray);
    const [loading,setLoding] = React.useState(false);


    React.useEffect(()=>{
        let auth =JSON.parse(localStorage.getItem("credential"));
            if(auth){
                setState({...initialState,...auth});
                let activefilter = ""
                if(auth.age<18){
                    activefilter="kid's-fashion"
                }else if(auth.age>18 && auth.gender=="Male"){
                    activefilter="men's-fashion";
                }else{
                    activefilter="women's-fashion"
                }
                setActiveFilter(activefilter);
                getData(activefilter);
            }else{
                history.push("/login");
            }
    },[])
   
    


    const logout = ()=>{
        localStorage.removeItem("credential");
        localStorage.removeItem("cart");
        history.push("/login");
    }

    const getData = async (category)=>{
        setLoding(true);
        const response = await axios({
            method: "get",
            headers:{
              'Content-Type': 'application/json'
             },
            url: `https://asia-south1-adon-interviews.cloudfunctions.net/getProductByCategory?category=${category}`,
           
          })
          console.log(response);
          if(response.data.status=="Ok"){
              setDataArray(...initialDataArray,response.data.data);
              setLoding(false);
          }
    }

    const handleFilter = (category)=>{
        setActiveFilter(category);
        getData(category)
    }

    
    return (
        <div className={`${style.container} container`}>
            <div className={style.header}>
                <div className={style.title}>
                    <h1>Welcome Back,</h1>
                    <h4>{state.name}</h4>
                </div>
                <img src={man} alt = ""/>
            </div>
            <div className={style.searchContainer}>
                <input type="text" placeholder="Search collection..." className={style.searchInput} />
                <div className={style.filter}>
                    <img src={slider} alt="slider"/>
                </div>
            </div>
            <div className={style.filterContainer}>
                <div className={activeFilter =="kid's-fashion" ? ` ${style.active} ${style.filterTab}` : style.filterTab} onClick={()=>handleFilter("kid's-fashion")}>Kid's Collection</div>
                <div className={activeFilter =="men's-fashion" ? ` ${style.active} ${style.filterTab}` : style.filterTab} onClick={()=>handleFilter("men's-fashion")}>Men's Collection</div>
                <div className={activeFilter =="women's-fashion" ? ` ${style.active} ${style.filterTab}` : style.filterTab} onClick={()=>handleFilter("women's-fashion")}>Women's Collection</div>
            </div>
            <div className={style.top}>
                <div className={style.text}>Top Collection</div>
                <div className={style.show}>Show All</div>
            </div>
           <div className={style.collectionCardContainer}>
               {
                   dataArray.map((item,index)=>
                       <Card
                         data={item}
                         key={index}
                       />
                   )
               }
               
            </div>
            <div className={style.footer}>
                <div className={style.icons}>
                    <div className={style.home}>
                        <FontAwesomeIcon icon="home"/>
                    </div>
                    <FontAwesomeIcon icon="star"/>
                    <FontAwesomeIcon icon="heart"/>
                    <FontAwesomeIcon icon="shopping-cart" onClick={()=>history.push("/cart")}/>
                    <FontAwesomeIcon icon="sign-out-alt" onClick={logout}/>
                </div>
             </div>
            {
                loading ?
                  <Loader/>
                  :
                  null
            }
             
        </div>
    )
}
