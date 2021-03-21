import { Button } from 'react-bootstrap';
import './Categories.css'
import { BsHouseDoorFill, BsFillHouseFill, BsFillPuzzleFill } from 'react-icons/bs'
import { AiFillCar } from 'react-icons/ai';
import { GiFlowerPot, GiClothes } from 'react-icons/gi';
import {TiSortAlphabetically} from 'react-icons/ti';

function Categories() {
    return (
        <div className="container" id="categories">
            <h1>Categories</h1>
            <Button variant="dark" id="all"><TiSortAlphabetically />All</Button>{' '}
            <Button variant="dark" id="properties"><BsHouseDoorFill />Properties</Button>{' '}
            <Button variant="dark" id="auto"><AiFillCar />Auto</Button>{' '}
            <Button variant="dark" id="home"><BsFillHouseFill />Home</Button>{' '}
            <Button variant="dark" id="clothes"><GiClothes />Clothes</Button>{' '}
            <Button variant="dark" id="toys"><BsFillPuzzleFill />Toys</Button>{' '}
            <Button variant="dark" id="garden"><GiFlowerPot />Garden</Button>{' '}
        </div>
    )
}

export default Categories;