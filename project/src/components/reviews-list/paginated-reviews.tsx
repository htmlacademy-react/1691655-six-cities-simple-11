import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/app-data/selectors';
import { Review } from '../../types/review-type';
import ReviewsList from './reviews-list';
import ReactPaginate from 'react-paginate';
import './pagination.css';

type propsType = {
    reviewsPerPage: number
}

function PaginatedReviews ({reviewsPerPage} : propsType): JSX.Element {
    const reviews: Review[] = useAppSelector(getReviews);
    const [reviewOffset, setReviewOffset] = useState(0);
    const endOffset = reviewOffset + reviewsPerPage;
    const currentReviews = reviews.slice(reviewOffset, endOffset);

    const pageCount = 1 ? 0 : Math.ceil(reviews.length / reviewsPerPage);

    const handlePageClick = ({selected}: {selected: number}) => {
        const newOffset = (selected * reviewsPerPage) % reviews.length;

        console.log(`User requested page number ${selected}`);

        setReviewOffset(newOffset);
    }

    return (
        <>
            <ReviewsList reviews={currentReviews}/>
            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={pageCount}
                previousLabel='< previous'
                renderOnZeroPageCount={null}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
            />
        </>
    )
}

export default PaginatedReviews;
