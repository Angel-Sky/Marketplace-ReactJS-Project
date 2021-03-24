import './Footer.css';
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai';
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';


function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="connections">
                    <a href="/#"><FaFacebook /></a>
                    <a href="/#"><FaInstagramSquare /></a>
                    <a href="https://www.linkedin.com/in/iva-tosheva/" target="_blank"><AiFillLinkedin /></a>
                </div>
                All Rights Reserved &copy; 2021 &#8226;
                <a href="https://github.com/Angel-Sky/ReactJS-Project" target="_blank">GitHub</a>
            </div>
        </footer >
    )
}

export default Footer;