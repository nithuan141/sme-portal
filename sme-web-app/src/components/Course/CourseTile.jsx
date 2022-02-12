import React, { useContext } from 'react'
import { CourseContext } from '../../contexts/Course.Context'
import ThumbNail from '../../public/images/video-thumbnail.jpg'

export const CourseTile = ({course}) => {
    const {selectCourse} = useContext(CourseContext)
    const thumbNail = course?.thumbanilURL?.includes('https://') ?  course.thumbNailURL : ThumbNail
    const duration = ` ${Math.floor(course?.durationMinutes/60)} h ${parseInt(course?.durationMinutes%60)} m`
    const {descriptions, tags, title} = course

    return <div className="col-sm-4 mb-4">
    <a href="#" title="Title" onClick={e=>{
        e.preventDefault();
        selectCourse(course)
    }}>
      <div className="tile-list">
        <div className="tile-list__image">
          <img src={thumbNail} alt="" />
        </div>
        <div className="time">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 11C3.2385 11 1 8.7615 1 6C1 3.2385 3.2385 1 6 1C8.7615 1 11 3.2385 11 6C11 8.7615 8.7615 11 6 11ZM6 10C7.06087 10 8.07828 9.57857 8.82843 8.82843C9.57857 8.07828 10 7.06087 10 6C10 4.93913 9.57857 3.92172 8.82843 3.17157C8.07828 2.42143 7.06087 2 6 2C4.93913 2 3.92172 2.42143 3.17157 3.17157C2.42143 3.92172 2 4.93913 2 6C2 7.06087 2.42143 8.07828 3.17157 8.82843C3.92172 9.57857 4.93913 10 6 10ZM5.311 4.2075L7.7505 5.8335C7.77793 5.85176 7.80043 5.87651 7.81599 5.90556C7.83155 5.9346 7.83969 5.96705 7.83969 6C7.83969 6.03295 7.83155 6.0654 7.81599 6.09444C7.80043 6.12349 7.77793 6.14824 7.7505 6.1665L5.3105 7.7925C5.28041 7.81244 5.24549 7.82387 5.20944 7.82558C5.17338 7.82728 5.13754 7.81919 5.1057 7.80217C5.07387 7.78516 5.04724 7.75984 5.02863 7.72891C5.01002 7.69798 5.00013 7.6626 5 7.6265V4.3735C5.00007 4.33733 5.00994 4.30185 5.02858 4.27084C5.04721 4.23984 5.07391 4.21446 5.10582 4.19743C5.13774 4.1804 5.17367 4.17234 5.2098 4.17411C5.24593 4.17588 5.28091 4.18742 5.311 4.2075Z"
              fill="#2B517E" />
          </svg>
          <span>{duration}</span>
        </div>
        <div className="tile-list__content">
          <h2>{title}</h2>
          <p>{descriptions} </p>
          {tags.split(',').map(item =>  <span className="tag" key={item}>{item}</span>)}
        </div>

        <div className="tile-list__start text-center">
          <div className="m-auto  d-inline-block position-relative overflow-hidden">
            <div className="tile-list__btn-text">
              <span>
                Start course
              </span>
            </div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20ZM8.622 6.415C8.56182 6.37485 8.49187 6.35177 8.41961 6.34822C8.34734 6.34467 8.27547 6.36079 8.21165 6.39486C8.14782 6.42893 8.09443 6.47967 8.05716 6.54168C8.01989 6.60369 8.00013 6.67465 8 6.747V13.253C8.00013 13.3253 8.01989 13.3963 8.05716 13.4583C8.09443 13.5203 8.14782 13.5711 8.21165 13.6051C8.27547 13.6392 8.34734 13.6553 8.41961 13.6518C8.49187 13.6482 8.56182 13.6252 8.622 13.585L13.501 10.333C13.5559 10.2965 13.6009 10.247 13.632 10.1889C13.6631 10.1308 13.6794 10.0659 13.6794 10C13.6794 9.93409 13.6631 9.86921 13.632 9.81111C13.6009 9.75302 13.5559 9.70351 13.501 9.667L8.622 6.415Z"
                fill="url(#paint0_linear_46_282)" />
              <defs>
                <linearGradient id="paint0_linear_46_282" x1="10" y1="0" x2="10" y2="20"
                  gradientUnits="userSpaceOnUse">
                  <stop stopColor="#387ED1" />
                  <stop offset="1" stopColor="#03488B" />
                </linearGradient>
              </defs>
            </svg>
          </div>

        </div>
      </div>
    </a>
  </div>
}