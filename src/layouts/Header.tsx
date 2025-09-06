import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full h-24 p-2">
            <div>
                <Link to="/">nurovo</Link>
            </div>
            <div>
                <ul>
                    <li>About</li>
                    <li>Work</li>
                    <li>Contact</li>
                </ul>
            </div>
        </header>
    );
}
