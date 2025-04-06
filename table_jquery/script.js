$(document).ready(function () {
    let pageNumber = 0;
    let recordsLength = 0;

    const dataFile = "data.json";
    let totalRecords = 0;

    $.getJSON(dataFile, function (data) {  
        const tableBody = $("#table_main tbody");
        tableBody.empty();
        $.each(data, function (index, item) {
            const row = $("<tr></tr>");
            row.append($("<td></td>").text(item.engine));
            row.append($("<td></td>").text(item.browser));
            row.append($("<td></td>").text(item.platform));
            row.append($("<td></td>").text(item.version));
            row.append($("<td></td>").text(item.grade));
            tableBody.append(row);
        });
        totalRecords = $("#table_main tbody tr").length;
        updateTable();
        updateButtonPagination();
        updatePagination();
    });
    
    const calPageNumber = () => {
        recordsLength = $('select[name="example2_length"]').val();
        return Math.ceil(totalRecords / recordsLength);
    }
    
    const updateTable = () => {
        recordsLength = $('select[name="example2_length"]').val();
        pageNumber = Math.min(pageNumber, calPageNumber() - 1); 
        let startRecord = ((pageNumber* recordsLength + 1) > totalRecords) ? 0 : (pageNumber * recordsLength + 1);
        
        $("#table_main tbody tr").hide();
        $("#table_main tbody tr").slice(pageNumber * recordsLength, (pageNumber + 1) * recordsLength).show();
        $("#table_main_info").text(`Showing ${startRecord} to ${Math.min((pageNumber + 1) * recordsLength, totalRecords)} of ${totalRecords} entries`);
    }

    const updateButtonPagination = () => {
        $("#table_main_previous").prop("disabled", pageNumber === 0);
        $("#table_main_next").prop("disabled", pageNumber === calPageNumber() - 1);
    }

    const updatePagination = () => {
        const totalPages = calPageNumber();
        const pagination = $("#paginate .pagination");
        
        pagination.empty();
        pagination.append(`<li class="paginate_button previous" id="previous"><a href="#" aria-controls="example2" data-dt-idx="${pageNumber}" tabindex="0">Previous</a></li>`);

        for (let i = 0; i < totalPages; i++) {
            const pageItem = $('<li class="paginate_button"></li>');
            pageItem.append(`<a href="#">${i + 1}</a>`);
            if (i === pageNumber) {
                pageItem.addClass('active');
            }
            pageItem.click(function() {
                pageNumber = i;
                updateTable();
                updateButtonPagination();
                updatePagination();
            });
            pagination.append(pageItem);
        }
        
        pagination.append(`<li class="paginate_button next" id="next"><a href="#" aria-controls="example2" data-dt-idx="${1+calPageNumber()}">Next</a></li>`);

        $("#previous").click(function() {
            if (pageNumber > 0) {
                pageNumber--;
                updateTable();
                updateButtonPagination();
                updatePagination();
            }
        });

        $("#next").click(function() {
            if (pageNumber < calPageNumber() - 1) {
                pageNumber++;
                updateTable();
                updateButtonPagination();
                updatePagination();
            }
        });
    }
    $('.data_table_length').on('change', function() {
        recordsLength = $(this).val();
        pageNumber = 0; 
        pageNumber = calPageNumber();
        updateTable();
        updateButtonPagination();
        updatePagination();
    });
    $('th.sorting').on('click', function() {
        let $th = $(this);
        let index = $th.index(); 
        let rows = $('table tbody tr').get(); 

        let isAscending = $th.hasClass('sorting_asc');

        rows.sort(function(rowA, rowB) {
            let cellA = $(rowA).children('td').eq(index).text().trim();
            let cellB = $(rowB).children('td').eq(index).text().trim();

            if (cellA < cellB) {
                return isAscending ? 1 : -1;
            } else if (cellA > cellB) {
                return isAscending ? -1 : 1;
            } else {
                return 0;
            }
        });

        $.each(rows, function(index, row) {
            $('table tbody').append(row);
        });

        $('th.sorting').removeClass('sorting_asc sorting_desc');
        if (isAscending) {
            $th.addClass('sorting_desc'); 
        } else {
            $th.addClass('sorting_asc'); 
        }
    });
});
// search()
// sort: search, not search
// update showing 1 to 10 of 57 entries
// update button pagination
// phải sort toàn bộ nội dung trong bảng, không phải sort theo từng trang
// sort theo thứ tự tăng dần, giảm dần