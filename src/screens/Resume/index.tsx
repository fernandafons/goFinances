import React from 'react';
import { HistoryCard } from '../../Components/HistoryCard';

import { 
  Container,
  Header,
  Title,
} from './styles';

export function Resume() {
  return (
    <Container>
      <Header>
        <Title>Resume by category</Title>
      </Header>
      <HistoryCard 
        title="Compras"
        amount="150,00"
        color="red"
      />
    </Container>
  )
}