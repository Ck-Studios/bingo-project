import {mobile, breakPoints, pointColor, desktop} from "common/theme/theme";
import styled from "styled-components";

export default function Footer() {
    return (
        <ContainerFrame>
            <div style={{opacity: 0.7}}>
                <Text marginRight={mobile(20)}>
                    ABOUT US
                </Text>
                <Text>
                    광고문의
                </Text>
            </div>
        </ContainerFrame>
    )
}

const Text = styled.span`
    display: inline-block;
    margin-right: ${({marginRight}) => marginRight || 0};
    font-size: ${mobile(23)};
    color: ${pointColor.white};
    @media ${breakPoints.web} {
        font-size: ${desktop(23)};
    }
`;

const ContainerFrame = styled.div`
    margin-top: ${mobile(80)};
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${mobile(110)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    @media ${breakPoints.web} {
        margin-top: ${desktop(30)};
        height: ${desktop(100)};
        padding: 30px;
    }
`;
