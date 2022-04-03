import React from 'react'
import { useState, useEffect } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { UserForm } from './UserForm'
import { saveUser, updateUser } from '../../services/user.service'

export const NewUserModal = ({ toggle, isEdit, isOpen, selectedUser }) => {
  const defaultUser = { role: 'User', name: '', phone: '', email: '', address: '', password: '', isActive: true }
  const [user, setUser] = useState(defaultUser)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  /**
   * Update User when View/Edit button is clicked.
   */
  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser)
    }
  }, [selectedUser])

  /**
   * Set default values when Toggle to close.
   */
  const toggleCourseModal = () => {
    setUser(defaultUser)
    setSaved(false)
    setError(false)
    toggle()
  }

  const handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    setUser({ ...user, [name]: value });
  };

  const onSave = () => {
    if (!selectedUser) {
      saveUser(user).then(res => {
        if (res.status === 200 || res.status === 201) setSaved(true)
      }).catch(err => {
        setError(true)
      })
    } else {
      updateUser(user).then(res => {
        if (res.status === 200 || res.status === 201) setSaved(true)
      }).catch(err => {
        setError(true)
      })
    }
  }


  return <Modal toggle={toggleCourseModal} isOpen={isOpen}>
    <ModalHeader>{isEdit ? 'Edit User' : 'Add New User'}</ModalHeader>

    <ModalBody>
      <UserForm handleChange={handleChange} user={user} />
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Save User</Button>{' '}
        <Button onClick={() => { setUser(defaultUser) }}>Clear Form</Button>{' '}
        <Button onClick={toggleCourseModal}>Close</Button>
      </div>
      <div>
        {saved && <Alert color='success'>Saved succesfully</Alert>}
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}