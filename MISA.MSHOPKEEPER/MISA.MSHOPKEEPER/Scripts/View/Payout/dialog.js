/*
 * JS khởi tạo dialog
 * Create by: NXHUNG(5/7/2019)
 * 
 * */



class Dialog {
    constructor(width, title, clsDialog,setdialog) {
        this.Dialog = $(clsDialog).dialog({
            width: width,
            fluid: true,
            autoOpen: false,
            title: title,
            modal: true,
            resizable: false,
            dialogClass: setdialog,
            position:{ my: "center", at: "center", of: window }
            
        });
    }
    
    show() {
        this.Dialog.dialog("open");
    }
    close() {
        this.Dialog.dialog("close");
    }
}