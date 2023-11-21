
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './ContactForm';
import ContactTable from './ContactTable';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './contacts.scss';

export default function Contacts() {
    const [localContacts, setLocalContacts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [errorAlert, setErrorAlert] = useState(null);

    useEffect(() => {
        axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const contactsWithId = response.data.slice(0, 5).map((contact) => ({
                    ...contact,
                    id: uuidv4(), // генерируем уникальный id с использованием uuid
                }));
                setLocalContacts(contactsWithId);
            })
            .catch((error) => console.error('Error fetching contacts:', error));
    }, []);

    const handleDelete = (contactId) => {
        console.log(`Deleting contact with ID: ${contactId}`);
        setLocalContacts((prevContacts) =>
            prevContacts.filter((contact) => contact.id !== contactId)
        );
    };

    const handleAddContact = (newContact) => {
        if (validateContact(newContact)) {
            setLocalContacts((prevContacts) => [...prevContacts, newContact]);
            setShowForm(false);
        } else {
            setErrorAlert('Invalid contact information. Please check the fields.');
        }
    };

    const validateContact = (contact) => {
        // Your contact validation logic here
        return (
            contact.firstName &&
            contact.surName &&
            validatePhone(contact.telNumber) &&
            validateEmail(contact.eMail)
        );
    };

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || emailRegex.test(value);
    };

    const validatePhone = (value) => {
        const phoneRegex = /^\+380\d{9}$/;
        return !value || phoneRegex.test(value);
    };

    const handleShowForm = () => {
        setShowForm(true);
        setErrorAlert(null);
    };

    const handleHideForm = () => {
        setShowForm(false);
        setErrorAlert(null);
    };

    return (
        <div className='main-page-container'>
            <h2>Contacts</h2>
            {errorAlert && <Alert variant='danger'>{errorAlert}</Alert>}
            <ContactTable contacts={localContacts} onDelete={handleDelete} />
            <div>
                <Button onClick={handleShowForm}>Add contact</Button>
            </div>
            {showForm && (
                <ContactForm onClose={handleHideForm} onAddContact={handleAddContact} />
            )}
        </div>
    );
}


