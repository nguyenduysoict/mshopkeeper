class DialogImport {
    constructor(width, height, title, nameClassDialog, dialogClass) {
        this.dialog = $(nameClassDialog).dialog({
            title: title,
            width: width,
            height: height,
            modal: true,
            fluid: true,
            autoOpen: false,
            resizable: false,
            dialogClass: dialogClass
        });
    }

    show() {
        this.dialog.dialog("open");
    }

    close() {
        //debugger
        this.dialog.dialog("close");
    }
    destroy() {
        this.dialog.dialog('destroy').remove()
    }
}