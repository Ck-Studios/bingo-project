import styled from "styled-components";
import {mobile, pointColor} from "../../theme/theme";
import {SNS_LIST} from "../../scheme/common";

export default function Share(props) {
    return (
        <Container>
            <Title>빙고를 친구에게 공유하세요!</Title>
            <RowFrame>
                {
                    SNS_LIST.map((sns, index) => (
                        <SNSFrame
                            key={index.toString()}
                        >
                            <SNSIconFrame
                                background={sns.background}
                            />
                            <SNSTitle>
                                {sns.sns}
                            </SNSTitle>
                        </SNSFrame>
                    ))
                }
            </RowFrame>
        </Container>
    )
}

const SNSTitle = styled.p`
    font-size: ${mobile(20)};c
    color: ${pointColor.gray3};
`;

const Title = styled.p`
    font-size: ${mobile(25)};
    font-weight: 700;
    color: ${pointColor.mainPurple};
`;

const RowFrame = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: ${mobile(30)};
`;

const SNSFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const SNSIconFrame = styled.div`
    width: ${mobile(100)};
    height: ${mobile(100)};
    border-radius: 50%;
    background: ${({background}) => background || "transparent"};
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: ${mobile(280)};
    padding: ${mobile(50)} ${mobile(20)} 0 ${mobile(20)};
    
`;

