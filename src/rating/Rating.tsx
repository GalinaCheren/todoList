import { v4 as uuidv4 } from 'uuid';

type TRating = {
  setRating: (newRating: number) => void;
  rating: number;
};

export const Rating = ({ setRating, rating }: TRating) => {
  let ratingStars = new Array(5);
  return (
    <div className="rating">
      {ratingStars.fill(null).map((_, index) => (
        <div className="rating-container" key={uuidv4()}>
          <div
            className={`star${rating >= index + 1 ? ' active' : ''} `}
            onClick={() => {
              setRating(index + 1);
            }}
          ></div>
        </div>
      ))}
    </div>
  );
};
