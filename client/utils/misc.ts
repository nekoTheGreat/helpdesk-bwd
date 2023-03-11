export const fullAddressFromTicket = (ticket: any) => {
    let tokens = [];
    for (const [k, v] of Object.entries(ticket)) {
        if (['street_address', 'purok', 'barangay', 'municipality'].includes(k))
            if (v) tokens.push(v);
    }
    return tokens.join(',');
};