
// Chạy khi trang web được load
$(document).ready(function () {
    $('.btn-add-export').click(function () {
        var dialogAddNew = new DialogAddNew();
        dialogAddNew.initialDialog();
    });
});

/**------------------------------------------------
 * Description: lớp dùng để render ra dialog thêm mới phiếu xuất
 * Create_by: TQTrong (08/07/2019)
 * Edit_by:
 */
class DialogAddNew {
    constructor() {
    }

    initialDialog() {
        $(".dialog-add-new").dialog({
            width: 1060,
            height: 600,
            title: "Thêm phiếu xuất kho khác"
        });
    }
}