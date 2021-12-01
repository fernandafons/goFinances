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
    amount: string;
    lastTransaction: string;
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

    function getLastTransactionDate(
        collection: DataListProps[],
        type: 'positive' | 'negative'
        ){
        const lastTransaction = new Date(
        Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())));

        return `${lastTransaction.toLocaleString('en-US', {month: 'long'})} ${lastTransaction.getDate()}`; 
    }

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

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpenses = getLastTransactionDate(transactions, 'negative');
        const totalInterval = `From 01 to ${lastTransactionExpenses}`;

        const total = entriesTotal - expensesTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }),
                lastTransaction: `Last income was ${lastTransactionEntries}`,
            },
            expenses: {
                amount: expensesTotal.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }),
                lastTransaction: `Last outcome was ${lastTransactionExpenses}`,
            },
            total: {
                amount: total.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
            }),
            lastTransaction: totalInterval
        },
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
                        lastTransaction={highlightData.entries.lastTransaction}
                    />
                    <HighlightCard 
                        title="Outcome" 
                        type="down"
                        amount={highlightData.expenses.amount}
                        lastTransaction={highlightData.expenses.lastTransaction}
                    />
                    <HighlightCard 
                        title="Total" 
                        type="total"
                        amount={highlightData.total.amount}
                        lastTransaction={highlightData.total.lastTransaction}
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