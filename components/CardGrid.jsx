import React from "react";
import IndividualCert from "./IndividualCert";
import Link from "next/link";

const CardGrid = ({ uri }) => {

  console.log(uri);

  return (
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        {uri.length !== 0 ? (
          uri.map((dataCID, key) => (
              
              <IndividualCert dataCID={dataCID} key={key} />
          ))
        ) : (
          <h2>Loading placeholder</h2>
        )}
      </div>
    </div>
  );
};

export default CardGrid;
