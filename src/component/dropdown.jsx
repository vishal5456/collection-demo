import React from "react";
import styles from "../style/dropdown.module.scss";




export default function Index(props) {
  
  const optionSelected = (option) => {
   
    props.getDropdownValue(option,props.dropdownParent);
    props.setDropdown(false);
    
  };

 
    
  return (
    <div className={ styles.mobileListContainer} >
      <div   className={styles.mobileListUiContainer}> 
       
          <ul>
          {props.values.map((item, index) => (
            <div  key={index} className={styles.content} onClick={() => optionSelected(item)}>
            <li >
            {item}
            </li>  
            </div>
          ))}
        </ul>
       

      </div>
    </div >
  );
}

