

$(document).ready(function () {
    receiptJS = new ReceiptJS();

    // Ẩn combobox khi ấn ra vùng ngoài input

    $(document).click(function (e) {
        var container = $(".input-combobox");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            var container2 = $(".icon-arrow-down");
            if (!container2.is(e.target) && container2.has(e.target).length === 0) {
                $(".dropdown-content").removeClass("show-hide");
            }
        }
    });

    $('.input-combobox').focus(function () {
        var thisInputComboboxName = $(this).attr("inputCombobox");
        console.log(thisInputComboboxName);
        var comboboxes = $('.dropdown-content');
        for (let i = 0; i < comboboxes.length; i++) {
            if ($(comboboxes[i]).hasClass('show-hide')) {
                var inputComboboxName = $(comboboxes[i]).attr("comboboxName");
                console.log(inputComboboxName);
                if (thisInputComboboxName != inputComboboxName) {
                    $(comboboxes[i]).removeClass("show-hide");
                }

            };
        }
    })
})

// Class xử lý dữ liệu liên quan nghiệp vụ thu tiền mặt

class ReceiptJS {
    constructor() {
        this.initEvent();
        this.AjaxJS = new AjaxJS();
        this.DataBindingJS = new DataBindingJS();
        this.DialogReceiptJS = new Dialog("Thêm mới phiếu thu", 910, 700, 'dialogReceipt');
        this.DialogDebtCollectionBillJS = new Dialog("Chọn hóa đơn thu nợ", 840, 600, 'dialogDebtCollectionBill');
        this.DialogNotification = new Dialog("MShopKeeper", 400, 150, 'dialogNotification');
        this.receiptNumber = '';
        this.today = this.getInitialDate();
        this.recentAddOption = '';
        this.customerRepaymentComboboxData = [];
        this.customerReceiptComboboxData = [];
        this.staffComboboxData = [];
    }

    // Hàm khởi tạo 
    // Created by NMDuy (10/7/2019)

    initEvent() {
        // Hiển thị dialog thu tiền khi click button Phiếu thu tiền
        $('.show-receipt-dialog').click(this.showReceiptDialog.bind(this));

        // Hiển thị dialog chọn hóa đơn thu nợ khi click button Chọn hóa đơn thu nợ
        $('.choose-repayment').click(this.showRepaymentDialog.bind(this));

        // Lưu phiếu thu khi click button Lưu
        $('#btnSave').click(this.saveReceipt.bind(this));

        // Ẩn/Hiện dropdown menu thông tin cá nhân
        $(".name-login-header").click(function () {
            $(".menu-login-header").toggleClass('show-hide');
        });

        // Ẩn/Hiện dropdown menu thêm mới phiếu thu/chi
        $(".add-arrow-down-icon").click(function (event) {
            event.stopPropagation();
            $(".cb-addnew").toggleClass('show-hide');
        });

        // Hiển thị dropdown menu khi click arrow down icon ô input, chọn dòng đầu tiên làm mặc định
        $(".icon-arrow-down").click(function () {
            var comboboxName = $(this).attr("comboboxName");
            if ($('.' + comboboxName).hasClass('show-hide')) {
                $('.dropdown-content').removeClass("show-hide");
            } else {
                $('.dropdown-content').removeClass("show-hide");
                $('.' + comboboxName).addClass('show-hide');
            }
            $('input[inputCombobox=' + comboboxName + ']').trigger('focus');
            $('.first-row-dropdown').css("background-color", "#247BA0");
            $('.first-row-dropdown').css("color", "white");
        });

       
        // Ẩn dropdown menu thêm mới phiếu thu/chi khi click ngoài button Thêm mới
        $(document).mouseup(function (e) {
            var container = $("#btnAdd");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $(".cb-addnew").removeClass("show-hide");
            }
        });


