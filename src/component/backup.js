import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min.js";
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import $ from "jquery";

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          data: []
        };
      }
    
  componentDidMount() {
    //fetch data from API
    axios
    .get("https://sarankaewchuay.github.io/google.github.io/article.json")
    .then((response) => {
      //set data state variable with the fetched data
      this.setState({ data: response.data });

      //initialize datatable
      $(document).ready(function () {
        $("#example").DataTable();
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {

    const { data } = this.state;

    return (
      <div className="MainDiv mt-0">
        <div className="container">
          <table id="example" className="display">
            <thead>
              <tr>
                <th>#</th>
                <th>Document title</th>
                <th>Author</th>
                <th>Year</th>
                <th>Academic Journal</th>
        
              </tr>
            </thead>
            <tbody>
              {data.map((document, index) => (
                <tr key={index}>
                  <td>{document.article_id}</td>
                  <td>{document.articleName}</td>
                  <td>{document.author_id}</td>
                  <td>{document.releaseDate}</td>
                  <td>{document.academicJournal}</td>
              
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Table;
