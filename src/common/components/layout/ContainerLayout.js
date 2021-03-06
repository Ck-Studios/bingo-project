import {mobile, pointColor, Layout} from "common/theme/theme";
import styled from "styled-components";

export default function ContainerLayout(props) {
    return (
        <ContainerFrame background={props.background}>
            {props.children}
        </ContainerFrame>
    )
}

const ContainerFrame = styled.div`
    width: 100%;
    height: 100%;
    background: ${({background}) => background || "transparent"};
`;
