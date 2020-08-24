import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
function AddBike() {
    const history = useHistory()
    const { url } = useContext(UrlContext)
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [model, setModel] = useState()
    const [year, setYear] = useState()
    const [color, setColor] = useState()

    const onSave = async (event) => {
        event.preventDefault()
        let res = await axios.get(url.api+'api/bike/addbike',{
            params:{
                userID:localStorage.userID,
                name:name,
                brand:brand,
                model:model,
                year:year,
                color:color
            }
        })

        if(res.data.status === 'success'){
            history.push('/mybike')
        }else{
            alert(res.data.status+'! '+res.data.detail)
        }
    }
    return (
        <div>
            <button type="button" className="btn btn-sm btn-success" data-toggle="modal" data-target="#addBike">
                Add Bike
            </button>

            <div className="modal fade  " id="addBike">
                <div className="modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">Add Bike</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={onSave}>
                                <div className="form-group">
                                    <label>Bike Name</label>
                                    <input className="form-control" type="text" onChange={e=>setName(e.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label>Brand</label>
                                    <input className="form-control" type="text" onChange={e=>setBrand(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Model</label>
                                    <input className="form-control" type="text" onChange={e=>setModel(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Year</label>
                                    <input className="form-control" type="text" onChange={e=>setYear(e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>Color</label>
                                    <input className="form-control" type="text" onChange={e=>setColor(e.target.value)} />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-success">Add</button>
                                </div>
                            </form>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddBike;
