import { Button, Space } from 'antd'
import React from 'react'
import { permitHanler, approveHandler, signHandler, transferHandler } from '../web3'

const Layout = () => {
    return (
        <Space direction="vertical">
            <Button type="primary" onClick={() => permitHanler()}>
                Permit
            </Button>
            <Button type="primary" onClick={() => approveHandler()}>
                Approve
            </Button>
            <Button type="primary" onClick={() => signHandler()}>
                Sign
            </Button>
            <Button type="primary" onClick={() => transferHandler()}>
                Transfer
            </Button>
        </Space>
    )
}

export default Layout
