import {useEffect} from "react";
import styled from "styled-components";
import {pointColor} from "common/theme/theme";

export default function Modal(props) {
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
          <CloseIcon
            onClick={() => props.hideModal()}
            src="/static/images/icons/exit.svg"
          />
          {props.children}
        </ModalContentFrame>
      </ModalWrapper>
    </>
  )
}

const CloseIcon = styled.img`
  width: 14px;
  height: 14px;
  top: 18px;
  right: 18px;
  position: absolute;
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
  padding: 30px 23px;
  transform: translateY(-23%);
  background: ${pointColor.white};
  border-radius: 10px;
  outline: 0;
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
