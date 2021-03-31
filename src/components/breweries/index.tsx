import { Link } from "react-router-dom";
import { IStatus } from "../../types";

interface IBreweriesResponse {
  name: string;
  id: number;
}

interface IBrews {
  status: IStatus;
  breweries: IBreweriesResponse[];
}

function Breweries({ status, breweries }: IBrews) {
  console.log(status, breweries);
  return (
    <ul>
      {status === IStatus.pending && <li>Loading beers</li>}
      {status === IStatus.failed && <li>Sorry no beer for you</li>}
      {status === IStatus.succeeded &&
        breweries.map((brewery) => (
          <li key={brewery.id}>
            <Link to={`/brewery/${brewery.id}`}>{brewery.name}</Link>
          </li>
        ))}
    </ul>
  );
}

export default Breweries;
