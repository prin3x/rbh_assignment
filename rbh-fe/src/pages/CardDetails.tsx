import { useEffect, useState } from "react";
import { CardEntity, CommentEntity } from "../models/cards.model";
import {
  commentCard,
  getOneCard,
  updateCardStatus,
} from "../functions/cards.func";
import { useNavigate, useParams } from "react-router-dom";

const CardDetails = () => {
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [card, setCard] = useState<CardEntity>();
  const { id } = useParams<{ id: string }>();
  const [inputValue, setInputValue] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Todo");
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const handleStatusChange = async (event: any) => {
    setSelectedStatus(event.target.value);

    if (!id) {
      return;
    }

    // Handle status change logic here
    try {
      const response = await updateCardStatus(id, event.target.value);
      if (response) {
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!id) {
      return;
    }
    try {
      const commentSet: CommentEntity = {
        comment: inputValue,
        createdBy: "Smith Paul",
      };
      await commentCard(id, commentSet);
      setInputValue("");
      fetchCardDetail();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCardDetail = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await getOneCard(id);
      setCard(response);
      setSelectedStatus(response.status);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const archiveCard = async () => {
    if (!id) {
      return;
    }
    try {
      await updateCardStatus(id, "Archived");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCardDetail();
  }, []);

  return (
    !isloading &&
    card && (
      <div className="p-20">
        {showNotification && (
          <div className="bg-green-500 text-white py-2 px-4 mb-4">
            Change Task status completed!
          </div>
        )}
        <h1 className="text-3xl font-bold underline">Card Details</h1>
        <div className="w-100 flex mt-5">
          <div className="w-[60%] bg-purple-100 hover:bg-purple-200 rounded-lg shadow-lg p-4 transition-colors duration-300">
            <h2 className="text-xl font-semibold text-purple-800 mb-2">
              {card.title}
            </h2>
            <p className="text-gray-700 mb-4">{card.description}</p>
          </div>

          <div className="w-[30%] ml-auto">
            <h2>Details</h2>
            <p className="text-gray-600 text-sm">สร้างโดย {card.createdBy}</p>
            <p className="text-gray-600 text-sm">สร้างเมื่อ {card.createdAt}</p>

            <div>
              <label htmlFor="status" className="text-gray-700 font-medium">
                Status:
              </label>
              <select
                id="status"
                className="block w-full mt-1 py-2 px-3 border border-gray-300 bg-white rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                value={selectedStatus}
                onChange={handleStatusChange}
              >
                <option value="Todo">Todo</option>
                <option value="Done">Done</option>
                <option value="In Progress">In Progress</option>
              </select>

              <div className="mt-4">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={archiveCard}
                >
                  จัดเก็บ
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Comment Section */}
        <h2 className="mt-10">Comments</h2>
        <div className="flex items-center w-100">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex items-center w-[50vw]"
            onSubmit={handleSubmit}
          >
            <label
              className="text-gray-700 text-sm font-bold mr-2"
              htmlFor="inputField"
            >
              Input:
            </label>
            <input
              className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-[30rem]"
              id="inputField"
              type="text"
              placeholder="Enter input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        {card.comments.length > 0 &&
          card.comments.map((_comment, index) => (
            <div key={index} className="bg-purple-100 hover:bg-purple-200 rounded-lg shadow-lg p-4 transition-colors duration-300 mt-5">
              <p className="text-gray-700 mb-4">Comment {index + 1}</p>
              <p className="text-gray-700 mb-4">{_comment.comment}</p>
              <p className="text-gray-600 text-sm">
                Created by {_comment.createdBy}
              </p>
              <p className="text-gray-600 text-sm">
                Created on {_comment.createdAt}
              </p>
            </div>
          ))}
      </div>
    )
  );
};

export default CardDetails;
