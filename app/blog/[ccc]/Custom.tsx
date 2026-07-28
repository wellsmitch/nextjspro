"use client";

import { Button } from "antd";

const d = (props) => {
    const {doSave} = props
    return (
        <>
        <Button onClick={doSave}>post</Button>
        </>
    )
}

export default d;