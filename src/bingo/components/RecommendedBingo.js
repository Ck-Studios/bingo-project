import styled from "styled-components";
import ContentCard from "main/components/card/ContentCard";
import {mobile, pointColor, Image, breakPoints} from "common/theme/theme";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {loadBingos} from "modules/bingo";
import AnimationFrame from "common/animation/AnimationFrame";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import {GAMES} from "mock/data";

export default function RecommendedBingo(props) {
    const router = useRouter();
    // const dispatch = useDispatch();
    // const games = useSelector(state => state.bingo.games);
  const games = null;

    useEffect(() => {
        // if (!games) {
            // dispatch(loadBingos());
        // }
    }, []);

    return (
        <ContainerFrame>
            <Title>
                추천 빙고
            </Title>
            <ContentListFrame>
                {
                  GAMES?.map((game, index) => (
                        <AnimationFrame
                            key={index.toString()}
                            variants={SLIDE_UP}
                        >
                            <ItemFrame
                                index={index}

                                onClick={() => router.push({
                                    pathname: "/bingo",
                                    query: {
                                        id: game.id
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
    font-size: 22px;
    color: ${pointColor.gray7};
    font-weight: 700;
    
`;

const ItemFrame = styled.div`
    margin-top: ${({index}) => index > 0 ? 20 : 30}px;
`;

const ContentListFrame = styled.div`
   
`;

const ContainerFrame = styled.div`
    margin-top: 30px;
    padding: 0 18px;
    
   
`;
