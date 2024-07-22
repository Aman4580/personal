import './App.css';
import { useEffect } from 'react';
import { fetchDataFromApi } from './utils/api';
import {useDispatch } from 'react-redux';
import { getApiConfiguration ,getGenres} from './store/homeSlice';
import {Routes,Route} from 'react-router-dom';

import Home from './pages/home/Home';


import Details from './pages/details/Details';


import Explore from './pages/explore/Explore';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SearchResult from './pages/searchResult/SearchResult';
import PageNotFound from './pages/404/PageNotFound';




function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
  apiTesting();

  genresCall();


  },[])
  const apiTesting = ()=>{
    fetchDataFromApi('/configuration').then((res)=>{
      console.log(res);
      const url = {
        backdrop:res.images.secure_base_url + 
        "original",
        poster:res.images.secure_base_url + 
        "original",
        profile:res.images.secure_base_url + 
        "original",
      }

      dispatch(getApiConfiguration(url));
    })
}

const genresCall = async () => {
  let promises = [];
  let endPoints = ["tv", "movie"];
  let allGenres = {};

  endPoints.forEach((url) => {
      promises.push(fetchDataFromApi(`/genre/${url}/list`));
  });

  const data = await Promise.all(promises);
  console.log(data);
  data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
  });

  dispatch(getGenres(allGenres));
};






  return (
    <div>
    <Header/>
      <Routes>
        <Route path = "/" element={<Home/>} />
        <Route path="/:mediaType/:id" element={<Details/>}></Route>
        <Route path="/search/:query" element={<SearchResult/>}></Route>
        <Route path="explore/:mediaType" element={<Explore/>}></Route>
        <Route path="*" element={<PageNotFound/>}></Route>
        <Route></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
