import { Link } from "react-router-dom";
import "./Card.css";
import arrowRight from "@/assets/arrow-right.svg";

interface Props {
    title: string;
    content: string;
    badges: string[];
    bgColor?: string;
    link?: string;
}

export default function Card(prop: Props) {
    const cardTitle = prop.title || "標題";
    const cardContent = prop.content || "內容";
    const cardLink = prop.link || "/about";
    const badgeList = prop.badges || [];
    return (
        <article className="card" role="ariticle">
            <div
                className="card-inner"
                style={{ backgroundColor: prop.bgColor || "" }}
            >
                <div className="card-title">
                    <h3>{cardTitle}</h3>
                </div>
                <div className="card-content">
                    <p>{cardContent}</p>
                </div>
                <div className="card-badge-wrap" role="list">
                    {badgeList.map((badge, index) => {
                        return (
                            <div className="badge" key={index}>
                                {badge}
                            </div>
                        );
                    })}
                </div>
            </div>
            <footer className="card-bottom">
                <div className="act-button ">
                    <Link
                        to={cardLink}
                        aria-label={`探索更多關於${cardTitle}的內容`}
                        title={`前往${cardTitle}詳細頁面`}
                    >
                        <img
                            src={arrowRight}
                            alt="前往網頁關於BD頁面"
                            role="presentation"
                            loading="lazy"
                            width="24"
                            height="24"
                        />
                    </Link>
                </div>
            </footer>
        </article>
    );
}
