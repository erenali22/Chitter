import { List, Tabs } from "antd"
import { useEffect, useState } from "react"
import { followUser, getFollowing, getUsers, unfollowUser } from "../api"

const UserList = ({userInfo})=>{
    const [userList,setUserList] = useState([])
    const [followingList,setFollowingList] = useState([])
    const getData = ()=>{
        setUserList([])
        getUsers().then(({users})=>{
            setUserList(users)
        })
    }
    const getFollowingData = ()=>{
        setFollowingList([])
        getFollowing(userInfo.id).then((res)=>{
            let list = Array.isArray(res)? res : res?.users || []
            setFollowingList(list)
        })
    }
    useEffect(()=>{
        getData();
    },[])
    return <div>
         <Tabs defaultActiveKey="1" onChange={(v)=>{
            if(v == 1){
                getData();
            }else{
                getFollowingData() 
            }
         }}>
    <Tabs.TabPane tab="userList" key="1">
      <MyList list={userList} getData={getData}></MyList>
    </Tabs.TabPane>
    <Tabs.TabPane tab="FollowingList" key="2">
    <MyList list={followingList} type={2} getData={getFollowingData}></MyList>
    </Tabs.TabPane>
  </Tabs>
    </div>
}
const MyList = ({list,type=1,getData})=>{
    return <List
    loading={!list.lenght}
    className="demo-loadmore-list"
    itemLayout="horizontal"
    dataSource={list}
    renderItem={(item) => (
      <List.Item
        actions={type == 1 ? [<a key="list-loadmore-edit" onClick={()=>{followUser(item.id).then(()=>{
            getData()
        })}}>Follow</a>]:
        [<a key="list-loadmore-more" onClick={()=>{unfollowUser(item.id).then(()=>{
            getData()

        })}}>Unfollow</a>]}
      >
          <List.Item.Meta
            title={<span>{item.username}</span>}
            description={item?.bio}
          />
      </List.Item>
    )}
  />

}
export default UserList