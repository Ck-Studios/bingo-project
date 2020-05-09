import styled from "styled-components";
import {pointColor, Layout, mobile, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import {useSelector} from "react-redux";
import {PREFIX} from "client/constants";

export default function ContentCard(props) {
    const gameObjects = useSelector(state => state.bingo.gameObjects);

    return props.type === "short" ?
        <ShortContainerFrame>
            <ImageFrame type="short">
                <Image
                    cover
                    src={gameObjects.thumbnail}
                />
            </ImageFrame>
            <ContentFrame type="short">
                <Title>
                    {gameObjects.title}
                </Title>
                    <Image
                        className="next-icon"
                        width={mobile(25)}
                        height={mobile(25)}
                        src={`${PREFIX}/static/images/icons/next.svg`}
                    />
            </ContentFrame>
        </ShortContainerFrame>
        :
        <ContainerFrame>
            <ImageFrame>
                <Image
                    cover
                    src={gameObjects.board}
                />
            </ImageFrame>
            <ContentFrame>
                <Title>
                    {gameObjects.title}
                </Title>
                <ButtonFrame>
                    <StartButton>
                        <IconFrame
                            size={mobile(20)}
                            marginRight={mobile(10)}
                        >
                            <Image
                                src={`${PREFIX}/static/images/icons/play.svg`}
                            />
                        </IconFrame>
                        <ButtonText>
                            시작하기
                        </ButtonText>
                    </StartButton>
                    <ShareButton>
                        <IconFrame
                            size={mobile(25)}
                            marginRight={mobile(10)}
                        >
                            <Image
                                src={`${PREFIX}/static/images/icons/share.svg`}
                            />
                        </IconFrame>
                        <ButtonText color={pointColor.purpleDark}>
                            공유하기
                        </ButtonText>
                    </ShareButton>
                </ButtonFrame>
            </ContentFrame>
        </ContainerFrame>

}


const ButtonText = styled.p`
    font-size: ${mobile(30)};
    font-weight: 500;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const StartButton = styled.div`
    width: 55%;
    height: ${mobile(70)};
    background: linear-gradient(170deg, ${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 45%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 7px 1px rgba(0, 0, 0, 0.23);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const ShareButton = styled(StartButton)`
    display: flex;
    width: 40%;
    background: ${pointColor.white};
    
`;

const ButtonFrame = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: ${mobile(30)};
    
    @media ${breakPoints.web} {
        margin-top: 30px;
    }
`;

const Title = styled.p`
    font-size: ${mobile(35)};
    font-weight: bold;
    color: ${pointColor.gray5};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const ContentFrame = styled.div`
    height: ${({type}) => type === "short" ? mobile(100) : mobile(220)};
    background: ${pointColor.white};
    padding: ${({type}) => type === "short" ? 0 : mobile(30)} ${mobile(25)};
    display: ${({type}) => type === "short" ? "flex" : "block"};
    justify-content: ${({type}) => type === "short" ? "space-between" : "flex-start"};
    align-items: ${({type}) => type === "short" ? "center" : "flex-start"}; 
    
    @media ${breakPoints.web} {
        height: ${({type}) => type === "short" ? desktop(100) : desktop(220)};
        padding: ${({type}) => type === "short" ? "0 15px" : "30px 25px"};
    }
`;

const ImageFrame = styled.div`
    width: 100%;
    height: ${({type}) => type === "short" ? mobile(250) : mobile(720)};
    background: pink;
    
    @media ${breakPoints.web} {
        height: ${({type}) => type === "short" ? desktop(250) : "580px"};
    }
`;

const ContainerFrame = styled.div`
    width: 100%;
    height: ${mobile(940)};
    overflow: hidden;
    box-shadow: 0 5px 10px 3px rgba(0, 0, 0, 0.23);
    
    @media ${breakPoints.web} {
        height: 800px;
    }
`;

const ShortContainerFrame = styled(ContainerFrame)`
    height: ${mobile(350)};
    border: ${mobile(1)} solid ${pointColor.white};
    
    @media ${breakPoints.web} {
        height: ${desktop(350)};
        
        .next-icon {
            width: 30px;
            height: 30px;
        }
    }
`;
