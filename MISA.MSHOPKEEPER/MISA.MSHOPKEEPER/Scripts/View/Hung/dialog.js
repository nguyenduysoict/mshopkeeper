/*
 * JS khởi tạo dialog
 * Create by: NXHUNG(5/7/2019)
 * 
 * */



class Dialog {
    constructor(width, title) {
        this.Dialog = $('.dialogPayout').dialog({
            width: width,
            fluid: true,
            autoOpen: true,
            title: title,
            modal: true,
            resizable: false
        });
    }
    show() {
        this.Dialog.dialog("open");
    }
    close() {
        this.Dialog.dialog("close");
    }
}