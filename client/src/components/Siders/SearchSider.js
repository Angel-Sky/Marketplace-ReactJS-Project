import './SearchSider.css'
import { useState, useEffect } from 'react';

function Sider() {
    const [query, setQuery] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        console.log(e.target.value)
    }
    return (
        <div id="sider">
            <input className="col-lg-6" type="text" placeholder="Search..." name="search" onSubmitCapture={handleSearch}></input>
        </div>
    )
}

export default Sider;