import styled from "styled-components";
import ContentCard from "main/components/card/ContentCard";
import {mobile, pointColor, Image, breakPoints} from "common/theme/theme";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {loadBingos} from "modules/bingo";
import AnimationFrame from "common/animation/AnimationFrame";
import {SLIDE_UP} from "common/animation/AnimationVariants";

export default function RecommendedBingo(props) {
    const router = useRouter();
    const dispatch = useDispatch();
    const games = useSelector(state => state.bingo.games);

    useEffect(() => {
        if (!games) {
            dispatch(loadBingos());
        }
    }, []);

    return (
        <ContainerFrame>
            <Title>
                추천 빙고
            </Title>
            <ContentListFrame>
                {
                    games?.map((game, index) => (
                        <AnimationFrame
                            key={index.toString()}
                            variants={SLIDE_UP}
                        >
                            <ItemFrame
                                index={index}

                                onClick={() => router.push({
                                    pathname: "/bingo",
                                    query: {
                                        id: game._id
                                    }
                                })}
                            >
                                <ContentCard
                                    game={game}
                                    type="short"
                                />
                            </ItemFrame>
                        </AnimationFrame>
                    ))
                }
            </ContentListFrame>
        </ContainerFrame>
    )
}

const Title = styled.p`
    font-size: ${mobile(36)};
    color: ${pointColor.gray7};
    font-weight: 700;
    @media ${breakPoints.web} {
        font-size: 2.5rem;
    }
`;

const ItemFrame = styled.div`
    margin-top: ${({index}) => index > 0 ? mobile(60) : mobile(30)};
    @media ${breakPoints.web} {
        margin-top: 3rem;
    }
`;

const ContentListFrame = styled.div`
   
`;

const ContainerFrame = styled.div`
    margin-top: ${mobile(50)};
    padding: 0 ${mobile(50)};
    
    @media ${breakPoints.web} {
        padding: 0 80px;
    }
`;
