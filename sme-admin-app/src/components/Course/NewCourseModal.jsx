import React from 'react'
import { useState } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { CourseForm } from './CourseForm'
import { saveCourse } from '../../services/course.service'

export const NewCourseModal = ({ toggle, isEdit, isOpen }) => {
  const defaultCourse = {
    title: "",
    descriptions: "",
    tags: "",
    videoURL: "",
    thumbanilURL: "",
    durationMinutes: 0,
    isPublished: true
  }
  const [course, setCourse] = useState(defaultCourse)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const { target } = event;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if(target.type === 'number') value =  Number(value)
    const { name } = target;
    setCourse({ ...course, [name]: value });
  };

  const onSave = () => {
    saveCourse(course).then(res => {
      if (res.status === 200 || res.status === 201) setSaved(true)
    }).catch(err => {
      setError(true)
    })
  }


  return <Modal toggle={toggle} isOpen={isOpen}>
    <ModalHeader>{isEdit ? 'Edit Course' : 'Add New Course'}</ModalHeader>

    <ModalBody>
      <CourseForm handleChange={handleChange} course={course} />
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Save Course</Button>{' '}
        <Button onClick={() => { setCourse(defaultCourse) }}>Clear Form</Button>{' '}
        <Button onClick={toggle}>Close</Button>
      </div>
      <div>
        {saved && <Alert color='success'>Saved succesfully</Alert>}
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}