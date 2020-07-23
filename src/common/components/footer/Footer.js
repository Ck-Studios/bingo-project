import {mobile, breakPoints, pointColor, desktop} from "common/theme/theme";
import styled from "styled-components";

export default function Footer() {
    return (
        <ContainerFrame>
            <div style={{opacity: 0.7}}>
                <Text marginRight="18px">
                    팀 소개
                </Text>
                <Text>
                    광고문의
                </Text>
            </div>
            <Copyrights>
                © 2020 Synapse Corporation Inc.
            </Copyrights>
        </ContainerFrame>
    )
}

const Copyrights = styled.p`
  font-size: 12px;
  line-height: 1.08;
  color: ${pointColor.white};
  margin-top: 10px;
`;

const Text = styled.span`
    display: inline-block;
    margin-right: ${({marginRight}) => marginRight || 0};
    font-size: 14px;
    color: ${pointColor.white};
`;

const ContainerFrame = styled.div`
    margin-top: 60px;
    height: 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${pointColor.gray11};
   
`;
