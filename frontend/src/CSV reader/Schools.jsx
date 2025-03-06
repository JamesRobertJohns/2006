import { useState} from "react";
import papa from 'paparase';
import './Schools.css';

function Schools(){
    const[data,setData] = useState([]);

    //parse CSV data and store it in component state
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        
    }
}