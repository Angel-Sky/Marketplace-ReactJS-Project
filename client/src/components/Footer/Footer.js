import './Footer.css';
import { AiFillInstagram, AiFillLinkedin } from 'react-icons/ai'; 
import { FaFacebook, FaFacebookSquare, FaInstagram } from 'react-icons/fa';
import {ImLinkedin2} from 'react-icons/im'
import {GrInstagram} from 'react-icons/gr'

function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="connections">
                    <a href="/#" id="instaIcon"><AiFillInstagram /></a>
                    <a href="/#" id="fbIcon"><FaFacebook /></a>
                    <a href="https://www.linkedin.com/in/iva-tosheva/" target="_blank" id="linkedIcon"><AiFillLinkedin /></a>
                </div>
                All Rights Reserved &copy; 2021 &#8226;
                <a href="https://github.com/Angel-Sky/ReactJS-Project" target="_blank">GitHub</a>
            </div>
        </footer >
    )
}

export default Footer;