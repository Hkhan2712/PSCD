$(document).ready(function () {
    let pageNumber = 0;
    let recordsPerPage = 10;
    let allData = [], filteredData = [];
    let currentSort = { key: null, asc: true };

    const dataFile = "data.json";
    $.getJSON(dataFile, function (data) {
        allData = filteredData = [...data];
        generateTableHeader(Object.keys(data[0]));
        render();
    });

    const generateTableHeader = keys => {
        const row = keys.map((key, i) =>
            `<th class="sorting" data-index="${i}">${key.charAt(0).toUpperCase() + key.slice(1)}</th>`).join("");
        $("#table_main thead tr, #table_main tfoot tr").html(row);
    };

    const render = () => {
        updateTable();
        updatePagination();
        updateInfo();
    };

    const updateTable = () => {
        const start = pageNumber * recordsPerPage;
        const rows = filteredData.slice(start, start + recordsPerPage)
            .map(item => `<tr>${Object.values(item).map(val => `<td>${val}</td>`).join("")}</tr>`)
            .join("");
        $("#table_main tbody").html(rows);
    };

    const updateInfo = () => {
        const total = filteredData.length;
        const start = total === 0 ? 0 : pageNumber * recordsPerPage + 1;
        const end = Math.min(start + recordsPerPage - 1, total);
        $("#table_main_info").text(`Showing ${start} to ${end} of ${total} entries`);
    };

    const updatePagination = () => {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        const pagination = $(".pagination");
        pagination.find("li.page-number").remove();
    
        for (let i = 0; i < totalPages; i++) {
            const pageBtn = $(`
                <li class="paginate_button page-number ${pageNumber === i ? 'active' : ''}">
                    <a href="#">${i + 1}</a>
                </li>`)
                .insertBefore("#nextBtn")
                .click(e => {
                    e.preventDefault();
                    pageNumber = i;
                    render();
                });
        }
    
        $("#prevBtn").toggleClass("disabled", pageNumber === 0);
        $("#nextBtn").toggleClass("disabled", pageNumber === totalPages - 1);
    };
    
    const goToPage = dir => {
        const totalPages = Math.ceil(filteredData.length / recordsPerPage);
        if ((dir === -1 && pageNumber > 0) || (dir === 1 && pageNumber < totalPages - 1)) {
            pageNumber += dir;
            render();
        }
    };

    $("#prevBtn").click(e => { e.preventDefault(); goToPage(-1); });
    $("#nextBtn").click(e => { e.preventDefault(); goToPage(1); });

    $('select[name="example2_length"]').on('change', function () {
        recordsPerPage = +$(this).val();
        pageNumber = 0;
        render();
    });

    $("#searchInput").on("keyup", function () {
        const term = $(this).val().toLowerCase();
        filteredData = allData.filter(row =>
            Object.values(row).some(val => val.toString().toLowerCase().includes(term))
        );
        pageNumber = 0;
        render();
    });

    const compareValues = (key, asc = true) => (a, b) => {
        const parse = v => isNaN(v) ? String(v).toLowerCase() : parseFloat(v);
        const valA = parse(a[key]), valB = parse(b[key]);
        return (valA > valB ? 1 : valA < valB ? -1 : 0) * (asc ? 1 : -1);
    };

    $("#table_main thead").on("click", "th.sorting", function () {
        const index = $(this).data("index");
        const key = Object.keys(allData[0])[index];

        currentSort.asc = (currentSort.key === key) ? !currentSort.asc : true;
        currentSort.key = key;

        filteredData.sort(compareValues(key, currentSort.asc));

        $("th.sorting").removeClass("sorting_asc sorting_desc");
        $(this).addClass(currentSort.asc ? "sorting_asc" : "sorting_desc");

        pageNumber = 0;
        render();
    });
});