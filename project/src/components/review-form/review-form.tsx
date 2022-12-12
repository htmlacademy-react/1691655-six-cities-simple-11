import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RATES_TYPES } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';


function RewievFormScreen (): JSX.Element {
  const [text, setText] = useState<string>('');
  const [rate, setRate] = useState<number>(0);
  const [isFormDisabled, setFormDisabled] = useState<boolean>(false);

  const hotelId = Number(useParams().id);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const dispatch = useAppDispatch();

  const handleRatingClick = (evt: ChangeEvent<HTMLElement>, rating: number) => {
    evt.preventDefault();

    setRate(rating);
  };

  const handleChangeText = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setText(evt.target.value);
  };

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setFormDisabled(true);

    if (rate && textAreaRef.current) {
      await dispatch(postReviewAction({
        hotelId: hotelId,
        comment: textAreaRef.current.value,
        rating: rate,
      }));
    }

    setFormDisabled(false);
    setText('');
    setRate(0);
  };


  return (
    <form
      className="reviews__form form"
      action=""
      method="post"
      onSubmit={handleSubmit}
    >
      <fieldset
        style={{border: 'none'}}
        disabled={isFormDisabled}
      >
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {
            RATES_TYPES.map((element, i) => (
              <React.Fragment key={element}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  id={`${i}-stars`}
                  type="radio"
                  onChange={ (evt) => handleRatingClick(evt, 5 - i) }
                  checked={ rate === 5 - i }
                />
                <label
                  htmlFor={`${i}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title={element}
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            ))
          }
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          ref={textAreaRef}
          id="review"
          name="review"
          placeholder="Tell how was your stay, what you like and what can be improved"
          value={text}
          onChange={handleChangeText}
        >
        </textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={!(rate && text.length > 50)}
          >
            Submit
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export default RewievFormScreen;
