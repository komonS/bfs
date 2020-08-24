import React,{useContext,useEffect} from 'react';
import { UserContext } from '../../store/UserProvider'
function Home() {
  const { user,setUser } = useContext(UserContext)

  return (
    <div>
     
    </div>
  );
}

export default Home;
