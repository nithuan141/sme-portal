import React, { useContext, useState } from 'react'
import { CourseContext } from '../../contexts/Course.Context'
import { CourseTile } from './CourseTile'

export const CourseList = () => {
    const { courses, loading } = useContext(CourseContext) 
    const[currentPage, setPage] = useState(1)
    const totalPages = Math.ceil(courses?.length / 9);

    return <div className="course-listing__lists">
        {loading && <div className="row"><h4>{'We are fetching the courses for you, please wait ....'}</h4></div>}
        {!loading && courses?.length === 0&&  <div className="row"><h4>{`Oops ! Sorry, we can't find any courses.`}</h4></div>}
        <div className="row">
            {
                courses?.slice((currentPage-1) * 9 , (currentPage * 9))
                .map(course => <CourseTile course = {course} key={course.id}/>)
            }
        </div>
       {totalPages > 1 && <ul className="pagination mt-4 ms-auto me-auto mb-5 d-table">
          <li className={`page-item${currentPage === 1 ? ' disabled': ''}`}>
            <a className="page-link" onClick={e=>{
                e.preventDefault()
                if(currentPage > 1) setPage(currentPage - 1)
            }}>Previous</a>
          </li>
          {/* <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item active" aria-current="page">
            <a className="page-link" href="#">2</a>
          </li>
          <li className="page-item"><a className="page-link" href="#">3</a></li> */}
         <li className="page-item"><a className="page-link" disabled>{`Showing ${currentPage} out of ${totalPages} pages`}</a></li>
          <li className={`page-item${currentPage === totalPages ? ' disabled': ''}`}>
            <a className="page-link" href="#" onClick={e=>{
                e.preventDefault()
                if(currentPage < totalPages) setPage(currentPage + 1)
            }}>Next</a>
          </li>
        </ul>}
    </div>
}