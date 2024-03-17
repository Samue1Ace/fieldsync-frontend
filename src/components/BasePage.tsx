import React, {useEffect, useState} from 'react';
import User from './dtos/User';
import Geo from './dtos/Geo';
import HomePage from './HomePage';
import SavePage from './SavePage';
import FetchPage from './FetchPage';
import './BasePage.css'

import { HashRouter, NavLink, Route, Routes} from 'react-router-dom';
import { MapContainer, TileLayer, useMap,Marker,Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { popup } from 'leaflet';

// for leaflet map
function ChangeCenter(center :{center:Geo}){
    let map = useMap()
    map.setView(center.center)
    return null
  }

export default function BasePage(props: any){
    ///STATES
    const [userList,setUserList] = React.useState<User[]>([]); //initalize our userList to the custom DTO created
    const [center, setCenter] = React.useState<Geo>({lat:39.76264,lng:-104.97653})
    const [name, setName] = useState("Denver")
    //SIDE EFFECTS
    //none needed for this task

    ///HELPER FUNCTIONS
    //below creates a table, instead of having a large HTML in the return functions of the components
    function tableCreator(data:User[]){
        let tableArray:React.ReactNode[]= []
        tableArray.push(
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Company</td>
                <td>Email</td>
                <td>Phone Number</td>
            </tr>
        )
        data.forEach((data) => tableArray.push(
            <tr>
                <td className="clickable" onClick={(event) => findPerson(event)}>{data.id.toString()}</td>
                <td>{data.name}</td>
                <td>{typeof data.company == "string" ? data.company :data.company.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
            </tr>
        ))
        return tableArray
    }
    /*
    function parseGeo(){
        let popupArray:React.ReactNode[] = []
        userList.forEach((item) => {
            let geo:Geo = item?.address?.geo!
            let name = item?.name!
            popupArray.push(<Popup position={geo}>{name}</Popup>)
        })
        return popupArray
    }
    */
    function findPerson(event:any){
        try{
            let personID = Number(event.target.innerText)
            let foundThem = userList.find((item) => item.id == personID)
            let geo:Geo = foundThem?.address?.geo!
            let name = foundThem?.name!
            setCenter(geo)
            setName(name)
        }catch(e){
            console.log("No Geo Found")
        }
    }
    //this function calls on the "external" API 
    async function fetchExternalUrl(){
        let externalUrl = "https://jsonplaceholder.typicode.com/users"
        const response: Response = await fetch(externalUrl,{    
            headers:{"Content-Type": "application/json"},
            method:'GET'});
            let jsonData = await response.json();
            setUserList(jsonData)
    }
    

    return(
        <HashRouter>
            <div style={{textAlign:"center",maxWidth:"67.5rem", margin:"auto"}}>
                <div className="center">
                    <ul className="nav" style ={{listStyleType: "none", display:"inline"}} >
                        <li><NavLink to="/">Home </NavLink></li>
                        <li><NavLink to="/save">Save </NavLink></li>
                        <li><NavLink to="/fetch">Fetch </NavLink></li>
                    </ul>
                </div>
                <div className="center">
                    <MapContainer style={{ height: '50vh', width: '50vh' }} center={center} zoom={12} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                        <ChangeCenter center={center} />
                        <Popup position={center}>{name}</Popup>
                        </MapContainer>
               </div>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<HomePage fetchExternalUrl={fetchExternalUrl} tableCreator={tableCreator} userList={userList}/>}></Route>
                        <Route path="/save" element={<SavePage tableCreator={tableCreator} userList={userList}/>}></Route>
                        <Route path="/fetch" element={<FetchPage tableCreator={tableCreator} userList={userList}/>}></Route>
                    </Routes>
                </div>
            </div>
        </HashRouter>
    )

}
