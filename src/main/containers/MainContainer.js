import {Component} from "react";
import {connect} from "react-redux";
import styled from "styled-components";
import {pointColor, mobile, Image} from "common/theme/theme";
import ContentCard from "main/components/card/ContentCard";
import Header from "common/components/header/Header";

class MainContainer extends Component {
    render() {
        return (
            <ContainerFrame>
                <Header
                    rightContent={
                        <Image
                            width={mobile(55)}
                            height={mobile(55)}
                            cover
                            src="/static/images/icons/search_icon.png"
                        />
                    }
                />
                <ContentListFrame>
                    {
                        [1, 2, 3, 4, 5].map((item, index) => (
                            <ItemFrame key={index.toString()}>
                                <ContentCard/>
                            </ItemFrame>
                        ))
                    }
                </ContentListFrame>
            </ContainerFrame>
        );
    }
}

export default connect()(MainContainer);

const ContainerFrame = styled.div`
    background: ${pointColor.gray0};
    min-height: 100vh;
`;

const ItemFrame = styled.div`
    margin-top: ${mobile(50)};
    
`;

const ContentListFrame = styled.div`
    padding: 0 ${mobile(50)};
`;
