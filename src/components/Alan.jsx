import { useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import alanBtn from "@alan-ai/alan-sdk-web";
import { ColorModeContext } from "../utils/ToggleColorMode";

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    alanBtn({
      key: process.env.REACT_APP_ALAN_SDK_KEY,
      onCommand: ({ command, mode, administrations, admin }) => {
        if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } // end outer if

        // switch among pages
        if (command === "changeAdmin") {
          const searchAdmin = administrations.find(
            (ad) => ad.name.toLowerCase() === admin.toLowerCase()
          );

          if (searchAdmin) {
            history.push("/dashboard/" + admin);
          }
        } // end outer if
      }, // end onCommand,
    });
  }, [setMode, history, dispatch]);
};

export default useAlan;
