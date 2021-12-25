// stores the header and records of the uploaded file
var header = [];
var records = [];
var filters = {};
var suggestions = {
    'Course': new Set(),
    'Course Title': new Set(),
    'Credits': new Set(),
    'Elective Type': new Set()
};
var suggestionIndex = 0;



// uploads the file
async function upload() {

    // get file input and validate it
    let input = document.getElementById('fileInput');
    if (!input) {
        notify('Please refresh this page and try again!');
        return;
    }

    // get file path and validate it
    let files = input.files;
    if (!files || files.length < 1) {
        notify('Please select a file to upload!');
        return;
    }


    // read the file
    let text = await read_file(files[0]);
    // parse the file
    [header, records] = parse_csv(text);
    // display the records
    display_records(records);
}






//=========================================================================================
// ============================ FILTERS
//=========================================================================================
// displays the list of filters
function display_filters() {
    let div = document.getElementById('filters');
    div.innerHTML = '';
    for (let filter in filters) {
        let span = document.createElement('span');
        span.classList.add('filter');
        span.innerText = `${filter} : ${filters[filter]}`;
        let i = document.createElement('i');
        i.classList.add('fa');
        i.classList.add('fa-times');
        i.classList.add('close-icon');
        i.addEventListener('click', () => {
            delete filters[filter];
            display_filters();
            apply_filters();
        });
        span.appendChild(i);
        div.appendChild(span);
    }
}

// adds a new filter
function add_filter(event) {
    event.preventDefault();
    let input = document.getElementById('filterInput');
    if (!input) return;
    let value = input.value.trim();
    if (!value) return;
    let items = value.split(':');
    if (items.length != 2) return;
    filters[items[0].trim()] = items[1].trim();
    input.value = '';
    apply_filters();
}

// clears all the filters
function clear_filters() {
    filters = {};
    display_filters();
    display_records(records);
}

// applys the list of filters
function apply_filters() {
    // display the filters
    display_filters();
    // filter out the records
    let data = records.filter(item => {
        let consider = true;
        for (let filter in filters) {
            if (filter in item && !item[filter].startsWith(filters[filter])) {
                consider = false;
                break;
            }
        }
        return consider;
    });
    display_records(data);
}




//=========================================================================================
// ============================ AUTO-COMPLETE
//=========================================================================================

function addAutocomplete(items) {
    let autocomplete = document.getElementById('autocomplete');    
    autocomplete.innerHTML = ``;    
    suggestionIndex = -1;
    for(let i = 0; i < items.length; i++) {
        let item = items[i];
        let div = document.createElement('div');
        div.innerText = item;
        div.id = 'option#' + i;
        div.addEventListener('click', () => {
            let input = document.getElementById('filterInput');
            autocomplete.innerHTML = '';
            input.value = div.innerText;
            input.focus();
        });
        autocomplete.appendChild(div);
    }
}

// presents the suggestion for user
function filterInputChange() {
    // clear the suggestions
    let autocomplete = document.getElementById('autocomplete');
    autocomplete.innerHTML = ``;
    // fetch the input
    let input = document.getElementById('filterInput');
    let value = input.value.trim();

    // iterate through keys
    let items = header.filter(key => key.indexOf(value) !== -1);
    if (items.length > 0) {
        addAutocomplete(items.map(item => item + ":"));
        return;
    }

    // if it's elective type then present autocomplete
    let [key, text] = value.split(':');
    key = key.trim();
    if (key in suggestions) {
        text = text.trim();
        addAutocomplete(Array.from(suggestions[key]).filter(item => item.startsWith(text)).sort().map(item => key + ':' + item));
        return;
    }    
}



//=========================================================================================
// ============================ STARTUP
//=========================================================================================

// add listeners when window is loaded
window.onload = function () {
    let form = document.getElementById('addFilterForm');
    form.addEventListener('submit', add_filter);
    let filterInput = document.getElementById('filterInput');
    filterInput.addEventListener('input', filterInputChange);
    filterInput.addEventListener('click', filterInputChange);
    document.addEventListener('click', (event) => {
        let target = event.target;
        if (target.id !== 'filterInput'){
            let autocomplete = document.getElementById('autocomplete');
            autocomplete.innerHTML = ``;
        }
    });

    // for debug purpose!
    // [header, records] = parse_csv(text);
    // display_records(records);
}

