import {useEffect, useState} from "react";
import "./Home.css";

function Home(){
  const [lastDailyCasesReport, setLastDailyCasesReport] = useState(0)
  const [lastDailyDeathsReport, setLastDailyDeathsReport] = useState(0)

  const [allCasesReports, setAllDailyCasesReports] = useState([])
  const [allDeathsReports, setAllDeathsReports] = useState([])

  useEffect(() => {
    fetch('/covid/get_all_cases').then(res => res.json()).then(data => {
      setLastDailyCasesReport(data.find(report => report.daily != null))
    });
  }, [])


  useEffect(() => {
    fetch('/covid/get_all_deaths').then(res => res.json()).then(data => {
      setLastDailyDeathsReport(data.find(report => report.daily != null))
    });
  }, [])

  useEffect(() => {
    fetch('/covid/get_all_cases').then(res => res.json()).then(data => {
      setAllDailyCasesReports(data.map(report => {return {"date": report.date, "cases": report.daily}}));
    });
  }, [])

  useEffect(() => {
    fetch('/covid/get_all_deaths').then(res => res.json()).then(data => {
      setAllDailyCasesReports(data.map(report => {return {"date": report.date, "deaths": report.daily}}));
    });
  }, [])

  const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "light2", //"light1", "dark1", "dark2"
			title:{
				text: "Simple Column Chart with Index Labels"
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column", //change type to bar, line, area, pie, etc
				//indexLabel: "{y}", //Shows y value on all Data Points
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
				dataPoints: [
					{ x: 10, y: 71 },
					{ x: 20, y: 55 },
					{ x: 30, y: 50 },
					{ x: 40, y: 65 },
					{ x: 50, y: 71 },
					{ x: 60, y: 68 },
					{ x: 70, y: 38 },
					{ x: 80, y: 92, indexLabel: "Highest" },
					{ x: 90, y: 54 },
					{ x: 100, y: 60 },
					{ x: 110, y: 21 },
					{ x: 120, y: 49 },
					{ x: 130, y: 36 }
				]
			}]
		}

  return(
    <>
      <h1>Latest data</h1>
      <div className="covidInfo">
        <p className="casesInfo">Latest cases report: {lastDailyCasesReport.date}:<br/>
          <span className="newCasesNumber">{lastDailyCasesReport.daily}</span> cases
        </p>
        <p>Latest deaths report: {lastDailyDeathsReport.date}: <br/>
          <span className="newDeathsNumber">{lastDailyDeathsReport.daily}</span> deaths
        </p>
      </div>
    </>
  )
}

export default Home;