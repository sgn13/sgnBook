import { ProfileOutlined, SettingOutlined } from '@ant-design/icons';
import { Tabs } from 'antd'
import React from 'react'
import UpdateMeForm from './UpdateForm';
const { TabPane } = Tabs;


const UpdateMe = () => {
    return (
        <div className="w-8/12 m-auto p-4 ">
            <Tabs tabPosition="left">
                <TabPane tab={
                    <span>
                        {<SettingOutlined />}
                    Settings
                    </span>
                } key="1" >
                    <UpdateMeForm />
                </TabPane>
                <TabPane tab={
                    <span>
                        {<ProfileOutlined />}
                        My Profile
                    </span>
                } key="2">
                    Content of Tab 2
          </TabPane>
            </Tabs>
        </div>
    )
}

export default UpdateMe
