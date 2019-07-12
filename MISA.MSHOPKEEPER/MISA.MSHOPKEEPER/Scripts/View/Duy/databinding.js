class DataBindingJS {
    constructor() {
    }

    bindingComboboxData(comboboxName, comboboxData) {
        switch (comboboxName) {
            case "customer-repayment":
                $(".customer-repayment-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = '<tr customerRepaymentId="'+item.id+'"> <td width="130px">' + item.code + '</td> <td width="250px" class="center-td">' + item.name + '</td> <td width="150px">' + item.type + '</td></tr > ';
                    $(".customer-repayment-combobox-data").append(row);
                })
                $(".customer-repayment-combobox-data").children().first().addClass('first-row-dropdown');
                break;

            case "customer-receipt":
                $(".customer-receipt-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = '<tr customerReceiptId="' + item.id +'"> <td width="130px">' + item.code + '</td> <td width="250px" class="center-td">' + item.name + '</td> <td width="150px">' + item.type + '</td></tr > ';
                    $(".customer-receipt-combobox-data").append(row);
                })
                $(".customer-receipt-combobox-data").children().first().addClass('first-row-dropdown');
            break;

            case "staff":
                $(".receipt-staff-combobox-data").html('');
                $.each(comboboxData, function (index, item) {
                    var row = '<tr staffId="' + item.id +'"> <td width="130px">' + item.code + '</td> <td width="250px" class="center-td">' + item.name + '</td></tr > ';
                    $(".receipt-staff-combobox-data").append(row);
                })
                $(".receipt-staff-combobox-data").children().first().addClass('first-row-dropdown');
                break;
        }
    }

    bindRepaymentDocument(repaymentDocument) {
        $(".repayment-document-data").html('');
        $.each(repaymentDocument, function (index, item) {
            var row = `'<tr><td class="first-cell-in-row" width= "41px" ><div style="padding-left: 4px"> <div class="custom-checkbox uncheck-status"></div> </div> </td>
                <td width="129px"> ${item.RecordedDate} </td>
                <td width="159px"> ${item.RecordNumber} </td>
                <td width="202px" class="text-align-right"> ${item.GetAmount} </td>
                <td width="140px" class="text-align-right"> ${item.NotGetAmount} </td>
                <td class="last-cell-in-row text-align-right" width="140px"> 0 </td></tr > '`;
            $(".repayment-document-data").append(row);
        })
    }


}