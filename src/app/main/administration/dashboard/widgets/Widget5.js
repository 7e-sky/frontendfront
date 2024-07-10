import React, { useEffect } from "react";
import { CircularProgress } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function Widget5(props) {
  const dispatch = useDispatch();
  const widget5 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget5);

  useEffect(() => {
    dispatch(Actions.getWidget5());
    return () => {
      dispatch(Actions.cleanUpWidget5());
    };
  }, [dispatch]);

  return (
    <div>
      {widget5.loading && (
        <div className="flex p-16 justify-center ">
          <CircularProgress />
        </div>
      )}

      {widget5.data && (
        <div className="h-200 sm:h-320 sm:pb-16 overflow-scroll">
          <table className="simple">
            <thead>
              <tr>
                <th></th>
                <th className="text-right">Nombre</th>
              </tr>
            </thead>
            <tbody>
              {widget5.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
                  <td className="text-right">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default React.memo(Widget5);
