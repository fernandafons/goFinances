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
                <HighlightCard />
                <HighlightCard />
                <HighlightCard />
            </HighlightCards>
        </Container>
    )
}