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
        this.DialogJS = new Dialog(910,"Thêm mới phiếu chi")
        this.datePicker(".input-get-data");
        this.datePicker(".input-date");
        this.datePicker(".input-day-spent");
    }
    /*
     * Description: Gán sự kiện trong trang
     * Create by: NXHUNG(4/7/2019) 
     *
     * */
    initEvent() {
        $(".grid").on("click", "tbody tr", this.setRowSelected);
        $(".a-pay").click(this.aOnClick.bind(this));
        $(".name-login-header").click(function () {
            $(".menu-login-header").toggleClass('show-hide');

        });
        $("#btnAdd").click(function () {
            $(".cb-addnew").toggleClass('show-hide');
        });
        
        $(document).on("click", ".tab-documents", { mode: 1 }, this.tabs);
        $(document).on("click", ".tab-detail", { mode: 2 }, this.tabs);
        $(document).on("click", ".cls-other", { mode: 3 }, this.tabs);
        $(document).on("click", ".cls-pay", { mode: 4 }, this.tabs);
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
        }
        if (mode == 2) {
            $("#tabs-2").removeClass('show-hide');
            $("#tabs-1").addClass('show-hide');
            $(".tab-documents").removeClass('border-bottom-texttab');
            $(".tab-detail").addClass('border-bottom-texttab');
        }
        if (mode == 3) {
            $(".cls-other").removeClass("icon-radio-false");
            $(".cls-other").addClass("icon-radio-true");
            $(".cls-pay").removeClass("icon-radio-true");
            $(".cls-pay").addClass("icon-radio-false");
            $(".choose-repayment").css("display", "none");
        }
        if (mode == 4) {
            $(".cls-pay").removeClass("icon-radio-false");
            $(".cls-pay").addClass("icon-radio-true");
            $(".cls-other").removeClass("icon-radio-true");
            $(".cls-other").addClass("icon-radio-false");
            $(".choose-repayment").css("display", "block");
        }
    }
     /**
     * Description: Gọi hàm datepicker
     * CreateBy: NXHUNG
     * CreateDate: 03/07/2019
     * */

    aOnClick() {
        this.DialogJS.show();
    }
    
    /**
     * Description: Gọi hàm datepicker
     * CreateBy: NXHUNG
     * CreateDate: 03/07/2019
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
     * Description: Gán sự kiện khi click vào từng dòng trong bảng
     * Create by: NXHUNG(4/7/2019) 
     *
     * */

    setRowSelected(sender) {
        if (event.shiftKey || event.ctrlKey) {
            $(this).toggleClass("row-selected");
        }
        else {
            $(this).siblings().removeClass("row-selected");
            $(this).addClass("row-selected");

        }
        //sender.data["jsObject"].SetDisableButtonToolbar();
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
                + '           <div class="uncheck text-align-center"></div>         '
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
        });
    }
}

/*
 * Description: Hàm tạo dữ liệu giả để xử lý
 * Create by: NXHUNG(4/7/2019) 
 *
 * */
function getData() {
    var paybills = [];
    for (var i = 10; i < 150; i++) {
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