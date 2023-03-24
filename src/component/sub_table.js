import "../style/styles.css";

function SubTable() {
  return (
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">All</th>
            <th scope="col">Since 2018</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a
                class="no-underline"
                title='This is the number of citations to all publications. The second column has the "recent" version of this metric which is the number of new citations in the last 5 years to all publications.'
              >
                <p class="blue">
                  <b>Citations</b>
                </p>
              </a>
            </td>
            <td class="">95</td>
            <td class="">31</td>
          </tr>
          <tr>
            <td>
              <a
                class="gsc_rsb_f gs_ibl no-underline"
                title='h-index is the largest number h such that h publications have at least h citations. The second column has the "recent" version of this metric which is the largest number h such that h publications have at least h new citations in the last 5 years.'
              >
                <p class="blue">
                  <b>h-index</b>
                </p>
              </a>
            </td>
            <td>5</td>
            <td class="">3</td>
          </tr>
          <tr>
            <td>
              <a
                class="no-underline"
                title='i10-index is the number of publications with at least 10 citations. The second column has the "recent" version of this metric which is the number of publications that have received at least 10 new citations in the last 5 years.'
              >
                <p class="blue">
                  <b>i10-index</b>
                </p>
              </a>
            </td>
            <td>3</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SubTable;
