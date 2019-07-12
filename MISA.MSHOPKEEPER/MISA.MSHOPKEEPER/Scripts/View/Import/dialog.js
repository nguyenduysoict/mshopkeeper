class DialogImport {
    constructor(width, height, title, nameClassDialog) {
        this.dialog = $(nameClassDialog).dialog({
            title: title,
            width: width,
            height: height,
            modal: true,
            fluid: true,
            autoOpen: false,
            resizable: false
        });
    }

    show() {
        this.dialog.dialog("open");
    }

    close() {
        //debugger
        this.dialog.dialog("close");
    }
}