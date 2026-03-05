import { IDriver } from "../service/types";
import { getFooter, getHeader, getStyles } from "./baseTemplate";

const getTableStyles = () => `
        th:nth-child(1), td:nth-child(1) { width: 20%; } 
        th:nth-child(2), td:nth-child(2) { width: 50%; } 
        th:nth-child(3), td:nth-child(3) { width: 30%; } 
    `; 


const getContent = (drivers: IDriver[]) => `
  <div class="content">
    <table>
      <thead>
        <tr>
          <th>Codice Autista</th>
          <th>Nome Autista</th>
          <th>Telefono</th>
        </tr>
      </thead>
      <tbody>
        ${drivers
          .map(
            (driver) => `
          <tr>
            <td class="code">${driver.driverCode}</td>
            <td class="nowrap-text">${driver.driverName}</td>
            <td class="nowrap-text">${driver.phone || "-"}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

const getDriverTemplate = (drivers: IDriver[]) => `
  <!DOCTYPE html>
  <html lang="it">
    <head>
      <style>
        ${getStyles()}
        ${getTableStyles()}
      </style>
    </head>
    <body>
      ${getHeader("Elenco Autisti")}
      ${getContent(drivers)}
      ${getFooter()}
    </body>
  </html>
`;

export default getDriverTemplate;