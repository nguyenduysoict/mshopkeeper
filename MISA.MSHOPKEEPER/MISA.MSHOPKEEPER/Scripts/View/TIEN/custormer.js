
/*
 Description: tao custormer để sử dụng được lớp CustormerJS
 CreateBy: NVTIEN
 CreateDate: 02/07/2019
 */
$(document).ready(function () {
    custormer = new CustormerJS();
});

/**
 * Description: Class quản lý các function của khách hàng
 * CreateBy: NVTIEN
 * CreateDate: 02/07/2019
 * */
class CustormerJS {
    constructor() {
        this.LoadData();
        this.initEvent();
        this.datePicker();
        this.layoutReaderTable();
        this.getValueOption();
        this.diagAdd = new Dialog(956, 630,"Thêm mới phiếu nhập kho");
         
    }
    /**
     * Description: lay gia tri cua select option roi goi ham getTiem de hien thi thoi gian
     * CreateBy: NVTIEN (04/07/2019)
     * */
    getValueOption() {
        var me = this;
        $('.select-get-data').change(function () {
            var valueTime = $(this).children("option:selected").val();
            me.getTime(valueTime);
        });
    }

    /**
     * Description: Ham tinh toan va hien thi thoi gian len cac o input
     * CreateBy: NVTIEN 04/07/2019
     * */
    getTime(val) {
        const start = document.querySelector('.from-datetime-getdata input');
        const end = document.querySelector('.to-datetime-getdata input');
        if (val == "today") {
            //tương ứng với giá trị hiện tại
            start.value = moment(new Date()).format("DD/MM/YYYY");
            end.value = moment(new Date()).format("DD/MM/YYYY");
        }
        else if (val == "yesterday") {
            //tương tự với giá trị hôm qua
            start.value = moment(new Date()).add(-1, 'days').format("DD/MM/YYYY");
            end.value = moment(new Date()).add(-1, 'days').format("DD/MM/YYYY");
        }

        else if (val == "thisWeek") {
            //tương tự với giá trị tuần này

            start.value = moment().startOf('isoWeek').format('DD/MM/YYYY');
            end.value = moment().endOf('isoWeek').format('DD/MM/YYYY');
        }

        else if (val == "lastWeek") {
            //tương tự với giá trị tuần trước
            start.value = moment().subtract(1, 'weeks').startOf('isoWeek').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'weeks').endOf('isoWeek').format('DD/MM/YYYY');
        }

        else if (val == "thisMonth") {
            //tuong ung voi giá trị tháng này
            start.value = moment().startOf('month').format('DD/MM/YYYY');
            end.value = moment().endOf('month').format('DD/MM/YYYY');
        }

        else if (val == "lastMonth") {
            //tương ứng với option tháng trước
            start.value = moment().subtract(1, 'months').startOf('month').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
        }

        else if (val == "thisQuarter") {
            //tương ứng với giá trị quý này
            start.value = moment().startOf('quarter').format('DD/MM/YYYY');
            end.value = moment().endOf('quarter').format('DD/MM/YYYY');
        }

