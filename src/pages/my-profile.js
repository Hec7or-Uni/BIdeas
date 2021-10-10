import Header from "../components/Header";
import LineMenu from "../components/Navegation/LineMenu";

const data = [
    {
        id: 1,
        name: "profile"
    }, {
        id: 2,
        name: "profile settings"
    }
]

export default function Profile() {
    return (
        <div className="w-full">
            <Header />
            <LineMenu data={data} />
        </div>
    )
}
