import { Outlet } from "react-router-dom";
import "./styles/index.css";
import "./styles/App.css";

import { useDispatch, useSelector } from "react-redux";
import InfoPopup from "./components/items/InfoPopup";
import { showInfoPopup } from "./redux/actions";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  const infoPopupData = useSelector((state) => state.infoPopupData);
  useEffect(() => {
    let infoPopup = document.querySelector(".info-popup");
    let timerId; // Declare timerId variable outside of the setTimeout function
    let timerId1; // Declare timerId variable outside of the setTimeout function

    if (infoPopupData && infoPopup) {
      // infoPopup.style.left = `calc( 50% - ${infoPopup.clientWidth / 2}px)`;
      setTimeout(() => {
        infoPopup.style.top = "32px";
      }, 100);

      // Cancel the existing timer if it exists
      clearTimeout(timerId);
      clearTimeout(timerId1);

      // Start a new timer
      timerId = setTimeout(() => {
        infoPopup.style.top = "-100px";
        timerId1 = setTimeout(() => {
          dispatch(showInfoPopup(false));
          infoPopupData.onFinish();
        }, 500);
      }, infoPopupData.time);
    }

    // Cleanup function to cancel the timer when the component unmounts or when infoPopupData changes
    return () => {
      try {
        infoPopupData.onFinish();
      } catch {
        console.log("error");
      }
      clearTimeout(timerId1);
      clearTimeout(timerId);
    };
  }, [infoPopupData, dispatch]);
  return (
    <div>
      <nav></nav>
      <Outlet />
      {infoPopupData && (
        <InfoPopup
          text={infoPopupData.text}
          type={infoPopupData.type}
          iconName={infoPopupData.iconName}
          // Make icon2 optional
          onClose={() => {
            document.querySelector(".info-popup").style.top = "-100px";
            setTimeout(() => {
              dispatch(showInfoPopup(false));
            }, 500);
          }}
        />
      )}
    </div>
  );
}

export default App;
