class AjaxJS {
    constructor() {
    }

    getComboboxData(comboboxName) {
        switch (comboboxName) {
            case "customer-repayment":
                var customerComboboxDataOnRepaymentDialog = [];
                var comboboxData1 = {
                    id: 'nmd2310',
                    code: 'KH0001',
                    name: 'Nguyễn Văn A',
                    type: 'Khách hàng'
                }
                var comboboxData2 = {
                    id: '0213nmd',
                    code: 'KH0002',
                    name: 'Đỗ Mạnh B',
                    type: 'Khách hàng'
                }

                for (let i = 1; i <= 3; i++) {
                    customerComboboxDataOnRepaymentDialog.push(comboboxData1);
                    customerComboboxDataOnRepaymentDialog.push(comboboxData2);
                }
                return customerComboboxDataOnRepaymentDialog;
                break;

            case "customer-receipt":
                var customerComboboxDataOnReceiptDialog = [];
                var comboboxData1 = {
                    id: 'nmd2310',
                    code: 'KH0001',
                    name: 'Đặng Trần Tùng',
                    type: 'Khách hàng'
                }

                var comboboxData2 = {
                    id: 'lmr0231',
                    code: 'KH0002',
                    name: 'Lê Hoàng Hải',
                    type: 'Nhà cung cấp'
                }

                for (let i = 1; i <= 5; i++) {
                    customerComboboxDataOnReceiptDialog.push(comboboxData1);
                    customerComboboxDataOnReceiptDialog.push(comboboxData2);
                }
                return customerComboboxDataOnReceiptDialog;
                break;

            case "staff":
                var staffComboboxData = [];
                var comboboxData1 = {
                    id: 'staff0608',
                    code: 'MV0456',
                    name: 'Hoàng Đạo Thúy',
                }

                var comboboxData2 = {
                    id: 'staff0608',
                    code: 'NV02323',
                    name: 'Nguyễn Mạnh Duy',
                }

                for (let i = 1; i <= 1; i++) {
                    staffComboboxData.push(comboboxData1);
                    staffComboboxData.push(comboboxData2);
                }

                return staffComboboxData;
                break;
        }
    }

    getRepaymentDocumentFromCustomerById(id) {
        var repaymentDocument = [];
        switch (id) {
            case 'nmd2310':
                repaymentDocument = [
                    {
                        RecordedDate: "14/4/2019",
                        RecordNumber: "17154500005",
                        GetAmount: 200000,
                        NotGetAmount: 200000,
                    },
                    {
                        RecordedDate: "25/10/2019",
                        RecordNumber: "5321265405",
                        GetAmount: 300000,
                        NotGetAmount: 100000,
                    }
                ];
                break;
            case '0213nmd':
                repaymentDocument = [
                    {
                        RecordedDate: "4/11/1992",
                        RecordNumber: "036205004",
                        GetAmount: 500000,
                        NotGetAmount: 100000,
                    },
                    {
                        RecordedDate: "4/3/1998",
                        RecordNumber: "0127206943",
                        GetAmount: 600000,
                        NotGetAmount: 200000,
                    },
                    {
                        RecordedDate: "11/11/2001",
                        RecordNumber: "97300153047",
                        GetAmount: 150000,
                        NotGetAmount: 300000,
                    }
                ];
                break;
        }
            return repaymentDocument;
    }

    getReceiptNumber() {
        return "PT00007";
    }
}
