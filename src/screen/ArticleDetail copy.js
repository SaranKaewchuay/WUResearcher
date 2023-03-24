import * as React from "react";
import { useEffect, useRef } from "react";
import Table from "../component/table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";

const baseURL =
  "https://sarankaewchuay.github.io/google.github.io/googlescholar.json";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const tableRef = useRef();

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div class="row">
        <div class="col-2">
          <div
            class="shadow p-3 mb-5 bg-white rounded "
            style={{ width: "200px", height: "230px" }}
          >
            <img
              src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=M11G7vAAAAAJ&citpid=1"
              class="img-thumbnail"
              style={{ width: "170px", height: "200px" }}
            />
          </div>
        </div>

        <Container sx={{ py: 8 }} maxWidth="xl">
        <div class="col-10">
            <div class="row">
              <div
                class="shadow p-4 bg-white rounded mt-0 mb-3"
                style={{ width: "100%" }}
              >
                <h4 class="some-text blue">
                  Classification of marine ascomycota, basidiomycota,
                  blastocladiomycota and chytridiomycota
                </h4>
              </div>
            </div>
            
            <div class="row">
              <div
                class="shadow p-4 mb-5 bg-white rounded mt-0 "
                style={{ width: "100%", borderRadius: "500px" }}
              >
                <div class="row">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      ผู้เขียน
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">009/6/1</p>
                  </div>
                  {/* <div class="col-9">
                    <h7 class="some-text text-right">
                      L Schoch, Pedro W Crous, Johannes Z Groenewald, EWA Boehm,
                      Treena I Burgess, J De Gruyter, G Sybren De Hoog, LJ
                      Dixon, M Grube, C Gueidan, Y Harada, S Hatakeyama, K
                      Hirayama, T Hosoya, SM Huhndorf, Kevin D Hyde, EBG Jones,
                      J Kohlmeyer, Åsa Kruys, YM Li, R Lücking, H Thorsten
                      Lumbsch, Ludmila Marvanová, JS Mbatchou, AH McVay, AN
                      Miller, GK Mugambi, L Muggia, MP Nelsen, P Nelson, CA
                      Owensby, AJL Phillips, S Phongpaichit, Stephen B Pointing,
                      Valérie Pujade-Renaud, HA Raja, E Rivas Plata, Barbara
                      Robbertse, C Ruibal, J Sakayaroj, T Sano, L Selbmann, CA
                      Shearer, T Shirouzu, Bernard Slippers, S Suetrong, K
                      Tanaka, B Volkmann-Kohlmeyer, Michael J Wingfield, AR
                      Wood, JHC Woudenberg, H Yonezawa, Yong Zhang, JW Spatafora
                    </h7>
                  </div>
                </div>

    

                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      วันที่เผยแพร่
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">009/6/1</p>
                  </div>
                </div> */}
                {/* <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      วารสารวิชาการ
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">Studies in mycology</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      เล่มที่
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">-</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      ฉบับที่
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">-</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      หน้า
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">-</p>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      ผู้เผยแพร่
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">-</p>
                  </div>
                </div>

                
                <div class="row mt-3">
                  <div class="col-3 ">
                    <p class="some-text gray" style={{ textAlign: "right" }}>
                      คำอธิบาย
                    </p>
                  </div>
                  <div class="col-9">
                    <p className="some-text">
                      We present a comprehensive phylogeny derived from 5 genes,
                      nucSSU, nucLSU rDNA, TEF1, RPB1 and RPB2, for 356 isolates
                      and 41 families (six newly described in this volume) in
                      Dothideomycetes. All currently accepted orders in the
                      class are represented for the first time in addition to
                      numerous previously unplaced lineages. Subclass
                      Pleosporomycetidae is expanded to include the aquatic
                      order Jahnulales. An ancestral reconstruction of basic
                      nutritional modes supports numerous transitions from
                      saprobic life histories to plant associated and lichenised
                      modes and a transition from terrestrial to aquatic
                      habitats are confirmed. Finally, a genomic comparison of 6
                      dothideomycete genomes with other fungi finds a high level
                      of unique protein associated with the class, supporting
                      its delineation as a separate taxon.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
