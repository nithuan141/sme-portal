import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'

export const PaginationBar = ({ currentPage, totalPage, setPage }) => {

  const start = totalPage > 5 ? ((totalPage - currentPage) < 5 ? (totalPage - currentPage) : currentPage) : 1;
  const end = totalPage > 5 ? start + 4 : totalPage;
  const pageNumbers = []
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i)
  }

  return <Pagination aria-label="Page navigation" size="lg">
    <PaginationItem>
      <PaginationLink first href="#" onClick={(e) => {
        e.preventDefault(); setPage(1);
      }} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink previous href="#" onClick={(e) => {
        e.preventDefault();
        currentPage > 1 && setPage(currentPage - 1);
      }} />
    </PaginationItem>

    {/* {pageNumbers.map(p =>
      <PaginationItem>
        <PaginationLink href="#" active={p === currentPage} onClick={(e) => {
          e.preventDefault();
          setPage(p);
        }} >
          {p}
        </PaginationLink>
      </PaginationItem>
    )
    } */}
    <span className='pagerSpan'>{`Showing ` } </span><input type="number" min={1} max={totalPage} value={currentPage} onChange={(e) => {
      if(e.target.value > 0 && e.target.value <= totalPage) {
        setPage(e.target.value)
      }
    }}/><span  className='pagerSpan'> {` of ${totalPage} pages`}</span>

    <PaginationItem>
      <PaginationLink next href="#" onClick={(e) => {
        e.preventDefault();
        currentPage < totalPage && setPage(currentPage + 1);
      }} />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink last href="#" onClick={(e) => {
        e.preventDefault(); setPage(totalPage);
      }} />
    </PaginationItem>
  </Pagination>
}