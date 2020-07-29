import styled from "styled-components";
import ContentCard from "main/components/card/ContentCard";
import {mobile, pointColor, Image, breakPoints} from "common/theme/theme";
import {useRouter} from "next/router";
import AnimationFrame from "common/animation/AnimationFrame";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import {GAMES} from "mock/data";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO} from "modules/scheme";

export default function RecommendedBingo(props) {
  const router = useRouter();

  const {loading, error, data} = useQuery(LOAD_BINGO);

  if (loading) return "loading...";
  if (error) return "에러";

  const {allBingos} = data;
  const {edges} = allBingos;

  return (
    <ContainerFrame>
      <Title>
        추천 빙고
      </Title>
      <ContentListFrame>
        {
          edges?.map((game, index) => (
            <AnimationFrame
              key={index.toString()}
              variants={SLIDE_UP}
            >
              <ItemFrame
                index={index}
                onClick={() => router.push({
                  pathname: "/bingo",
                  query: {
                    id: game.node.id
                  }
                })}
              >
                <ContentCard
                  game={game.node}
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
    font-weight: 800;
    
    ${breakPoints.web} {
      font-size: 28px;
    }
`;

const ItemFrame = styled.div`
    margin-top: ${({index}) => index > 0 ? 30 : 20}px;
`;

const ContentListFrame = styled.div`
   
`;

const ContainerFrame = styled.div`
    padding: 30px 18px 0 18px;
    background: ${pointColor.white};
`;
