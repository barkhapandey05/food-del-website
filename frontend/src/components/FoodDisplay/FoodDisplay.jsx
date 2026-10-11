import './FoodDisplay.css'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({category, searchText}) => {

    const{food_list} = useContext(StoreContext);
    const normalizedSearch = searchText.trim().toLowerCase();
    const visibleFoods = food_list.filter((item) => {
      const matchesCategory = category === "All" || category === item.category;
      const matchesSearch = !normalizedSearch
        || item.name.toLowerCase().includes(normalizedSearch)
        || item.description.toLowerCase().includes(normalizedSearch);
      return matchesCategory && matchesSearch;
    });

  return (
    <div className = 'food-display' id = 'food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {visibleFoods.map((item) => (
          <FoodItem key={item._id} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
        ))}
      </div>
      {visibleFoods.length === 0 && <p className="food-display-empty">No dishes found. Try another search.</p>}
    </div>
  )
}

export default FoodDisplay
