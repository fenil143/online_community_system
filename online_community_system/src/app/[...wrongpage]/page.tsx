'use client'
import React from 'react';

export default function WrongPage({params}:any){
    let path = "";
    for(let temp in params.wrongpage){
        path += "/" + params.wrongpage[temp];
    }
    return(
        <div>
            
            <h1 style={{color:"red"}}>Hey bro your url '{path}' is wrong url please try something else</h1>
        </div>
    )
}
