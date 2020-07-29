import {useEffect} from "react";
import styled from "styled-components";
import {breakPoints, pointColor} from "common/theme/theme";

export default function OneButtonModal(props) {
  useEffect(() => {
    document.body.style.cssText = `position: fixed; top: -${window.scrollY}px`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = `position: ""; top: "";`
      window.scrollTo(0, parseInt(scrollY || '0') * -1)
    }
  }, []);

  return (
    <>
      <BackgroundLayer/>
      <ModalWrapper tabIndex="-1">
        <ModalContentFrame tabIndex="0">
          <TextFrame>
            <p>주소가 복사되었습니다.</p>
            <p>원하는 곳에 붙여넣기 해주세요.</p>
          </TextFrame>
          <ConfirmButtonFrame onClick={() => props.hideModal()}>
            <ConfirmText>
              확인
            </ConfirmText>
          </ConfirmButtonFrame>
        </ModalContentFrame>
      </ModalWrapper>
    </>
  )
}

const ConfirmText = styled.p`
  font-size: 18px;
  color: ${pointColor.mainPurple};
`;

const TextFrame = styled.div`
  padding: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  ${breakPoints.web} {
    padding: 30px 0;
  }
`;

const ConfirmButtonFrame = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  border-top: 1px solid ${pointColor.gray12};
  justify-content: center;
  align-items: center;
  ${breakPoints.web} {
    height: 58px;
  }
`;

const BackgroundLayer = styled.div`
  width: 100%;
  position: fixed;
  z-index: 200;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  max-width: 540px;
  margin: 0 auto;

`;

const ModalContentFrame = styled.div`
  position: relative;
  width: 90%;
  top: 23%;
  margin: 0 auto;
  transform: translateY(-23%);
  background: ${pointColor.white};
  border-radius: 10px;
  outline: 0;
  ${breakPoints.web} {
    width: 74%;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  overflow: auto;
  outline: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 300;
  max-width: 540px;
  margin: 0 auto;
  
`;
