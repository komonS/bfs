import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom'
import '../../css/Bike.css'
import axios from 'axios'
import { UrlContext } from '../../store/UrlProvider'
function EditBike() {
    const history = useHistory()
    const { url } = useContext(UrlContext)
    let { bike } = useParams();
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [year, setYear] = useState()
    const [color, setColor] = useState()
    const [bikeImage, setBikeImage] = useState([])
    const bikeData = async () => {
        let res = await axios.get(url.api + 'api/bike/bikeone', {
            params: {
                userID: localStorage.userID,
                bikeID: bike
            }
        })
        console.log(res.data.bikeBrand)
        setBrand(res.data[0].bikeBrand)
        setColor(res.data[0].bikeColor)
        setModel(res.data[0].bikeModel)
        setName(res.data[0].bikeName)
        setYear(res.data[0].bikeYear)


    }

    const uploadFile = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const imagefile = document.querySelector('#filUpload');
        formData.append("filUpload", imagefile.files[0]);
        let res = await axios.post(url.api + 'service/upload.php', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            params: {
                bike: bike
            }
        })
        console.log(res.data)
        if (res.data.status === 'success') {
            getImageBike(bike)
        } else {
            alert(res.data.status + '! <br/>' + res.data.detail)
        }

    }

    const getImageBike = async () => {
        let res = await axios.get(url.api + 'api/bike/bikeimg', {
            params: {
                bikeID: bike
            }
        })
        setBikeImage(res.data)
    }

    const onSave = async (event) => {
        event.preventDefault()
        let res = await axios.get(url.api + 'api/bike/editbike', {
            params: {
                userID: localStorage.userID,
                bikeID: bike,
                name: name,
                brand: brand,
                model: model,
                year: year,
                color: color
            }
        })
        console.log(res.data)
        if (res.data.status == 'success') {
            alert('update data completed')
            history.push('/mybike')
        } else {
            alert(res.data.status + '! <br/>' + res.data.detail)
        }
    }

    useEffect(() => {
        bikeData()
        getImageBike()
    }, [bike])
    return (
        <div>
            <h4 className="text-center bike-head">Edit Bike</h4>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSave}>
                        <div className="form-group">
                            <label>Bike Name</label>
                            <input className="form-control" type="text" defaultValue={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Brand</label>
                            <input className="form-control" type="text" defaultValue={brand} onChange={e => setBrand(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Model</label>
                            <input className="form-control" type="text" defaultValue={model} onChange={e => setModel(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Year</label>
                            <input className="form-control" type="text" defaultValue={year} onChange={e => setYear(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>Color</label>
                            <input className="form-control" type="text" defaultValue={color} onChange={e => setColor(e.target.value)} />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary">Save</button>
                        </div>
                    </form>
                </div>
                <div className="bike-conten col-md-6">
                    <div className="row">
                        <div className="col-md-12">
                            <form onSubmit={uploadFile}>
                                <label>upload bike image</label>
                                <div className="form-inline ">
                                    <input type="file" id="filUpload" name="filUpload" className="form-control" />
                                    <button type="submit" className="btn btn-secondary btn-upload">Upload</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="row bike-img-content">
                        {bikeImage.map((item, index) => (
                            <div key={index} className="col-md-6">
                                <div class="card">
                                    <img src={url.api+'picture/bike/'+item.bmName} className="card-img-top" />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default EditBike;
