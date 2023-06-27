import * as React from "react";
import {
  MDBFooter,
  MDBContainer,
} from "mdb-react-ui-kit";
import "../style/styles.css";

export default function footer() {
  return (
    <MDBFooter
      className="text-center text-white mt-5 footer"
      style={{ backgroundColor: "#0a4275"}}
      position="relative"
    >
      <MDBContainer className="p-4 pb-0" style={{marginTop:"109px"}}>
        <section className="">
          <p className="d-flex justify-content-center align-items-center">
            <span className="me-3">
              Developed By Kitiphon Saran and Aekkalak
            </span>
          </p>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright: WU Researcher Scraping Team
        <span className="text-white"></span>
      </div>
    </MDBFooter>
  );
}
