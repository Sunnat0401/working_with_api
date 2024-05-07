import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
const App = () => {
  const [category, setCategory] = useState([])
  const imageUrl ="https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/"
  const getCategory = ( ) =>{
       axios({
        url:"https://autoapi.dezinfeksiyatashkent.uz/api/categories" ,
        method:"GET" ,
       }) .then((res) =>{
         setCategory(res?.data?.data)
         console.log(res?.data?.data?.image_src);
       }).catch((err) =>{
        console.log(err);
       })
  }
  useEffect(() =>{
       getCategory()
  },[])
  return (
<div className='container'> 
{
      category && category.map((item, index) =>(
        <div key={index}>
          { item?.name_en}
          <p>
          { item?.name_ru}
          </p>
          <img style={{width: "30%"}} src={`${imageUrl}${item?.image_src}`} alt="images" />
          </div>
      ))
    }
</div>
)
}

export default App