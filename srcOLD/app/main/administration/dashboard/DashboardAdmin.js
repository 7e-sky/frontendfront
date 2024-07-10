import React, { useState } from "react";
import { FuseAnimate } from "@fuse";
import Widget1 from "./widgets/Widget1";
import Widget2 from "./widgets/Widget2";
import Widget3 from "./widgets/Widget3";
import ClientParVille from "./ClientParVille";
import RecentClient from "./RecentClient";
import Widget6 from "./widgets/Widget6";
import Widget7 from "./widgets/Widget7";
import Widget8 from "./widgets/Widget8";
import Widget9 from "./widgets/Widget9";
import WidgetNow from "./widgets/WidgetNow";
import ClientInscrit from "./ClientInscrit";
import withReducer from "app/store/withReducer";
import reducer from "./store/reducers";
import { Typography, Select, Divider } from "@material-ui/core";
import moment from "moment";
import { Helmet } from "react-helmet";

function DashboardAdmin() {
  const [currentRange, setCurrentRange] = useState(moment().format("Y"));
  function handleChangeRange(ev) {
    setCurrentRange(ev.target.value);
  }

  return (
    <div className="w-full">
      <Helmet>
        <title>Dashboard | Les Achats Industriels</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="googlebot" content="noindex" />
      </Helmet>
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row sm:p-8 container">
          <div className="flex flex-1 flex-col min-w-0">
            <div className=" p-16 pb-8 flex flex-row items-center justify-between">
              <div className="flex flex-col">
                <Typography className="text-18 font-300">
                  Tableau de bord
                </Typography>
              </div>
              <Select
                native
                value={currentRange}
                onChange={handleChangeRange}
                inputProps={{
                  name: "currentRange",
                }}
                disableUnderline={true}
              >
                {Object.entries({
                  0: moment().format("Y"),
                  1: moment().subtract(1, "year").format("Y"),
                  2: moment().subtract(2, "year").format("Y"),
                }).map(([key, n]) => {
                  return (
                    <option key={key} value={n}>
                      {n}
                    </option>
                  );
                })}
              </Select>
            </div>

            <div className="flex flex-col sm:flex sm:flex-row pb-8">
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 * Chiffre d'affaires
                 */}
                <Widget3 currentRange={currentRange} />
              </div>
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 * Chiffre d'affaires abonnements
                 */}
                <Widget1 currentRange={currentRange} />
              </div>
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 * Chiffre d'affaires jetons
                 */}
                <Widget2 currentRange={currentRange} />
              </div>
            </div>

            <div className="flex flex-col sm:flex sm:flex-row pb-8">
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 * Pack abonnement & jetons nombre ventes
                 */}
                <Widget8 currentRange={currentRange} />
              </div>
              <div className="widget flex w-full sm:w-2/3 p-16">
                {/**
                 * Jetons vendus & utilisés | Pack vendus
                 */}
                <Widget7 currentRange={currentRange} />
              </div>
            </div>

            <div className="flex flex-col sm:flex sm:flex-row pb-8">
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 * Clients récents 10 Fournisseurs & 10 Acheteurs
                 */}
                <RecentClient />
              </div>
              <div className="widget flex w-full sm:w-2/3 p-16">
                {/**
                 * Jetons vendus & utilisés | Pack vendus
                 */}
                <ClientInscrit currentRange={currentRange} />
              </div>
            </div>

            <Divider />

            <div className="flex flex-col sm:flex sm:flex-row pb-8">
              <div className="widget flex w-full sm:w-1/3 p-16">
                {/**
                 *
                 */}
              </div>
              <div className="widget flex w-full sm:w-2/3 p-16">
                {/**
                 *  Commandes Jetons  | Commandes abonnements
                 */}
                <Widget9 currentRange={currentRange} />
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full md:w-320">
            <div className="mb-8 w-full sm:w-1/2 md:w-full">
              <div className="widget w-full p-16">
                {/**
                 * Date & Time
                 */}
                <WidgetNow />
              </div>
            </div>
            <div className="mb-8 w-full sm:w-1/2 md:w-full">
              <div className="widget w-full p-16">
                {/**
                 * Fournisseurs & Acheteurs par ville
                 */}
                <ClientParVille />
              </div>
            </div>
            <div className="mb-8 w-full sm:w-1/2 md:w-full">
              <div className="widget w-full p-16">
                {/**
                 * TOP 10 Fournisseurs plus consultés
                 */}
                <Widget6 />
              </div>
            </div>
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

export default withReducer("dashboardAdmin", reducer)(DashboardAdmin);
