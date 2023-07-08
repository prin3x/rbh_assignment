import { convertDate } from "../functions/date.util";
import { CommentEntity } from "../models/cards.model";

type Props = {
  comment: CommentEntity;
};

const Comments = ({ comment: _comment }: Props) => {
  return (
    <div className="bg-purple-100 hover:bg-purple-200 rounded-lg shadow-lg p-4 transition-colors duration-300 mt-5">
      <div className="flex">
        <img src={_comment.avatar} alt="" className="w-6 h-6" />
        <p className="text-gray-700 mb-4 ml-2">{_comment.createdBy}</p>
      </div>
      <p className="text-gray-600 text-sm">Created by {_comment.comment}</p>
      <p className="text-gray-600 text-sm">
        {convertDate(_comment?.createdAt)}
      </p>
    </div>
  );
};

export default Comments;
