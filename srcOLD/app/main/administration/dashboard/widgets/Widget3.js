import React, { useEffect, useState } from "react";
import { Card, Typography, CircularProgress } from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/styles";
import { useSelector } from "react-redux";
import { MONTHS, LOCAL_CURRENCY } from "@fuse/Constants";

function Widget3(props) {
  const theme = useTheme();
  const widget1 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget1);
  const widget2 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget2);
  const [total, setTotal] = useState(0);
  const [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    if (!widget1.data || !widget2.data) {
      return;
    }

    setTotal(widget1.data.value + widget2.data.value);
    setDataSet(
      widget1.data.dataset.map(function (num, idx) {
        return num + widget2.data.dataset[idx];
      })
    );
  }, [widget1, widget2]);

  function financial(x) {
    return parseFloat(x).toLocaleString("fr", { minimumFractionDigits: 2 });
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="p-16 pb-0 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <Typography className="h3" color="textSecondary">
            Chiffre d'affaires
          </Typography>
        </div>
        {(widget1.loading || widget2.loading) && (
          <div className="flex p-16 justify-center ">
            <CircularProgress />
          </div>
        )}
        {widget1.data && widget2.data && (
          <Typography className="text-24 font-300 mt-8">
            {financial(total) + " " + LOCAL_CURRENCY}
          </Typography>
        )}
      </div>
      {widget2.data && (
        <div className="h-96 w-100-p">
          <Line
            data={{
              labels: MONTHS,
              datasets: [
                {
                  borderColor: theme.palette.secondary.main,
                  data: dataSet,
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

export default React.memo(Widget3);
