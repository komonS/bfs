import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { UrlContext } from '../../store/UrlProvider'
import axios from 'axios'
import '../../css/Bike.css'


function Bike(props) {
    const { url } = useContext(UrlContext)
    //const { memberID } = useParams()
    const [bike, setBike] = useState([])
    const [bikeImage, setBikeImage] = useState([])
    const getBike = async () => {
        let res = await axios.get(url.api + 'api/bike/bike', {
            params: {
                userID: props.memberID
            }
        })
        setBike(res.data)
    }


    const getImageBike = async () => {
        let res = await axios.get(url.api + 'api/bike/bikeimg', {
            params: {
                userID: props.memberID
            }
        })
        setBikeImage(res.data)
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
                                
                            </tr>
                        </thead>
                        <tbody>
                            {
                                bike.map((item, index) => (
                                    <tr key={index}>
                                        <td>

                                            {item.bikeName}

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
                                            {item.bikeStatus == 'active' ? item.bikeStatus : null}
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
                            <div className="card">
                                <img src={url.api + 'picture/bike/' + item.bmName} className="card-img-top" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Bike;
