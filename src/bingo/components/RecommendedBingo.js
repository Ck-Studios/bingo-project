import {useContext, useMemo} from "react";
import styled from "styled-components";
import ContentCard from "main/components/card/ContentCard";
import {mobile, pointColor, Image, breakPoints} from "common/theme/theme";
import {useRouter} from "next/router";
import AnimationFrame from "common/animation/AnimationFrame";
import {SLIDE_UP} from "common/animation/AnimationVariants";
import {GAMES} from "mock/data";
import {useQuery} from "@apollo/react-hooks";
import {LOAD_BINGO} from "modules/scheme";
import {motion} from "framer-motion";
import IntersectionObserver, {IntersectionContext} from "common/components/layout/IntersectionObserver";

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
            <IntersectionObserver key={index.toString()}>
              <ItemFrame
                index={index}
                delayOrder={1}
              >
                <ContentCard
                  gameStart={() => router.push({
                    pathname: "/bingo",
                    query: {
                      id: game.node.id
                    }
                  })}
                  game={game.node}
                  type="short"
                />
              </ItemFrame>
            </IntersectionObserver>
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

const ItemLayout = styled(motion.div)`
    margin-top: ${({index}) => index > 0 ? 30 : 20}px;
`;

const ContentListFrame = styled.div`
   
`;

const ContainerFrame = styled.div`
    padding: 30px 18px 0 18px;
    background: ${pointColor.white};
`;


const ItemFrame = ({children, delayOrder, duration = 0.4, easing = [0.42, 0, 0.58, 1]}) => {
  const {inView} = useContext(IntersectionContext);
  const transition = useMemo(
    () => ({
      duration,
      delay: delayOrder / 5,
      ease: easing
    }),
    [duration, delayOrder, easing]
  );

  const variants = {
    hidden: {
      y: 200,
      opacity: 0,
      transition
    },
    show: {
      y: 0,
      opacity: 1,
      transition
    }
  };

  return (
    <ItemLayout
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit="hidden"
      variants={variants}
      whileTap={{scale: 0.95}}
    >
      {children}
    </ItemLayout>
  )
}
