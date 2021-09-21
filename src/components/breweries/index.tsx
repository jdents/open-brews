import { Link } from "react-router-dom";
import { IBreweriesResponse } from "../../atoms";
import { IStatus } from "../../types";

interface IBrews {
  status: IStatus;
  breweries: IBreweriesResponse[];
}

function Breweries({ status, breweries }: IBrews) {
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
