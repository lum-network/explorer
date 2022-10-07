import { ChartDataModel } from "models";

// Reduce chart data to monthly values
export const reduceChartToMonthly = (data: ChartDataModel[]): ChartDataModel[] => {
    const result: ChartDataModel[] = [];

    data.forEach((item) => {
        const date = new Date(item.key);
        const month = date.getMonth();
        const year = date.getFullYear();
        const key = `${month + 1}/${year}`;

        if (result.length && result[result.length - 1].key === key) {
            result[result.length - 1].value = (parseFloat(result[result.length - 1].value) + parseFloat(item.value)).toString();
        } else {
            result.push({
                key,
                value: item.value
            });
        }
    });

    return result;
}

// Reduce chart data to daily values
export const reduceChartToDaily = (data: ChartDataModel[]): ChartDataModel[] => {
    const result: ChartDataModel[] = [];

    data.forEach((item) => {
        const date = new Date(item.key);
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const key = `${day}/${month + 1}/${year}`;

        if (result.length && result[result.length - 1].key === key) {
            result[result.length - 1].value = (parseFloat(result[result.length - 1].value) + parseFloat(item.value)).toString();
        } else {
            result.push({
                key,
                value: item.value
            });
        }
    });

    return result;
}
