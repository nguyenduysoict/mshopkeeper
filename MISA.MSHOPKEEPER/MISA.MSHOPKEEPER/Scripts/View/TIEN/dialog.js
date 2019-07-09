class Dialog {
    constructor(width, height, title) {
        this.dialog = $(".dialogAdd").dialog({
            title: title,
            width: width,
            height: height,
            modal: true,
            fluid: true,
            autoOpen: true,
            resizable: false
        });
    }
}