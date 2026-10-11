import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import { useState } from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Home = ({searchText}) => {

  const [category,setCategory] = useState("All");
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToFood) {
      document.getElementById("food-display")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.key, location.state]);

  return (
    <div>
        <Header />
        <ExploreMenu category = {category} setCategory = {setCategory} />
        <FoodDisplay category = {category} searchText={searchText} />
        <AppDownload />
    </div>
  )
}

export default Home
