// displays an error message
function notify(msg = '', type = 'danger') {
    let div = document.getElementById('notify');
    div.innerHTML = ``;
    div.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${msg}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>            
    `;
}

// read the content of the csv file
async function read_file(file) {
    // display a msg
    notify('Please wait your file is being uploaded', 'info');
    // let reader = new File
    let text = await new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = (e) => resolve(reader.result);
        // let file = new File(file);
        reader.readAsText(file);
    });
    // notify the user
    notify('Your file is successfully uploaded', 'success');
    // return the content
    return text;
}


// parse the text to csv
function parse_csv(text) {
    let lines = text.split('\n');

    // update the header and the records
    let header = lines[0].split(',').map(item => item.substr(1, item.length - 2).trim());
    let records = [];

    // iterate through each line and collect items
    for (let i = 1; i < lines.length; i++) {
        let line = lines[i];
        if (!line) continue;
        let items = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g).map(item => item.substr(1, item.length - 2));
        let record = {};
        for (let j = 0; j < header.length; j++) {
            record[header[j]] = items[j].trim();
            if (header[j] in suggestions)
                suggestions[header[j]].add(items[j].trim());
        }
        records.push(record);
    }

    // return the header and the records
    return [header, records];
}




// displays the content in proper format
function display_records(data) {
    let credits = 0.0;
    let div = document.getElementById('courseList');
    div.innerHTML = ``;
    let table = document.createElement('table');
    table.id = 'user_data';
    let thead = document.createElement('thead');
    let tr = document.createElement('tr');
    for (let i = 0; i < header.length; i++) {
        let th = document.createElement('th');
        th.innerText = header[i];
        tr.appendChild(th);
    }
    thead.appendChild(tr);
    table.appendChild(thead);
    let tbody = document.createElement('tbody');
    for (let i = 0; i < data.length; i++) {
        let record = data[i];
        let tr = document.createElement('tr');
        for (let j = 0; j < header.length; j++) {
            let td = document.createElement('td');
            td.innerText = record[header[j]];
            tr.appendChild(td);
            if (header[j] === 'Credits')
                credits += parseFloat(record[header[j]]);
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    div.appendChild(table);

    let p = document.createElement('p');
    p.innerHTML = `<strong>Total credits</strong>: ${credits}`;
    div.appendChild(p);
}
