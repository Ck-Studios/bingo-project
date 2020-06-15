import styled from "styled-components";
import {pointColor, Layout, mobile, Image, breakPoints, IconFrame, desktop} from "common/theme/theme";
import {useSelector} from "react-redux";
import {PREFIX} from "client/constants";

export default function ContentCard(props) {
    const {game} = props;
    console.log("hihi, ", game);

    return props.type === "short" ?
        <ShortContainerFrame>
            <ImageFrame type="short">
                <Image
                    cover
                    src={game.thumbnail}
                />
            </ImageFrame>
            <ContentFrame type="short">
                <Title style={{fontSize: mobile(36)}}>
                    {game.title}
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
                    contain
                    src={game.thumbnail}
                />
            </ImageFrame>
            <ContentFrame>
                <Title>
                    {game.title}
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
    font-size: ${mobile(28)};
    font-weight: bold;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const StartButton = styled.div`
    width: ${mobile(350)};
    height: ${mobile(80)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 90%);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: ${mobile(50)};
    box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.3);
    
    @media ${breakPoints.web} {
        height: 70px;
        border-radius: 50px;
    }
`;

const ShareButton = styled(StartButton)`
    display: flex;
    width: ${mobile(210)};
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
    font-size: ${mobile(38)};
    font-weight: bold;
    color: ${pointColor.gray7};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const ContentFrame = styled.div`
    height: ${({type}) => type === "short" ? mobile(100) : mobile(240)};
    background: ${pointColor.white};
    padding: ${({type}) => type === "short" ? 0 : mobile(30)} ${mobile(30)};
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
    height: ${mobile(500)};
    
    @media ${breakPoints.web} {
        height: ${({type}) => type === "short" ? desktop(250) : "580px"};
    }
`;

const ContainerFrame = styled.div`
    width: 100%;
    height: ${mobile(740)};
    overflow: hidden;
    box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.23);
    
    @media ${breakPoints.web} {
        height: 800px;
    }
`;

const ShortContainerFrame = styled(ContainerFrame)`
    height: ${mobile(600)};
    border: ${mobile(1)} solid ${pointColor.white};
    
    @media ${breakPoints.web} {
        height: ${desktop(350)};
        
        .next-icon {
            width: 30px;
            height: 30px;
        }
    }
`;
