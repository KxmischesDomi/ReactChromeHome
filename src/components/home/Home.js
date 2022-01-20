import * as React from "react";
import "./home.css"

class Clock extends React.Component {

    render() {

        var d = new Date();
        var s = d.getSeconds();
        var m = d.getMinutes();
        var h = d.getHours();
        if (s < 10) {
            s = "0" + s;
        }
        if (m < 10) {
            m = "0" + m;
        }
        if (h < 10) {
            h = "0" + h;
        }
        const text = h + ":" + m + ":" + s;

        setTimeout(() => {
            this.forceUpdate()
        }, 1000);

        return (
            <h1 id="time" className="timing">{text}</h1>
        )
    }

}

export default function Home() {
    return (
        <div className={"home text-center"}>
            <Clock />
        </div>
    )
}