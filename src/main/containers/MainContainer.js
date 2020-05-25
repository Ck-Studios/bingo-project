import {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {PREFIX} from "client/constants";
import loadDB from "client/firebase/firebase";
import {loadBingos} from "modules/bingo";

class MainContainer extends Component {
    componentDidMount() {
        this.props.loadBingos();
    }

    render() {
        const {router, games} = this.props;
        console.log("main:: ", games);
        return games ?
            (
                <ContainerFrame>
                    <Header/>
                    <ContentListFrame>
                        {
                            games.map((game, index) => (
                                <ItemFrame
                                    key={index.toString()}
                                    onClick={() => router.push({
                                        pathname: "/bingo",
                                        query: {
                                            id: game._id,
                                        }
                                    })}
                                >
                                    <ContentCard
                                        game={game}
                                    />
                                </ItemFrame>
                            ))
                        }
                    </ContentListFrame>
                    <Footer/>
                </ContainerFrame>
            )
            :
            null
    }
}

const mapStateToProps = state => ({
    games: state.bingo.games,
});

const mapDispatchToProps = {
    loadBingos,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainContainer));

const ContainerFrame = styled.div`
    background: ${pointColor.gray0};
    min-height: 100vh;
`;

const ItemFrame = styled.div`
    margin-top: ${mobile(80)};
    @media ${breakPoints.web} {
        margin-top: 3rem;
    }
`;

const ContentListFrame = styled.div`
    padding: 0 ${mobile(36)};
    @media ${breakPoints.web} {
        padding: 0 80px;
    }
`;
