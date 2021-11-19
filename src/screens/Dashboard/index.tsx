import React from 'react';
import { HighlightCard } from '../../Components/HighlightCard';

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
} from './styles'

export function Dashboard(){
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

                <PowerIcon name="power" />
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
        </Container>
    )
}