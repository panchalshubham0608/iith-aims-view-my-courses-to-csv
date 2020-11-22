// stores the details
let dict = {'col1': [], 'col2': [], 'col3': [], 'col4': [], 'col5': [], 
			'col6': [], 'col7': [], 'col8': [], 'col9': []};

// fetches the details of courses
function fetch_details(){
	for (let i = 1; i < 10; i++){
		let spans = document.getElementsByClassName(`col${i}`);
		let items = [];
		for (span of spans)	items.push(span.innerText.toString().trim());
		dict[`col${i}`] = items;
	}
}

// returns the quoted string
function quoted_string(text){
	return `"${text.toString().trim()}"`;
}

// converts the details into a csv string
function to_csv(length){
	let csv_string = "";

	// write the header
	csv_string += 
			quoted_string(dict.col1[0]) + "," + quoted_string(dict.col2[0]) + "," + 
			quoted_string(dict.col3[0]) + "," + quoted_string(dict.col4[0]) + "," + 
			quoted_string(dict.col5[0]) + "," + quoted_string(dict.col6[0]) + "," + 
			quoted_string(dict.col7[0]) + "," + quoted_string(dict.col8[0]) + "," + 
			quoted_string(dict.col9[0]) + "\n";

	// write the courses in reverse order
	for (let i = length - 1; i > 0; --i){
		csv_string += 
			quoted_string(dict.col1[i]) + "," + quoted_string(dict.col2[i]) + "," + 
			quoted_string(dict.col3[i]) + "," + quoted_string(dict.col4[i]) + "," + 
			quoted_string(dict.col5[i]) + "," + quoted_string(dict.col6[i]) + "," + 
			quoted_string(dict.col7[i]) + "," + quoted_string(dict.col8[i]) + "," + 
			quoted_string(dict.col9[i]) + "\n";
	}
	return csv_string;
}


// download the give text as file
function download(text, filename){
	let link = document.createElement('a');
	link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	link.setAttribute('download', filename);
	link.click();
}

// fetch the details
fetch_details();
// convert details to csv
csv_string = to_csv(dict.col1.length);
// download the file
download(csv_string, 'view_my_courses-iith-aims.csv');
