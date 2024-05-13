import { Modal, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css'
import { Button } from 'antd/es/radio';
import DeleteConfirmation from './DeleteModal';

export default function CreatePost() {
    // const [openModalDelte, setOpenModalDelte] = useState(false)
    const [open, setOpen ] = useState(false);
    const [openodal, setOpenModal ] = useState(false);
    const [category, setCategory] = useState([])
    const [nameEn, setNameEn] = useState('')
    const [nameRU, setNameRu] = useState('')
    const [image, setImage] = useState(null)
    const [id, setId] = useState(null)
    const urlimage = 'https://autoapi.dezinfeksiyatashkent.uz/api/uploads/images/'

    const [modal, contextHolder] = Modal.useModal();
     const getData = () => {
        axios.get(`https://autoapi.dezinfeksiyatashkent.uz/api/categories`)
            .then(response => {
                setCategory(response.data.data);
            })
            .catch(error => {
                console.error("Error fetching cities data:", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);


    const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTczNzkzNTUtZDNjYi00NzY1LTgwMGEtNDZhOTU1NWJiOWQyIiwidG9rZW5fdHlwZSI6ImFjY2VzcyIsImlhdCI6MTcxNTAwNjI0OCwiZXhwIjoxNzQ2NTQyMjQ4fQ.uMRbDZduB_z8LXgdTho8kBggg9Zrz6SNCwqmFcas10E';

    const createCategory = (e) => {
        e.preventDefault();

        const name_en = document.getElementById('name_en').value;
        const name_ru = document.getElementById('name_ru').value;
        const images = document.getElementById('images').files[0];

        const formData = new FormData();

        formData.append('name_en', name_en);
        formData.append('name_ru', name_ru);
        formData.append('images', images);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios({
            url: 'https://autoapi.dezinfeksiyatashkent.uz/api/categories',
            method: 'POST',
            data: formData,
            headers: headers,
        })
            .then((res) => {
                message.success("Q'shildi")
                getData();
            })
            .catch((err) => {
                message.error("Xatolik")
                console.log(err);
            });
    };

 const deleteCategory = (id) => {
    Modal.confirm({
        title: "Delete Category",
        content: "Are you sure you want to delete this category?",
        maskClosable: true, // Allow closing by clicking outside the modal
        onOk() {
            const headers = {
                Authorization: `Bearer ${token}`,
            }
            axios({
                url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
                method: 'DELETE',
                headers: headers,
            }).then((res) => {
                console.log(res);
                message.success(`Muvaffaqiyatli o'chirildi !`)
                getData();
            }).catch((err) => {
                console.log("Error", err);
            })
        },
        onCancel() {
            console.log('Cancel');
            // onCancel={closeModal}
        },
    });
}
    const showModal = (item) => {
        setId(item.id)
        console.log(item);
        setNameEn(item?.name_en)
        setNameRu(item?.name_ru)
        setImage(`${item?.image_src}`)
        setOpen(true)    
    }

    const closeModal = () => {
        setOpen(false)
    }

    const editCategory = (event) =>{
        event.preventDefault();
        const images1 = document.getElementById('images1').files[0]
        const formData = new FormData();

        formData.append('name_en', nameEn);
        formData.append('name_ru', nameRU);
        formData.append('images', images1);

        const headers = {
            Authorization: `Bearer ${token}`,
        };

        axios({
            url: `https://autoapi.dezinfeksiyatashkent.uz/api/categories/${id}`,
            method: 'PUT',
            data: formData,
            headers: headers,
        })
            .then((res) => {
                message.success("O'zgartirildi")
                getData()
            })
            .catch((err) => {
                message.error("Xatolik")
                console.log(err);
            });
    }
    return (
        <div>
            <form onSubmit={createCategory}>
                <input type="text" id="name_en" placeholder="Name (English)" />
                <input type="text" id="name_ru" placeholder="Name (Russian)" />
                <input type="file" id="images" />
                <button type="submit">Yuborish</button>
            </form>
            <div className='wrapper'>
            {
                category && category.map((item, index) => (
                    <div className='card' key={index}>
                        <img className='card-img' src={`${urlimage}/${item.image_src}`} alt="Error" />
                        <h2 card-title>{item.name_en}</h2>
                        <button className='btn btn-primary '  onClick={() => deleteCategory(item.id)}>Delete</button>
                        <button className='btn btn-secondary' onClick={()=> showModal(item)}>Edit</button>
                    </div>
                ))
            }
{/* onClick={() => deletCategory(item.id)} => modalni o'chirish uchun */}
            </div>
            <Modal title="'O'chirishni xoxlaysizmi ?" open={openodal} footer={null} onCancel={closeModal}>
            <Button
          onClick={() => {
            modal.confirm({ title: 'Hello World' });
          }}
        >
          Confirm
        </Button>

        {/* 🚨 BUG when put here */}
        {contextHolder} 
            </Modal>
            <Modal title="Tahrirlash" open={open} footer={null} onCancel={closeModal}>
    <form onSubmit={editCategory}>
        <input type="text" value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
        <input type="text" value={nameRU} onChange={(e) => setNameRu(e.target.value)} />
        <br />
        {/* Input field to display the original image */}
        {image && (
            <img src={`${urlimage}${image}`} alt="Category Image" style={{ maxWidth: '100px', height: 'auto' }} />
        )}
        {/* Input field to upload a new image */}
        <input type="file" id='images1' onChange={(e) => setImage(e.target.files[0])} />
        <button type='submit'>Send</button>
    </form>
</Modal>


        </div>
    );
}
