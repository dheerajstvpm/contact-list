export type Contact = {
    _id: string,
    name: string,
    phone: string,
    email: string,
    address: {
        street: string,
        city: string,
        state: string,
        zip: string
    }
}

export type ContactListItem = {
    _id: string,
    name: string,
    phone: string,
    email: string,
    address: string
}