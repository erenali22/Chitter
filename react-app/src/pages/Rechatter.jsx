import { useEffect } from "react"
import MyList from "../conponents/List";

const Rechatter = ({userInfo})=>{
    const [chatters, setChatters] = useState([]);
    const fetchData = async () => {
        setChatters([])
        try {
          const response = await getChatters();
          if (response.ok) {
            const fetchedChatters = await response.json();
            setChatters(Array.isArray(fetchedChatters) ? fetchedChatters :[]);
          } else {
            setError('Failed to fetch chatters');
          }
        } catch (err) {
          setError('An error occurred while fetching chatters');
        }
      };
    useEffect(()=>{
        fetchData();
    },[])
    return <MyList userInfo={userInfo} chatters={chatters} fetchData={fetchData}></MyList>
}
export default Rechatter