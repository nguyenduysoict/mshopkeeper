
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
        this.diagAdd = new DialogImport(956, 630, "Thêm mới phiếu nhập kho", '.dialogAdd', 'closeDialogAdd');
        this.dialogObject = new DialogImport(800, 450, "Chọn đối tượng", '.dialogObject', 'closeDialogObject');
        this.dialogProduct = new DialogImport(960, 720, "Chọn hàng hóa", '.dialogProduct', 'closeDialogProduct');
        this.dialogTickProduct = new DialogImport(960, 720, "Hàng hóa đã chọn", '.dialogTickProduct', 'closeTickProduct');
        this.dialogPurpose = new DialogImport(700, 550, "Chọn chứng từ xuất kho điều chuyển", '.dialogPurpose', 'closeDialogPurpose');
        this.confirmCancelAdd = new DialogImport(400, 156, "Dữ liệu chưa được lưu", '.confirmCancelAdd', 'closeConfirmCancel ');
        this.tooltipDialog();
    }

    /**
     * Description: xử lýcủa các tooltip trong dialog
     * CreateBy: 11/7/2019
     * */
    tooltipDialog() {
        $(".ui-dialog-titlebar-close").tooltip({ content: "Đóng" });


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


        var tableFormPeople = $('.form-down-people');
        $.each(tableFormPeople, function (index, elementFormPeople) {
            var tableHeaderObject = $(elementFormPeople).find('table.theader-down-people');
            var tableBodyObject = $(elementFormPeople).find('table.tbody-down-people');
            var thObject = tableHeaderObject.find('thead th');
            var trObject = tableBodyObject.find('tbody tr').first();
            var firstRowObject = trObject.children('td');
            //debugger
            $.each(firstRowObject, function (iObject, eObject) {
                $(eObject).css('width', $(thObject[iObject]).outerWidth());
            });
        });
        var tableFormPeople = $('.form-down-detailPeople');
        $.each(tableFormPeople, function (index, elementFormPeople) {
            var tableHeaderObject = $(elementFormPeople).find('table.theader-down-detailPeople');
            var tableBodyObject = $(elementFormPeople).find('table.tbody-down-detailPeople');
            var thObject = tableHeaderObject.find('thead th');
            var trObject = tableBodyObject.find('tbody tr').first();
            var firstRowObject = trObject.children('td');
            //debugger
            $.each(firstRowObject, function (iObject, eObject) {
                $(eObject).css('width', $(thObject[iObject]).outerWidth());
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

        $(document).on("click", ".btnAdd", this.ShowDialogAdd.bind(this));
        $(document).on("click", "#btn-dialogPurpose", this.ShowDialogPurpose.bind(this));
        $(document).on("click", "#search-people-dialog", this.ShowDialogObject.bind(this));
        $(document).on("click", ".search-detail-product", this.ShowDialogProduct.bind(this));

        $(document).on("click", ".btnCancelPeople", this.cancelPeople.bind(this));
        $(document).on("click", ".btnCancelProduct", this.cancelProduct.bind(this));
        $(document).on("click", ".btnCancelPurpose", this.cancelPurpose.bind(this));

        $(document).on("click", ".newClose-dialog-add", this.confirmCancelAdd.bind(this));
        $(document).on("click", ".closeDialogAdd .ui-dialog-titlebar-close", this.closeCancelAdd.bind(this));
        $(document).on("click", ".btnNotConfirm", this.notConfirmAdd.bind(this));
        $(document).on("click", ".btnCancelConfirm", this.cancelConfirmAdd.bind(this));

        $(".form-down-people").on("click", "tbody tr", this.selectedFormDown);
        $(".grid").on("click", "tbody tr", { jsObject: this }, this.setRowSelected);
        $(".grid-detail").on("click", "tbody tr", { jsObject: this }, this.setRowSelected);

        $(".grid").on("contextmenu", "#body-tbody-tableGrid", this.setContextMenu);
        $(".dialogAdd").on("contextmenu", ".body-product-dialogAdd", this.setContextMenuDialog);

        $(document).on("click", ".content", this.unClick);
        $(document).on("click", ".menu", this.unClick);
        $(document).on("click", ".header", this.unClick);
        $(document).on("click", "body", this.unClick);
        $(document).on("click", "button.ui-button.ui-corner-all.ui-widget.ui-button-icon-only.ui-dialog-titlebar-close", this.unClick);
        $(document).on("click", ".dialogAdd", this.unClick);

        $(document).on("click", ".timepicker-vouchers-dialog", this.timePicker);

        $(document).on("click", ".check-orther", this.checkOtherDialog);
        $(document).on("click", ".check-from-store", this.checkFromStoreDialog);

        $(document).on("click", ".collapse-dialog", this.collapseDialog);
        $(document).on("click", ".extent-dialog", this.extendDialog);

        $(document).on("click", ".tbody-detail-product", this.changColor);

        $(".input-people-dialog").on("click", "#down-people-dialog", this.FormDownPeople);
        $(".sku-code-body").on("click", "#detail-down-dialogAdd", this.FormDownDetail);

        $('body').mousedown(function () {
            $('.form-down-detailPeople').hide();
            $('.form-down-people').hide();


        });
       

        $(document).on("click", ".check-all-grid", this.checkAll);
        $(document).on("click", ".uncheck:visible", this.checkOrther);

        $(document).on("click", ".button-filter-tableGrid", this.diaplayMenuItem);
    }


    diaplayMenuItem() {
        //debugger
        var button = $(this).attr("button");
        if (button == 1) {
            $(".menu-item").css({ "top": "167px", "left": "39px" });
            $(".menu-item").toggleClass("show-hide");
            $(".menu-item-two").removeClass("show-hide");
        }
        if (button == 2) {
            $(".menu-item-two").css({ "top": "167px", "left": "191px" });
            $(".menu-item-two").toggleClass("show-hide");
            $(".menu-item").removeClass("show-hide");
        }
        if (button == 3) {
            $(".menu-item-two").css({ "top": "167px", "left": "342px" });
            $(".menu-item-two").toggleClass("show-hide");
            $(".menu-item").removeClass("show-hide");
        }
        if (button == 4) {
            $(".menu-item").css({ "top": "167px", "left": "492px" });
            $(".menu-item").toggleClass("show-hide");
            $(".menu-item-two").removeClass("show-hide");
        }
        if (button == 5) {
            $(".menu-item-two").css({ "top": "167px", "left": "643px" });
            $(".menu-item-two").toggleClass("show-hide");
            $(".menu-item").removeClass("show-hide");
        }
        //debugger
    }

    /**
     * Description: sự kiện hủy bỏ dialog thêm phiếu nhập mới
     * CreateBy: NVTIEN 11/07/2019
     * */
    notConfirmAdd() {
        this.confirmCancelAdd.close();
        this.diagAdd.close();
    }

    /**
     * Description: sự kiện hủy bỏ dialog dữ liệu chưa được lưu
     * CreateBy: NVTIEN 11/07/2019
     * */
    cancelConfirmAdd() {
        this.confirmCancelAdd.close();
    }

    /**
     * Description: hiển thị màu nền khi di chuyển vào form khi click mũi tên xuông ở dialog thêm phiếu nhập kho
     * CreateBy: NVTIEN 11/07/2019
     * */
    selectedFormDown() {
        $(this).siblings().removeClass("row-selected-down");
        $(this).addClass("row-selected-down");
    }


    /**
     * Description: Sự kiện hiên ra khi lick vào mũi tên trỏ xuông ở dialog thêm phiếu nhập kho
     * CreateBy: NVTIEN
     * CreateDate: 10/07/2019
     * */
    FormDownPeople() {
        //debugger
        event.stopPropagation();
        $(".form-down-people").css('display', 'unset');
    }

    FormDownDetail() {
        //debugger
        event.stopPropagation();
        $(".form-down-detailPeople").css('display', 'unset');
        $('.form-down-detailPeople').position({
            my: "left-83 top+17",
            of: ".sku-code-body",
        })
    }

    /**
     * Description: sự kiện khi click vào 1 hàng trong bảng chi tiết sản phầm trong dialog
     * CreateBy: NVTIEN
     * CreateDate: 09/07/2019
     * */
    changColor() {
        var input = $(this);
        if (input.parent().hasClass("place-holder-SKU")) {
            input.attr("placeholder", "Tìm  mã hoặc tên");
        }
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
     * Description: hàm hiển thị dialog của form thêm phiếu nhập kho
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    ShowDialogAdd() {
        //debugger
        this.diagAdd.show();
        $(".newSave-dialog-add").tooltip({ content: "Ctrl+S" });
    }
    /**
     * Description: click để đóng dialog thêm phiếu nhập kho
     * CreateBy: NVTIEN
     * CreateDate:10/07/2019
     * */
    confirmCancelAdd() {
        //debugger
        this.confirmCancelAdd.show();
    }
    closeCancelAdd() {
        //debugger
        this.confirmCancelAdd.show();
    }

    /**
     * Description: Hàm hiển thị dialog của form chọn chứng từ xuất kho điều chuyển
     * CreateBy: NVTIEN 
     * CreateDate: 10/07/2019
     * */
    ShowDialogPurpose() {
        this.dialogPurpose.show();
    }

    /**
    * Description: click để đóng dialog chọn đối tượng
    * CreateBy: NVTIEN
    * CreateDate:10/07/2019
    * */
    cancelPurpose() {
        this.dialogPurpose.close();
    }

    /**
     * Description: Hàm hiển thị dialog của form chọn đối tượng
     * CreateBy: NVTIEN 
     * CreateDate: 10/07/2019
     * */
    ShowDialogObject() {
        this.dialogObject.show();
    }

    /**
     * Description: click để đóng dialog chọn đối tượng
     * CreateBy: NVTIEN
     * CreateDate:10/07/2019
     * */
    cancelPeople() {
        debugger
        this.dialogObject.close();
    }

    /**
     * Description: Hàm hiển thị dialog của form chọn hàng hóa
     * CreateBy: NVTIEN 
     * CreateDate: 10/07/2019
     * */
    ShowDialogProduct() {
        this.dialogProduct.show();
    }

    /**
  * Description: click để đóng dialog chọn hàng hóa
  * CreateBy: NVTIEN
  * CreateDate:10/07/2019
  * */
    cancelProduct() {
        this.dialogProduct.close();
    }

    /**
     * Description: event khi click ra khỏi vùng sẽ biến mất
     * CreateBy: NVTIEN
     * CreateDate:02/07/2019
     * */
    unClick() {
        //debugger
        $(".context-menu").fadeOut('fast');
        $(".context-menu").hide();
        //$(".form-down-people").removeClass("show-hide");
        $(".context-menu-dialogAdd").fadeOut('fast');
        //xử lí click ra khỏi div ở trong dialog thêm phiếu chi tiết ở img down
        if ($(".form-down-people").is(':visible')) {
            $('.form-down-people').css('display', 'none');
        }
        if ($(".form-down-detailPeople").is(':visible')) {
            $('.form-down-detailPeople').css('display', 'none');
        }


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
     * Description: context menu trong dialog
     * CreateBy: NVTIEN
     * CreateDate: 09/07/2019
     * */
    setContextMenuDialog() {
        event.preventDefault();
        var leftDialog = event.pageX;
        var topDialog = event.pageY;

        //alert(leftDialog + '+' + topDialog);

        if (leftDialog > 1200) {
            $(".context-menu-dialogAdd").css({ "display": "block", 'top': topDialog - 200, 'left': leftDialog - 600, 'position': 'absolute' });

        }
        if (topDialog > 700) {
            $(".context-menu-dialogAdd").css({ "display": "block", 'top': topDialog - 280, 'left': leftDialog - 500, 'position': 'absolute' });

        }
        if (leftDialog > 1200 && topDialog > 600) {
            $(".context-menu-dialogAdd").css({ "display": "block", 'top': topDialog - 280, 'left': leftDialog - 600, 'position': 'absolute' });

        }
        else {
            $(".context-menu-dialogAdd").css({ "display": "block", 'top': topDialog - 200, 'left': leftDialog - 500, 'position': 'absolute' });
        }
    }

    /**
     * Description: Gán sự kiện khi click vào từng hàng trong table
     * CreateBy: NVTIEN
     * CreateDate: 02/07/2019
     * */
    setRowSelected(event) {
        event.preventDefault();
        debugger
        var me = $(this);
       
        var check = me.find($(".check"));
        //if ($(event.target).is(".uncheck.check")) {
        //    me.removeClass("row-selected");
        //}
        // nếu click vào ô check box
        if ($(event.target).is(".uncheck.check")) {
            me.removeClass("row-selected");
        }
        else if($(event.taget).is(check)) {
            me.addClass("row-selectd");
        }
        //nếu giữ shift hoặc ctrl
        if (event.shiftKey || event.ctrlKey) {
            $(this).toggleClass("row-selected");
        }


        else {
            $(this).siblings().removeClass("row-selected");
            $(this).addClass("row-selected");

        }
        event.data["jsObject"].SetDisableButtonToolbar();
    }



    /**
     * Description: Thêm disable vào các button khi chưa click vào tr
     * CreateBy: NVTIEN
     * CreateDate: 03/07/2019
     * */
    SetDisableButtonToolbar() {
        //debugger
        var rowselected = this.getRowSelect();
        //var rowchecked = this.checkAll();
        if (!rowselected) {
            //debugger
            $('.btnDuplicate').attr('disabled', 'disabled');
            $('.btnEdit').attr('disabled', 'disabled');
            $('.btnDelete').attr('disabled', 'disabled');
            $('.btnRefesh').attr('disabled', 'disabled');

        } else {
            $('.btnDuplicate').removeAttr('disabled');
            $('.btnEdit').removeAttr('disabled');
            $('.btnDelete').removeAttr('disabled');
            $('.btnRefesh').removeAttr('disabled');
        }
    }

    /**
     * Description: Sự kiện check tất các các ô bõ hình ảnh
     * CreateBy: NVTIEN
     * CreateDate: 12/07/2019
     * */
    checkAll() {
        debugger
        var trTbody = "tbody#body-tbody-tableGrid tr";
        $(trTbody).toggleClass("row-selected");
        $("#body-tbody-tableGrid tr:first-child").toggleClass("row-selected");
        $(this).toggleClass("check");
        $(".uncheck").toggleClass("check");

    }

    /**
     * Description: SỰ kiện check từng ô trong danh mục nhập kho
     * CreateBy: NVTIEN
     * CreateDate: 12/07/2019
     * */
    checkOrther() {
        //debugger
        $(this).parent().parent().addClass("row-selected");
        $(this).toggleClass("check");
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
                + '<td>' + '<div class="uncheck"></div>' + '</td>'
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
            SKUCode: "04/07/2019",
            ProductName: "NK0000" + i,
            GroupProduct: "Gen Việt",
            Unit: "300.000 ",
            BuyProduct: "",
            Status: "Phiếu nhập hàng tiền mặt"

        }
        custormer.push(cus);
    }
    return custormer;
}
