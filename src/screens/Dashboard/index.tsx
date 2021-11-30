import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';
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
    LoadContainer,
} from './styles'

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string
}

interface HighlightData {
    entries: HighlightProps;
    expenses: HighlightProps;
    total: HighlightProps;
}

export function Dashboard(){
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);

    const theme = useTheme();

    async function loadTransactions(){
        const dataKey = '@gofinances:transactions';
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        let entriesTotal = 0;
        let expensesTotal = 0;

        const transactionsFormatted: DataListProps[] = transactions
        .map((item: DataListProps) => {

            if(item.type === 'positive'){
                entriesTotal += Number(item.amount);
            } else {
                expensesTotal += Number(item.amount);
            }

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

        setTransactions(transactionsFormatted);

        const total = entriesTotal - expensesTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })
            },
            expenses: {
                amount: expensesTotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                })
            },
            total: {
                amount: total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            })}
        });
        setIsLoading(false);
    }

    useEffect(() => {
        loadTransactions();
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));
    return (
        <Container>
            { 
                isLoading ? 
                <LoadContainer>
                    <ActivityIndicator 
                        color={theme.colors.primary} 
                        size="large" 
                    />
                </LoadContainer> :
            <>
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
                        amount={highlightData.entries.amount} 
                        lastTransaction="Last income was April 13th" 
                    />
                    <HighlightCard 
                        title="Outcome" 
                        type="down"
                        amount={highlightData.expenses.amount}
                        lastTransaction="Last outcome was April 3th" 
                    />
                    <HighlightCard 
                        title="Total" 
                        type="total"
                        amount={highlightData.total.amount}
                        lastTransaction="From April 3th to April 13th" 
                    />
                </HighlightCards>

                <Transactions>
                    <Title>Finances track</Title>

                    <TransactionsList 
                        data={transactions}
                        keyExtractor={ item => item.id }
                        renderItem={({ item }) => <TransactionCard data={item} /> }
                    />
                </Transactions>
            </>
            }  
            </Container>
    )
}