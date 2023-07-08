import { Link } from "react-router-dom";
import { CardEntity } from "../models/cards.model";
import { convertDate } from "../functions/date.util";

const Card = (props: CardEntity) => {

  return (
    <Link to={`/card/${props._id}`}>
      <li className="card mt-10 cursor-pointer" key={props._id}>
        <div className="bg-purple-100 hover:bg-purple-200 rounded-lg shadow-lg p-4 transition-colors duration-300">
          <h2 className="text-xl font-semibold text-purple-800 mb-2">
            {props.title}
          </h2>
          <p className="text-gray-700 mb-4">{props.description}</p>
          <p className="text-gray-600 text-sm">สถานะ {props.status}</p>
          <div className="flex justify-between mt-3">
            <p className="text-gray-600 text-sm flex">
              สร้างโดย{" "}
              <span className="d-block mx-2">
                <img className="w-4" src={props.avatar} />
              </span>
              {props.createdBy}
            </p>
            <p className="text-gray-600 text-sm">
              สร้างเมื่อ{ " " + convertDate(props.createdAt)}
            </p>
          </div>
        </div>
      </li>
    </Link>
  );
};

export default Card;
