
// Chạy khi trang web được load
$(document).ready(function () {
    var renderListDeliver = new RenderListDeliver();
});

/**------------------------------------------------
 * Description: lớp dùng để render ra bảng danh phiếu xuất kho
 * Create_by: TQTrong (02/07/2019)
 * Edit_by: 
 */
class RenderListDeliver {
    constructor() {
        var listDeliver = this.getListDeliver();
        this.loadList(listDeliver);
        this.listenEvents();
        var dialogAddNew = new DialogAddNew();
    }

    /**------------------------------------------------
    * Description: lắng nghe các sự kiện
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    listenEvents() {
        $('.btn-add-export').click(function () {
            $(".dialog-add-new").dialog({
                autoOpen: true,
            });
        });
        $('.table').on('click', 'tr', this.setRowSelected);
    }

    /**------------------------------------------------
    * Description: lấy ra danh sách phiếu xuất kho
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    getListDeliver() {
        var deliverBills = [];
        for (var i = 0; i < 100; i++) {
            if (i % 4 == 0) {
                var deliverBill = {
                    deliverDate: '21/2/2017',
                    deliverBillId: 'XK000001',
                    deliverBillName: 'Nguyễn Văn An',
                    totalMoney: '300.000',
                    description: '',
                    deliverBillType: 'Xuất kho bán hàng'
                };
            } else if (i % 4 == 1) {
                var deliverBill = {
                    deliverDate: '22/2/2017',
                    deliverBillId: 'XK000002',
                    deliverBillName: 'Nguyễn Văn Biên',
                    totalMoney: '400.000',
                    description: '',
                    deliverBillType: 'Xuất kho bán hàng'
                };
            } else if (i % 4 == 2) {
                var deliverBill = {
                    deliverDate: '23/2/2017',
                    deliverBillId: 'XK000003',
                    deliverBillName: 'Trần Thị Chi',
                    totalMoney: '500.000',
                    description: '',
                    deliverBillType: 'Xuất kho bán hàng'
                };
            } else {
                var deliverBill = {
                    deliverDate: '24/2/2017',
                    deliverBillId: 'XK000004',
                    deliverBillName: 'Mai Tiến Dũng',
                    totalMoney: '600.000',
                    description: '',
                    deliverBillType: 'Xuất kho bán hàng'
                };
            }
            deliverBills.push(deliverBill);
        }
        return deliverBills
    }

    /**------------------------------------------------
    * Description: load danh sách phiếu xuất kho lên bảng
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    loadList(listDeliver) {
        for (var i = 0; i < listDeliver.length; i++) {
            var rowHTML = '<tr>'
                + '<td class="thead-date-export td-date">' + listDeliver[i].deliverDate + '</td>'
                + '<td class="thead-number-export td-text">' + listDeliver[i].deliverBillId + '</td> '
                + '<td class="thead-object-export td-text">' + listDeliver[i].deliverBillName + '</td > '
                + '<td class="thead-money-export td-number">' + listDeliver[i].totalMoney + '</td > '
                + '<td class="thead-description-export td-text">' + listDeliver[i].description + '</td> '
                + '<td class="thead-type-export td-text">' + listDeliver[i].deliverBillType + '</td> '
                + '</tr>';
            $('.table-list-export table tbody').append(rowHTML);
        }
    }

    setRowSelected() {
        $('.table-list-export table tbody > tr:first-child').css('background-color', 'white');
        $('tr').removeClass('row-selected');
        this.classList.add('row-selected');
    }






    /**------------------------------------------------
    * Description: tìm kiếm nhân viên theo theo mã nhân viên
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    findExportId() {
        var findedExport = [];
        var text = $('.search-id').val();
        var listExport = this.getListExport();
        if (text !== "") {
            findedExport = listExport.filter(exportBill => exportBill.exportBillId.trim().toLowerCase().indexOf(text.trim().toLowerCase()) != -1);
            $('.tbl-list-export table tbody tr').remove();
            this.loadList(findedExport);
        } else {
            $('.tbl-list-Export table tbody tr').remove();
            this.loadList(listExport);
        }
    }

    /**------------------------------------------------
    * Description: tìm kiếm nhân viên theo theo tên nhân viên
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    findExportName() {
        var findedExport = [];
        var text = $('.search-name').val();
        var listExport = this.getListExport();
        if (text !== "") {
            findedExport = listExport.filter(exportBill => exportBill.exportBillName.trim().toLowerCase().indexOf(text.trim().toLowerCase()) != -1);
            $('.tbl-list-export table tbody tr').remove();
            this.loadList(findedExport);
        } else {
            $('.tbl-list-Export table tbody tr').remove();
            this.loadList(listExport);
        }
    }

    /**------------------------------------------------
    * Description: tìm kiếm nhân viên theo theo giới tính
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    findExportGender() {
        var findedExport = [];
        var value = $('.select-gender').val();
        var listExport = this.getListExport();
        if (value != 0) {
            findedExport = listExport.filter(exportBill => {
                if (value == 1) {
                    return exportBill.gender.trim().toLowerCase().indexOf('Nam'.toLowerCase()) != -1;
                } else {
                    return exportBill.gender.trim().toLowerCase().indexOf('Nữ'.toLowerCase()) != -1;
                }
            });
            $('.tbl-list-export table tbody tr').remove();
            this.loadList(findedExport);
        } else {
            $('.tbl-list-export table tbody tr').remove();
            this.loadList(listExport);
        }
    }

    /**------------------------------------------------
    * Description: tạo date picker để nhập ngày
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    setDatePicker() {
        $('.icon-date').datepicker();
    }
}
