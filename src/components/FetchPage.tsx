import React, {useEffect, useState} from 'react';
import User from './dtos/User';

export default function FetchPage(props: any){

    const [userList,setUserList] = React.useState<User[]>([]); //initalize our userList to the custom DTO created
    ///HELPER FUNCTION  
    async function fetchFromDb(){
        const response: Response = await fetch("http://localhost:8000/fetch",{    
            headers:{"Content-Type": "application/json"},
            method:'GET'});
            let jsonData = await response.json();
            console.log(jsonData)
            setUserList(jsonData.entity)
    }
    return(
        <div>
            <button onClick={fetchFromDb}>Fetch</button>
            <table style={{marginLeft:"auto",marginRight:"auto"}}>
                {props.tableCreator(userList)}
            </table>
        </div>
    )
}