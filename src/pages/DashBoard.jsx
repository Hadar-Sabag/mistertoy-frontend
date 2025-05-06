import { LineChart } from "../cmps/LineChart.jsx";
import { MyChart } from "../cmps/MyChart.jsx";

export function DashBoard() {
    return (
        <section>
            <MyChart />
            <LineChart />
        </section>
    )
}