import React from 'react'
import { useState } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { updateInvestment } from '../../services/investment.service'

export const ShowConfirmationModal = ({ toggle, isOpen, investment}) => {
  const [error, setError] = useState(false)

  const onSave = () => {
    investment && updateInvestment({...investment, status: 2}).then(res => {
      if (res.status === 200 || res.status === 201) {
        alert('Invetsment returend')
        toggle()
      }
    }).catch(err => {
      setError(true)
    })
  }


  return <Modal toggle={toggle} isOpen={isOpen}>
    <ModalHeader>{'Pay Profit'}</ModalHeader>

    <ModalBody>
      {`Are you sure that you are returing the Invetsment amout of ${investment?.investedAmount} for ${investment?.investorName}`}
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Confirm</Button>{' '}
        <Button onClick={toggle}>Close</Button>
      </div>
      <div>
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}