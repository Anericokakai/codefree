import React from "react";
import { NavLink ,Link} from "react-router-dom";

function Tablecomponent({page}) {
  return (
    <div className="table-container">
      <h1>{page}</h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Topic</th>
            <th>Illustaration</th>
            <th>sample code</th>
            <th>image</th>
            <th>author</th>
            <th>created at</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Dom</td>
            <td>Lorem ipsu</td>
            <td> Impedit </td>
            <td>image</td>
            <td> Impedit </td>
            <td>image</td>
            <td><Link to={'/admin/blogsform'}><i class="fa-solid fa-pen"></i></Link><Link><i class="fa-solid fa-trash"></i></Link></td>
          </tr>
          
          <tr class="active-row">
            <td>Melissa</td>
            <td>5150</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Tablecomponent;
