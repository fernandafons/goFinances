import React from 'react';
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
    const Idata : DataListProps[] = [
        {
        id: '1',
        type: 'positive',
        title: "Website Development",
        amount: "U$ 12,000.00",
        category: {
            name: "Selling", 
            icon: "dollar-sign"
        },
        date: "05/15/2021",
        },
        {
        id: '2',
        type: 'negative',
        title: "AppleBees",
        amount: "U$ 59.00",
        category: {
            name: "Restaurants", 
            icon: "coffee"
        },
        date: "05/14/2021",
        },
        {
        id: '3',
        type: 'negative',
        title: "Appartment Rent",
        amount: "U$ 1.200,00",
        category: {
            name: "Home", 
            icon: "shopping-bag"
        },
        date: "04/13/2021",
        },
    ]
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