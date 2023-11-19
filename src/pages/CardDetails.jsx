import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CardDetails = () => {
  const [questions, setQuestions] = useState();
  const { cardId, categoryId } = useParams();

  useEffect(() => {
    const getQuestions = async (questionCardId) => {
      const auth_token = localStorage.getItem("auth_token");
      const response = await fetch(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/learn/categories/${categoryId}/${cardId}`,
        {
          headers: {
            Authorization: "Token " + auth_token,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error in the response");
      }

      const result = await response.json();
      setQuestions(result.data);
      console.log(result.data);
    };

    getQuestions();
  }, []);

  return (
    <div>
      {questions.map((question) => (
        <p>{question.content}</p>
      ))}
    </div>
  );
};

export default CardDetails;
