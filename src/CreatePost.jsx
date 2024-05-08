import axios from "axios"

const CreatePost = () => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTAwNjI0OCwiZXhwIjoxNzQ2NTQyMjQ4fQ.uMRbDZduB_z8LXgdTho8kBggg9Zrz6SNCwqmFcas10E';
    const createCategory = (e) =>{
        e.preventDefault();
        const name_en = document.getElementById('name_en').value
        const name_ru = document.getElementById('name_ru').value
        const images =  document.getElementById('images').files[0]
       const formData = new FormData();
       formData.append('name_en' , name_en)
       formData.append('name_ru' , name_ru)
       formData.append('images' ,images)
    }
    const headers = {
        'Authorization' :`Bearer ${token}`
    }
    axios({
        url:"https://autoapi.dezinfeksiyatashkent.uz/api/categories",
        method:"POST" ,
        data : FormData,
        headers: headers
    })
  return (
    <div>
        <form> 
            <input type="text"  id="name_en"/>
            <input type="text" id="name-ru" />
            <input type="file" id="images" />
            <button type="submit">Yuborish</button>
        </form>
    </div>
  )
}

export default CreatePost