        else if (val == "lastQuarter") {
            //tương ứng với giá trị quý trước
            start.value = moment().subtract(1, 'quarters').startOf('quarter').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'quarters').endOf('quarter').format('DD/MM/YYYY');
        }

        else if (val == "6MonthsAgo") {
            //tương ứng với giá trị 6 tháng trước
            start.value = moment().subtract(6, 'months').startOf('month').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'months').endOf('month').format('DD/MM/YYYY');
        }

        else if (val == "thisYear") {
            //tương ứng với giá trị năm nay
            start.value = moment().startOf('year').format('DD/MM/YYYY');
            end.value = moment().endOf('year').format('DD/MM/YYYY');
        }

        else if (val == "lastYear") {
            //tương ứng với giá trị năm trước
            start.value = moment().subtract(1, 'years').startOf('year').format('DD/MM/YYYY');
            end.value = moment().subtract(1, 'years').endOf('year').format('DD/MM/YYYY');
        }

        else {
            start.value = '';
            end.value = '';
        }
    }

    /**
     * Description: Fix 2 bangr voi nhau
     * CreateBy: NVTIEN
     * CreateDate: 03/07/2019
     * */
    layoutReaderTable() {
        var tableContainer = $('.grid');
        $.each(tableContainer, function (index, element) {
            var tableHeader = $(element).find('table.thead-table-grid');
            var tableBody = $(element).find('table.tbody-table-grid');
            var th = tableHeader.find('thead th');
            var tr = tableBody.find('tbody tr').first();
            var firstRow = tr.children('td');
            //debugger
            $.each(firstRow, function (i, e) {
                $(e).css('min-width', $(th[i]).outerWidth());
                $(e).css('max-width', $(th[i]).outerWidth());
            });
        });
        var tableDialogContainer = $('.detail-product-dialogAdd');
        $.each(tableDialogContainer, function (index, item) {
            //debugger
            var tableDialogHeader = $(item).find('table.thead-detail-product');
            var tableDialogBody = $(item).find('table.tbody-detail-product');
            var thDialog = tableDialogHeader.find('thead th');
            var trDialog = tableDialogBody.find('tbody tr').first();
            var firstDialogRow = trDialog.children('td');
            //debugger
            $.each(firstDialogRow, function (i, eDialog) {
                $(eDialog).css('min-width', $(thDialog[i]).outerWidth());
                $(eDialog).css('max-width', $(thDialog[i]).outerWidth());
            });
        });
    }

    /**
     * Description: Gọi hàm datepicker
     * CreateBy: NVTIEN
     * CreateDate: 03/07/2019
     * */
    datePicker() {
        $(".input-get-data").datepicker({
            dateFormat: "dd/mm/yy",
            showOn: "button",
            buttonImage: "/Content/Icons/calendar.png",
            buttonImageOnly: true,
            monthNames: ["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", 'Tháng Sáu', "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            showOtherMonths: true,
            selectOtherMonths: true,
            firstDay: "1",
            //currentText: "Hôm nay",
            //showButtonPanel: true
        });
        this.getTime("thisMonth");
    }
    /**
     * Description: Gán các event trong trang
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    initEvent() {
        $(".grid").on("click", "tbody tr", { jsObject: this }, this.setRowSelected);
        $(".grid-detail").on("click", "tbody tr", { jsObject: this }, this.setRowSelected);
        $(".grid").on("contextmenu", ".table-body-grid", this.setContextMenu);
        $(document).on("click", ".content", this.unClick);
        $(document).on("click", ".menu", this.unClick);
        $(document).on("click", ".header", this.unClick);
        $(document).on("click", ".btnAdd", this.ShowDialog.bind(this));
        $(document).on("click", ".timepicker-vouchers-dialog", this.timePicker);
        $(document).on("click", ".check-orther", this.checkOtherDialog);
        $(document).on("click", ".check-from-store", this.checkFromStoreDialog);
        $(document).on("click", ".collapse-dialog", this.collapseDialog);
        $(document).on("click", ".extent-dialog", this.extendDialog);
    }
    /**
     * Description: sự kiện thu nhỏ màn hình dialog
     * CreateBy:NVTIEN (08/07/2019)
     * */
    collapseDialog() {
        $(".purpose-dialog-add").addClass('hide');
        $(".purpose-dialog-add").removeClass('show');
        $(".info-dialog-add").addClass('hide');
        $(".info-dialog-add").removeClass('show');
        $(this).removeClass('show');
        $(".collapse-dialog").addClass('hide');
       
        $(".extent-dialog").addClass('show');
        $(".extent-dialog").removeClass('hide');
        $(".body-product-dialogAdd").addClass('heightCustormInfo');
    }
    /**
     * Description: sự kiện mở rộng màn hình dialog
     * CreateBy: NVTIEN (08/07/2019)
     * */
    extendDialog() {
        $(this).removeClass('show');
        $(".extent-dialog").addClass('hide');
        $(".collapse-dialog").addClass('show');
        $(".collapse-dialog").removeClass('hide');
        $(".purpose-dialog-add").addClass('show');
        $(".info-dialog-add").addClass('show');
        $(".body-product-dialogAdd").removeClass('heightCustormInfo');
    }



    /**
     * Description: sự kiện check ô khác trong main dialog
     * CreateBy: NVTIEN( 08/07/2019 )
     * 
     * */
    checkOtherDialog() {
        //debugger
        $(".check-orther").removeClass('checkGrayOther');
        $(".check-from-store").removeClass('checkBlueOther');
        $(".button-purpose-dialog").css('display', 'none');

    }

    /**
     * Description: sự kiện check ô Điều chuyển từ của hàng khác trong main dialog
     * CreateBy: NVTIEN( 08/07/2019 )
     * 
     * */
    checkFromStoreDialog() {
        $(".check-from-store").addClass('checkBlueOther');
        $(".check-orther").removeClass('checkBlueOther');
        $(".check-orther").addClass('checkGrayOther');
        $(".button-purpose-dialog").css('display', 'block');
    }

    /**
     * Description: envent click icon timepicker
     * CreateBy: NVTIEN
     * CreateDate: 06/07/2019
     * */
    timePicker() {
        $("#timepicker-dialog-add").timepicker({ 'timeFormat': 'H:i', 'step': 15 });
        $("#timepicker-dialog-add").focus().timepicker({ 'timeFormat': 'H:i', 'step': 15 });

    }


    /**
     * Description: event click hiển thị dialog
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    ShowDialog() {
        //debugger
        alert('a');
    }

    /**
     * Description: event khi click ra khỏi vùng sẽ biến mất
     * CreateBy: NVTIEN
     * CreateDate:02/07/2019
     * */
    unClick() {
        $(".context-menu").fadeOut('fast');
    }

     /**
     * Description: Gán sự kiện khi click vào từng hàng trong table
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    setContextMenu() {
        //debugger
        event.preventDefault();
        var Left = event.pageX;
        var Top = event.pageY;
        if (Left > 1500) {
            $(".context-menu").css({ "display": "block", 'top': Top + 15, 'left': Left - 150 });
        }
        else if (Top > 900) {
            $(".context-menu").css({ "display": "block", 'top': Top - 200, 'left': Left + 10 });
        }
        else {
            $(".context-menu").css({ "display": "block", 'top': Top + 15, 'left': Left + 10 });
        }
    }

    /**
     * Description: Gán sự kiện khi click vào từng hàng trong table
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    setRowSelected(sender) {
        if (event.shiftKey || event.ctrlKey) {
            $(this).toggleClass("row-selected");
        }
        else {
            $(this).siblings().removeClass("row-selected");
            $(this).addClass("row-selected");
           
        }
        sender.data["jsObject"].SetDisableButtonToolbar();
    }

    /**
     * Description: Thêm disable vào các button khi chưa click vào tr
     * CreateBy: NVTIEN
     * CreateDate: 03/07/2019
     * */
    SetDisableButtonToolbar() {
        //debugger
        var rowselected = this.getRowSelect();
        if (!rowselected) {
            //debugger
            $('.btnDuplicate').attr('disabled', 'disabled');
            $('.btnEdit').attr('disabled', 'disabled');
            $('.btnDelete').attr('disabled', 'disabled');
        } else {
            $('.btnDuplicate').removeAttr('disabled');
            $('.btnEdit').removeAttr('disabled');
            $('.btnDelete').removeAttr('disabled');
        }
    }

    /**
     * Description: Tìm bản ghi khi lcik vao tr
     * CreateBy: NVTIEN
     * CreateDate: 03/07/2019
     * */
    getRowSelect() {
        //debugger
        var rowSelected = $(".row-selected");
        if (!rowSelected.length) {
            return null;
        }
        var recordID = rowSelected.attr("recordID");
        return recordID;
    }

    /**
     * Description: Load dữ liệu
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    LoadData() {
        var me = this;
        me.Data = getData();
        $.each(this.Data, function (index, item) {

            var rowHTML = '<tr recordID=' + item.SKUCode + '>'
                + '<td>' + '<div class="check"></div>' + '</td>'
                + '<td class="text-center">' + item.SKUCode + '</td>'
                + '<td class="text-left">' + item.ProductName + '</td>'
                + '<td class="text-left">' + item.GroupProduct + '</td>'
                + '<td class="text-right">' + item.Unit + '</td>'
                + '<td  class="text-left">' + item.BuyProduct + '</td>'
                + '<td class="text-left tr-voucger-tableGrid"> ' + item.Status + '</td>'
                + '</tr>';
            $(".tbody-table-grid tbody").append(rowHTML);

            if (index == 0) {
                $("tbody tr:first").addClass("row-selected");
            }
        });
        me.SetDisableButtonToolbar();
    }
}

/**
 * Description: Gán dữ liệu
 * CreateBy: NVTIEN
 * CreateDate: 02/07/2019
 * */
function getData() {
    var custormer = [];
    for (var i = 10; i < 50; i++) {
        var cus = {
            SKUCode: "04/07/2019" ,
            ProductName: "NK0000"+i,
            GroupProduct: "Gen Việt",
            Unit: "300.000 ",
            BuyProduct: "",
            Status: "Phiếu nhập hàng tiền mặt"

        }
        custormer.push(cus);
    }
    return custormer;
}