        $(document).on("keyup", ".input-combobox", this.filterComboboxData.bind(this));
        $(document).on("click", ".customer-repayment-combobox-data>tr", this.onSelectItemOnRepaymentCombobox.bind(this));
        $(document).on("click", "#btnAdd", this.btnAddHandler.bind(this));
        $(document).on("click", ".checked-status", this.checkboxSelectHandler);
        $(document).on("click", ".uncheck-status", this.checkboxSelectHandler);
        $(document).on("mouseenter", ".tbody-dropdown>table>tbody>tr", { status: 1 }, this.hoverRowHandler);
        $(document).on("mouseleave", ".tbody-dropdown>table>tbody>tr", { status: 2 }, this.hoverRowHandler);
        $(document).on("click", ".tab-documents", { mode: 1 }, this.tabs.bind(this));
        $(document).on("click", ".tab-detail", { mode: 2 }, this.tabs.bind(this));
        $(document).on("click", ".cls-other", { mode: 3 }, this.tabs.bind(this));
        $(document).on("click", ".cls-pay", { mode: 4 }, this.tabs.bind(this));
        $(document).on("click", ".btn-confirm-dialog", this.closeNotificationDialog.bind(this));
        $(document).on("blur", ".receipt-number", this.checkReceiptNumber.bind(this));
        $(document).on("blur", "#get-receipt-day-input", this.checkReceiptDate.bind(this));
        $(document).on("blur", "#repayment-day-input", this.checkRepaymentDate.bind(this));

    }

    saveReceipt() {
        var type = 'missing-detail';
        this.showNotificationDialog(type);
    }

    btnAddHandler() {
        if (this.recentAddOption == 'repayment') {

        } else if (this.recentAddOption == 'receipt') {
            this.showReceiptDialog();
        } else {
            $(".cb-addnew").toggleClass('show-hide');
        }
    }
    // Hiển thị dialog thêm mới phiếu thu, lấy số phiếu thu

    showReceiptDialog() {
        this.recentAddOption = 'receipt';
        this.DialogReceiptJS.open();
        this.receiptNumber = this.AjaxJS.getReceiptNumber();
        this.customerReceiptComboboxData = this.AjaxJS.getComboboxData("customer-receipt");
        this.DataBindingJS.bindingComboboxData("customer-receipt", this.customerReceiptComboboxData);
        this.staffComboboxData = this.AjaxJS.getComboboxData("staff");
        this.DataBindingJS.bindingComboboxData("staff", this.staffComboboxData);
        $('#get-receipt-day-input').val(this.today);
        $('.receipt-number').val(this.receiptNumber);
    }
  
    showRepaymentDialog() {
        this.DialogDebtCollectionBillJS.open();
        this.customerRepaymentComboboxData = this.AjaxJS.getComboboxData("customer-repayment");
        this.DataBindingJS.bindingComboboxData("customer-repayment", this.customerRepaymentComboboxData);
        $('.repayment-customer-input').focus();
        $(".custom-checkbox").addClass("uncheck-status");
        $("#repayment-day-input").val(this.today);
        $("#repayment-day-input").css("pointer-events", "none");
    }

    showNotificationDialog(type) {
        this.DialogNotification.open();
        if (type == 'missing-detail') {
            $('.popup-message').html('Phải có ít nhất một dòng chi tiết. Vui lòng kiểm tra lại.');
        }

        if (type == "equal-zero") {
            $('.popup-message').html('Số tiền phải lớn hơn 0. Vui lòng kiểm tra lại.');
        }
    }

    // Thay đổi background-color và color khi hover các item trong combo box

    hoverRowHandler(sender) {
        var status = sender.data['status'];
        if (status == 1) {
            $(this).css("background-color", "#247BA0");
            $(this).css("color", "white");
        } else {
            $(this).css("background-color", "white");
            $(this).css("color", "black");
        }
    }

    // Filter dữ liệu trong combobox

    filterComboboxData(sender) {
        var inputName = $(sender.target).attr("inputCombobox");
        var keyword = $('input[inputCombobox=' + inputName + ']').val();

        switch (inputName) {
            case 'repayment-customer':
                var filterData = this.customerRepaymentComboboxData.filter(function (item) {
                    return item.name.toLowerCase().includes(keyword.toLowerCase());
                });
                if (filterData.length == 0) {
                    $('.repayment-customer').removeClass('show-hide');
                } else {
                    $('.repayment-customer').addClass('show-hide');
                    this.DataBindingJS.bindingComboboxData("customer-repayment", filterData);
                }
                break;

            case 'receipt-staff':
                var filterData = this.staffComboboxData.filter(function (item) {
                    return item.name.toLowerCase().includes(keyword.toLowerCase());
                });
                if (filterData.length == 0) {
                    $('.receipt-staff').removeClass('show-hide');
                } else {
                    $('.receipt-staff').addClass('show-hide');
                    this.DataBindingJS.bindingComboboxData("staff", filterData);
                }
                break;

            case 'customer-general-info':
                var filterData = this.customerReceiptComboboxData.filter(function (item) {
                    return item.name.toLowerCase().includes(keyword.toLowerCase());
                });
                if (filterData.length == 0) {
                    $('.customer-general-info').removeClass('show-hide');
                } else {
                    $('.customer-general-info').addClass('show-hide');
                this.DataBindingJS.bindingComboboxData("customer-receipt", filterData);

                }
                break;
        }
    }


    checkboxSelectHandler() {
        if ($(this).hasClass('checked-status')) {
            $(this).removeClass("checked-status");
            $(this).addClass("uncheck-status");
        } else {
            $(this).removeClass("uncheck-status");
            $(this).addClass("checked-status");
        }
    }


    closeNotificationDialog() {
        this.DialogNotification.close();
    }

    tabs(sender) {
        var mode = sender.data["mode"];
        if (mode == 1) {
            this.onDocumentTabSelection();
        }
        if (mode == 2) {
            this.onDetailTabSelection();
        }
        if (mode == 3) {
            this.onOtherRadioSelection();
            this.onDetailTabSelection();
        }
        if (mode == 4) {
            this.onRepaymentRadioSelection();
        }
    }

    onOtherRadioSelection() {
        $(".cls-other").removeClass("icon-radio-false");
        $(".cls-other").addClass("icon-radio-true");
        $(".cls-pay").removeClass("icon-radio-true");
        $(".cls-pay").addClass("icon-radio-false");
        $(".choose-repayment").css("display", "none");
        $(".general-information").find('.dialog-input').removeClass("disabled-input-background");
        $(".general-information").find('.dialog-input').removeAttr("readonly");
        $(".general-information").find('.dialog-input').last().attr("readonly", "true");
        $(".general-information").find('.dialog-input').last().addClass("disabled-input-background");
        $(".tab-documents").hide();
    }

    onRepaymentRadioSelection() {
        $(".cls-pay").removeClass("icon-radio-false");
        $(".cls-pay").addClass("icon-radio-true");
        $(".cls-other").removeClass("icon-radio-true");
        $(".cls-other").addClass("icon-radio-false");
        $(".choose-repayment").css("display", "block");
        $(".general-information").find('.dialog-input').addClass("disabled-input-background");
        $(".general-information").find('.dialog-input').attr("readonly", "true");
        $(".tab-documents").show();
    }

    onDetailTabSelection() {
        $("#tabs-2").removeClass('show-hide');
        $("#tabs-1").addClass('show-hide');
        $(".tab-documents").removeClass('border-bottom-texttab');
        $(".tab-detail").addClass('border-bottom-texttab');
    }

    onDocumentTabSelection() {
        $("#tabs-1").removeClass('show-hide');
        $("#tabs-2").addClass('show-hide');
        $(".tab-detail").removeClass('border-bottom-texttab');
        $(".tab-documents").addClass('border-bottom-texttab');
    }

    onSelectItemOnRepaymentCombobox(sender) {
        var customerName = $(sender.currentTarget).children()[1].innerHTML;
        $('.repayment-customer-input').val(customerName);
        var customerRepaymentId = $(sender.currentTarget).attr("customerRepaymentId");
        var repaymentDocument = this.AjaxJS.getRepaymentDocumentFromCustomerById(customerRepaymentId);
        this.DataBindingJS.bindRepaymentDocument(repaymentDocument);
    }

    checkReceiptNumber() {
        var receiptNumberInputValue = $(".receipt-number").val().trim();
        if (receiptNumberInputValue == '') {
            $(".receipt-number").val(this.receiptNumber);               
        }
    }

    checkReceiptDate() {
        var receiptDateInputValue = $("#get-receipt-day-input").val().trim();
        if (receiptDateInputValue == '') {
            $("#get-receipt-day-input").val(this.today);
        }
    }

    checkRepaymentDate() {
        var repaymentDateInputValue = $("#repayment-day-input").val().trim();
        if (repaymentDateInputValue == '') {
            $("#repayment-day-input").val(this.today);
        }
    }

    getInitialDate() {
        var toDay = new Date();
        this.today = this.formatDate(toDay)
        return this.today;
    }

    formatDate(date) {
        var date = new Date(date);
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var formatedDate = dd + '/' + mm + '/' + yyyy;
        return formatedDate;
    }
}
