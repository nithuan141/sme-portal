import React, { useState } from 'react'
import { Row, Button, Input } from 'reactstrap'

const PageHeader = ({ title, add, onSearch }) => {
    const[searchText, setSearchText] = useState('')
    return (<>
        <Row>
            <h4>{title}</h4>
        </Row>
        <Row>
            {add && <Button color="primary" onClick={add} style = {{width: '100px', marginRight: '10px'}}>Add New</Button>}
            {<Input type="text" style = {{width: '350px', marginRight: '10px'}} value ={searchText} onChange={(e)=>{setSearchText(e.target.value)}}/>}
            <Button color="primary" style = {{width: '100px'}} onClick={()=>{onSearch(searchText)}}>Search</Button>
        </Row>
    </>
    )
}

export default PageHeader