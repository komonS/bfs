import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../store/UserProvider'
import Post from './Post'
import Wall from './Wall'
import '../../css/Home.css'
function Home() {
  const { user, setUser } = useContext(UserContext)

  return (
    <div>
      <div >
        <Post />
      </div>
      <div>
        <Wall />
      </div>
    </div>
  );
}

export default Home;
