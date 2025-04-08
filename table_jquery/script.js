// search()
// sort: search, not search
// update showing 1 to 10 of 57 entries
// update button pagination
// phải sort toàn bộ nội dung trong bảng, không phải sort theo từng trang
// sort theo thứ tự tăng dần, giảm dần
// khi loc ra thi sort trong du lieu da loc 
$(document).ready(function () {
    let pageNumber = 0;
    let recordsPerPage = 10;
    let allData = [];
    let filteredData = [];

    const dataFile = "data.json";

    $.getJSON(dataFile, function (data) {
        allData = data;
        updateTable();
        updatePagination();
        updateInfo();
    });

    const getTotalPages = () => Math.ceil(allData.length / recordsPerPage);

    const updateTable = () => {
        const dataToShow = filteredData.length ? filteredData : allData;
        const start = pageNumber * recordsPerPage;
        const end = Math.min(start + recordsPerPage, dataToShow.length);
        const rows = dataToShow.slice(start, end).map(item => `
            <tr>
                <td>${item.engine}</td>
                <td>${item.browser}</td>
                <td>${item.platform}</td>
                <td>${item.version}</td>
                <td>${item.grade}</td>
            </tr>
        `).join("");

        $("#table_main tbody").html(rows);
        updateInfo();
    };

    const updateInfo = () => {
        const dataToShow = filteredData.length ? filteredData : allData;
        const start = dataToShow.length === 0 ? 0 : (pageNumber * recordsPerPage + 1);
        const end = Math.min((pageNumber + 1) * recordsPerPage, dataToShow.length);
        $("#table_main_info").text(`Showing ${start} to ${end} of ${dataToShow.length} entries`);
    };

    const updatePagination = () => {
        const dataToShow = filteredData.length ? filteredData : allData;
        const totalPages = Math.ceil(dataToShow.length / recordsPerPage);
        const pagination = $("#paginate .pagination");
        pagination.empty();

        const createPageButton = (label, disabled, onClick) => {
            return $(`<li class="paginate_button ${disabled ? 'disabled' : ''}">
                <a href="#">${label}</a>
            </li>`).click(function (e) {
                e.preventDefault();
                if (!disabled) onClick();
            });
        };

        pagination.append(createPageButton("Previous", pageNumber === 0, () => {
            pageNumber--;
            updateTable();
            updatePagination();
        }));

        for (let i = 0; i < totalPages; i++) {
            const isActive = pageNumber === i;
            const pageBtn = $(`<li class="paginate_button ${isActive ? 'active' : ''}">
                <a href="#">${i + 1}</a>
            </li>`);
            pageBtn.click(function (e) {
                e.preventDefault();
                pageNumber = i;
                updateTable();
                updatePagination();
            });
            pagination.append(pageBtn);
        }

        pagination.append(createPageButton("Next", pageNumber === totalPages - 1, () => {
            pageNumber++;
            updateTable();
            updatePagination();
        }));
    };

    $('select[name="example2_length"]').on('change', function () {
        recordsPerPage = parseInt($(this).val());
        pageNumber = 0;
        updateTable(allData);
        updatePagination();
    });

    $('#searchInput').on('keyup', function () {
        const searchTerm = $(this).val().toLowerCase();
        filteredData = allData.filter(row =>
            Object.values(row).some(value =>
                value.toString().toLowerCase().includes(searchTerm)
        ));
        pageNumber = 0;
        updateTable();
        updatePagination();
    });

    $('th.sorting').on('click', function () {
        const index = $(this).index();
        const key = ['engine', 'browser', 'platform', 'version', 'grade'][index];
        const isAscending = $(this).hasClass('sorting_asc');
    
        const dataToSort = filteredData.length ? filteredData : allData;
    
        dataToSort.sort((a, b) => {
            let valA = a[key];
            let valB = b[key];
    
            const isNumber = !isNaN(valA) && !isNaN(valB);
            if (isNumber) {
                valA = parseFloat(valA);
                valB = parseFloat(valB);
            } else {
                valA = valA.toString().toLowerCase();
                valB = valB.toString().toLowerCase();
            }
    
            if (valA < valB) return isAscending ? 1 : -1;
            if (valA > valB) return isAscending ? -1 : 1;
            return 0;
        });
    
        $('th.sorting').removeClass('sorting_asc sorting_desc');
        $(this).addClass(isAscending ? 'sorting_desc' : 'sorting_asc');
    
        pageNumber = 0;
        updateTable();
        updatePagination();
    });    
});