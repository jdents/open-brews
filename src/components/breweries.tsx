import { Link } from "react-router-dom";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: "idle" | "pending" | "resolved" | "failed";
  breweries: IBreweriesResponse[];
}

function Breweries({ status, breweries }: IBrews) {
  return (
    <ul>
      {status === "pending" && <li>Loading beers</li>}
      {status === "failed" && <li>Sorry no beer for you</li>}
      {status === "resolved" &&
        breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Breweries;
