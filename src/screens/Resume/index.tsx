import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { categories } from '../../utils/categories';

import { HistoryCard } from '../../Components/HistoryCard';

import { 
  Container,
  Header,
  Title,
  Content,
} from './styles';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: string;
  color: string;
}

export function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

  async function loadData(){
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expenses = responseFormatted
    .filter((expense: TransactionData )=> expense.type === 'negative');

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expenses.forEach((expense: TransactionData) => {
        if(expense.category === category.key){
          categorySum += Number(expense.amount);
        }
      });

      if(categorySum > 0){
        const total = categorySum
        .toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total,
        });
      };
    });
    setTotalByCategories(totalByCategory);
  }
  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header>
        <Title>Resume by category</Title>
      </Header>

      <Content>
        { 
        totalByCategories.map(item => (
          <HistoryCard 
            key={item.key}
            title={item.name}
            amount={item.total}
            color={item.color}
          />
        ))
        }
      </Content>
    </Container>
  )
}