

$(document).ready(function () {
    receiptJS = new ReceiptJS();
})


class ReceiptJS {
    constructor() {
        this.initEvent();
    }

    //Hàm khởi tạo
    initEvent() {
        $('.show-receipt-dialog').click(this.showReceiptDialog.bind(this));
        $('.choose-repayment').click(this.showRepaymentDialog.bind(this));
        
        $(".name-login-header").click(function () {
            $(".menu-login-header").toggleClass('show-hide');

        });
        $("#btnAdd").click(function () {
            $(".cb-addnew").toggleClass('show-hide');
        });

        $(document).on('click', '.checked-status', function () {
            $(this).removeClass("checked-status");
            $(this).addClass("uncheck-status");
        });

        $(document).on('click', '.uncheck-status', function () {
            $(this).removeClass("uncheck-status");
            $(this).addClass("checked-status");
        })


        $(document).on("click", ".tab-documents", { mode: 1 }, this.tabs);
        $(document).on("click", ".tab-detail", { mode: 2 }, this.tabs);
        $(document).on("click", ".cls-other", { mode: 3 }, this.tabs);
        $(document).on("click", ".cls-pay", { mode: 4 }, this.tabs);
    }

    showReceiptDialog() {
        this.DialogReceiptJS = new Dialog("Thêm mới phiếu thu", 910, 'dialogReceipt');
        this.DialogReceiptJS.open();
    }

    showRepaymentDialog() {
        this.DialogDebtCollectionBillJS = new Dialog("Chọn hóa đơn thu nợ", 750, 'dialogDebtCollectionBill');
        this.DialogDebtCollectionBillJS.open();
    }

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

}

