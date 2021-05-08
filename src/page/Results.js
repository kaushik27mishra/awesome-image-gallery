import React from "react";
import { useHistory } from "react-router-dom";

function Results(props) {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const onClick = () => {
    const params = new URLSearchParams();
    if (query) {
      params.append("name", query);
    } else {
      params.delete("name");
    }
    history.push({ search: params.toString() });
  };

  return <div>Results</div>;
}

export default Results;
