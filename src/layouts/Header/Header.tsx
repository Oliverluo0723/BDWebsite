import { Link } from "react-router-dom";
import "./Header.module.css";

export default function Header() {
    return (
        <header className="w-full h-24">
            <div>
                <Link to="/">
                    <h1>nurovo</h1>
                </Link>
            </div>
            {/*  */}
            <div>
                <ul>
                    <li>About</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </div>
            <div>
                <p>sn3c.Inc</p>
            </div>
        </header>
    );
}
