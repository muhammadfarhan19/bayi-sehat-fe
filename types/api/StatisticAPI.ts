export type GetStatisticReq = {
  id: number;
  date: string;
};

export type StatisticInfo = {
  statistic_id: number;
  title: string;
  description: string;
  type: number;
};

export interface StatisticTableData {
  table: {
    header: Array<string>;
    rows: Array<Array<string>>;
  };
}

export type ChartData = {
  x_axis: string;
  y_axis: string;
  info?: Record<string, string>;
  golongan_id?: string;
};

export interface StatisticMultipleBarChart {
  chart_title: string;
  chart_data: Array<ChartData>;
  unit_kerja_id?: number;
}

export interface StatisticMultipleBarChartData {
  multiple_bar_charts: Array<StatisticMultipleBarChart>;
}

export interface StatisticData {
  statistic: StatisticInfo;
  data: {
    data_id: number;
    timestamp: string;
    data: StatisticTableData | StatisticMultipleBarChartData;
  };
}

export interface GetStatisticDataRes {
  status: string;
  data: StatisticData;
}
