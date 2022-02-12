import React, { useContext } from 'react'
import { CourseContext } from '../../contexts/Course.Context'
import { Comments } from './Comments'
import ThumbNail from '../../public/images/video-thumbnail.jpg'

export const CourseDetail = () => {
    const {selectedCourse, selectCourse} = useContext(CourseContext)
    const thumbNail = selectedCourse?.thumbanilURL?.includes('https://') ?  selectedCourse.thumbNailURL : ThumbNail
    const duration = ` ${Math.floor(selectedCourse?.durationMinutes/60)} h ${parseInt(selectedCourse?.durationMinutes%60)} m`
    const {descriptions, tags, title} = selectedCourse

    return <div className="content-wrapper course-details mt-4">
    <div className="course-details__head">
      <div className="d-flex align-items-sm-center">
        <a href="#" aria-label="Back" onClick={e=>{
            e.preventDefault();
            selectCourse(undefined);
        }}>
          <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 1L1 10L10 19" stroke="#8A9BA8" />
          </svg>
        </a>
        <h1 className="course-details__title ms-3 mb-0 pe-4">
         {title}
        </h1>
      </div>
      <div className="time mt-sm-0 mt-3">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11ZM6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10ZM5.311 4.2075L7.7505 5.8335C7.77793 5.85176 7.80043 5.87651 7.81599 5.90556C7.83155 5.9346 7.83969 5.96705 7.83969 6C7.83969 6.03295 7.83155 6.0654 7.81599 6.09444C7.80043 6.12349 7.77793 6.14824 7.7505 6.1665L5.3105 7.7925C5.28041 7.81244 5.24549 7.82387 5.20944 7.82558C5.17338 7.82728 5.13754 7.81919 5.1057 7.80217C5.07387 7.78516 5.04724 7.75984 5.02863 7.72891C5.01002 7.69798 5.00013 7.6626 5 7.6265V4.3735C5.00007 4.33733 5.00994 4.30185 5.02858 4.27084C5.04721 4.23984 5.07391 4.21446 5.10582 4.19743C5.13774 4.1804 5.17367 4.17234 5.2098 4.17411C5.24593 4.17588 5.28091 4.18742 5.311 4.2075Z"
            fill="#2B517E" />
        </svg>
        <span>{duration}</span>

      </div>
    </div>

    <div className="course-details__video-wrapper">
      <img src="images/video.jpg" className="w-100" alt="" />
    </div>

    <div className="w-100 mb-4">
    {tags?.split(',').map(item =>  <span className="tag tag--green" key={item}>{item}</span>)}
    </div>

    <p>{descriptions}</p>
    <Comments />
  </div>
}