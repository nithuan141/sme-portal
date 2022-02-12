import React from 'react'
import { useState } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { saveInvestment } from '../../services/investment.service'
import { InvestmentForm } from './InvestmentForm'

export const NewInvestmentModal = ({ toggle, isEdit, isOpen, userId, userName }) => {
  const defaultInvestment = {
    investedAmount: 0,
    profitPercentage: 0,
    investedDate: new Date(),
    investmentMonths: 12,
    invetsmentType: 1,
    status: 0,
    returnRequestedDate: undefined,
    returnedDate: undefined
  }
  
  const [investment, setInvestment] = useState(defaultInvestment)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const { target } = event;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if(target.type === 'number' || target.type === 'select-one') value =  Number(value)
    const { name } = target;
    setInvestment({ ...investment, [name]: value });
  };

  const onSave = () => {
    const data = {...investment, userId: userId, investorName: userName}
    saveInvestment(data).then(res => {
      if (res.status === 200 || res.status === 201) setSaved(true)
    }).catch(err => {
      setError(true)
    })
  }


  return <Modal toggle={toggle} isOpen={isOpen}>
    <ModalHeader>{isEdit ? 'Edit Investment' : 'Add New Investment'}</ModalHeader>

    <ModalBody>
      <InvestmentForm handleChange={handleChange} investment={investment} />
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Save Investment</Button>{' '}
        <Button onClick={() => { setInvestment(defaultInvestment) }}>Clear Form</Button>{' '}
        <Button onClick={toggle}>Close</Button>
      </div>
      <div>
        {saved && <Alert color='success'>Saved succesfully</Alert>}
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}