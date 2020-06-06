import React, { useContext, useEffect, Suspense, useState } from "react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { Button } from "semantic-ui-react";

export const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const [covidData, setCovidData] = useState({});

  const chartCovidData = (labels: any, datasets: any[]) => {
    setCovidData({
      labels: labels,
      datasets: datasets,
    });
  };

  const createDataSet = (
    data: any,
    labelTitle: string,
    bgColor: string,
    bgHoverColor: string,
    borderColor: string,
    borderHoverColor: string,
    border: number
  ): any => {
    let dataSet = {
      label: labelTitle,
      backgroundColor: bgColor,
      borderColor: borderColor,
      borderWidth: border,
      hoverBackgroundColor: bgHoverColor,
      hoverBorderColor: borderHoverColor,
      data: data,
    };
    return dataSet;
  };

  const buildChartCovidBrasil = (resp: any) => {
    console.log(resp);
    let labels: any[] = [];
    let data: any[] = [];
    let dataSetes: any[] = [];
    let arr: any[] = resp.data;
    let set: any;

    arr.forEach((item) => {
      labels.push(item.state);
      data.push(item.cases);
    });
    set = createDataSet(
      data,
      "Casos",
      "rgba(99,132,255,0.2)",
      "rgba(99,132,255,0.4)",
      "rgba(99,132,255,1)",
      "rgba(99,132,255,1)",
      1
    );
    data = [];
    dataSetes.push(set);

    arr.forEach((item) => {
      data.push(item.suspects);
    });
    set = createDataSet(
      data,
      "Suspeitos",
      "rgba(99,255,132,0.2)",
      "rgba(99,255,132,0.4)",
      "rgba(99,255,132,1)",
      "rgba(99,255,132,1)",
      1
    );
    data = [];
    dataSetes.push(set);

    arr.forEach((item) => {
      data.push(item.deaths);
    });
    set = createDataSet(
      data,
      "Mortos ",
      "rgba(255,99,132,0.2)",
      "rgba(255,99,132,0.4)",
      "rgba(255,99,132,1)",
      "rgba(255,99,132,1)",
      1
    );
    data = [];
    dataSetes.push(set);
    console.log(dataSetes);

    chartCovidData(labels, dataSetes);
  };

  const fetchBrasilData = () => {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
      method: "GET",
    })
      .then((response) =>
        response.json().then((resp) => {
          buildChartCovidBrasil(resp);
        })
      )
      .catch((err) => console.error(err));
  };

  const fetchPernambucoData = () => {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/pe", {
      method: "GET",
    })
      .then((response) =>
        response.json().then((resp) => {
          buildChartCovidBrasil(resp);
        })
      )
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchBrasilData();
  }, []);

  if (!rootStore.commonStore.token) {
    history.push("/notfound");
  }

  return (
    <div>
      <h3>Gráficos do Covid-19</h3>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line options={{ responsive: true }} redraw={true} data={covidData} />
      </div>
    </div>
  );
};
