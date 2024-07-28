import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Login from './components/Login';
import RecipeList from './components/RecipieList';
import Register from './components/Register';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Filter from './components/Filter';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecepies, setFilteredRecepies] = useState([]);
  const [tags,setTags] = useState([]);
  const [filters,setFilters]= useState({
    tag:''
  })

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recepie',{
          headers: {
            Authorization:`Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`
          }
        });
        setRecipes(response.data.recipes);
        setFilteredRecepies(response.data.recipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    const fetchFilters =async ()=>{
      try {
        const tagResponse = await axios.get('http://localhost:5000/api/recepie/tags',{
          headers: {
            Authorization:`Bearer ${JSON.parse(
              localStorage.getItem('token')
            )}`
          }
        });
        setTags(tagResponse.data);
      } catch (error) {
        console.error('Error fetching filter options',error);
      }
    }

    fetchRecipes();
    fetchFilters();
  }, []);

  useEffect(()=>{
    const fetchFilteredRecepies = async ()=>{
      try {
        let response;
        if(filters.tag){
          response = await axios.get(`http://localhost:5000/api/recepie/tag/${filters.tag}`,{
            headers: {
              Authorization:`Bearer ${JSON.parse(
                localStorage.getItem('token')
              )}`
            }
          })
        }else{
          response = await axios.get('http://localhost:5000/api/recepie',{
            headers: {
              Authorization:`Bearer ${JSON.parse(
                localStorage.getItem('token')
              )}`
            }
          })
        }
        let filtered = response.data.recipes;
        setFilteredRecepies(filtered);
      } catch (error) {
        console.error('Error fetching filtered recipes:', error);
      }
    };
    fetchFilteredRecepies();
  },[filters]);

  const handleFilterChange = (filter) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filter.type]: filter.value
    }));
  };

  //console.log(tags);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<>
            <Filter tags={tags} onFilterChange={handleFilterChange}/>
            <RecipeList recipes={filteredRecepies}/>
            </>} 
            />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
