import React from "react";
import {index, Main} from "./index";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownItem from "react-bootstrap/DropdownItem";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";

class Filter extends React.Component {
    filterForName() {
        //Sucht nach einem AAS name
        let searchInput = document
            .getElementById("searchField")
            .value.toLowerCase(); // zieht sich den Namen aus dem Inputfeld über die ID
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));

        shells.forEach((element) => {
            if (element["idShort"].toLowerCase().search(searchInput) !== -1) {
                // Abfrage ob Suchstring enthalten ist
                newAssetArray.push(element);
            }
        });
        //kleiner Spaß-------------------------------------
        if (searchInput === "luka") {
            window.open("https://media.licdn.com/dms/image/C4D03AQGgoDd-BaTu4Q/profile-displayphoto-shrink_800_800/0/1646867801108?e=2147483647&v=beta&t=PHxi3-KyHUS_WnGkT2lMsGWyxIVCBmuazelUTlKpb4k")
        }
        //-------------------------------------------------
        if (newAssetArray.length === 0) {
            //Error Handling
            document.getElementById("error_message_NextToSearchField").style.visibility = "visible";
        } else {
            document.getElementById("error_message_NextToSearchField").style.visibility = "hidden";
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
    }

    autoComplete() {
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let options = [];
        shells.forEach((element) => {
            if (element["idShort"]) {
                console.log(element["idShort"])
                options.push(element["idShort"])
            }
        })

        const input = document.getElementById("searchField").value.toLowerCase();
        const autoCompleteList = document.getElementById('autoCompleteList');
        const searchField = document.getElementById('searchField');

        autoCompleteList.innerHTML = '';

        const filteredOptions = options.filter(option => option.toLowerCase().startsWith(input));
        if (input.length !== 0) {
            filteredOptions.forEach(option => {
                const li = document.createElement('li');
                li.textContent = option;
                li.setAttribute('id', option);
                li.classList.add('autoCompleteItem');
                li.addEventListener('click', () => {
                        document.getElementById("autoCompleteList").style.display = 'none';
                        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
                        let newAsset = [];
                        shells.forEach((element) => {
                            if (element["idShort"] && element["idShort"] === option) {
                                newAsset.push(element)
                                //Deletes error messages from a wrong search before, if an Asset is found
                                document.getElementById("error_message_NextToSearchField").style.visibility = "hidden";
                            }
                        })
                        if (newAsset.length === 0) {
                            //Error Handling
                            document.getElementById("error_message_NextToSearchField").style.visibility = "visible";
                        } else {
                            window.sessionStorage.setItem("content", JSON.stringify(newAsset));
                            index.render(<Main/>);
                        }
                    }
                )
                autoCompleteList.appendChild(li);
            });
        } else {
            if (shells.length === 0) {
                //Error Handling
                document.getElementById("error_message_NextToSearchField").style.visibility = "visible";
            } else {
                window.sessionStorage.setItem("content", JSON.stringify(shells));
                index.render(<Main/>);
            }
        }
        autoCompleteList.style.display = 'block';
    }

    getManufactureName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));

        if (shells !== null) {
            shells.forEach((element) => {
                if (element["Nameplate"]) {
                    if (element["Nameplate"]["ManufacturerName"])
                        newAssetArray.push(element["Nameplate"]["ManufacturerName"]);
                }
            });
            newAssetArray = [...new Set(newAssetArray)];
            newAssetArray.unshift("All");

        }
        return newAssetArray
    }

    filterForManufacturerName(manufacturerNameDropDown) {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        if (manufacturerNameDropDown) {
            if (manufacturerNameDropDown === "All") {
                newAssetArray = shells;
            } else {
                shells.forEach((element) => {
                    if (element["Nameplate"]) {
                        if (
                            element["Nameplate"]["ManufacturerName"].search(
                                manufacturerNameDropDown
                            ) !== -1
                        ) {
                            newAssetArray.push(element);
                        }
                    }
                });
            }
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            document.getElementById("error_message_filterForManufacturerName").style.visibility = "visible";
        } else {
            document.getElementById("error_message_filterForManufacturerName").style.visibility = "hidden";
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
    }

    searchForManufacturerName() {
        let newAssetArray = [];
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        let manufacturerNameSearchField = document
            .getElementById("manufacturerNameSearchField")
            .value.toLowerCase();

        if (manufacturerNameSearchField) {
            shells.forEach((element) => {
                if (element["Nameplate"]) {
                    if (
                        element["Nameplate"]["ManufacturerName"]
                            .toLowerCase()
                            .search(manufacturerNameSearchField) !== -1
                    ) {
                        newAssetArray.push(element);
                    }
                }
            });
        }
        if (newAssetArray.length === 0) {
            //Error Handling
            document.getElementById("error_message_filterForManufacturerName").style.visibility = "visible";
        } else {
            document.getElementById("error_message_filterForManufacturerName").style.visibility = "hidden";
            window.sessionStorage.setItem("content", JSON.stringify(newAssetArray));
            index.render(<Main/>);
        }
        document.getElementById("manufacturerNameSearchField").value = "";
    }


    deleteSearchInput() {
        let shells = JSON.parse(window.sessionStorage.getItem("shells"));
        document.getElementById("searchField").value = "";
        if (shells.length === 0) {
            //Error Handling
            alert("Cannot Clear!");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(shells));
            index.render(<Main/>);
        }
    }

    sortAsYear(upOrDown) {
        //let upOrDown = document.getElementById("sortByYear").value;
        //document.getElementById("up").style.background = ""
        document.getElementById("up").style.fontWeight = ""
        //document.getElementById("up").style.color = ""
        //document.getElementById("down").style.background = ""
        //document.getElementById("down").style.color = ""
        document.getElementById("down").style.fontWeight = ""
        let shells = JSON.parse(window.sessionStorage.getItem("content"));
        let newAssetDateArray = [];
        let newAssetWithoutDateArray = [];


        document.getElementById(upOrDown).style.fontWeight = "bold";
        //document.getElementById(upOrDown).style.background = "#030d6c"
        //document.getElementById(upOrDown).style.color = "white"

        shells.forEach((element) => {
            if (element["Nameplate"] && element["Nameplate"]["YearOfConstruction"]) {
                if (element["Nameplate"]["YearOfConstruction"].length === 4) {
                    // Jahr formatieren
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01-01";
                    newAssetDateArray.push(element);
                } else if (element["Nameplate"]["YearOfConstruction"].length === 7) {
                    // Jahr und Monat formatieren
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"] + "-01";
                    newAssetDateArray.push(element);
                } else if (element["Nameplate"]["YearOfConstruction"].length === 10) {
                    // Datum ist bereits im richtigen Format
                    element["Nameplate"]["YearOfConstruction"] = element["Nameplate"]["YearOfConstruction"];
                    newAssetDateArray.push(element);
                } else {
                    newAssetWithoutDateArray.push(element)
                }
            }
        });


        let sortedDates = []
        console.log("Sortiert:")
        if (upOrDown === "up") {
            sortedDates = newAssetDateArray.sort((a, b) => {
                const dateA = new Date(a.Nameplate.YearOfConstruction);
                const dateB = new Date(b.Nameplate.YearOfConstruction);
                return dateA - dateB;
            });
        }
        if (upOrDown === "down") {
            sortedDates = newAssetDateArray.sort((a, b) => {
                const dateA = new Date(a.Nameplate.YearOfConstruction);
                const dateB = new Date(b.Nameplate.YearOfConstruction);
                return dateB - dateA;
            });
        }

        sortedDates.forEach((element) => {
            if (element["Nameplate"]) {
                if (element["Nameplate"]["YearOfConstruction"]) {
                    console.log(element["Nameplate"]["YearOfConstruction"])
                }
            }
        })
        sortedDates = sortedDates.concat(newAssetWithoutDateArray);
        console.log(newAssetWithoutDateArray)
        console.log(sortedDates)

        if (sortedDates.length === 0) {
            //Error Handling
            alert("The assets cannot be sorted because they do not have a date");
        } else {
            window.sessionStorage.setItem("content", JSON.stringify(sortedDates));
            index.render(<Main/>);
        }
    }


    render() {
        const sort =
            <Dropdown
                className="my-dropdown"
                autoClose="true"
                variant="light"
                align="end">
                <DropdownToggle id="dropdown-autoclose-true">
                    Year
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id={"up"} onClick={() => this.sortAsYear("up")}>oldest first</DropdownItem>
                    <DropdownItem id={"down"} onClick={() => this.sortAsYear("down")}>newest first</DropdownItem>
                </DropdownMenu>
            </Dropdown>;

        const filter =
            <Dropdown
                className="mx-2 my-dropdown"
                autoClose="outside"
                variant="light"
                align="end">
                <DropdownToggle id="dropdown-autoclose-outside">
                    Manufacturer
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <form
                            className="mx-2 d-flex flex-row"
                            onSubmit={(event) => event.preventDefault()}>
                            <input
                                id="manufacturerNameSearchField"
                                type="text"
                                className="form-control form-control-dark  w-auto"
                                placeholder="Manufacturer"
                            ></input>
                            <button
                                type="submit"
                                className="btn btn-link mx-2 text-nowrap"
                                onClick={this.searchForManufacturerName}>
                                Search
                            </button>
                        </form>
                        <div className={"error_message"} id="error_message_filterForManufacturerName"
                             style={{visibility: "hidden", color: "darkred"}}>
                            No entries found
                        </div>
                    </DropdownItem>
                    {this.getManufactureName().map(element => {
                        return <DropdownItem value={element}
                                             onClick={() => this.filterForManufacturerName(element)}> {element} </DropdownItem>
                    })}
                </DropdownMenu>
            </Dropdown>;

        return (
            <div className="px-3 py-1 d-flex flex-row shadow-sm bg-light align-items-center justify-content-start">
                {window.sessionStorage.getItem("loaded") === "true" ? sort : ""}
                {window.sessionStorage.getItem("loaded") === "true" ? filter : ""}
                {/* Suchfeldleiste */}
                <form autoComplete="off" onBlur={async (event) => {
                    await new Promise(resolve => setTimeout(resolve, 200));
                    document.getElementById("autoCompleteList").style.display = 'none';
                }} onSubmit={(event) => {
                    event.preventDefault()
                }}>
                    <div className="search-bar-container d-flex flex-row bg-white align-items-center input-group">
                        <input
                            id={"searchField"}
                            className="mr-sm-2 border-0 px-3 py-1 bg-transparent outline-none"
                            type="text"
                            placeholder="Search"
                            aria-label="Search"
                            onKeyUp={this.autoComplete}
                        />
                        <div className="input-group-append d-flex flex-row align-items-center">
                            <button
                                id={"searchInputStringBtn"}
                                className="my-2 my-sm-0 d-flex my-search-button"
                                type="submit"
                                onClick={this.filterForName}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    class="bi bi-search"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                            </button>
                            <input
                                className="my-search-button px-3"
                                type="reset"
                                value="X"
                                alt="Clear the search form"
                                onClick={this.deleteSearchInput}
                            />
                        </div>
                    </div>
                    <ul id="autoCompleteList" className="bg-white border rounded shadow-sm"></ul>
                </form>
                <div className={"error_message"} id="error_message_NextToSearchField"
                     style={{visibility: "hidden", color: "darkred"}}>
                    No entries found
                </div>
            </div>
        );
    }
}

export default Filter;