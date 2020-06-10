import React, { useContext, useEffect, useState } from "react";
import { history } from "../..";
import { RootStoreContext } from "../../app/stores/rootStore";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { observer } from "mobx-react-lite";

const Dashboard = () => {
  const rootStore = useContext(RootStoreContext);
  const [covidData, setCovidData] = useState({});
  const [covidDataPernambuco, setCovidDataPernambuco] = useState({});
  const [covidDataPlaneta, setCovidDataPlaneta] = useState({});
  const [historicoVaga, setHistoricoVaga] = useState({});

  const chartCovidData = (labels: any, datasets: any[]) => {
    setCovidData({
      labels: labels,
      datasets: datasets,
    });
  };
  const chartCovidDataPernambuco = (labels: any, datasets: any[]) => {
    setCovidDataPernambuco({
      labels: labels,
      datasets: datasets,
    });
  };
  const chartCovidDataPlaneta = (labels: any, datasets: any[]) => {
    setCovidDataPlaneta({
      labels: labels,
      datasets: datasets,
    });
  };
  const chartHistoricoVagas = (labels: any, datasets: any[]) => {
    setHistoricoVaga({
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

  const buildChartCovidPernambuco = (resp: any) => {
    let labels: any[] = [];
    let data: any[] = [];
    let dataSetes: any[] = [];

    labels = ["Casos", "Mortes", "Recusas", "Suspeitos"];

    data.push(resp.cases);
    data.push(resp.deaths);
    data.push(resp.refuses);
    data.push(resp.suspects);

    dataSetes = [
      {
        data: data,
        backgroundColor: ["#36A2EB", "#FF6384", "#63FF84", "#FFCE56"],
        hoverBackgroundColor: ["#36AFEB", "#FF3F84", "#63AF84", "#FFEE56"],
      },
    ];

    chartCovidDataPernambuco(labels, dataSetes);
  };

  const fetchPernambucoData = () => {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/pe", {
      method: "GET",
    })
      .then((response) =>
        response.json().then((resp) => {
          buildChartCovidPernambuco(resp);
        })
      )
      .catch((err) => console.error(err));
  };

  const buildChartCovidPlaneta = (resp: any) => {
    let labels: any[] = [];
    let data: any[] = [];
    let dataSetes: any[] = [];
    let arr: any[] = resp.data;
    let set: any;

    arr.forEach((item) => {
      labels.push(item.country);
    });

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

    chartCovidDataPlaneta(labels, dataSetes);
  };

  const fetchPernambucoPlaneta = () => {
    fetch("https://covid19-brazil-api.now.sh/api/report/v1/countries", {
      method: "GET",
    })
      .then((response) =>
        response.json().then((resp) => {
          buildChartCovidPlaneta(resp);
        })
      )
      .catch((err) => console.error(err));
  };
  const formatDate = (data: any): string => {
    return (
      data.split("-")[2] + "-" + data.split("-")[1] + "-" + data.split("-")[0]
    );
  };
  const buildChartHistoricoVagas = (resp: any[]) => {
    let counts: any[] = [];
    let dates: any[] = [];

    resp.forEach((item) => {
      counts.push(item.count);

      dates.push(formatDate(item.data));
    });

    let datasets: any[] = [
      {
        label: "Quantidade de Internados no Hospital",
        backgroundColor: "rgba(99,255,132,0.4)",
        borderColor: "rgba(99,255,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(99,255,132,0.6)",
        hoverBorderColor: "rgba(99,255,132,1)",
        data: counts,
      },
    ];

    chartHistoricoVagas(dates, datasets);
  };

  const fetchHistoricoVagas = () => {
    fetch(
      `https://jrjrjrjrjr.herokuapp.com/historico/${window.localStorage.getItem(
        "id"
      )}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + window.localStorage.getItem("jwt"),
        },
      }
    )
      .then((response) =>
        response.json().then((resp) => {
          buildChartHistoricoVagas(resp);
        })
      )
      .catch((err) => console.error(err));
  };

  const loadData = () => {
    fetchBrasilData();
    fetchPernambucoData();
    fetchPernambucoPlaneta();
    fetchHistoricoVagas();
  };

  useEffect(loadData, []);

  if (!rootStore.commonStore.token) {
    history.push("/notauthorized");
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
        <Bar
          options={{ responsive: true, maintainAspectRatio: true }}
          redraw={true}
          data={historicoVaga}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line options={{ responsive: true }} redraw={true} data={covidData} />
        <br />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Doughnut
          options={{ responsive: true }}
          redraw={true}
          data={covidDataPernambuco}
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Line
          options={{ responsive: true }}
          redraw={true}
          data={covidDataPlaneta}
        />
      </div>
    </div>
  );
};

export default observer(Dashboard);
