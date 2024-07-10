import React, { useEffect } from "react";
import { CircularProgress, Tooltip } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

function Widget11(props) {
  const dispatch = useDispatch();
  const widget11 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget11);
  const { handleChangeTotal } = props;

  useEffect(() => {
    dispatch(Actions.getWidget11());
    return () => {
      dispatch(Actions.cleanUpWidget11());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!widget11.total) {
      return;
    }
    handleChangeTotal(widget11.total);
  }, [widget11.total]);

  return (
    <div>
      {widget11.loading && (
        <div className="flex p-16 justify-center ">
          <CircularProgress />
        </div>
      )}
      {widget11.data && (
        <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
          <table className="simple">
            <thead>
              <tr>
                <th>Société</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {widget11.data.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Tooltip title="Détails du fournisseur">
                      <Link
                        to={"/users/acheteur/show/" + row.id}
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        {row.societe}
                      </Link>
                    </Tooltip>
                  </td>
                  <td className="text-right">
                    {moment(row.created).format("DD/MM/YYYY HH:mm")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default React.memo(Widget11);
