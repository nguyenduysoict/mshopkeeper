
// Chạy khi trang web được load
$(document).ready(function () {
    var renderListExportBill = new RenderListExportBill();
});

/**------------------------------------------------
 * Description: lớp dùng để render ra bảng danh sách nhân viên
 * Create_by: TQTrong (02/07/2019)
 * Edit_by: 
 */
class RenderListExportBill {
    constructor() {
        var listExportBill = this.getListExportBill(); 
        this.loadList(listExportBill);
        //this.listenEvents();
    }

    /**------------------------------------------------
    * Description: lắng nghe các sự kiện
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    listenEvents() {
        //$('.search-id').keyup(this.findExportBillId.bind(this));
        //$('.search-name').keyup(this.findExportBillName.bind(this));
        //$('.select-gender').change(this.findExportBillGender.bind(this));
        //$('.icon-date').click(this.setDatePicker());
        //$('.icon-date').datepicker();
    }

    /**------------------------------------------------
    * Description: lấy ra danh sách nhân viên
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    getListExportBill() {
        var exportBills = [];
        for (var i = 0; i < 100; i++) {
            if (i % 4 == 0) {
                var exportBill = {
                    dateExport: '21/2/2017',
                    exportBillId: 'XK000001',
                    exportBillName: 'Nguyễn Văn An',
                    totalMoney: '300.000',
                    description: '',
                    typeExportBill: 'Xuất kho bán hàng'
                };
            } else if (i % 4 == 1) {
                var exportBill = {
                    dateExport: '22/2/2017',
                    exportBillId: 'XK000002',
                    exportBillName: 'Nguyễn Văn Biên',
                    totalMoney: '400.000',
                    description: '',
                    typeExportBill: 'Xuất kho bán hàng'
                };
            } else if (i % 4 == 2) {
                var exportBill = {
                    dateExport: '23/2/2017',
                    exportBillId: 'XK000003',
                    exportBillName: 'Trần Thị Chi',
                    totalMoney: '500.000',
                    description: '',
                    typeExportBill: 'Xuất kho bán hàng'
                };
            } else {
                var exportBill = {
                    dateExport: '24/2/2017',
                    exportBillId: 'XK000004',
                    exportBillName: 'Mai Tiến Dũng',
                    totalMoney: '600.000',
                    description: '',
                    typeExportBill: 'Xuất kho bán hàng'
                };
            }
            exportBills.push(exportBill);
        }
        return exportBills
    }

    /**------------------------------------------------
    * Description: load danh sách nhân viên lên bảng
    * Create_by: TQTrong (02/07/2019)
    * Edit_by:
    */
    loadList(listExportBill) {
        for (var i = 0; i < listExportBill.length; i++) {
            var rowHTML = '<tr>'
                + '<td class="td-date">' + listExportBill[i].dateExport + '</td>'
                + '<td class="td-text">' + listExportBill[i].exportBillId + '</td> '
                + '<td class="td-text">' + listExportBill[i].exportBillName + '</td > '
                + '<td class="td-number">' + listExportBill[i].totalMoney + '</td > '
                + '<td class="td-text">' + listExportBill[i].description + '</td> '
                + '<td class="td-text">' + listExportBill[i].typeExportBill + '</td> '
                + '</tr>';
            $('.tbl-list-export table tbody').append(rowHTML);
        }
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
