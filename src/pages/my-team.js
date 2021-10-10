import Header from "../components/Header";
import LineMenu from "../components/Navegation/LineMenu";

const data = [
    {
        id: 1,
        name: "team"
    }, {
        id: 2,
        name: "team settings"
    }
]

export default function Team() {
    return (
        <div className="">
            <Header />
            <LineMenu data={data} />
        </div>
    )
}
