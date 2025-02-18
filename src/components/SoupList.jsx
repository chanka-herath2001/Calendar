import axios from "axios";
import { useEffect, useState } from "react";

const fetchSoupsFromAPI = async () => {
  try {
    const res = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=Soup");
    return res.data.meals;
  } catch (error) {
    console.error("Error fetching soup data:", error);
    return [];
  }
};

const SoupList = () => {
  const [soups, setSoups] = useState([]);

  useEffect(() => {
    const fetchSoups = async () => {
      const data = await fetchSoupsFromAPI();
      setSoups(data);
    };
    fetchSoups();
  }, []);

  return (
    <div>
      <h2>Soup List</h2>
      <ul>
        {soups.map((soup) => (
          <li key={soup.idMeal}>{soup.strMeal}</li>
        ))}
      </ul>
    </div>
  );
};

export default SoupList;
