import React, { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../Components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../Components/TransactionCard';

import { 
    Container, 
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    PowerIcon,
    HighlightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton,
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

export function Dashboard(){
    const [Idata, setData] = useState<DataListProps[]>([]);

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {
            const amount = Number(item.amount)
            .toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
            });

            const date = Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                type: item.type,
                category: item.category,
                date,
            }
        });

        setData(transactionsFormatted);
    }
    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));
    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo 
                            source={{ uri: 'http://github.com/fernandafons.png' }} />
                        <User>
                            <UserGreeting>Hello,</UserGreeting>
                            <UserName>Fernanda</UserName>
                        </User>
                    </UserInfo>

                <LogoutButton onPress={() => {}}>
                <PowerIcon name="power" />
                </LogoutButton>
                </UserWrapper>

            </Header>

            <HighlightCards>
                <HighlightCard 
                    title="Income" 
                    type="up"
                    amount="U$ 17,400.00" 
                    lastTransaction="Last income was April 13th" 
                />
                <HighlightCard 
                    title="Outcome" 
                    type="down"
                    amount="U$ 1,259.00" 
                    lastTransaction="Last outcome was April 3th" 
                />
                <HighlightCard 
                    title="Total" 
                    type="total"
                    amount="U$ 16,141.00" 
                    lastTransaction="From April 3th to April 13th" 
                />
            </HighlightCards>

            <Transactions>
                <Title>Finances track</Title>

                <TransactionsList 
                    data={Idata}
                    keyExtractor={ item => item.id }
                    renderItem={({ item }) => <TransactionCard data={item} /> }
                />

                
            </Transactions>
        </Container>
    )
}