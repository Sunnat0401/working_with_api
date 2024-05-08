import axios from "axios";

const CreatePost = () => {
    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTAwNjI0OCwiZXhwIjoxNzQ2NTQyMjQ4fQ.uMRbDZduB_z8LXgdTho8kBggg9Zrz6SNCwqmFcas10E';

    const createCategory = (e) =>{
        e.preventDefault();
        const name = document.getElementById('name').value;
        const text = document.getElementById('text').value;
        const images =  document.getElementById('images').files[0];
        
        const formData = new FormData();
        formData.append('name', name);
        formData.append('text', text);
        formData.append('images', images);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios({
            url: "https://autoapi.dezinfeksiyatashkent.uz/api/cities",
            method: "POST",
            data: formData,
            headers: headers
        })
        .then((res) =>{
            alert("Yuborildi");
        })
        .catch((err) =>{
            console.log("Yuborilmadi ", err);
        });
    };

    return (
        <div>
            <form onSubmit={createCategory}> 
                <input type="text"  id="name"/>
                <input type="text" id="text" />
                <input type="file" id="images" />
                <button type="submit">Yuborish</button>
            </form>
        </div>
    );
};

export default CreatePost;
