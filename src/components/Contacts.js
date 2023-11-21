import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contacts.scss';

export default function Contacts() {
    const [localContacts, setLocalContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => setLocalContacts(response.data.slice(0, 5)))
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    const handleDelete = (contactId) => {
        console.log(`Deleting contact with ID: ${contactId}`);
        setLocalContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
        );
    };

     const handleAddContact = (newContact) => {
        setLocalContacts((prevContacts) => [...prevContacts, newContact]);
        setShowForm(false);
    };


    const handleShowForm = () => {
        setShowForm(true);
    };

    const handleHideForm = () => {
        setShowForm(false);
    };

    return (
        <div className='main-page-container'>
            <h2>Contacts</h2>
            <ContactTable contacts={localContacts} onDelete={handleDelete} />
            <div>
                <Button onClick={handleShowForm}>Add contact</Button>
            </div>
            {showForm && <ContactForm onClose={handleHideForm} onAddContact={handleAddContact} />}
        </div>
    );
}
