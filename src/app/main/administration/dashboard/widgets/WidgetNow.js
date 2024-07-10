import React, { useEffect, useRef, useState } from "react";
import { Typography, Card } from "@material-ui/core";
import moment from "moment";
import "moment/locale/fr";

function WidgetNow() {
  const [time, setTime] = useState(moment());
  const intervalRef = useRef();

  useEffect(() => {
    intervalRef.current = setInterval(update, 1000);
    return () => {
      clearInterval(intervalRef.current);
    };
  });

  function update() {
    setTime(moment());
  }

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="text-center px-24 py-32">
        <Typography className="text-16">
          {time.format("dddd, HH:mm:ss")}
        </Typography>
        <Typography className="text-24 leading-tight" color="textSecondary">
          {time.format("MMMM")}
        </Typography>
        <Typography className="text-72 leading-tight" color="textSecondary">
          {time.format("D")}
        </Typography>
        <Typography className="text-24 leading-tight" color="textSecondary">
          {time.format("Y")}
        </Typography>
      </div>
    </Card>
  );
}

export default React.memo(WidgetNow);
