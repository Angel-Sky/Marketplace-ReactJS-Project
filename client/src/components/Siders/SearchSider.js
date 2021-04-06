import './SearchSider.css'
import { useState, useEffect } from 'react';

function Sider() {
    const [query, setQuery] = useState("");
    
    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value)
    }
    return (
        <div id="sider">
            <input className="col-lg-6" type="text" placeholder="Search..." name="search" onChange={handleSearch}></input>
        </div>
    )
}

export default Sider;