import React, { useEffect } from "react";
import { CircularProgress, Tooltip } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

function Widget10(props) {
  const dispatch = useDispatch();
  const widget10 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget10);
  const { handleChangeTotal } = props;

  useEffect(() => {
    dispatch(Actions.getWidget10());
    return () => {
      dispatch(Actions.cleanUpWidget10());
    };
  }, [dispatch]);

  useEffect(() => {
    if (!widget10.total) {
      return;
    }
    handleChangeTotal(widget10.total);
  }, [widget10.total]);

  return (
    <div>
      {widget10.loading && (
        <div className="flex p-16 justify-center ">
          <CircularProgress />
        </div>
      )}
      {widget10.data && (
        <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
          <table className="simple">
            <thead>
              <tr>
                <th>Société</th>
                <th className="text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {widget10.data.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Tooltip title="Détails du fournisseur">
                      <Link
                        to={"/users/fournisseur/show/" + row.id}
                        onClick={(ev) => ev.stopPropagation()}
                      >
                        {row.societe}
                      </Link>
                    </Tooltip>
                  </td>
                  <td className="text-left">
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

export default React.memo(Widget10);
