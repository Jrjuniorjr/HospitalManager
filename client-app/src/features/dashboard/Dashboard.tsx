import React, { useContext } from "react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Bar, Line } from "react-chartjs-2";
import { Button } from "semantic-ui-react";

export const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);

  let covidData: any = {
    labels: [],
    datasets: [
      {
        label: "Casos por Estado",
        backgroundColor: "rgba(99,255,132,0.2)",
        borderColor: "rgba(99,255,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(99,255,132,0.4)",
        hoverBorderColor: "rgba(99,255,132,1)",
        data: [],
      },
      {
        label: "Mortes por Estado",

        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,0.4)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: [],
      },
      {
        label: "Suspeitos por Estado",
        backgroundColor: "rgba(132,99,255,0.2)",
        borderColor: "rgba(132,99,255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(132,99,255,0.4)",
        hoverBorderColor: "rgba(132,99,255,1)",
        data: [],
      },
    ],
  };

  const handler = () => {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
      method: "GET",
    })
      .then((response) =>
        console.log(
          response.json().then((resp) => {
            let arr: any[] = resp.data;
            arr.forEach((item) => {
              console.log(item);
              covidData.labels.push(item.state);

              covidData.datasets[0].data.push(item.cases);
              covidData.datasets[1].data.push(item.deaths);
              covidData.datasets[2].data.push(item.suspects);
            });
          })
        )
      )
      .catch((err) => console.error(err));
  };

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }
  handler();
  return (
    <div>
      <h3>Gráficos do Covid-19</h3>
      <Line data={covidData} />
    </div>
  );
};
