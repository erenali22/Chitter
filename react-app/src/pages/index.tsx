import { useEffect, useState } from 'react';
import logo from '@/assets/logo.png';
import styles from './index.module.css';
import { NumberOutlined, SendOutlined } from '@ant-design/icons';
import MyList from '@/conponents/List';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import Flooter from '@/conponents/Flooter';
import Login from '@/conponents/Login';
import { authenticate, getChatters, newChater } from '@/api';
import SignUp from '@/conponents/SignUp';
import Chatter from './Chatter';
const menuList = [{ title: 'Explore', Icon: <NumberOutlined style={{ fontSize: 28 }} /> }, { title: 'Chatter', Icon: <SendOutlined style={{ fontSize: 28 }} /> }];
export default function Home() {
  const [chatters, setChatters] = useState([]);
  const [error, setError] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userInfo,setUserInfo] = useState({})
  const [activeTab, setActiveTab] = useState(menuList[0]?.title);
  const handleLogin = () => {

  };
  const openLogin = () => {
    setIsLoginOpen(true);
  };
  const openSignUp = () => {
    setIsSignUpOpen(true);
  };
  const closeLogin = () => {
    auth()
    setIsLoginOpen(false);
  };
  const closeSignUp = () => {
    setIsSignUpOpen(false);
  };
  const fetchData = async () => {
    try {
      const response = await getChatters();
      if (response.ok) {
        const fetchedChatters = await response.json();
        setChatters(fetchedChatters);
      } else {
        setError('Failed to fetch chatters');
      }
    } catch (err) {
      setError('An error occurred while fetching chatters');
    }
  };
  const auth = ()=>{
    authenticate().then((res)=>{
      res.json().then((res)=>{
        if(res?.error){
          setIsLoaded(false)
        }else{
          if(res.id){
            setUserInfo(res)
            setIsLoaded(true)
            
          }
       
    
        }
     })
        });
  }
  useEffect(() => {
    auth();
    fetchData();
  }, []);
  const getContent = () => {
    let contentMap = {
      Explore: <MyList userInfo={userInfo} chatters={chatters} />,
      Chatter: <Chatter />,
    };
    return contentMap[activeTab];
  };
  useEffect(()=>{
    setChatters([])
    fetchData()
  },[activeTab])
  return (
    <>

      <div className={styles.app}>
        <div style={{ width: 300, paddingLeft: 10, paddingTop: 80, borderRight: '0.5px solid #ccc' }}>
          {
          menuList.map((item, idx) => {
            const { Icon } = item || {};
          return (<div
            style={{ display: 'flex', flexDirection: 'row', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}
            onClick={() => setActiveTab(item.title)}
          >
            <div>
              {Icon}

            </div>
            <div style={{
              fontSize: 26,
              fontWeight: activeTab === item.title ? 600 : undefined,
              marginLeft: 20,
            }}
            >
              {item.title}
            </div>
          </div>);
          })
        }
        </div>
        <div style={{ flex: 1, paddingLeft: 20, paddingTop: 60 }}>
          <span style={{ fontSize: 30 }}>
            {activeTab}
          </span>
          {getContent()}

        </div>
      </div>
      {
        !isLoaded && <Flooter openLogin={openLogin} openSignUp={openSignUp} />
      }
      
      <Login isOpen={isLoginOpen} close={closeLogin} />
      <SignUp isOpen={isSignUpOpen} close={closeSignUp} />
    </>
  );
}