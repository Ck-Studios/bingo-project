import {Component} from "react";
import {connect} from "react-redux";
import BingoBoard from "common/utils/BingoBoard";
import styled from "styled-components";
import {Image, mobile} from "common/theme/theme";
import {pointColor} from "common/theme/theme";
import Game from "bingo/components/Game";
import Header from "common/components/header/Header";
import RecommendedBingo from "bingo/components/RecommendedBingo";
import Footer from "common/components/footer/Footer";
import {PREFIX} from "client/constants";

class BingoContainer extends Component {
    render() {
        return (
            <ContainerFrame>
                <Header/>
                <Game
                    boardSize={580}
                />
                <RecommendedBingo/>
                <Footer/>
            </ContainerFrame>
        )
    }
}

export default connect()(BingoContainer);

const ContainerFrame = styled.div`
    width: 100%;
    min-height: 100vh;
    background: ${pointColor.gray0};
`;
