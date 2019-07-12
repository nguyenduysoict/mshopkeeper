$(document).ready(function () {

    // Hiển thị datepicker ngày bắt đầu lấy dữ liệu thu/chi tiền mặt khi click icon calendar
    // Create by NMDuy (10/7/2019)

    $(".get-data-from-day-icon").click(function () {
        $("#get-data-from-day-input").focus();
    });

    // Gán giá trị được chọn cho ngày bắt đầu lấy dữ liệu thu/chi tiền mặt

    $("#get-data-from-day-input").datepicker({
        onSelect: function (dateText) {
            var date = $(this).val();
            $("#get-data-from-day-input").val(receiptJS.formatDate(date));
        }
    });

    // Hiển thị datepicker ngày kết thúc lấy dữ liệu thu/chi tiền mặt khi click icon calendar

    $(".get-data-to-day-icon").click(function () {
        $("#get-data-to-day-input").focus();
    });

    // Gán giá trị được chọn cho ngày kết thúc lấy dữ liệu thu/chi tiền mặt

    $("#get-data-to-day-input").datepicker({
        onSelect: function (dateText) {
            var date = $(this).val();
            $("#get-data-to-day-input").val(receiptJS.formatDate(date));
        }
    });

    // Hiển thị datepicker ngày thu chứng từ khi click icon calendar

    $('.get-receipt-day-icon').click(function () {
        $("#get-receipt-day-input").focus();
    });

    // Gán giá trị được chọn cho ngày thu chứng từ, custom vị trí hiển thị calendar

    $("#get-receipt-day-input").datepicker({
        onSelect: function (dateText) {
            var date = $(this).val();
            $("#get-receipt-day-input").val(receiptJS.formatDate(date));
        },

        beforeShow: function (input, inst) {
            var inputPosition = $("#get-receipt-day-input").offset();
            setTimeout(function () {
                inst.dpDiv.css({
                    top: inputPosition.top + 34,
                    left: inputPosition.left - 85
                });
            }, 0);
        }
    });

    // Hiển thị datepicker ngày thu nợ khi click icon calendar

    $('.repayment-day-icon').click(function () {
        $("#repayment-day-input").focus();
    });

    // Gán giá trị được chọn cho ngày thu nợ

    $("#repayment-day-input").datepicker({
        onSelect: function (dateText) {
            var date = $(this).val();
            $("#repayment-day-input").val(receiptJS.formatDate(date));
        }
    });
})