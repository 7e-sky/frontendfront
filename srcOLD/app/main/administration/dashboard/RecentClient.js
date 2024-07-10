import React, { useState } from "react";
import { Card, Tab, Tabs, Typography } from "@material-ui/core";
import Widget10 from "./widgets/Widget10";
import Widget11 from "./widgets/Widget11";

function RecentClient(props) {
  const [tabValue, setTabValue] = useState(0);
  const [totalFournisseurs, setTotalFournisseurs] = useState(0);
  const [totalAcheteurs, setTotalAcheteurs] = useState(0);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function onChangeTotalFournisseur(total) {
    setTotalFournisseurs(total);
  }

  function onChangeTotalAcheteur(total) {
    setTotalAcheteurs(total);
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pr-4 flex flex-row items-center justify-between">
        <Typography className="h3" color="textSecondary">
          Clients récents inscrits
        </Typography>
      </div>
      <div className="pl-16 flex flex-row ">
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="secondary"
          textColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: "w-ful" }}
        >
          <Tab
            className="normal-case"
            label={`Fournisseurs ${totalFournisseurs ? totalFournisseurs : ""}`}
          />
          <Tab
            className="normal-case"
            label={`Acheteurs ${totalAcheteurs ? totalAcheteurs : ""}`}
          />
        </Tabs>
      </div>

      {/** FOURNISSEURS */}
      {tabValue === 0 && (
        <Widget10 handleChangeTotal={onChangeTotalFournisseur} />
      )}

      {/** ACHETEURS */}
      {tabValue === 1 && <Widget11 handleChangeTotal={onChangeTotalAcheteur} />}
    </Card>
  );
}

export default React.memo(RecentClient);
