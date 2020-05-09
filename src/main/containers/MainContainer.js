import {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image, breakPoints} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";
import {withRouter} from "next/router";
import Footer from "common/components/footer/Footer";
import {PREFIX} from "client/constants";

class MainContainer extends Component {
    render() {
        const {router} = this.props;
        return (
            <ContainerFrame>
                <Header/>
                <ContentListFrame>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <ItemFrame
                                key={index.toString()}
                                onClick={() => router.push("/bingo")}
                            >
                                <ContentCard/>
                            </ItemFrame>
                        ))
                    }
                </ContentListFrame>
                <Footer/>
            </ContainerFrame>
        );
    }
}

export default withRouter(connect()(MainContainer));

const ContainerFrame = styled.div`
    background: ${pointColor.gray0};
    min-height: 100vh;
`;

const ItemFrame = styled.div`
    margin-top: ${mobile(50)};
    @media ${breakPoints.web} {
        margin-top: 3rem;
    }
`;

const ContentListFrame = styled.div`
    padding: 0 ${mobile(50)};
    
    @media ${breakPoints.web} {
        padding: 0 80px;
    }
`;
