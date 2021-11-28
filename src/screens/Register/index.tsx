import React, { useState } from "react";
import { 
  Keyboard, 
  Modal, 
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

import {useForm} from 'react-hook-form';

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

const schema = Yup.object().shape({
  name: Yup.string().required('Name is mandatory'),
  amount: Yup
  .number()
  .typeError('Use a valid numeric value')
  .positive('Value can not be negative')
  .required('Value is mandatory')
});

export function Register(){
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const dataKey = '@gofinances:transactions';

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Category'
  });

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
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

  async function handleRegister(form: FormData){
    if(!transactionType)
      return Alert.alert('Choose a transaction type');

    if(category.key === 'category')
      return Alert.alert('Choose a category');

    
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key,
      date: new Date()
    }

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const dataFormatted = [
        ...currentData,
        newTransaction
      ]

      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

      reset();
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Category'
      });

      navigation.navigate('List');


    } catch (error) {
      console.log(error);
      Alert.alert('Something went wrong. It was not possible to save it.')
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
            autoCapitalize="sentences"
            autoCorrect={false}
            error={errors.name && errors.name.message}
          />
          <InputForm 
            name="amount"
            control={control}
            placeholder="Value"
            keyboardType="numeric"
            error={errors.amount && errors.amount.message}
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
    </TouchableWithoutFeedback>
  )
}