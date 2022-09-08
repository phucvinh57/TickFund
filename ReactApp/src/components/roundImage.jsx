import styled from 'styled-components'

export const RoundImg = styled.img`
    width: ${props => props.sizes}px;
    height: ${props => props.sizes}px;
    border-radius: 50%;
    margin-right: 10px;
`;