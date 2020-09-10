import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Bike from './Bike'
import MemberPrfile from './MemberProfile'
import AddFriend from './AddFriend'
import FriendWall from './FriendWall'

function FriendProfil() {
    const { memberID } = useParams();
  
    return (
        <div>
            <div>
                <AddFriend memberID={memberID}/>
            </div>
            <div>
                <MemberPrfile memberID={memberID}/>
            </div>
            <div>
                <Bike memberID={memberID}/>
            </div>
            <div>
                <FriendWall  memberID={memberID}/>
            </div>
        </div>
    );
}

export default FriendProfil;
