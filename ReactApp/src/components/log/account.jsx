import styled from 'styled-components'

const RoundImg = styled.img`
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
`;

export default function Account({ img, name }) {
    return <div className="d-flex align-items-center me-1">
        <RoundImg src={img} alt='avatar' />
        {name}
    </div>
}
