import React, { useState } from "react";
import { Modal } from 'react-native';

import { Input } from '../../Components/Forms/Input';
import { Button } from '../../Components/Forms/Button';
import { TransactionTypeButton } from '../../Components/Forms/TransactionTypeButton';
import { CategorySelectButton } from '../../Components/Forms/CategorySelectButton';

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionsTypes,
} from './styles';
import { CategorySelect } from "../CategorySelect";

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category'
  });

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleOpenSelectCategory(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory(){
    setCategoryModalOpen(false);
  }

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <Fields>
          <Input 
            placeholder="Name"
          />
          <Input 
            placeholder="Price"
          />

          <TransactionsTypes>
            <TransactionTypeButton 
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton 
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TransactionsTypes>

          <CategorySelectButton 
            title={category.name} 
            onPress={handleOpenSelectCategory}
          />
        </Fields>

        <Button title="Submit"/>
        
      </Form>

      <Modal visible={categoryModalOpen} >
        <CategorySelect
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategory}
        />
      </Modal>
    </Container>
  )
}