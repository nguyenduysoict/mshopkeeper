/*
 * Description: Js xử lý các tác vụ của yêu cầu chi tiền
 * Create by: NXHUNG(4/7/2019) 
 *
 * */
$(document).ready(function () {
    payout = new PayOutJS();
    
});
/*
 * Description: Class xử lý các chức năng của yêu cầu chi tiền
 * Create by: NXHUNG(4/7/2019) 
 *
 * */

class PayOutJS {
    constructor() {
        this.LoadData();
        this.initEvent();
        this.getValueOption();
        this.enventTarget();
        this.DialogJS = new Dialog(910, "Thêm mới phiếu chi", ".dialogPayout","set-dialog");
        this.DialogChooseRepayment = new Dialog(842, "Chọn hóa đơn trả nợ", ".dialogChooseRepayment", "set-dialog-Choosepay");
        this.MsgClose = new Dialog(400, "Dữ liệu chưa được lưu", ".msg-close", "msg-close");
        this.MsgSave = new Dialog(400, "MShopKeeper", ".msg-save", "msg-save");
        this.MsgPay = new Dialog(400, "MShopKeeper", ".msg-pay", "msg-pay");
        this.datePicker(".input-get-data");
        this.datePicker(".input-date");
        this.datePicker(".input-day-spent");
        this.datePicker(".input-repayment-date");
        this.tooltipDialog();

    }
    /*
     * Description: Gán sự kiện trong trang
     * Create by: NXHUNG(4/7/2019) 
     *
     * */
    initEvent() {
        $(document).on("click", ".divbody .Row", this.setRowSelected);
        $(document).on("click", ".grid-brand tbody tr", this.setRowSelectedGridBrand);
        $(".a-pay").click({ mode: 5 }, this.aOnClick.bind(this));
        $(".choose-repayment").click({ mode: 6}, this.aOnClick.bind(this));
        $(document).on("click", ".tab-documents", { mode: 1 }, this.tabs);
        $(document).on("click", ".tab-detail", { mode: 2 }, this.tabs);
        $(document).on("click", ".cls-other", { mode: 3 }, this.tabs);
        $(document).on("click", ".cls-pay", { mode: 4 }, this.tabs);
        $(document).on("click", "#btnClose",{ mode: 10 }, this.eventShowMsg.bind(this));
        $(document).on("click", ".m-close", { mode: 10 },this.eventShowMsg.bind(this));
        $(document).on("click", "#btnSave", { mode: 11 },this.eventShowMsg.bind(this));
        $(document).on("click", ".msg-confirm-close", { mode: 7 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".btnNotConfirm", { mode: 8 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".btnCancelConfirm", { mode: 7 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".m-close-choosepay", { mode: 9 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".cancel-chooseRepayment", { mode: 9 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".btnAgree", { mode: 12 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".msg-confirm-save", { mode: 12 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".msg-confirm-pay", { mode: 14 }, this.eventCloseMsg.bind(this));
        $(document).on("click", ".pay-chooseRepayment", { mode: 13 }, this.eventShowMsg.bind(this));
        $(".name-login-header").click(function () {
            $(".menu-login-header").toggleClass('show-hide');
        });
        $("#btnAdd").click(function () {
            $(".cb-addnew").toggleClass('show-hide');
        });
        $(".dropdown-grid-obj").click(function () {
            $(".grid-obj").toggleClass('show-hide');
        });
        $(".clsBrand").click(function () {
            $(".grid-brand").toggleClass('show-hide');
        });
      
    }
    /*
     * Description: Load dữ liệu
     * Create by: NXHUNG(4/7/2019) 
     *
     * */

    LoadData() {
        var me = this;
        me.Data = getData();
        $.each(this.Data, function (index, item) {
            var rowHTML = '<div class="Row">'
                + '       <div class="Cell Cell1">                                  '
                + '           <div class="mcheck uncheck text-align-center"></div>         '
                + '       </div>                                                    '
                + '       <div class="Cell Cell2">                                  '
                + '           <div class="text-align-center">' + item.Date + '</div>       '
                + '       </div>                                                    '
                + '       <div class="Cell Cell2">                                  '
                + '           <div class="text-align-left"><a>' + item.VoucherCode + '</a></div>            '
                + '       </div>                                                    '
                + '       <div class="Cell Cell3">                                  '
                + '           <div class="text-align-left">' + item.VoucherCategory + '</div> '
                + '       </div>                                                    '
                + '       <div class="Cell Cell4">                                  '
                + '           <div class="text-align-right">' + item.Total + '</div>        '
                + '       </div>                                                    '
                + '       <div class="Cell Cell5">                                  '
                + '           <div class="text-align-left">' + item.Object + '</div>   '
                + '       </div>                                                    '
                + '       <div class="Cell">                                        '
                + '           <div class="text-align-left">' + item.Reason + '</div>             '
                + '       </div>                                                    '
                + '       </div>                                                    ';
            $(".divbody").append(rowHTML);
            if (index == 0) {
                $(".divbody .Row:first").addClass("row-selected");
            }
        });
    }
    /**
     * Description: Gọi hàm datepicker
     * Create by: NXHUNG(4/7/2019)
     * 
     * */
    datePicker(selector) {
        $(selector).datepicker({
            dateFormat: "dd/mm/yy",
            showOn: "button",
            buttonImage: "/Content/Icons/calendar.png",
            buttonImageOnly: true,
            monthNames: ["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư", "Tháng Năm", 'Tháng Sáu', "Tháng Bảy", "Tháng Tám", "Tháng Chín", "Tháng Mười", "Tháng Mười Một", "Tháng Mười Hai"],
            dayNamesMin: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"],
            showOtherMonths: true,
            selectOtherMonths: true
        });
    }
    /*
     * Description: Gán sự kiện khi click vào từng dòng trong bảng quỹ tiền
     * Create by: NXHUNG(4/7/2019) 
     *
     * */
    setRowSelected() {
        if (event.shiftKey || event.ctrlKey) {
            $(this).toggleClass("row-selected");
        }
        else {
            $(this).siblings().removeClass("row-selected");
            $(this).addClass("row-selected");

        }
        //sender.data["jsObject"].SetDisableButtonToolbar();
    }
    /**
     *Description: Xử lý sự kiện hiển thị dialog
     * CreateBy: NXHUNG
     * CreateDate: 05/07/2019
     * */
    aOnClick(sender) {
        var mode = sender.data["mode"];
        if (mode == 5) {
            var iconclose = '<div class="icon-close-dialog m-close" title="Đóng"></div>';
            $(".set-dialog .ui-widget-header").append(iconclose);
            this.DialogJS.show();
        }
        if (mode == 6) {
            var iconclose = '<div class="icon-close-dialog m-close-choosepay" title="Đóng"></div>';
            $(".set-dialog-Choosepay .ui-widget-header").append(iconclose);
            this.DialogChooseRepayment.show();
        }
    }
    /*
     * Description: Gán sự kiện tab trong form dialog
     * Create by: NXHUNG(8/7/2019) 
     *
     * */
    tabs(sender) {
        var mode = sender.data["mode"];
        if (mode == 1) {
            $("#tabs-1").removeClass('show-hide');
            $("#tabs-2").addClass('show-hide');
            $(".tab-detail").removeClass('border-bottom-texttab');
            $(".tab-documents").addClass('border-bottom-texttab');
            $(".tab-documents span").css("color", "#026b97");
            $(".tab-detail span").css("color", "#737373");
        }
        if (mode == 2) {
            $("#tabs-2").removeClass('show-hide');
            $("#tabs-1").addClass('show-hide');
            $(".tab-documents").removeClass('border-bottom-texttab');
            $(".tab-detail").addClass('border-bottom-texttab');
            $(".tab-detail span").css("color", "#026b97");
            $(".tab-documents span").css("color", "#737373");
        }
        if (mode == 3) {
            $(".cls-other").removeClass("icon-radio-false");
            $(".cls-other").addClass("icon-radio-true");
            $(".cls-pay").removeClass("icon-radio-true");
            $(".cls-pay").addClass("icon-radio-false");
            $(".choose-repayment").css("display", "none");
            $(".form-pay").css("display", "none");
            $(".form-other").css("display", "block");
        }
        if (mode == 4) {
            $(".cls-pay").removeClass("icon-radio-false");
            $(".cls-pay").addClass("icon-radio-true");
            $(".cls-other").removeClass("icon-radio-true");
            $(".cls-other").addClass("icon-radio-false");
            $(".choose-repayment").css("display", "block");
            $(".form-other").css("display", "none");
            $(".form-pay").css("display", "block");
        }
    }
    /*
     * Description: Gán sự kiện khi click vào từng dòng trong bảng nhà cung cấp
     * Create by: NXHUNG(10/7/2019) 
     *
     * */
    setRowSelectedGridBrand() {
        $(this).siblings().removeClass("row-select-gridbrand");
        $(this).addClass("row-select-gridbrand");
    }
    /**
     * Description: lay gia tri cua select option roi goi ham getTiem de hien thi thoi gian
     * CreateBy: NXHUNG 10/07/2019
     * 
     * */
    getValueOption() {
        var me = this;
        this.getTime("thisMonth");
        $('.select-get-data').change(function () {
            var valueTime = $(this).children("option:selected").val();
            me.getTime(valueTime);
        });
    }

    /**
     * Description: Ham tinh toan va hien thi thoi gian len cac o input
     * CreateBy: NXHUNG 10/07/2019
     * 
     * */
    getTime(val) {
        const start = document.querySelector('.start-date input');
        const end = document.querySelector('.end-date input');
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
     * Description: của các tooltip trong dialog
     * CreateBy: 12/7/2019
     * */
    tooltipDialog() {
        $(".icon-close-dialog").tooltip();
    }
    /*
     * Description: Gán sự kiện đóng thành phần khi click ra ngoài vùng đang xử lý thành phần đó
     * Create by: NXHUNG(12/7/2019) 
     *
     * */
    enventTarget() {
        $(document).mouseup(function (e) {
            var containerCbaddnew = $("#btnAdd");

            // if the target of the click isn't the container nor a descendant of the container
            if (!containerCbaddnew.is(e.target) && containerCbaddnew.has(e.target).length === 0) {
                $(".cb-addnew").removeClass('show-hide');
            }
            var containerMenuheader = $(".name-login-header");

            // if the target of the click isn't the container nor a descendant of the container
            if (!containerMenuheader.is(e.target) && containerMenuheader.has(e.target).length === 0) {
                $(".menu-login-header").removeClass('show-hide');
            }
            var containerGridbrand = $(".clsBrand");

            // if the target of the click isn't the container nor a descendant of the container
            if (!containerGridbrand.is(e.target) && containerGridbrand.has(e.target).length === 0) {
                $(".grid-brand").removeClass('show-hide');
            }
            var containerGridobj = $(".dropdown-grid-obj");

            // if the target of the click isn't the container nor a descendant of the container
            if (!containerGridbrand.is(e.target) && containerGridbrand.has(e.target).length === 0) {
                $(".grid-obj").removeClass('show-hide');
            }
        });
    }
    /*
     * Description: hiển thị popup hỏi người dùng khi đóng form-dialog
     * Create by: NXHUNG(12/7/2019) 
     *
     * */
    eventShowMsg(sender) {
        var mode = sender.data["mode"];
        if (mode==10) {
            var iconclose = '<div class="icon-close-dialog msg-confirm-close" title="Đóng"></div>';
            $(".msg-close .ui-widget-header").append(iconclose);
            this.MsgClose.show();
        }
        if (mode == 11) {
            var iconclose = '<div class="icon-close-dialog msg-confirm-save" title="Đóng"></div>';
            $(".msg-save .ui-widget-header").append(iconclose);
            this.MsgSave.show();
        }
        if (mode == 13) {
            var iconclose = '<div class="icon-close-dialog msg-confirm-pay" title="Đóng"></div>';
            $(".msg-pay .ui-widget-header").append(iconclose);
            this.MsgPay.show();
        }

    }
    eventCloseMsg(sender) {
        var mode = sender.data["mode"];
        if (mode == 7) {
            this.MsgClose.close();
        }
        if (mode == 8) {
            this.MsgClose.close();
            this.DialogJS.close();
        }
        if (mode == 9) {
            this.DialogChooseRepayment.close();
        }
        if (mode == 12) {
            this.MsgSave.close();
        }
    }
}

/*
 * Description: Hàm tạo dữ liệu giả để xử lý
 * Create by: NXHUNG(4/7/2019) 
 *
 * */
function getData() {
    var paybills = [];
    for (var i = 10; i < 50; i++) {
        var paybill = {
            Date: "04/07/2019",
            VoucherCode: "PC001" + i,
            VoucherCategory: "Trả nợ",
            Total: "14.000.000",
            Object: "Nguyễn Xuân Hưng",
            Reason: "Đặt cọc giao hàng",
        }
        paybills.push(paybill);
    }
    return paybills;
}