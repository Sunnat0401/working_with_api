import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import  CreatePost from './CreatePost'
const App = () => {
  const [category, setCategory] = useState([])
  const imageUrl ="https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const getCategory = ( ) =>{
       axios({
        url:"https://autoapi.dezinfeksiyatashkent.uz/api/cities" ,
        method:"GET" ,
       }) .then((res) =>{
         setCategory(res?.data?.data)
         console.log(res?.data?.data);
       }).catch((err) =>{
        console.log(err);
       })
  }
  useEffect(() =>{
       getCategory()
  },[])
  return (
    <div className='app-city'>
<div className='container'> 
{/* {
      category && category.map((item, index) =>(
        <div key={index} className='card'>
          <img  className='card-image' src={`${imageUrl}${item?.image_src}`} alt="images" />
   <p>       { item?.name} </p>
          <p>
          { item?.text}
          </p>
          </div>
      ))
    } */}
    <CreatePost/>
</div>
    </div>
)
}

export default App