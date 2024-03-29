import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { CourseForm } from './CourseForm'
import { saveCourse, updateCourse, uploadFile } from '../../services/course.service'

export const NewCourseModal = ({ toggle, isEdit, isOpen, selectedCourse }) => {
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
  const [selectedFile, setSelectedFile] = useState()
  const [uploadInProgress, setuploadInProgress] = useState(false)

  /**
   * Update Course when View/Edit button is clicked.
   */
  useEffect(() => {
    if (selectedCourse) {
      setCourse(selectedCourse)
    }
  }, [selectedCourse])

  /**
   * Set default values when Toggle to close.
   */
  const toggleCourseModal = () => {
    setCourse(defaultCourse)
    setSaved(false)
    setError(false)
    toggle()
  }

  const handleChange = (event) => {
    const { target } = event;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'number') value = Number(value)
    const { name } = target;
    setCourse({ ...course, [name]: value });
  };

  const onSave = () => {
    if (!selectedCourse) {
      saveCourse(course).then(res => {
        if (res.status === 200 || res.status === 201) setSaved(true)
      }).catch(err => {
        setError(true)
      })
    } else {
      updateCourse(course).then(res => {
        if (res.status === 200 || res.status === 201) setSaved(true)
      }).catch(err => {
        setError(true)
      })
    }
  }

  const onFileUpload = (name) => {
    const formData = new FormData();
    formData.append("formFile", selectedFile.file);
    formData.append("fileName", selectedFile.name);

    setuploadInProgress(true)
    uploadFile(formData).then(res => {
      setCourse({ ...course, [name]: res.data });
      setuploadInProgress(false)
    }).catch(err => {
      alert('Upload failed, please try again!')
      setuploadInProgress(false)
    })
  };

  const onFileChange = event => {
    setSelectedFile({ file: event.target.files[0], name: event.target.files[0].name });
  };


  return <Modal toggle={toggleCourseModal} isOpen={isOpen}>
    <ModalHeader>{isEdit ? 'Edit Course' : 'Add New Course'}</ModalHeader>

    <ModalBody>
      <CourseForm
        handleChange={handleChange}
        course={course}
        onFileUpload={onFileUpload}
        onFileChange={onFileChange}
        uploadInProgress={uploadInProgress} />
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Save Course</Button>{' '}
        <Button onClick={() => { setCourse(defaultCourse) }}>Clear Form</Button>{' '}
        <Button onClick={toggleCourseModal}>Close</Button>
      </div>
      <div>
        {saved && <Alert color='success'>Saved succesfully</Alert>}
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}