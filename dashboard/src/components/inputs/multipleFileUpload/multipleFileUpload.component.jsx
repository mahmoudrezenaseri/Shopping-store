import React, { Component } from 'react';

const MultipleFileUpload = (props)=>{
    return  (
        <input type="file" multiple {...props}/>
    )
}

export default MultipleFileUpload;