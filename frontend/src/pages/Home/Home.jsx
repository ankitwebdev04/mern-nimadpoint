import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {

    const [category,setCategory] = useState("All"); 

  return (
    <div>
      <Header/>
       {/*Here category and setcategory is passed in exploremenu as a prop */}
       {/* After passing we destructure this into exploremenujsx file */}
      <ExploreMenu category={category} setCategory={setCategory}/>
      
      {/* Here category is passed as a prop after passing 
      destruct this into fooddisplay.jsx file */}
      <FoodDisplay category={category}/>
      {/* this component is mounted from App Download jsx file */}
      <AppDownload/>
    </div>
  )
}

export default Home
