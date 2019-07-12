
/**------------------------------------------------
 * Description: lớp dùng để render ra dialog thêm mới phiếu xuất
 * Create_by: TQTrong (08/07/2019)
 * Edit_by:
 */
class DialogAddNew {
    constructor() {
        this.initialDialog();
    }

/**------------------------------------------------
* Description: tạo ra dialog thêm mới phiếu xuất kho
* Create_by: TQTrong (08/07/2019)
* Edit_by:
*/
    initialDialog() {
        $(".dialog-add-new").dialog({
            autoOpen: false,
            width: 1060,
            height: 600,
            title: "Thêm phiếu xuất kho khác",
            resizable: false,
        });
    }
}