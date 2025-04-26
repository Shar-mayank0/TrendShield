import { all } from "axios";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";


interface RawChartData {
    message: string;
    data: {
        prices: number[];
        dates: string[];
        anomalies: boolean[];
        clusters: number[];
    };
}

function ChartsDataTransformer(rawData: RawChartData) {
    const { prices, dates, anomalies, clusters } = rawData.data;
    const transformedData = prices.map((price, index) => ({
        date: dates[index],
        price,
        anomaly: anomalies[index] || false,
        cluster: clusters[index] || 0,
    }));
    return transformedData;
}

const mockRawData: RawChartData = {
    message: "ML analysis done",
    data: {
    prices: [
        1000, 1025, 1010, 1030, 980, 950, 970, 990, 1015, 1050,
        1040, 1060, 1030, 1005, 1015, 1020, 980, 975, 995, 1000,
    ],
    dates: [
        "01 Jan 2024", "02 Jan 2024", "03 Jan 2024", "04 Jan 2024", "05 Jan 2024",
        "06 Jan 2024", "07 Jan 2024", "08 Jan 2024", "09 Jan 2024", "10 Jan 2024",
        "11 Jan 2024", "12 Jan 2024", "13 Jan 2024", "14 Jan 2024", "15 Jan 2024",
        "16 Jan 2024", "17 Jan 2024", "18 Jan 2024", "19 Jan 2024", "20 Jan 2024",
    ],
    anomalies: [
        false, false, false, true, false,
        false, false, true, false, false,
        false, false, true, false, false,
        false, false, true, false, false,
    ],
    clusters: [
        0, 1, 2, 3, 4,
        0, 1, 2, 3, 4,
        0, 1, 2, 3, 4,
        0, 1, 2, 3, 4,
        ],
    },
};



export default function ChartsComponent() {
    const data = ChartsDataTransformer(mockRawData);
    const AlltimeAllData = (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart width={800} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <Tooltip />

        {/* Main Line for all data */}
        <Line type="monotone" dataKey="price" stroke="#8884d8" />

        {/* Anomalies as scatter points */}
        <Scatter
        data={data.filter(d => d.anomaly)}
        dataKey="price"
        fill="red"
        shape="cross"
        />

        {/* Clusters as colored lines */}
        <Line
        type="monotone"
        data={data.filter(d => d.cluster === 0)}
        dataKey="price"
        stroke="#00ff00"
        connectNulls
        />
        <Line
        type="monotone"
        data={data.filter(d => d.cluster === 1)}
        dataKey="price"
        stroke="#90EE90"
        connectNulls
        />
        <Line
        type="monotone"
        data={data.filter(d => d.cluster === 2)}
        dataKey="price"
        stroke="#ffff00"
        connectNulls
        />
        <Line
        type="monotone"
        data={data.filter(d => d.cluster === 3)}
        dataKey="price"
        stroke="#FFA500"
        connectNulls
        />
        <Line
        type="monotone"
        data={data.filter(d => d.cluster === 4)}
        dataKey="price"
        stroke="#ff0000"
        connectNulls
        />
    </LineChart>
</ResponsiveContainer>

    )
    return (
        <div style={{ width: '100%', height: '400px' }}>
            {AlltimeAllData}
        </div>
    );
}