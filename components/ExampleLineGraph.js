import Head from "next/head";
import React, { useEffect } from "react";

export default function ExampleLineGraph() {
  useEffect(() => {
    const chart = new Chart(document.getElementById("myChart"), {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        datasets: [
          {
            label: "Target Serapan",
            borderColor: "#00ff00",
            data: [0, 8, 16, 24, 32, 40, 48, 56, 64, 74, 85,100],
            fill: false,
            pointBackgroundColor: "#4A5568",
            borderWidth: "3",
            pointBorderWidth: "4",
            pointHoverRadius: "6",
            pointHoverBorderWidth: "8",
            pointHoverBorderColor: "rgb(74,85,104,0.2)",
          },
          {
            label: "Serapan",
            borderColor: "#fff",
            data: [0, 10, 15, 20, 35, 50, 55, 70, 80, 85, 90,100],
            fill: true,
            pointBackgroundColor: "#4A5568",
            borderWidth: "3",
            pointBorderWidth: "4",
            pointHoverRadius: "6",
            pointHoverBorderWidth: "8",
            pointHoverBorderColor: "rgb(0,0,0,0.2)",
          },
        ],
      },
      options: {
        legend: {
          position: false,
        },
        scales: {
          yAxes: [
            {
              gridLines: {
                display: true,
              },
              display: true,
            },
          ],
          xAxes:[
              {
                  gridLines:{
                      display:false,
                  }
              }
          ]
        },
      },
    });
  });
  return (
    <>

      <div className="flex items-center justify-center w-full ">
        <div className="w-full px-5">
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="lg:flex w-full justify-between">
                <h3 className="text-gray-600 dark:text-gray-400 leading-5 text-base md:text-xl font-bold">
                  Performa Keuangan
                </h3>
                <div className="flex items-center justify-between lg:justify-start mt-2 md:mt-4 lg:mt-0">
                  <div className="lg:ml-14">
                    <div className="bg-gray-100 dark:bg-gray-700 ease-in duration-150 hover:bg-gray-200 py-1 px-3 rounded-lg">
                      <select className="text-xs text-gray-600 dark:text-gray-400 outline-none border-0  bg-transparent focus: focus:border-0">
                        <option className="leading-1">SetDitjenDikti</option>
                        <option className="leading-1">DitBelmawa</option>
                        <option className="leading-1">DitKelembagaan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <canvas id="myChart" width="100%" height={50} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
