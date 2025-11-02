import { Link } from "react-router-dom";
import './Footer.css'

export default function Footer() {
    return (
        <footer className=" navbar-expand-sm navbar-light flex-column px-md-4 px-1 py-5">
            <div className="links d-flex justify-content-md-between flex-wrap justify-content-center  ">
                <ul className="d-flex gap-md-4 gap-2 flex-wrap justify-content-md-start justify-content-center ">
                    <li>
                        <Link to="">Home</Link>
                    </li>
                    <li >
                        <Link  to="">Services</Link>
                    </li>
                    <li  >
                        <Link  to="">Contact</Link>
                    </li>
                    <li  >
                        <Link  to="">Terms Of Services</Link>
                    </li>
                    <li  >
                        <Link  to="">Privacy Policy</Link>
                    </li>
                </ul>
                {/* social media icons */}
                <ul className="social d-flex gap-4 pt-md-0 pt-3">
                    <li ><i  className="fa-brands fa-x-twitter fs-5 twitter"></i></li>
                    <li><i className="fa-brands fa-facebook-f fs-5 facebook"></i></li>
                    <li><i className="fa-brands fa-instagram fs-5 instagram"></i></li>
                    <li><i className="fa-brands fa-linkedin fs-5 linkedin"></i></li>
                </ul>
            </div>
            <div className="rights ">
                <hr />
                © 2025 <span>ORVICO</span>. All rights reserved.
            </div>
        </footer>
    )
}
