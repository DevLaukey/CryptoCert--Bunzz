import React from "react";
import IndividualCert from "./IndividualCert";

const CardGrid = ({ uri }) => {

  console.log(uri);
  const path = "Fotor_AI.png";

  return (
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        {uri.length !== 0 ? (
          uri.map((data, key) => (
            <IndividualCert data={data} path={path} key={key} />
          ))
        ) : (
          <h2>Loading placeholder</h2>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
