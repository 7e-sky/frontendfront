import { combineReducers } from "redux";
import widgets from "./widgets.reducer";
import widget1 from "./widget1.reducer";
import widget2 from "./widget2.reducer";
import widget3 from "./widget3.reducer";
import widget4 from "./widget4.reducer";
import widget5 from "./widget5.reducer";
import widget6 from "./widget6.reducer";
import widget7 from "./widget7.reducer";
import widget8 from "./widget8.reducer";
import widget9 from "./widget9.reducer";
import widget10 from "./widget10.reducer";
import widget11 from "./widget11.reducer";
import widget12 from "./widget12.reducer";
import widget13 from "./widget13.reducer";

const reducer = combineReducers({
  widgets,
  widget1,
  widget2,
  widget3,
  widget4,
  widget5,
  widget6,
  widget7,
  widget8,
  widget9,
  widget10,
  widget11,
  widget12,
  widget13,
});

export default reducer;
