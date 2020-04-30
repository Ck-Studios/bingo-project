import styled from "styled-components";
import {pointColor, Layout, mobile, Image} from "common/theme/theme";

export default function ContentCard(props) {
    return (
        <ContainerFrame>
            <ImageFrame>
                <Image
                    cover
                    src="/static/images/dummy/sample-image.png"
                />
            </ImageFrame>
            <ContentFrame>
                <Title>
                    돼지 빙고: 나의 돼지력은 얼마일까?
                </Title>
                <ButtonFrame>
                    <StartButton>
                        <ButtonText>
                            시작하기
                        </ButtonText>
                    </StartButton>
                    <ShareButton>
                        <ButtonText color={pointColor.purpleDark}>
                            공유하기
                        </ButtonText>
                    </ShareButton>
                </ButtonFrame>
            </ContentFrame>
        </ContainerFrame>
    )
}

const ButtonText = styled.p`
    font-size: ${mobile(30)};
    font-weight: 500;
    color: ${({color}) => color || pointColor.white};
`;

const StartButton = styled.div`
    width: 55%;
    height: ${mobile(70)};
    background: ${pointColor.purpleDark};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.23);
`;

const ShareButton = styled(StartButton)`
    width: 40%;
    background: ${pointColor.white};
    
`;

const ButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${mobile(30)};
    
`;

const Title = styled.p`
    font-size: ${mobile(35)};
    font-weight: bold;
    color: ${pointColor.gray5};
`;

const ContentFrame = styled.div`
    height: ${mobile(220)};
    background: ${pointColor.white};
    padding: ${mobile(30)} ${mobile(25)};
`;

const ImageFrame = styled.div`
    width: 100%;
    height: ${mobile(720)};
    background: pink;
`;

const ContainerFrame = styled.div`
    width: 100%;
    height: ${mobile(940)};
    overflow: hidden;
    box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.23);
`;
