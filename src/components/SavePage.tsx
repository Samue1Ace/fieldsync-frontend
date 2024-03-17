import React, {useEffect, useState} from 'react';
import User from './dtos/User';

export default function SavePage(props: any){

    ///HELPER FUNCTION  
    async function saveToDb(){
        const response: Response = await fetch('http://localhost:8000/save',{    
            headers:{"Content-Type": "application/json",
            'Access-Control-Allow-Credentials': 'true'},
            method:'POST',
            body:JSON.stringify(props.userList) 
            });
        const jsonData: any = await response.json();
        return jsonData;
    }
    return(
        <div>
            <button onClick={saveToDb}>Save</button>
            <table style={{marginLeft:"auto",marginRight:"auto"}}>
                {props.tableCreator(props.userList)}
            </table>
        </div>
    )
}