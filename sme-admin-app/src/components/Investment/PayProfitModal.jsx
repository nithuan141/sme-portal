import React from 'react'
import { useState } from 'react'
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import { savePayProfit } from '../../services/investment.service'
import { PayProfitForm } from './PayProfitForm'

export const PayProfitModal = ({ toggle, isOpen, userId, investmentId }) => {
  const defaultPayProfit = {
        paidDate: new Date(),
        paidAmount: 0,
  }
  
  const [payProfit, setPayProfit] = useState(defaultPayProfit)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(false)

  const handleChange = (event) => {
    const { target } = event;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if(target.type === 'number' || target.type === 'select-one') value =  Number(value)
    const { name } = target;
    setPayProfit({ ...payProfit, [name]: value });
  };

  const onSave = () => {
    const data = {...payProfit, userId: userId, investmentId: investmentId}
    savePayProfit(data).then(res => {
      if (res.status === 200 || res.status === 201) setSaved(true)
    }).catch(err => {
      setError(true)
    })
  }


  return <Modal toggle={toggle} isOpen={isOpen}>
    <ModalHeader>{'Pay Profit'}</ModalHeader>

    <ModalBody>
      <PayProfitForm handleChange={handleChange} payProfit={payProfit} />
    </ModalBody>

    <ModalFooter>
      <div>
        <Button color="primary" onClick={onSave}>Pay Profit</Button>{' '}
        <Button onClick={() => { setPayProfit(defaultPayProfit) }}>Clear Form</Button>{' '}
        <Button onClick={toggle}>Close</Button>
      </div>
      <div>
        {saved && <Alert color='success'>Saved succesfully</Alert>}
        {error && <Alert color='danger'>Save failed ! Please try again</Alert>}
      </div>
    </ModalFooter>
  </Modal>
}