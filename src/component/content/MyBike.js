import React, { useEffect, useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../../css/Bike.css'
import '../../css/Switch.css'
import AddBike from '../content/AddBike'
function MyBike() {
    const { url } = useContext(UrlContext)
    const [bike, setBike] = useState([])
    const [delst, setDelst] = useState(false)
    const [bikeImage, setBikeImage] = useState([])
    const getBike = async () => {
        let res = await axios.get(url.api + 'api/bike/bike', {
            params: {
                userID: localStorage.userID
            }
        })
        setBike(res.data)
    }
    const onChangeData = (event) => {
        console.log(event)
        changeSt(event.target.value)
    }

    const delbike = async (event) => {

        let res = await axios.get(url.api + 'api/bike/delbike', {
            params: {
                bikeID: event.target.value
            }
        })

        if (res.data.status == 'success') {
            console.log(res.data.status)
            setDelst(true)
            getBike()
        }



    }
    const changeSt = async (bkID) => {
        let res = await axios.get(url.api + 'api/bike/activebike', {
            params: {
                userID: localStorage.userID,
                bikeID: bkID
            }
        })
        setBike(res.data)
    }

    const getImageBike = async () => {
        let res = await axios.get(url.api + 'api/bike/bikeimg', {
            params: {
                userID: localStorage.userID
            }
        })
        setBikeImage(res.data)
    }

    const DelBikeAlert = () => {
        return <div className="alert alert-success alert-dismissible">
            <button type="button" className="close" onClick={() => setDelst(false)} >&times;</button>
            <strong>Success!</strong> Delete bike is success
      </div>
    }

    useEffect(() => {
        getBike()
        getImageBike()
    }, [])
    return (
        <div className="bike">
            <div>
                <h4>Bike List</h4>
                <div>
                    {delst ? <DelBikeAlert /> : null}
                </div>
                <div className="bike-head">
                    <AddBike />
                </div>
                <div>
                    <table className="table table-hover" >
                        <thead>
                            <tr>
                                <th>
                                    Bike Name
                                </th>
                                <th>
                                    Brand
                                </th>
                                <th>
                                    Model
                                </th>
                                <th>
                                    Year
                                </th>
                                <th>
                                    Color
                                </th>
                                <th>
                                    Status
                                </th>
                                <th>

                                </th>
                                <th className="text-center">
                                    Option
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bike.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <Link to={'/mybike/' + item.bikeID}>
                                                {item.bikeName}
                                            </Link>
                                        </td>
                                        <td>
                                            {item.bikeBrand}
                                        </td>
                                        <td>
                                            {item.bikeModel}
                                        </td>
                                        <td>
                                            {item.bikeYear}
                                        </td>
                                        <td>
                                            {item.bikeColor}
                                        </td>
                                        <td>
                                            {item.bikeStatus}
                                        </td>
                                        <td>
                                            <label className="switch">
                                                <input type="radio" value={item.bikeID} onChange={onChangeData} name="switch" checked={item.bikeStatus == 'active' ? 'checked' : null} />
                                                <span className="slider round"></span>
                                            </label>
                                        </td>
                                        <td className="text-center">

                                            <button className="btn btn-danger btn-sm" value={item.bikeID} onClick={delbike}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    {bikeImage.map((item, index) => (
                        <div key={index} className="col-md-4">
                            <div class="card">
                                <img src={url.api + 'picture/bike/' + item.bmName} className="card-img-top" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default MyBike;
