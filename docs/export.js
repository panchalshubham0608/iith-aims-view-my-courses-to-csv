// returns the quoted string
function quoted_string(text){
	return `"${text.toString().trim()}"`;
}

// converts the array to string
function to_string(arr) {
    let text = "";
    for (let i =  0; i < arr.length - 1; i++)
        text += quoted_string(arr[i]) + ",";
    text += quoted_string(arr[arr.length - 1]);
    return text;
}

// converts the details into a csv string
function to_csv(header, items){
    // stores the csv string
	let csv_string = to_string(header) + "\n";
    // add the items
    for (let item of items) csv_string += to_string(item) + "\n";
    // return the computed strings
	return csv_string;
}


// download the give text as file
function download(text, filename){
	let link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	link.setAttribute('download', filename);
	link.click();
}


// exports the data
function export_data() {
    let table = document.getElementById('user_data');
    let header = [];
    let items = [];
    for (let th of table.querySelectorAll('th')) header.push(th.innerText);
    for (let tr of table.querySelectorAll('tbody tr')) {
        let item = [];
        for (let td of tr.querySelectorAll('td')) item.push(td.innerText);
        items.push(item);
    }
    // parse the data and download
    download(to_csv(header, items), 'iith-aims-course-list-helper.csv');
}
