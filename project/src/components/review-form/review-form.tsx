import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { MAX_REVIEW_LENGHT, MIN_REVIEW_LENGHT, RATES_TYPES } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postReviewAction } from '../../store/api-actions';
import { changePostStatus } from '../../store/app-data/app-data';
import { getReviewPostStatus } from '../../store/app-data/selectors';

function RewievForm (): JSX.Element {
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
  };

  const isReviewPosted = useAppSelector(getReviewPostStatus);
  useEffect(() => {
    switch (isReviewPosted) {
      case true:
      {
        window.scroll(0, 0);
        setText('');
        setRate(0);
        dispatch(changePostStatus(undefined));
        break;
      }
      case false: {
        toast.success('Проблема с отправкой отзыва!');
        dispatch(changePostStatus(undefined));
        break;
      }
    }
  }, [isReviewPosted]);

  return (
    <>
      <ToastContainer />
      <form
        className="reviews__form form"
        action=""
        method="post"
        onSubmit={(event) => {void handleSubmit(event);}}
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
              To submit review please make sure to set
              <span className="reviews__star">rating</span>
              and describe your stay with at least&nbsp;
              <b className="reviews__text-amount">50 characters</b>
              &nbsp;and&nbsp;
              <b className="reviews__text-amount">300 characters</b>
              &nbsp;maximum.
            </p>
            <button
              className="reviews__submit form__submit button"
              type="submit"
              disabled={!(rate && text.length > MIN_REVIEW_LENGHT && text.length < MAX_REVIEW_LENGHT)}
            >
              Submit
            </button>
          </div>
        </fieldset>
      </form>
    </>

  );
}

export default RewievForm;
