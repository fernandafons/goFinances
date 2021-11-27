import React, { useState } from "react";
import { Modal } from 'react-native';
import {useForm} from 'react-hook-form';

import { Input } from '../../Components/Forms/Input';
import { InputForm } from '../../Components/Forms/InputForm';
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

interface FormData {
  name: string;
  amount: string;
}

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category'
  });

  const {
    control,
    handleSubmit,
  } = useForm();

  function handleTransactionTypeSelect(type: 'up' | 'down'){
    setTransactionType(type);
  }

  function handleOpenSelectCategory(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategory(){
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData){
    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    }

    console.log(data);
  }

  return (
    <Container>
      <Header>
        <Title>Register</Title>
      </Header>

      <Form>
        <Fields>
          <InputForm 
            name="name"
            control={control}
            placeholder="Name"
          />
          <InputForm 
            name="amount"
            control={control}
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

        <Button 
          title="Submit"
          onPress={handleSubmit(handleRegister)}
        />
        
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