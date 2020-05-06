import {useState, useEffect} from "react";
import {mobile, pointColor, Image, breakPoints, IconFrame} from "common/theme/theme";
import styled from "styled-components";
import BingoBoard from "common/utils/BingoBoard";
import {useSelector} from "react-redux";
import {Modal} from "react-responsive-modal";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {PREFIX} from "client/constants";

export default function Game(props) {
    const [showResultModal, toggleResultModal] = useState(false);
    const gameObjects = useSelector(state => state.bingo.gameObjects);
    const markedCounts = useSelector(state => state.bingo.counts);

    const getResult = () => {
        if(markedCounts <= 5) {
            return (
                <Image
                    src={gameObjects.result1}
                />
            )
        } else if (markedCounts >= 6 && markedCounts <= 14) {
            return (
                <Image
                    src={gameObjects.result2}
                />
            )
        } else if (markedCounts >= 15 && markedCounts <= 21) {
            return (
                <Image
                    src={gameObjects.result3}
                />
            )
        } else if (markedCounts >= 22 && markedCounts <= 25) {
            return (
                <Image
                    src={gameObjects.result4}
                />
            )
        }
    };

    return (
        <ContainerFrame>
            <Modal
                open={showResultModal}
                onClose={() => toggleResultModal(false)}
                center
                showCloseIcon={false}
            >
                {getResult()}
            </Modal>
            <Image
                src={gameObjects.board}
            />
            <BoardFrame>
                <BingoBoard
                    boardSize={props.boardSize}
                />
            </BoardFrame>
            <ButtonFrame>
                <Message>
                    체크하려면 해당하는 칸을 클릭하세요.
                </Message>
                <ResultButton onClick={() => toggleResultModal(true)}>
                    <IconFrame
                        size={mobile(20)}
                        marginRight={mobile(10)}
                    >
                        <Image
                            src={`${PREFIX}/static/images/icons/play.svg`}
                        />
                   </IconFrame>
                    <ButtonText>
                        결과보기
                    </ButtonText>
                </ResultButton>
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
        </ContainerFrame>
    )
}

const Message = styled.p`
    margin-top: ${mobile(20)};
    font-size: ${mobile(20)};
    color: ${pointColor.gray7};
`;

const ButtonText = styled.p`
    font-size: ${mobile(30)};
    font-weight: 500;
    color: ${({color}) => color || pointColor.white};
    
    @media ${breakPoints.web} {
        font-size: 2rem;
    }
`;

const ResultButton = styled.div`
    margin-top: ${mobile(20)};
    width: 70%;
    height: ${mobile(70)};
    background: linear-gradient(${pointColor.gradientPurple} 0%, ${pointColor.mainPurple} 50%);
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

const ShareButton = styled(ResultButton)`
    background: ${pointColor.white};
`;

const ButtonFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    background: ${pointColor.white};
    padding-bottom: ${mobile(50)};
    border-bottom: ${mobile(1)} solid ${pointColor.gray1};
`;

const BoardFrame = styled.div`
    position: absolute;
    top: ${mobile(210)};
    left: 50%;
    transform: translateX(-50%);
    z-index: 0;
    
`;

const ContainerFrame = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;
