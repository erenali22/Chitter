import { Tabs } from "antd"
import { useEffect } from "react"
import { getFollowing, getUsers } from "../api"

const UserList = ()=>{
    useEffect(()=>{
        getUsers().then((res)=>{
            console.log(res);
        })
    },[])
    return <div>
         <Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Tab 1" key="1">
      Content of Tab Pane 1
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 2" key="2">
      Content of Tab Pane 2
    </Tabs.TabPane>
    <Tabs.TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </Tabs.TabPane>
  </Tabs>
    </div>
}
export default UserList