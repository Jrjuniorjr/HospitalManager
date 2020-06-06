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
    fetch("https://covid19-brazil-api.now.sh/api/report/v1/pernambuco", {
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

// The child doesn't trigger fetching anymore
const Charts = ({ data, covidBrasil }: any) => {
  return (
    <>
      <Line redraw={true} data={data} />
      <Bar width={400} height={100} redraw={true} data={data} />
      <Doughnut width={400} height={100} redraw={true} data={data} />
    </>
  );
};

/* const fetch = () => {
  fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
    method: "GET",
  })
    .then((response) =>
      response.json().then((resp) => {
        let arr: any[] = resp.data;
        arr.forEach((item) => {
          setCovidData(item);
        });
      })
    )
    .catch((err) => console.error(err));
}; */
/* 
  covidData: any = {'
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

  let hositalEntrance: any = {
    labels: [],
    datasets: [
      {
        label: "Quantidade de pessoas que deram entrada.",
        backgroundColor: "rgba(99,255,132,0.2)",
        borderColor: "rgba(99,255,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(99,255,132,0.4)",
        hoverBorderColor: "rgba(99,255,132,1)",
        data: [],
      },
    ],
  };

  const data = {
    labels: ["Red", "Green", "Yellow"],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  let covidBrasil: any = {
    labels: ["Casos", "Confirmados", "Mortos", "Recuperados"],
    datasets: [
      {
        data: [],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#00FE56"],
      },
    ],
  };

  setCovidData = (item: any) => {
    console.log(item);
    covidData.labels.push(item.state);

    covidData.datasets[0].data.push(item.cases);
    covidData.datasets[1].data.push(item.deaths);
    covidData.datasets[2].data.push(item.suspects);
  };
  const setCovidBrasil = (item: any) => {
    console.log(item.data.cases);
    covidData.datasets[0].data = new Array<number>();
    covidData.datasets[0].data.push(item.data.cases);
    ovidData.datasets[0].data.push(item.data.confirmed);
    covidData.datasets[0].data.push(item.data.deaths);
    covidData.datasets[0].data.push(item.data.recovered);
    console.log(covidBrasil.datasets[0].data[0]);
  };
 */
