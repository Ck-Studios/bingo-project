import {mobile, pointColor, Layout} from "common/theme/theme";
import styled from "styled-components";

export default function ContainerLayout(props) {
    return (
        <ContainerFrame>
            {props.children}
        </ContainerFrame>
    )
}

const ContainerFrame = styled.div`
    width: 100%;
`;
