import axios from "axios";
import { CardEntity, CommentEntity } from "../models/cards.model";

export const generateCards = async (): Promise<CardEntity> => {
  const { data } = await axios.post("http://localhost:3000/api/cards/generate");
  return data;
};

export const getCards = async (page: number): Promise<CardEntity[]> => {
  const { data } = await axios.get(
    `http://localhost:3000/api/cards?page=${page}`
  );
  return data;
};

export const getOneCard = async (id: string): Promise<CardEntity> => {
  const { data } = await axios.get(`http://localhost:3000/api/cards/${id}`);
  return data;
};

export const updateCardStatus = async (id: string, status: string) => {
  const { data } = await axios.patch(
    `http://localhost:3000/api/cards/${id}/status`,
    {
      status,
    }
  );
  return data;
};

export const archiveCard = async (id: string) => {
  const { data } = await axios.put(
    `http://localhost:3000/api/cards/${id}/archive`
  );
  return data;
};

export const commentCard = async (id: string, comment: CommentEntity) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/cards/${id}/comment`,
    { comment }
  );
  return data;
};

export const addComment = async (id: string, comment: string) => {
  const { data } = await axios.post(
    `http://localhost:3000/api/cards/${id}/comment`,
    { comment }
  );
  return data;
};

export const removeComment = async (id: string, commentId: string) => {
  const { data } = await axios.delete(
    `http://localhost:3000/api/cards/${id}/comment/${commentId}`
  );
  return data;
};
