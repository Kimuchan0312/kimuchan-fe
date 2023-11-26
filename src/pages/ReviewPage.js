import { useEffect, useState } from "react";
import apiService from "../app/apiService";
import { useParams } from "react-router-dom";


function ReviewPage() {
    const { id } = useParams();
    const [readingLesson, setReadingLesson] = useState(null);

    useEffect(() => {
      apiService
        .get(`/api/v1/reading-lessons/${id}`)
        .then((response) => {
          setReadingLesson(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reading lesson:", error);
        });
    }, [id]);

  return (
    <div>
      <h2>Correct Answer is:</h2>
      <p>{readingLesson.questions.correctAnswer}</p>
    </div>
  );
}

export default ReviewPage;