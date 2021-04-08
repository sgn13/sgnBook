import React from 'react'
import { Col } from 'antd'
import gif from './load.gif'

const Loading = () => {
    return (
        <div>
            <Col xs={{ span: 11, offset: 1 }} lg={{ span: 8, offset: 8 }}>
                <img src={gif} alt="Loading .... " />
            </Col>
        </div>
    )
}

export default Loading
