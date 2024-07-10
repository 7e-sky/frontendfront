import React, { useEffect, useState } from "react";
import { Card, CircularProgress, Tabs, Tab } from "@material-ui/core";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function Widget8(props) {
  const dispatch = useDispatch();
  const widget8 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget8);
  const { currentRange } = props;
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (!currentRange) {
      return;
    }
    if (tabValue < 0 || tabValue > 1) {
      return;
    }
    tabValue === 0
      ? dispatch(Actions.getWidgetPackAbonnement(currentRange))
      : dispatch(Actions.getWidgetPackJeton(currentRange));

    return () => {
      dispatch(Actions.cleanUpWidget8());
    };
  }, [dispatch, currentRange, tabValue]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="relative p-24 flex flex-row items-center justify-between">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-ful" }}
        >
          <Tab className="normal-case" label="Pack d'abonnement ventes" />
          <Tab className="normal-case" label="Pack jetons ventes" />
        </Tabs>
      </div>

      {tabValue === 0 && (
        <div>
          {widget8.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget8.data && (
            <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
              <table className="simple">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-right">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {widget8.data.length > 0 ? (
                    widget8.data.map((row, index) => (
                      <tr key={index}>
                        <td>{row.name}</td>
                        <td className="text-right">{row.count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        Aucun résultat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
      {tabValue === 1 && (
        <div>
          {widget8.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget8.data && (
            <div className="relative h-200 sm:h-320 sm:pb-16 overflow-scroll">
              <table className="simple">
                <thead>
                  <tr>
                    <th></th>
                    <th className="text-right">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  {widget8.data.length > 0 ? (
                    widget8.data.map((row, index) => (
                      <tr key={index}>
                        <td>Pack de {row.nbrJeton}</td>
                        <td className="text-right">{row.count}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center">
                        Aucun résultat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

export default React.memo(Widget8);
