import { useEffect, useState } from "react";
import Card from "../components/Card";
import { generateCards, getCards } from "../functions/cards.func";
import { CardEntity } from "../models/cards.model";

function ListOfCards() {
  const [cards, setCards] = useState<CardEntity[]>([]);
  const [page, setPage] = useState<number>(1);
  const [activeBtn, setActiveBtn] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCards = async () => {
    let found: boolean = false;
    while (!found) {
      try {
        const response = await getCards(page);
        setCards(response);
        setIsLoading(false);
        found = true;
      } catch (error) {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
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
    setIsLoading(true);
    try {
      await generateCards();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setActiveBtn(true);
    }
  };

  useEffect(() => {
    // fetch api until found
    fetchCards();
  }, []);

  return isLoading ? (
    <div>
      {/* Loading */}
      <div className="flex justify-center items-center h-screen flex-col">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        <h1 className="text-3xl font-bold mt-3">
          Please wait for API to start ...
        </h1>
      </div>
    </div>
  ) : (
    <div className="p-20">
      {/* ADD Card button */}
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold underline">Interview Cards</h1>
        <button
          onClick={generateCardsAction}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
        >
          Generate Cards
        </button>
      </div>
      <ul className="card-list">
        {cards.length > 0 &&
          cards.map((card, _) => <Card key={card._id} {...card} />)}
      </ul>
      <div className="flex justify-center mt-10">
        <button
          disabled={!activeBtn}
          onClick={() => fetchMoreCards()}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded"
        >
          {activeBtn ? "See More" : "No More Cards"}
        </button>
      </div>
    </div>
  );
}

export default ListOfCards;
