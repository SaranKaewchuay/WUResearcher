import * as React from "react";
import { useEffect, useRef } from "react";
import Table from "../component/table";
import Container from "@mui/material/Container";
import axios from "axios";
import "../style/styles.css";

const baseURL =
  "https://sarankaewchuay.github.io/google.github.io/article.json";

export default function Home() {
  const [posts, setPosts] = React.useState([]);
  const tableRef = useRef();

  React.useEffect(() => {
    axios
      .get(baseURL)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data[0])
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <div class="row">
        <div >
        <Container sx={{ py: 8 }} maxWidth="lg">
            <div class="row">
              <div
                class="shadow p-3 bg-white rounded mt-0 mb-3"
                style={{ width: "100%" }}
              >
                <h4 class="some-text blue">
                  Classification of marine ascomycota, basidiomycota,
                  blastocladiomycota and chytridiomycota
                </h4>
              </div>
            </div>

            <div class="row">
              <div class="col">
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
                      <p className="some-text">
                        CL Schoch, Pedro W Crous, Johannes Z Groenewald, EWA
                        Boehm, Treena I Burgess, J De Gruyter, G Sybren De Hoog,
                        LJ Dixon, M Grube, C Gueidan, Y Harada, S Hatakeyama, K
                        Hirayama, T Hosoya, SM Huhndorf, Kevin D Hyde, EBG
                        Jones, J Kohlmeyer, Åsa Kruys, YM Li, R Lücking, H
                        Thorsten Lumbsch, Ludmila Marvanová, JS Mbatchou, AH
                        McVay, AN Miller, GK Mugambi, L Muggia, MP Nelsen, P
                        Nelson, CA Owensby, AJL Phillips, S Phongpaichit,
                        Stephen B Pointing, Valérie Pujade-Renaud, HA Raja, E
                        Rivas Plata, Barbara Robbertse, C Ruibal, J Sakayaroj, T
                        Sano, L Selbmann, CA Shearer, T Shirouzu, Bernard
                        Slippers, S Suetrong, K Tanaka, B Volkmann-Kohlmeyer,
                        Michael J Wingfield, AR Wood, JHC Woudenberg, H
                        Yonezawa, Yong Zhang, JW Spatafora
                      </p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        วันที่เผยแพร่
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">009/6/1</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        แหล่งที่มา
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">Fungal diversity</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        เล่มที่
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">86</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        หน้า
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">1-594</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        ผู้เผยแพร่
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">Springer Netherlands</p>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-3 ">
                      <p class="some-text gray" style={{ textAlign: "right" }}>
                        คำอธิบาย
                      </p>
                    </div>
                    <div class="col-9">
                      <p className="some-text">
                        Knowledge of the relationships and thus the
                        classification of fungi, has developed rapidly with
                        increasingly widespread use of molecular techniques,
                        over the past 10–15 years, and continues to accelerate.
                        Several genera have been found to be polyphyletic, and
                        their generic concepts have subsequently been emended.
                        New names have thus been introduced for species which
                        are phylogenetically distinct from the type species of
                        particular genera. The ending of the separate naming of
                        morphs of the same species in 2011, has also caused
                        changes in fungal generic names. In order to facilitate
                        access to all important changes, it was desirable to
                        compile these in a single document. The present article
                        provides a list of generic names of Ascomycota
                        (approximately 6500 accepted names published to the end
                        of 2016), including those which are lichen-forming.
                        Notes and summaries of the changes since the last …
                      </p>
                    </div>
                  </div>

                  
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}
