import "./widget.scss";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { useState, useEffect } from "react";
import axios from "axios";
import CountUp from "react-countup";

const Widget = ({ type }) => {
  const [totalMedicines, setTotalMedicine] = useState();
  const [totalUsers, setTotalUsers] = useState();
  const [totalDoctors, setTotalDoctors] = useState();
  const [totalCities, setTotalCities] = useState();
  const [totalCountries, setTotalCountries] = useState();
  const [totalHerbal, setTotalHerbal] = useState();
  const [totalHomopethic, setTotalHomopethic] = useState();
  const [totalNatural, setTotalNatural] = useState();

  let data;
  useEffect(() => {
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/medicines")
      .then((response) => {
        const medicines = response.data;
        let herbalCount = 0;
        let homopethicCount = 0;
        let NaturalCount = 0;
        for (let i = 0; i < medicines.length; i++) {
          if (medicines[i].genre === "Herbal") {
            herbalCount++;
          }
          if (medicines[i].genre === "Homopethic") {
            homopethicCount++;
          }
          if (medicines[i].genre === "Natural") {
            NaturalCount++;
          }
        }
        setTotalMedicine(response.data.length);
        setTotalHerbal(herbalCount);
        setTotalHomopethic(homopethicCount);
        setTotalNatural(NaturalCount);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/users")
      .then((response) => {
        const citySet = new Set();
        const countrySet = new Set();
        response.data.forEach((item) => {
          if (item.city && item.city.trim() !== "") {
            citySet.add(item.city.trim());
          }
        });
        response.data.forEach((item) => {
          if (item.country && item.country.trim() !== "") {
            countrySet.add(item.country.trim());
          }
        });
        setTotalCountries(countrySet.size);
        setTotalCities(citySet.size);
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://paulbrooksapi.doctorsforhealth.co.uk/users")
      .then((response) => {
        const doctors = response.data.filter((user) => user.doctor === true);
        setTotalDoctors(doctors.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  switch (type) {
    case "users":
      data = {
        title: "TOTAL USERS",
        isMoney: false,
        amount: <CountUp start={0} end={totalUsers} duration={3} />,

        // link: "See all users",
        icon: (
          <PersonIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "doctors":
      data = {
        title: "TOTAL DOCTORS",
        isMoney: false,
        amount: <CountUp start={0} end={totalDoctors} duration={3} />,

        // link: "See all users",
        icon: (
          <PersonIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "medicines":
      data = {
        title: "TOTAL MEDICINES",
        isMoney: false,
        amount: <CountUp start={0} end={totalMedicines} duration={3} />,

        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "cities":
      data = {
        title: "TOTAL CITIES",
        isMoney: false,
        amount: <CountUp start={0} end={totalCities} duration={3} />,
        // link: "View all orders",
        icon: (
          <LocationCityIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "countries":
      data = {
        title: "TOTAL COUNTRIES",
        isMoney: false,
        amount: <CountUp start={0} end={totalCountries} duration={3} />,
        // link: "View all orders",
        icon: (
          <LocationCityIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "herbal":
      data = {
        title: "TOTAL HERBAL MEDICINES",
        isMoney: false,
        amount: <CountUp start={0} end={totalHerbal} duration={3} />,
        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "homopethic":
      data = {
        title: "TOTAL HOMOPETHIC MEDICINES",
        isMoney: false,
        amount: <CountUp start={0} end={totalHomopethic} duration={3} />,
        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "natural":
      data = {
        title: "TOTAL NATURAL MEDICINES",
        isMoney: false,
        amount: <CountUp start={0} end={totalNatural} duration={3} />,
        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">{data.icon}</div>

      <div className="right">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
      </div>
    </div>
  );
};

export default Widget;
