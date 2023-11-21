import React from 'react';
import Button from 'react-bootstrap/Button';

export default function ContactTable({ contacts, onDelete }) {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {contacts.map((contact, index) => (
                <tr key={contact.id || index}>
                    <td>{contact.name}</td>
                    <td>{contact.username}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>
                        <Button variant='danger' onClick={() => onDelete(contact.id)}>
                            Delete
                        </Button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}
