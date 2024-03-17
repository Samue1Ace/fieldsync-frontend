import React, {useEffect, useState} from 'react';
import User from './dtos/User';

export default function HomePage(props: any){
    
    return(
    <div>
        <button onClick={props.fetchExternalUrl}>Download</button>
        <table style={{marginLeft:"auto",marginRight:"auto"}}>
            {props.tableCreator(props.userList)}
        </table>
    </div>
    )
}