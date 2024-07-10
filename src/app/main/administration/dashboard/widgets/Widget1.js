import React, { useEffect } from "react";
import { Card, Typography, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/styles";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";
import { MONTHS, LOCAL_CURRENCY } from "@fuse/Constants";

function Widget1(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const widget1 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget1);

  const { currentRange } = props;

  useEffect(() => {
    if (!currentRange) {
      return;
    }
    dispatch(Actions.getWidget1(currentRange));
    return () => {
      dispatch(Actions.cleanUpWidget1());
    };
  }, [dispatch, currentRange]);

  function financial(x) {
    return parseFloat(x).toLocaleString("fr", { minimumFractionDigits: 2 });
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <Typography className="h3" color="textSecondary">
            CA abonnements
          </Typography>
        </div>
        {widget1.loading && (
          <div className="flex p-16 justify-center ">
            <CircularProgress />
          </div>
        )}
        {widget1.data && (
          <Typography className="text-24 font-300 mt-8">
            {financial(widget1.data.value) + " " + LOCAL_CURRENCY}
          </Typography>
        )}
      </div>
      {widget1.data && (
        <div className="h-96 w-100-p">
          <Line
            data={{
              labels: MONTHS,
              datasets: [
                {
                  borderColor: theme.palette.secondary.main,
                  data: widget1.data.dataset,
                  fill: false,
                },
              ],
            }}
            options={{
              spanGaps: false,
              legend: {
                display: false,
              },
              maintainAspectRatio: false,
              elements: {
                point: {
                  radius: 2,
                  borderWidth: 1,
                  hoverRadius: 2,
                  hoverBorderWidth: 1,
                },
                line: {
                  tension: 0,
                },
              },
              layout: {
                padding: {
                  top: 24,
                  left: 16,
                  right: 16,
                  bottom: 16,
                },
              },
              scales: {
                xAxes: [
                  {
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    display: false,
                    ticks: {
                      // min: 100,
                      // max: 500
                    },
                  },
                ],
              },
            }}
          />
        </div>
      )}
    </Card>
  );
}

export default React.memo(Widget1);
