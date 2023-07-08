import { useEffect, useState } from "react";
import Card from "../components/Card";
import { generateCards, getCards } from "../functions/cards.func";
import { CardEntity } from "../models/cards.model";

function ListOfCards() {
  const [cards, setCards] = useState<CardEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [activeBtn, setActiveBtn] = useState<boolean>(true);

  const fetchCards = async () => {
    try {
      const response = await getCards(page);
      setCards(response);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreCards = async () => {
    try {
      const response = await getCards(page + 1);
      if (response.length === 0) {
        return setActiveBtn(false);
      }
      setCards([...cards, ...response]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const generateCardsAction = async () => {
    try {
      const response = await generateCards();
      if (response) fetchMoreCards();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="p-20">
      {/* ADD Card button */}
      <div className="flex justify-between">
      <h1 className="text-3xl font-bold underline">Interview Cards</h1>
        <button onClick={generateCardsAction}  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
          Generate Cards
        </button>
      </div>
      <ul className="card-list">
        {cards.length > 0 && cards.map((card, _) => <Card key={card._id} {...card}/>)}
      </ul>
      <div className="flex justify-center mt-10">
        <button disabled={!activeBtn} onClick={() => fetchMoreCards()} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded">
          {activeBtn ? 'See More' : 'No More Cards'}
        </button>
      </div>
    </div>
  );
}

export default ListOfCards;
