export default class TicketService{

    async getList(options: any){
        const columns = [
            { name: 'id', field: 'id', label: 'ID', sortable: true, align: 'center', headerStyle: 'width:70px' },
            { name: 'subject', field: 'subject', label: 'Subject', align: 'left' },
            { name: 'user', field: 'user', label: 'User', align: 'left', },
            { name: 'location', field: 'location', label: 'Location', align: 'left' },
            { name: 'actions', field: 'actions', label: '', align: 'center', headerStyle: 'width:70px' },
        ];
        const rows = [
            { id: 10001, subject: 'Blocked pipe', user: 'Kevin Orge', location: 'Highway road intersection' },
            { id: 10002, subject: 'Broken pipe', user: 'Kevin Orge', location: 'Highway road intersection' },
            { id: 10003, subject: 'Stolen pipe', user: 'Kevin Orge', location: 'Highway road intersection' },
        ];
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({columns, rows});
            }, 2000);
        });
    }
}