import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
} from "@material-ui/core";
import { Line } from "react-chartjs-2";
import { useTheme } from "@material-ui/styles";
import { MONTHS } from "@fuse/Constants";
import * as Actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

function Widget7(props) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const widget7 = useSelector(({ dashboardAdmin }) => dashboardAdmin.widget7);
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
      ? dispatch(Actions.getWidgetJetons(currentRange))
      : dispatch(Actions.getWidgetPack(currentRange));

    return () => {
      dispatch(Actions.cleanUpWidget7());
    };
  }, [dispatch, currentRange, tabValue]);

  function handleChangeTab(event, tabValue) {
    setTabValue(tabValue);
  }

  function getColor(index) {
    switch (index) {
      case 0:
        return "#38a169";
      case 1:
        return "#3182ce";
      case 2:
        return "#d69e2e";

      default:
        return "#38a169";
    }
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
          <Tab className="normal-case" label="Jetons vendus & utilisés" />
          <Tab className="normal-case" label="Packs vendus" />
        </Tabs>

        {widget7.data && (
          <Typography className="text-24 font-300 mt-8">
            {widget7.data.totalVendus && (
              <>
                <span style={{ color: theme.palette.primary.main }}>
                  {`${widget7.data.totalUtilises}`}
                </span>
                &ensp;/&ensp;
                <span style={{ color: theme.palette.secondary.main }}>
                  {`${widget7.data.totalVendus}`}
                </span>
              </>
            )}
            {widget7.data.value && `${widget7.data.value}`}
          </Typography>
        )}
      </div>

      {tabValue === 0 && (
        <div>
          {widget7.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget7.data && (
            <Typography className="relative h-200 sm:h-320 sm:pb-16">
              <Line
                data={{
                  labels: MONTHS,
                  datasets: widget7.data.datasets.map((obj, index) => {
                    const palette =
                      theme.palette[index === 0 ? "secondary" : "primary"];
                    return {
                      ...obj,
                      borderColor: palette.main,
                      pointBackgroundColor: palette.dark,
                      pointHoverBackgroundColor: palette.main,
                      pointBorderColor: palette.contrastText,
                      pointHoverBorderColor: palette.contrastText,
                    };
                  }),
                }}
                options={{
                  spanGaps: false,
                  legend: {
                    display: false,
                  },
                  maintainAspectRatio: false,
                  tooltips: {
                    position: "nearest",
                    mode: "index",
                    intersect: false,
                  },
                  layout: {
                    padding: {
                      left: 24,
                      right: 32,
                    },
                  },
                  elements: {
                    point: {
                      radius: 4,
                      borderWidth: 2,
                      hoverRadius: 4,
                      hoverBorderWidth: 2,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgba(0,0,0,0.54)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          tickMarkLength: 16,
                        },
                        ticks: {
                          stepSize: 1000,
                        },
                      },
                    ],
                  },
                  plugins: {
                    filler: {
                      propagate: false,
                    },
                  },
                }}
              />
            </Typography>
          )}
        </div>
      )}
      {tabValue === 1 && (
        <div>
          {widget7.loading && (
            <div className="flex p-16 justify-center ">
              <CircularProgress />
            </div>
          )}
          {widget7.data && (
            <Typography className="relative h-200 sm:h-320 sm:pb-16">
              <Line
                data={{
                  labels: MONTHS,
                  datasets: widget7.data.datasets.map((obj, index) => {
                    const color = getColor(index);
                    return {
                      ...obj,
                      borderColor: color,
                    };
                  }),
                }}
                options={{
                  spanGaps: false,
                  legend: {
                    display: false,
                  },
                  maintainAspectRatio: false,
                  tooltips: {
                    position: "nearest",
                    mode: "index",
                    intersect: false,
                  },
                  layout: {
                    padding: {
                      left: 24,
                      right: 32,
                    },
                  },
                  elements: {
                    point: {
                      radius: 4,
                      borderWidth: 2,
                      hoverRadius: 4,
                      hoverBorderWidth: 2,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                        ticks: {
                          fontColor: "rgba(0,0,0,0.54)",
                        },
                      },
                    ],
                    yAxes: [
                      {
                        gridLines: {
                          tickMarkLength: 16,
                        },
                        ticks: {
                          stepSize: 1000,
                        },
                      },
                    ],
                  },
                  plugins: {
                    filler: {
                      propagate: false,
                    },
                  },
                }}
              />
            </Typography>
          )}
        </div>
      )}
    </Card>
  );
}

export default React.memo(Widget7);
